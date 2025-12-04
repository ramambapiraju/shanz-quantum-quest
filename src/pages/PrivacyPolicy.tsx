import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Shield, BookOpen, Link2, Heart } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy & Content Disclaimer
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: December 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Mission Statement */}
            <section className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                SHAN Z - The Quantum World is a <strong className="text-foreground">free, non-commercial educational platform</strong> dedicated to making quantum computing education accessible to everyone, especially students in India. We believe knowledge should be freely available, and our goal is to remove barriers to learning by curating the best resources in one place.
              </p>
            </section>

            {/* Content Aggregation Notice */}
            <section className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Content Aggregation & Attribution</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This platform serves as an <strong className="text-foreground">integrated medium of educational resources</strong>. We aggregate and curate links to publicly available quantum computing and Qiskit learning materials from various sources including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IBM Quantum and Qiskit official documentation</li>
                  <li>YouTube educational videos and tutorials</li>
                  <li>Open-source learning platforms</li>
                  <li>Academic and educational institutions</li>
                </ul>
                <p className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
                  <strong className="text-foreground">Important:</strong> We do not host, modify, or claim ownership of any third-party content. All resources are linked directly to their original sources, and full credit remains with the original creators. We are simply providing a curated directory to help learners discover these valuable resources more easily.
                </p>
              </div>
            </section>

            {/* Fair Use & No Misuse */}
            <section className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Fair Use & Content Integrity</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We are committed to ethical content curation and operate under these principles:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong className="text-foreground">No Content Misuse:</strong> We do not copy, reproduce, or redistribute any copyrighted content. All materials are accessed through their original platforms.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong className="text-foreground">Educational Purpose Only:</strong> This platform exists solely for educational purposes with no commercial intent or monetization.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong className="text-foreground">Proper Attribution:</strong> We always credit and link to original content creators and sources.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong className="text-foreground">Respect for IP:</strong> If any content owner wishes their material to be removed from our directory, we will promptly comply.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Collection */}
            <section className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Data & Privacy</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We collect minimal data to improve user experience:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-foreground">Newsletter Subscription:</strong> If you subscribe, we only collect your email address to send educational updates. You can unsubscribe anytime.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span><strong className="text-foreground">Anonymous Analytics:</strong> We track anonymous session data to understand which resources are most helpful, without collecting personal information.</span>
                  </li>
                </ul>
                <p>
                  We do not sell, share, or misuse any user data. Your privacy is respected and protected.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-6 md:p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Questions or Concerns?</h2>
              <p className="text-muted-foreground mb-4">
                If you are a content creator and have concerns about any linked resources, or if you have questions about our privacy practices, please reach out to us.
              </p>
              <p className="text-foreground font-semibold">
                Contact: shanz.quantum@gmail.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
