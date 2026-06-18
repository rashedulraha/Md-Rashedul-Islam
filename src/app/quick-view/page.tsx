"use client";

import QuickView from "@/views/Quick-View/QuickView";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            {/* Subtle background grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, var(--border) 0.8px, transparent 0.8px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Subtle glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, var(--primary) 0%, transparent 50%)`,
                opacity: 0.05,
                filter: "blur(80px)",
              }}
            />

            <div className="relative flex flex-col items-center gap-8">
              {/* ── Arc Spinner ── */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative w-16 h-16">
                {/* SVG Arc */}
                <svg className="w-full h-full" viewBox="0 0 64 64" fill="none">
                  {/* Background ring (subtle) */}
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="var(--border)"
                    strokeWidth="2"
                    opacity="0.3"
                  />

                  {/* Spinning arc */}
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="132 44"
                    className="drop-shadow-[0_0_8px_var(--primary)]"
                  />
                </svg>

                {/* Center pulsing dot */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                />
              </motion.div>

              {/* ── Loading Text ── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-2">
                <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
                  Loading
                </p>

                {/* Animated dots */}
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -4, 0],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                      className="w-1 h-1 rounded-full bg-primary"
                    />
                  ))}
                </div>
              </motion.div>

              {/* ── Brand Signature ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" />
                  <p className="text-[10px] font-mono text-muted-foreground/50 tracking-[0.25em] uppercase">
                    Rashedul Islam
                  </p>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {mounted && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}>
            <QuickView />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
