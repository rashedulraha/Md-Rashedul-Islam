"use client";

import React from "react";
import { motion } from "framer-motion";

interface BackgroundShellProps {
  children: React.ReactNode;
}

export default function BackgroundShell({ children }: BackgroundShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      {/* Dynamic Radial Ambient Pulse Glimmer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-primary/10 via-accent/5 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.08, 0.18, 0.08],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-primary/10 via-accent/5 to-transparent blur-[120px]"
        />
      </div>

      {/* Crisp 1px Grid Pattern Layer using theme border variable */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Grid Border Accents - Thin structural visual lines mapping to main layout bounds */}
      <div className="absolute inset-0 pointer-events-none z-0 border-x border-border/60 max-w-5xl mx-auto opacity-30" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
