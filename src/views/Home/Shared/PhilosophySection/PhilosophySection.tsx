"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  FolderKanban,
  ShieldCheck,
  LineChart,
  ArrowRight,
  Database,
  TrendingDown,
  Server,
  Zap,
} from "lucide-react";

interface PhilosophyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  principle: string;
}

const philosophyItems: PhilosophyItem[] = [
  {
    icon: <Code2 className="w-5 h-5 text-indigo-400" />,
    title: "Strict Type-Safety & Self-Documentation",
    description: "Write code that communicates intent. By leveraging TypeScript strict mode and exhaustive interfaces, I catch type mismatches during development rather than runtime exceptions.",
    principle: "Code is read 10x more than it is written. Design self-documenting APIs.",
  },
  {
    icon: <FolderKanban className="w-5 h-5 text-purple-400" />,
    title: "Feature-Folder Architecture",
    description: "Structure modular directory patterns. Instead of grouping files by technical type (components, hooks, pages), I organize elements by feature domain to make codebases highly maintainable and clean.",
    principle: "High cohesion and low coupling across domain namespaces.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    title: "Defensive Programming & Validation",
    description: "Assume inputs are dirty. By defining schemas via Zod and sanitizing inputs at application entry points, I eliminate common injection, SQLi, and validation edge cases.",
    principle: "Validate early, validate strictly, fail fast.",
  },
  {
    icon: <LineChart className="w-5 h-5 text-cyan-400" />,
    title: "Observability & Performance Tuning",
    description: "If it is not measured, it is broken. I leverage structured logging and simple performance profiling to identify bottlenecks, reducing database roundtrips and optimizing resource usage.",
    principle: "Optimize code only after analyzing concrete profiling data.",
  },
];

interface CaseStudy {
  id: string;
  tabLabel: string;
  title: string;
  problem: string;
  strategy: string;
  execution: string;
  metrics: { label: string; value: string; color: string }[];
  steps: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "latency",
    tabLabel: "API Latency Optimization",
    title: "Reducing API Latency from 1.2s to 84ms",
    problem: "An endpoint querying multi-vendor transaction histories was experiencing severe bottlenecks under concurrent loads, degrading Core Web Vitals and user conversion ratios.",
    strategy: "Implement a hybrid cache-aside mechanism using database query index adjustments and query projection pruning.",
    execution: "Created composite indexes on candidate foreign keys (userId, createdAt). Pruned heavy relational sub-queries, replacing them with typed projections, and implemented cached query results.",
    metrics: [
      { label: "P99 Latency Reduction", value: "-93%", color: "text-emerald-400" },
      { label: "Database Read Queries", value: "-65%", color: "text-indigo-400" },
      { label: "Lighthouse Speed Score", value: "98/100", color: "text-cyan-400" },
    ],
    steps: [
      "Identified slow queries by enabling MongoDB slow-query profiling logs.",
      "Replaced nested document aggregations with simple indexing lookups.",
      "Configured in-memory caching for stagnant master configuration tables.",
      "Pruned Next.js client-side bundles by dynamically importing non-essential scripts.",
    ],
  },
  {
    id: "migration",
    tabLabel: "Zero-Downtime Migration",
    title: "Safe Database Schema Evolution under Active Traffic",
    problem: "A live database schema required a non-nullable field modification to the main Transaction table. Executing a standard lock-and-migrate script would cause service downtime.",
    strategy: "Deploy a multi-phase dual-write pattern, separating database deployment from application state transition.",
    execution: "1. Deployed database schema changes with nullable parameters. 2. Updated backend logic to write to both new and old properties. 3. Backfilled historical rows. 4. Flipped read endpoints to the new structure. 5. Safely deleted old column.",
    metrics: [
      { label: "System Service Downtime", value: "0.00s", color: "text-emerald-400" },
      { label: "Data Integrity Anomaly", value: "0.00%", color: "text-indigo-400" },
      { label: "Rollback Protection", value: "100%", color: "text-cyan-400" },
    ],
    steps: [
      "Created a backward-compatible schema schema modification in PostgreSQL/Prisma.",
      "Authored a node-driven batch cursor script to backfill historical columns.",
      "Enabled double-writing across write operations.",
      "Successfully performed field switchovers via runtime feature flag controls.",
    ],
  },
];

export default function PhilosophySection() {
  const [activeCaseStudy, setActiveCaseStudy] = useState("latency");
  const selectedStudy = caseStudies.find((c) => c.id === activeCaseStudy) || caseStudies[0];

  return (
    <section id="philosophy" className="py-24 border-t border-zinc-900 bg-background relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold rounded-full uppercase tracking-wider">
            <Server className="w-3.5 h-3.5" /> RECRUITER INSIGHTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
            How I Think & Build
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            My architectural philosophy and professional case studies showcasing concrete problem-solving metrics.
          </p>
        </div>

        {/* Philosophy Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#09090b]/80 border border-zinc-900/60 p-6 rounded-2xl flex flex-col justify-between group hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-900 w-fit">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-start gap-2">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mt-0.5 select-none">
                  PRINCIPLE:
                </span>
                <span className="text-xs italic text-zinc-400 leading-normal">{item.principle}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Studies Segment Title */}
        <div className="mb-10 text-left border-b border-zinc-900 pb-4">
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" /> Architectural Case Studies
          </h3>
          <p className="text-zinc-500 text-sm mt-1">
            Real-world backend optimizations and system challenges completed in production environments.
          </p>
        </div>

        {/* Case Studies Tabs Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Selector (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {caseStudies.map((study) => (
              <button
                key={study.id}
                onClick={() => setActiveCaseStudy(study.id)}
                className={`text-left p-4 rounded-xl border text-sm font-bold transition-all relative outline-none select-none cursor-pointer ${
                  activeCaseStudy === study.id
                    ? "bg-zinc-950 border-indigo-500/40 text-white shadow-lg"
                    : "bg-[#09090b]/80 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-white"
                }`}
              >
                {study.tabLabel}
                {activeCaseStudy === study.id && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </button>
            ))}
          </div>

          {/* Case Study Details Panel (9 cols) */}
          <div className="lg:col-span-9 bg-[#09090b]/60 border border-zinc-900 p-6 sm:p-8 rounded-3xl min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStudy.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 w-full"
              >
                {/* Title */}
                <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedStudy.title}
                </h4>

                {/* Problem & Strategy */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block">
                      THE BOTTLENECK / CHALLENGE
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {selectedStudy.problem}
                    </p>
                  </div>
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">
                      STRATEGIC RESOLUTION
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {selectedStudy.strategy}
                    </p>
                  </div>
                </div>

                {/* Metrics Panel */}
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-3 text-left">
                    KEY RESULTS & OPTIMIZATION METRICS
                  </span>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedStudy.metrics.map((metric) => (
                      <div key={metric.label} className="text-center md:text-left">
                        <span className={`block font-mono text-lg sm:text-xl font-bold ${metric.color}`}>
                          {metric.value}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase block font-semibold mt-0.5 leading-normal">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Execution Detail */}
                <div className="space-y-3 text-left">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                    Execution Steps
                  </span>
                  <ul className="space-y-2">
                    {selectedStudy.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-500 shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
