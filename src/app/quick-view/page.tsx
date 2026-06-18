"use client";

import QuickView from "@/views/Quick-View/QuickView";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (minimum 1.5 seconds for smooth animation)
    const timer = setTimeout(() => {
      setMounted(true);
      // Wait a bit more for the fade-in animation
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 1500);

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
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">
              {/* Main Spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative">
                {/* Outer Ring */}
                <div className="w-16 h-16 rounded-full border-4 border-primary/20" />

                {/* Inner Spinning Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 w-16 h-16 rounded-full border-4 border-t-primary border-r-primary/30 border-b-primary/10 border-l-primary/5"
                />

                {/* Center Dot */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                />
              </motion.div>

              {/* Loading Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-2">
                <p className="font-mono text-sm text-muted-foreground tracking-widest">
                  LOADING
                </p>

                {/* Animated Dots */}
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Optional: Brand/Logo Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
            transition={{ duration: 0.6, ease: "easeInOut" }}>
            <QuickView />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
