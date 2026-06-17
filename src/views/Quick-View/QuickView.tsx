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
      <div className="min-h-screen border-t">
        <div className="pt-5 md:pt-10 lg:pt-20 flex flex-col space-y-10 md:space-y-20 bg-background/50">
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
