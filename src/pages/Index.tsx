import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { QuantumCreator } from "@/components/QuantumCreator";
import { LearningPaths } from "@/components/LearningPaths";
import { VideoSection } from "@/components/VideoSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import { AboutSection } from "@/components/AboutSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', crypto.randomUUID());
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <QuantumCreator />
        <LearningPaths />
        <VideoSection />
        <ResourcesSection />
        <FeaturedSection />
        <AboutSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;