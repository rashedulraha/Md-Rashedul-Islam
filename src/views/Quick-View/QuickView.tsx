"use client";

import { motion, useScroll } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
import HeroSection from "./HeroSection";
import FeaturedProjects from "./FeaturedProjects";
import ExpertiseSection from "./ExpertiseSection";
import GitHubStats from "./GitHubStats";
import CallToAction from "./CallToAction";
import TechMarquee from "../shared/HeroBanner/TechMarquee";
import Responsive from "../Responsive/Responsive";
import { ThreeDMarqueeHome } from "./ThreeDMarqueeHome";

export default function QuickView() {
  const { scrollYProgress } = useScroll();

  const userData = {
    name: "Rashedul Islam",
    title: "Full-Stack Developer | AI Integrator | AI & RAG Systems Builder",
    bio: "I'm a Full-Stack Developer passionate about building modern web applications and integrating AI into real-world solutions. I work with scalable architectures, full-stack development, and explore AI & RAG systems to create practical and impactful products.",
  };

  return (
    <>
      <ThreeDMarqueeHome />
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 ">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary/70 to-primary/30 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* <HeroSection {...userData} /> */}

        <FeaturedProjects />
        <ExpertiseSection />
        <GitHubStats />
        <CallToAction />

        {/* Footer Note */}
        <div className="text-center py-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © 2026 Rashedul Islam | Built with 💙 for creating exceptional
            digital experiences
          </p>
        </div>
      </div>
    </>
  );
}
