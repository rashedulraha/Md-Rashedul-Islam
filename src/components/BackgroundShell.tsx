"use client";

import React from "react";
import { motion } from "framer-motion";

interface BackgroundShellProps {
  children: React.ReactNode;
}

export default function BackgroundShell({ children }: BackgroundShellProps) {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] overflow-x-hidden">
      {/* Dynamic Radial Ambient Pulse Glimmer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-zinc-700/20 via-zinc-800/10 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-zinc-800/20 via-zinc-900/10 to-transparent blur-[120px]"
        />
      </div>

      {/* Crisp 1px Grid Pattern Layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-30" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #1f1f23 1px, transparent 1px),
            linear-gradient(to bottom, #1f1f23 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Grid Border Accents - Thin structural visual lines */}
      <div className="absolute inset-0 pointer-events-none z-0 border-x border-[#1f1f23] max-w-5xl mx-auto opacity-40" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
