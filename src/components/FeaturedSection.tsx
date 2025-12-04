import { ExternalLink, Zap, Award, Globe } from "lucide-react";

const featuredLinks = [
  {
    title: "IBM Quantum Network",
    description: "Access real quantum computers and join the global quantum community.",
    icon: Globe,
    link: "https://quantum.ibm.com/",
    gradient: "from-primary to-secondary",
  },
  {
    title: "Qiskit Certification",
    description: "Get certified as a Qiskit developer and showcase your quantum skills.",
    icon: Award,
    link: "https://www.ibm.com/training/certification/C0010300",
    gradient: "from-secondary to-quantum-pink",
  },
  {
    title: "Quantum Challenges",
    description: "Participate in IBM Quantum Challenges and hackathons to test your skills.",
    icon: Zap,
    link: "https://challenges.quantum.ibm.com/",
    gradient: "from-quantum-pink to-primary",
  },
];

export const FeaturedSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-quantum-pink/30 bg-quantum-pink/5 text-quantum-pink text-sm font-medium mb-4">
            Featured
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Quick <span className="text-gradient-quantum">Access</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Essential links to accelerate your quantum computing journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featuredLinks.map((item, index) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.gradient} mb-4`}>
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-2 flex items-center gap-2">
                  {item.title}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
