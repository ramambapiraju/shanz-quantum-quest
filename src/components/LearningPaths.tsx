import { BookOpen, Code, Rocket, Brain, ArrowRight, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const learningPaths = [
  {
    icon: BookOpen,
    level: "Beginner",
    title: "Quantum Foundations",
    description: "Start your journey with quantum mechanics basics, qubits, superposition, and entanglement principles.",
    topics: [
      { name: "Quantum Basics", link: "https://learning.quantum.ibm.com/course/basics-of-quantum-information" },
      { name: "Single Qubit Gates", link: "https://learning.quantum.ibm.com/course/basics-of-quantum-information/single-systems" },
      { name: "Superposition", link: "https://www.youtube.com/watch?v=F_Riqjdh2oM" },
      { name: "Entanglement", link: "https://learning.quantum.ibm.com/course/basics-of-quantum-information/entanglement-in-action" },
    ],
    color: "primary",
    duration: "4-6 weeks",
    modules: 12,
    mainLink: "https://learning.quantum.ibm.com/course/basics-of-quantum-information",
    videoLink: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvqMQhREK2NZhJpVDV7Tg-T0",
  },
  {
    icon: Code,
    level: "Intermediate",
    title: "Qiskit Programming",
    description: "Learn to write quantum programs using IBM's Qiskit framework and run circuits on real quantum computers.",
    topics: [
      { name: "Qiskit Installation", link: "https://docs.quantum.ibm.com/start/install" },
      { name: "Quantum Circuits", link: "https://learning.quantum.ibm.com/course/basics-of-quantum-information/quantum-circuits" },
      { name: "Quantum Gates", link: "https://docs.quantum.ibm.com/api/qiskit/circuit" },
      { name: "IBM Quantum Lab", link: "https://quantum.ibm.com/lab" },
    ],
    color: "secondary",
    duration: "6-8 weeks",
    modules: 16,
    mainLink: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvrgHZt3exM_NNiNKtZlHvZi",
    videoLink: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvrgHZt3exM_NNiNKtZlHvZi",
  },
  {
    icon: Brain,
    level: "Advanced",
    title: "Quantum Algorithms",
    description: "Master quantum algorithms like Shor's, Grover's, VQE, QAOA and explore quantum machine learning.",
    topics: [
      { name: "Grover's Search", link: "https://learning.quantum.ibm.com/tutorial/grovers-algorithm" },
      { name: "Shor's Algorithm", link: "https://learning.quantum.ibm.com/course/fundamentals-of-quantum-algorithms/phase-estimation-and-factoring" },
      { name: "VQE", link: "https://learning.quantum.ibm.com/tutorial/variational-quantum-eigensolver" },
      { name: "QAOA", link: "https://learning.quantum.ibm.com/tutorial/quantum-approximate-optimization-algorithm" },
    ],
    color: "quantum-pink",
    duration: "8-12 weeks",
    modules: 20,
    mainLink: "https://learning.quantum.ibm.com/course/fundamentals-of-quantum-algorithms",
    videoLink: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO",
  },
  {
    icon: Rocket,
    level: "Expert",
    title: "Quantum Applications",
    description: "Build real-world applications in cryptography, optimization, chemistry simulation, and quantum ML.",
    topics: [
      { name: "Quantum Chemistry", link: "https://qiskit-community.github.io/qiskit-nature/" },
      { name: "Optimization", link: "https://qiskit-community.github.io/qiskit-optimization/" },
      { name: "Quantum ML", link: "https://qiskit-community.github.io/qiskit-machine-learning/" },
      { name: "Finance", link: "https://qiskit-community.github.io/qiskit-finance/" },
    ],
    color: "primary",
    duration: "Ongoing",
    modules: 24,
    mainLink: "https://learning.quantum.ibm.com/catalog/tutorials",
    videoLink: "https://www.youtube.com/playlist?list=PLOFEBzvs-VvpGkW3SqUQvfsKdrEMlmq9o",
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    text: "text-primary",
    glow: "group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    text: "text-secondary",
    glow: "group-hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)]",
  },
  "quantum-pink": {
    bg: "bg-[hsl(330,80%,60%)]/10",
    border: "border-[hsl(330,80%,60%)]/20",
    text: "text-[hsl(330,80%,60%)]",
    glow: "group-hover:shadow-[0_0_30px_hsl(330,80%,60%,0.3)]",
  },
};

export const LearningPaths = () => {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <section id="learning-paths" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Structured Learning
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Your Journey to <span className="text-gradient-quantum">Quantum Mastery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Follow our structured paths from absolute beginner to quantum expert. Each path links to official Qiskit resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {learningPaths.map((path, index) => {
            const colors = colorClasses[path.color];
            return (
              <div
                key={path.title}
                className={`group p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 card-shadow hover:translate-y-[-4px] ${colors.glow}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredPath(path.title)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border transition-all duration-300 group-hover:scale-110`}>
                    <path.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>{path.level}</span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {path.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {path.modules} modules
                        </span>
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {path.description}
                </p>
                
                {/* Topics with Links */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {path.topics.map((topic) => (
                    <a
                      key={topic.name}
                      href={topic.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 text-xs rounded-lg bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-pointer"
                    >
                      {topic.name}
                    </a>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a 
                    href={path.mainLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="ghost" className="w-full group/btn justify-center border border-border/50 hover:border-primary/50">
                      Start Learning
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                  <a 
                    href={path.videoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="border-border/50 hover:border-primary/50">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-3xl font-heading font-bold text-primary">72+</div>
            <div className="text-sm text-muted-foreground">Total Modules</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-3xl font-heading font-bold text-secondary">100+</div>
            <div className="text-sm text-muted-foreground">Hours of Content</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-3xl font-heading font-bold text-[hsl(330,80%,60%)]">Free</div>
            <div className="text-sm text-muted-foreground">Forever Access</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-3xl font-heading font-bold text-primary">Real</div>
            <div className="text-sm text-muted-foreground">Quantum Hardware</div>
          </div>
        </div>
      </div>
    </section>
  );
};
