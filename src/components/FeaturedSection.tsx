import { ExternalLink, Zap, Award, Globe, Play, BookOpen, Code, Cpu } from "lucide-react";

const featuredLinks = [
  {
    title: "IBM Quantum Platform",
    description: "Access real quantum computers, build circuits, and join the global quantum community.",
    icon: Globe,
    link: "https://quantum.ibm.com/",
    gradient: "from-primary to-secondary",
    stats: "127+ Qubits",
  },
  {
    title: "Qiskit Developer Certification",
    description: "Get officially certified and showcase your quantum programming expertise to the world.",
    icon: Award,
    link: "https://www.ibm.com/training/certification/C0010300",
    gradient: "from-secondary to-[hsl(330,80%,60%)]",
    stats: "Industry Recognized",
  },
  {
    title: "IBM Quantum Challenges",
    description: "Test your skills in global quantum challenges, hackathons, and earn prizes.",
    icon: Zap,
    link: "https://challenges.quantum.ibm.com/",
    gradient: "from-[hsl(330,80%,60%)] to-primary",
    stats: "Win Prizes",
  },
];

const quickLinks = [
  {
    title: "Qiskit YouTube",
    description: "Official video tutorials",
    icon: Play,
    link: "https://www.youtube.com/@qiskit",
  },
  {
    title: "Qiskit GitHub",
    description: "Open source repository",
    icon: Code,
    link: "https://github.com/Qiskit",
  },
  {
    title: "Learning Platform",
    description: "Interactive courses",
    icon: BookOpen,
    link: "https://learning.quantum.ibm.com/",
  },
  {
    title: "Quantum Lab",
    description: "Run experiments",
    icon: Cpu,
    link: "https://quantum.ibm.com/lab",
  },
];

export const FeaturedSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(330,80%,60%)]/30 bg-[hsl(330,80%,60%)]/10 text-[hsl(330,80%,60%)] text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Quick Access
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Essential <span className="text-gradient-quantum">Quantum Links</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Direct access to the most important platforms and resources for your quantum journey.
          </p>
        </div>

        {/* Main Featured Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {featuredLinks.map((item, index) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden hover:translate-y-[-4px]"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary transition-all" />
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                  {item.stats}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <link.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                {link.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
