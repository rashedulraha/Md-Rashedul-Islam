"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  X, 
  ChevronRight, 
  CornerDownRight, 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  MessageSquare, 
  User, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Layers, 
  Sparkles, 
  Loader2,
  Lock,
  Unlock,
  Settings
} from "lucide-react";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  tags: string[];
  status: "draft" | "published";
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "admin" | "bot";
  timestamp: string;
  read: boolean;
}

interface ChatSession {
  sessionId: string;
  userName: string;
  userEmail?: string;
  messages: Message[];
  online: boolean;
  lastActive: string;
}

interface AIProfile {
  userIntent: string;
  coreStack: string;
  actionPlan: string[];
  suggestedNextReply: string;
}

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "docker-multistage",
    title: "Architecting Multi-Stage Docker Builds for Production Node.js Services",
    excerpt: "Reduce image size by up to 90%, secure runtime permissions, and prevent dependency bloating using advanced multi-stage caching.",
    date: "June 24, 2026",
    readTime: "5 min read",
    tags: ["Docker", "DevOps", "Security", "Node.js"],
    status: "published",
    content: `### The Challenge of Large Container Images\n\nIn traditional Docker setups for Node.js, we often copy the entire project workspace (including devDependencies, lock files, and compiler caches) into the final container. This leads to image sizes exceeding 1.2 GB, slower deployment pipeline speeds, and an increased security vulnerability attack surface.\n\n### The Multi-Stage Architecture Solution\n\nMulti-stage builds allow us to separate our build environment (where we compile TypeScript, run linters, and pull dev-dependencies) from the actual runtime environment (where we only need the compiled JavaScript outputs and production packages).\n\n### Verification & Performance Metrics\n\nBy utilizing this three-stage model:\n\n1. Size Optimization: Image footprint reduced from 1.15 GB to 124 MB.\n2. Security Hardening: The process executes under a non-root user (nextjs).\n3. Deployment Speeds: Average build-cache validation times dropped to under 3.5 seconds.`
  },
  {
    id: "jwt-rotation",
    title: "Implementing JWT Access & Refresh Token Rotation with Secure Cookies",
    excerpt: "A deep dive into cross-site scripting (XSS) mitigation, CSRF protection, and token validation synchronization using Next.js Middleware and App Router.",
    date: "June 18, 2026",
    readTime: "4 min read",
    tags: ["Next.js", "JWT", "Security", "TypeScript"],
    status: "published",
    content: `### Authentication Security Constraints\n\nWhen building modern web applications, storing authentication tokens directly in client-side storage (localStorage) is highly dangerous due to vulnerability to XSS attacks. The standard solution is utilizing HTTP-Only, Secure, SameSite cookies.\n\n### Access & Refresh Token Rotation\n\nTo maintain user sessions without forcing frequent logins, we must implement a secure Access/Refresh Token Rotation pipeline where the access token expires in 15 minutes and refresh token in 7 days.\n\n### Key Security Benefits\n\n- XSS Immunity: JS scripts running in the browser cannot read cookie values.\n- CSRF Immunity: Adding custom headers (X-Requested-With) paired with SameSite=Strict rules locks down cross-site scripting vulnerabilities.`
  }
];

