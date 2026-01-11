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
    category: "Frontend Development",
    description:
      "Architecting responsive, high-performance, and visually stunning user interfaces with modern frameworks.",
    skills: [
      {
        name: "React",
        level: 95,
        experience: "2+ Years",
        description:
          "Specialized in Hooks, Context API, and Reusable Component Architecture.",
        icon: (
          <Layers className="h-6 w-6" style={{ color: "var(--chart-1)" }} />
        ),
      },
      {
        name: "Next.js",
        level: 90,
        experience: "1.5+ Years",
        description:
          "Expertise in SSR, SSG, and App Router for SEO-optimized applications.",
        icon: <Globe className="h-6 w-6" />,
      },
      {
        name: "TypeScript",
        level: 85,
        experience: "1+ Year",
        description:
          "Implementing type-safety to build robust and maintainable enterprise codebases.",
        icon: (
          <Terminal className="h-6 w-6" style={{ color: "var(--chart-2)" }} />
        ),
      },
      {
        name: "Tailwind",
        level: 98,
        experience: "2+ Years",
        description:
          "Rapid UI development with utility-first CSS and custom design systems.",
        icon: (
          <Smartphone className="h-6 w-6" style={{ color: "var(--chart-3)" }} />
        ),
      },
    ],
  },
  {
    category: "Backend & Cloud",
    description:
      "Designing scalable server-side logic, secure APIs, and managing cloud-integrated databases.",
    skills: [
      {
        name: "Node.js",
        level: 88,
        experience: "1.5+ Years",
        description:
          "Building asynchronous event-driven backend services and RESTful APIs.",
        icon: <Cpu className="h-6 w-6" style={{ color: "var(--chart-4)" }} />,
      },
      {
        name: "Express",
        level: 90,
        experience: "1.5+ Years",
        description:
          "Fast, unopinionated, minimalist web framework for high-performance servers.",
        icon: <Zap className="h-6 w-6" style={{ color: "var(--chart-5)" }} />,
      },
      {
        name: "MongoDB",
        level: 85,
        experience: "1.5+ Years",
        description:
          "NoSQL database management with focus on aggregation and schema design.",
        icon: (
          <Database className="h-6 w-6" style={{ color: "var(--chart-1)" }} />
        ),
      },
      {
        name: "Firebase",
        level: 80,
        experience: "1+ Year",
        description:
          "Implementing real-time databases, authentication, and cloud functions.",
        icon: <Cloud className="h-6 w-6" style={{ color: "var(--chart-2)" }} />,
      },
    ],
  },
  {
    category: "Tools & DevOps",
    description:
      "Streamlining development workflows with version control, state management, and containerization.",
    skills: [
      {
        name: "Git",
        level: 92,
        experience: "2+ Years",
        description:
          "Advanced version control, branching strategies, and team collaboration.",
        icon: (
          <GitBranch className="h-6 w-6" style={{ color: "var(--chart-3)" }} />
        ),
      },
      {
        name: "GitHub",
        level: 95,
        experience: "2+ Years",
        description:
          "Managing CI/CD pipelines, Pull Requests, and open-source contributions.",
        icon: <ShieldCheck className="h-6 w-6" />,
      },
      {
        name: "TanStack Query",
        level: 88,
        experience: "1+ Year",
        description:
          "Server-state management, caching, and data fetching optimization.",
        icon: (
          <Search className="h-6 w-6" style={{ color: "var(--chart-4)" }} />
        ),
      },
      {
        name: "Docker",
        level: 75,
        experience: "6+ Months",
        description:
          "Containerizing applications for consistent deployment across environments.",
        icon: <Boxes className="h-6 w-6" style={{ color: "var(--chart-5)" }} />,
      },
    ],
  },
];
