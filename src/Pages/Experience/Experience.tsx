import { CircleDot, Workflow, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";

const evolution = [
  {
    phase: "01. Phase: Build & Deploy",
    role: "Independent Full Stack Developer",
    org: "Open Source / Portfolio",
    duration: "2025 — PRESENT",
    description:
      "Architecting high-performance web applications focusing on the MERN stack. Successfully deployed 1+ full-scale projects with integrated authentication and real-time databases.",
    stack: ["Next.js", "Zustand", "PostgreSQL", "Prisma"],
    impact: "99.9% Lighthouse SEO Score",
  },
  {
    phase: "02. Phase: Logic & DSA",
    role: "Problem Solver",
    org: "LeetCode / HackerRank",
    duration: "2024 — 2025",
    description:
      "Mastered core Data Structures and Algorithms. Solved 5+ challenges, focusing on Big O optimization and efficient memory management in JavaScript/TypeScript.",
    stack: ["Data Structures", "Big O", "ES6+", "TS Logic"],
    impact: "Top 15% Ranking",
  },
  {
    phase: "03. Phase: Foundation",
    role: "Science",
    org: "Nazipur Govt collage",
    duration: "2022 — 2024",
    description:
      "I completed my Intermediate education in the Science stream. I have a strong foundation in Physics, Chemistry, and Mathematics. I am skilled in analytical thinking and problem-solving, and I am always eager to learn new concepts and technologies.",
    stack: ["Physics", "Chemistry", "Mathematics", "Networking"],
    impact: "4.75+ GPA",
  },
];

export default function Experience() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {/* Navbar Integration */}
      <Navbar />

      {/* Tech Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT SIDE: Heading & Status */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-start lg:justify-center space-y-4 sm:space-y-6 text-center lg:text-left items-center lg:items-start">
            <div className="space-y-2">
              <h2 className="text-primary font-mono text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                Log_History
              </h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                Technical <br />{" "}
                <span className="text-primary italic">Evolution</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs border-l border-primary/30 pl-4 text-left">
              A timeline of my journey from theoretical foundations to building
              scalable digital solutions. Focusing on efficiency and modern
              architectures.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="flex -space-x-2">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-background bg-primary/20 flex items-center justify-center backdrop-blur-md">
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-background bg-chart-1/20 flex items-center justify-center backdrop-blur-md">
                  <Workflow className="h-3 w-3 sm:h-4 sm:w-4 text-chart-1" />
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Ready for Onboarding
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Vertical Timeline Cards */}
          <div className="col-span-1 lg:col-span-8 space-y-4 sm:space-y-5 lg:overflow-y-auto lg:max-h-[70vh] lg:pr-4 custom-scrollbar">
            {evolution.map((item, index) => (
              <Card
                key={index}
                className="group rounded relative bg-card/20 backdrop-blur-xl border-border/40 p-4 sm:p-5 md:p-6 transition-all hover:bg-primary/3 hover:border-primary/50 overflow-hidden shadow-lg">
                {/* Background Decor */}
                <span className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 text-4xl sm:text-5xl md:text-6xl font-black text-primary/5 italic select-none">
                  0{index + 1}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] sm:text-[10px] font-mono text-primary/80 uppercase tracking-tighter">
                      {item.phase}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground/80 font-medium">
                      <span className="block sm:inline">{item.org}</span>
                      <span className="hidden sm:inline"> | </span>
                      <span className="block sm:inline">{item.duration}</span>
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="w-fit h-fit bg-primary/10 text-primary border-none text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 shrink-0">
                    {item.impact}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.stack.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-1 bg-background/50 border border-border/50 px-2 py-1 rounded text-[8px] sm:text-[9px] font-mono text-muted-foreground uppercase tracking-wider group-hover:border-primary/30 transition-colors">
                      <CircleDot className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-primary/50" />
                      {s}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
