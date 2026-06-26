"use client";

import React, { useState } from "react";
import { 
  Play, 
  CheckCircle2, 
  Terminal, 
  Lock, 
  Cpu, 
  Database, 
  Network, 
  ChevronRight,
  ExternalLink,
  GitBranch,
  Shield
} from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  status: "success" | "running" | "idle";
  logs: string[];
  snippet?: string;
  snippetLang?: string;
}

interface ProjectData {
  id: string;
  name: string;
  branch: string;
  commit: string;
  description: string;
  stages: PipelineStage[];
}

const projects: ProjectData[] = [
  {
    id: "admin-dashboard-chat",
    name: "Admin Control Panel & Real-Time Chat Engine",
    branch: "main",
    commit: "fc82d71",
    description: "An enterprise-grade admin console featuring real-time client-to-admin Socket.io communication and automated AI lead scoring.",
    stages: [
      {
        id: "stage-01",
        name: "Stage [01]: Data Architecture",
        subtitle: "Relational Modeling & Prisma Schema",
        icon: <Database className="w-4 h-4" />,
        status: "success",
        logs: [
          "[DB_INIT] Resolving database connection pool (PostgreSQL 16)",
          "[SCHEMA_COMPILATION] Parsing prisma.schema...",
          "[INDEX_OPTIMIZATION] Applying compound indexes on (visitor_id, timestamp)",
          "[RELATION_CHECK] Verified 1-to-many relationship: User -> Messages",
          "[MIGRATION_EXEC] Migration '20260626_chat_init' applied successfully."
        ],
        snippet: `model Message {
  id          String   @id @default(uuid())
  visitorId   String   @map("visitor_id")
  content     String   @db.Text
  timestamp   DateTime @default(now()) @map("timestamp")
  sender      Sender   @default(VISITOR)
  
  visitor     Visitor  @relation(fields: [visitorId], references: [id], onDelete: Cascade)
  
  @@index([visitorId, timestamp(sort: Desc)])
}`,
        snippetLang: "prisma"
      },
      {
        id: "stage-02",
        name: "Stage [02]: Security Engine",
        subtitle: "JWT Rotation & Middleware Guards",
        icon: <Lock className="w-4 h-4" />,
        status: "success",
        logs: [
          "[AUTH_SYSTEM] Initializing JSON Web Token rotation protocols",
          "[TOKEN_CONFIG] Access Token validity: 15 minutes",
          "[TOKEN_CONFIG] Refresh Token validity: 7 days (HTTPOnly/SameSite Cookie)",
          "[MIDDLEWARE] Generating route verification decorators",
          "[SCHEMAS] Zod parsing rules compiled for chat message payloads."
        ],
        snippet: `export async function verifyAuthToken(req: NextRequest) {
  const accessToken = req.headers.get("Authorization")?.split(" ")[1];
  if (!accessToken) return Response.json({ error: "Access token missing" }, { status: 401 });
  
  try {
    const payload = await jwtVerify(accessToken, JWT_SECRET);
    return payload;
  } catch (err) {
    return Response.json({ error: "Token expired. Request rotate_token." }, { status: 401 });
  }
}`,
        snippetLang: "typescript"
      },
      {
        id: "stage-03",
        name: "Stage [03]: Client Optimization",
        subtitle: "Next.js Rendering & Bundle Auditing",
        icon: <Cpu className="w-4 h-4" />,
        status: "success",
        logs: [
          "[NEXT_COMPILER] Running production build checks",
          "[STATIC_OPTIMIZATION] Static rendering applied to landing shell",
          "[DYNAMIC_HYDRATION] Telemetry widgets loaded with dynamic dynamic imports",
          "[BUNDLE_AUDIT] Bundle budget verification started",
          "[BUNDLE_AUDIT] Total CSS load: 14KB, JS main chunk: 72KB - PASS"
        ],
        snippet: `import dynamic from 'next/dynamic';

const DynamicChatWidget = dynamic(
  () => import('@/components/RealTimeChatWidget/RealTimeChatWidget'),
  { ssr: false, loading: () => <ChatShellSkeleton /> }
);`,
        snippetLang: "javascript"
      },
      {
        id: "stage-04",
        name: "Stage [04]: Virtualization",
        subtitle: "Multi-Stage Docker & Nginx Routing",
        icon: <Network className="w-4 h-4" />,
        status: "success",
        logs: [
          "[DOCKER_BUILD] Compiling containerized production runtime",
          "[DOCKER_COMPILER] Multi-stage build sequence initialized",
          "[NGINX_ROUTER] Configuring proxy routing directives for socket socket.io",
          "[NGINX_SSL] Resolving Let's Encrypt TLS renew commands",
          "[COMPLETED] Container footprint optimized down to 118MB"
        ],
        snippet: `FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]`,
        snippetLang: "dockerfile"
      }
    ]
  },
  {
    id: "portfolio-redesign-optimized",
    name: "Minimalist Production Portfolio Platform",
    branch: "main",
    commit: "98e4d2a",
    description: "A secure, telemetry-driven developer showcase built on Next.js 15, optimized for strict type safety and sub-100ms response latency.",
    stages: [
      {
        id: "stage-01",
        name: "Stage [01]: Data Architecture",
        subtitle: "Telemetry Metrics Schema",
        icon: <Database className="w-4 h-4" />,
        status: "success",
        logs: [
          "[SCHEMA_PARSE] Compiling database schemas",
          "[DB_RESOLVER] Schema maps defined for client load stats",
          "[INDEX] Compound index placed on timestamp ranges"
        ],
        snippet: `model TelemetryPoint {
  id        String   @id @default(uuid())
  latency   Int
  loadState String   @map("load_state")
  timestamp DateTime @default(now())
  
  @@index([timestamp])
}`,
        snippetLang: "prisma"
      },
      {
        id: "stage-02",
        name: "Stage [02]: Security Engine",
        subtitle: "Zod Schema Gates & Input Cleansing",
        icon: <Lock className="w-4 h-4" />,
        status: "success",
        logs: [
          "[VALIDATOR] Registering request schemas",
          "[SANITIZER] XSS sanitization filters injected into text pipelines",
          "[PASSED] Input sanitization checks verified."
        ],
        snippet: `import { z } from "zod";

export const chatMessageSchema = z.object({
  content: z.string().min(1).max(1000).trim(),
  visitorId: z.string().uuid(),
});`,
        snippetLang: "typescript"
      },
      {
        id: "stage-03",
        name: "Stage [03]: Client Optimization",
        subtitle: "Tailwind CSS v4 Engine & Render Pass",
        icon: <Cpu className="w-4 h-4" />,
        status: "success",
        logs: [
          "[TW_ENGINE] Compiling CSS using tailwindcss/postcss engine",
          "[TRANSITIONS] Animating items via hardware-accelerated Framer Motion layers",
          "[PASSED] Lighthouse performance audit: 100/100"
        ],
        snippet: `@import "tailwindcss";
@theme {
  --color-background: #070709;
  --color-card: #0b0b0e;
}`,
        snippetLang: "css"
      },
      {
        id: "stage-04",
        name: "Stage [04]: Virtualization",
        subtitle: "Reverse-Proxy Routing Config",
        icon: <Network className="w-4 h-4" />,
        status: "success",
        logs: [
          "[NGINX] Proxy header mapping for client IP forwarding",
          "[GZIP] Gzip compression configuration applied",
          "[CERTBOT] Automated TLS checks green."
        ],
        snippet: `server {
    listen 443 ssl;
    server_name rashedul.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`,
        snippetLang: "nginx"
      }
    ]
  }
];

