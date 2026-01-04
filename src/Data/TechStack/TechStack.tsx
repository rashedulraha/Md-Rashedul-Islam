import {
  Boxes,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  Search,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";

export const techData = [
  {
    category: "Frontend",
    skills: [
      {
        name: "React",
        icon: (
          <Layers className="h-6 w-6" style={{ color: "var(--chart-1)" }} />
        ),
      },
      { name: "Next.js", icon: <Globe className="h-6 w-6" /> },
      {
        name: "TypeScript",
        icon: (
          <Terminal className="h-6 w-6" style={{ color: "var(--chart-2)" }} />
        ),
      },
      {
        name: "Tailwind",
        icon: (
          <Smartphone className="h-6 w-6" style={{ color: "var(--chart-3)" }} />
        ),
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: <Cpu className="h-6 w-6" style={{ color: "var(--chart-4)" }} />,
      },
      {
        name: "Express",
        icon: <Zap className="h-6 w-6" style={{ color: "var(--chart-5)" }} />,
      },
      {
        name: "MongoDB",
        icon: (
          <Database className="h-6 w-6" style={{ color: "var(--chart-1)" }} />
        ),
      },
      {
        name: "Firebase",
        icon: <Cloud className="h-6 w-6" style={{ color: "var(--chart-2)" }} />,
      },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      {
        name: "Git",
        icon: (
          <GitBranch className="h-6 w-6" style={{ color: "var(--chart-3)" }} />
        ),
      },
      { name: "GitHub", icon: <ShieldCheck className="h-6 w-6" /> },
      {
        name: "TanStack Query",
        icon: (
          <Search className="h-6 w-6" style={{ color: "var(--chart-4)" }} />
        ),
      },
      {
        name: "Docker",
        icon: <Boxes className="h-6 w-6" style={{ color: "var(--chart-5)" }} />,
      },
    ],
  },
];
