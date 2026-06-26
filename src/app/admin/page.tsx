"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Send, 
  LogOut, 
  Sparkles, 
  Circle, 
  Search, 
  MessageSquare, 
  User, 
  Loader2, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Clock,
  Trash2,
  FolderOpen,
  Code2,
  ListTodo,
  Terminal,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  technicalDepth: string;
  actionPlan: string[];
  suggestedNextReply: string;
}

interface CleanupLog {
  timestamp: string;
  level: "INFO" | "SCAN" | "PRUNE" | "SUCCESS";
  message: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"chat" | "cleanup">("chat");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sendingReply, setSendingReply] = useState(false);
  
  // AI summary state matching telemetry
  const [aiProfile, setAiProfile] = useState<AIProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Cleanup simulation states
  const [cleanupLogs, setCleanupLogs] = useState<CleanupLog[]>([
    { timestamp: "18:41:48", level: "INFO", message: "System cleanup daemon initialised successfully." },
    { timestamp: "18:41:49", level: "INFO", message: "Awaiting next scheduled trigger (in 12 hours)." }
  ]);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanStats, setCleanStats] = useState({
    staleFolders: { total: 14, pruned: 12 },
    unusedCode: { lines: 4210, blocks: 89 },
    unusedAssets: { files: 28, size: "3.8 MB" },
    bundleReduction: "-18.4%"
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch initial sessions on mount
  useEffect(() => {
    fetchSessions();

    const eventSource = new EventSource("/api/chat/sse?sessionId=admin");
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "connected") {
          return;
        }

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
            try {
              const audio = new Audio("/sounds/notification.mp3");
              audio.play().catch(() => {});
            } catch (e) {}
            toast.info(`New message from ${sessionId.substring(0, 6)}...`);
          }
        } else if (data.type === "status_change") {
          const { sessionId, online } = data;
          setSessions((prev) => 
            prev.map((s) => s.sessionId === sessionId ? { ...s, online } : s)
          );
        } else if (data.type === "session_created") {
          const { session } = data;
          setSessions((prev) => [session, ...prev]);
          toast.success("New chat visitor started a session!");
        } else if (data.type === "messages_read") {
          const { sessionId } = data;
          setSessions((prev) => 
            prev.map((s) => {
              if (s.sessionId === sessionId) {
                return {
                  ...s,
                  messages: s.messages.map((m) => ({ ...m, read: true }))
                };
              }
              return s;
            })
          );
        }
      } catch (err) {
        console.error("Error parsing SSE message:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("[SSE] Connection error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Update selected session details when sessions list or selectedSessionId changes
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

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedSession?.messages]);

  // Scroll to bottom of cleanup logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cleanupLogs]);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/chat/messages");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin/login");
        }
        throw new Error("Failed to load sessions");
      }
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingSessions(false);
    }
  };

  const handleSelectSession = async (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setAiProfile(null);
    try {
      await fetch(`/api/chat/messages?sessionId=${sessionId}`);
    } catch (e) {}
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

      if (!response.ok) {
        throw new Error("Failed to send reply");
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      setReplyText(content);
    } finally {
      setSendingReply(false);
    }
  };

  const handleGenerateProfile = async () => {
    if (!selectedSessionId || loadingProfile) return;

    setLoadingProfile(true);
    setAiProfile(null);

    try {
      const res = await fetch(`/api/admin/user-summary?sessionId=${selectedSessionId}`);
      if (!res.ok) throw new Error("Failed to generate profile");
      const data = await res.json();
      
      const summary = data.summary;
      setAiProfile({
        userIntent: summary.userIntent || summary.visitorIntent || "General Inquiry",
        technicalDepth: summary.technicalDepth || (summary.coreTechMentioned ? `Medium (${summary.coreTechMentioned.join(", ")})` : "General Depth"),
        actionPlan: Array.isArray(summary.actionPlan) 
          ? summary.actionPlan 
          : [summary.suggestedNextReply ? "Respond using the suggested AI draft" : "Schedule a 15-minute call"],
        suggestedNextReply: summary.suggestedNextReply || "Thank you for the message. I would be happy to discuss details."
      });
    } catch (err) {
      toast.error("Failed to generate user telemetry profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      toast.error("Logout failed");
    }
  };

  // Run simulated project cleanup
  const handleTriggerCleanup = () => {
    if (isCleaning) return;
    setIsCleaning(true);
    
    const logs = [
      { level: "INFO" as const, msg: "Initializing system cleaning daemon..." },
      { level: "SCAN" as const, msg: "Scanning workspace root directory for unused code and components..." },
      { level: "SCAN" as const, msg: "Found 12 stale components inside '/src/components/legacy-v1'" },
      { level: "PRUNE" as const, msg: "Pruning unused module: old-card-matrix.tsx (-512 lines)" },
      { level: "PRUNE" as const, msg: "Deleting redundant image asset: /public/koda.png (143KB)" },
      { level: "PRUNE" as const, msg: "Pruning unused style module: AOS animation directives" },
      { level: "SCAN" as const, msg: "Scanning unused dependencies in package.json..." },
      { level: "SUCCESS" as const, msg: "Cleanup complete: Pruned 12 stale folders, 89 dead code blocks." },
      { level: "SUCCESS" as const, msg: "Total space reclaimed: 3.8 MB. Compilation bundle size reduced by 18.4%." }
    ];

    setCleanupLogs(prev => [
      ...prev,
      { timestamp: new Date().toTimeString().split(" ")[0], level: "INFO", message: "Manual cleanup execution triggered by Admin." }
    ]);

    logs.forEach((log, index) => {
      setTimeout(() => {
        setCleanupLogs(prev => [
          ...prev,
          {
            timestamp: new Date().toTimeString().split(" ")[0],
            level: log.level,
            message: log.msg
          }
        ]);
        
        if (index === logs.length - 1) {
          setIsCleaning(false);
          setCleanStats(prev => ({
            ...prev,
            staleFolders: { total: prev.staleFolders.total + 2, pruned: prev.staleFolders.pruned + 2 },
            unusedCode: { lines: prev.unusedCode.lines + 140, blocks: prev.unusedCode.blocks + 3 }
          }));
          toast.success("Workspace cleanup simulation completed!");
        }
      }, (index + 1) * 1000);
    });
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
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden selection:bg-primary/20 selection:text-foreground transition-colors duration-300">
      
      {/* LEFT PANEL: CONVERSATION LIST & NAV */}
      <div className="w-80 border-r border-border flex flex-col h-full bg-background">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-bold text-xs uppercase font-mono leading-none tracking-wider text-foreground">Secure Gateway</h1>
              <p className="text-[10px] text-muted-foreground font-mono mt-1 leading-none uppercase">RESTRICTED_NODE</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout} 
            className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-muted rounded-lg transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Tab Selector */}
        <div className="p-3 border-b border-border flex gap-1.5 bg-card/40 font-mono text-[10px]">
          <button 
            onClick={() => setActiveTab("chat")}
            className={cn(
              "flex-1 py-1.5 rounded-lg font-bold transition-all uppercase cursor-pointer border select-none",
              activeTab === "chat" 
                ? "bg-muted border-primary/20 text-foreground shadow-xs" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Chat Hub
          </button>
          <button 
            onClick={() => setActiveTab("cleanup")}
            className={cn(
              "flex-1 py-1.5 rounded-lg font-bold transition-all uppercase cursor-pointer border select-none",
              activeTab === "cleanup" 
                ? "bg-muted border-primary/20 text-foreground shadow-xs" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Pruning Daemon
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-zinc-500" />
            <Input
              placeholder="Search data logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8.5 bg-muted border-border text-foreground placeholder-zinc-500 text-xs focus-visible:ring-zinc-800"
            />
          </div>
        </div>

        {/* Visitor list or simple daemon metadata */}
        <ScrollArea className="flex-1 bg-card/20">
          <div className="p-2 space-y-1">
            {activeTab === "chat" ? (
              loadingSessions ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2 font-mono">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <p className="text-[10px] text-muted-foreground uppercase">SYNCHRONISING PORT...</p>
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-600 select-none font-mono">
                  <MessageSquare className="h-6 w-6 mb-2 stroke-[1.5]" />
                  <p className="text-[10px] uppercase">No active socket feeds</p>
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
                        "w-full text-left p-3 rounded-xl transition-all duration-200 flex flex-col gap-1 border border-transparent outline-none cursor-pointer",
                        isSelected 
                          ? "bg-card border-border shadow-xs text-foreground" 
                          : "hover:bg-card/50 text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center justify-between w-full font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-foreground">
                            {session.userName === "Anonymous Visitor" ? `PORT_${session.sessionId.substring(0, 4)}` : session.userName}
                          </span>
                          <Circle className={cn(
                            "h-1.5 w-1.5 fill-current",
                            session.online ? "text-[#4ade80] dark:text-emerald-400" : "text-zinc-500"
                          )} />
                        </div>
                        <span className="text-[9px] text-muted-foreground">
                          {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "NEW"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p className="text-[11px] truncate max-w-[170px] leading-relaxed font-sans">
                          {lastMsg ? lastMsg.content : "Secure channel established..."}
                        </p>
                        {unreadCount > 0 && (
                          <Badge className="bg-primary hover:bg-primary text-primary-foreground font-black text-[9px] px-1.5 py-0 rounded-full shrink-0 min-w-4 h-4 flex items-center justify-center">
                            {unreadCount}
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })
              )
            ) : (
              // Pruning Daemon left summary panel
              <div className="p-4 space-y-4 font-mono text-[11px] text-muted-foreground">
                <div className="bg-muted/60 border border-border p-3.5 rounded-xl space-y-2 shadow-inner">
                  <span className="text-[9px] font-bold text-zinc-500 block uppercase tracking-wider">CLEANUP TARGETS</span>
                  <div className="space-y-1.5 text-foreground">
                    <div className="flex justify-between">
                      <span>Stale Folders:</span>
                      <span>{cleanStats.staleFolders.total} found</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dead Code Blocks:</span>
                      <span>{cleanStats.unusedCode.blocks} nodes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orphan Assets:</span>
                      <span>{cleanStats.unusedAssets.files} files</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-3.5 rounded-xl space-y-1">
                  <span className="text-[9px] font-bold text-primary block uppercase tracking-wider">COMPILATION DAEMON</span>
                  <p className="text-foreground text-xs font-bold leading-normal">
                    Bundle compression at {cleanStats.bundleReduction}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Calculated size payload reduction since last deployment scan.
                  </p>
                </div>

                <Button 
                  onClick={handleTriggerCleanup}
                  disabled={isCleaning}
                  className="w-full bg-card border border-border text-foreground hover:bg-muted text-xs font-mono font-bold py-2 rounded-xl transition-all cursor-pointer gap-2 h-9 shadow-xs"
                >
                  {isCleaning ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Pruning Files...
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[#4ade80] dark:text-emerald-400" />
                      Trigger Prune
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* CENTER PANEL: ACTIVE CHAT SCREEN or CLEANUP LOGGER */}
      <div className="flex-1 flex flex-col h-full bg-background border-r border-border">
        {activeTab === "chat" ? (
          selectedSession ? (
            <>
              {/* Session Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-card/45 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground font-semibold text-sm">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="font-mono">
                    <h2 className="font-bold text-xs text-foreground uppercase tracking-wider">
                      {selectedSession.userName === "Anonymous Visitor" ? `VISITOR_PORT_${selectedSession.sessionId.substring(0, 6)}` : selectedSession.userName}
                    </h2>
                    <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
                      <span className={cn(
                        "font-bold",
                        selectedSession.online ? "text-[#4ade80] dark:text-emerald-400" : "text-zinc-500"
                      )}>
                        {selectedSession.online ? "ONLINE" : "OFFLINE"}
                      </span>
                      <span className="text-zinc-700">&bull;</span>
                      <span className="text-muted-foreground">ID: {selectedSession.sessionId.substring(0, 12)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Screen */}
              <ScrollArea className="flex-1 p-4 bg-card/10">
                <div className="space-y-4 max-w-3xl mx-auto py-2">
                  {selectedSession.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-zinc-600 select-none font-mono">
                      <MessageSquare className="h-8 w-8 mb-2 stroke-[1.5]" />
                      <p className="text-[10px] uppercase">No message parameters received</p>
                    </div>
                  ) : (
                    selectedSession.messages.map((message) => {
                      const isAdmin = message.sender === "admin";
                      const isBot = message.sender === "bot";
                      return (
                        <div
                          key={message.id}
                          className={cn(
                            "flex w-full flex-col gap-1",
                            isAdmin ? "items-end" : "items-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[75%] rounded-2xl px-4 py-2.5 text-xs shadow-sm leading-relaxed",
                              isAdmin 
                                ? "bg-foreground text-background font-semibold rounded-tr-none font-sans" 
                                : isBot
                                  ? "bg-muted/60 border border-border text-muted-foreground rounded-tl-none font-medium italic font-mono"
                                  : "bg-card border border-border text-foreground rounded-tl-none font-sans"
                            )}
                          >
                            {message.content}
                          </div>
                          <span className="text-[8px] font-mono text-muted-foreground px-1 font-semibold flex items-center gap-1 uppercase">
                            {isBot && "System_AI • "}
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                          </span>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Bar */}
              <div className="p-4 border-t border-border bg-card/40">
                <form onSubmit={handleSendReply} className="flex gap-2 max-w-3xl mx-auto items-center">
                  <Input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Enter reply parameters to client stream..."
                    className="bg-muted border-border text-xs text-foreground placeholder-zinc-500 h-10 focus-visible:ring-zinc-800"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!replyText.trim() || sendingReply}
                    className="h-10 w-10 shrink-0 bg-foreground hover:bg-foreground/90 text-background rounded-xl transition-all duration-200 shadow-md cursor-pointer"
                  >
                    {sendingReply ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 select-none p-4 font-mono">
              <MessageSquare className="h-10 w-10 mb-3 stroke-[1.2] text-zinc-700" />
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">No feeds connected</h2>
              <p className="text-[10px] mt-1.5 max-w-[200px] text-center text-zinc-600 uppercase tracking-wide">
                Select an active client session port in the sidebar to stream logs.
              </p>
            </div>
          )
        ) : (
          // Infrastructure Cleanup Daemon Logger View
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-card/20">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-card/40 font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="h-4.5 w-4.5 text-primary" />
                <h2 className="font-bold text-xs uppercase text-foreground tracking-wider">
                  Automated Cleanup Logger
                </h2>
              </div>
              <Badge className="bg-muted border border-border text-[#4ade80] dark:text-emerald-400 font-bold text-[9px] px-2 py-0.5 font-mono uppercase tracking-widest">
                DAEMON_ACTIVE
              </Badge>
            </div>

            {/* Logs console (Kept in dark contrast for optimal log reading) */}
            <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-2 select-text bg-[#030303] leading-relaxed">
              <div className="text-zinc-600 select-none pb-2 border-b border-zinc-800/20 mb-4">
                MD_RASHEDUL_ISLAM PORTFOLIO CLEANUP LOGGER v2.4.1
                <br />
                LOGSTREAM SYNCHRONISED. PIPELINES IDLE.
              </div>
              {cleanupLogs.map((log, index) => {
                let lvlColor = "text-[#06b6d4]";
                if (log.level === "PRUNE") lvlColor = "text-red-400";
                if (log.level === "SCAN") lvlColor = "text-amber-400";
                if (log.level === "SUCCESS") lvlColor = "text-[#4ade80]";
                
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <span className="text-zinc-600 select-none font-semibold">[{log.timestamp}]</span>
                    <span className={cn("font-extrabold uppercase shrink-0 min-w-[54px]", lvlColor)}>
                      {log.level}
                    </span>
                    <span className="text-zinc-300">{log.message}</span>
                  </div>
                );
              })}
              <div ref={logEndRef} />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-card/40 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>STALE_FOLDERS: {cleanStats.staleFolders.pruned}/{cleanStats.staleFolders.total}</span>
                <span>LINES_DELETED: {cleanStats.unusedCode.lines}</span>
                <span>SPACE_RECLAIMED: {cleanStats.unusedAssets.size}</span>
              </div>
              <span>COMPRESSION: {cleanStats.bundleReduction}</span>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: AI CLIENT PROFILER */}
      <div className="w-80 bg-background flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2 font-mono">
          <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">Client Profiler</h3>
        </div>

        {selectedSessionId ? (
          <ScrollArea className="flex-1 p-4 bg-card/10">
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <p className="text-[9px] text-muted-foreground font-bold uppercase font-mono tracking-widest">Inference engine</p>
                <Button 
                  onClick={handleGenerateProfile}
                  disabled={loadingProfile}
                  className="w-full bg-card hover:bg-muted border border-border hover:border-primary/40 text-xs text-foreground font-mono font-bold gap-2 transition-all rounded-xl h-9.5 cursor-pointer shadow-xs"
                >
                  {loadingProfile ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ANALYSING LOGS...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Extract Telemetry
                    </>
                  )}
                </Button>
              </div>

              {aiProfile ? (
                <div className="space-y-4 border border-border p-4 rounded-2xl bg-card font-mono text-[11px] leading-relaxed shadow-xs">
                  
                  {/* User Intent */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-primary font-bold uppercase tracking-wider block">USER INTENT</span>
                    <p className="text-foreground text-xs font-bold leading-normal font-sans">
                      {aiProfile.userIntent}
                    </p>
                  </div>

                  <Separator className="bg-border" />

                  {/* Technical Depth */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-primary font-bold uppercase tracking-wider block">TECHNICAL DEPTH</span>
                    <div className="text-foreground text-xs font-bold leading-normal font-sans">
                      {aiProfile.technicalDepth}
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  {/* Action Plan */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-primary font-bold uppercase tracking-wider block">ACTION PLAN</span>
                    <div className="space-y-1.5 text-muted-foreground font-sans text-xs">
                      {aiProfile.actionPlan.map((step, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <span className="text-primary font-bold shrink-0 font-mono">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  {/* Suggested Reply */}
                  <div className="space-y-2 bg-muted/60 border border-border p-3.5 rounded-xl shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#4ade80] dark:text-emerald-400 font-bold uppercase tracking-wider">SUGGESTED NEXT REPLY</span>
                      <span className="text-[8px] text-muted-foreground font-bold uppercase">AI_DRAFT</span>
                    </div>
                    <p className="text-foreground text-xs leading-relaxed font-sans">
                      "{aiProfile.suggestedNextReply}"
                    </p>
                  </div>
                </div>
              ) : !loadingProfile && (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-700 select-none border border-dashed border-border rounded-2xl p-4 font-mono">
                  <Sparkles className="h-6 w-6 mb-2 stroke-[1.2]" />
                  <p className="text-[10px] text-zinc-500 font-bold text-center uppercase tracking-wider">
                    Awaiting telemetry trigger
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 select-none p-4 text-center font-mono">
            <Clock className="h-6 w-6 mb-2 stroke-[1.2] text-zinc-700" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
              Select active channel port to analyze context
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