export default function LogicalPipelineShowcase() {
  const [selectedProjIdx, setSelectedProjIdx] = useState<number>(0);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  const currentProject = projects[selectedProjIdx];
  const activeStage = currentProject.stages[activeStageIdx];

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#070709] border-b border-zinc-800/40 font-mono text-zinc-400">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 z-10 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md text-xs text-indigo-400 uppercase font-bold tracking-wider mb-2">
            <GitBranch className="w-3.5 h-3.5" /> PIPELINE MONITOR
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white font-sans uppercase">
            LOGICAL PIPELINE SHOWCASE
          </h2>
          <p className="text-xs text-zinc-500 max-w-xl uppercase tracking-wider">
            Automated production monitoring tracing from database entity design down to proxy container virtualization.
          </p>
        </div>

        {/* Project Selector Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-900">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedProjIdx(idx);
                setActiveStageIdx(0);
              }}
              className={`p-3 text-left rounded-lg transition-all flex flex-col justify-between border cursor-pointer outline-none ${
                selectedProjIdx === idx
                  ? "bg-zinc-900 border-zinc-700 text-white"
                  : "bg-transparent border-transparent hover:bg-zinc-900/40 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                  PROJECT_REF [{proj.commit}]
                </span>
                <h3 className="text-xs font-bold leading-tight line-clamp-1">{proj.name}</h3>
              </div>
              <span className="text-[10px] mt-2 font-mono flex items-center gap-1 font-semibold text-indigo-400">
                branch: {proj.branch} <ChevronRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>

        {/* Build Telemetry Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Timeline Stages / Build Steps (Left Column) */}
          <div className="lg:col-span-5 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2 text-[10px] uppercase font-bold text-zinc-500">
                <span>[PIPELINE_STAGES]</span>
                <span className="text-emerald-500 animate-pulse">RUNNING COMPILATION...</span>
              </div>
              
              <div className="space-y-2.5">
                {currentProject.stages.map((stage, idx) => {
                  const isActive = activeStageIdx === idx;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStageIdx(idx)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all relative cursor-pointer outline-none ${
                        isActive
                          ? "bg-zinc-950 border-zinc-700 text-white"
                          : "bg-transparent border-zinc-900 hover:bg-zinc-900/20 text-zinc-400"
                      }`}
                    >
                      {/* Interactive Pulse Indicators */}
                      <span className={`flex h-4 w-4 mt-0.5 items-center justify-center rounded-full border text-[9px] ${
                        isActive
                          ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-400"
                          : "bg-zinc-900 border-zinc-800 text-zinc-600"
                      }`}>
                        {idx + 1}
                      </span>
                      
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold font-sans uppercase truncate">{stage.name}</h4>
                          <span className="text-[9px] text-emerald-400 uppercase font-semibold">SUCCESS</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 line-clamp-1">{stage.subtitle}</p>
                      </div>

                      {isActive && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900/60 text-xs space-y-2">
              <p className="text-zinc-500 text-[10px] leading-relaxed uppercase">
                {currentProject.description}
              </p>
              <div className="flex items-center justify-between text-[9px] text-zinc-600">
                <span>COMMIT: {currentProject.commit}</span>
                <span>telemetry: active</span>
              </div>
            </div>

          </div>

          {/* Console / Code Spec Logs (Right Column) */}
          <div className="lg:col-span-7 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
            {/* Terminal Title Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0e12] border-b border-zinc-900">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-1.5 text-[10px] text-zinc-500">pipeline-console@{currentProject.commit}</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                <Terminal className="w-3 h-3 text-zinc-600" /> STAGE_LOGS
              </div>
            </div>

            {/* Console Body */}
            <div className="p-4 bg-zinc-950 font-mono text-[10px] sm:text-xs text-zinc-400 flex-grow space-y-4 overflow-y-auto max-h-[340px]">
              
              {/* Step Logs */}
              <div className="space-y-1 border-b border-zinc-900/80 pb-3">
                {activeStage.logs.map((log, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <span className="text-zinc-600 select-none">&gt;</span>
                    <span className={log.includes("[COMPLETED]") || log.includes("[PASSED]") ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>

              {/* Code Snippet Box */}
              {activeStage.snippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-zinc-600">
                    <span>SPECIFICATION SPEC: {activeStage.snippetLang}</span>
                    <span className="text-indigo-400 font-bold">VERIFIED STRUCTURE</span>
                  </div>
                  <pre className="bg-[#09090b] border border-zinc-900 p-3 rounded-lg overflow-x-auto text-[11px] text-zinc-300 leading-relaxed max-h-[170px] scrollbar-thin">
                    <code>{activeStage.snippet}</code>
                  </pre>
                </div>
              )}

            </div>

            {/* Terminal status bar footer */}
            <div className="px-4 py-2 bg-[#09090b] border-t border-zinc-900 flex items-center justify-between text-[9px] text-zinc-600">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-500/80" /> PIPELINE SECURE
              </span>
              <span>100% STRICT ENGINE</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
