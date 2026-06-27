"use client";

import React from "react";
import { Code2, Server, Database, Settings } from "lucide-react";

interface SkillItem {
  name: string;
  version: string;
  details: string;
}

interface SkillCategory {
  title: string;
  id: string;
  icon: React.ComponentType<any>;
  items: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend & Languages",
    id: "frontend",
    icon: Code2,
    items: [
      { name: "TypeScript", version: "v5.x", details: "Strict typing, OOP/Functional design" },
      { name: "Next.js", version: "v14 / v15", details: "App Router, Server Actions, SSR & ISR" },
      { name: "React", version: "v18 / v19", details: "Hooks, Server Components, Concurrent Mode" }
    ]
  },
  {
    title: "Backend & Runtime",
    id: "backend",
    icon: Server,
    items: [
      { name: "Node.js", version: "Runtime Core", details: "Event-driven asynchronous I/O" },
      { name: "Express.js", version: "v4.x / NestJS", details: "REST API routing and HTTP handlers" }
    ]
  },
  {
    title: "Databases & ORM",
    id: "database",
    icon: Database,
    items: [
      { name: "PostgreSQL", version: "Relational", details: "Index tuning, transactions, complex queries" },
      { name: "MongoDB", version: "NoSQL", details: "Aggregations, document modeling, scalability" },
      { name: "Prisma ORM", version: "Type-Safe Client", details: "Declarative schemas and relations management" }
    ]
  },
  {
    title: "DevOps & Systems",
    id: "devops",
    icon: Settings,
    items: [
      { name: "Docker", version: "Container Core", details: "Multi-stage builds, compose orchestration" },
      { name: "Nginx", version: "Proxy & LB", details: "SSL termination, caching, reverse proxying" },
      { name: "Linux / Ubuntu VPS", version: "SysAdmin", details: "Systemd management, firewalls, bash scripting" }
    ]
  }
];

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="py-16 md:py-20 border-b border-[var(--border)]"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest block font-semibold">
            [ Tech Stack Audit ]
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Verified Skills & Technologies
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            A comprehensive index of engineering tools and frameworks I deploy in production environments, with accurate version configurations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <div 
                key={category.id}
                className="bg-card border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-[var(--border)]/60 pb-3">
                  <div className="p-2 rounded-lg bg-[var(--accent)] text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-mono uppercase tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Table representation of skills */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--border)]/40 text-xs font-mono text-[var(--text-secondary)] uppercase">
                        <th className="py-2 font-medium">Technology</th>
                        <th className="py-2 font-medium">Version / Type</th>
                        <th className="py-2 font-medium hidden sm:table-cell">Focus Area</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]/30">
                      {category.items.map((item, idx) => (
                        <tr 
                          key={idx} 
                          className="hover:bg-[var(--accent)]/10 transition-colors"
                        >
                          <td className="py-3 text-base font-semibold text-[var(--text-primary)]">
                            {item.name}
                          </td>
                          <td className="py-3 text-sm font-mono text-primary font-medium">
                            {item.version}
                          </td>
                          <td className="py-3 text-sm text-[var(--text-secondary)] hidden sm:table-cell">
                            {item.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
