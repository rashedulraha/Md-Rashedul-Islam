"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import Responsive from "../../views/Responsive/Responsive";
import {
  ArrowDown,
  Sparkles,
  Zap,
  ChevronDown,
  Code,
  Brain,
  Cpu,
} from "lucide-react";
import { GlobeToMapTransform } from "@/components/GlobeToMapTransform";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── DESKTOP VERSION ──
  const DesktopHero = () => (
    <div className="relative z-10 h-full w-full">
      <div className=" my-5 md:my-10">
        <Responsive>
          <motion.div
            style={{ opacity, scale }}
            className="h-full flex min-h-screen max-w-7xl mx-auto flex-col justify-around py-16 lg:py-24">
            {/* Top Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left space-y-4 lg:space-y-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 font-mono text-xs lg:text-sm tracking-[0.3em] text-muted-foreground bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                01 — PASSION
              </motion.p>

              <h2 className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
                <span className="relative inline-block">
                  FULL-STACK
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-primary/50 to-transparent rounded-full" />
                </span>
                <br />
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  DEVELOPER
                </span>
              </h2>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-right space-y-4 lg:space-y-6">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 font-mono text-xs lg:text-sm tracking-[0.3em] text-muted-foreground bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                02 — FOCUS
              </motion.p>
              <h2 className="text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight text-foreground leading-[1.1]">
                <span className="relative inline-block">
                  AI & RAG
                  <span className="absolute -bottom-2 right-0 w-full h-1 bg-linear-to-l from-primary/50 to-transparent rounded-full" />
                </span>
                <br />
                <span className="bg-linear-to-r from-primary/60 to-primary bg-clip-text text-transparent">
                  ENGINEER
                </span>
              </h2>
            </motion.div>
          </motion.div>
        </Responsive>
      </div>
    </div>
  );

  // ── MOBILE VERSION (Fully Centered) ──
  const MobileHero = () => (
    <div className="relative z-10 h-full w-full flex items-center justify-center  ">
      <Responsive>
        <motion.div
          style={{ opacity, scale }}
          className="flex flex-col items-center justify-center gap-6 py-6 px-4">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-3">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] text-muted-foreground bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              <Sparkles className="w-2.5 h-2.5 text-primary" />
              PASSION
            </motion.p>
          </motion.div>

          {/* Main Heading - Center Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground leading-[1.1]">
              FULL-STACK
              <br />
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent text-3xl">
                DEVELOPER
              </span>
            </h2>
          </motion.div>

          {/* Center Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center my-2">
            <Link href="/projects">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-3 border border-primary/30 rounded-full font-mono text-[10px] tracking-[0.15em] uppercase bg-background/60 backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-foreground shadow-lg shadow-primary/5">
                <span className="flex items-center gap-2">
                  Explore
                  <ArrowDown className="w-3 h-3" />
                </span>
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Bottom Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-3">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] text-muted-foreground bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              <Zap className="w-2.5 h-2.5 text-primary" />
              FOCUS
            </motion.p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground leading-[1.1] text-center">
              AI & RAG
              <br />
              <span className="bg-linear-to-r from-primary/60 to-primary bg-clip-text text-transparent text-3xl">
                ENGINEER
              </span>
            </h2>
          </motion.div>

          {/* Decorative Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mt-2">
            <Code className="w-3 h-3 text-primary/40" />
            <Brain className="w-3 h-3 text-primary/40" />
            <Cpu className="w-3 h-3 text-primary/40" />
          </motion.div>

          {/* Mobile Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <ChevronDown className="w-3.5 h-3.5 text-primary/60" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Responsive>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-7xl mx-auto opacity-70">
          <GlobeToMapTransform />
        </div>
      </div>

      {/* Render based on device */}
      {isMobile ? <MobileHero /> : <DesktopHero />}
    </section>
  );
}
