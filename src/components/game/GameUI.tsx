import { Player } from "@/hooks/useMultiplayer";
import { PowerUp } from "@/hooks/useGameState";
import { Heart, Crosshair, Users, Zap, Shield, Target, Cpu } from "lucide-react";

interface GameUIProps {
  health: number;
  ammo: number;
  maxAmmo: number;
  isReloading: boolean;
  kills: number;
  deaths: number;
  players: Player[];
  sessionCode: string;
  powerUps: PowerUp[];
}

export const GameUI = ({
  health,
  ammo,
  maxAmmo,
  isReloading,
  kills,
  deaths,
  players,
  sessionCode,
  powerUps,
}: GameUIProps) => {
  const healthColor = health > 50 ? "text-green-400" : health > 25 ? "text-yellow-400" : "text-red-400";
  const healthBgColor = health > 50 ? "bg-green-500" : health > 25 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Crosshair className="w-8 h-8 text-cyan-400 opacity-80" />
      </div>

      {/* Quantum Circuit Border Effect */}
      <div className="absolute inset-0 border-2 border-cyan-500/20 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-500/30" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-500/30" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/30" />
      </div>

      {/* Top Left - Session Info */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-mono">SESSION: {sessionCode}</span>
          </div>
        </div>
        
        {/* Players List */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold">OPERATORS ({players.length})</span>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {players.slice(0, 8).map((player) => (
              <div key={player.id} className="flex items-center justify-between text-xs">
                <span className={player.is_alive ? "text-white" : "text-slate-500"}>
                  {player.player_name}
                </span>
                <span className="text-slate-400">{player.kills}/{player.deaths}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Right - Stats */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-green-500/30 rounded-lg px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-bold">{kills}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-bold">{deaths}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Left - Health Bar */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <Heart className={`w-5 h-5 ${healthColor}`} />
            <span className={`font-bold ${healthColor}`}>{health}</span>
            <span className="text-slate-500 text-sm">/ 100</span>
          </div>
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${healthBgColor} transition-all duration-300`}
              style={{ width: `${health}%` }}
            />
          </div>
        </div>

        {/* Active Power-ups */}
        {powerUps.filter(p => p.isActive).map((powerUp) => (
          <div
            key={powerUp.id}
            className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/50 rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-yellow-400 text-sm font-bold">{powerUp.name}</span>
          </div>
        ))}
      </div>

      {/* Bottom Right - Ammo */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-4">
            {/* Ammo Display (Qiskit-inspired circuit diagram style) */}
            <div className="flex flex-col items-end">
              <div className="text-xs text-cyan-400 font-mono mb-1">QUBIT ROUNDS</div>
              <div className="flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${ammo > 10 ? "text-cyan-400" : ammo > 5 ? "text-yellow-400" : "text-red-400"}`}>
                  {ammo}
                </span>
                <span className="text-slate-500 text-lg">/ {maxAmmo}</span>
              </div>
              
              {/* Ammo visual representation */}
              <div className="flex gap-0.5 mt-2">
                {Array.from({ length: maxAmmo }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-4 rounded-sm transition-all duration-100 ${
                      i < ammo
                        ? ammo > 10
                          ? "bg-cyan-400"
                          : ammo > 5
                          ? "bg-yellow-400"
                          : "bg-red-400"
                        : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Reload indicator */}
          {isReloading && (
            <div className="mt-2 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-cyan-400 text-sm animate-pulse">QUANTUM STATE RESET...</span>
            </div>
          )}
        </div>
      </div>

      {/* Mini-map (Top Right Corner) */}
      <div className="absolute top-20 right-4">
        <div className="w-32 h-32 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden">
          <div className="relative w-full h-full">
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            
            {/* Center player indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <div className="w-4 h-4 border border-cyan-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Other players on minimap */}
            {players.map((player, i) => (
              <div
                key={player.id}
                className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full"
                style={{
                  left: `${50 + (player.position_x / 100) * 40}%`,
                  top: `${50 + (player.position_z / 100) * 40}%`,
                }}
              />
            ))}

            {/* Compass */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-[8px] text-cyan-400 font-bold">
              N
            </div>
          </div>
        </div>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="text-xs text-slate-500 text-center">
          [TAB] PDA Interface • [R] Reload • [ESC] Menu
        </div>
      </div>

      {/* Low health warning overlay */}
      {health <= 25 && health > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-red-900/30 animate-pulse" />
          <div className="absolute inset-4 border-2 border-red-500/50 rounded-lg animate-pulse" />
        </div>
      )}
    </div>
  );
};
