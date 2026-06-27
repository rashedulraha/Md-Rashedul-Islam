"use client";

import React from "react";
import { Eye, Award, BookOpen, Users } from "lucide-react";

interface ExperienceItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  meta: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "it-observation",
    category: "01 // FIELD OBSERVATION",
    title: "On-site IT Job Observation",
    subtitle: "Rajshahi IT Operations",
    description: "Observed seasoned production environments, real-world deployment methodologies, and clean code standards. Participated in team standups and learned to manage secure local server configurations under senior developer guidance.",
    icon: Eye,
    meta: "Focus: Professional Workflows & Server Setup"
  },
  {
    id: "programming-hero",
    category: "02 // MERN SPECIALIZATION",
    title: "MERN Stack Course Training",
    subtitle: "Programming Hero",
    description: "Completed an intensive, hands-on certification program in full-stack development. Mastered state management, built responsive UIs, and configured secure MongoDB/Node.js API endpoints.",
    icon: Award,
    meta: "Focus: Advanced Web Applications"
  },
  {
    id: "phitron",
    category: "03 // COMPUTER SCIENCE",
    title: "Computer Science Fundamentals",
    subtitle: "Phitron",
    description: "Built a solid academic foundation in computational problem-solving. Mastered Data Structures, Design Patterns, Database Management Systems, and Object-Oriented Programming principles.",
    icon: BookOpen,
    meta: "Focus: Algorithms & System Efficiency"
  },
  {
    id: "team-collab",
    category: "04 // TEAM COLLABORATION",
    title: "4-Man Elite Engineering Collaboration",
    subtitle: "Git Pipeline Group Project",
    description: "Collaborated in an agile, 4-man development group to build, test, and ship full-stack systems. Managed code merging, resolved integration conflicts, and maintained reliable deployment speeds using git pipelines.",
    icon: Users,
    meta: "Focus: Team Git Workflows & Deployment"
  }
];

export default function Experience() {
  return (
    <section 
      id="experience" 
      className="py-16 md:py-20 border-b border-[var(--border)]"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest block font-semibold">
            [ Credentials & Experience ]
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Experience & Collaborative History
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            A comprehensive look at my training history, on-site exposure, academic fundamentals, and team-oriented developer contributions.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp) => {
            const Icon = exp.icon;

            return (
              <div 
                key={exp.id}
                className="bg-card border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Category Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-primary tracking-wide">
                      {exp.category}
                    </span>
                    <div className="p-2 rounded-lg bg-[var(--accent)] text-[var(--text-secondary)] group-hover:text-primary transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--text-secondary)] font-mono">
                      {exp.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                    {exp.description}
                  </p>
                </div>

                {/* Card Meta Footer */}
                <div className="text-xs font-mono text-[var(--text-secondary)] border-t border-[var(--border)]/60 pt-4 flex justify-between items-center">
                  <span>{exp.meta}</span>
                  <span className="text-primary font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
