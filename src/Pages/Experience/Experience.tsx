import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import { useLenis } from "@/Hooks/useLenis";
import {
  ChevronRight,
  Download,
  Briefcase,
  Award,
  Star,
  Quote,
} from "lucide-react";
import {
  metricsData,
  certificationsData,
  skillCategoriesData,
  testimonialsData,
} from "@/Data/Experience/ExperienceData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Type definition for public/evolution.json
interface TimelineItem {
  role: string;
  org: string;
  duration: string;
  phase: string;
  description: string;
  impact: string;
  stack: string[];
  link?: string;
}

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

  const tabs = ["Timeline", "Expertise", "Testimonials"];

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <Animation />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        {/* --- HEADER SECTION (Matches TechStack) --- */}
        <header className="max-w-4xl mb-12 sm:mb-20 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.4em]">
            <span className="w-6 sm:w-12 h-[1.5px] bg-primary" />
            <span>Professional Career // 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
            Experience & <br />
            <span className="text-muted-foreground italic font-serif lowercase font-light">
              Career Evolution.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 pt-2">
            {metricsData.map((metric) => (
              <span
                key={metric.id}
                className="px-3 py-1 text-[9px] font-bold border border-border rounded-full bg-muted/20 text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <metric.icon size={10} className={metric.color} />
                {metric.value} {metric.label}
              </span>
            ))}
          </motion.div>
        </header>

        {/* --- DYNAMIC TABS (Matches TechStack) --- */}
        <div className="sticky top-20 z-20 mb-12 py-2 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-1 p-1 bg-muted/20 border border-border/40 rounded-2xl w-fit overflow-x-auto no-scrollbar max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 sm:px-8 py-2 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all relative ${
                  activeTab === tab
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-xl z-0 shadow-lg shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 uppercase tracking-widest">
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
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
              {activeTab === "Timeline" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4">
                  {timeline.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-6 sm:p-10 rounded-4xl border border-border/40 bg-card/10 hover:bg-card/30 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded-full border border-primary/20">
                              {item.duration}
                            </span>
                            <span className="text-[9px] text-muted-foreground uppercase font-mono tracking-widest">
                              {item.phase}
                            </span>
                          </div>
                          <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                            {item.role}
                          </h4>
                          <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase">
                            <Briefcase size={12} className="text-primary" />{" "}
                            {item.org}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-border pl-4">
                            {item.description}
                          </p>
                        </div>
                        <div className="md:w-48 space-y-4">
                          <div className="p-4 bg-background/50 rounded-2xl border border-border">
                            <p className="text-[8px] font-bold uppercase text-primary mb-1 tracking-widest text-center">
                              Outcome
                            </p>
                            <p className="text-center font-black text-sm uppercase leading-tight">
                              {item.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* EXPERTISE VIEW (Bento Style) */}
              {activeTab === "Expertise" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {skillCategoriesData.map((cat, idx) => (
                    <div
                      key={idx}
                      className="group p-6 sm:p-8 rounded-4xl border border-border/40 bg-card/10 hover:bg-card/30 hover:border-primary/30 transition-all duration-500 flex flex-col justify-between min-h-60">
                      <div className="flex justify-between items-start">
                        <div
                          className={`p-4 rounded-2xl bg-background border border-border group-hover:border-primary/50 transition-all ${cat.color}`}>
                          {cat.icon}
                        </div>
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      </div>
                      <div className="space-y-4 pt-6">
                        <h4 className="text-lg font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                          {cat.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {cat.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((s, i) => (
                            <span
                              key={i}
                              className="text-[8px] font-black uppercase tracking-widest bg-muted/40 px-2 py-1 rounded-md border border-border/50">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TESTIMONIALS VIEW */}
              {activeTab === "Testimonials" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 gap-6">
                  {testimonialsData.map((test) => (
                    <div
                      key={test.id}
                      className="p-8 sm:p-12 rounded-[2.5rem] sm:rounded-4xl border border-border/40 bg-card/10 relative overflow-hidden group">
                      <Quote className="absolute -top-4 -right-4 w-24 h-24 text-primary opacity-5 group-hover:opacity-10 transition-opacity" />
                      <div className="flex gap-1 mb-6">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-lg sm:text-xl text-foreground font-serif italic mb-8 relative z-10">
                        "{test.content}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-black text-primary-foreground italic uppercase shadow-xl shadow-primary/20">
                          {test.name[0]}
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest">
                            {test.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase">
                            {test.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- FOOTER ACTION (Matches TechStack) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 sm:mt-32 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-border/50 bg-card/5 backdrop-blur-xl flex flex-col items-center text-center space-y-8">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
            Ready to initiate the{" "}
            <span className="text-primary italic font-serif lowercase font-light">
              next project?
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="flex items-center justify-center gap-2">
              <Download size={14} /> Get Full Resume
            </Button>
            <Button>
              <Link
                to={"/contact"}
                className="flex items-center justify-center gap-2">
                Contact Me <ChevronRight size={14} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
