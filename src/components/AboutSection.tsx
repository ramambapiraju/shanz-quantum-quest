import { Target, Heart, Rocket } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative bg-quantum-darker/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-gradient-quantum">SHAN Z</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Our Mission</h3>
              <p className="text-muted-foreground text-sm">
                To democratize quantum computing education and make it accessible to every curious mind in India.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-secondary/10 border border-secondary/20 mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Built with Love</h3>
              <p className="text-muted-foreground text-sm">
                Created by passionate learners for learners. Every resource is carefully curated and verified.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-quantum-pink/10 border border-quantum-pink/20 mb-4">
                <Rocket className="w-8 h-8 text-quantum-pink" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">For Gen Z</h3>
              <p className="text-muted-foreground text-sm">
                Designed specifically for the next generation of quantum pioneers. Modern, fast, and intuitive.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-card border border-border/50">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              <span className="text-foreground font-semibold">SHAN Z</span> is more than just a website — it's a movement to accelerate quantum literacy in India. We aggregate the best free resources from IBM Quantum, MIT, and other leading institutions, removing the friction of endless searching. Whether you're a student exploring quantum for the first time or a professional looking to upskill, 
              <span className="text-primary font-semibold"> shanz.co.in</span> is your gateway to the quantum future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
