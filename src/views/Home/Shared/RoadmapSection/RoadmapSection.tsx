"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  KeyRound,
  Gauge,
  Terminal,
  ShieldCheck,
  Server,
  Code2,
  Cpu,
  Check,
  Zap,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Phase {
  number: number;
  title: string;
  subtitle: string;
  technologies: string[];
  description: string;
  projectApplication: {
    project: string;
    details: string;
  };
  keyConcepts: string[];
}

const phases: Phase[] = [
  {
    number: 1,
    title: "Architecture & Data Modeling",
    subtitle: "Structuring robust storage layers with referential integrity",
    technologies: ["PostgreSQL", "MongoDB", "Prisma ORM", "Mongoose", "Indexing"],
    description: "Designing database schemas that prevent data anomalies, enforce referential integrity at the database engine level, and optimize query latency using composite index strategies.",
    projectApplication: {
      project: "Blood Bridge (MERN Platform)",
      details: "Modeled a compound relationship for Donors, Requests, and Stripe Transactions. Implemented indexes on geo-coordinates and request timestamps, reducing lookup latency by 45%.",
    },
    keyConcepts: ["Third Normal Form (3NF)", "Relational vs Non-Relational", "ACID Transactions", "Query Indexing Strategies"],
  },
  {
    number: 2,
    title: "Secure Backend Engineering",
    subtitle: "Defensive API architectures & authentication lifecycles",
    technologies: ["Node.js", "Express.js", "JWT Access/Refresh", "Zod Validation", "RBAC"],
    description: "Constructing secure RESTful endpoints with strictly enforced request payloads, token rotation for persistent sessions, rate limiting, and role-based route access controllers.",
    projectApplication: {
      project: "ParcelTrack (Logistics System)",
      details: "Authored middleware for multi-tier RBAC (Admin, Rider, Customer). Engineered an access token rotation scheme using HTTP-only cookies, safeguarding against CSRF/XSS vectors.",
    },
    keyConcepts: ["Token Rotation (Access/Refresh)", "Zod Schema Validation", "CSRF/XSS Mitigation", "Rate Limiting Middleware"],
  },
  {
    number: 3,
    title: "Elite Frontend & Performance",
    subtitle: "Optimizing Core Web Vitals & state rendering pipelines",
    technologies: ["Next.js SSR/ISR", "TypeScript", "TanStack Query", "Framer Motion", "Tailwind CSS"],
    description: "Creating highly interactive and type-safe frontends with Next.js. Leveraging Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) to reduce First Contentful Paint (FCP) times.",
    projectApplication: {
      project: "Sharebite (Surplus Food Share)",
      details: "Utilized Next.js dynamic routes combined with TanStack Query client-side state caching. Optimized LCP score to 1.1s by deferring non-critical scripts and implementing image sizing rules.",
    },
    keyConcepts: ["Server-Side Rendering (SSR)", "Client Cache Hydration", "FCP & LCP Metric Tuning", "End-to-End TypeScript Typings"],
  },
  {
    number: 4,
    title: "Containerization & DevOps",
    subtitle: "Isolating runtime environments & orchestrating reverse proxies",
    technologies: ["Docker", "Nginx", "Linux/Ubuntu", "CI/CD Actions", "SSL certbot"],
    description: "Packaging microservices into lightweight multi-stage Docker images to reduce bundle size. Configuring Nginx reverse-proxies for SSL termination, load balancing, and rate limiting.",
    projectApplication: {
      project: "Production Portfolio infrastructure",
      details: "Configured an Ubuntu VPS environment with multi-container Docker structures. Set up Nginx as a reverse proxy with automated SSL renewal via Certbot, maintaining 99.98% uptime.",
    },
    keyConcepts: ["Multi-Stage Docker Builds", "Nginx Server Blocks", "VPS Linux Administration", "Zero-Downtime CD Pipelines"],
  },
];

