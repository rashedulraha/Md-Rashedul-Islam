"use client";

import React, { useState, useEffect } from "react";
import { 
  Send, 
  Terminal as TerminalIcon, 
  User, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle,
  Clock,
  Eye,
  Key
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "visitor" | "system";
  content: string;
  timestamp: string;
}

interface AIProfile {
  intent: string;
  techStack: string[];
  leadScore: number;
  confidence: number;
  recommendedReply: string;
}

export default function SecureControlPanel() {
  const [visitorInput, setVisitorInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "visitor",
      content: "Hi Md Rashedul, I am looking for a contract engineer to help dockerize our Next.js dashboard and configure an Nginx proxy on our VPS. Do you have remote availability next week?",
      timestamp: "15:09:12"
    }
  ]);
  
  const [selectedMessageId, setSelectedMessageId] = useState<string>("msg-1");
  const [aiProfile, setAiProfile] = useState<AIProfile>({
    intent: "Technical Project Consultation & Freelance Contract",
    techStack: ["Next.js", "Docker", "Nginx", "VPS Hosting"],
    leadScore: 95,
    confidence: 98,
    recommendedReply: "I have immediate remote availability. I specialize in multi-stage Docker virtualization and configuring high-throughput Nginx reverse proxies with automated TLS renewals. Let's schedule a technical discovery call."
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Simple heuristic-based AI parsing to make it interactive and dynamic
  const analyzeMessageContent = (text: string): AIProfile => {
    const lowercase = text.toLowerCase();
    const stack: string[] = [];
    let intent = "General Inquiry";
    let leadScore = 60;
    
    // Tech detection
    if (lowercase.includes("next")) stack.push("Next.js");
    if (lowercase.includes("react")) stack.push("React");
    if (lowercase.includes("docker")) stack.push("Docker");
    if (lowercase.includes("nginx")) stack.push("Nginx");
    if (lowercase.includes("mongo")) stack.push("MongoDB");
    if (lowercase.includes("postgres")) stack.push("PostgreSQL");
    if (lowercase.includes("prisma")) stack.push("Prisma ORM");
    if (lowercase.includes("express") || lowercase.includes("node")) stack.push("Node.js / Express");
    if (lowercase.includes("jwt") || lowercase.includes("auth")) stack.push("JWT Authentication");
    if (lowercase.includes("vps") || lowercase.includes("aws") || lowercase.includes("cloud")) stack.push("VPS Infrastructure");

    if (stack.length === 0) {
      stack.push("Full-Stack / General");
    }

    // Intent detection
    if (lowercase.includes("hire") || lowercase.includes("job") || lowercase.includes("recruit") || lowercase.includes("role") || lowercase.includes("position")) {
      intent = "Recruiter Outreach / Permanent Hiring Opportunity";
      leadScore = 90;
    } else if (lowercase.includes("contract") || lowercase.includes("freelance") || lowercase.includes("project") || lowercase.includes("consult")) {
      intent = "High-Ticket Freelance / Contract Development";
      leadScore = 95;
    } else if (lowercase.includes("help") || lowercase.includes("bug") || lowercase.includes("error")) {
      intent = "Technical Support / Code Debugging Request";
      leadScore = 70;
    }

    // Adjust lead score based on stack match density
    leadScore += Math.min(10, stack.length * 2);
    leadScore = Math.min(100, leadScore);

    // Dynamic suggested reply
    let recommendedReply = "Thank you for the message. I would be happy to discuss how we can collaborate. Could you share more details about your timeline and existing technical specification?";
    if (intent.includes("Contract")) {
      recommendedReply = `I have open bandwidth for freelance/contract projects. I've designed systems matching: ${stack.join(", ")}. Let's coordinate a 15-minute call to scope this out.`;
    } else if (intent.includes("Recruiter")) {
      recommendedReply = `Thanks for reaching out! I'm interested in discussing this opportunity. I'm strong in ${stack.join(", ")} and DevOps pipelines. Let's exchange calendars.`;
    }

    return {
      intent,
      techStack: stack,
      leadScore,
      confidence: Math.floor(Math.random() * 15) + 82, // 82 - 97% confidence
      recommendedReply
    };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorInput.trim()) return;

    const newId = `msg-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: newId,
      sender: "visitor",
      content: visitorInput.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
    };

    setMessages(prev => [...prev, newMsg]);
    setVisitorInput("");
    setSelectedMessageId(newId);
    setIsProcessing(true);

    // Simulate AI inference delays
    setTimeout(() => {
      const parsed = analyzeMessageContent(newMsg.content);
      setAiProfile(parsed);
      setIsProcessing(false);
    }, 1200);
  };

  const selectMessage = (msg: ChatMessage) => {
    setSelectedMessageId(msg.id);
    setIsProcessing(true);
    setTimeout(() => {
      const parsed = analyzeMessageContent(msg.content);
      setAiProfile(parsed);
      setIsProcessing(false);
    }, 400);
  };

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#070709] border-b border-zinc-800/40 font-mono text-zinc-400">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808007_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 z-10 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs text-emerald-400 uppercase font-bold tracking-wider mb-2">
            <Key className="w-3.5 h-3.5" /> SECURE GATEWAY
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white font-sans uppercase">
            SECURE CONTROL PANEL & ACTIVE MESSAGING HUB
          </h2>
          <p className="text-xs text-zinc-500 max-w-xl uppercase tracking-wider">
            Restricted administrative dashboard with integrated client socket feeds and automated user intent analysis.
          </p>
        </div>

        {/* Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT PANEL: Visitor Chat Terminal */}
          <div className="lg:col-span-5 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
            
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2 text-[10px] uppercase font-bold text-zinc-500">
                <span>[CLIENT_COMMUNICATIONS_PORT]</span>
                <span className="text-indigo-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  SOCKET_READY
                </span>
              </div>

              {/* Chat Thread */}
              <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-3.5 h-[240px] overflow-y-auto space-y-3.5 scrollbar-thin">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => selectMessage(msg)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs outline-none cursor-pointer ${
                      selectedMessageId === msg.id
                        ? "bg-zinc-900/60 border-zinc-700 text-white"
                        : "bg-transparent border-transparent hover:bg-zinc-900/20 text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-indigo-400" />
                        {msg.sender === "visitor" ? "VISITOR_SESSION" : "SYSTEM_LOG"}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed font-sans">{msg.content}</p>
                  </button>
                ))}
              </div>

              {/* Form Input */}
              <form onSubmit={handleSendMessage} className="space-y-2 mt-2 pt-2 border-t border-zinc-900/60">
                <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-900 rounded-xl p-2 focus-within:border-zinc-700 transition-colors">
                  <input
                    type="text"
                    value={visitorInput}
                    onChange={(e) => setVisitorInput(e.target.value)}
                    placeholder="Enter message parameter to host..."
                    className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-zinc-600 font-mono px-2"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[9px] text-zinc-600">
                  <span>SSL_RSA_AES_256_GCM</span>
                  <span>Uplink active</span>
                </div>
              </form>

            </div>

          </div>

          {/* RIGHT PANEL: Restricted Admin Console & AI User Profiler Mockup */}
          <div className="lg:col-span-7 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between relative">
            
            {/* Restricted overlay effect if not selected/idle */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-amber-500 to-indigo-500 z-10" />

            {/* Admin Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0e12] border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  ADMIN_SESSION &bull; RESTRICTED ACCESS
                </span>
              </div>
              <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                <ShieldAlert className="w-3 h-3 animate-pulse" /> SECURE_NODE
              </div>
            </div>

            {/* Admin Body & AI Profiler Mockup */}
            <div className="p-5 bg-zinc-950 font-mono text-xs text-zinc-400 flex-grow space-y-5">
              
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2 text-[10px] uppercase font-bold text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  AI USER PROFILER (INFERENCE ENGINE)
                </span>
                <span>STATE: {isProcessing ? "ANALYZING..." : "IDLE"}</span>
              </div>

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] uppercase text-zinc-500 tracking-wider">Parsing telemetry vectors...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Lead Fit Indicator & Confidence */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-zinc-500 block uppercase font-bold">LEAD FIT SCORE</span>
                        <span className="text-white text-base font-bold flex items-center gap-1.5 font-sans">
                          {aiProfile.leadScore}%
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase font-semibold">
                        HIGH FIT
                      </span>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-zinc-500 block uppercase font-bold">CONFIDENCE RATIO</span>
                        <span className="text-white text-base font-bold font-sans">
                          {aiProfile.confidence}%
                        </span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase font-semibold">
                        OPTIMAL
                      </span>
                    </div>
                  </div>

                  {/* Intent Field */}
                  <div className="bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-xl space-y-1.5">
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold">DETECTED CLIENT INTENT</span>
                    <p className="text-white text-xs font-bold leading-normal font-sans">
                      {aiProfile.intent}
                    </p>
                  </div>

                  {/* Detected Stack */}
                  <div className="bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-xl space-y-2">
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold">DETAILED TECH CONTEXT</span>
                    <div className="flex flex-wrap gap-1.5">
                      {aiProfile.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 font-mono text-[10px] bg-zinc-950 border border-zinc-800 text-zinc-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Next Reply */}
                  <div className="bg-indigo-600/5 border border-indigo-500/20 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-indigo-400 block uppercase font-bold">SUGGESTED NEXT REPLY</span>
                      <span className="text-[9px] text-zinc-500">AUTO-GENERATED BY AI</span>
                    </div>
                    <p className="text-zinc-200 text-xs leading-relaxed font-sans">
                      "{aiProfile.recommendedReply}"
                    </p>
                    <div className="flex justify-end pt-1">
                      <button 
                        type="button"
                        onClick={() => {
                          // Mock Action
                          alert("Action dispatched: Autoreply drafted.");
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer font-sans"
                      >
                        Draft Reply <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Admin Console Footer */}
            <div className="px-4 py-2.5 bg-[#09090b] border-t border-zinc-900 flex items-center justify-between text-[9px] text-zinc-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-600" /> SYNC_OK
              </span>
              <span>INFERENCE_TIME: 18ms</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
