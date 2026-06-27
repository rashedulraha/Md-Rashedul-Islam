"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Briefcase,
  Rocket,
  ShieldCheck,
  Users,
  Award,
  GitBranch,
  Calendar,
  Layers,
  ArrowUpRight
} from "lucide-react";
import Navbar from "../shared/Navbar/Navbar";
import Responsive from "../Responsive/Responsive";
import Link from "next/link";

interface ExperienceTimelineItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  icon: React.ComponentType<any>;
  achievements: string[];
  skills: string[];
}

const TIMELINE_EXPERIENCES: ExperienceTimelineItem[] = [
  {
    id: "it-observation",
    role: "On-site IT Shadowing & DevOps Observer",
    organization: "Rajshahi IT Operations",
    location: "Rajshahi, Bangladesh",
    period: "2025",
    icon: ShieldCheck,
    achievements: [
      "Observed senior database administrators and sysadmins deploying and maintaining enterprise infrastructure.",
      "Studied real-world systems staging, log analysis, firewall configuration, and backup restoration practices.",
      "Gained key insights into production workflows, team communications, and system security operations."
    ],
    skills: ["SysAdmin", "Ubuntu Server", "Infrastructure Security", "Log Telemetry"]
  },
  {
    id: "git-collab",
    role: "Git Pipeline Integrator & Full-Stack Developer",
    organization: "Agile Collaborative Group",
    location: "Remote / Git-Based Team",
    period: "2024 - 2025",
    icon: Users,
    achievements: [
      "Collaborated inside a 4-man elite engineering team utilizing strict Git Flow (feature branching, pull request audits, merge resolutions).",
      "Integrated secure Next.js Server Actions with backend database schemas, maintaining data integrity constraints.",
      "Co-authored modular component systems, improving code reusability across joint repositories."
    ],
    skills: ["Git Flow", "TypeScript", "Next.js App Router", "REST API Integration"]
  },
  {
    id: "mern-specialization",
    role: "Advanced MERN Stack Developer",
    organization: "Programming Hero",
    location: "Online / Career Path",
    period: "2023 - 2024",
    icon: Code,
    achievements: [
      "Completed a rigorous, career-focused specialization in Modern JavaScript, React, Node.js, Express, and MongoDB.",
      "Built, secured, and deployed full-stack web applications featuring JSON Web Token (JWT) rotation and Zod payload validation.",
      "Implemented state management systems (Zustand, Redux) and optimized client-side rendering performance."
    ],
    skills: ["React Core", "Node.js API", "Express Server", "MongoDB", "JWT Auth"]
  },
  {
    id: "cs-fundamentals",
    role: "CS Fundamentals & DSA Competitor",
    organization: "Phitron Academy",
    location: "Online / Algorithms Portal",
    period: "2023",
    icon: Award,
    achievements: [
      "Deep-dived into core computer science concepts: Data Structures (Trees, Graphs, Stacks), Algorithms (Sorting, Searching), and OOP.",
      "Solved 500+ programmatic and algorithmic challenges across online judges (URI, Codeforces, LeetCode).",
      "Analyzed code architectures for optimal time and space complexity ($O(n \\log n)$, $O(1)$) using C++ and Python."
    ],
    skills: ["Data Structures", "Algorithms", "C++ Programming", "Problem Solving"]
  }
];

export default function Experiences2() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text-primary)]">
      <Navbar />
      
      <Responsive>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto py-12 md:py-16 space-y-12">
          
          {/* Header section consistent with details page */}
          <motion.div variants={itemVariants} className="space-y-3 text-left">
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest block font-semibold">
              [ Professional Path ]
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Work Experience & Qualifications
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              An honest documentation of my collaborative team projects, on-site infrastructure shadowing, and academic full-stack certifications.
            </p>
          </motion.div>

          {/* World-Class Tech Metrics Stats Banner */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card border border-[var(--border)] rounded-xl p-5 shadow-sm text-center md:text-left"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block">Collaborations</span>
              <p className="text-2xl font-extrabold text-[var(--text-primary)]">4-Man Elite</p>
              <span className="text-[10px] font-mono text-primary block">Git Pipeline Team</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block">Production Work</span>
              <p className="text-2xl font-extrabold text-[var(--text-primary)]">15+ Projects</p>
              <span className="text-[10px] font-mono text-primary block">Ready for Cloud</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block">DSA Solved</span>
              <p className="text-2xl font-extrabold text-[var(--text-primary)]">500+ Tasks</p>
              <span className="text-[10px] font-mono text-primary block">Algorithms & DS</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block">Local Staging</span>
              <p className="text-2xl font-extrabold text-[var(--text-primary)]">Rajshahi IT</p>
              <span className="text-[10px] font-mono text-primary block">On-site Observation</span>
            </div>
          </motion.div>

          {/* Premium Timeline Section */}
          <motion.div variants={itemVariants} className="relative pl-4 md:pl-8 border-l border-[var(--border)] space-y-12 text-left">
            {TIMELINE_EXPERIENCES.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <div key={exp.id} className="relative group">
                  
                  {/* Timeline node icon indicator */}
                  <div className="absolute left-[-26px] md:left-[-42px] top-1.5 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-105">
                    <Icon className="w-2.5 h-2.5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  {/* Experience Card */}
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-[var(--text-secondary)] font-mono flex items-center gap-1.5">
                          <span>{exp.organization}</span>
                          <span className="text-[var(--border)]">|</span>
                          <span className="text-xs font-normal">{exp.location}</span>
                        </p>
                      </div>
                      
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)] border border-[var(--border)] text-xs font-mono rounded text-[var(--text-secondary)] self-start md:self-center">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-2 text-base text-[var(--text-secondary)] font-normal font-sans leading-relaxed pl-4 list-disc">
                      {exp.achievements.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>

                    {/* Tech Badges Used */}
                    <div className="flex flex-wrap gap-1.5 pt-2 pl-4">
                      {exp.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[var(--accent)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-primary/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* High-Impact CTA Linking Route to Projects */}
          <motion.div 
            variants={itemVariants}
            className="bg-card border border-[var(--border)] rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left"
          >
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Verified Production Stacks
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Ready to review real codebase architectures? Explore full-stack repositories and system statistics.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/projects"
                className="px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded-md hover:opacity-95 shadow-md flex items-center gap-2 transition-all group"
              >
                <span>Browse 15+ Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[var(--accent)] border border-[var(--border)] text-[var(--text-primary)] font-mono text-xs font-bold uppercase rounded-md hover:bg-[var(--accent)]/80 flex items-center gap-1.5 transition-all"
              >
                Establish Uplink Link <ChevronRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </Responsive>
    </div>
  );
}
