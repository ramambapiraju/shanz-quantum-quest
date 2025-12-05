import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, CheckCircle, Zap, BookOpen, Bell } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
});

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      toast.error("Invalid email", {
        description: result.error.errors[0]?.message || "Please enter a valid email address.",
      });
      return;
    }
    
    const validatedEmail = result.data.email.toLowerCase();

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: validatedEmail });
      
      if (error) {
        if (error.code === '23505') {
          toast.info("Already subscribed!", {
            description: "This email is already on our list. You're good to go!",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast.success("Welcome to the Quantum World!", {
          description: "You'll receive quantum updates and learning resources.",
        });
      }
      
      setEmail("");
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: BookOpen, text: "Weekly curated learning resources" },
    { icon: Zap, text: "Latest Qiskit updates & tutorials" },
    { icon: Bell, text: "Quantum challenge notifications" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-card border border-primary/20 relative overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              {!isSubscribed ? (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6 animate-pulse">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Stay Ahead in Quantum</span>
                  </div>
                  
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                    Get <span className="text-gradient-quantum">Quantum Updates</span>
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-center">
                    Subscribe to receive curated tutorials, Qiskit updates, and quantum computing news delivered to your inbox.
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50"
                      >
                        <benefit.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-background/50 border-border/50 focus:border-primary h-12 text-base"
                      required
                    />
                    <Button 
                      type="submit" 
                      variant="quantum" 
                      disabled={isLoading}
                      className="h-12 px-6"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Subscribing...
                        </span>
                      ) : (
                        <>
                          Subscribe
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    No spam, ever. Unsubscribe anytime. Join 5,000+ quantum learners.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-2 text-green-400">
                    You're In!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Welcome to the quantum community. Check your inbox for a welcome message.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubscribed(false)}
                    className="border-border/50"
                  >
                    Subscribe another email
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
