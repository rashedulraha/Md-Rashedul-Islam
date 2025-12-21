import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Code2,
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
  InfinityIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skillGroups = [
  {
    name: "React",
    icon: <Layers className="h-5 w-5 text-sky-500" />,
    level: "Expert",
  },
  {
    name: "JS",
    icon: <Code2 className="h-5 w-5 text-amber-500" />,
    level: "Advanced",
  },
  {
    name: "TS",
    icon: <Terminal className="h-5 w-5 text-blue-600" />,
    level: "Advanced",
  },
  {
    name: "Next.js",
    icon: <Globe className="h-5 w-5 text-foreground" />,
    level: "Intermediate",
  },
  {
    name: "Query",
    icon: <Zap className="h-5 w-5 text-orange-500" />,
    level: "Tanstack Query",
  },
  {
    name: "Node.js",
    icon: <Cpu className="h-5 w-5 text-emerald-600" />,
    level: "Backend",
  },
  {
    name: "MongoDB",
    icon: <Database className="h-5 w-5 text-green-600" />,
    level: "NoSQL",
  },
  {
    name: "Tailwind",
    icon: <Smartphone className="h-5 w-5 text-cyan-500" />,
    level: "Styling",
  },
  {
    name: "Git",
    icon: <GitBranch className="h-5 w-5 text-orange-700" />,
    level: "VCS",
  },
  {
    name: "GitHub",
    icon: <Github className="h-5 w-5 text-muted-foreground" />,
    level: "Collab",
  },
  {
    name: "Docker",
    icon: <Boxes className="h-5 w-5 text-blue-700" />,
    level: "DevOps",
  },
  {
    name: "SEO",
    icon: <Search className="h-5 w-5 text-pink-600" />,
    level: "Optimization",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-16 lg:py-20">
      <div className="grid grid-cols-12 items-center gap-y-12 lg:gap-8">
        {/* LEFT: Intro Section */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-[10px] font-mono tracking-widest text-primary animate-pulse">
            <InfinityIcon className="h-3 w-3" /> FULL-STACK DEVELOPER
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter text-foreground">
            Precision <br className="hidden sm:block" />
            In Every <span className="text-primary italic">Pixel</span>
          </h1>
          <p className="max-w-md text-muted-foreground text-sm sm:text-base leading-relaxed">
            Turning complex backend logic and pixel-perfect designs into
            seamless user experiences using the latest web technologies.
          </p>
          <div className="pt-2 w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-xl px-10 font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
              Explore My Work
            </Button>
          </div>
        </div>

        {/* MIDDLE: Technical Skills Grid */}
        <div className="col-span-12 lg:col-span-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            <TooltipProvider>
              {skillGroups.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <div className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md transition-all hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-1 cursor-help shadow-sm">
                      <div className="p-2 rounded-lg bg-background/80 group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </div>
                      <span className="mt-2 text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-tighter group-hover:text-primary">
                        {skill.name}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary text-primary-foreground font-mono text-[10px]">
                    {skill.level}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>

        {/* RIGHT: Social Sidebar (Hidden on small, Desktop only) */}
        <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center gap-8">
          <div className="h-20 w-px bg-linear-to-b from-transparent via-border to-primary" />
          <div className="flex flex-col gap-5">
            {[Github, Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-125 active:scale-90">
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
          <div className="h-20 w-px bg-linear-to-t from-transparent via-border to-primary" />
        </div>

        {/* Mobile Social Bar (Visible on small screens) */}
        <div className="col-span-12 lg:hidden flex justify-center items-center gap-8 pt-4">
          <div className="h-px w-12 bg-linear-to-r from-transparent to-primary" />
          <div className="flex gap-6">
            {[Github, Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-muted-foreground hover:text-primary transition-transform active:scale-90">
                <Icon size={22} strokeWidth={1.5} />
              </a>
            ))}
          </div>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-primary" />
        </div>
      </div>
    </section>
  );
}
