import { motion, useScroll } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
import HeroSection from "./HeroSection";
import TechStackSection from "./TechStackSection";
import FeaturedProjects from "./FeaturedProjects";
import ExpertiseSection from "./ExpertiseSection";
import GitHubStats from "./GitHubStats";
import CallToAction from "./CallToAction";

export default function QuickView() {
  const { scrollYProgress } = useScroll();

  const userData = {
    name: "Rashedul Islam",
    title: "Full-Stack Architect | AI Integrator | System Designer",
    bio: "I'm a Full-Stack Developer and System Architect with a passion for building production-grade applications. My expertise spans from low-level performance optimization to high-level system design and AI integration.",
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 pt-16 sm:pt-20">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary/70 to-primary/30 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <HeroSection {...userData} />
        <TechStackSection />
        <FeaturedProjects />
        <ExpertiseSection />
        <GitHubStats />
        <CallToAction />

        {/* Footer Note */}
        <div className="text-center py-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © 2025 Rashedul Islam | Built with 💙 for creating exceptional
            digital experiences
          </p>
        </div>
      </div>
    </>
  );
}
