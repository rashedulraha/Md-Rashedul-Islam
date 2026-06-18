"use client";

import QuickView from "@/views/Quick-View/QuickView";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time for faster experience
    const timer = setTimeout(() => {
      setMounted(true);
      // Minimal delay for smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }, 400); // Reduced from 1000ms to 400ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen with Spinner */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }} // Reduced from 0.6 to 0.4
            className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">
              {/* Main Spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative">
                {/* Outer Ring */}
                <div className="w-14 h-14 rounded-full border-3 border-primary/20" />

                {/* Inner Spinning Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 w-14 h-14 rounded-full border-3 border-t-primary border-r-primary/30 border-b-primary/10 border-l-primary/5"
                />

                {/* Center Dot */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                />
              </motion.div>

              {/* Loading Text */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }} // Reduced from 0.3 to 0.2
                className="flex flex-col items-center gap-2">
                <p className="font-mono text-xs text-muted-foreground tracking-widest">
                  Please wait
                </p>

                {/* Animated Dots */}
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -5, 0],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.12,
                        ease: "easeInOut",
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Brand Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <p className="text-[10px] font-mono text-muted-foreground/30 tracking-[0.2em] uppercase">
                  Rashedul Islam
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Fade-in */}
      <AnimatePresence mode="wait">
        {mounted && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }} // Reduced from 0.6 to 0.4
          >
            <QuickView />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
