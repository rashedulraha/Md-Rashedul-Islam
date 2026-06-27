"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Send, 
  LogOut, 
  Sparkles, 
  Circle, 
  Search, 
  MessageSquare, 
  User, 
  Loader2, 
  ShieldCheck, 
  Clock, 
  Terminal, 
  Play,
  Save,
  Check,
  Plus,
  Trash2,
  Database,
  Cpu,
  Layers,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

interface PipelineLog {
  timestamp: string;
  level: "INFO" | "SUCCESS" | "WARN" | "PIPELINE";
  message: string;
}

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

interface AdminDashboardInlineProps {
  onLogout: () => void;
}

export default function AdminDashboardInline({ onLogout }: AdminDashboardInlineProps) {
  const [activeTab, setActiveTab] = useState<"pipeline" | "blog" | "chat">("chat");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sendingReply, setSendingReply] = useState(false);
  
  // AI Telemetry Profile State
  const [aiProfile, setAiProfile] = useState<AIProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Module 01: System Pipeline Control States
  const [pipelineLogs, setPipelineLogs] = useState<PipelineLog[]>([
    { timestamp: "16:43:00", level: "INFO", message: "Deployment pipeline supervisor initialized." },
    { timestamp: "16:43:02", level: "SUCCESS", message: "All local compilation caches verified." }
  ]);
  const [isSimulatingDeployment, setIsSimulatingDeployment] = useState(false);
  const [isClearingMemory, setIsClearingMemory] = useState(false);
  const [virtualMemorySize, setVirtualMemorySize] = useState("142 MB");
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Module 02: Blog Management Deck States
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newStatus, setNewStatus] = useState<"draft" | "published">("published");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial chat sessions
  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/chat/messages");
      if (!res.ok) throw new Error("Failed to load sessions");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to fetch messaging sessions.");
    } finally {
      setLoadingSessions(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    const eventSource = new EventSource("/api/chat/sse?sessionId=admin");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "message") {
          const { sessionId, message } = data;
          
          setSessions((prevSessions) => {
            const index = prevSessions.findIndex((s) => s.sessionId === sessionId);
            if (index !== -1) {
              const updated = [...prevSessions];
              updated[index] = {
                ...updated[index],
                messages: [...updated[index].messages, message],
                lastActive: message.timestamp,
              };
              return updated.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
            } else {
              fetchSessions();
              return prevSessions;
            }
          });

          if (message.sender === "user") {
            toast.info(`New stream packet from ${sessionId.substring(0, 6)}...`);
          }
        } else if (data.type === "status_change") {
          const { sessionId, online } = data;
          setSessions((prev) => 
            prev.map((s) => s.sessionId === sessionId ? { ...s, online } : s)
          );
        } else if (data.type === "session_created") {
          const { session } = data;
          setSessions((prev) => [session, ...prev]);
          toast.success("Visitor Uplink Port active!");
        }
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Sync selected session details
  useEffect(() => {
    if (selectedSessionId) {
      const active = sessions.find((s) => s.sessionId === selectedSessionId);
      if (active) {
        setSelectedSession(active);
      }
    } else {
      setSelectedSession(null);
      setAiProfile(null);
    }
  }, [selectedSessionId, sessions]);

  // Load articles from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("site_blog_articles");
    if (stored) {
      try {
        setArticles(JSON.parse(stored));
      } catch (e) {
        console.error("Parse error on blog load", e);
      }
    }
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedSession?.messages]);

  // Scroll to bottom of pipeline logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pipelineLogs]);

  // Module 01: Toggle simulated deployment logs
  const handleToggleDeploymentLogs = () => {
    if (isSimulatingDeployment) {
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      setIsSimulatingDeployment(false);
      setPipelineLogs(prev => [
        ...prev,
        { timestamp: new Date().toTimeString().split(" ")[0], level: "INFO", message: "Deployment monitor simulation suspended." }
      ]);
    } else {
      setIsSimulatingDeployment(true);
      setPipelineLogs(prev => [
        ...prev,
        { timestamp: new Date().toTimeString().split(" ")[0], level: "PIPELINE", message: "Triggering production build deployment pipeline..." }
      ]);

      const steps = [
        "Resolving environment lock variables...",
        "Compiling production TypeScript targets...",
        "Static code optimization analysis passed.",
        "Hardening Docker layers for multi-stage export...",
        "Uploading builds: [====================] 100% complete",
        "Nginx load-balancer endpoints synced.",
        "Uplink verification successful. Service is live on production VPS."
      ];
      
      let stepIndex = 0;
      logIntervalRef.current = setInterval(() => {
        if (stepIndex < steps.length) {
          setPipelineLogs(prev => [
            ...prev,
            {
              timestamp: new Date().toTimeString().split(" ")[0],
              level: stepIndex === steps.length - 1 ? "SUCCESS" : "PIPELINE",
              message: steps[stepIndex]
            }
          ]);
          stepIndex++;
        } else {
          if (logIntervalRef.current) clearInterval(logIntervalRef.current);
          setIsSimulatingDeployment(false);
        }
      }, 1500);
    }
  };

  // Module 01: Clear server virtual memory cache simulation
  const handleClearVirtualMemoryCache = () => {
    setIsClearingMemory(true);
    setPipelineLogs(prev => [
      ...prev,
      { timestamp: new Date().toTimeString().split(" ")[0], level: "INFO", message: "Initiating virtual memory page-cache purge..." }
    ]);

    setTimeout(() => {
      setVirtualMemorySize("12.4 MB");
      setIsClearingMemory(false);
      setPipelineLogs(prev => [
        ...prev,
        { timestamp: new Date().toTimeString().split(" ")[0], level: "SUCCESS", message: "Virtual memory cache purged. Reclaimed 129.6 MB of inactive memory tables." }
      ]);
      toast.success("Cache database cleaned successfully!");
    }, 1500);
  };

  // Module 02: Blog management deck actions
  const saveArticlesToDisk = (updatedList: Article[]) => {
    localStorage.setItem("site_blog_articles", JSON.stringify(updatedList));
    setArticles(updatedList);
    // Dispatch events so components on the page update instantly
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("blog-updated"));
  };

  const handleCreateOrUpdateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    const tagsArray = newTags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const calculatedReadTime = `${Math.max(1, Math.ceil(newContent.split(/\s+/).length / 200))} min read`;

    if (editingArticleId) {
      // Edit mode
      const updated = articles.map(art => {
        if (art.id === editingArticleId) {
          return {
            ...art,
            title: newTitle,
            excerpt: newExcerpt,
            content: newContent,
            tags: tagsArray,
            status: newStatus,
            readTime: calculatedReadTime,
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
          };
        }
        return art;
      });
      saveArticlesToDisk(updated);
      toast.success("Article details updated!");
      setEditingArticleId(null);
    } else {
      // Create mode
      const id = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const exists = articles.some(art => art.id === id);
      if (exists) {
        toast.error("Article with a matching slug/title already exists.");
        return;
      }

      const newArt: Article = {
        id,
        title: newTitle,
        excerpt: newExcerpt,
        content: newContent,
        readTime: calculatedReadTime,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        tags: tagsArray,
        status: newStatus
      };

      saveArticlesToDisk([newArt, ...articles]);
      toast.success("Article successfully aggregated to stream!");
    }

    // Reset inputs
    setNewTitle("");
    setNewExcerpt("");
    setNewContent("");
    setNewTags("");
    setNewStatus("published");
  };

  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setNewTitle(art.title);
    setNewExcerpt(art.excerpt || "");
    setNewContent(art.content || "");
    setNewTags(art.tags.join(", "));
    setNewStatus(art.status || "published");
  };

  const handleDeleteArticle = (id: string) => {
    const confirm = window.confirm("Are you sure you want to remove this article from the stream?");
    if (confirm) {
      const updated = articles.filter(art => art.id !== id);
      saveArticlesToDisk(updated);
      toast.success("Article deleted.");
      if (editingArticleId === id) {
        setEditingArticleId(null);
        setNewTitle("");
        setNewExcerpt("");
        setNewContent("");
        setNewTags("");
        setNewStatus("published");
      }
    }
  };

  // Module 03: Process AI-Driven Telemetry
  const handleGenerateProfile = async () => {
    if (!selectedSessionId || loadingProfile) return;

    setLoadingProfile(true);
    setAiProfile(null);

    try {
      const res = await fetch(`/api/admin/user-summary?sessionId=${selectedSessionId}`);
      if (!res.ok) throw new Error("Failed to generate profile");
      const data = await res.json();
      
      const summary = data.summary;
      
      // Analyze core tech stacks mentioned in messages
      const fullText = selectedSession?.messages.map(m => m.content).join(" ").toLowerCase() || "";
      const stacks = [];
      if (fullText.includes("next")) stacks.push("Next.js");
      if (fullText.includes("docker") || fullText.includes("container")) stacks.push("Docker");
      if (fullText.includes("nginx")) stacks.push("Nginx");
      if (fullText.includes("postgres") || fullText.includes("sql")) stacks.push("PostgreSQL");
      if (fullText.includes("mongo")) stacks.push("MongoDB");
      if (fullText.includes("ts") || fullText.includes("typescript")) stacks.push("TypeScript");
      if (stacks.length === 0) stacks.push("MERN Stack Core");

      setAiProfile({
        userIntent: summary.userIntent || summary.visitorIntent || "Production Architect Inquiries",
        coreStack: stacks.join(", "),
        actionPlan: Array.isArray(summary.actionPlan) 
          ? summary.actionPlan 
          : ["Recommend immediate infrastructure timeline review", "Deliver complete CI/CD Docker orchestration schema"],
        suggestedNextReply: summary.suggestedNextReply || "I have analyzed the infrastructure telemetry logs. I can configure this VPS server in 12 hours."
      });
    } catch (err) {
      // Fallback telemetry if AI API endpoint isn't fully set up
      setAiProfile({
        userIntent: "Recruitment / Project Technical Assessment",
        coreStack: "Docker, Nginx, Next.js",
        actionPlan: [
          "Validate production pipeline milestone configurations",
          "Provide code repository links for assessment verification"
        ],
        suggestedNextReply: "Thanks for checking out my portfolio pipeline. Let's schedule a session to verify production scalability."
      });
      toast.info("Generated local fallback telemetry metrics.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleSelectSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setAiProfile(null);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSessionId || sendingReply) return;

    setSendingReply(true);
    const content = replyText;
    setReplyText("");

    try {
      const response = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          content,
          sender: "admin",
        }),
      });

      if (!response.ok) throw new Error("Failed to send reply");
    } catch (err) {
      toast.error("Failed to transmit reply packet.");
      setReplyText(content);
    } finally {
      setSendingReply(false);
    }
  };

  const filteredSessions = sessions.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.userName.toLowerCase().includes(q) ||
      s.sessionId.toLowerCase().includes(q) ||
      s.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col md:flex-row h-[680px] border border-border bg-card font-mono text-xs text-card-foreground overflow-hidden shadow-2xl relative z-10 select-text">
      
      {/* LEFT PANEL: NAVIGATION & TABS */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border flex flex-col shrink-0 bg-muted/20">
        
        {/* Panel Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-card text-foreground border border-border">
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-[10px] uppercase tracking-wider text-foreground">Console Uplink</h1>
              <p className="text-[8px] text-muted-foreground">MD_RASHEDUL_ISLAM</p>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors cursor-pointer"
            title="Terminate Session"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Tab Selection buttons */}
        <div className="p-2 border-b border-border flex gap-1 bg-muted/30 text-[9px]">
          <button 
            onClick={() => setActiveTab("chat")}
            className={cn(
              "flex-1 py-1.5 text-center font-bold uppercase transition-all border cursor-pointer",
              activeTab === "chat" 
                ? "bg-card border-border text-foreground" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Messaging
          </button>
          <button 
            onClick={() => setActiveTab("blog")}
            className={cn(
              "flex-1 py-1.5 text-center font-bold uppercase transition-all border cursor-pointer",
              activeTab === "blog" 
                ? "bg-card border-border text-foreground" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Blog Deck
          </button>
          <button 
            onClick={() => setActiveTab("pipeline")}
            className={cn(
              "flex-1 py-1.5 text-center font-bold uppercase transition-all border cursor-pointer",
              activeTab === "pipeline" 
                ? "bg-card border-border text-foreground" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Pipeline Control
          </button>
        </div>

        {/* Search bar */}
        {activeTab === "chat" && (
          <div className="p-2 border-b border-border">
            <div className="relative flex items-center bg-card px-2 py-1.5 border border-border">
              <Search className="h-3 w-3 text-muted-foreground mr-2 shrink-0" />
              <input
                placeholder="Search visitor logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[10px] text-foreground placeholder-muted-foreground w-full focus:ring-0 font-mono"
              />
            </div>
          </div>
        )}

        {/* Dynamic Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "chat" && (
            <div className="p-1.5 space-y-1">
              {loadingSessions ? (
                <div className="flex flex-col items-center justify-center py-8 gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <p className="text-[8px] text-muted-foreground uppercase">SYNC_CHANNELS...</p>
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground text-[10px] uppercase">
                  <MessageSquare className="h-5 w-5 mb-2 stroke-[1.2]" />
                  <span>No message pipelines</span>
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const unreadCount = session.messages.filter((m) => m.sender === "user" && !m.read).length;
                  const lastMsg = session.messages[session.messages.length - 1];
                  const isSelected = selectedSessionId === session.sessionId;

                  return (
                    <button
                      key={session.sessionId}
                      onClick={() => handleSelectSession(session.sessionId)}
                      className={cn(
                        "w-full text-left p-2.5 transition-all flex flex-col gap-1 border outline-none cursor-pointer",
                        isSelected 
                          ? "bg-card border-border text-foreground shadow-xs" 
                          : "border-transparent hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[11px] truncate max-w-[100px] text-foreground">
                            {session.userName === "Anonymous Visitor" ? `VISITOR_${session.sessionId.substring(0, 4)}` : session.userName}
                          </span>
                          <Circle className={cn(
                            "h-1.5 w-1.5 fill-current",
                            session.online ? "text-emerald-500" : "text-muted-foreground/40"
                          )} />
                        </div>
                        <span className="text-[8px] text-muted-foreground">
                          {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "NEW"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-1.5">
                        <p className="text-[10px] truncate max-w-[155px] text-muted-foreground font-sans">
                          {lastMsg ? lastMsg.content : "Secure stream opened..."}
                        </p>
                        {unreadCount > 0 && (
                          <span className="bg-primary text-primary-foreground font-bold text-[8px] px-1.5 py-0.5 rounded-full shrink-0">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}

          {activeTab === "pipeline" && (
            <div className="p-3 space-y-4">
              <div className="bg-card border border-border p-3 space-y-2">
                <span className="text-[8px] font-bold text-muted-foreground block uppercase">TELEMETRY_STATS</span>
                <div className="space-y-1.5 text-[10px] text-foreground/80">
                  <div className="flex justify-between">
                    <span>Virtual Memory:</span>
                    <span className="font-bold text-foreground">{virtualMemorySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pipeline Status:</span>
                    <span className={cn("font-bold", isSimulatingDeployment ? "text-primary animate-pulse" : "text-emerald-500")}>
                      {isSimulatingDeployment ? "PROCESSING" : "IDLE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="p-3 space-y-4">
              <div className="bg-card border border-border p-3 space-y-2">
                <span className="text-[8px] font-bold text-muted-foreground block uppercase">STREAM SUMMARY</span>
                <div className="space-y-1 text-[10px] text-foreground/80">
                  <div className="flex justify-between">
                    <span>Published Articles:</span>
                    <span className="font-bold">{articles.filter(a => a.status === "published").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Draft Modules:</span>
                    <span className="font-bold">{articles.filter(a => a.status === "draft").length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CENTER PANEL: INTERACTIVE CONTENT ZONE */}
      <div className="flex-1 flex flex-col bg-card border-r border-border min-w-0">
        
        {/* Module 03: Real-Time Active Messaging Monitor */}
        {activeTab === "chat" && (
          selectedSession ? (
            <>
              {/* Active Chat Header */}
              <div className="p-3 border-b border-border flex items-center justify-between bg-muted/20">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-muted border border-border flex items-center justify-center text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[11px] uppercase tracking-wider text-foreground">
                      {selectedSession.userName === "Anonymous Visitor" ? `VISITOR_PORT_${selectedSession.sessionId.substring(0, 4)}` : selectedSession.userName}
                    </h2>
                    <div className="flex items-center gap-1.5 text-[9px] mt-0.5 text-muted-foreground">
                      <span className={cn("font-bold", selectedSession.online ? "text-emerald-500" : "text-muted-foreground")}>
                        {selectedSession.online ? "CONNECTED" : "DISCONNECTED"}
                      </span>
                      <span>&bull;</span>
                      <span>ID: {selectedSession.sessionId.substring(0, 12)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Logs Screen */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/5">
                {selectedSession.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-[10px] uppercase">
                    <MessageSquare className="h-7 w-7 mb-2 stroke-[1.2]" />
                    <span>No logs recorded</span>
                  </div>
                ) : (
                  selectedSession.messages.map((message) => {
                    const isAdmin = message.sender === "admin";
                    const isBot = message.sender === "bot";
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex w-full flex-col gap-0.5",
                          isAdmin ? "items-end" : "items-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] px-3.5 py-2 text-xs",
                            isAdmin 
                              ? "bg-primary text-primary-foreground font-sans rounded-none" 
                              : isBot
                                ? "bg-muted text-muted-foreground italic rounded-none border border-border"
                                : "bg-card text-foreground rounded-none border border-border font-sans"
                          )}
                        >
                          {message.content}
                        </div>
                        <span className="text-[8px] text-muted-foreground px-1 font-bold">
                          {isBot ? "AI_ASSIST • " : ""}{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-border bg-muted/10">
                <form onSubmit={handleSendReply} className="flex gap-2 items-center">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Enter reply parameters to client stream..."
                    className="bg-card border border-border text-[10px] text-foreground placeholder-muted-foreground h-9 px-3 w-full outline-none focus:border-primary font-mono"
                  />
                  <button 
                    type="submit" 
                    disabled={!replyText.trim() || sendingReply}
                    className="h-9 w-9 shrink-0 bg-primary text-primary-foreground flex items-center justify-center cursor-pointer transition-colors disabled:opacity-40"
                  >
                    {sendingReply ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground select-none p-4 text-center">
              <MessageSquare className="h-8 w-8 mb-3 text-muted-foreground/60 stroke-[1.2]" />
              <h2 className="text-[10px] font-bold text-foreground uppercase tracking-widest">No Active Telemetry channels</h2>
              <p className="text-[9px] mt-1 max-w-[200px] text-muted-foreground uppercase tracking-wider leading-relaxed">
                Select an active visitor session port in the sidebar to stream logs.
              </p>
            </div>
          )
        )}

        {/* Module 01: System Pipeline Control */}
        {activeTab === "pipeline" && (
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-card">
            
            {/* Header */}
            <div className="p-3 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <h2 className="font-bold text-[10px] uppercase tracking-wider text-foreground">
                  System Pipeline Controller
                </h2>
              </div>
            </div>

            {/* Toggle dashboard */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-border bg-muted/10">
              {/* Simulated build system */}
              <div className="bg-card border border-border p-4 flex flex-col justify-between space-y-3 shadow-xs">
                <div>
                  <h3 className="font-bold text-xs text-foreground uppercase flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    Deployment Output
                  </h3>
                  <p className="text-[9px] text-muted-foreground mt-1 leading-normal">
                    Toggle deployment stream to simulate build operations and Nginx syncing.
                  </p>
                </div>
                <button
                  onClick={handleToggleDeploymentLogs}
                  className={cn(
                    "w-full py-2 border font-bold uppercase transition-all text-[9px] cursor-pointer flex items-center justify-center gap-1.5",
                    isSimulatingDeployment
                      ? "bg-destructive text-destructive-foreground border-destructive"
                      : "bg-muted hover:bg-muted/80 text-foreground border-border"
                  )}
                >
                  {isSimulatingDeployment ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Suspend Deployment
                    </>
                  ) : (
                    <>
                      <Play className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500" />
                      Simulate Deployment
                    </>
                  )}
                </button>
              </div>

              {/* Memory purge */}
              <div className="bg-card border border-border p-4 flex flex-col justify-between space-y-3 shadow-xs">
                <div>
                  <h3 className="font-bold text-xs text-foreground uppercase flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-primary" />
                    Virtual Memory Cache
                  </h3>
                  <p className="text-[9px] text-muted-foreground mt-1 leading-normal">
                    Purge stale cache systems to retrieve system inactive memory indexes.
                  </p>
                </div>
                <button
                  onClick={handleClearVirtualMemoryCache}
                  disabled={isClearingMemory}
                  className="w-full bg-muted hover:bg-muted/80 text-foreground border border-border py-2 font-bold uppercase transition-all text-[9px] cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-40"
                >
                  {isClearingMemory ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Purging Database cache...
                    </>
                  ) : (
                    <>
                      <Cpu className="w-3 h-3 text-primary" />
                      Purge Memory Cache
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Logging window */}
            <div className="flex-1 p-4 bg-muted/10 font-mono text-[10px] overflow-y-auto space-y-1 select-text">
              <div className="text-muted-foreground select-none pb-2 border-b border-border/60 mb-3 uppercase tracking-wider text-[8px] font-bold">
                Uplink monitor live diagnostics log stream
              </div>
              {pipelineLogs.map((log, idx) => {
                let lvlColor = "text-primary";
                if (log.level === "SUCCESS") lvlColor = "text-emerald-500";
                if (log.level === "WARN") lvlColor = "text-amber-500";
                if (log.level === "PIPELINE") lvlColor = "text-indigo-400";
                
                return (
                  <div key={idx} className="flex gap-3 items-start py-0.5 border-b border-border/10">
                    <span className="text-muted-foreground select-none">[{log.timestamp}]</span>
                    <span className={cn("font-bold uppercase shrink-0 min-w-[55px]", lvlColor)}>
                      {log.level}
                    </span>
                    <span className="text-foreground/90 font-mono">{log.message}</span>
                  </div>
                );
              })}
              <div ref={logEndRef} />
            </div>
          </div>
        )}

        {/* Module 02: Blog Management Deck */}
        {activeTab === "blog" && (
          <div className="flex-1 flex flex-col h-full bg-card overflow-hidden">
            <div className="p-3 border-b border-border bg-muted/20 flex items-center justify-between">
              <span className="font-bold text-[10px] text-foreground uppercase tracking-wider">
                {editingArticleId ? "Modify Existing Article" : "Create New Stream Article"}
              </span>
              {editingArticleId && (
                <button
                  onClick={() => {
                    setEditingArticleId(null);
                    setNewTitle("");
                    setNewExcerpt("");
                    setNewContent("");
                    setNewTags("");
                    setNewStatus("published");
                  }}
                  className="text-[9px] text-muted-foreground hover:text-foreground underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <form onSubmit={handleCreateOrUpdateArticle} className="space-y-3 text-[10px]">
                <div className="space-y-1">
                  <label className="text-muted-foreground font-bold uppercase text-[8px] block">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-card border border-border text-[10px] text-foreground h-8 px-2.5 outline-none focus:border-primary font-mono"
                    placeholder="Article title copy..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground font-bold uppercase text-[8px] block">Excerpt / Summary</label>
                  <input
                    type="text"
                    required
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    className="w-full bg-card border border-border text-[10px] text-foreground h-8 px-2.5 outline-none focus:border-primary font-mono"
                    placeholder="Brief description preview..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground font-bold uppercase text-[8px] block">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full bg-card border border-border text-[10px] text-foreground h-8 px-2.5 outline-none focus:border-primary font-mono"
                    placeholder="Docker, Security, Next.js"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-muted-foreground font-bold uppercase text-[8px] block">Publish Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as "draft" | "published")}
                      className="w-full bg-card border border-border text-[10px] text-foreground h-8 px-2 outline-none focus:border-primary font-mono"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground font-bold uppercase text-[8px] block">Content (Markdown format)</label>
                  <textarea
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={6}
                    className="w-full bg-card border border-border text-[10px] text-foreground p-2.5 outline-none focus:border-primary font-mono resize-y min-h-[120px]"
                    placeholder="### Heading 3&#10;&#10;Content paragraph copy here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-2 font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 transition-colors text-[9px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{editingArticleId ? "Apply Modifications" : "Aggregate to Home Feed"}</span>
                </button>
              </form>

              {/* Management List */}
              <div className="space-y-2 pt-4 border-t border-border/80">
                <span className="font-bold text-[8px] text-muted-foreground uppercase tracking-widest block">Existing Articles Deck</span>
                
                {articles.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground italic text-center py-4">No articles saved.</p>
                ) : (
                  <div className="space-y-1.5">
                    {articles.map((art) => (
                      <div key={art.id} className="flex items-center justify-between border border-border bg-muted/10 p-2 text-[10px]">
                        <div className="truncate max-w-[170px] pr-2">
                          <span className="font-bold text-foreground truncate block">{art.title}</span>
                          <span className="text-[8px] text-muted-foreground font-mono uppercase tracking-wider block mt-0.5">
                            Status: {art.status || "published"}
                          </span>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={() => handleEditArticle(art)}
                            className="px-2 py-1 bg-muted hover:bg-muted-foreground/20 text-foreground border border-border transition-colors font-bold uppercase tracking-wider text-[8px]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1 bg-destructive text-destructive-foreground border border-transparent hover:bg-destructive/90 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: AI-DRIVEN TELEMETRY PROFILER */}
      <div className="w-full md:w-64 bg-muted/20 flex flex-col shrink-0">
        <div className="p-4 border-b border-border flex items-center gap-2 bg-muted/40">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-foreground">AI Telemetry</h3>
        </div>

        {selectedSessionId && activeTab === "chat" ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest">Inference engine</p>
              <button 
                onClick={handleGenerateProfile}
                disabled={loadingProfile}
                className="w-full bg-card hover:bg-muted border border-border text-[10px] text-foreground font-bold py-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-40"
              >
                {loadingProfile ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    Extracting metrics...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Extract Telemetry
                  </>
                )}
              </button>
            </div>

            {aiProfile ? (
              <div className="space-y-4 border border-border p-3 bg-card text-[10px] leading-relaxed shadow-xs">
                
                {/* User Intent */}
                <div className="space-y-1">
                  <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider block">User Intent</span>
                  <p className="text-foreground text-xs font-bold font-sans">
                    {aiProfile.userIntent}
                  </p>
                </div>

                <div className="h-[1px] bg-border/60" />

                {/* Core Stack Mentioned */}
                <div className="space-y-1">
                  <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider block">Core Stack Mentioned</span>
                  <p className="text-foreground text-xs font-bold font-sans">
                    {aiProfile.coreStack}
                  </p>
                </div>

                <div className="h-[1px] bg-border/60" />

                {/* Action Plan */}
                <div className="space-y-1.5">
                  <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider block">Action Recommendations</span>
                  <div className="space-y-1 text-muted-foreground font-sans">
                    {aiProfile.actionPlan.map((step, idx) => (
                      <div key={idx} className="flex gap-1.5 items-start">
                        <span className="text-primary font-bold shrink-0 font-mono">{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-border/60" />

                {/* Suggested Reply */}
                <div className="space-y-1.5 bg-muted/50 border border-border p-2 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider">Suggested Reply</span>
                    <span className="text-[7px] text-primary font-bold uppercase">AI_DRAFT</span>
                  </div>
                  <p className="text-foreground/90 leading-relaxed font-sans italic">
                    "{aiProfile.suggestedNextReply}"
                  </p>
                </div>
              </div>
            ) : !loadingProfile && (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border border-dashed border-border p-4 text-center">
                <Sparkles className="h-5 w-5 mb-2 stroke-[1.2] text-muted-foreground/60" />
                <p className="text-[9px] font-bold uppercase tracking-wider">
                  Awaiting telemetry request
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground select-none p-4 text-center">
            <Clock className="h-5 w-5 mb-2 stroke-[1.2] text-muted-foreground/60" />
            <p className="text-[9px] uppercase tracking-wider leading-relaxed">
              {activeTab === "pipeline" 
                ? "Simulated log streams running" 
                : activeTab === "blog" 
                  ? "Blog management deck loaded" 
                  : "Select messaging log session to analyze telemetry"
              }
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
