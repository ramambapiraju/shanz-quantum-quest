import { useState, useEffect, useCallback } from "react";
import { GameCanvas } from "@/components/game/GameCanvas";
import { GameUI } from "@/components/game/GameUI";
import { GameMenu } from "@/components/game/GameMenu";
import { GamePDA } from "@/components/game/GamePDA";
import { useGameState } from "@/hooks/useGameState";
import { useMultiplayer } from "@/hooks/useMultiplayer";

const QuantumCollapse = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPDAOpen, setIsPDAOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  
  const {
    health,
    ammo,
    maxAmmo,
    isReloading,
    position,
    rotation,
    kills,
    deaths,
    powerUps,
    shoot,
    reload,
    takeDamage,
    heal,
    updatePosition,
    updateRotation,
    activatePowerUp,
  } = useGameState();

  const {
    isConnected,
    players,
    gameSession,
    createSession,
    joinSession,
    updatePlayerState,
    sendGameEvent,
    leaveSession,
  } = useMultiplayer();

  const handleStartGame = useCallback(async (name: string, code?: string) => {
    setPlayerName(name);
    if (code) {
      setSessionCode(code);
      await joinSession(code, name);
    } else {
      const newCode = await createSession(name);
      if (newCode) setSessionCode(newCode);
    }
    setIsPlaying(true);
  }, [createSession, joinSession]);

  const handleExitGame = useCallback(() => {
    setIsPlaying(false);
    leaveSession();
  }, [leaveSession]);

  // Sync player state to multiplayer
  useEffect(() => {
    if (isConnected && isPlaying) {
      updatePlayerState({
        health,
        ammo,
        position_x: position.x,
        position_y: position.y,
        position_z: position.z,
        rotation_y: rotation.y,
        is_alive: health > 0,
        kills,
        deaths,
      });
    }
  }, [isConnected, isPlaying, health, ammo, position, rotation, kills, deaths, updatePlayerState]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      if (e.key === "Tab") {
        e.preventDefault();
        setIsPDAOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsPDAOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  if (!isPlaying) {
    return <GameMenu onStartGame={handleStartGame} />;
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      <GameCanvas
        position={position}
        rotation={rotation}
        onPositionChange={updatePosition}
        onRotationChange={updateRotation}
        onShoot={shoot}
        onReload={reload}
        players={players}
        isReloading={isReloading}
        ammo={ammo}
      />
      
      <GameUI
        health={health}
        ammo={ammo}
        maxAmmo={maxAmmo}
        isReloading={isReloading}
        kills={kills}
        deaths={deaths}
        players={players}
        sessionCode={sessionCode}
        powerUps={powerUps}
      />

      {isPDAOpen && (
        <GamePDA
          onClose={() => setIsPDAOpen(false)}
          onActivatePowerUp={activatePowerUp}
          powerUps={powerUps}
        />
      )}
    </div>
  );
};

export default QuantumCollapse;
