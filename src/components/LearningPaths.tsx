import { BookOpen, Code, Rocket, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const learningPaths = [
  {
    icon: BookOpen,
    level: "Beginner",
    title: "Quantum Foundations",
    description: "Start your journey with quantum mechanics basics, qubits, and superposition principles.",
    topics: ["Quantum Basics", "Qubits", "Superposition", "Entanglement"],
    color: "primary",
    duration: "4-6 weeks",
  },
  {
    icon: Code,
    level: "Intermediate",
    title: "Qiskit Programming",
    description: "Learn to write quantum programs using IBM's Qiskit framework and run on real quantum computers.",
    topics: ["Qiskit Basics", "Quantum Circuits", "Quantum Gates", "IBM Quantum"],
    color: "secondary",
    duration: "6-8 weeks",
  },
  {
    icon: Brain,
    level: "Advanced",
    title: "Quantum Algorithms",
    description: "Master quantum algorithms like Shor's, Grover's, and explore quantum machine learning.",
    topics: ["Shor's Algorithm", "Grover's Search", "VQE", "QAOA"],
    color: "quantum-pink",
    duration: "8-12 weeks",
  },
  {
    icon: Rocket,
    level: "Expert",
    title: "Quantum Applications",
    description: "Build real-world applications in cryptography, optimization, and quantum simulation.",
    topics: ["Quantum Cryptography", "Optimization", "Chemistry Sim", "Finance"],
    color: "primary",
    duration: "Ongoing",
  },
];

export const LearningPaths = () => {
  return (
    <section id="learning-paths" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
            Learning Paths
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Your Journey to <span className="text-gradient-quantum">Quantum Mastery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Structured learning paths designed to take you from absolute beginner to quantum expert.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {learningPaths.map((path, index) => (
            <div
              key={path.title}
              className="group p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 card-shadow hover:translate-y-[-4px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-${path.color}/10 border border-${path.color}/20`}>
                  <path.icon className={`w-6 h-6 text-${path.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{path.level}</span>
                    <span className="text-xs text-muted-foreground">{path.duration}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {path.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {path.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {path.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground border border-border/50"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full group/btn justify-center">
                Explore Path
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
