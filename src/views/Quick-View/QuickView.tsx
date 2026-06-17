"use client";

import { motion, useScroll } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";

import GitHubStats from "./GitHubStats";
import { ThreeDMarqueeHome } from "./ThreeDMarqueeHome";

import NetworkVisualization from "@/components/network";
import Footer from "./Footer.quick";
import FeaturedProjects from "./FeaturedProjects";

import AboutQuickView from "./AboutQuickView";
import SkillsQuickView from "./SkillsQuickView";

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

        <div className="pt-5 md:pt-10 lg:pt-20 flex flex-col space-y-10 md:space-y-20">
          <AboutQuickView />
          <SkillsQuickView />
          <FeaturedProjects />
          <NetworkVisualization />
          <GitHubStats />
        </div>
        <Footer />
      </div>
    </>
  );
}
