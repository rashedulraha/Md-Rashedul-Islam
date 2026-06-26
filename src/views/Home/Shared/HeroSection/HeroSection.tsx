"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  ArrowUpRight,
  Server,
  Download,
  FolderGit2,
  Code2,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Responsive from "@/views/Responsive/Responsive";
import CommonBg from "@/components/CommonBg/CommonBg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const },
  },
} as const;

const socials = [
  {
    href: "https://github.com/rashedulraha",
    icon: <FaGithub />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/rashedulraha",
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com/rashedulraha",
    icon: <FaXTwitter />,
    label: "X",
  },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"architecture" | "backend" | "frontend" | "devops">("architecture");
  const [liveUptime, setLiveUptime] = useState("99.982%");
  const [trafficData, setTrafficData] = useState<number[]>([30, 45, 35, 60, 50, 75, 60, 90, 80, 95]);

  // Simulate a live telemetry feed
  useEffect(() => {
    const interval = setInterval(() => {
      // Small fluctuation in uptime
      const base = 99.98;
      const dec = Math.floor(Math.random() * 20) + 10;
      setLiveUptime(`${base}${dec}%`);

      // Add new traffic point and slide chart
      setTrafficData((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const change = Math.floor(Math.random() * 30) - 15;
        const newVal = Math.max(10, Math.min(100, last + change));
        next.push(newVal);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stackTabs = {
    architecture: {
      title: "Data Architecture & Schema Design",
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      items: ["PostgreSQL", "MongoDB", "Prisma ORM", "Mongoose", "Entity Relational Modeling", "Database Indexes"],
    },
    backend: {
      title: "Secure Backends & APIs",
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      items: ["Node.js", "Express.js", "JWT Access/Refresh", "Zod Validation", "RBAC Middleware", "Rate Limiting"],
    },
    frontend: {
      title: "High-Performance User Interfaces",
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      items: ["React.js", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query"],
    },
    devops: {
      title: "DevOps & Production Deploys",
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      items: ["Docker Containers", "Nginx Reverse Proxy", "Linux/Ubuntu Admin", "SSL Configuration", "CI/CD Automations", "VPS Hosting"],
    },
  };

  return (
    <Responsive>
      <CommonBg />

      <main className="relative flex flex-col justify-center min-h-screen overflow-hidden py-16 md:py-24">
        <motion.div
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT COLUMN: Clean Copywriting (Targeting elite firms) */}
          <motion.div className="lg:col-span-6 space-y-6" variants={itemVariants}>
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                Available for Remote / Local Roles
              </span>
            </div>

            {/* Premium Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
                Rashedul{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                  Islam
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/90">
                Full-Stack Systems Engineer & Product Builder
              </p>
            </div>

            {/* Strategic Bio: Emphasizing MERN, Next.js, and DevOps */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              I specialize in architecting secure, type-safe web applications using 
              <span className="text-foreground font-semibold"> TypeScript, Next.js, and the MERN Stack</span>. 
              From designing relational/non-relational schemas to deploying containerized APIs behind Nginx reverse proxies, 
              I engineer systems that scale smoothly from local scratch to production.
            </p>

            {/* Key Information Metas */}
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-muted-foreground/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-400" /> Dhaka, Bangladesh (Open to International Remote)
              </span>
              <a
                href="mailto:rashedulraha@gmail.com"
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                rashedulraha@gmail.com
              </a>
            </div>

            {/* Navigation CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/contact">
                <Button className="rounded-xl h-11 px-6 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer">
                  Let's Connect <ArrowUpRight className="w-4.5 h-4.5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="rounded-xl h-11 px-5 font-semibold border-border bg-card/40 hover:bg-muted/80 transition-all cursor-pointer"
                >
                  <FolderGit2 className="w-4.5 h-4.5 text-indigo-400" /> View Projects
                </Button>
              </Link>
              <a href="/resume.pdf" target="_blank" download>
                <Button
                  variant="ghost"
                  className="rounded-xl h-11 px-5 font-medium gap-2 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                >
                  <Download className="w-4.5 h-4.5" /> Resume.pdf
                </Button>
              </a>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2 pt-2">
              {socials.map((s) => (
                <Link key={s.label} href={s.href} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-card/30 border-border hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all cursor-pointer"
                    aria-label={s.label}
                  >
                    {React.cloneElement(s.icon, { className: "h-4 w-4 text-foreground/80 hover:text-indigo-400" })}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Cinematic Telemetry Dashboard */}
          <motion.div className="lg:col-span-6 relative" variants={itemVariants}>
            {/* Glowing Accent Orbs in background of dashboard */}
            <div className="absolute top-12 left-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-12 right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            {/* Interactive Shell/Dashboard Container */}
            <div className="w-full bg-[#09090b]/80 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d11] border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-500 select-none">root@rashedul.dev: ~</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-zinc-400 uppercase tracking-wider font-bold">SYSTEM ACTIVE</span>
                </div>
              </div>

              {/* Core Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800/50">
                <div className="p-4 bg-[#09090b]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1">SYSTEM UPTIME</span>
                  <span className="font-mono text-base font-semibold text-emerald-400">{liveUptime}</span>
                </div>
                <div className="p-4 bg-[#09090b]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1">PROD DEPLOYMENTS</span>
                  <span className="font-mono text-base font-semibold text-white">08 Apps</span>
                </div>
                <div className="p-4 bg-[#09090b]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1">TYPE-SAFETY</span>
                  <span className="font-mono text-base font-semibold text-indigo-400">100% Strict</span>
                </div>
                <div className="p-4 bg-[#09090b]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1">DSA SOLUTIONS</span>
                  <span className="font-mono text-base font-semibold text-purple-400">500+ Solved</span>
                </div>
              </div>

              {/* Real-time Load / Traffic Sparkline */}
              <div className="p-4 bg-[#0b0b0e] border-t border-b border-zinc-800/80">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Live System Load Telemetry</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">P99 API Latency: 84ms</span>
                </div>

                <div className="h-16 w-full flex items-end pt-1">
                  <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area path */}
                    <path
                      d={`M 0 60 ${trafficData.map((val, idx) => `L ${idx * 44} ${60 - (val / 100) * 50}`).join(" ")} L 400 60 Z`}
                      fill="url(#sparklineGrad)"
                    />
                    {/* Line path */}
                    <path
                      d={trafficData.map((val, idx) => `${idx === 0 ? "M" : "L"} ${idx * 44} ${60 - (val / 100) * 50}`).join(" ")}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Pulsing indicator on the last node */}
                    <circle
                      cx="396"
                      cy={60 - (trafficData[trafficData.length - 1] / 100) * 50}
                      r="3"
                      fill="#6366f1"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>

              {/* Grouped Interactive Tech Stack Badges */}
              <div className="p-4 bg-[#09090b] space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-2.5">
                    DEVELOPMENT PIPELINE ENGINE
                  </span>
                  
                  {/* Category Toggles */}
                  <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-center">
                    {(Object.keys(stackTabs) as Array<keyof typeof stackTabs>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`py-1.5 text-[10px] sm:text-xs font-semibold rounded-lg transition-all capitalize select-none outline-none cursor-pointer ${
                          activeTab === key
                            ? "bg-zinc-800 text-white border border-zinc-700/50 shadow-sm"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Badges List */}
                <div className="min-h-[84px] p-3 rounded-xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    {stackTabs[activeTab].icon}
                    <span className="text-[11px] font-bold text-zinc-300">{stackTabs[activeTab].title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stackTabs[activeTab].items.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 font-mono text-[10px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-md hover:text-white hover:border-zinc-700/80 transition-all select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* System logs section */}
              <div className="px-4 py-2.5 bg-[#08080a] border-t border-zinc-800/80 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                <span>SYSTEM HEALTH: 100% OK</span>
                <span className="flex items-center gap-1 text-emerald-500">
                  <CheckCircle2 className="w-3 h-3" /> SECURE CONGESTION RATIO: 0.00
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </Responsive>
  );
}
