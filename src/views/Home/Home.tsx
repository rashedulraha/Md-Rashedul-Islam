"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database,
  Cpu, 
  Layers, 
  Server, 
  ShieldCheck, 
  Clock, 
  Terminal,
  FileText,
  Mail,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  User,
  Send,
  Zap,
  Activity,
  Code,
  Copy,
  Check
} from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Responsive from "@/views/Responsive/Responsive";

// Simple interface for Chat message
interface ChatMessage {
  id: string;
  sender: "visitor" | "system";
  content: string;
  timestamp: string;
}

// Simple interface for AI parsed profile
interface AIProfile {
  intent: string;
  techStack: string[];
  leadScore: number;
  confidence: number;
  recommendedReply: string;
}

// Framer Motion animation configuration
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Home() {
  const [bangladeshTime, setBangladeshTime] = useState("");
  const [imgError, setImgError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // CLI Terminal Simulator states
  const [activeCmd, setActiveCmd] = useState("neofetch");
  const [isCmdLoading, setIsCmdLoading] = useState(false);

  // Chat simulator states
  const [visitorInput, setVisitorInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "visitor",
      content: "Hello! We are looking to scale our system infrastructure. We want to migrate our legacy MERN codebase to Next.js App Router and deploy it in containerized Docker setups on a Linux VPS, proxying with Nginx. Are you open to a contract position to lead this migration?",
      timestamp: "19:14:04"
    }
  ]);
  const [selectedMsgId, setSelectedMsgId] = useState("msg-1");
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<AIProfile>({
    intent: "Technical Migration & DevOps Contract Consultation",
    techStack: ["Next.js", "MERN Stack", "Docker", "Linux VPS", "Nginx"],
    leadScore: 98,
    confidence: 96,
    recommendedReply: "I specialize in strict type-safe Next.js migrations, multi-stage Docker containerization, and VPS reverse-proxy setups. I have immediate availability to lead this transition. Let's schedule a technical discovery call."
  });

  // Dhaka Clock
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setBangladeshTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // CLI commands dictionary
  const getCmdOutput = (cmd: string) => {
    switch (cmd) {
      case "neofetch":
        return `[ MR. ISLAM ]
-------------
OS: Ubuntu 22.04 LTS
Kernel: Linux 5.15.0-x86_64
Shell: zsh 5.8.1
Uptime: 2 years (active development)
Type Governance: Strict type checking

CORE SYSTEMS WORKSPACE:
- Languages: TypeScript, ESNext, SQL
- Full-Stack: MERN, Next.js App Router
- Databases: PostgreSQL, MongoDB, Prisma ORM
- Infrastructure: Docker, Nginx, Linux VPS
- Vitals Score: 99.98% availability`;
      
      case "cat capabilities.txt":
        return `SPECIALIZATIONS:
---------------
1. Database Schema Optimization
   - Relational modeling (Postgres)
   - Index design & aggregation pipelines
   - N+1 query troubleshooting
2. Secure Backend Logic
   - Access/Refresh JWT rotation
   - Runtime validation with Zod schemas
   - Role-Based Access Control filters
3. Frontend Performance
   - Server Component configurations
   - Cache pooling with TanStack Query
   - Maximizing Core Web Vitals
4. Virtualization & Cloud
   - Multi-stage Docker container builds
   - Nginx proxy routing & TLS configuration
   - Zero-downtime Linux VPS deployment`;

      case "curl contact":
        return `CONTACT ENDPOINTS:
------------------
Email:    rashedulraha.bd@gmail.com
LinkedIn: linkedin.com/in/rashedulraha
GitHub:   github.com/rashedulraha
X:        twitter.com/rashedulraha

UPLINK_STATUS: Ready for consultation discovery.`;
      
      default:
        return "Command not found. Execute neofetch, cat capabilities.txt, or curl contact.";
    }
  };

  const handleCommandClick = (cmd: string) => {
    if (isCmdLoading || activeCmd === cmd) return;
    setIsCmdLoading(true);
    setTimeout(() => {
      setActiveCmd(cmd);
      setIsCmdLoading(false);
    }, 300);
  };

  // Copy Email Helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rashedulraha.bd@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Basic client-side text parsing for the interactive mock AI User Profiler
  const parseIntentAndTech = (text: string): AIProfile => {
    const textLower = text.toLowerCase();
    const detectedTech: string[] = [];
    let leadScore = 65;
    let intent = "General Collaboration / Technical Inquiry";

    if (textLower.includes("next")) detectedTech.push("Next.js");
    if (textLower.includes("react")) detectedTech.push("React.js");
    if (textLower.includes("docker")) detectedTech.push("Docker");
    if (textLower.includes("nginx")) detectedTech.push("Nginx");
    if (textLower.includes("vps") || textLower.includes("linux")) detectedTech.push("Linux VPS");
    if (textLower.includes("postgres")) detectedTech.push("PostgreSQL");
    if (textLower.includes("mongo")) detectedTech.push("MongoDB");
    if (textLower.includes("prisma")) detectedTech.push("Prisma ORM");
    if (textLower.includes("typescript") || textLower.includes("ts")) detectedTech.push("TypeScript");

    if (detectedTech.length === 0) detectedTech.push("Full-Stack stack");

    if (textLower.includes("hire") || textLower.includes("job") || textLower.includes("recruiter")) {
      intent = "Recruiting Outreach / Permanent Hiring Opportunity";
      leadScore = 92;
    } else if (textLower.includes("contract") || textLower.includes("freelance") || textLower.includes("migration") || textLower.includes("project")) {
      intent = "High-Ticket Freelance / Migration Infrastructure Contract";
      leadScore = 97;
    }

    leadScore += Math.min(10, detectedTech.length * 2);
    leadScore = Math.min(100, leadScore);

    const recommendedReply = `I appreciate the inquiry regarding your ${detectedTech.join(" / ")} requirements. I have completed production deployments aligning with this specification. Let's align on a discovery call to discuss parameters.`;

    return {
      intent,
      techStack: detectedTech,
      leadScore,
      confidence: Math.floor(Math.random() * 12) + 85,
      recommendedReply
    };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorInput.trim()) return;

    const newMsgId = `msg-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: newMsgId,
      sender: "visitor",
      content: visitorInput.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setVisitorInput("");
    setSelectedMsgId(newMsgId);
    setIsAiProcessing(true);

    setTimeout(() => {
      const parsed = parseIntentAndTech(newMsg.content);
      setAiResult(parsed);
      setIsAiProcessing(false);
    }, 1000);
  };

  const handleSelectMessage = (msg: ChatMessage) => {
    setSelectedMsgId(msg.id);
    setIsAiProcessing(true);
    setTimeout(() => {
      const parsed = parseIntentAndTech(msg.content);
      setAiResult(parsed);
      setIsAiProcessing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground relative pb-16 overflow-hidden">
      {/* Design System background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <Navbar />

      <Responsive>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-24">
          
          {/* SECTION B: HERO MATRIX (Immediate 50%+ Capabilities Impact) */}
          <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[90vh] pt-32 border-b border-border pb-16">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1 rounded-none text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-pulse" />
                SYSTEM_LIVE // ACTIVE_NODE
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground font-sans uppercase">
                I build type-safe, highly resilient full-stack applications from absolute scratch to secure production deployment.
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
                Full-Stack Web & DevOps Engineer specialized in the MERN stack, Next.js, TypeScript, and containerized cloud environments. I engineer robust backend APIs, optimize databases, and deploy production configurations that guarantee scalability.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a 
                  href="#pipeline" 
                  className="inline-flex items-center justify-center gap-2 px-6 h-11 bg-primary text-primary-foreground hover:opacity-90 font-mono text-xs font-semibold tracking-wide border border-primary transition-all rounded-none"
                >
                  Explore My Pipeline ↓
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 h-11 bg-card hover:bg-muted border border-border text-foreground font-mono text-xs font-semibold tracking-wide transition-all rounded-none"
                  >
                    Resume
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>

                  <button 
                    onClick={handleCopyEmail}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 h-11 bg-card hover:bg-muted border border-border text-foreground font-mono text-xs font-semibold tracking-wide transition-all rounded-none"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Redesigned CLI Terminal Simulator Section (More features/options) */}
              <div className="border border-border bg-[#0c0c0e] p-4 font-mono text-xs space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-border/60 pb-2 text-[10px] uppercase font-bold text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>INTERACTIVE_SYSTEM_SHELL</span>
                  </div>
                  <span>SESSION_UPLINK: ACTIVE</span>
                </div>
                
                {/* Command Selectors */}
                <div className="flex flex-wrap gap-2 text-[10px] border-b border-border/40 pb-2.5">
                  <button 
                    onClick={() => handleCommandClick("neofetch")} 
                    className={`px-2 py-1 border transition-all ${
                      activeCmd === "neofetch" 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "bg-transparent border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    [ neofetch ]
                  </button>
                  <button 
                    onClick={() => handleCommandClick("cat capabilities.txt")} 
                    className={`px-2 py-1 border transition-all ${
                      activeCmd === "cat capabilities.txt" 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "bg-transparent border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    [ cat capabilities.txt ]
                  </button>
                  <button 
                    onClick={() => handleCommandClick("curl contact")} 
                    className={`px-2 py-1 border transition-all ${
                      activeCmd === "curl contact" 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "bg-transparent border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    [ curl contact ]
                  </button>
                </div>

                {/* Console Output Terminal */}
                <div className="h-[140px] overflow-y-auto bg-black/40 border border-border/50 p-2.5 scrollbar-thin text-zinc-300">
                  {isCmdLoading ? (
                    <div className="flex items-center gap-2 text-muted-foreground py-2 text-[10px]">
                      <span className="w-2.5 h-2.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Fetching session packet log...</span>
                    </div>
                  ) : (
                    <pre className="whitespace-pre text-[10px] font-mono leading-relaxed">
                      {`visitor@mr-islam:~$ ${activeCmd}\n\n` + getCmdOutput(activeCmd)}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Redesigned Proportional Frame with Diagnostics HUD Telemetry */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative p-2.5 border border-border bg-[#0c0c0e] shadow-xl w-72 sm:w-80">
                
                {/* HUD Telemetry Top Header */}
                <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 border-b border-border/80 pb-2 mb-2 px-1">
                  <span>[ DIAG_MODE: HEALTHY ]</span>
                  <span>CPU_LOAD: 12%</span>
                </div>

                {/* Aspect-square profile image frame */}
                <div className="relative aspect-square w-full bg-black border border-border flex items-center justify-center overflow-hidden shrink-0 group transition-all duration-300">
                  {!imgError ? (
                    <Image
                      src="/Rashedul.jpeg"
                      alt="Md Rashedul Islam"
                      fill
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                      <Terminal className="w-8 h-8 text-primary animate-pulse" />
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest font-bold">
                        [ ENV_READY: PROFILE_IMAGE_FRAME ]
                      </span>
                    </div>
                  )}
                  {/* Tech scanline visual */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none opacity-30" />
                </div>

                {/* HUD Telemetry Grid below photo */}
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono mt-2.5 pt-2.5 border-t border-border/80 text-zinc-400">
                  <div className="bg-background border border-border/80 p-2 space-y-0.5">
                    <span className="text-zinc-600 block">[ CORE_ENGINE ]</span>
                    <span className="font-bold text-foreground">Node v20.12.0</span>
                  </div>
                  <div className="bg-background border border-border/80 p-2 space-y-0.5">
                    <span className="text-zinc-600 block">[ HOST_UPLINK ]</span>
                    <span className="font-bold text-primary">VPS_ACTIVE</span>
                  </div>
                  <div className="bg-background border border-border/80 p-2 space-y-0.5">
                    <span className="text-zinc-600 block">[ TUNNEL_AUTH ]</span>
                    <span className="font-bold text-foreground">SSL_AES_256</span>
                  </div>
                  <div className="bg-background border border-border/80 p-2 space-y-0.5">
                    <span className="text-zinc-600 block">[ SYSTEM_CLOCK ]</span>
                    <span className="font-bold text-foreground">{bangladeshTime || "19:14:04"}</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION C: THE "SCRATCH TO PRODUCTION" ROADMAP (The Engineering Pipeline) */}
          <section id="pipeline" className="space-y-12 border-b border-border pb-20 scroll-mt-20">
            <div className="space-y-3 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold">The Engineering Pipeline</span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight uppercase">Scratch to Production Roadmap</h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                A visual linear workflow representing my lifecycle management methodologies from architecture design to secure deployment.
              </p>
            </div>

            {/* Visual Linear Roadmap Component */}
            <div className="relative max-w-3xl mx-auto pl-8 md:pl-0">
              {/* Vertical connector line */}
              <div className="absolute left-3 md:left-1/2 top-4 bottom-4 w-[1px] bg-border md:-translate-x-[0.5px] pointer-events-none" />

              <div className="space-y-12">
                {/* Milestone 01 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="md:text-right md:pr-10 md:pt-1">
                    <span className="inline-block px-2.5 py-0.5 border border-border bg-card text-muted-foreground rounded-none text-[9px] font-mono font-bold tracking-widest mb-1.5">MILESTONE 01</span>
                    <h3 className="text-sm md:text-base font-bold font-mono uppercase tracking-tight text-foreground">System Architecture & Data Modeling</h3>
                  </div>
                  {/* Glowing Node on Center Line */}
                  <div className="absolute left-[-29px] md:left-1/2 md:translate-x-[-12px] top-1 md:top-1.5 w-6 h-6 rounded-none bg-background border border-border flex items-center justify-center z-20">
                    <div className="w-2 h-2 bg-primary" />
                  </div>
                  <div className="md:pl-10">
                    <div className="bg-card border border-border p-5 rounded-none space-y-3 hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-bold uppercase tracking-wider">
                        <Database className="w-4 h-4" /> Relational & Document Schema
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light">
                        Designing normalized schemas using PostgreSQL/MongoDB via Prisma and Mongoose; enforcing relational integrity and preventing N+1 performance query bottlenecks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone 02 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Shift content to right on desktop */}
                  <div className="hidden md:block pl-10 order-last">
                    <span className="inline-block px-2.5 py-0.5 border border-border bg-card text-muted-foreground rounded-none text-[9px] font-mono font-bold tracking-widest mb-1.5">MILESTONE 02</span>
                    <h3 className="text-sm md:text-base font-bold font-mono uppercase tracking-tight text-foreground">Secure Backend Engineering</h3>
                  </div>
                  <div className="absolute left-[-29px] md:left-1/2 md:translate-x-[-12px] top-1 md:top-1.5 w-6 h-6 rounded-none bg-background border border-border flex items-center justify-center z-20">
                    <div className="w-2 h-2 bg-primary" />
                  </div>
                  <div className="md:hidden">
                    <span className="inline-block px-2.5 py-0.5 border border-border bg-card text-muted-foreground rounded-none text-[9px] font-mono font-bold tracking-widest mb-1.5">MILESTONE 02</span>
                    <h3 className="text-sm md:text-base font-bold font-mono uppercase tracking-tight text-foreground">Secure Backend Engineering</h3>
                  </div>
                  <div className="md:pr-10 md:text-right">
                    <div className="bg-card border border-border p-5 rounded-none space-y-3 hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-center md:justify-end gap-2 text-primary font-mono text-[10px] font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" /> Authentication & Encryption
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light">
                        Building robust RESTful APIs & secure Next.js Server Actions; implementing JWT access/refresh token rotation architectures, Zod data run-time validation, and granular Role-Based Access Control.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone 03 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="md:text-right md:pr-10 md:pt-1">
                    <span className="inline-block px-2.5 py-0.5 border border-border bg-card text-muted-foreground rounded-none text-[9px] font-mono font-bold tracking-widest mb-1.5">MILESTONE 03</span>
                    <h3 className="text-sm md:text-base font-bold font-mono uppercase tracking-tight text-foreground">Scalable Frontend Architecture</h3>
                  </div>
                  <div className="absolute left-[-29px] md:left-1/2 md:translate-x-[-12px] top-1 md:top-1.5 w-6 h-6 rounded-none bg-background border border-border flex items-center justify-center z-20">
                    <div className="w-2 h-2 bg-primary" />
                  </div>
                  <div className="md:pl-10">
                    <div className="bg-card border border-border p-5 rounded-none space-y-3 hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-bold uppercase tracking-wider">
                        <Layers className="w-4 h-4" /> Next.js App Router & State
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light">
                        Developing production UI systems with React, Next.js App Router, and TypeScript type-safety; optimizing state predictability, TanStack Query client-side caching, and maximizing Core Web Vitals performance score.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone 04 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="hidden md:block pl-10 order-last">
                    <span className="inline-block px-2.5 py-0.5 border border-border bg-card text-muted-foreground rounded-none text-[9px] font-mono font-bold tracking-widest mb-1.5">MILESTONE 04</span>
                    <h3 className="text-sm md:text-base font-bold font-mono uppercase tracking-tight text-foreground">DevOps & Cloud Virtualization</h3>
                  </div>
                  <div className="absolute left-[-29px] md:left-1/2 md:translate-x-[-12px] top-1 md:top-1.5 w-6 h-6 rounded-none bg-background border border-border flex items-center justify-center z-20">
                    <div className="w-2 h-2 bg-primary" />
                  </div>
                  <div className="md:hidden">
                    <span className="inline-block px-2.5 py-0.5 border border-border bg-card text-muted-foreground rounded-none text-[9px] font-mono font-bold tracking-widest mb-1.5">MILESTONE 04</span>
                    <h3 className="text-sm md:text-base font-bold font-mono uppercase tracking-tight text-foreground">DevOps & Cloud Virtualization</h3>
                  </div>
                  <div className="md:pr-10 md:text-right">
                    <div className="bg-card border border-border p-5 rounded-none space-y-3 hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-center md:justify-end gap-2 text-primary font-mono text-[10px] font-bold uppercase tracking-wider">
                        <Server className="w-4 h-4" /> Container Infrastructure
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light">
                        Writing multi-stage production Dockerfiles; configuring Nginx as a reverse proxy with custom secure SSL routing; deploying applications onto cloud Linux/VPS infrastructure for 99.9% application availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION D: REFINED 2-YEAR EXPERIENCE MATRIX (The Proof of Work) */}
          <section id="experience" className="space-y-12 border-b border-border pb-20 scroll-mt-20">
            <div className="space-y-3 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold">The Proof of Work</span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight uppercase">Refined Experience Matrix</h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Engineering milestone dashboard detailing technical objectives, performance metrics, and architectures maintained over a 2-year trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Architecture Ownership */}
              <div className="bg-card border border-border p-6 rounded-none flex flex-col justify-between hover:border-primary/20 transition-all duration-300 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    <span className="text-primary font-bold">[ 01 ]</span> Architecture Ownership
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    Delivering complex MERN and Next.js systems from wireframe layouts to production deployment. I set up resilient directory architectures, establish type-safe request boundaries, and manage unified folder layouts that optimize code maintainability.
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center text-[10px] font-mono">
                  <span className="text-muted-foreground">Ecosystem</span>
                  <span className="text-primary font-bold">MERN & Next.js App Router</span>
                </div>
              </div>

              {/* Type-Safety Integration */}
              <div className="bg-card border border-border p-6 rounded-none flex flex-col justify-between hover:border-primary/20 transition-all duration-300 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    <span className="text-primary font-bold">[ 02 ]</span> Type-Safety Integration
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    Migrating legacy JavaScript repositories to strict, compile-time TypeScript environments. Enforced strict interfaces, typed REST requests/responses, and configured strict compiler flags to eradicate standard NullPointer and Runtime validation issues.
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center text-[10px] font-mono">
                  <span className="text-muted-foreground">Type Governance</span>
                  <span className="text-primary font-bold">100% Strict TypeScript</span>
                </div>
              </div>

              {/* Infrastructure Maintenance */}
              <div className="bg-card border border-border p-6 rounded-none flex flex-col justify-between hover:border-primary/20 transition-all duration-300 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    <span className="text-primary font-bold">[ 03 ]</span> Infrastructure Maintenance
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    Managing and optimizing remote Linux VPS servers. Provisioning multi-container Docker applications, writing optimized layered build configurations, and managing Nginx web servers for proxy routing, SSL Handshakes, and basic load balancing.
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center text-[10px] font-mono">
                  <span className="text-muted-foreground">Deployment Host</span>
                  <span className="text-primary font-bold">Docker & Nginx & VPS</span>
                </div>
              </div>

              {/* Performance Audits */}
              <div className="bg-card border border-border p-6 rounded-none flex flex-col justify-between hover:border-primary/20 transition-all duration-300 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    <span className="text-primary font-bold">[ 04 ]</span> Performance Audits
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    Refactoring database collection indexing schemas, cleaning unused libraries/stale directories, and auditing query performance. Successfully minimized database roundtrips and restructured API payloads to lower endpoint response latencies.
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center text-[10px] font-mono">
                  <span className="text-muted-foreground">Optimization Rate</span>
                  <span className="text-[#4ade80] font-bold">Sub-50ms API Latency</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION E: COMPACT CONTROL PANEL & CHAT HUB */}
          <section id="connect" className="space-y-12 pb-16 scroll-mt-20">
            <div className="space-y-3 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold">Interactive Telemetry</span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight uppercase">Secure Control Panel & Chat Hub</h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                An industrial-grade administration mockup rendering active socket messaging threads alongside a client-side AI intent analyzer.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch font-mono">
              {/* Left Panel: Visitor Chat Terminal */}
              <div className="lg:col-span-5 bg-card border border-border p-5 rounded-none flex flex-col justify-between space-y-4">
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-border pb-2 text-[10px] uppercase font-bold text-muted-foreground">
                    <span>[VISITOR_UPLINK_FEED]</span>
                    <span className="text-primary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-none bg-primary animate-pulse" />
                      LISTENERS_ACTIVE
                    </span>
                  </div>

                  {/* Message log */}
                  <div className="bg-background border border-border p-3 h-[220px] overflow-y-auto space-y-3 scrollbar-thin">
                    {chatMessages.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => handleSelectMessage(msg)}
                        className={`w-full text-left p-2 border transition-all text-xs outline-none cursor-pointer rounded-none block ${
                          selectedMsgId === msg.id
                            ? "bg-muted/30 border-primary/50 text-foreground"
                            : "bg-transparent border-transparent hover:bg-muted/10 text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[9px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            <User className="w-3 h-3 text-primary" />
                            {msg.sender === "visitor" ? "SESSION_CLIENT" : "SYSTEM_LOG"}
                          </span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="leading-relaxed font-sans text-xs">{msg.content}</p>
                      </button>
                    ))}
                  </div>

                  {/* Message send form */}
                  <form onSubmit={handleSendMessage} className="space-y-2 mt-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-2 bg-background border border-border p-1.5 focus-within:border-primary/40 transition-colors">
                      <input
                        type="text"
                        value={visitorInput}
                        onChange={(e) => setVisitorInput(e.target.value)}
                        placeholder="Simulate a message parameters..."
                        className="flex-1 bg-transparent border-none outline-none text-xs text-foreground placeholder-zinc-700 font-mono px-2"
                      />
                      <button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:opacity-95 p-2 rounded-none transition-colors cursor-pointer"
                        aria-label="Send Message"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-zinc-600">
                      <span>SECURE_SOCKET_CHANNEL</span>
                      <span>Uplink verified</span>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Panel: AI User Profiler Sidebar */}
              <div className="lg:col-span-7 bg-card border border-border p-5 rounded-none flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />

                {/* Profiler Header */}
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-[10px] text-foreground font-bold uppercase tracking-wider font-mono">
                      AI_USER_PROFILER // INFERENCE_ENGINE
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-[#4ade80] font-bold bg-[#4ade80]/10 border border-[#4ade80]/20 px-2 py-0.5">
                    SECURE_NODE
                  </span>
                </div>

                {/* Profiler Content */}
                <div className="space-y-4 flex-grow">
                  {isAiProcessing ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-3">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-mono">Rebuilding JSON matrices...</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* KPI Telemetry row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background border border-border p-3 rounded-none flex items-center justify-between">
                          <div>
                            <span className="text-[9px] text-muted-foreground block uppercase font-bold">LEAD_SCORE</span>
                            <span className="text-foreground text-sm font-extrabold flex items-center gap-1.5 font-sans mt-0.5">
                              {aiResult.leadScore}%
                              <TrendingUp className="w-3.5 h-3.5 text-[#4ade80]" />
                            </span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-none bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80] uppercase font-semibold">
                            FIT_ACC
                          </span>
                        </div>

                        <div className="bg-background border border-border p-3 rounded-none flex items-center justify-between">
                          <div>
                            <span className="text-[9px] text-muted-foreground block uppercase font-bold">CONFIDENCE_RATIO</span>
                            <span className="text-foreground text-sm font-extrabold font-sans mt-0.5">
                              {aiResult.confidence}%
                            </span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-none bg-primary/10 border border-primary/20 text-primary uppercase font-semibold">
                            OPTIMAL
                          </span>
                        </div>
                      </div>

                      {/* JSON telemetry block */}
                      <div className="bg-background border border-border p-4 rounded-none space-y-3">
                        <span className="text-[9px] text-muted-foreground block uppercase font-bold">PARSED_TELEMETRY_LOG (JSON)</span>
                        <pre className="text-[10px] text-primary leading-normal overflow-x-auto p-2 bg-black/40 border border-border font-mono max-h-[140px]">
{`{
  "user_intent": "${aiResult.intent}",
  "core_tech_mentioned": [${aiResult.techStack.map(t => `"${t}"`).join(", ")}],
  "lead_fit_score": ${aiResult.leadScore},
  "confidence_percentage": ${aiResult.confidence}
}`}
                        </pre>
                      </div>

                      {/* Suggested reply block */}
                      <div className="bg-primary/5 border border-primary/25 p-3.5 rounded-none space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-primary block uppercase font-bold">SUGGESTED NEXT REPLY</span>
                          <span className="text-[9px] text-zinc-600 font-mono">AUTOMATED PARAMETER</span>
                        </div>
                        <p className="text-foreground text-xs leading-relaxed font-sans">
                          "{aiResult.recommendedReply}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profiler Footer */}
                <div className="px-1 py-1 mt-4 border-t border-border flex items-center justify-between text-[9px] text-zinc-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> SYNC_VERIFIED
                  </span>
                  <span>INFERENCE_SPEED: 12ms</span>
                </div>
              </div>
            </div>
          </section>

        </main>
      </Responsive>
    </div>
  );
}
