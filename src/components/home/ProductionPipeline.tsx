"use client";

import React from "react";
import { Database, ShieldCheck, Layers, Server } from "lucide-react";

interface Milestone {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  metric: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "architecture",
    number: "01",
    title: "Architecture & Data Schema",
    description: "Designing normalized SQL/NoSQL database structures, mapping schemas via Prisma ORM or Mongoose, configuring secondary indexes, and modeling aggregate pipelines for fast querying.",
    icon: Database,
    metric: "SCHEMA_GOVERNANCE: Prisma / PostgreSQL / MongoDB"
  },
  {
    id: "backend",
    number: "02",
    title: "Backend Engine & Validation",
    description: "Constructing robust backend APIs and Next.js Server Actions. Securing routes with stateless JWT Access/Refresh token rotation inside HTTP-Only secure cookies, and validating payloads at runtime with Zod schemas.",
    icon: ShieldCheck,
    metric: "ENGINE_AUTH: JWT Rotation, CORS, CSRF, Zod Schema"
  },
  {
    id: "frontend",
    number: "03",
    title: "Frontend Type-Safety",
    description: "Assembling modular layouts using React and Next.js App Router. Enforcing strict compile-time TypeScript type safety across component props, API payloads, and state boundaries.",
    icon: Layers,
    metric: "INTERFACE_CORE: React, Next.js App Router, TypeScript"
  },
  {
    id: "infrastructure",
    number: "04",
    title: "Cloud Infrastructure",
    description: "Containerizing applications with Docker for reproducible builds, setting up reverse proxy networks and SSL termination using Nginx, and deploying onto secure Linux VPS environments.",
    icon: Server,
    metric: "INFRASTRUCTURE: Docker, Nginx Reverse Proxy, Linux VPS"
  }
];

export default function ProductionPipeline() {
  return (
    <section 
      id="pipeline" 
      className="py-16 md:py-20 border-b border-[var(--border)]"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest block font-semibold">
            [ Development Roadmap ]
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            0 to Production Pipeline
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            A visual overview of the lifecycle layers I execute when building a web application—moving systematically from schema design to cloud deployment.
          </p>
        </div>

        {/* Visual Roadmap Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16">
          {/* Vertical timeline connector (Only visible on medium and larger screens) */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-[var(--border)] -translate-x-1/2 hidden md:block" />

          {MILESTONES.map((milestone, index) => {
            const Icon = milestone.icon;
            // Determine side for visual balance
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={milestone.id} 
                className={`relative flex flex-col space-y-4 group`}
              >
                {/* Milestone Node Dot on Connector (Only on md+) */}
                <div 
                  className={`absolute top-4 w-5 h-5 rounded-full border-2 border-primary bg-card transition-all duration-300 group-hover:scale-110 group-hover:bg-primary hidden md:block ${
                    isLeft 
                      ? "right-[-34px] translate-x-1/2" 
                      : "left-[-34px] -translate-x-1/2"
                  }`} 
                />

                {/* Milestone Card Header */}
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[var(--accent)] border border-[var(--border)] text-sm font-mono text-[var(--text-primary)] flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                    {milestone.number}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-primary transition-colors">
                    {milestone.title}
                  </h3>
                </div>

                {/* Content Box */}
                <div className="bg-card border border-[var(--border)] p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-4">
                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                    {milestone.description}
                  </p>
                  
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] border-t border-[var(--border)]/60 pt-3">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate tracking-tight font-medium">
                      {milestone.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
