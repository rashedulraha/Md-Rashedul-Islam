"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";

// --- Data: Developer Social Platforms with Official SVG/Image links ---
const social = [
  {
    id: 1,
    name: "GitHub",
    role: "Code Repository & Collaboration",
    email: "github.com/rashedulraha",
    profile: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg",
    url: "https://github.com/rashedulraha",
  },
  {
    id: 2,
    name: "LinkedIn",
    role: "Professional Networking",
    email: "linkedin.com/in/rashedulraha",
    profile: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
    url: "https://linkedin.com/in/rashedulraha",
  },
  {
    id: 3,
    name: "X (Twitter)",
    role: "Tech Community & Updates",
    email: "x.com/rashedulraha",
    profile: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg",
    url: "https://x.com/rashedulraha",
  },
  {
    id: 4,
    name: "Stack Overflow",
    role: "Q&A for Developers",
    email: "stackoverflow.com/users/rashedulraha",
    profile:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stackoverflow.svg",
    url: "https://stackoverflow.com/users/rashedulraha",
  },
  {
    id: 5,
    name: "Portfolio",
    role: "Projects & Experience",
    email: "rashedul.dev",
    profile: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg",
    url: "https://rashedul.dev",
  },
  {
    id: 6,
    name: "Dev.to",
    role: "Blog & Articles",
    email: "dev.to/rashedulraha",
    profile: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/devdotto.svg",
    url: "https://dev.to/rashedulraha",
  },
  {
    id: 7,
    name: "GitLab",
    role: "DevOps & CI/CD",
    email: "gitlab.com/rashedulraha",
    profile: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gitlab.svg",
    url: "https://gitlab.com/rashedulraha",
  },
  {
    id: 8,
    name: "Hashnode",
    role: "Technical Writing",
    email: "hashnode.com/@rashedulraha",
    profile: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hashnode.svg",
    url: "https://hashnode.com/@rashedulraha",
  },
];

// --- Utility for fallback images ---
const safeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

// --- Custom hook for mobile detection ---
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreenSize = (): void =>
      setIsMobile(window.innerWidth < breakpoint);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();

  const containerRadius = isMobile ? 130 : 200;
  const profileSize = isMobile ? 60 : 80;
  const containerSize = containerRadius * 2 + 100;

  // Calculate rotation for each profile
  const getRotation = React.useCallback(
    (index: number): number => (index - activeIndex) * (360 / social.length),
    [activeIndex],
  );

  // Navigation
  const next = () => setActiveIndex((i) => (i + 1) % social.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + social.length) % social.length);

  const handleProfileClick = React.useCallback(
    (index: number) => {
      if (index === activeIndex) {
        window.open(social[index].url, "_blank");
      } else {
        setActiveIndex(index);
      }
    },
    [activeIndex],
  );

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 relative min-h-[400px] bg-background text-foreground transition-colors duration-300">
      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}>
        {/* Single orbit circle with Shadcn Border */}
        <div
          className="absolute rounded-full border border-border"
          style={{
            width: containerRadius * 2,
            height: containerRadius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Active Person Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={social[activeIndex].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="z-10 bg-card backdrop-blur-sm shadow-xl border border-border rounded-xl p-3 md:p-4 w-48 md:w-52 text-center">
            {/* Active Image Box with Shadcn Ring/Border */}
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              src={social[activeIndex].profile}
              alt={social[activeIndex].name}
              onError={safeImage}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto -mt-10 md:-mt-12 border-4 border-background  object-contain p-2 shadow-md bg-white"
            />

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}>
              <h2 className="mt-2 text-base md:text-lg font-bold text-card-foreground">
                {social[activeIndex].name}
              </h2>
              <div className="flex items-center justify-center text-xs md:text-sm text-muted-foreground mt-1">
                <Briefcase size={12} className="mr-1" />
                <span className="truncate">{social[activeIndex].role}</span>
              </div>
              <div className="flex items-center justify-center text-xs text-muted-foreground/80 mt-0.5">
                <Mail size={12} className="mr-1" />
                <span className="truncate">{social[activeIndex].email}</span>
              </div>
            </motion.div>

            {/* Control buttons powered by Shadcn Button primitives */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center items-center mt-3 space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border">
                <ChevronLeft size={16} />
              </Button>
              <Button
                onClick={() => window.open(social[activeIndex].url, "_blank")}
                size="sm"
                className="h-8 px-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Visit
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border">
                <ChevronRight size={16} />
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting Profiles with Counter-Rotation */}
        {social.map((p, i) => {
          const rotation = getRotation(i);
          return (
            <motion.div
              key={p.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
              }}>
              {/* Counter-rotation to keep image upright */}
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="w-full h-full">
                <motion.img
                  src={p.profile}
                  alt={p.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full object-contain rounded-full cursor-pointer transition-all duration-300 p-2 bg-card ${
                    i === activeIndex
                      ? "border-4 border-primary shadow-lg bg-white "
                      : "border-2 border-border hover:border-primary/70 bg-white"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
