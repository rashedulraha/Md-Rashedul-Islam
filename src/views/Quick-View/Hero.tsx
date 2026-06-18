"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SentientSphere } from "./SentientSphere";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-screen w-full overflow-hidden  ">
      {/* 3D Sphere Background */}
      <div className="absolute inset-0 opacity-60">
        <SentientSphere />
      </div>

      {/* Typography Overlay */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 md:px-12 md:py-20">
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">
            01 — PASSION
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            FULL-STACK
            <br />
            <span className="italic text-primary">DEVELOPER</span>
          </h2>
        </motion.div>

        {/* Center Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <Link href="/projects">
            <motion.button
              data-cursor-hover
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 border border-border rounded-full font-mono text-sm tracking-widest uppercase bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-500 text-foreground">
              Explore Work
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="self-end text-right">
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">
            02 — FOCUS
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            AI & RAG
            <br />
            <span className="italic text-primary">ENGINEER</span>
          </h2>
        </motion.div>
      </motion.div>
    </section>
  );
}
