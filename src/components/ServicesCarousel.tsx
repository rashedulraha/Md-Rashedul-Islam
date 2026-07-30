"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  Zap,
  Shield,
  Rocket,
  Globe,
  Cpu,
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    icon: Search,
    title: "SEO & AEO",
    desc: "SSR, SSG, semantic markup",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Lighthouse 95+, CWV",
  },
  {
    icon: Shield,
    title: "Security",
    desc: "HTTPS, CSP, XSS protection",
  },
  {
    icon: Rocket,
    title: "Deployment",
    desc: "CI/CD, Vercel, AWS, Docker",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "CDN, Edge, Multi-region",
  },
  {
    icon: Cpu,
    title: "AI Ready",
    desc: "OpenAI, Vector DB, RAG",
  },
];

export default function ServicesBox() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [storedItems, setStoredItems] = useState<number[]>([1, 2, 3]);

  const currentService = services[activeIndex];

  // Auto-rotate services
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % services.length;
        setStoredItems((items) => {
          if (items.includes(next)) return items;
          const updated = [...items, next];
          return updated.length > 3 ? updated.slice(1) : updated;
        });
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [paused]);

  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
    setStoredItems((items) => {
      if (items.includes(index)) return items;
      const updated = [...items, index];
      return updated.length > 3 ? updated.slice(1) : updated;
    });
  };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 h-full" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative flex h-72 min-h-72 w-full flex-col justify-between overflow-hidden rounded-2xl card-premium p-4"
      >
        {/* Header */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/70"
          >
            CORE CAPABILITIES
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-1 text-sm sm:text-base md:text-lg font-roboto font-medium text-foreground tracking-normal leading-snug"
          >
            Services & Solutions
          </motion.h3>
        </div>

        {/* Floating Active Pill in the Middle Empty Space (Image 2) */}
        <div className="relative z-20 my-auto flex justify-center py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onClick={() => handleServiceClick(activeIndex)}
              className="inline-flex items-center gap-3 rounded-full bg-card/90 px-4 py-2 backdrop-blur-md border border-border/80 shadow-md cursor-pointer hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shrink-0">
                <currentService.icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="flex items-baseline gap-1.5 text-left">
                <span className="text-xs font-semibold text-foreground">
                  {currentService.title}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight hidden sm:inline">
                  {currentService.desc}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D SVG Box Storage Container at Bottom (Image 2) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
          <div className="relative w-full max-w-[280px] h-24 pointer-events-auto">
            {/* Box SVG */}
            <svg
              width="100%"
              height="90"
              viewBox="0 0 280 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-90"
            >
              {/* Back flaps */}
              <path
                d="M20 20 L5 5 L60 20 L45 32 Z"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
              <path
                d="M260 20 L275 5 L220 20 L235 32 Z"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />

              {/* Box interior back wall */}
              <path
                d="M45 32 L235 32 L220 78 L60 78 Z"
                fill="hsl(var(--background))"
                opacity="0.8"
              />

              {/* Box body */}
              <path
                d="M20 32 L260 32 L240 82 L40 82 Z"
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
              />
            </svg>

            {/* Stored Items Inside Box Body */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              <AnimatePresence>
                {storedItems.map((itemIdx, posIdx) => {
                  const s = services[itemIdx];
                  const positions = [
                    { left: "6%", top: "45%" },
                    { left: "38%", top: "45%" },
                    { left: "70%", top: "45%" },
                  ];
                  const pos = positions[posIdx] || positions[0];

                  return (
                    <motion.div
                      key={itemIdx}
                      initial={{ opacity: 0, scale: 0, y: -15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0, y: 10 }}
                      transition={{
                        duration: 0.35,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="absolute flex items-center gap-1.5 rounded-full border border-border/80 bg-card/95 px-2.5 py-1 backdrop-blur-md shadow-xs"
                      style={{
                        left: pos.left,
                        top: pos.top,
                      }}
                    >
                      <s.icon className="h-3 w-3 shrink-0 text-primary" />
                      <span className="text-[9px] font-medium text-foreground truncate max-w-[50px]">
                        {s.title}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation Dots at Bottom */}
        <div className="relative z-20 mt-auto flex justify-center gap-1.5 pt-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => handleServiceClick(index)}
              className="group relative h-1.5 rounded-full transition-all duration-300 focus:outline-none"
              style={{
                width: index === activeIndex ? "1.25rem" : "0.375rem",
              }}
              aria-label={`Service ${index + 1}`}
            >
              <span
                className={`block h-full rounded-full transition-colors duration-300 ${
                  index === activeIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
