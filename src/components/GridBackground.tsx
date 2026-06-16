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
      className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black overflow-hidden">
      {/* Animated Grid with Mouse Follow */}
      <motion.div
        className={cn(
          "absolute inset-0",
          "bg-[size:40px_40px]",
          "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
        animate={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 30,
          mass: 0.5,
        }}
      />

      {/* Secondary Grid - Slower Movement for Depth */}
      <motion.div
        className={cn(
          "absolute inset-0",
          "bg-[size:80px_80px]",
          "bg-[linear-gradient(to_right,#e4e4e7_0.5px,transparent_0.5px),linear-gradient(to_bottom,#e4e4e7_0.5px,transparent_0.5px)]",
          "dark:bg-[linear-gradient(to_right,#262626_0.5px,transparent_0.5px),linear-gradient(to_bottom,#262626_0.5px,transparent_0.5px)]",
          "opacity-50",
        )}
        animate={{
          x: mousePosition.x * -10,
          y: mousePosition.y * -10,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 35,
          mass: 0.8,
        }}
      />

      {/* Radial Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 mask-[radial-gradient(ellipse_at_center,transparent_30%,black)]" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Responsive>
          <div className="py-5 md:py-10">
            <HeroBanner />
          </div>
        </Responsive>
      </div>

      {/* Dot Glow - Follows Mouse */}
      <motion.div
        className="pointer-events-none absolute w-75 h-75 rounded-full bg-primary/5 dark:bg-primary/10 blur-[80px] -z-10"
        animate={{
          x: mousePosition.x * 60,
          y: mousePosition.y * 40,
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 25,
          mass: 1,
        }}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
