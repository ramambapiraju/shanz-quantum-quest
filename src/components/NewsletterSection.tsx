import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Successfully subscribed!", {
      description: "You'll receive quantum updates in your inbox.",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-card border border-primary/20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Stay Updated</span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Get Quantum Updates
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Subscribe to receive the latest tutorials, resources, and news from the quantum computing world. No spam, just knowledge.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/50 border-border/50 focus:border-primary"
                  required
                />
                <Button type="submit" variant="quantum" disabled={isLoading}>
                  {isLoading ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground mt-4">
                By subscribing, you agree to receive emails. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
