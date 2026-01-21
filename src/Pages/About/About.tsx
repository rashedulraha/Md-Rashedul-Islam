import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import { useLenis } from "@/Hooks/useLenis";
import HeroSection from "./components/HeroSection/HeroSection";

import OverviewTab from "./components/TabContent/OverviewTab";
import ExperienceTab from "./components/TabContent/ExperienceTab";
import SkillsTab from "./components/TabContent/SkillsTab";
import EducationTab from "./components/TabContent/EducationTab";
import TestimonialsTab from "./components/TabContent/TestimonialsTab";
import "./styles/scrollbar.css";
import CTASection from "./components/CTASection";
import NavigationTabs from "./components/NavigationTabs";

export default function About() {
  useLenis();
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <Animation />
      </div>

      <Navbar />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <HeroSection />

        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* DYNAMIC CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "experience" && <ExperienceTab />}
          {activeTab === "skills" && <SkillsTab />}
          {activeTab === "education" && <EducationTab />}
          {activeTab === "testimonials" && <TestimonialsTab />}
        </AnimatePresence>

        <CTASection />
      </main>
    </div>
  );
}
