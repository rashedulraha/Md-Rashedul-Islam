import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import {
  certificationsData,
  skillCategoriesData,
  testimonialsData,
} from "@/Data/Experience/ExperienceData";
import TimelineView from "./TimelineView";
import ExpertiseView from "./ExpertiseView";
import TestimonialsView from "./TestimonialsView";
import type { TimelineItem } from "./types";

interface ExperienceContentProps {
  activeTab: string;
  timeline: TimelineItem[];
}

export default function ExperienceContent({
  activeTab,
  timeline,
}: ExperienceContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
      {/* Left Column: Context Summary */}
      <div className="lg:col-span-4 space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-primary">
              {activeTab} Overview
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
              {activeTab === "Timeline" &&
                "A strategic log of roles and technical contributions that shaped high-performance products."}
              {activeTab === "Expertise" &&
                "Deep-dive into core domains where I bridge the gap between user needs and technical feasibility."}
              {activeTab === "Testimonials" &&
                "Direct feedback from industry professionals and clients who experienced my development workflow."}
            </p>

            {/* Validation Stats */}
            <div className="pt-8 border-t border-border/40 space-y-4">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-2xl border border-border/50 bg-card/10 flex gap-4 items-center group">
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">
                      {cert.name}
                    </p>
                    <p className="text-[9px] text-muted-foreground italic">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Column: Dynamic Data Cards */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {/* TIMELINE VIEW */}
          {activeTab === "Timeline" && <TimelineView timeline={timeline} />}

          {/* EXPERTISE VIEW */}
          {activeTab === "Expertise" && (
            <ExpertiseView skillCategories={skillCategoriesData} />
          )}

          {/* TESTIMONIALS VIEW */}
          {activeTab === "Testimonials" && (
            <TestimonialsView testimonials={testimonialsData} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
