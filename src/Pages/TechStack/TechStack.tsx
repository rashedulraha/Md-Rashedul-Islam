import { useState, useMemo } from "react";
import { useLenis } from "@/Hooks/useLenis";

// Layout & Background
import Navbar from "../shared/Navbar/Navbar";

// Data
import { techData, technologies } from "@/Data/TechStack/TechStack";
import TechHeader from "./TechHeader";
import TechTabs from "./TechTabs";
import TechSummary from "./TechSummary";
import SkillBentoGrid from "./SkillBentoGrid";
import TechOverview from "./TechOverview";
import TechFooter from "./TechFooter";
import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";

// Child Components

export default function TechStack() {
  useLenis();

  // Active Tab State
  const [activeTab, setActiveTab] = useState(techData[0].category);

  // Find the current category data based on activeTab
  const currentCategory = useMemo(() => {
    return techData.find((group) => group.category === activeTab);
  }, [activeTab]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500">
      <Navbar />

      {/* Subtle Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <AnimatedGridBackground />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        {/* 1. Header */}
        <TechHeader />

        {/* 2. Tabs Navigation */}
        <TechTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          techData={techData}
        />

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
          {/* Left: Summary & Stats */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-12">
            {currentCategory && <TechSummary categoryData={currentCategory} />}
          </div>

          {/* Right: Skill Bento Grid */}
          <div className="lg:col-span-8">
            {currentCategory && (
              <SkillBentoGrid skills={currentCategory.skills} />
            )}
          </div>
        </div>

        {/* 3. Technology Overview */}
        <TechOverview technologies={technologies} />

        {/* 4. Footer CTA */}
        <TechFooter />
      </main>
    </div>
  );
}
