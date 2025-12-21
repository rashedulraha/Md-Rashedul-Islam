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
      { name: "React", icon: <Layers className="text-blue-400" /> },
      { name: "Next.js", icon: <Globe className="text-white" /> },
      { name: "TypeScript", icon: <Terminal className="text-blue-500" /> },
      { name: "Tailwind", icon: <Smartphone className="text-cyan-400" /> },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <Cpu className="text-green-500" /> },
      { name: "Express", icon: <Zap className="text-yellow-500" /> },
      { name: "MongoDB", icon: <Database className="text-emerald-500" /> },
      { name: "Firebase", icon: <Cloud className="text-orange-500" /> },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", icon: <GitBranch className="text-orange-600" /> },
      { name: "GitHub", icon: <ShieldCheck className="text-slate-300" /> },
      { name: "Query", icon: <Search className="text-red-500" /> },
      { name: "Docker", icon: <Boxes className="text-blue-600" /> },
    ],
  },
];

export default function TechStack() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <Navbar />

      <Animation />

      <main className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
            <h2 className="text-primary font-mono tracking-[0.3em] text-xs uppercase mb-2">
              Technical Inventory
            </h2>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-none">
              My <span className="text-primary">Tech</span> Ecosystem
            </h1>
          </div>

          {/* Stacks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto no-scrollbar max-h-[60vh] p-4">
            {stacks.map((group, idx) => (
              <div
                key={group.category}
                className={`space-y-4 animate-in fade-in slide-in-from-bottom duration-700 delay-${
                  idx * 150
                }`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-primary/50" />
                  <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                    {group.category}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border/40 bg-card/20 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-1">
                      <div className="mb-2 transition-transform group-hover:scale-110">
                        {skill.icon}
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary uppercase tracking-tight">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-12 flex justify-center border-t border-border/20 pt-6">
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-primary">99%</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  UPTIME
                </span>
              </div>
              <div className="h-8 w-px bg-border/40" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-primary">50+</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  REPOS
                </span>
              </div>
              <div className="h-8 w-px bg-border/40" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-primary">1.2ms</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  RESPONSE
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
