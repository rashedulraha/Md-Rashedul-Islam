import {
  Database,
  Globe,
  Layers,
  Cpu,
  Smartphone,
  GitBranch,
  Terminal,
  Zap,
  Search,
  Boxes,
  ShieldCheck,
  Cloud,
} from "lucide-react";

import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";

const stacks = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: <Layers className="text-blue-500" /> },
      { name: "Next.js", icon: <Globe className="text-foreground" /> },
      { name: "TypeScript", icon: <Terminal className="text-blue-600" /> },
      { name: "Tailwind", icon: <Smartphone className="text-cyan-500" /> },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <Cpu className="text-emerald-500" /> },
      { name: "Express", icon: <Zap className="text-amber-500" /> },
      { name: "MongoDB", icon: <Database className="text-green-600" /> },
      { name: "Firebase", icon: <Cloud className="text-orange-500" /> },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", icon: <GitBranch className="text-orange-600" /> },
      { name: "GitHub", icon: <ShieldCheck className="text-slate-400" /> },
      { name: "Query", icon: <Search className="text-rose-500" /> },
      { name: "Docker", icon: <Boxes className="text-blue-700" /> },
    ],
  },
];

export default function TechStack() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <Navbar />

      {/* Background Animation remains fixed */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 flex flex-col items-center px-6 pt-28 pb-16 md:pt-32 max-w-7xl mx-auto">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
            <h2 className="text-primary font-mono tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-3">
              Technical Inventory
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic leading-none">
              My <span className="text-primary">Tech</span> Ecosystem
            </h1>
          </div>

          {/* Stacks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 p-1">
            {stacks.map((group, idx) => (
              <div
                key={group.category}
                className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-primary/40" />
                  <h3 className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    {group.category}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-border/40 bg-card/10 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/3 hover:-translate-y-1 shadow-sm">
                      <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                        {skill.icon}
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary uppercase tracking-tight transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Metrics */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 border-t border-border/20 pt-10">
            <div className="flex items-center gap-8 sm:gap-16">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-primary tracking-tighter italic">
                  99%
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  UPTIME
                </span>
              </div>
              <div className="h-10 w-px bg-border/20 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-primary tracking-tighter italic">
                  50+
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  REPOS
                </span>
              </div>
              <div className="h-10 w-px bg-border/20 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-primary tracking-tighter italic">
                  1.2ms
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  LATENCY
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
