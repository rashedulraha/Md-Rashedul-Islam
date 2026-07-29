"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  Code,
  Box,
  Layout,
  Server,
  Database,
  Wind,
  Layers,
  Terminal,
  Monitor,
  Sparkles,
  X,
  ChevronRight,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getSkills } from "@/services/apiService";
import { Skeleton } from "@/components/ui/skeleton";

export interface ISkillItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  icon?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Code,
  Box,
  Server,
  Database,
  Wind,
  Layers,
  Terminal,
  Monitor,
  Sparkles,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
};

function TechModal({
  isOpen,
  onClose,
  skills,
}: {
  isOpen: boolean;
  onClose: () => void;
  skills: ISkillItem[];
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const categories = [
    {
      title: "Frontend & UI Architecture",
      matchKeys: ["frontend", "ui"],
      desc: "Modern, responsive & interactive interfaces",
      icon: Layout,
      defaultItems: [
        { name: "Next.js 15", desc: "App Router, Server Actions & Edge Runtime" },
        { name: "React 19", desc: "Server Components, Hooks & Concurrent Mode" },
        { name: "TypeScript 5.7", desc: "Strict Typing, Generics & Type Safety" },
        { name: "Tailwind CSS v4", desc: "Utility-First CSS & Design Systems" },
        { name: "Framer Motion", desc: "Production-Ready Micro Animations" },
        { name: "Vue.js 3 & Svelte 5", desc: "Reactive Component Frameworks" },
      ],
    },
    {
      title: "Backend & API Architecture",
      matchKeys: ["backend", "api", "programming languages"],
      desc: "Scalable microservices, REST & GraphQL APIs",
      icon: Server,
      defaultItems: [
        { name: "Node.js 22", desc: "Event-Driven Asynchronous Runtime" },
        { name: "Express.js 5", desc: "Web Middleware Framework" },
        { name: "Hono", desc: "Ultrafast Edge Web Framework" },
        { name: "Python 3.12 & Go 1.23", desc: "AI Scripting & Concurrent Services" },
        { name: "REST & GraphQL", desc: "Query Schemas & HTTP Protocols" },
      ],
    },
    {
      title: "Databases & Security",
      matchKeys: ["database", "authentication", "security", "storage"],
      desc: "Relational DBs, NoSQL & Auth Frameworks",
      icon: Database,
      defaultItems: [
        { name: "PostgreSQL 16 & MySQL", desc: "Relational DB, SQL & Indexing" },
        { name: "MongoDB 8 & Mongoose", desc: "NoSQL Document Aggregations" },
        { name: "Prisma 6 & Drizzle ORM", desc: "Type-Safe DB Access Layers" },
        { name: "Redis 7 & Supabase", desc: "In-Memory Caching & Realtime DB" },
        { name: "BetterAuth & JWT", desc: "Session Auth, OAuth 2.0 & RBAC" },
      ],
    },
    {
      title: "DevOps & AI Engineering",
      matchKeys: ["devops", "ai engineering", "developer tools", "testing"],
      desc: "Containerization, Cloud Deployments & AI Tooling",
      icon: Sparkles,
      defaultItems: [
        { name: "Docker", desc: "Containerization & Compose Pipelines" },
        { name: "Linux & Nginx", desc: "Server Admin & Reverse Proxy" },
        { name: "Vercel & Render", desc: "Continuous Cloud Deployment" },
        { name: "AI Workflows", desc: "Claude Code CLI, Ollama & n8n" },
        { name: "Git & GitHub", desc: "Version Control & CI/CD Pipelines" },
        { name: "Jest Testing", desc: "Unit & Integration Test Assurance" },
      ],
    },
  ];

  const categoryBlocks = categories.map((cat) => {
    const matchedItems = skills.filter((s) => {
      const catLower = s.category?.toLowerCase() || "";
      return cat.matchKeys.some((key) => catLower.includes(key));
    });

    const itemsToDisplay =
      matchedItems.length > 0
        ? matchedItems.map((s) => ({ name: s.name, desc: s.description || "Production tool" }))
        : cat.defaultItems;

    return {
      title: cat.title,
      desc: cat.desc,
      icon: cat.icon,
      items: itemsToDisplay,
    };
  });

  const totalToolsCount = categoryBlocks.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={handleOutsideClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-5xl bg-[#090d16] border border-[#1e293b] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#1e293b]/60">
              <div className="flex items-baseline gap-3">
                <h3 className="text-2xl font-bold text-[#00F0FF] tracking-tight">My Tech Stack</h3>
                <span className="text-sm text-muted-foreground font-medium">Tools I use to build projects</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-[#1e293b] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2x2 Grid Body */}
            <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 custom-scrollbar">
              {categoryBlocks.map((cat, idx) => {
                const CategoryIcon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#0f172a]/70 border border-[#1e293b] rounded-xl p-6 space-y-4 shadow-inner"
                  >
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="w-5 h-5 text-[#00F0FF]" />
                      <h4 className="text-base font-bold text-white">{cat.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{cat.desc}</p>

                    <div className="space-y-2.5 pt-2">
                      {cat.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2.5 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                          <span className="font-semibold text-white">{item.name}</span>
                          <span className="text-muted-foreground/40">—</span>
                          <span className="text-muted-foreground/70 truncate">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#060911] border-t border-[#1e293b]/60 text-center">
              <span className="text-xs text-muted-foreground/80 font-medium">
                {totalToolsCount} tools across {categoryBlocks.length} categories
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TechStack() {
  const [skills, setSkills] = useState<ISkillItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  useEffect(() => {
    async function loadSkills() {
      setIsLoading(true);
      try {
        const res = await getSkills();
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setSkills(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load skills:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSkills();
  }, []);

  const formattedSkills = useMemo(() => {
    if (skills.length === 0) return [];
    return skills.map((s) => ({
      name: s.name,
      icon: iconMap[s.icon || "Code"] || Code,
    }));
  }, [skills]);

  const marqueeRows = useMemo(() => {
    if (formattedSkills.length === 0) {
      return { row1: [], row2: [], row3: [] };
    }
    const third = Math.ceil(formattedSkills.length / 3);
    return {
      row1: formattedSkills.slice(0, third),
      row2: formattedSkills.slice(third, third * 2),
      row3: formattedSkills.slice(third * 2),
    };
  }, [formattedSkills]);

  const { row1, row2, row3 } = marqueeRows;
  const totalCount = skills.length || 21;

  return (
    <>
      <div
        ref={sectionRef}
        className="md:col-span-6 lg:col-span-5 lg:row-span-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl transition-all duration-300 h-full min-h-72 card-premium"
        >
          {/* Top Title exact match */}
          <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-semibold"
            >
              TECH STACK
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-xl md:text-2xl font-medium text-foreground tracking-tight"
            >
              My development toolkit
            </motion.h3>
          </div>

          {/* Marquee Rows Container */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-3 overflow-hidden pt-14 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {isLoading ? (
              <div className="flex flex-col gap-3 justify-center items-center h-full">
                <div className="flex gap-3 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-9 w-28 rounded-full" />
                  ))}
                </div>
                <div className="flex gap-3 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-9 w-28 rounded-full" />
                  ))}
                </div>
                <div className="flex gap-3 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-9 w-28 rounded-full" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Row 1 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex w-max animate-marquee-left gap-3 hover:paused"
                >
                  {[...row1, ...row1, ...row1].map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent glass"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold text-foreground">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Row 2 */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex w-max animate-marquee-right gap-3 hover:paused"
                >
                  {[...row2, ...row2, ...row2].map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent glass"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold text-foreground">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Row 3 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex w-max animate-marquee-left gap-3 hover:paused"
                >
                  {[...row3, ...row3, ...row3].map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent glass"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold text-foreground">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </>
            )}
          </div>

          {/* Bottom Bar exact match */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-200 text-primary text-xs font-semibold backdrop-blur-md"
            >
              <span>See all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>

            <span className="w-px h-4 bg-border/60" />

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/60 backdrop-blur-md border border-border/40 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{totalCount}+ TOOLS</span>
            </div>
          </div>
        </motion.div>
      </div>

      <TechModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        skills={skills}
      />
    </>
  );
}

export default TechStack;
