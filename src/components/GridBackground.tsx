"use client";

import { cn } from "@/lib/utils";
import Responsive from "@/views/Responsive/Responsive";
import HeroBanner from "@/views/shared/HeroBanner/HeroBanner";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function GridBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center bg-background overflow-hidden">
      {/* ── Primary Grid (Subtle, Mouse Follow) ── */}
      <motion.div
        className={cn(
          "absolute inset-0",
          "bg-size-[50px_50px]",
          "bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]",
          "opacity-40",
        )}
        animate={{
          x: mousePosition.x * -15,
          y: mousePosition.y * -15,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 30,
          mass: 0.6,
        }}
      />

      {/* ── Secondary Grid (Slower, Creates Depth) ── */}
      <motion.div
        className={cn(
          "absolute inset-0",
          "bg-size-[100px_100px]",
          "bg-[linear-gradient(to_right,var(--border)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--border)_0.5px,transparent_0.5px)]",
          "opacity-25",
        )}
        animate={{
          x: mousePosition.x * -8,
          y: mousePosition.y * -8,
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 35,
          mass: 1,
        }}
      />

      {/* ── Radial Gradient Mask (Center Focus) ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 20%, var(--background) 80%)`,
        }}
      />

      {/* ── Subtle Dot Pattern ── */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, var(--primary) 0.8px, transparent 0.8px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full">
        <Responsive>
          <div className="py-5 md:py-10">
            <HeroBanner />
          </div>
        </Responsive>
      </div>

      {/* ── Primary Glow (Follows Mouse) ── */}
      <motion.div
        className="pointer-events-none absolute w-96 h-96 rounded-full blur-[100px] -z-10"
        style={{
          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
          opacity: 0.08,
        }}
        animate={{
          x: mousePosition.x * 80,
          y: mousePosition.y * 60,
        }}
        transition={{
          type: "spring",
          stiffness: 25,
          damping: 20,
          mass: 1.2,
        }}
      />

      {/* ── Secondary Glow (Static, Bottom Right) ── */}
      <motion.div
        className="pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[120px] -z-10 opacity-30"
        style={{
          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
          bottom: "10%",
          right: "10%",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Top Accent Line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent 10%, var(--primary) 50%, transparent 90%)`,
          opacity: 0.3,
        }}
      />
    </div>
  );
}
