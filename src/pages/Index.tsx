import { ParticleBackground } from "@/components/ParticleBackground";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LearningPaths } from "@/components/LearningPaths";
import { ResourcesSection } from "@/components/ResourcesSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <LearningPaths />
      <ResourcesSection />
      <FeaturedSection />
      <AboutSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
};

export default Index;
