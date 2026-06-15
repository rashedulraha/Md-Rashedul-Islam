"use client";

import { motion, useScroll } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
import FeaturedProjects from "./FeaturedProjects";
import GitHubStats from "./GitHubStats";
import CallToAction from "./CallToAction";
import { ThreeDMarqueeHome } from "./ThreeDMarqueeHome";
import Skills from "../skills/skills";
import NetworkVisualization from "@/components/network";

export default function QuickView() {
  const { scrollYProgress } = useScroll();

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

        <div className="mt-5 md:mt-10">
          <Skills />
        </div>
        <FeaturedProjects />
        <NetworkVisualization />
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
