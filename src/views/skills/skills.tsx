"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Server,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../shared/Navbar/Navbar";

const coreLanguages = [
  { name: "TypeScript", level: "Expert" },
  { name: "JavaScript", level: "Expert" },
  { name: "Python", level: "Proficient" },
  { name: "SQL", level: "Proficient" },
  { name: "HTML/CSS", level: "Expert" },
];

const techStack = {
  frontend: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Framer Motion",
    "Shadcn/UI",
    "Zustand",
  ],
  backend: ["Node.js", "Express", "NestJS", "Prisma", "REST APIs", "GraphQL"],
  tools: ["Git", "Docker", "Postman", "VS Code", "Figma", "Linux", "Vercel"],
};

const projectImplementations = [
  {
    stack: "Next.js + Tailwind + Prisma",
    outcome: "Full-stack SaaS & E-commerce",
  },
  {
    stack: "Node.js + Express + PostgreSQL",
    outcome: "REST APIs & Auth Systems",
  },
  {
    stack: "React + Framer Motion + Zustand",
    outcome: "Interactive SPAs",
  },
];

const currentlyLearning = [
  { name: "Rust", focus: "Systems Programming" },
  { name: "AWS", focus: "Cloud Deployment" },
  { name: "System Design", focus: "Scalable Architecture" },
];

// =========================================================
// 🎨 HELPER COMPONENTS
// =========================================================

function LevelBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    Expert:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    Proficient:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    Learning:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  };
  return (
    <Badge
      className={`text-[10px] px-2 py-0 font-medium border ${styles[level] || styles.Proficient}`}>
      {level}
    </Badge>
  );
}

export default function Skills() {
  return (
    <section className="relative bg-background">
      <Navbar />
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Skills & Expertise
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            A comprehensive overview of my technical stack and continuous
            learning journey.
          </p>
        </div>

        {/* Single Master Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-2 border-border rounded-2xl bg-card overflow-hidden">
          {/* PARTITION 1: Core Languages */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">
                Core Languages
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {coreLanguages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-colors">
                  <span className="text-sm font-medium text-foreground">
                    {lang.name}
                  </span>
                  <LevelBadge level={lang.level} />
                </div>
              ))}
            </div>
          </div>

          {/* PARTITION 2: Technology Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-border">
            {/* Frontend */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Frontend
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md bg-muted border border-border text-foreground hover:border-primary/50 hover:text-primary transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Backend
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md bg-muted border border-border text-foreground hover:border-primary/50 hover:text-primary transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Tools & DevOps
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.tools.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md bg-muted border border-border text-foreground hover:border-primary/50 hover:text-primary transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* PARTITION 3: Implementations & Learning */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Project Implementations */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-border">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  What I Build
                </h3>
              </div>
              <div className="space-y-2.5">
                {projectImplementations.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-0.5">
                        {item.stack}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        <span>{item.outcome}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Currently Learning */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  Currently Learning
                </h3>
              </div>
              <div className="space-y-2.5">
                {currentlyLearning.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 border border-border/50 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {item.focus}
                        </div>
                      </div>
                    </div>
                    <LevelBadge level="Learning" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
