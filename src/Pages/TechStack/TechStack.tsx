import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techData, technologies } from "@/Data/TechStack/TechStack";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import { useLenis } from "@/Hooks/useLenis";
import { ChevronRight, ShieldCheck, Globe, Cpu } from "lucide-react";

export default function TechStack() {
  useLenis();
  const [activeTab, setActiveTab] = useState(techData[0].category);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500">
      <Navbar />

      {/* Subtle Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <Animation />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        {/* --- HEADER SECTION --- */}
        <header className="max-w-4xl mb-12 sm:mb-20 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.4em]">
            <span className="w-6 sm:w-12 h-[1.5px] bg-primary" />
            <span>Engineer's Stack // 2026 Edition</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
            Architecture & <br />
            <span className="text-muted-foreground italic font-serif lowercase font-light">
              Technical ecosystem.
            </span>
          </motion.h1>

          {/* Core Skills Badges for HR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 pt-2">
            {[
              "Full-Stack Development",
              "React & Next.js Specialist",
              "API Integration",
              "Clean Architecture",
              "UI/UX Design",
              "AI Project Development",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-[9px] font-bold border border-border rounded-full bg-muted/20 text-muted-foreground uppercase tracking-wider">
                {skill}
              </span>
            ))}
          </motion.div>
        </header>

        {/* --- DYNAMIC TABS (Responsive Scrollable) --- */}
        <div className="sticky top-20 z-20 mb-12 py-2 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-1 p-1 bg-muted/20 border border-border/40 rounded-2xl w-fit overflow-x-auto no-scrollbar max-w-full">
            {techData.map((group) => (
              <button
                key={group.category}
                onClick={() => setActiveTab(group.category)}
                className={`whitespace-nowrap px-4 sm:px-8 py-2 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all relative ${
                  activeTab === group.category
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                {activeTab === group.category && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-xl z-0 shadow-lg shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 uppercase tracking-widest">
                  {group.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
          {/* Left: Summary & Stats */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-primary">
                    {activeTab} Domain
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                    {
                      techData.find((g) => g.category === activeTab)
                        ?.description
                    }
                  </p>
                </div>

                {/* Technical Stats for Recruiter */}
                <div className="grid grid-cols-1 gap-4 pt-6">
                  {[
                    {
                      icon: <Cpu size={14} />,
                      label: "Performance Focus",
                      desc: "99.9% Uptime logic",
                    },
                    {
                      icon: <ShieldCheck size={14} />,
                      label: "Security First",
                      desc: "Best practices followed",
                    },
                    {
                      icon: <Globe size={14} />,
                      label: "Global Standards",
                      desc: "W3C Compliance",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-2xl border border-border/50 bg-card/10">
                      <div className="text-primary mt-1">{item.icon}</div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest">
                          {item.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Skill Bento Grid */}
          <div className="lg:col-span-8">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {techData
                .find((g) => g.category === activeTab)
                ?.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative p-6 sm:p-8 rounded-4xl border border-border/40 bg-card/10 hover:bg-card/30 hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-45 sm:min-h-55">
                    <div className="flex justify-between items-start">
                      <div className="p-4 rounded-2xl bg-background border border-border group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                        {skill.icon}
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                          Expertise
                        </p>
                        <span className="text-xs font-black text-primary uppercase">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {skill.description}
                        </p>
                      </div>

                      {/* Minimal Blueprint Line */}
                      <div className="relative h-0.5 w-full bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div>

        {/* --- TECHNOLOGY OVERVIEW SECTION --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 sm:mt-32 space-y-10">
          {/* Heading */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              Complete Technology <span className="text-primary">Stack</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              A modern and scalable tech stack I use to build high-performance
              applications.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="
                group p-4 rounded-2xl border border-border/40
                bg-card/10 backdrop-blur
                hover:border-primary/40 hover:bg-card/30
                transition-all duration-300
                flex flex-col items-center gap-3
              ">
                  <div
                    className="
                  w-12 h-12 rounded-xl
                  flex items-center justify-center
                  bg-background/40
                  group-hover:scale-110 transition-transform
                ">
                    <Icon className={`w-6 h-6 ${tech.color}`} />
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-center">
                    {tech.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* --- RESPONSIVE FOOTER (Quick Action) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 sm:mt-32 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-border/50 bg-card/5 backdrop-blur-xl flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
              Let's build the{" "}
              <span className="text-primary italic">Future</span> together.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Available for full-stack engineering roles and strategic technical
              consultations. Expert in React, TypeScript, and Next.js with a
              passion for clean architecture.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="px-10 py-4 text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              Launch Conversation
            </button>
            <button className="px-10 py-4 text-[10px] font-black uppercase tracking-widest border border-border hover:bg-muted/50 rounded-2xl transition-all flex items-center justify-center gap-2">
              View Project Lab <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
