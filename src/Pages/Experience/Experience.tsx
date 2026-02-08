import { useState, useEffect } from "react";

import Navbar from "../shared/Navbar/Navbar";

import { useLenis } from "@/Hooks/useLenis";
import type { TimelineItem } from "./types";
import ExperienceHeader from "./ExperienceHeader";
import ExperienceTabs from "./ExperienceTabs";
import ExperienceContent from "./ExperienceContent";
import ExperienceFooter from "./ExperienceFooter";
import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";

export default function Experience() {
  useLenis();
  const [activeTab, setActiveTab] = useState("Timeline");
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    fetch("/evolution.json")
      .then((res) => res.json())
      .then((data: TimelineItem[]) => setTimeline(data))
      .catch((err) => console.error("Error loading timeline:", err));
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <AnimatedGridBackground />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        <ExperienceHeader />

        <ExperienceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <ExperienceContent activeTab={activeTab} timeline={timeline} />

        <ExperienceFooter />
      </main>
    </div>
  );
}
