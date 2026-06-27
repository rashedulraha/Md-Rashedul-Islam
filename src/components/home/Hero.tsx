"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Mail, FileText, Check, Globe } from "lucide-react";

export interface HeroProps {
  onExploreClick?: () => void;
  email?: string;
  resumeUrl?: string;
}

export default function Hero({
  onExploreClick,
  email = "rashedulraha.bd@gmail.com",
  resumeUrl = "#"
}: HeroProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bangladeshTime, setBangladeshTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setBangladeshTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of the card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max tilt angle (degrees)
    const maxTilt = 12;
    const rY = (mouseX / (width / 2)) * maxTilt;
    const rX = -(mouseY / (height / 2)) * maxTilt;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      className="relative py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12 border-b border-[var(--border)] overflow-hidden"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      {/* Left side: Content Info */}
      <div className="flex-1 space-y-6 text-left max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--accent)]/30 text-xs font-mono text-[var(--text-secondary)]">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>Dhaka, BD Node</span>
          <span className="text-[var(--border)]">|</span>
          <span>LT: {bangladeshTime || "--:--:--"}</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-wide text-primary uppercase font-mono">
            Md Rashedul Islam
          </h2>
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-[var(--text-primary)]">
            I build type-safe, production-ready web applications and manage secure cloud infrastructures.
          </h1>
        </div>

        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          Full-Stack & DevOps Engineer from Bangladesh. Specializing in Next.js development, PostgreSQL/MongoDB database optimization, and Docker/Nginx-driven Linux VPS microservice architectures.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md shadow-md hover:bg-primary/95 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>Explore Production Path</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 bg-[var(--accent)] border border-[var(--border)] text-[var(--text-primary)] font-medium text-sm rounded-md hover:bg-[var(--accent)]/80 transition-all flex items-center gap-2 cursor-pointer"
              title="Copy email to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Address Copied</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>Contact Me</span>
                </>
              )}
            </button>
            
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-transparent border border-[var(--border)] text-[var(--text-primary)] font-medium text-sm rounded-md hover:bg-[var(--accent)] transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[var(--text-secondary)]" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right side: 3D interactive tilt container */}
      <div className="flex justify-center items-center shrink-0 w-full md:w-auto">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          className="relative aspect-square w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl border border-[var(--border)] bg-card text-card-foreground p-6 shadow-2xl flex flex-col justify-between font-mono select-none overflow-hidden group cursor-pointer"
        >
          {/* Glossy reflection overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ transform: "translateZ(10px)" }}
          />

          {/* Card Border Pattern and Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none" />

          {/* Top Panel Bar */}
          <div 
            className="flex justify-between items-center text-[10px] text-[var(--text-secondary)] border-b border-[var(--border)] pb-3"
            style={{ transform: "translateZ(30px)" }}
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>[TELEMETRY_BOX_1.0.0]</span>
            </span>
            <span className="text-emerald-500">● LIVE</span>
          </div>

          {/* Interactive Core */}
          <div 
            className="flex-1 flex flex-col items-center justify-center text-center p-4"
            style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
          >
            {/* Visual Representation of 3D Engine */}
            <div className="relative w-full h-full flex flex-col items-center justify-center border border-dashed border-[var(--border)] rounded-lg bg-[var(--accent)]/20 p-4 transition-colors group-hover:border-primary/50 group-hover:bg-primary/5">
              <Globe className="w-12 h-12 text-primary/40 mb-3 animate-spin [animation-duration:15s]" />
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block">
                [3D_RENDER_ENGINE]
              </span>
              <span className="text-[10px] text-[var(--text-secondary)] mt-1 font-mono">
                Md Rashedul Islam
              </span>
              <span className="text-[9px] text-primary mt-2 font-mono border border-primary/20 px-2 py-0.5 rounded-full bg-primary/5">
                Full-Stack & DevOps
              </span>
            </div>
          </div>

          {/* Bottom telemetry line */}
          <div 
            className="text-[10px] text-[var(--text-secondary)] border-t border-[var(--border)] pt-3 flex justify-between items-center"
            style={{ transform: "translateZ(30px)" }}
          >
            <span>MD_RASHEDUL_ISLAM.EXE</span>
            <span>STATUS: 200 OK</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
