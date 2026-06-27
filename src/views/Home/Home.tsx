"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../shared/Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Layers,
  Server,
  ShieldCheck,
  Terminal,
  Mail,
  User,
  Send,
  Zap,
  Check,
  MessageSquare,
  X,
  ChevronRight,
  Lock,
  Unlock,
  Key,
  FileText
} from "lucide-react";
import Responsive from "@/views/Responsive/Responsive";
import BlogEngine from "./BlogEngine";
import AdminDashboardInline from "./AdminDashboardInline";
import BackgroundShell from "@/components/BackgroundShell";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "user" | "admin" | "bot";
  content: string;
  timestamp: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  links: { live: string; github: string };
}

// 3D Perspective Tilt Card Component
const HeroProfileCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(true); // Default to true to test the placeholder requirement

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max tilt angles
    const maxTilt = 15;
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative aspect-square w-full max-w-[300px] sm:max-w-[340px] bg-card text-card-foreground border border-border flex flex-col justify-between p-5 font-mono shadow-2xl backdrop-blur-md rounded-lg cursor-pointer overflow-hidden group select-none"
    >
      {/* Glossy reflection effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          transform: "translateZ(10px)",
        }}
      />

      <div 
        className="flex justify-between items-center text-[9px] text-muted-foreground border-b border-border/80 pb-2.5"
        style={{ transform: "translateZ(20px)" }}
      >
        <span>[ PORTRAIT_IMAGE_TELEMETRY ]</span>
        <span>SIZE: 1:1 RATIO</span>
      </div>

      <div 
        className="flex-1 flex flex-col items-center justify-center text-center p-4"
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
      >
        {!imageError ? (
          <img
            src="/Rashedul.jpeg"
            alt="Portrait"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-md border border-border shadow-md"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border border-dashed border-border/80 bg-muted/30 rounded-md w-full h-full min-h-[140px]">
            <Terminal className="w-8 h-8 text-primary/60 mb-2" />
            <span className="text-xs text-foreground uppercase tracking-widest font-bold block">
              [3D_ENGINE_READY: PROFILE_IMAGE]
            </span>
            <span className="text-[9px] text-muted-foreground mt-1.5">
              Path: /public/assets/portrait.jpg
            </span>
          </div>
        )}
      </div>

      <div 
        className="text-[9px] text-muted-foreground border-t border-border/80 pt-2.5 flex justify-between"
        style={{ transform: "translateZ(20px)" }}
      >
        <span>SYS: OFFLINE_PLACEHOLDER</span>
        <span>OK_200</span>
      </div>
    </motion.div>
  );
};

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

  // Site headlines loaded dynamically
  const [headline, setHeadline] = useState("I build type-safe full-stack applications and deploy them to cloud production infrastructure. No generic templates, just clean engineering.");
  const [intro, setIntro] = useState("Merging core computer science fundamentals with modern scalable engineering. Based in Naogaon, Bangladesh, I specialize in robust DevOps pipelines and type-safe systems design.");
  const [email, setEmail] = useState("rashedulraha.bd@gmail.com");
  const [teamSize, setTeamSize] = useState("4");
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

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSubmittingAdmin, setIsSubmittingAdmin] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [showAdminConsole, setShowAdminConsole] = useState(false);

  useEffect(() => {
    let id = localStorage.getItem("chat_session_id");
    if (!id) {
      id = "sess_" + Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("chat_session_id", id);
    }
    setSessionId(id);

    const checkAdminCookie = () => {
      const isClientAdmin = document.cookie.split("; ").find((row) => row.startsWith("is_admin="));
      setIsAdminLoggedIn(!!isClientAdmin);
    };
    checkAdminCookie();
  }, []);

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
      
      {/* Ambient Grid overlay for aesthetic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 z-0" />

      <Navbar />

      <Responsive>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-32 pt-28 pb-20">
          
          {/* SECTION 1: THE IMPACT HERO LAYER */}
          <section id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center min-h-[70vh] border-b border-border/80 pb-20">
            {/* Left Column */}
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-border bg-card/65 backdrop-blur-xs px-3.5 py-1.5 text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Dhaka Node // Local Time: {bangladeshTime || "--:--:--"}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-relaxed max-w-xl font-mono uppercase">
                {headline}
              </h1>
              
              <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-xl">
                {intro}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#pipeline"
                  onClick={handleScrollToPipeline}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-primary text-primary-foreground hover:opacity-90 font-mono text-xs tracking-tight transition-all rounded-md font-semibold shadow-md"
                >
                  Explore Full Production Pipeline ↓
                </a>

                <div className="flex gap-2 shrink-0">
                  <a
                    href={`mailto:${email}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-card hover:bg-accent border border-border text-foreground font-mono text-xs tracking-tight transition-all rounded-md"
                  >
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Direct Email</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-card hover:bg-accent border border-border text-foreground font-mono text-xs tracking-tight transition-all rounded-md"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied Address</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Resume Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 3D-PERSPECTIVE PROFILE CARD */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <HeroProfileCard />
            </div>
          </section>

          {/* SECTION 2: DETAILED "0 TO PRODUCTION" ROADMAP */}
          <section id="pipeline" className="space-y-12 border-b border-border/80 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">[ Product Pipeline ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-foreground">0 to Production Roadmap</h2>
              <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                A visual timeline detailing the sequential layers from database normalization to automated container orchestration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {/* Vertical timeline connector */}
              <div className="absolute left-[19px] top-6 bottom-6 w-[1px] bg-border hidden md:block" />

              {/* Milestone 01 */}
              <div className="relative pl-0 md:pl-10 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-card border border-border text-[9px] font-mono text-foreground flex items-center justify-center select-none shrink-0 rounded-sm">
                    01
                  </span>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">
                    Milestone 01: The Blueprint
                  </h3>
                </div>
                <div className="bg-card/75 border border-border p-5 rounded-md space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                    Designing normalized SQL/NoSQL schemas via Prisma or Mongoose, handling relations, indexes, and aggregate pipelines.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
                    <Database className="w-3.5 h-3.5 text-primary" /> SCHEMA_GOVERNANCE: NORMALIZED
                  </div>
                </div>
              </div>

              {/* Milestone 02 */}
              <div className="relative pl-0 md:pl-10 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-card border border-border text-[9px] font-mono text-foreground flex items-center justify-center select-none shrink-0 rounded-sm">
                    02
                  </span>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">
                    Milestone 02: The Engine
                  </h3>
                </div>
                <div className="bg-card/75 border border-border p-5 rounded-md space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                    Secure RESTful APIs, JWT Access/Refresh token rotation in HTTP-Only cookies, and Zod runtime schema validation.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" /> ENGINE_AUTH: JWT_ROTATION
                  </div>
                </div>
              </div>

              {/* Milestone 03 */}
              <div className="relative pl-0 md:pl-10 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-card border border-border text-[9px] font-mono text-foreground flex items-center justify-center select-none shrink-0 rounded-sm">
                    03
                  </span>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">
                    Milestone 03: The Interface
                  </h3>
                </div>
                <div className="bg-card/75 border border-border p-5 rounded-md space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                    Fluid Next.js App Router UI, strict TypeScript type-safety, modular styled components, and Core Web Vitals audit optimization.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
                    <Layers className="w-3.5 h-3.5 text-primary" /> INTERFACE_CORE: TYPED_COMPONENTS
                  </div>
                </div>
              </div>

              {/* Milestone 04 */}
              <div className="relative pl-0 md:pl-10 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-card border border-border text-[9px] font-mono text-foreground flex items-center justify-center select-none shrink-0 rounded-sm">
                    04
                  </span>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-foreground">
                    Milestone 04: The Infrastructure
                  </h3>
                </div>
                <div className="bg-card/75 border border-border p-5 rounded-md space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                    Multi-stage Docker configurations, Nginx reverse proxy routing with SSL termination, and Ubuntu VPS Linux cloud deployments.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
                    <Server className="w-3.5 h-3.5 text-primary" /> INFRASTRUCTURE: CLOUD_CONTAINERS
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: TOP 3 PROJECTS */}
          <section id="projects" className="space-y-12 border-b border-border/80 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">[ Core Systems ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-foreground">Featured Production Projects</h2>
              <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                A selection of high-fidelity full-stack architectures and community-driven engines, verified for production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-card text-card-foreground border border-border hover:border-primary/40 p-5 flex flex-col justify-between transition-all duration-300 relative shadow-sm rounded-md"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-video w-full bg-muted border border-border overflow-hidden rounded-sm">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-muted-foreground">
                          [ASSET: PROJECT_PREVIEW]
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                          ID: 0{project.id} // ACTIVE
                        </span>
                      </div>
                      <h3 className="text-sm font-bold font-mono uppercase tracking-tight text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground font-sans leading-relaxed min-h-[50px] font-light">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] bg-muted border border-border/80 text-muted-foreground px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-foreground hover:text-primary underline flex items-center gap-1"
                      >
                        Details <ChevronRight className="w-3 h-3" />
                      </Link>
                      <div className="flex gap-3">
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Github
                        </a>
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
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
          <section id="skills" className="space-y-12 border-b border-border/80 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">[ Stack Audit ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-foreground">Granular Tech Stack System</h2>
              <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                Aggregated system tools mapped alongside their explicit production version numbers and library parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Languages */}
              <div className="bg-card text-card-foreground border border-border p-5 rounded-md space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground border-b border-border/80 pb-2">
                  01 // Core Languages
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-foreground/80">
                  <li className="flex justify-between items-center">
                    <span>TypeScript</span>
                    <span className="text-[10px] text-muted-foreground">v5.x (Strict Mode)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>JavaScript</span>
                    <span className="text-[10px] text-muted-foreground">ES6+ Standard</span>
                  </li>
                </ul>
              </div>

              {/* Frameworks */}
              <div className="bg-card text-card-foreground border border-border p-5 rounded-md space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground border-b border-border/80 pb-2">
                  02 // Frameworks & Libraries
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-foreground/80">
                  <li className="flex justify-between items-center">
                    <span>Next.js</span>
                    <span className="text-[10px] text-muted-foreground">v14 / v15 App Router</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>React</span>
                    <span className="text-[10px] text-muted-foreground">v18 / v19 Core</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Node.js</span>
                    <span className="text-[10px] text-muted-foreground">Runtime Core</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Express.js</span>
                    <span className="text-[10px] text-muted-foreground">Server REST API</span>
                  </li>
                </ul>
              </div>

              {/* Databases */}
              <div className="bg-card text-card-foreground border border-border p-5 rounded-md space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground border-b border-border/80 pb-2">
                  03 // Databases & ORM
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-foreground/80">
                  <li className="flex justify-between items-center">
                    <span>PostgreSQL</span>
                    <span className="text-[10px] text-muted-foreground">Relational DB</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>MongoDB</span>
                    <span className="text-[10px] text-muted-foreground">Document Store</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Prisma ORM</span>
                    <span className="text-[10px] text-muted-foreground">Type-Safe Client</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Mongoose ODM</span>
                    <span className="text-[10px] text-muted-foreground">Schema Modelling</span>
                  </li>
                </ul>
              </div>

              {/* DevOps */}
              <div className="bg-card text-card-foreground border border-border p-5 rounded-md space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground border-b border-border/80 pb-2">
                  04 // DevOps & Systems
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-foreground/80">
                  <li className="flex justify-between items-center">
                    <span>Docker</span>
                    <span className="text-[10px] text-muted-foreground">Containerization</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Nginx</span>
                    <span className="text-[10px] text-muted-foreground">Proxy & Load Balancer</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Linux/Ubuntu VPS</span>
                    <span className="text-[10px] text-muted-foreground">Remote Hosting</span>
                  </li>
                </ul>
              </div>

              {/* UI/UX Ecosystem */}
              <div className="bg-card text-card-foreground border border-border p-5 rounded-md space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground border-b border-border/80 pb-2">
                  05 // UI/UX Ecosystem
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-foreground/80">
                  <li className="flex justify-between items-center">
                    <span>Tailwind CSS</span>
                    <span className="text-[10px] text-muted-foreground">Utility Framework</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>shadcn/ui</span>
                    <span className="text-[10px] text-muted-foreground">Radix Primitive Base</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Aceternity UI</span>
                    <span className="text-[10px] text-muted-foreground">Modern Animations</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 4: REALISTIC EXPERIENCE & TEAM TRACE MATRIX */}
          <section id="experience" className="space-y-12 border-b border-border/80 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">[ Credentials ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-foreground">Experience & Team Trace Matrix</h2>
              <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                Honest documentation of my professional tenure, collaborative group workflows, and foundational system training.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {/* IT Firm Tenure */}
              <div className="bg-card text-card-foreground border border-border p-5 flex flex-col justify-between space-y-6 rounded-md">
                <div className="space-y-3">
                  <span className="text-primary font-bold block">[ 01 // IT_FIRM_TENURE ]</span>
                  <h3 className="font-bold text-foreground uppercase tracking-tight">On-site Rajshahi Operations</h3>
                  <p className="text-muted-foreground leading-relaxed font-sans font-normal text-xs">
                    Worked on-site at an established IT firm in Rajshahi. Implemented clean code standards, watched seasoned production workflows, and deployed secure server configurations under senior guidance.
                  </p>
                </div>
                <div className="text-[9px] text-muted-foreground border-t border-border/80 pt-3">
                  ROLE: ASSOCIATE DEV // LOCATION: RAJSHAHI
                </div>
              </div>

              {/* Core 4-Man Engineering Team */}
              <div className="bg-card text-card-foreground border border-border p-5 flex flex-col justify-between space-y-6 rounded-md">
                <div className="space-y-3">
                  <span className="text-primary font-bold block">[ 02 // TEAM_COLLABORATION ]</span>
                  <h3 className="font-bold text-foreground uppercase tracking-tight">Core {teamSize}-Man Engineering Group</h3>
                  <p className="text-muted-foreground leading-relaxed font-sans font-normal text-xs">
                    Active collaborator in a specialized {teamSize}-man engineering team. Cooperated closely through git pipelines, resolved integration merge conflicts, and aggregate-shipped production projects from layout to final deploy.
                  </p>
                </div>
                <div className="text-[9px] text-muted-foreground border-t border-border/80 pt-3">
                  TEAM: {teamSize} GRADUATES // PIPELINE: GIT_SHARED
                </div>
              </div>

              {/* Training Milestones */}
              <div className="bg-card text-card-foreground border border-border p-5 flex flex-col justify-between space-y-6 rounded-md">
                <div className="space-y-3">
                  <span className="text-primary font-bold block">[ 03 // TRAINING_MILESTONES ]</span>
                  <h3 className="font-bold text-foreground uppercase tracking-tight">Foundations & MERN Specialization</h3>
                  <p className="text-muted-foreground leading-relaxed font-sans font-normal text-xs">
                    Graduated from Programming Hero (advanced MERN development) and completed rigorous computer science training at Phitron, bridging full-stack implementations with data structures and algorithmic efficiency.
                  </p>
                </div>
                <div className="text-[9px] text-muted-foreground border-t border-border/80 pt-3">
                  ACADEMICS: HONOURS (EXPECTED 2028)
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: LIVE BLOG ENGINE */}
          <section id="blog" className="space-y-12 border-b border-border/80 pb-24 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">[ Article Stream ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-foreground">Technical Insights & Engineering Log</h2>
              <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                An integrated, live-loading blog engine detailing systems architecture, secure authentication lifecycles, and containers pruning.
              </p>
            </div>

            <BlogEngine />
          </section>

          {/* SECTION 6: THE TERMINAL CHAT EMBED (VISITOR UPLINK) */}
          <section id="connect" className="space-y-12 scroll-mt-24 pb-12 border-b border-border/80">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">[ Live Chat Node ]</span>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-foreground">Establish Gateway Link</h2>
              <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                Connect with my dashboard. Leave an anonymous message below; it securely logs directly into my internal Admin Panel.
              </p>
            </div>

            <div className="max-w-xl mx-auto border border-border bg-card text-card-foreground font-mono text-xs flex flex-col shadow-lg rounded-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-3.5 text-[10px] uppercase font-bold text-muted-foreground select-none bg-muted/20">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>[Live Chat Node: Online]</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span>UPLINK_LIVE</span>
                </div>
              </div>

              {/* Chat Output Frame */}
              <div className="h-[240px] overflow-y-auto p-4 space-y-3 bg-muted/5 border-b border-border scrollbar-thin">
                {chatMessages.length === 0 ? (
                  <div className="text-muted-foreground text-[11px] leading-relaxed select-none">
                    [SYSTEM_LOG] Welcome visitor. Establish connection parameters by writing a message below.
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider select-none text-muted-foreground">
                        {msg.sender === "user" ? (
                          <>
                            <User className="w-3.5 h-3.5 text-primary" />
                            <span>visitor@portfolio</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>admin@portfolio</span>
                          </>
                        )}
                        <span className="text-[8px] text-muted-foreground/60">
                          {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-foreground pl-4 whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="text-muted-foreground text-[10px] animate-pulse">
                    [SYSTEM_LOG] Admin is writing response parameter...
                  </div>
                )}
                <div ref={inlineMessagesEndRef} />
              </div>

              {/* Input form */}
              <form onSubmit={handleSendMessage} className="p-3 flex items-center gap-2 bg-card">
                <span className="text-primary shrink-0 font-bold select-none">&gt;</span>
                <input
                  type="text"
                  value={visitorInput}
                  onChange={(e) => setVisitorInput(e.target.value)}
                  placeholder="write message parameter..."
                  className="flex-1 bg-transparent border-none outline-none text-xs text-foreground placeholder-muted-foreground font-mono px-1 focus:ring-0"
                />
                <button
                  type="submit"
                  disabled={!visitorInput.trim()}
                  className="p-1.5 border border-border bg-muted hover:bg-muted/80 text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
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
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">[ Secret Access ]</span>
                <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-foreground">System Console Node</h2>
              </div>
              <button
                onClick={() => setShowAdminConsole(!showAdminConsole)}
                className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card hover:bg-accent text-foreground font-mono text-[10px] uppercase transition-all select-none rounded-md"
              >
                {showAdminConsole ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Hide Console</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
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
                      <div className="flex items-center justify-between border border-border bg-card px-4 py-2.5 text-[10px] text-muted-foreground font-mono rounded-md">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
                          <span>UPLINK_SECURE: ACTIVE_ADMIN_SESSION</span>
                        </div>
                        <button
                          onClick={handleAdminLogout}
                          className="hover:text-destructive transition-colors cursor-pointer"
                        >
                          [ LOGOUT ]
                        </button>
                      </div>
                      
                      <AdminDashboardInline onLogout={handleAdminLogout} />
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto border border-border bg-card p-6 font-mono space-y-4 shadow-xl rounded-md text-card-foreground">
                      <div className="text-center space-y-1">
                        <Key className="w-5 h-5 mx-auto text-primary" />
                        <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">Console Authorization</h3>
                        <p className="text-[9px] text-muted-foreground">Provide admin credentials to establish verified session.</p>
                      </div>

                      {adminLoginError && (
                        <div className="border border-destructive/20 bg-destructive/5 text-destructive p-2.5 text-[10px] text-center font-bold">
                          ERROR: {adminLoginError}
                        </div>
                      )}

                      <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[8px] text-muted-foreground font-bold uppercase">Username</label>
                          <input
                            type="text"
                            required
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                            placeholder="username parameter..."
                            className="w-full bg-muted border border-border text-[10px] text-foreground placeholder-muted-foreground h-8 px-2.5 outline-none focus:border-primary font-mono rounded-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] text-muted-foreground font-bold uppercase">Password</label>
                          <input
                            type="password"
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-muted border border-border text-[10px] text-foreground placeholder-muted-foreground h-8 px-2.5 outline-none focus:border-primary font-mono rounded-sm"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmittingAdmin}
                          className="w-full py-2.5 bg-primary hover:opacity-90 text-primary-foreground font-bold uppercase text-[10px] cursor-pointer transition-colors disabled:opacity-40 rounded-sm"
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
              className="w-72 sm:w-80 md:w-96 border border-border bg-card text-card-foreground flex flex-col shadow-2xl overflow-hidden rounded-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-3 text-[10px] uppercase font-bold text-muted-foreground select-none bg-muted/20">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>[Live Chat Node: Online]</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-emerald-500 text-[9px]">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                    <span>LIVE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setChatOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors ml-1 cursor-pointer"
                    aria-label="Close Chat"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message frame */}
              <div className="h-[200px] overflow-y-auto p-3 bg-muted/5 border-b border-border scrollbar-thin">
                {chatMessages.length === 0 ? (
                  <div className="text-muted-foreground text-[10px] leading-relaxed select-none">
                    [SYSTEM_LOG] Uplink ready. Send a message to get in touch with me directly.
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[8px] uppercase tracking-wider select-none text-muted-foreground">
                        {msg.sender === "user" ? "visitor@portfolio" : "admin@portfolio"}
                        <span className="text-muted-foreground/60">
                          {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-foreground pl-2.5 whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input block */}
              <form onSubmit={handleSendMessage} className="p-2.5 flex items-center gap-2 bg-card">
                <span className="text-primary shrink-0 font-bold select-none">&gt;</span>
                <input
                  type="text"
                  value={visitorInput}
                  onChange={(e) => setVisitorInput(e.target.value)}
                  placeholder="send a message..."
                  className="flex-1 bg-transparent border-none outline-none text-xs text-foreground placeholder-muted-foreground font-mono px-1 focus:ring-0"
                />
                <button
                  type="submit"
                  disabled={!visitorInput.trim()}
                  className="p-1 border border-border bg-muted hover:bg-muted/80 text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.button
              layoutId="chat-bubble"
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-4.5 py-3 border border-border bg-card text-foreground hover:bg-accent transition-all duration-300 shadow-xl focus:outline-none select-none cursor-pointer rounded-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0" />
              <span className="text-[10px] uppercase font-bold tracking-wider">[Live Chat Node: Online]</span>
              <MessageSquare className="w-3.5 h-3.5 ml-1 text-primary" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </BackgroundShell>
  );
}
