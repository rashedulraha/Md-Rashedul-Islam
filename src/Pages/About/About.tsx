import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import { useLenis } from "@/Hooks/useLenis";
import AboutHero from "./components/AboutHero";
import AboutTabs from "./components/AboutTabs";
import TabContent from "./components/TabContent";
import AboutCTA from "./components/AboutCTA";
import { TabType } from "./types";
import "./styles/scrollbar.css";

export default function About() {
  useLenis();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Remove the useEffect for styles since we're using CSS file now
  useEffect(() => {
    // Any other initialization logic
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <Animation />
      </div>

      <Navbar />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <AboutHero />
        <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabContent activeTab={activeTab} />
        <AboutCTA />
      </main>
    </div>
  );
}
