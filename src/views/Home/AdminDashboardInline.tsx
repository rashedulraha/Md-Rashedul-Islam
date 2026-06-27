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
  Settings,
  Save,
  Check
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
  technicalDepth: string;
  actionPlan: string[];
  suggestedNextReply: string;
}

interface CleanupLog {
  timestamp: string;
  level: "INFO" | "SCAN" | "PRUNE" | "SUCCESS";
  message: string;
}

interface AdminDashboardInlineProps {
  onLogout: () => void;
}

export default function AdminDashboardInline({ onLogout }: AdminDashboardInlineProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "cleanup" | "config">("chat");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sendingReply, setSendingReply] = useState(false);
  
  // AI summary states
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

  // Website Config Editor States (Mocked backend storage integration via LocalStorage)
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroIntro, setHeroIntro] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [teamSize, setTeamSize] = useState("4");
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Load website configs on mount
  useEffect(() => {
    setHeroHeadline(localStorage.getItem("site_hero_headline") || "I build type-safe full-stack applications and orchestrate secure cloud infrastructure.");
    setHeroIntro(localStorage.getItem("site_hero_intro") || "Merging core computer science fundamentals with modern scalable engineering. Based in Naogaon, Bangladesh, I specialize in robust DevOps pipelines and type-safe systems design.");
    setContactEmail(localStorage.getItem("site_contact_email") || "rashedulraha.bd@gmail.com");
    setTeamSize(localStorage.getItem("site_team_size") || "4");
  }, []);

  // Fetch initial sessions
  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/chat/messages");
      if (!res.ok) {
        throw new Error("Failed to load sessions");
      }
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to fetch sessions. Ensure you are authorized.");
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
          toast.success("New chat visitor session established!");
        }
      } catch (err) {
        console.error("Error parsing SSE:", err);
      }
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
        technicalDepth: summary.technicalDepth || "N/A",
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

  const handleSaveConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setTimeout(() => {
      localStorage.setItem("site_hero_headline", heroHeadline);
      localStorage.setItem("site_hero_intro", heroIntro);
      localStorage.setItem("site_contact_email", contactEmail);
      localStorage.setItem("site_team_size", teamSize);
      setIsSavingConfig(false);
      setConfigSaved(true);
      toast.success("Website configuration aggregate committed successfully!");
      
      // Dispatch storage event so Home.tsx can update live
      window.dispatchEvent(new Event("storage"));
      
      setTimeout(() => setConfigSaved(false), 2000);
    }, 1000);
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
    <div className="flex flex-col md:flex-row h-[600px] border border-zinc-800 bg-zinc-950 font-mono text-xs text-zinc-300 overflow-hidden shadow-2xl relative z-10">
      
      {/* LEFT PANEL: CONVERSATION LIST & NAV */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col shrink-0 bg-zinc-900/30">
        {/* Header */}
        <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-zinc-800/80 text-zinc-300 border border-zinc-700">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
            </div>
            <div>
              <h1 className="font-bold text-[10px] uppercase tracking-wider">Secure Gateway</h1>
              <p className="text-[8px] text-zinc-500 font-mono">RESTRICTED_NODE</p>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-880/65 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="p-2 border-b border-zinc-800 flex gap-1 bg-zinc-950/40 text-[9px]">
          <button 
            onClick={() => setActiveTab("chat")}
            className={cn(
              "flex-1 py-1 text-center font-bold uppercase transition-all border cursor-pointer",
              activeTab === "chat" 
                ? "bg-zinc-800 border-zinc-700 text-zinc-200" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            )}
          >
            Chat Hub
          </button>
          <button 
            onClick={() => setActiveTab("cleanup")}
            className={cn(
              "flex-1 py-1 text-center font-bold uppercase transition-all border cursor-pointer",
              activeTab === "cleanup" 
                ? "bg-zinc-800 border-zinc-700 text-zinc-200" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            )}
          >
            Pruner
          </button>
          <button 
            onClick={() => setActiveTab("config")}
            className={cn(
              "flex-1 py-1 text-center font-bold uppercase transition-all border cursor-pointer",
              activeTab === "config" 
                ? "bg-zinc-800 border-zinc-700 text-zinc-200" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            )}
          >
            Live Config
          </button>
        </div>

        {/* Search / Context */}
        {activeTab === "chat" && (
          <div className="p-2 border-b border-zinc-800">
            <div className="relative flex items-center bg-zinc-950 px-2 py-1.5 border border-zinc-800">
              <Search className="h-3 w-3 text-zinc-600 mr-2 shrink-0" />
              <input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[10px] text-zinc-300 placeholder-zinc-600 w-full focus:ring-0"
              />
            </div>
          </div>
        )}

        {/* List scroll / Sidebar Metadata */}
        <div className="flex-1 overflow-y-auto bg-zinc-950/20">
          <div className="p-1.5 space-y-1">
            {activeTab === "chat" && (
              loadingSessions ? (
                <div className="flex flex-col items-center justify-center py-8 gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />
                  <p className="text-[8px] text-zinc-600 uppercase">SYNCHRONISING...</p>
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-zinc-600 text-[10px] uppercase">
                  <MessageSquare className="h-5 w-5 mb-1.5 stroke-[1.2]" />
                  <span>No active Feeds</span>
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
                          ? "bg-zinc-900 border-zinc-800 text-zinc-200" 
                          : "border-transparent hover:bg-zinc-900/40 text-zinc-500 hover:text-zinc-400"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[11px] truncate max-w-[100px] text-zinc-300">
                            {session.userName === "Anonymous Visitor" ? `PORT_${session.sessionId.substring(0, 4)}` : session.userName}
                          </span>
                          <Circle className={cn(
                            "h-1.5 w-1.5 fill-current",
                            session.online ? "text-[#4ade80]" : "text-zinc-700"
                          )} />
                        </div>
                        <span className="text-[8px] text-zinc-600">
                          {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "NEW"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-1.5 mt-0.5">
                        <p className="text-[10px] truncate max-w-[150px] font-sans">
                          {lastMsg ? lastMsg.content : "Secure channel established..."}
                        </p>
                        {unreadCount > 0 && (
                          <span className="bg-zinc-300 text-zinc-900 font-black text-[8px] px-1 rounded-full shrink-0 min-w-3.5 h-3.5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )
            )}

            {activeTab === "cleanup" && (
              <div className="p-2 space-y-3 text-[10px] text-zinc-500">
                <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 space-y-1.5 text-zinc-400">
                  <span className="text-[8px] font-bold text-zinc-500 block uppercase tracking-wider">CLEANUP TARGETS</span>
                  <div className="space-y-1">
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

                <div className="bg-zinc-900 border border-zinc-800 p-2.5 space-y-0.5">
                  <span className="text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">COMPILATION DAEMON</span>
                  <p className="text-zinc-300 text-xs font-bold">{cleanStats.bundleReduction}</p>
                  <p className="text-[9px] text-zinc-500 leading-tight">
                    Calculated size reduction since last deployment scan.
                  </p>
                </div>

                <button 
                  onClick={handleTriggerCleanup}
                  disabled={isCleaning}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white text-[10px] font-bold py-1.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md disabled:opacity-40"
                >
                  {isCleaning ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Pruning...
                    </>
                  ) : (
                    <>
                      <Play className="w-2.5 h-2.5 text-[#4ade80]" />
                      Trigger Prune
                    </>
                  )}
                </button>
              </div>
            )}

            {activeTab === "config" && (
              <div className="p-2 text-[10px] text-zinc-500 space-y-3">
                <div className="bg-zinc-900 border border-zinc-800 p-2.5 space-y-1.5 text-zinc-400">
                  <span className="text-[8px] font-bold text-zinc-500 block uppercase tracking-wider">Site Telemetry</span>
                  <p className="leading-relaxed">
                    Changes made in the configuration form will immediately update variables across the single-page layout system.
                  </p>
                </div>
                <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 text-[8.5px] leading-relaxed text-zinc-500">
                  <span>CONFIGURATION_NODE: CONNECTED</span>
                  <br />
                  <span>TARGET: /src/views/Home/Home.tsx</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CENTER PANEL: ACTIVE CHAT SCREEN / CLEANUP LOGGER / CONFIG FORM */}
      <div className="flex-1 flex flex-col bg-zinc-950 border-r border-zinc-800 min-w-0">
        {activeTab === "chat" && (
          selectedSession ? (
            <>
              {/* Session Header */}
              <div className="p-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/20">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[11px] uppercase tracking-wider text-zinc-300">
                      {selectedSession.userName === "Anonymous Visitor" ? `VISITOR_PORT_${selectedSession.sessionId.substring(0, 4)}` : selectedSession.userName}
                    </h2>
                    <div className="flex items-center gap-1 text-[9px] mt-0.5 text-zinc-500">
                      <span className={cn("font-bold", selectedSession.online ? "text-[#4ade80]" : "text-zinc-600")}>
                        {selectedSession.online ? "ONLINE" : "OFFLINE"}
                      </span>
                      <span>&bull;</span>
                      <span>ID: {selectedSession.sessionId.substring(0, 8)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Screen */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-zinc-950/40">
                {selectedSession.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-zinc-600 text-[10px] uppercase">
                    <MessageSquare className="h-6 w-6 mb-1.5 stroke-[1.2]" />
                    <span>No message logs</span>
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
                            "max-w-[85%] px-3 py-1.5 text-xs",
                            isAdmin 
                              ? "bg-zinc-200 text-zinc-950 font-medium font-sans" 
                              : isBot
                                ? "bg-zinc-900/60 border border-zinc-800 text-zinc-400 italic"
                                : "bg-zinc-900 border border-zinc-800 text-zinc-200 font-sans"
                          )}
                        >
                          {message.content}
                        </div>
                        <span className="text-[7px] text-zinc-600 px-1 font-bold flex items-center gap-1 uppercase">
                          {isBot && "AI_AGENT • "}
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-2.5 border-t border-zinc-800 bg-zinc-900/20">
                <form onSubmit={handleSendReply} className="flex gap-2 items-center">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Enter reply parameters to client stream..."
                    className="bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 placeholder-zinc-600 h-8 px-2.5 w-full outline-none focus:border-zinc-700 font-mono"
                  />
                  <button 
                    type="submit" 
                    disabled={!replyText.trim() || sendingReply}
                    className="h-8 w-8 shrink-0 bg-zinc-300 hover:bg-white text-zinc-950 flex items-center justify-center cursor-pointer transition-colors disabled:opacity-40"
                  >
                    {sendingReply ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 select-none p-4 text-center">
              <MessageSquare className="h-8 w-8 mb-2 stroke-[1.2]" />
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">No feeds connected</h2>
              <p className="text-[8px] mt-1 max-w-[180px] text-zinc-600 uppercase tracking-wider">
                Select an active client session port in the sidebar to stream logs.
              </p>
            </div>
          )
        )}

        {activeTab === "cleanup" && (
          // Infrastructure Cleanup Daemon Logger View
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950">
            {/* Header */}
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/10">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-zinc-400" />
                <h2 className="font-bold text-[10px] uppercase tracking-wider text-zinc-300">
                  Automated Cleanup Logger
                </h2>
              </div>
              <span className="bg-zinc-900 border border-zinc-800 text-[#4ade80] font-bold text-[8px] px-2 py-0.5 uppercase tracking-widest">
                DAEMON_ACTIVE
              </span>
            </div>

            {/* Logs console */}
            <div className="flex-1 p-4 text-[10px] overflow-y-auto space-y-1.5 select-text bg-black leading-relaxed font-mono">
              <div className="text-zinc-650 select-none pb-1.5 border-b border-zinc-900 mb-3">
                MD_RASHEDUL_ISLAM PORTFOLIO CLEANUP LOGGER v2.4.1
                <br />
                LOGSTREAM SYNCHRONISED. PIPELINES IDLE.
              </div>
              {cleanupLogs.map((log, index) => {
                let lvlColor = "text-[#06b6d4]";
                if (log.level === "PRUNE") lvlColor = "text-red-500";
                if (log.level === "SCAN") lvlColor = "text-amber-500";
                if (log.level === "SUCCESS") lvlColor = "text-[#4ade80]";
                
                return (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-zinc-700 select-none">[{log.timestamp}]</span>
                    <span className={cn("font-bold uppercase shrink-0 min-w-[50px]", lvlColor)}>
                      {log.level}
                    </span>
                    <span className="text-zinc-400">{log.message}</span>
                  </div>
                );
              })}
              <div ref={logEndRef} />
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/10 flex items-center justify-between text-[9px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span>STALE: {cleanStats.staleFolders.pruned}/{cleanStats.staleFolders.total}</span>
                <span>DELETED: {cleanStats.unusedCode.lines} L</span>
                <span>SPACE: {cleanStats.unusedAssets.size}</span>
              </div>
              <span>COMPRESSION: {cleanStats.bundleReduction}</span>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          // Website config editor form
          <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-y-auto p-4 space-y-4">
            <div className="border-b border-zinc-800 pb-2">
              <h2 className="font-bold text-[10px] text-zinc-200 uppercase tracking-widest flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-zinc-400" />
                <span>Website Configuration Engine</span>
              </h2>
            </div>

            <form onSubmit={handleSaveConfigSubmit} className="space-y-4 font-mono text-[10px]">
              <div className="space-y-1">
                <label className="text-zinc-500 font-bold uppercase text-[8px] block">Hero Headline</label>
                <textarea
                  value={heroHeadline}
                  onChange={(e) => setHeroHeadline(e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 p-2 outline-none focus:border-zinc-700 resize-none font-mono"
                  placeholder="Headline copy..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-500 font-bold uppercase text-[8px] block">Hero Intro Description</label>
                <textarea
                  value={heroIntro}
                  onChange={(e) => setHeroIntro(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 p-2 outline-none focus:border-zinc-700 resize-none font-mono"
                  placeholder="Introduction paragraph..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-500 font-bold uppercase text-[8px] block">Primary Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 h-8 px-2 outline-none focus:border-zinc-700 font-mono"
                    placeholder="email address..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-500 font-bold uppercase text-[8px] block">Engineering Collaborators</label>
                  <input
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 h-8 px-2 outline-none focus:border-zinc-700 font-mono"
                    placeholder="4"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSavingConfig}
                className="w-full bg-zinc-300 hover:bg-white text-zinc-950 py-2 font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 text-[9px]"
              >
                {isSavingConfig ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Committing Changes...
                  </>
                ) : configSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Committed to Store
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    Commit Configuration
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: AI CLIENT PROFILER */}
      <div className="w-full md:w-64 bg-zinc-900/30 flex flex-col shrink-0">
        <div className="p-3 border-b border-zinc-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-zinc-400" />
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-zinc-300">Client Profiler</h3>
        </div>

        {selectedSessionId && activeTab === "chat" ? (
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Inference engine</p>
              <button 
                onClick={handleGenerateProfile}
                disabled={loadingProfile}
                className="w-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[10px] text-zinc-350 hover:text-white font-bold py-1.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md disabled:opacity-40"
              >
                {loadingProfile ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin text-zinc-500" />
                    ANALYSING LOGS...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-zinc-500" />
                    Extract Telemetry
                  </>
                )}
              </button>
            </div>

            {aiProfile ? (
              <div className="space-y-3.5 border border-zinc-800 p-3 bg-zinc-950/40 text-[10px] leading-relaxed shadow-sm">
                
                {/* User Intent */}
                <div className="space-y-1">
                  <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider block">USER INTENT</span>
                  <p className="text-zinc-300 text-xs font-bold leading-normal font-sans">
                    {aiProfile.userIntent}
                  </p>
                </div>

                <div className="h-[1px] bg-zinc-900" />

                {/* Technical Depth */}
                <div className="space-y-1">
                  <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider block">TECHNICAL DEPTH</span>
                  <div className="text-zinc-300 text-xs font-bold leading-normal font-sans">
                    {aiProfile.technicalDepth}
                  </div>
                </div>

                <div className="h-[1px] bg-zinc-900" />

                {/* Action Plan */}
                <div className="space-y-1.5">
                  <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider block">ACTION PLAN</span>
                  <div className="space-y-1 text-zinc-400 font-sans">
                    {aiProfile.actionPlan.map((step, idx) => (
                      <div key={idx} className="flex gap-1.5 items-start">
                        <span className="text-zinc-500 font-bold shrink-0 font-mono">{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-zinc-900" />

                {/* Suggested Reply */}
                <div className="space-y-1.5 bg-zinc-950 border border-zinc-900 p-2 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider">SUGGESTED NEXT REPLY</span>
                    <span className="text-[7px] text-zinc-500 font-bold uppercase">AI_DRAFT</span>
                  </div>
                  <p className="text-zinc-350 leading-relaxed font-sans italic">
                    "{aiProfile.suggestedNextReply}"
                  </p>
                </div>
              </div>
            ) : !loadingProfile && (
              <div className="flex flex-col items-center justify-center py-16 text-zinc-700 border border-dashed border-zinc-800 p-3">
                <Sparkles className="h-5 w-5 mb-1.5 stroke-[1.2]" />
                <p className="text-[9px] font-bold text-center uppercase tracking-wider">
                  Awaiting telemetry trigger
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 select-none p-4 text-center font-mono">
            <Clock className="h-5 w-5 mb-1.5 stroke-[1.2]" />
            <p className="text-[8px] uppercase tracking-wider leading-relaxed">
              {activeTab === "config" 
                ? "Live Editor console loaded" 
                : activeTab === "cleanup" 
                  ? "Daemon process logs running" 
                  : "Select active channel port to analyze context"
              }
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
