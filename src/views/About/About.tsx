"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";

import HeroSection from "./components/HeroSection/HeroSection";

import OverviewTab from "./components/TabContent/OverviewTab";
import ExperienceTab from "./components/TabContent/ExperienceTab";
import SkillsTab from "./components/TabContent/SkillsTab";
import EducationTab from "./components/TabContent/EducationTab";
import TestimonialsTab from "./components/TabContent/TestimonialsTab";
import "./styles/scrollbar.css";
import CTASection from "./components/CTASection";
import NavigationTabs from "./components/NavigationTabs";
import { useLenis } from "@/Hooks/useLenis";
import CommonBg from "@/components/CommonBg/CommonBg";

export default function About() {
  useLenis();
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <div className="relative min-h-screen w-full text-foreground overflow-x-hidden">
      <CommonBg />

      <Navbar />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <HeroSection />

        <div className="mt-10 md:mt-20">
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
        </div>
      </main>
    </div>
  );
}