export default function RoadmapSection() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const currentPhase = phases[activePhase - 1];

  // Visual widget states
  const [jwtStep, setJwtStep] = useState<"idle" | "token_sent" | "validation" | "success">("idle");
  const [vitalsOptimized, setVitalsOptimized] = useState(false);
  const [activeSchemaTab, setActiveSchemaTab] = useState<"users" | "donations">("users");

  const runJwtSimulation = () => {
    setJwtStep("token_sent");
    setTimeout(() => {
      setJwtStep("validation");
      setTimeout(() => {
        setJwtStep("success");
      }, 1000);
    }, 1000);
  };

  return (
    <section id="roadmap" className="relative py-24 border-t border-zinc-900 bg-[#070709]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 animate-pulse" /> DEVELOPMENT PIPELINE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
            Scratch to Production Roadmap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            An interactive timeline demonstrating how I architect, secure, optimize, and deploy software applications.
          </p>
        </div>

        {/* Interactive Steps Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {phases.map((phase) => {
            const isActive = activePhase === phase.number;
            const isCompleted = activePhase > phase.number;
            return (
              <button
                key={phase.number}
                onClick={() => {
                  setActivePhase(phase.number);
                  // Reset simulator states when changing tabs
                  setJwtStep("idle");
                  setVitalsOptimized(false);
                }}
                className={`text-left p-4 rounded-2xl border transition-all relative group outline-none select-none cursor-pointer ${
                  isActive
                    ? "bg-[#0f0f13] border-indigo-500/40 shadow-lg shadow-indigo-500/5 text-white"
                    : "bg-[#09090b]/80 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/60 hover:text-white"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400"
                  }`}>
                    PHASE 0{phase.number}
                  </span>
                  {isCompleted && (
                    <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm tracking-tight line-clamp-1">{phase.title}</h3>
                <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1 group-hover:text-zinc-400 transition-colors">
                  {phase.subtitle}
                </p>
                {isActive && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Phase Details Content & Dynamic Widget */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Copy details (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 bg-[#09090b]/70 border border-zinc-900/60 p-6 sm:p-8 rounded-3xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">
                  PHASE 0{currentPhase.number}: {currentPhase.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {currentPhase.title}
                </h3>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {currentPhase.description}
              </p>

              {/* Key Concepts Grid */}
              <div className="space-y-2.5">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                  Engineered Standard Concepts
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentPhase.keyConcepts.map((concept) => (
                    <div key={concept} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                  Stack & Tooling
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPhase.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 font-mono text-[10px] bg-zinc-900 border border-zinc-850 text-zinc-300 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Application Card (Proves practical implementation) */}
            <div className="mt-6 p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 rounded-md">
                  PRODUCTION INTEGRATION
                </span>
                <span className="text-xs font-bold text-zinc-300">
                  {currentPhase.projectApplication.project}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {currentPhase.projectApplication.details}
              </p>
            </div>

          </div>

          {/* RIGHT: Dynamic Visualization Widgets (6 cols) */}
          <div className="lg:col-span-6 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 flex flex-col justify-center min-h-[350px] relative overflow-hidden">
            
            {/* Visual background grids */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.02)_0%,transparent_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {/* PHASE 1: Interactive Schema Visualizer */}
              {activePhase === 1 && (
                <motion.div
                  key="phase-1-widget"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 w-full"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-indigo-400" /> Database Schema (PostgreSQL/MongoDB)
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setActiveSchemaTab("users")}
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all select-none cursor-pointer ${
                          activeSchemaTab === "users" ? "bg-indigo-600 text-white" : "bg-zinc-900 text-zinc-550"
                        }`}
                      >
                        User Table
                      </button>
                      <button
                        onClick={() => setActiveSchemaTab("donations")}
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all select-none cursor-pointer ${
                          activeSchemaTab === "donations" ? "bg-indigo-600 text-white" : "bg-zinc-900 text-zinc-550"
                        }`}
                      >
                        Donation Table
                      </button>
                    </div>
                  </div>

                  <div className="font-mono text-xs bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80 text-left">
                    {activeSchemaTab === "users" ? (
                      <div className="space-y-1.5 text-left">
                        <div className="text-zinc-500 text-[10px]">// Model User - Schema design</div>
                        <div><span className="text-indigo-400">id</span>: <span className="text-purple-400">UUID</span> <span className="text-emerald-500 font-bold">@id</span></div>
                        <div><span className="text-indigo-400">email</span>: <span className="text-purple-400">String</span> <span className="text-zinc-500">@unique</span></div>
                        <div><span className="text-indigo-400">passwordHash</span>: <span className="text-purple-400">String</span></div>
                        <div><span className="text-indigo-400">role</span>: <span className="text-amber-400">UserRole</span> <span className="text-zinc-500">@default(USER)</span></div>
                        <div><span className="text-indigo-400">createdAt</span>: <span className="text-purple-400">DateTime</span></div>
                        <div className="pt-2 text-[10px] text-zinc-500">// Indexes</div>
                        <div className="text-emerald-400">@@index([email, role])</div>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-left">
                        <div className="text-zinc-500 text-[10px]">// Model DonationRecord - Foreign Key Integrity</div>
                        <div><span className="text-indigo-400">id</span>: <span className="text-purple-400">UUID</span> <span className="text-emerald-500 font-bold">@id</span></div>
                        <div><span className="text-indigo-400">donorId</span>: <span className="text-purple-400">UUID</span> <span className="text-zinc-500">// References User(id)</span></div>
                        <div><span className="text-indigo-400">amount</span>: <span className="text-amber-400">Decimal</span></div>
                        <div><span className="text-indigo-400">stripeId</span>: <span className="text-purple-400">String</span> <span className="text-zinc-500">@unique</span></div>
                        <div><span className="text-indigo-400">status</span>: <span className="text-amber-400">Status</span> <span className="text-zinc-500">@default(PENDING)</span></div>
                        <div className="pt-2 text-[10px] text-zinc-500">// Schema relation</div>
                        <div className="text-purple-400">donor: <span className="text-white">User</span> <span className="text-zinc-500">@relation(fields: [donorId], references: [id], onDelete: Cascade)</span></div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 items-center p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-xl">
                    <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                      <Layers className="w-4.5 h-4.5" />
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-normal text-left">
                      Cascade delete structures ensure database-level referential integrity without manual clean-up scripts.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* PHASE 2: Secure JWT authentication pipeline */}
              {activePhase === 2 && (
                <motion.div
                  key="phase-2-widget"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 w-full"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-emerald-400" /> Secure Token Rotation Handshake
                    </span>
                    <Button
                      size="sm"
                      onClick={runJwtSimulation}
                      disabled={jwtStep === "token_sent" || jwtStep === "validation"}
                      className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-md cursor-pointer px-2.5"
                    >
                      {jwtStep === "idle" && "Simulate Token Refresh"}
                      {(jwtStep === "token_sent" || jwtStep === "validation") && "Verifying Security..."}
                      {jwtStep === "success" && "Simulation Done"}
                    </Button>
                  </div>

                  {/* Hands-on flow map */}
                  <div className="space-y-3 font-mono text-[10px] bg-zinc-900/40 p-4 rounded-xl border border-zinc-80px/80 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Client Client-State</span>
                      <span className="text-zinc-500">---------</span>
                      <span className="text-zinc-400">Server Backend API</span>
                    </div>

                    {/* Step 1 */}
                    <div className={`p-2 rounded border transition-all ${
                      jwtStep === "token_sent" ? "bg-indigo-500/10 border-indigo-500/30 text-white" : "border-transparent text-zinc-500"
                    }`}>
                      1. Client fires Refresh Cookie: HttpOnly Secure
                    </div>

                    {/* Step 2 */}
                    <div className={`p-2 rounded border transition-all ${
                      jwtStep === "validation" ? "bg-amber-500/10 border-amber-500/30 text-white" : "border-transparent text-zinc-500"
                    }`}>
                      2. Middleware decrypts and checks rotation blacklist
                    </div>

                    {/* Step 3 */}
                    <div className={`p-2 rounded border transition-all ${
                      jwtStep === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-white" : "border-transparent text-zinc-500"
                    }`}>
                      3. Success: Rotated Access JWT (in-memory JSON) generated
                    </div>
                  </div>

                  <div className="flex gap-4 items-center p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-xl">
                    <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-normal text-left">
                      By keeping Refresh Tokens in HttpOnly cookies, we mitigate cross-site scripting vulnerabilities.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* PHASE 3: Elite Frontend & Core Web Vitals */}
              {activePhase === 3 && (
                <motion.div
                  key="phase-3-widget"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 w-full"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-cyan-400" /> Core Web Vitals Optimization
                    </span>
                    <Button
                      size="sm"
                      onClick={() => setVitalsOptimized(!vitalsOptimized)}
                      className="h-7 text-[10px] bg-cyan-600 hover:bg-cyan-700 text-white rounded-md cursor-pointer px-2.5"
                    >
                      {vitalsOptimized ? "Reset Score" : "Run Performance Optimization"}
                    </Button>
                  </div>

                  {/* Performance Dial Mock */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-zinc-900/50 border border-zinc-900 rounded-xl p-3.5 text-center">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 block mb-1">LCP (Load)</span>
                      <motion.span
                        animate={{ color: vitalsOptimized ? "#2dd4bf" : "#fbbf24" }}
                        className="font-mono text-base font-black"
                      >
                        {vitalsOptimized ? "1.1s" : "3.8s"}
                      </motion.span>
                      <span className="text-[8px] text-zinc-500 block mt-1">Target: &lt; 2.5s</span>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-900 rounded-xl p-3.5 text-center">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 block mb-1">FID (Input)</span>
                      <motion.span
                        animate={{ color: vitalsOptimized ? "#2dd4bf" : "#f87171" }}
                        className="font-mono text-base font-black"
                      >
                        {vitalsOptimized ? "12ms" : "140ms"}
                      </motion.span>
                      <span className="text-[8px] text-zinc-500 block mt-1">Target: &lt; 100ms</span>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-900 rounded-xl p-3.5 text-center">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 block mb-1">SEO SCORE</span>
                      <motion.span
                        animate={{ color: vitalsOptimized ? "#2dd4bf" : "#f87171" }}
                        className="font-mono text-base font-black"
                      >
                        {vitalsOptimized ? "100" : "65"}
                      </motion.span>
                      <span className="text-[8px] text-zinc-500 block mt-1">Lighthouse API</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-xl">
                    <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                      <Zap className="w-4.5 h-4.5" />
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-normal text-left">
                      Optimizations deferred 35% of non-critical script evaluations, leading to instant green Lighthouse metrics.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* PHASE 4: Containerization & Reverse Proxy */}
              {activePhase === 4 && (
                <motion.div
                  key="phase-4-widget"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 w-full"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" /> Nginx Reverse-Proxy Network Architecture
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500">DOCKER NETWORK ACTIVATED</span>
                  </div>

                  {/* Net Routing visualization */}
                  <div className="font-mono text-[10px] space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-80px/80 text-left">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                      <span className="text-white">Public Request (HTTPS :443)</span>
                    </div>
                    <div className="pl-4 border-l border-zinc-700 text-zinc-500">
                      V
                    </div>
                    <div className="flex items-center gap-2 p-1.5 bg-zinc-800/80 border border-zinc-700 rounded text-zinc-300">
                      <Server className="w-3.5 h-3.5 text-amber-400" />
                      <div>
                        <span className="block font-bold">Nginx Ingress Proxy</span>
                        <span className="text-[9px] text-zinc-500">Decrypts SSL (Certbot) &rarr; Redirects internal network</span>
                      </div>
                    </div>
                    <div className="pl-4 border-l border-zinc-700 text-zinc-500">
                      V
                    </div>
                    <div className="flex items-center gap-2 p-1.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-400">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <div>
                        <span className="block font-bold text-zinc-300">MERN App Container (Node :8080)</span>
                        <span className="text-[9px] text-zinc-600">Multi-stage Dockerized build (Node-Alpine)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-xl">
                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                      <Code2 className="w-4.5 h-4.5" />
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-normal text-left">
                      Multi-stage Docker builds separate build toolchains from runtimes, bringing artifact weight down by 70%.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
