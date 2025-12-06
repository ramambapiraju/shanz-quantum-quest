import { PowerUp } from "@/hooks/useGameState";
import { Button } from "@/components/ui/button";
import { X, Zap, BookOpen, Atom, Cpu, Layers, FlaskConical, Lightbulb } from "lucide-react";

interface GamePDAProps {
  onClose: () => void;
  onActivatePowerUp: (id: string) => void;
  powerUps: PowerUp[];
}

export const GamePDA = ({ onClose, onActivatePowerUp, powerUps }: GamePDAProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* PDA Container - Qiskit Circuit Diagram Inspired */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-xl w-[90%] max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl shadow-cyan-500/20">
        {/* Circuit Wire Decorations */}
        <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 gap-2 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-cyan-400" />
          ))}
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between p-4 border-b border-cyan-500/30 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">QUANTUM PDA v3.14</h2>
              <p className="text-xs text-cyan-400 font-mono">QISKIT-INSPIRED INTERFACE</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                QUANTUM INVENTORY
              </h3>

              {powerUps.map((powerUp) => (
                <div
                  key={powerUp.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-yellow-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold text-yellow-400">{powerUp.name}</span>
                    </div>
                    {powerUp.isActive ? (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        ACTIVE
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => onActivatePowerUp(powerUp.id)}
                        className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 text-xs"
                      >
                        ACTIVATE
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{powerUp.description}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Duration: {powerUp.duration / 1000}s
                  </p>
                </div>
              ))}

              {/* Sample item descriptions with quantum lore */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-green-400">Quantum Ammo Pack</span>
                </div>
                <p className="text-sm text-slate-400">
                  Standard munitions originally designed for Materials Science simulations. 
                  Each round contains entangled particles for enhanced accuracy.
                </p>
                <p className="text-xs text-cyan-400 mt-2 italic">
                  [Applications Domain: Materials Science]
                </p>
              </div>
            </div>

            {/* Right Column - Quantum Domains Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                QUANTUM DOMAINS DATABASE
              </h3>

              {/* Domain Cards */}
              <div className="space-y-3">
                <DomainCard
                  icon={<Atom className="w-5 h-5" />}
                  title="Foundational Science"
                  color="cyan"
                  content="The core principles of superposition and entanglement are the reason this island exists in a state of quantum instability. Understanding these fundamentals is key to survival."
                  details={[
                    "Basics of qubits & quantum mechanics",
                    "Global quantum landscape",
                    "Virtual lab: superconducting qubits"
                  ]}
                />

                <DomainCard
                  icon={<Cpu className="w-5 h-5" />}
                  title="Hardware & Physics"
                  color="purple"
                  content="The facility housed multiple qubit architectures. The Superconducting Lab and Trapped Ion Arena are now danger zones due to cryogenic system failures."
                  details={[
                    "Ion trap quantum hardware",
                    "Cryogenic infrastructure",
                    "Scalable quantum processors"
                  ]}
                />

                <DomainCard
                  icon={<Layers className="w-5 h-5" />}
                  title="Software & SDKs"
                  color="yellow"
                  content="The Qiskit SDK Injector harnesses quantum software algorithms for enhanced capabilities. This represents the power of quantum programming frameworks."
                  details={[
                    "Qiskit framework",
                    "Quantum circuit design",
                    "Algorithm implementation"
                  ]}
                />

                <DomainCard
                  icon={<Lightbulb className="w-5 h-5" />}
                  title="Algorithms & Theory"
                  color="green"
                  content="Quantum Crates use entanglement for truly random loot generation. The contents are determined by quantum states on remote servers."
                  details={[
                    "QAOA optimization",
                    "Quantum ML applications",
                    "Finance algorithms"
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
            <p className="text-sm text-slate-300 text-center">
              💡 This interface is inspired by <span className="text-cyan-400">Qiskit's</span> quantum circuit visualization. 
              Learn more about quantum computing at the SHAN Z Learning Hub.
            </p>
          </div>
        </div>

        {/* Circuit Wire Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center px-4 gap-2 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-purple-400" />
          ))}
        </div>
      </div>
    </div>
  );
};

interface DomainCardProps {
  icon: React.ReactNode;
  title: string;
  color: "cyan" | "purple" | "yellow" | "green";
  content: string;
  details: string[];
}

const DomainCard = ({ icon, title, color, content, details }: DomainCardProps) => {
  const colorClasses = {
    cyan: "border-cyan-500/30 text-cyan-400",
    purple: "border-purple-500/30 text-purple-400",
    yellow: "border-yellow-500/30 text-yellow-400",
    green: "border-green-500/30 text-green-400",
  };

  return (
    <div className={`bg-slate-800/30 border ${colorClasses[color].split(" ")[0]} rounded-lg p-3`}>
      <div className={`flex items-center gap-2 mb-2 ${colorClasses[color].split(" ")[1]}`}>
        {icon}
        <span className="font-bold text-sm">{title}</span>
      </div>
      <p className="text-xs text-slate-400 mb-2">{content}</p>
      <ul className="space-y-1">
        {details.map((detail, i) => (
          <li key={i} className="text-xs text-slate-500 flex items-center gap-1">
            <span className={`w-1 h-1 rounded-full ${colorClasses[color].split(" ")[1].replace("text-", "bg-")}`} />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};
