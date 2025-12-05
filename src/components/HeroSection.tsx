import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen, Play, ExternalLink, Atom } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[hsl(330,80%,60%)]/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 animate-fade-in backdrop-blur-sm">
            <Atom className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-medium text-primary">Free Quantum Learning Hub for India's Gen Z</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">SHAN Z</span>
            <br />
            <span className="text-gradient-quantum">The Quantum World</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Your curated library for mastering <span className="text-primary font-semibold">quantum computing</span> & <span className="text-secondary font-semibold">Qiskit</span>. 
            We aggregate the best tutorials, learning paths, and official IBM resources — 
            <span className="text-[hsl(330,80%,60%)] font-semibold"> completely free, forever.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#learning-paths">
              <Button variant="hero" size="lg" className="group text-lg h-14 px-8">
                Start Learning Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="https://www.youtube.com/playlist?list=PLOFEBzvs-VvrgHZt3exM_NNiNKtZlHvZi" target="_blank" rel="noopener noreferrer">
              <Button variant="hero-outline" size="lg" className="group text-lg h-14 px-8">
                <Play className="w-5 h-5 mr-2" />
                Watch Qiskit Tutorial
                <ExternalLink className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#resources" 
              className="p-4 rounded-xl bg-card/50 border border-border/50 quantum-border-hover backdrop-blur-sm group cursor-pointer"
            >
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-heading font-bold text-foreground">100+</div>
              <div className="text-sm text-muted-foreground">Free Resources</div>
            </a>
            <a 
              href="https://quantum.ibm.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-card/50 border border-border/50 quantum-border-hover backdrop-blur-sm group cursor-pointer"
            >
              <Users className="w-6 h-6 text-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-heading font-bold text-foreground">500K+</div>
              <div className="text-sm text-muted-foreground">Qiskit Users</div>
            </a>
            <a 
              href="https://quantum.ibm.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-card/50 border border-border/50 quantum-border-hover backdrop-blur-sm group cursor-pointer"
            >
              <Sparkles className="w-6 h-6 text-[hsl(330,80%,60%)] mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-heading font-bold text-foreground">127+</div>
              <div className="text-sm text-muted-foreground">Qubits Access</div>
            </a>
            <a 
              href="#learning-paths" 
              className="p-4 rounded-xl bg-card/50 border border-border/50 quantum-border-hover backdrop-blur-sm group cursor-pointer"
            >
              <Atom className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-heading font-bold text-foreground">4</div>
              <div className="text-sm text-muted-foreground">Learning Paths</div>
            </a>
          </div>

          {/* Resources Attribution */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Resources curated from</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-60">
              <a href="https://www.ibm.com/quantum" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                <span className="font-heading font-bold text-base md:text-lg text-foreground">IBM Quantum</span>
              </a>
              <a href="https://qiskit.org" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                <span className="font-heading font-bold text-base md:text-lg text-foreground">Qiskit</span>
              </a>
              <a href="https://azure.microsoft.com/en-us/products/quantum" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                <span className="font-heading font-bold text-base md:text-lg text-foreground">Microsoft Azure Quantum</span>
              </a>
              <a href="https://quantumai.google/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                <span className="font-heading font-bold text-base md:text-lg text-foreground">Google Quantum AI</span>
              </a>
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-4">Not affiliated with IBM, Microsoft, or Google. All trademarks belong to their respective owners.</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#learning-paths" className="block">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2 hover:border-primary transition-colors">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </a>
      </div>
    </section>
  );
};
