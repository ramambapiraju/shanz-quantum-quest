import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

export interface Player {
  id: string;
  player_id: string;
  player_name: string;
  health: number;
  ammo: number;
  position_x: number;
  position_y: number;
  position_z: number;
  rotation_y: number;
  is_alive: boolean;
  kills: number;
  deaths: number;
}

export interface GameSession {
  id: string;
  session_code: string;
  host_player_id: string;
  status: string;
  max_players: number;
}

export const useMultiplayer = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [playerId] = useState(() => crypto.randomUUID());
  const [playerDbId, setPlayerDbId] = useState<string | null>(null);
  
  const channelRef = useRef<RealtimeChannel | null>(null);
  const updateThrottleRef = useRef<NodeJS.Timeout | null>(null);

  const generateSessionCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createSession = useCallback(async (playerName: string): Promise<string | null> => {
    const sessionCode = generateSessionCode();
    
    try {
      const { data: session, error: sessionError } = await supabase
        .from("game_sessions")
        .insert({
          session_code: sessionCode,
          host_player_id: playerId,
          status: "waiting",
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      const { data: player, error: playerError } = await supabase
        .from("game_players")
        .insert({
          session_id: session.id,
          player_id: playerId,
          player_name: playerName,
        })
        .select()
        .single();

      if (playerError) throw playerError;

      setGameSession(session);
      setPlayerDbId(player.id);
      setIsConnected(true);
      
      subscribeToSession(session.id);
      
      return sessionCode;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  }, [playerId]);

  const joinSession = useCallback(async (sessionCode: string, playerName: string): Promise<boolean> => {
    try {
      const { data: session, error: sessionError } = await supabase
        .from("game_sessions")
        .select()
        .eq("session_code", sessionCode.toUpperCase())
        .single();

      if (sessionError || !session) {
        console.error("Session not found");
        return false;
      }

      const { data: player, error: playerError } = await supabase
        .from("game_players")
        .insert({
          session_id: session.id,
          player_id: playerId,
          player_name: playerName,
        })
        .select()
        .single();

      if (playerError) throw playerError;

      setGameSession(session);
      setPlayerDbId(player.id);
      setIsConnected(true);
      
      subscribeToSession(session.id);
      
      return true;
    } catch (error) {
      console.error("Error joining session:", error);
      return false;
    }
  }, [playerId]);

  const subscribeToSession = useCallback((sessionId: string) => {
    // Fetch initial players
    supabase
      .from("game_players")
      .select()
      .eq("session_id", sessionId)
      .then(({ data }) => {
        if (data) setPlayers(data);
      });

    // Subscribe to realtime updates
    channelRef.current = supabase
      .channel(`game-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_players",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPlayers(prev => [...prev, payload.new as Player]);
          } else if (payload.eventType === "UPDATE") {
            setPlayers(prev => 
              prev.map(p => p.id === (payload.new as Player).id ? payload.new as Player : p)
            );
          } else if (payload.eventType === "DELETE") {
            setPlayers(prev => prev.filter(p => p.id !== (payload.old as Player).id));
          }
        }
      )
      .subscribe();
  }, []);

  const updatePlayerState = useCallback((state: Partial<Player>) => {
    if (!playerDbId || !isConnected) return;

    // Throttle updates to avoid overwhelming the database
    if (updateThrottleRef.current) {
      clearTimeout(updateThrottleRef.current);
    }

    updateThrottleRef.current = setTimeout(async () => {
      try {
        await supabase
          .from("game_players")
          .update({
            ...state,
            updated_at: new Date().toISOString(),
          })
          .eq("id", playerDbId);
      } catch (error) {
        console.error("Error updating player state:", error);
      }
    }, 50); // 50ms throttle for ~20 updates per second
  }, [playerDbId, isConnected]);

  const sendGameEvent = useCallback(async (eventType: string, eventData: Record<string, unknown>) => {
    if (!gameSession) return;

    try {
      await supabase
        .from("game_events")
        .insert([{
          session_id: gameSession.id,
          player_id: playerId,
          event_type: eventType,
          event_data: eventData,
        }]);
    } catch (error) {
      console.error("Error sending game event:", error);
    }
  }, [gameSession, playerId]);

  const leaveSession = useCallback(async () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    if (playerDbId) {
      await supabase
        .from("game_players")
        .delete()
        .eq("id", playerDbId);
    }

    setIsConnected(false);
    setGameSession(null);
    setPlayerDbId(null);
    setPlayers([]);
  }, [playerDbId]);

  useEffect(() => {
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      if (updateThrottleRef.current) {
        clearTimeout(updateThrottleRef.current);
      }
    };
  }, []);

  return {
    isConnected,
    players,
    gameSession,
    playerId,
    createSession,
    joinSession,
    updatePlayerState,
    sendGameEvent,
    leaveSession,
  };
};
