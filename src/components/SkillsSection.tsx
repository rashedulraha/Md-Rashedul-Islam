"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layout,
  Server,
  Database,
  Wrench,
  CheckCircle2,
} from "lucide-react";

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  skills: { name: string; level?: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    subtitle: "Modern, responsive & interactive interfaces",
    icon: Layout,
    skills: [
      { name: "Next.js 16 (App Router)" },
      { name: "React 19" },
      { name: "TypeScript 5.7" },
      { name: "Tailwind CSS v4" },
      { name: "Framer Motion" },
      { name: "Redux Toolkit / Zustand" },
      { name: "HTML5 & Modern CSS" },
    ],
  },
  {
    title: "Backend & API Systems",
    subtitle: "Scalable REST APIs, auth & microservices",
    icon: Server,
    skills: [
      { name: "Node.js 22" },
      { name: "Express.js 5" },
      { name: "RESTful API Design" },
      { name: "GraphQL APIs" },
      { name: "JWT & Session Auth" },
      { name: "Hono Web Framework" },
      { name: "WebSockets / Realtime" },
    ],
  },
  {
    title: "Databases & Infrastructure",
    subtitle: "Relational DBs, ORMs & deployment",
    icon: Database,
    skills: [
      { name: "PostgreSQL 16" },
      { name: "MongoDB 8" },
      { name: "Prisma ORM" },
      { name: "Redis Caching" },
      { name: "Docker Containerization" },
      { name: "Vercel & Cloud Deploy" },
      { name: "Linux Server Admin" },
    ],
  },
  {
    title: "Tools & Developer Workflows",
    subtitle: "Version control, testing & AI tools",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub Workflows" },
      { name: "AI Engineering & Agentic Coding" },
      { name: "Postman & API Testing" },
      { name: "Jest & Automated Testing" },
      { name: "CI/CD Deployment Pipelines" },
      { name: "VS Code & Terminal Tools" },
      { name: "Clean Architecture & Refactoring" },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 md:py-14 overflow-hidden"
      id="skills"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header - Matching other sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center px-4 mb-8 md:mb-10"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            TECHNICAL PROFICIENCY
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight">
            Skills &{" "}
            <span className="bg-gradient-to-r from-primary via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              core capabilities.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl mx-auto">
            Categorized technical stack based on 3 years of hands-on software development experience.
          </p>
        </motion.div>

        {/* Categories Grid - Using site-wide card-premium styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-7 card-premium transition-all duration-300"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Badges list */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-foreground text-xs font-medium glass hover:border-primary/40 hover:bg-accent transition-all duration-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
