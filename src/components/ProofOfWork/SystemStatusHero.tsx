"use client";

import React, { useState, useEffect } from "react";
import { 
  Wifi, 
  Clock, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Globe, 
  HardDrive,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";

export default function SystemStatusHero() {
  const [time, setTime] = useState<string>("");
  const [latency, setLatency] = useState<number>(42);
  const [networkLoad, setNetworkLoad] = useState<string>("Optimal");

  // UTC+6 Time Sync Hook
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Telemetry fluctuation simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(12, Math.min(95, prev + delta));
      });
      setNetworkLoad(Math.random() > 0.85 ? "Slight Fluctuation" : "Optimal");
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#070709] border-b border-zinc-800/40 font-mono text-zinc-400 overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 z-10 space-y-12">
        
        {/* Top Telemetry Feed & Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-bold text-xs tracking-widest uppercase">
                SYSTEM OPERATIONAL // NODE_ACTIVE
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white font-sans uppercase">
              Md Rashedul Islam
            </h1>
            <p className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
              Full-Stack & DevOps Engineer &bull; Infrastructure Architect
            </p>
          </div>

          {/* Quick Stats Ticker */}
          <div className="flex flex-wrap items-center gap-3 md:gap-6 bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>GATEWAY: <span className="text-white font-bold">ONLINE</span></span>
            </div>
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>RTT: <span className="text-white font-semibold">{latency}ms</span></span>
            </div>
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5 text-purple-400" />
              <span>DISK: <span className="text-white font-bold">12.4% USED</span></span>
            </div>
          </div>
        </div>

        {/* Hero Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Portrait Image Frame & Local Time clock widget */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent blur-xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 text-xs uppercase text-zinc-500 font-bold">
                <span>[DEVICE_HOLOGRAPH]</span>
                <span className="text-emerald-500 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED_IDENTITY
                </span>
              </div>
              
              {/* Portrait Container with Terminal Crop Marks */}
              <div className="relative aspect-[4/3] w-full bg-zinc-950/80 rounded-xl overflow-hidden border border-zinc-900 group-hover:border-zinc-800 transition-all flex items-center justify-center">
                {/* Crop corners styling */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-zinc-700" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-zinc-700" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-zinc-700" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-zinc-700" />

                <Image
                  src="/Rashedul.jpeg"
                  alt="Md Rashedul Islam portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover opacity-80 mix-blend-luminosity hover:opacity-100 transition-opacity duration-500"
                  priority
                />
              </div>
            </div>

            {/* Time Widget */}
            <div className="mt-6 pt-5 border-t border-zinc-900/60 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
                  LOCAL TEMPORAL NODE
                </span>
                <span className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" /> DHAKA, BD (UTC+06:00)
                </span>
              </div>
              <div className="bg-zinc-950 border border-zinc-900 px-4 py-2 rounded-xl text-center shadow-inner">
                <span className="text-lg md:text-xl font-bold font-mono tracking-wider text-emerald-400">
                  {time || "00:00:00"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Verifiable System Metrics Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 text-xs uppercase text-zinc-500 font-bold">
              <span>[COMPLIANCE_AND_TELEMETRY_ENGINE]</span>
              <span>VER: 4.12.0_STABLE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              
              {/* Stack Profile */}
              <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white uppercase">STACK PROFILE</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Language:</span>
                    <span className="text-zinc-300 font-semibold">TypeScript (Strict)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Framework:</span>
                    <span className="text-zinc-300 font-semibold">Next.js 15 / React 19</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Backend API:</span>
                    <span className="text-zinc-300 font-semibold">Node.js / Express</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Databases:</span>
                    <span className="text-zinc-300 font-semibold">PostgreSQL / MongoDB</span>
                  </div>
                </div>
              </div>

              {/* Architecture Compliance */}
              <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase">ARCH COMPLIANCE</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Virtualization:</span>
                    <span className="text-zinc-300 font-semibold">Docker (Multi-stage)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Proxy Router:</span>
                    <span className="text-zinc-300 font-semibold">Nginx Reverse Proxy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Security Gate:</span>
                    <span className="text-zinc-300 font-semibold">JWT Rotation / HTTPOnly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Schema Validation:</span>
                    <span className="text-zinc-300 font-semibold">Zod Guardrails</span>
                  </div>
                </div>
              </div>

              {/* Reliability Indicators */}
              <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 space-y-3 md:col-span-2">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white uppercase">PRODUCTION RELIABILITY METRICS</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-zinc-900/40 p-2 rounded-lg border border-zinc-900">
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold">TYPE SAFETY</span>
                    <span className="text-emerald-400 font-bold text-sm">100% Strict</span>
                  </div>
                  <div className="bg-zinc-900/40 p-2 rounded-lg border border-zinc-900">
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold">AVG BUILD LATENCY</span>
                    <span className="text-white font-bold text-sm">48.2s</span>
                  </div>
                  <div className="bg-zinc-900/40 p-2 rounded-lg border border-zinc-900">
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold">TELEMETRY LOADS</span>
                    <span className="text-indigo-400 font-bold text-sm">{networkLoad}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Status line */}
            <div className="flex items-center justify-between text-[10px] text-zinc-500 bg-zinc-950/40 px-3 py-2.5 rounded-lg border border-zinc-900">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-zinc-600" />
                SECURE CONGESTION R: 0.00
              </span>
              <span>DEPLOY: STABLE_V24.3</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
