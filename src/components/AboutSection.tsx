"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { ResumeButton } from "./ResumeButton";
import {
  Code,
  Server,
  Layers,
  Terminal,
  MonitorSmartphone,
  Database,
  Cloud,
  Sparkles,
  User,
} from "lucide-react";

const TextTooltip = ({
  children,
  title,
  description,
  icon: Icon,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <strong className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4 hover:decoration-primary transition-colors">
        {children}
      </strong>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-xl z-50 pointer-events-none flex flex-col gap-2 bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {title}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

const SKILLS = [
  { name: "Next.js 16", icon: Server, desc: "App Router & Server Actions" },
  { name: "React 19", icon: Layers, desc: "Server Components & Hooks" },
  {
    name: "TypeScript 5.7",
    icon: Code,
    desc: "Strict Typing & Type Inference",
  },
  {
    name: "Tailwind CSS v4",
    icon: MonitorSmartphone,
    desc: "Modern Utility-First Styling",
  },
  {
    name: "Node.js 22 & Express 5",
    icon: Terminal,
    desc: "Scalable REST APIs & Microservices",
  },
  {
    name: "PostgreSQL 16 & Prisma 6",
    icon: Database,
    desc: "Relational DB & Type-Safe ORM",
  },
  {
    name: "Docker & Linux",
    icon: Cloud,
    desc: "Containerization & Server Admin",
  },
  {
    name: "AI Engineering",
    icon: Sparkles,
    desc: "Claude Code Workflows, Ollama & n8n",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Completed Projects", value: "10+" },
    { label: "Satisfied Clients", value: "8+" },
    { label: "Code Commits", value: "3k+" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 overflow-hidden"
      id="about"
    >
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            <User className="w-3.5 h-3.5" /> About Me
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight max-w-3xl leading-tight">
            Transforming ideas into{" "}
            <span className="bg-gradient-to-r from-primary via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              high-performance web software.
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          {/* Left - Premium Framed Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-md lg:w-[45%] relative"
          >
            <div className="relative p-2.5 rounded-3xl flex flex-col space-y-3 md:space-y-5 transition-colors duration-300 bg-background/50 backdrop-blur-xl border border-border shadow-2xl ">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-muted">
                <Image
                  src="/personal_img/rashedul-about.jpeg"
                  alt="Rashedul Islam - Full Stack Developer"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 items-center">
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-modal", {
                        detail: { view: "contact" },
                      }),
                    )
                  }
                  className="group relative inline-flex w-fit cursor-pointer items-center justify-between overflow-hidden rounded-full border border-border bg-muted/50 py-1 pr-1 pl-4 font-medium text-base backdrop-blur-xl transition-all duration-300 ease-out hover:border-primary/30 hover:bg-accent active:scale-[0.98] "
                >
                  <span className="z-10 px-3 text-foreground transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-primary-foreground ">
                    Let's Work Together
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1 right-1 w-10 rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-[calc(100%-8px)]"
                  />
                  <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-primary p-2.5 transition-colors duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-transparent">
                    <svg
                      fill="none"
                      height={24}
                      viewBox="0 0 24 24"
                      width={24}
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4.5 text-primary-foreground transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    >
                      <path
                        d="M18.5 12L4.99997 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <svg
                      fill="none"
                      height={24}
                      viewBox="0 0 24 24"
                      width={24}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute size-4.5 -translate-x-6 text-primary-foreground opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    >
                      <path
                        d="M18.5 12L4.99997 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                </motion.button>
                <ResumeButton />
              </div>
            </div>
          </motion.div>

          {/* Right - Content & Bio */}
          <div className="w-full lg:w-[55%] mt-8 lg:mt-0">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  Passionate Full-Stack Developer crafting digital experiences.
                </h3>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-5 text-muted-foreground text-base leading-relaxed"
              >
                <p>
                  I specialize in building scalable web applications and
                  high-performance digital systems using modern technologies.
                  With 2+ years of experience, I focus on clean architecture,
                  smooth UI/UX, and robust API design.
                </p>

                <p>
                  I build web apps with{" "}
                  <TextTooltip
                    title="Next.js & React"
                    description="Server-side rendering, App router & reactive UI"
                    icon={Server}
                  >
                    Next.js & React
                  </TextTooltip>
                  , using{" "}
                  <TextTooltip
                    title="TypeScript"
                    description="Strict static typing for scalable codebases"
                    icon={Code}
                  >
                    TypeScript
                  </TextTooltip>{" "}
                  and{" "}
                  <TextTooltip
                    title="Tailwind CSS"
                    description="Modern utility-first styling system"
                    icon={MonitorSmartphone}
                  >
                    Tailwind CSS
                  </TextTooltip>{" "}
                  for responsive designs. For backend systems, I utilize{" "}
                  <TextTooltip
                    title="Node.js & Express"
                    description="Scalable REST APIs & backend services"
                    icon={Cloud}
                  >
                    Node.js & Cloud Services
                  </TextTooltip>
                  .
                </p>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border mt-6">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-foreground font-medium text-sm leading-relaxed">
                    Focusing on modern web standards, performance optimization,
                    and responsive design across all devices.
                  </p>
                </div>
              </motion.div>

              {/* Modern Tech Stack Grid */}
              <motion.div variants={itemVariants} className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-widest">
                  Primary Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <TextTooltip
                        key={index}
                        title={skill.name}
                        description={skill.desc}
                        icon={Icon}
                      >
                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background/60 border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors">
                          <Icon className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs font-semibold text-foreground">
                            {skill.name}
                          </span>
                        </div>
                      </TextTooltip>
                    );
                  })}
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-muted/30 to-background border border-white/5 hover:border-primary/30 transition-all duration-300"
                  >
                    <p className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-center">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
