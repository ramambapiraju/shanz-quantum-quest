import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free Learning Platform for Gen Z India</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Welcome to</span>
            <br />
            <span className="text-gradient-quantum">The Quantum World</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Your curated library for mastering quantum computing & Qiskit. 
            Aggregating the best tutorials, learning paths, and resources — 
            <span className="text-primary font-semibold"> completely free.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" className="group">
              Start Learning Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline">
              Explore Resources
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="p-4 rounded-xl bg-card/50 border border-border/50 quantum-border-hover">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold text-foreground">100+</div>
              <div className="text-sm text-muted-foreground">Free Resources</div>
            </div>
            <div className="p-4 rounded-xl bg-card/50 border border-border/50 quantum-border-hover">
              <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold text-foreground">5K+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="p-4 rounded-xl bg-card/50 border border-border/50 quantum-border-hover col-span-2 md:col-span-1">
              <Sparkles className="w-6 h-6 text-quantum-pink mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold text-foreground">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
