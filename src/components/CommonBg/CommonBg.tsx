"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* ══════════════════════════════════════════════
   CLEAN & MODERN BACKGROUND
   Minimal grid + subtle glow only
   ══════════════════════════════════════════════ */
export default function CommonBg() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  // Theme-aware colors
  const dotColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  const lineColor = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)";
  const glowColor = isDark ? "rgba(79,70,229,0.06)" : "rgba(79,70,229,0.04)";
  const spotlightColor = isDark
    ? "rgba(79,70,229,0.03)"
    : "rgba(79,70,229,0.02)";

  return (
    <>
      {/* ── Fixed Background Layer ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background">
        {/* Subtle gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

        {/* ── Modern Dot Grid ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${dotColor} 0.8px, transparent 0.8px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* ── Subtle Line Grid (only on larger screens) ── */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${lineColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        {/* ── Single Subtle Glow Orb (center) ── */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 600,
            height: 600,
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ── Secondary Glow (bottom right, very subtle) ── */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 400,
            height: 400,
            bottom: "10%",
            right: "10%",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(60px)",
            opacity: 0.5,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ── Top Accent Line (very subtle) ── */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${lineColor} 50%, transparent 90%)`,
          }}
        />
      </div>

      {/* ── Mouse Spotlight (very subtle) ── */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${spotX}px ${spotY}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
    </>
  );
}
