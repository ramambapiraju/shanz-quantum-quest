import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, Users, Zap, Atom, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface GameMenuProps {
  onStartGame: (playerName: string, sessionCode?: string) => void;
}

export const GameMenu = ({ onStartGame }: GameMenuProps) => {
  const [playerName, setPlayerName] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [activeTab, setActiveTab] = useState("play");

  const handleCreateGame = () => {
    if (!playerName.trim()) return;
    onStartGame(playerName.trim());
  };

  const handleJoinGame = () => {
    if (!playerName.trim() || !sessionCode.trim()) return;
    onStartGame(playerName.trim(), sessionCode.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to SHAN Z</span>
        </Link>

        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
            <Zap className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300">EXPERIMENTAL QUANTUM SIMULATION</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              QUANTUM
            </span>
            <br />
            <span className="text-white">COLLAPSE</span>
          </h1>
          
          <p className="text-2xl text-slate-400 font-light tracking-widest">
            DOMAIN ZERO
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
              <TabsTrigger value="play" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                <Play className="w-4 h-4 mr-2" />
                Play
              </TabsTrigger>
              <TabsTrigger value="lore" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                <BookOpen className="w-4 h-4 mr-2" />
                Lore
              </TabsTrigger>
              <TabsTrigger value="tutorial" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                <Atom className="w-4 h-4 mr-2" />
                Tutorial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="play" className="mt-6">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">OPERATOR DESIGNATION</label>
                  <Input
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name..."
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                    maxLength={20}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleCreateGame}
                    disabled={!playerName.trim()}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-6"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    CREATE GAME
                  </Button>
                  
                  <div className="space-y-2">
                    <Input
                      value={sessionCode}
                      onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                      placeholder="SESSION CODE"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 uppercase"
                      maxLength={6}
                    />
                    <Button
                      onClick={handleJoinGame}
                      disabled={!playerName.trim() || !sessionCode.trim()}
                      variant="outline"
                      className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      JOIN GAME
                    </Button>
                  </div>
                </div>

                <div className="text-center text-sm text-slate-500">
                  <p>Controls: WASD to move • Mouse to look • Left-click to shoot • R to reload • Tab for PDA</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lore" className="mt-6">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                  <Atom className="w-5 h-5" />
                  THE COLLAPSE EVENT
                </h2>
                
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    <span className="text-purple-400 font-semibold">FACILITY ALPHA-7</span> was humanity's 
                    most ambitious quantum computing research center. Built on a remote island, it housed 
                    experimental <span className="text-cyan-400">qubit architectures</span> from every major 
                    paradigm: superconducting circuits, trapped ions, photonic systems, and neutral atoms.
                  </p>
                  
                  <p>
                    The disaster began in the <span className="text-red-400">Cryogenic Control Systems</span>. 
                    A cascade failure in the dilution refrigerators caused quantum states to decohere 
                    unpredictably. But instead of simply losing coherence, the qubits began to 
                    <span className="text-green-400"> entangle with spacetime itself</span>.
                  </p>
                  
                  <p>
                    Now, the island exists in a state of <span className="text-yellow-400">quantum superposition</span>. 
                    Reality fluctuates. The "safe zone" shrinks as the entanglement spreads. Only by 
                    understanding the <span className="text-cyan-400">principles of quantum information</span> 
                    can survivors hope to escape Domain Zero.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/30">
                    <h3 className="text-cyan-400 font-bold mb-2">🔬 Superconducting Lab</h3>
                    <p className="text-sm text-slate-400">Failed transmon qubit arrays. High radiation zones.</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/30">
                    <h3 className="text-purple-400 font-bold mb-2">⚡ Trapped Ion Arena</h3>
                    <p className="text-sm text-slate-400">Electromagnetic anomalies. Time dilation effects.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tutorial" className="mt-6">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  QUANTUM FUNDAMENTALS
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <h3 className="text-cyan-400 font-bold mb-2">🌀 SUPERPOSITION</h3>
                    <p className="text-sm text-slate-300">
                      Unlike classical bits (0 or 1), qubits can exist in multiple states simultaneously. 
                      This is why the island's reality is unstable—quantum systems that should be isolated 
                      are now superposed with macroscopic objects.
                    </p>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <h3 className="text-purple-400 font-bold mb-2">🔗 ENTANGLEMENT</h3>
                    <p className="text-sm text-slate-300">
                      When particles become entangled, measuring one instantly affects the other, 
                      regardless of distance. The Quantum Crates use this principle—their contents 
                      are truly random, determined by entangled states on a remote server.
                    </p>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <h3 className="text-green-400 font-bold mb-2">📊 DECOHERENCE</h3>
                    <p className="text-sm text-slate-300">
                      Quantum states are fragile. Interaction with the environment causes decoherence—
                      the loss of quantum properties. The shrinking safe zone represents the boundary 
                      where decoherence stabilizes reality.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/30">
                  <p className="text-sm text-slate-300">
                    💡 <span className="text-cyan-400 font-semibold">TIP:</span> Find the 
                    <span className="text-yellow-400"> Qiskit SDK Injector</span> to harness quantum 
                    software algorithms for enhanced abilities. This rare item represents the power 
                    of quantum software development!
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>Part of the SHAN Z Quantum Learning Experience</p>
          <p className="mt-2 text-xs">
            Educational content inspired by IBM Quantum, Qiskit, Microsoft Azure Quantum, and Google Quantum AI
          </p>
        </div>
      </div>
    </div>
  );
};
