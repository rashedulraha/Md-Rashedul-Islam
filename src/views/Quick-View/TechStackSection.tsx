"use client";

import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { techStackData } from "./Data/quickViewData";
import {
  Code2,
  Server,
  Cloud,
  Brain,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Type definitions
interface Technology {
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

interface TechCategory {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  technologies: Technology[];
}

interface TechStackDataType {
  frontend: TechCategory;
  backend: TechCategory;
  devops: TechCategory;
  ai: TechCategory;
}

const typedTechStackData = techStackData as TechStackDataType;

// Professional SVG Icons with proper colors (like GitHub)
const TechIcons = {
  // Frontend
  React: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 2.5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"
        fill="#61DAFB"
      />
      <path
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
        fill="#61DAFB"
      />
      <path
        d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
        fill="#61DAFB"
      />
    </svg>
  ),
  NextJS: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#000"
      />
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#fff"
      />
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M3 3h18v18H3V3z" fill="#3178C6" />
      <path d="M15 12.5v-2h-4v7h4v-2h-2v-3h2z" fill="#fff" />
      <path d="M19 12.5v-2h-2v7h2v-5z" fill="#fff" />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 6c-2.2 0-3.3 1.2-4 2.5-1.2-2-2.5-2.5-4-2.5-2.2 0-4 1.8-4 4s1.8 4 4 4c1.2 0 2.2-.5 3-1.5.5 1 1.5 1.5 3 1.5 2.2 0 4-1.8 4-4s-1.8-4-4-4z"
        fill="#06B6D4"
      />
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#539E43" />
      <path
        d="M12 7.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z"
        fill="#fff"
      />
    </svg>
  ),
  Express: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#000" />
      <path
        d="M12 7.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z"
        fill="#fff"
      />
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#47A248"
      />
      <path
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
        fill="#fff"
      />
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#336791"
      />
      <path
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
        fill="#fff"
      />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#2496ED"
      />
      <path
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
        fill="#fff"
      />
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#F05032"
      />
      <path
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
        fill="#fff"
      />
    </svg>
  ),
  OpenCV: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#5C3EE8"
      />
      <path
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
        fill="#fff"
      />
    </svg>
  ),
  TensorFlow: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        fill="#FF6F00"
      />
      <path
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
        fill="#fff"
      />
    </svg>
  ),
};

// Get icon based on name
function getTechIcon(name: string) {
  const iconMap: { [key: string]: React.ComponentType } = {
    React: TechIcons.React,
    "Next.js": TechIcons.NextJS,
    TypeScript: TechIcons.TypeScript,
    "Tailwind CSS": TechIcons.Tailwind,
    "Node.js": TechIcons.NodeJS,
    "Express.js": TechIcons.Express,
    MongoDB: TechIcons.MongoDB,
    PostgreSQL: TechIcons.PostgreSQL,
    Docker: TechIcons.Docker,
    Git: TechIcons.Git,
    OpenCV: TechIcons.OpenCV,
    TensorFlow: TechIcons.TensorFlow,
  };

  const IconComponent = iconMap[name];
  if (IconComponent) {
    return <IconComponent />;
  }

  // Fallback to default icon
  return <Code2 className="w-5 h-5" />;
}

// Enhanced Horizontal Marquee
function TechMarquee({
  category,
  direction = "left",
}: {
  category: TechCategory;
  direction?: "left" | "right";
}) {
  const items = [
    ...category.technologies,
    ...category.technologies,
    ...category.technologies,
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 my-1">
      {/* Gradient masks for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: direction === "left" ? [0, -1200] : [-1200, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
        whileHover={{ animationPlayState: "paused" }}>
        {items.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex flex-col items-center gap-2 group cursor-default min-w-[80px]">
            {/* Icon Container with proper colors */}
            <div
              className={`
              p-2.5 rounded-xl bg-white/5 border border-white/10
              group-hover:bg-white/10 group-hover:border-white/20
              group-hover:scale-110
              transition-all duration-300
            `}>
              <div className="text-foreground/70 group-hover:text-white transition-colors">
                {getTechIcon(tech.name)}
              </div>
            </div>

            {/* Tech Name */}
            <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-background">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <Badge
            variant="outline"
            className="mb-5 px-5 py-1.5 text-xs rounded-full border-primary/20 bg-primary/5 text-foreground">
            <Sparkles className="w-3 h-3 mr-1.5 text-primary" />
            Technical Arsenal
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Tech Stack &{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Modern tools and technologies powering my development workflow
          </p>
        </motion.div>

        {/* Tech Categories with Marquee */}
        <div className="space-y-6">
          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-2 px-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10">
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-500">
                Frontend Development
              </span>
            </div>
            <TechMarquee
              category={typedTechStackData.frontend}
              direction="left"
            />
          </motion.div>

          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2 mb-2 px-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10">
                <Server className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-500">
                Backend Development
              </span>
            </div>
            <TechMarquee
              category={typedTechStackData.backend}
              direction="right"
            />
          </motion.div>

          {/* DevOps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-2 px-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10">
                <Cloud className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-500">
                DevOps & Tools
              </span>
            </div>
            <TechMarquee
              category={typedTechStackData.devops}
              direction="left"
            />
          </motion.div>

          {/* AI/ML */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}>
            <div className="flex items-center gap-2 mb-2 px-2">
              <div className="p-1.5 rounded-lg bg-orange-500/10">
                <Brain className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-orange-500">
                AI & Emerging Tech
              </span>
            </div>
            <TechMarquee category={typedTechStackData.ai} direction="right" />
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 text-sm text-foreground hover:text-primary group">
            <span>Let's build something amazing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