export default function AdminControl() {
  const [activeTab, setActiveTab] = useState<"blog-view" | "dashboard">("blog-view");
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Auth & Admin Dashboard States
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [dashboardTab, setDashboardTab] = useState<"manage-blog" | "chat-monitor">("chat-monitor");

  // Blog Editor States
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");

  // Chat Monitor States
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);

  // AI Profiler States
  const [aiProfile, setAiProfile] = useState<AIProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load articles from localStorage on mount
  const loadArticles = () => {
    const stored = localStorage.getItem("site_blog_articles");
    if (stored) {
      try {
        setArticles(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored articles", e);
        setArticles(DEFAULT_ARTICLES);
      }
    } else {
      localStorage.setItem("site_blog_articles", JSON.stringify(DEFAULT_ARTICLES));
      setArticles(DEFAULT_ARTICLES);
    }
  };

  useEffect(() => {
    loadArticles();
    // Sync across tabs/components
    window.addEventListener("storage", loadArticles);
    window.addEventListener("blog-updated", loadArticles);
    return () => {
      window.removeEventListener("storage", loadArticles);
      window.removeEventListener("blog-updated", loadArticles);
    };
  }, []);

  // Fetch chat sessions if admin is active
  const fetchChatSessions = async () => {
    setLoadingSessions(true);
    try {
      const res = await fetch("/api/chat/messages");
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoadingSessions(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchChatSessions();
      const eventSource = new EventSource("/api/chat/sse?sessionId=admin");
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "message") {
            fetchChatSessions();
          }
        } catch (e) {
          console.error(e);
        }
      };
      return () => eventSource.close();
    }
  }, [isAdmin]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedSessionId, sessions]);

  // AI Telemetry Profile Generation
  const handleGenerateAIProfile = async () => {
    if (!selectedSessionId || loadingProfile) return;
    setLoadingProfile(true);
    setAiProfile(null);

    try {
      const res = await fetch(`/api/admin/user-summary?sessionId=${selectedSessionId}`);
      if (!res.ok) throw new Error("Failed to generate profile");
      const data = await res.json();
      const summary = data.summary;

      const currentSession = sessions.find(s => s.sessionId === selectedSessionId);
      const fullText = currentSession?.messages.map(m => m.content).join(" ").toLowerCase() || "";
      const stacks = [];
      if (fullText.includes("next")) stacks.push("Next.js");
      if (fullText.includes("docker")) stacks.push("Docker");
      if (fullText.includes("nginx")) stacks.push("Nginx");
      if (fullText.includes("postgres")) stacks.push("PostgreSQL");
      if (fullText.includes("mongo")) stacks.push("MongoDB");
      if (fullText.includes("typescript") || fullText.includes("ts")) stacks.push("TypeScript");
      if (stacks.length === 0) stacks.push("Full-Stack Core");

      setAiProfile({
        userIntent: summary.userIntent || summary.visitorIntent || "Developer Portfolio Exploration",
        coreStack: stacks.join(", "),
        actionPlan: Array.isArray(summary.actionPlan) 
          ? summary.actionPlan 
          : ["Acknowledge tech stack inquiry", "Deliver optimized VPS deployment roadmap"],
        suggestedNextReply: summary.suggestedNextReply || "Thanks for your message. I can build and deploy this system configuration on an Ubuntu VPS."
      });
    } catch (err) {
      // Fallback telemetry metrics
      setAiProfile({
        userIntent: "Portfolio Assessment / Technical Review",
        coreStack: "TypeScript, React, Next.js, Docker",
        actionPlan: [
          "Validate production pipeline milestones",
          "Provide secure project code references"
        ],
        suggestedNextReply: "Thanks for examining my development pipeline. Let's schedule a session to verify production-grade architecture."
      });
      toast.info("Generated local fallback telemetry metrics.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "admin123" || passwordInput === "admin") { // Simple local client check
      setIsAdmin(true);
      toast.success("Admin Session Initialized");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  // Blog CRUD
  const saveArticles = (updated: Article[]) => {
    localStorage.setItem("site_blog_articles", JSON.stringify(updated));
    setArticles(updated);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("blog-updated"));
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Content are required.");
      return;
    }

    const tagList = tags.split(",").map(t => t.trim()).filter(t => t !== "");

    if (editId) {
      const updated = articles.map(art => {
        if (art.id === editId) {
          return {
            ...art,
            title,
            excerpt: excerpt || content.substring(0, 120) + "...",
            content,
            tags: tagList,
            status
          };
        }
        return art;
      });
      saveArticles(updated);
      toast.success("Article updated successfully.");
      setEditId(null);
    } else {
      const newArticle: Article = {
        id: "art_" + Date.now().toString(),
        title,
        excerpt: excerpt || content.substring(0, 120) + "...",
        content,
        readTime: `${Math.max(1, Math.ceil(content.split(" ").length / 200))} min read`,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        tags: tagList,
        status
      };
      saveArticles([...articles, newArticle]);
      toast.success("New article published.");
    }

    // Reset Form
    setTitle("");
    setExcerpt("");
    setContent("");
    setTags("");
    setStatus("published");
  };

  const handleEditClick = (art: Article) => {
    setEditId(art.id);
    setTitle(art.title);
    setExcerpt(art.excerpt);
    setContent(art.content);
    setTags(art.tags.join(", "));
    setStatus(art.status);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("Are you sure you want to purge this article?")) {
      const filtered = articles.filter(a => a.id !== id);
      saveArticles(filtered);
      toast.success("Article deleted.");
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSessionId || sendingReply) return;

    setSendingReply(true);
    const contentText = replyText;
    setReplyText("");

    try {
      const response = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          content: contentText,
          sender: "admin",
        }),
      });

      if (!response.ok) throw new Error("Failed to reply");
      fetchChatSessions();
    } catch (err) {
      toast.error("Failed to transmit reply packet.");
      setReplyText(contentText);
    } finally {
      setSendingReply(false);
    }
  };

  const currentChatSession = sessions.find(s => s.sessionId === selectedSessionId);
  const publishedArticles = articles.filter(a => a.status === "published" || !a.status);

  return (
    <section 
      id="blog-control" 
      className="py-16 md:py-20 border-b border-[var(--border)]"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setActiveTab("blog-view"); setSelectedArticle(null); }}
              className={`px-4 py-2 text-sm font-mono font-bold uppercase tracking-wider rounded-md border transition-all cursor-pointer ${
                activeTab === "blog-view"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--accent)]"
              }`}
            >
              Technical Insights
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 text-sm font-mono font-bold uppercase tracking-wider rounded-md border transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--accent)]"
              }`}
            >
              Control Panel
            </button>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-secondary)] hidden sm:inline uppercase">
            [ SECURE_SYSTEM_SHELL ]
          </span>
        </div>

        {/* TAB 1: HIGH READABILITY BLOG */}
        {activeTab === "blog-view" && (
          <div className="space-y-8">
            <div className="space-y-3 text-left">
              <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest block font-semibold">
                [ Technical Publications ]
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Insights & Engineering Log
              </h2>
              <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                Detailed breakdowns on microservice containerization, secure authorization frameworks, and server architectures.
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {publishedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="bg-card border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {art.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-base text-[var(--text-secondary)] line-clamp-3 leading-relaxed font-sans">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-[var(--border)]/60 pt-4 mt-6 flex justify-between items-center">
                    <div className="flex gap-1.5">
                      {art.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent)] border border-[var(--border)] text-[var(--text-secondary)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-mono text-primary flex items-center gap-1 font-semibold group-hover:text-primary/80">
                      Read Node <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Read Sidebar Drawer Overlay */}
            {selectedArticle && (
              <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs p-4 sm:p-6 md:p-10">
                <div className="absolute inset-0 cursor-crosshair" onClick={() => setSelectedArticle(null)} />

                <div className="relative w-full max-w-2xl h-full bg-card text-card-foreground border-l border-[var(--border)] shadow-2xl flex flex-col z-10 rounded-xl overflow-hidden">
                  {/* Drawer Header */}
                  <div className="p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--accent)]/30 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[var(--accent)] border border-[var(--border)] text-[var(--text-secondary)] rounded-md">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider block font-bold">ARTICLE_TELEMETRY</span>
                        <span className="text-xs font-mono text-emerald-500 font-bold">CONNECTED_READER</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="p-1.5 rounded-md hover:bg-[var(--accent)] border border-[var(--border)] transition-all cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Drawer Content - Spacious and Readable */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 select-text">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {selectedArticle.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent)] border border-[var(--border)] text-[var(--text-secondary)]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                        {selectedArticle.title}
                      </h1>

                      <div className="flex gap-4 text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border)] pb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-primary" /> {selectedArticle.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary" /> {selectedArticle.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="text-[var(--text-primary)] space-y-6 text-base leading-relaxed max-w-none">
                      {selectedArticle.content.split("\n\n").map((block, idx) => {
                        const line = block.trim();
                        if (line.startsWith("### ")) {
                          return (
                            <h3 key={idx} className="text-lg font-bold font-mono text-[var(--text-primary)] pt-4 flex items-center gap-2 border-b border-[var(--border)]/40 pb-2">
                              <CornerDownRight className="w-4 h-4 text-primary shrink-0" />
                              {line.replace("### ", "")}
                            </h3>
                          );
                        }
                        if (line.startsWith("1. ") || line.startsWith("- ")) {
                          return (
                            <ul key={idx} className="list-disc pl-6 space-y-2 text-[var(--text-secondary)] font-normal text-base leading-relaxed">
                              {line.split("\n").map((li, lIdx) => (
                                <li key={lIdx}>
                                  {li.replace(/^[0-9]\.\s*|^- \s*/, "")}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p key={idx} className="leading-relaxed">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SECURE CONTROL PANEL */}
        {activeTab === "dashboard" && (
          <div>
            {!isAdmin ? (
              <div className="max-w-md mx-auto bg-card border border-[var(--border)] p-8 rounded-xl shadow-md text-center space-y-6">
                <Lock className="w-12 h-12 text-primary mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Admin Shell Encryption Gate</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Provide the system password to access messaging databases and article logs.</p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input
                    type="password"
                    placeholder="Enter password..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--accent)] border border-[var(--border)] rounded-md text-sm text-[var(--text-primary)] focus:outline-none focus:border-primary font-mono text-center"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/95 transition-all cursor-pointer"
                  >
                    Authenticate Session
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row border border-[var(--border)] bg-card rounded-xl overflow-hidden shadow-2xl relative">
                {/* Control Panel Menu */}
                <div className="w-full lg:w-60 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--accent)]/20 p-4 flex lg:flex-col gap-2 shrink-0">
                  <div className="hidden lg:flex items-center gap-2 px-2 pb-4 border-b border-[var(--border)]/60 mb-2">
                    <Unlock className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-mono text-[var(--text-secondary)] font-bold">SESSION: ADMIN</span>
                  </div>
                  <button
                    onClick={() => setDashboardTab("chat-monitor")}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                      dashboardTab === "chat-monitor"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-[var(--text-secondary)] hover:bg-[var(--accent)] border border-transparent"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat Monitor
                  </button>
                  <button
                    onClick={() => setDashboardTab("manage-blog")}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                      dashboardTab === "manage-blog"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-[var(--text-secondary)] hover:bg-[var(--accent)] border border-transparent"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    Manage Blog
                  </button>
                  <button
                    onClick={() => { setIsAdmin(false); setPasswordInput(""); }}
                    className="lg:mt-auto text-left px-3 py-2 rounded-md text-xs font-mono text-red-500 font-bold uppercase hover:bg-red-500/10 transition-all flex items-center gap-2 border border-transparent cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Sub Tab: Chat Monitor Panel */}
                {dashboardTab === "chat-monitor" && (
                  <div className="flex-1 flex flex-col md:flex-row h-[550px] overflow-hidden">
                    {/* Chat Sessions list */}
                    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col shrink-0">
                      <div className="p-3 border-b border-[var(--border)] bg-[var(--accent)]/10">
                        <input
                          type="text"
                          placeholder="Search sessions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-3 py-1.5 bg-[var(--accent)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none"
                        />
                      </div>
                      <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]/40">
                        {loadingSessions ? (
                          <div className="p-4 text-center font-mono text-xs text-[var(--text-secondary)] flex items-center justify-center gap-1">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" /> Loading logs...
                          </div>
                        ) : (
                          sessions
                            .filter(s => s.userName.toLowerCase().includes(searchQuery.toLowerCase()) || s.sessionId.includes(searchQuery))
                            .map((s) => (
                              <div
                                key={s.sessionId}
                                onClick={() => { setSelectedSessionId(s.sessionId); setAiProfile(null); }}
                                className={`p-3 cursor-pointer transition-all flex flex-col gap-1 text-left ${
                                  selectedSessionId === s.sessionId ? "bg-primary/5" : "hover:bg-[var(--accent)]/30"
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-[var(--text-primary)] truncate max-w-[120px]">{s.userName}</span>
                                  <span className={`w-2 h-2 rounded-full ${s.online ? "bg-emerald-500" : "bg-zinc-400"}`} />
                                </div>
                                <span className="text-[10px] text-[var(--text-secondary)] font-mono truncate">{s.sessionId}</span>
                                <span className="text-[10px] text-[var(--text-secondary)] font-mono truncate">
                                  {s.messages[s.messages.length - 1]?.content || "No messages yet"}
                                </span>
                              </div>
                            ))
                        )}
                      </div>
                    </div>

                    {/* Chat Content Panel */}
                    <div className="flex-1 flex flex-col bg-card">
                      {selectedSessionId && currentChatSession ? (
                        <>
                          {/* Chat Messages */}
                          <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {currentChatSession.messages.map((m) => (
                              <div
                                key={m.id}
                                className={`flex flex-col max-w-[80%] ${
                                  m.sender === "admin" ? "ml-auto items-end" : "mr-auto items-start"
                                }`}
                              >
                                <div className={`p-3 rounded-lg text-xs font-sans leading-relaxed ${
                                  m.sender === "admin"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-[var(--accent)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-none"
                                }`}>
                                  {m.content}
                                </div>
                                <span className="text-[9px] text-[var(--text-secondary)] font-mono mt-1">
                                  {m.sender === "admin" ? "System Operator" : currentChatSession.userName} // {new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>
                            ))}
                            <div ref={messagesEndRef} />
                          </div>

                          {/* Reply input */}
                          <form onSubmit={handleSendReply} className="p-3 border-t border-[var(--border)] flex gap-2">
                            <input
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Type telemetry message reply..."
                              className="flex-1 px-3 py-2 bg-[var(--accent)] border border-[var(--border)] rounded-md text-xs text-[var(--text-primary)] focus:outline-none focus:border-primary font-sans"
                            />
                            <button
                              type="submit"
                              disabled={sendingReply}
                              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs font-mono font-bold hover:bg-primary/95 transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              {sendingReply ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                              Transmit
                            </button>
                          </form>
                        </>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[var(--text-secondary)]">
                          <MessageSquare className="w-12 h-12 text-[var(--border)] mb-3" />
                          <span className="text-xs font-mono uppercase tracking-wider font-bold block">[ CHAT_MONITOR_IDLE ]</span>
                          <span className="text-[10px] mt-1 font-mono">Select a session payload from the sidebar to inspect logs.</span>
                        </div>
                      )}
                    </div>

                    {/* AI User Profiler Sidebar */}
                    <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-[var(--border)] bg-[var(--accent)]/10 p-4 flex flex-col justify-between">
                      {selectedSessionId ? (
                        <div className="space-y-4 text-left">
                          <div className="flex items-center gap-2 border-b border-[var(--border)]/60 pb-3">
                            <Cpu className="w-4.5 h-4.5 text-primary" />
                            <span className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider">AI User Profiler</span>
                          </div>

                          {aiProfile ? (
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase">Estimated Intent:</span>
                                <p className="text-xs font-bold text-[var(--text-primary)] bg-card border border-[var(--border)] p-2 rounded">{aiProfile.userIntent}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase">Matched Stack:</span>
                                <p className="text-xs font-mono text-primary bg-card border border-[var(--border)] p-2 rounded truncate">{aiProfile.coreStack}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase">System Action Items:</span>
                                <ul className="list-disc pl-4 space-y-1 text-[10px] text-[var(--text-secondary)] font-mono">
                                  {aiProfile.actionPlan.map((action, idx) => (
                                    <li key={idx}>{action}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-1.5 border-t border-[var(--border)]/40 pt-3">
                                <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase">Suggested Reply:</span>
                                <div className="text-[11px] text-[var(--text-primary)] bg-primary/5 border border-primary/20 p-2.5 rounded-lg font-sans leading-relaxed italic">
                                  "{aiProfile.suggestedNextReply}"
                                </div>
                                <button
                                  onClick={() => setReplyText(aiProfile.suggestedNextReply)}
                                  className="w-full py-1 text-[9px] font-mono bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-primary border border-primary/20 rounded font-bold cursor-pointer transition-all"
                                >
                                  Apply Telemetry Reply
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-mono">Click below to query AI summary nodes for session intent parsing and stack profiling.</p>
                              <button
                                onClick={handleGenerateAIProfile}
                                disabled={loadingProfile}
                                className="w-full py-2 bg-primary text-primary-foreground text-xs font-mono font-bold rounded-md hover:bg-primary/95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                {loadingProfile ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Querying Node...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Generate AI Profile
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-[var(--text-secondary)]">
                          <Cpu className="w-10 h-10 text-[var(--border)] mb-2" />
                          <span className="text-[10px] font-mono uppercase font-bold tracking-wider">[ AI_PROFILER_WAIT ]</span>
                        </div>
                      )}

                      <div className="border-t border-[var(--border)]/60 pt-3 mt-4 text-[9px] font-mono text-[var(--text-secondary)] text-center">
                        AI MODEL: GEMINI_FLASH_AUTO
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub Tab: Manage Blog */}
                {dashboardTab === "manage-blog" && (
                  <div className="flex-1 flex flex-col md:flex-row h-[550px] overflow-hidden">
                    {/* Blog Articles list on left */}
                    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col shrink-0">
                      <div className="p-3 border-b border-[var(--border)] bg-[var(--accent)]/10 font-mono text-xs font-bold text-[var(--text-secondary)]">
                        EXISTING ARTICLES ({articles.length})
                      </div>
                      <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]/40">
                        {articles.map((art) => (
                          <div
                            key={art.id}
                            className="p-3 hover:bg-[var(--accent)]/30 transition-all flex flex-col gap-1 text-left"
                          >
                            <span className="font-bold text-[var(--text-primary)] truncate">{art.title}</span>
                            <div className="flex justify-between items-center text-[10px] text-[var(--text-secondary)] font-mono">
                              <span>{art.date}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                art.status === "published" ? "bg-emerald-500/10 text-emerald-500" : "bg-yellow-500/10 text-yellow-500"
                              }`}>
                                {art.status?.toUpperCase() || "PUBLISHED"}
                              </span>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleEditClick(art)}
                                className="px-2 py-1 bg-[var(--accent)] border border-[var(--border)] hover:border-primary/50 text-[10px] text-primary rounded flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id)}
                                className="px-2 py-1 bg-[var(--accent)] border border-[var(--border)] hover:border-red-500/50 text-[10px] text-red-500 rounded flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" /> Purge
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Blog Editor Form on right */}
                    <div className="flex-1 flex flex-col bg-card p-4 overflow-y-auto">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-4">
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
                          {editId ? "Edit Article Node" : "Publish New Publication"}
                        </span>
                        {editId && (
                          <button
                            onClick={() => {
                              setEditId(null);
                              setTitle("");
                              setExcerpt("");
                              setContent("");
                              setTags("");
                              setStatus("published");
                            }}
                            className="px-2 py-1 border border-zinc-400 text-xs rounded hover:bg-[var(--accent)] cursor-pointer"
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>

                      <form onSubmit={handleSaveArticle} className="space-y-4 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Article Title</label>
                            <input
                              type="text"
                              required
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="e.g. Architecting Docker Pipelines"
                              className="w-full px-3 py-2 bg-[var(--accent)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:border-primary font-sans"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Tags (comma-separated)</label>
                            <input
                              type="text"
                              value={tags}
                              onChange={(e) => setTags(e.target.value)}
                              placeholder="Docker, Security, NodeJS"
                              className="w-full px-3 py-2 bg-[var(--accent)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:border-primary font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Excerpt Summary</label>
                          <input
                            type="text"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="Brief 1-sentence teaser summary..."
                            className="w-full px-3 py-2 bg-[var(--accent)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:border-primary font-sans"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Content Markdown</label>
                          <textarea
                            required
                            rows={8}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write article details using Markdown (use ### for headings)..."
                            className="w-full px-3 py-2 bg-[var(--accent)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:border-primary font-sans leading-relaxed"
                          />
                        </div>

                        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                          <div className="flex items-center gap-3">
                            <label className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Status:</label>
                            <select
                              value={status}
                              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                              className="px-2 py-1 bg-[var(--accent)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)]"
                            >
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-primary text-primary-foreground font-mono font-bold text-xs rounded hover:bg-primary/95 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            {editId ? "Save Changes" : "Commit Node"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
