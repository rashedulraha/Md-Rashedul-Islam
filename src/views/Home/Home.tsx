"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Mail,
  ExternalLink,
  User,
  Send,
  Zap,
  Activity,
  Code,
  Copy,
  Check,
  MessageSquare,
  X,
  CornerDownRight,
  ChevronRight,
  Lock,
  Unlock,
  Key,
  Sparkles,
  BookOpen,
  FileText
} from "lucide-react";
import Responsive from "@/views/Responsive/Responsive";
import MeshGrid from "@/components/MeshGrid";
import BlogEngine from "./BlogEngine";
import AdminDashboardInline from "./AdminDashboardInline";
import BackgroundShell from "@/components/BackgroundShell";
import Link from "next/link";

// Simple interface for Chat message
interface ChatMessage {
  id: string;
  sender: "user" | "admin" | "bot";
  content: string;
  timestamp: string;
}

export default function Home() {
  const [sessionId, setSessionId] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [visitorInput, setVisitorInput] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bangladeshTime, setBangladeshTime] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inlineMessagesEndRef = useRef<HTMLDivElement>(null);

  // Website Config states loaded dynamically from Live Config Editor
  const [headline, setHeadline] = useState("I build type-safe full-stack applications and orchestrate secure cloud infrastructure.");
  const [intro, setIntro] = useState("Merging core computer science fundamentals with modern scalable engineering. Based in Naogaon, Bangladesh, I specialize in robust DevOps pipelines and type-safe systems design.");
  const [email, setEmail] = useState("rashedulraha.bd@gmail.com");
  const [teamSize, setTeamSize] = useState("4");

  interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tech: string[];
    links: { live: string; github: string };
  }

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/projects.json");
        if (res.ok) {
          const data = await res.json();
          setProjects(data.slice(0, 3));
        }
      } catch (err) {
        console.error("Error loading projects:", err);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const loadSiteConfig = () => {
      const storedHeadline = localStorage.getItem("site_hero_headline");
      if (storedHeadline) setHeadline(storedHeadline);

      const storedIntro = localStorage.getItem("site_hero_intro");
      if (storedIntro) setIntro(storedIntro);

      const storedEmail = localStorage.getItem("site_contact_email");
      if (storedEmail) setEmail(storedEmail);

      const storedTeamSize = localStorage.getItem("site_team_size");
      if (storedTeamSize) setTeamSize(storedTeamSize);
    };
    loadSiteConfig();

    window.addEventListener("storage", loadSiteConfig);
    return () => window.removeEventListener("storage", loadSiteConfig);
  }, []);

  // Admin Section States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSubmittingAdmin, setIsSubmittingAdmin] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [showAdminConsole, setShowAdminConsole] = useState(false);

  // Initialize or fetch session ID from localStorage
  useEffect(() => {
    let id = localStorage.getItem("chat_session_id");
    if (!id) {
      id = "sess_" + Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("chat_session_id", id);
    }
    setSessionId(id);

    // Check if is_admin cookie is set
    const checkAdminCookie = () => {
      const isClientAdmin = document.cookie.split("; ").find((row) => row.startsWith("is_admin="));
      setIsAdminLoggedIn(!!isClientAdmin);
    };
    checkAdminCookie();
  }, []);

  // Fetch initial chat history
  useEffect(() => {
    if (!sessionId) return;
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setChatMessages(data.messages);
          }
        }
      } catch (err) {
        console.error("Error loading chat history:", err);
      }
    };
    fetchHistory();
  }, [sessionId]);

  // Connect to SSE for real-time admin replies
  useEffect(() => {
    if (!sessionId) return;
    const eventSource = new EventSource(`/api/chat/sse?sessionId=${sessionId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "message" && data.message.sender !== "user") {
          setChatMessages((prev) => {
            if (prev.some((m) => m.id === data.message.id)) return prev;
            return [...prev, data.message];
          });
          setIsTyping(false);
        }
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [sessionId]);

  // Dhaka Clock Setup
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

  // Scroll to bottom helper
  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages, chatOpen]);

  useEffect(() => {
    const container = inlineMessagesEndRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorInput.trim() || !sessionId) return;

    const messageContent = visitorInput.trim();
    setVisitorInput("");

    // Optimistic update
    const tempMsg: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent,
      sender: "user",
      timestamp: new Date().toISOString()
    };
    setChatMessages((prev) => [...prev, tempMsg]);

    try {
      const response = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          content: messageContent,
          sender: "user",
          userName: "Anonymous Visitor"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleScrollToPipeline = (e: React.MouseEvent) => {
    e.preventDefault();
    const pipeline = document.getElementById("pipeline");
    if (pipeline) {
      pipeline.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError(null);
    setIsSubmittingAdmin(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUsername, password: adminPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setIsAdminLoggedIn(true);
      setAdminUsername("");
      setAdminPassword("");
    } catch (err: any) {
      setAdminLoginError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmittingAdmin(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      document.cookie = "is_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      setIsAdminLoggedIn(false);
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <BackgroundShell>
      
      {/* High-Performance Canvas Mesh Background Animation */}
      <MeshGrid />

      {/* Grid overlay for aesthetic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1f_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 z-0" />

      <Navbar />

      <Responsive>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-32 pt-28">
          
          {/* SECTION 1: THE IMPACT HERO LAYER */}
          <section id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center min-h-[75vh] border-b border-zinc-900 pb-20">
            {/* Left Column */}
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-zinc-800 bg-[#0c0c0e]/80 backdrop-blur-xs px-3.5 py-1 text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-none animate-pulse" />
                Dhaka Node // Local Time: {bangladeshTime || "--:--:--"}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-relaxed max-w-xl font-mono uppercase">
                {headline}
              </h1>
              
              <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-xl">
                {intro}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#pipeline"
                  onClick={handleScrollToPipeline}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 hover:text-white font-mono text-xs tracking-tight transition-all rounded-none"
                >
                  Explore Full Production Pipeline ↓
                </a>

                <div className="flex gap-2 shrink-0">
                  <a
                    href={`mailto:${email}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0c0c0e] hover:bg-zinc-900 border border-zinc-800 text-zinc-450 hover:text-white font-mono text-xs tracking-tight transition-all rounded-none"
                  >
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Direct Email</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0c0c0e] hover:bg-zinc-900 border border-zinc-800 text-zinc-450 hover:text-white font-mono text-xs tracking-tight transition-all rounded-none"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                        <span>Copied Address</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Resume Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Square Portrait Image Container */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] bg-[#0c0c0e]/80 border border-zinc-800 flex flex-col justify-between p-4 font-mono shadow-xl select-none backdrop-blur-xs">
                {/* Tech Crosshairs / Telemetry */}
                <div className="flex justify-between items-center text-[9px] text-zinc-600 border-b border-zinc-900 pb-2">
                  <span>[ PORTRAIT_IMAGE_TELEMETRY ]</span>
                  <span>SIZE: 1:1 RATIO</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <Terminal className="w-6 h-6 text-zinc-650 mb-2" />
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block">
                    [ASSET: PROFILE_IMAGE_CONTAINER]
                  </span>
                  <span className="text-[9px] text-zinc-700 mt-1">
                    Path: /public/assets/portrait.jpg
                  </span>
                </div>

                <div className="text-[9px] text-zinc-600 border-t border-zinc-900 pt-2 flex justify-between">
                  <span>SYS: OFFLINE_PLACEHOLDER</span>
                  <span>OK_200</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: DETAILED "0 TO PRODUCTION" ROADMAP */}
          <section id="pipeline" className="space-y-12 border-b border-zinc-900 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">[ Product Pipeline ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-white">0 to Production Roadmap</h2>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                A visual timeline detailing the sequential layers from database normalization to automated container orchestration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {/* Vertical timeline connector */}
              <div className="absolute left-[19px] top-6 bottom-6 w-[1px] bg-zinc-900 hidden md:block" />

              {/* Milestone 01 */}
              <div className="relative pl-0 md:pl-10 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-[#0c0c0e] border border-zinc-800 text-[9px] font-mono text-zinc-450 flex items-center justify-center select-none shrink-0">
                    01
                  </span>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-200">
                    Milestone 01: The Blueprint
                  </h3>
                </div>
                <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-2">
                  <p className="text-xs text-zinc-405 leading-relaxed font-light font-sans">
                    Designing normalized SQL/NoSQL schemas via Prisma or Mongoose, handling relations, indexes, and aggregate pipelines.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-600">
                    <Database className="w-3 h-3" /> SCHEMA_GOVERNANCE: NORMALIZED
                  </div>
                </div>
              </div>

              {/* Milestone 02 */}
              <div className="relative pl-0 md:pl-10 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-[#0c0c0e] border border-zinc-800 text-[9px] font-mono text-zinc-450 flex items-center justify-center select-none shrink-0">
                    02
                  </span>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-200">
                    Milestone 02: The Engine
                  </h3>
                </div>
                <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-2">
                  <p className="text-xs text-zinc-405 leading-relaxed font-light font-sans">
                    Secure RESTful APIs, JWT Access/Refresh token rotation in HTTP-Only cookies, and Zod runtime schema validation.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-600">
                    <ShieldCheck className="w-3 h-3" /> ENGINE_AUTH: JWT_ROTATION
                  </div>
                </div>
              </div>

              {/* Milestone 03 */}
              <div className="relative pl-0 md:pl-10 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-[#0c0c0e] border border-zinc-800 text-[9px] font-mono text-zinc-450 flex items-center justify-center select-none shrink-0">
                    03
                  </span>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-200">
                    Milestone 03: The Interface
                  </h3>
                </div>
                <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-2">
                  <p className="text-xs text-zinc-405 leading-relaxed font-light font-sans">
                    Fluid Next.js App Router UI, strict TypeScript type-safety, modular styled components, and Core Web Vitals audit optimization.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-600">
                    <Layers className="w-3 h-3" /> INTERFACE_CORE: TYPED_COMPONENTS
                  </div>
                </div>
              </div>

              {/* Milestone 04 */}
              <div className="relative pl-0 md:pl-10 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-[#0c0c0e] border border-zinc-800 text-[9px] font-mono text-zinc-450 flex items-center justify-center select-none shrink-0">
                    04
                  </span>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-200">
                    Milestone 04: The Infrastructure
                  </h3>
                </div>
                <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-2">
                  <p className="text-xs text-zinc-405 leading-relaxed font-light font-sans">
                    Multi-stage Docker configurations, Nginx reverse proxy routing with SSL termination, and Ubuntu VPS Linux cloud deployments.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-600">
                    <Server className="w-3 h-3" /> INFRASTRUCTURE: CLOUD_CONTAINERS
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: TOP 3 PROJECTS */}
          <section id="projects" className="space-y-12 border-b border-zinc-900 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">[ Core Systems ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-white">Featured Production Projects</h2>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                A selection of high-fidelity full-stack architectures and community-driven engines, verified for production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-[#0c0c0e]/60 border border-zinc-900 hover:border-zinc-800 p-4 flex flex-col justify-between transition-all duration-300 relative shadow-sm"
                >
                  <div className="space-y-4">
                    {/* Project Image Frame */}
                    <div className="relative aspect-video w-full bg-zinc-950 border border-zinc-900 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-zinc-650">
                          [ASSET: PROJECT_PREVIEW]
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                          ID: 0{project.id} // ACTIVE
                        </span>
                      </div>
                      <h3 className="text-sm font-bold font-mono uppercase tracking-tight text-white">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-zinc-450 font-sans leading-relaxed min-h-[50px] font-light">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900 space-y-4">
                    {/* Tech tag list */}
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] bg-zinc-900 border border-zinc-850 text-zinc-500 px-1.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-zinc-300 hover:text-white underline flex items-center gap-1"
                      >
                        Details <ChevronRight className="w-3 h-3" />
                      </Link>
                      <div className="flex gap-3">
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-white transition-colors"
                        >
                          Github
                        </a>
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          Live
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: GRANULAR TECH STACK SYSTEM */}
          <section id="skills" className="space-y-12 border-b border-zinc-900 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">[ Stack Audit ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-white">Granular Tech Stack System</h2>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                Aggregated system tools mapped alongside their explicit production version numbers and library parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Languages */}
              <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-450 border-b border-zinc-850 pb-2">
                  01 // Core Languages
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
                  <li className="flex justify-between items-center">
                    <span>TypeScript</span>
                    <span className="text-[10px] text-zinc-650">v5.x (Strict Mode)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>JavaScript</span>
                    <span className="text-[10px] text-zinc-650">ES6+ Standard</span>
                  </li>
                </ul>
              </div>

              {/* Frameworks */}
              <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-455 border-b border-zinc-850 pb-2">
                  02 // Frameworks & Libraries
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
                  <li className="flex justify-between items-center">
                    <span>Next.js</span>
                    <span className="text-[10px] text-zinc-650">v14 / v15 App Router</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>React</span>
                    <span className="text-[10px] text-zinc-650">v18 / v19 Core</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Node.js</span>
                    <span className="text-[10px] text-zinc-650">Runtime Core</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Express.js</span>
                    <span className="text-[10px] text-zinc-650">Server REST API</span>
                  </li>
                </ul>
              </div>

              {/* Databases */}
              <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-455 border-b border-zinc-850 pb-2">
                  03 // Databases & ORM
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
                  <li className="flex justify-between items-center">
                    <span>PostgreSQL</span>
                    <span className="text-[10px] text-zinc-650">Relational DB</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>MongoDB</span>
                    <span className="text-[10px] text-zinc-650">Document Store</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Prisma ORM</span>
                    <span className="text-[10px] text-zinc-650">Type-Safe Client</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Mongoose ODM</span>
                    <span className="text-[10px] text-zinc-650">Schema Modelling</span>
                  </li>
                </ul>
              </div>

              {/* DevOps */}
              <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-455 border-b border-zinc-850 pb-2">
                  04 // DevOps & Systems
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
                  <li className="flex justify-between items-center">
                    <span>Docker</span>
                    <span className="text-[10px] text-zinc-650">Containerization</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Nginx</span>
                    <span className="text-[10px] text-zinc-650">Proxy & Load Balancer</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Linux/Ubuntu VPS</span>
                    <span className="text-[10px] text-zinc-650">Remote Hosting</span>
                  </li>
                </ul>
              </div>

              {/* UI/UX Ecosystem */}
              <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 rounded-none space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-455 border-b border-zinc-850 pb-2">
                  05 // UI/UX Ecosystem
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
                  <li className="flex justify-between items-center">
                    <span>Tailwind CSS</span>
                    <span className="text-[10px] text-zinc-650">Utility Framework</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>shadcn/ui</span>
                    <span className="text-[10px] text-zinc-650">Radix Primitive Base</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Aceternity UI</span>
                    <span className="text-[10px] text-zinc-650">Modern Animations</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 4: REALISTIC EXPERIENCE & TEAM TRACE MATRIX */}
          <section id="experience" className="space-y-12 border-b border-zinc-900 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">[ Credentials ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-white">Experience & Team Trace Matrix</h2>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                Honest documentation of my professional tenure, collaborative group workflows, and foundational system training.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {/* IT Firm Tenure */}
              <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-zinc-600 font-bold block">[ 01 // IT_FIRM_TENURE ]</span>
                  <h3 className="font-bold text-white uppercase tracking-tight">On-site Rajshahi Operations</h3>
                  <p className="text-zinc-450 leading-relaxed font-sans font-light">
                    Worked on-site at an established IT firm in Rajshahi. Implemented clean code standards, watched seasoned production workflows, and deployed secure server configurations under senior guidance.
                  </p>
                </div>
                <div className="text-[9px] text-zinc-600 border-t border-zinc-900 pt-3">
                  ROLE: ASSOCIATE DEV // LOCATION: RAJSHAHI
                </div>
              </div>

              {/* Core 4-Man Engineering Team */}
              <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-zinc-600 font-bold block">[ 02 // TEAM_COLLABORATION ]</span>
                  <h3 className="font-bold text-white uppercase tracking-tight">Core {teamSize}-Man Engineering Group</h3>
                  <p className="text-zinc-450 leading-relaxed font-sans font-light">
                    Active collaborator in a specialized {teamSize}-man engineering team. Cooperated closely through git pipelines, resolved integration merge conflicts, and aggregate-shipped production projects from layout to final deploy.
                  </p>
                </div>
                <div className="text-[9px] text-zinc-600 border-t border-zinc-900 pt-3">
                  TEAM: {teamSize} GRADUATES // PIPELINE: GIT_SHARED
                </div>
              </div>

              {/* Training Milestones */}
              <div className="bg-[#0c0c0e]/60 border border-zinc-900 p-5 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-zinc-600 font-bold block">[ 03 // TRAINING_MILESTONES ]</span>
                  <h3 className="font-bold text-white uppercase tracking-tight">Foundations & MERN Specialization</h3>
                  <p className="text-zinc-450 leading-relaxed font-sans font-light">
                    Graduated from Programming Hero (advanced MERN development) and completed rigorous computer science training at Phitron, bridging full-stack implementations with data structures and algorithmic efficiency.
                  </p>
                </div>
                <div className="text-[9px] text-zinc-600 border-t border-zinc-900 pt-3">
                  ACADEMICS: HONOURS (EXPECTED 2028)
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: LIVE BLOG ENGINE */}
          <section id="blog" className="space-y-12 border-b border-zinc-900 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">[ Article Stream ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-white">Technical Insights & Engineering Log</h2>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                An integrated, live-loading blog engine detailing systems architecture, secure authentication lifecycles, and containers pruning.
              </p>
            </div>

            {/* The Blog Engine cards ribbon */}
            <BlogEngine />
          </section>

          {/* SECTION 6: THE TERMINAL CHAT EMBED (VISITOR UPLINK) */}
          <section id="connect" className="space-y-12 scroll-mt-24 pb-12 border-b border-zinc-900">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">[ Live Chat Node ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-white">Establish Gateway Link</h2>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                Connect with my dashboard. Leave an anonymous message below; it securely logs directly into my internal Admin Panel.
              </p>
            </div>

            {/* Inline Terminal Chat Interface */}
            <div className="max-w-xl mx-auto border border-zinc-800 bg-[#0c0c0e] font-mono text-xs flex flex-col shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 p-3 text-[10px] uppercase font-bold text-zinc-500 select-none">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>[Live Chat Node: Online]</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#4ade80]">
                  <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-none animate-pulse" />
                  <span>UPLINK_LIVE</span>
                </div>
              </div>

              {/* Chat Output Frame */}
              <div className="h-[240px] overflow-y-auto p-4 space-y-3 bg-[#070709] border-b border-zinc-800 scrollbar-thin">
                {chatMessages.length === 0 ? (
                  <div className="text-zinc-650 text-[11px] leading-relaxed select-none">
                    [SYSTEM_LOG] Welcome visitor. Establish connection parameters by writing a message below.
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider select-none text-zinc-500">
                        {msg.sender === "user" ? (
                          <>
                            <User className="w-3 h-3 text-[#06b6d4]" />
                            <span>visitor@portfolio</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3 h-3 text-[#fbbf24]" />
                            <span>admin@portfolio</span>
                          </>
                        )}
                        <span className="text-[8px] text-zinc-700">
                          {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#f4f4f5] pl-4 whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="text-zinc-500 text-[10px] animate-pulse">
                    [SYSTEM_LOG] Admin is writing response parameter...
                  </div>
                )}
                <div ref={inlineMessagesEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="p-3 flex items-center gap-2 bg-[#0c0c0e]">
                <span className="text-[#06b6d4] shrink-0 font-bold select-none">&gt;</span>
                <input
                  type="text"
                  value={visitorInput}
                  onChange={(e) => setVisitorInput(e.target.value)}
                  placeholder="write message parameter..."
                  className="flex-1 bg-transparent border-none outline-none text-xs text-[#f4f4f5] placeholder-zinc-700 font-mono px-1 focus:ring-0"
                />
                <button
                  type="submit"
                  disabled={!visitorInput.trim()}
                  className="p-1.5 border border-zinc-800 bg-[#0c0c0e] hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </section>

          {/* SECTION 7: SECRET ADMIN DASHBOARD GATEWAY */}
          <section id="admin-uplink" className="space-y-8 scroll-mt-24">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">[ Secret Access ]</span>
                <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-white">System Console Node</h2>
              </div>
              <button
                onClick={() => setShowAdminConsole(!showAdminConsole)}
                className="flex items-center gap-2 px-3 py-1.5 border border-zinc-800 bg-[#0c0c0e] hover:bg-zinc-900 text-zinc-450 hover:text-white font-mono text-[10px] uppercase transition-all select-none"
              >
                {showAdminConsole ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span>Hide Console</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Show Console</span>
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {showAdminConsole && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden space-y-4"
                >
                  {isAdminLoggedIn ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border border-zinc-800 bg-[#0c0c0e] px-4 py-2 text-[10px] text-zinc-400 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#4ade80] animate-pulse rounded-none" />
                          <span>UPLINK_SECURE: ACTIVE_ADMIN_SESSION</span>
                        </div>
                        <button
                          onClick={handleAdminLogout}
                          className="hover:text-red-400 transition-colors cursor-pointer"
                        >
                          [ LOGOUT ]
                        </button>
                      </div>
                      
                      {/* Active Admin Panel inline view */}
                      <AdminDashboardInline onLogout={handleAdminLogout} />
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto border border-zinc-800 bg-[#0c0c0e] p-6 font-mono space-y-4 shadow-xl">
                      <div className="text-center space-y-1">
                        <Key className="w-5 h-5 mx-auto text-zinc-500" />
                        <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-350">Console Authorization</h3>
                        <p className="text-[9px] text-zinc-500">Provide admin credentials to establish verified session.</p>
                      </div>

                      {adminLoginError && (
                        <div className="border border-red-500/20 bg-red-950/20 text-red-400 p-2.5 text-[10px] text-center font-bold">
                          ERROR: {adminLoginError}
                        </div>
                      )}

                      <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[8px] text-zinc-500 font-bold uppercase">Username</label>
                          <input
                            type="text"
                            required
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                            placeholder="username parameter..."
                            className="w-full bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 placeholder-zinc-700 h-8 px-2.5 outline-none focus:border-zinc-700"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] text-zinc-500 font-bold uppercase">Password</label>
                          <input
                            type="password"
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-350 placeholder-zinc-700 h-8 px-2.5 outline-none focus:border-zinc-700"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmittingAdmin}
                          className="w-full py-2 bg-zinc-300 hover:bg-white text-zinc-950 font-bold uppercase text-[10px] cursor-pointer transition-colors disabled:opacity-40"
                        >
                          {isSubmittingAdmin ? "Authorizing Node..." : "Establish Uplink"}
                        </button>
                      </form>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

        </main>
      </Responsive>

      {/* FLOATING CHAT BUBBLE (Bottom Right Drawer for Visitors) */}
      <div className="fixed bottom-6 right-6 z-50 font-mono">
        <AnimatePresence>
          {chatOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-72 sm:w-80 md:w-96 border border-zinc-800 bg-[#0c0c0e] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 p-3 text-[10px] uppercase font-bold text-zinc-500 select-none">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span>[Live Chat Node: Online]</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[#4ade80] text-[9px]">
                    <span className="w-1 h-1 bg-[#4ade80] rounded-none animate-pulse" />
                    <span>LIVE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setChatOpen(false)}
                    className="text-zinc-600 hover:text-white transition-colors ml-1 cursor-pointer"
                    aria-label="Close Chat"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message frame */}
              <div className="h-[200px] overflow-y-auto p-3 space-y-3 bg-[#070709] border-b border-zinc-800 scrollbar-thin">
                {chatMessages.length === 0 ? (
                  <div className="text-zinc-650 text-[10px] leading-relaxed select-none">
                    [SYSTEM_LOG] Uplink ready. Send a message to get in touch with me directly.
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[8px] uppercase tracking-wider select-none text-zinc-500">
                        {msg.sender === "user" ? "visitor@portfolio" : "admin@portfolio"}
                        <span className="text-zinc-700">
                          {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#f4f4f5] pl-2.5 whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input block */}
              <form onSubmit={handleSendMessage} className="p-2 flex items-center gap-2 bg-[#0c0c0e]">
                <span className="text-[#06b6d4] shrink-0 font-bold select-none">&gt;</span>
                <input
                  type="text"
                  value={visitorInput}
                  onChange={(e) => setVisitorInput(e.target.value)}
                  placeholder="send a message..."
                  className="flex-1 bg-transparent border-none outline-none text-xs text-[#f4f4f5] placeholder-zinc-700 font-mono px-1 focus:ring-0"
                />
                <button
                  type="submit"
                  disabled={!visitorInput.trim()}
                  className="p-1 border border-zinc-800 bg-[#0c0c0e] hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.button
              layoutId="chat-bubble"
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 border border-zinc-800 bg-[#0c0c0e] text-zinc-200 hover:text-white hover:bg-zinc-900 transition-all duration-300 shadow-xl focus:outline-none select-none cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-2 h-2 bg-[#4ade80] rounded-none animate-pulse shrink-0" />
              <span className="text-xs uppercase font-bold tracking-wider">[Live Chat Node: Online]</span>
              <MessageSquare className="w-3.5 h-3.5 ml-1 text-zinc-550" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </BackgroundShell>
  );
}
