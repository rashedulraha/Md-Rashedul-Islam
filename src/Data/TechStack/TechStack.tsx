import {
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
  Code,
  Server,
  Palette,
  Container,
} from "lucide-react";
import { Code2, Braces, Atom, Wind, Flame } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const techData = [
  {
    category: "Frontend Development",
    description:
      "Architecting responsive, high-performance, and visually stunning user interfaces with modern frameworks and tools.",
    skills: [
      {
        name: "React.js",
        level: 95,
        experience: "2+ Years",
        description:
          "Specialized in Hooks, Context API, and Reusable Component Architecture for building scalable applications.",
        icon: <Layers className="h-6 w-6" style={{ color: "#61dafb" }} />,
      },
      {
        name: "Next.js",
        level: 90,
        experience: "1.5+ Years",
        description:
          "Expertise in SSR, SSG, App Router, and API Routes for SEO-optimized full-stack applications.",
        icon: <Globe className="h-6 w-6" style={{ color: "#000000" }} />,
      },
      {
        name: "TypeScript",
        level: 85,
        experience: "1+ Year",
        description:
          "Implementing type-safety to build robust and maintainable enterprise codebases with advanced type patterns.",
        icon: <Code className="h-6 w-6" style={{ color: "#3178C6" }} />,
      },
      {
        name: "JavaScript",
        level: 98,
        experience: "3+ Years",
        description:
          "Core language expertise with ES6+, async programming, and modern JavaScript patterns.",
        icon: <Terminal className="h-6 w-6" style={{ color: "#f7df1e" }} />,
      },
      {
        name: "Tailwind CSS",
        level: 98,
        experience: "2+ Years",
        description:
          "Rapid UI development with utility-first CSS, custom design systems, and responsive design patterns.",
        icon: <Palette className="h-6 w-6" style={{ color: "#06b6d4" }} />,
      },
      {
        name: "UI/UX Design",
        level: 80,
        experience: "2+ Years",
        description:
          "Creating intuitive user interfaces with focus on user experience, accessibility, and modern design principles.",
        icon: <Smartphone className="h-6 w-6" style={{ color: "#ff6b6b" }} />,
      },
    ],
  },
  {
    category: "Backend Development",
    description:
      "Designing scalable server-side logic, secure APIs, and managing databases with modern backend technologies.",
    skills: [
      {
        name: "Node.js",
        level: 88,
        experience: "1.5+ Years",
        description:
          "Building asynchronous event-driven backend services, RESTful APIs, and microservices architecture.",
        icon: <Server className="h-6 w-6" style={{ color: "#339933" }} />,
      },
      {
        name: "Express.js",
        level: 90,
        experience: "1.5+ Years",
        description:
          "Fast, unopinionated, minimalist web framework for high-performance servers and API development.",
        icon: <Zap className="h-6 w-6" style={{ color: "#000000" }} />,
      },
      {
        name: "Go",
        level: 75,
        experience: "6+ Months",
        description:
          "Learning Go for high-performance backend services, concurrent programming, and system-level development.",
        icon: <Cpu className="h-6 w-6" style={{ color: "#00ADD8" }} />,
      },
      {
        name: "API Integration",
        level: 92,
        experience: "2+ Years",
        description:
          "Seamless integration with third-party APIs, payment gateways, and external services.",
        icon: <GitBranch className="h-6 w-6" style={{ color: "#ff9f43" }} />,
      },
    ],
  },
  {
    category: "Database & Auth",
    description:
      "Managing data persistence, authentication, and real-time databases with modern database solutions.",
    skills: [
      {
        name: "MongoDB",
        level: 85,
        experience: "1.5+ Years",
        description:
          "NoSQL database management with focus on aggregation pipelines, schema design, and performance optimization.",
        icon: <Database className="h-6 w-6" style={{ color: "#47a248" }} />,
      },
      {
        name: "PostgreSQL",
        level: 80,
        experience: "1+ Year",
        description:
          "Relational database management with complex queries, indexing, and ACID compliance.",
        icon: <Database className="h-6 w-6" style={{ color: "#4169E1" }} />,
      },
      {
        name: "Prisma ORM",
        level: 85,
        experience: "1+ Year",
        description:
          "Type-safe database access, migrations, and query optimization with modern ORM.",
        icon: <Search className="h-6 w-6" style={{ color: "#2D3748" }} />,
      },
      {
        name: "Firebase",
        level: 80,
        experience: "1+ Year",
        description:
          "Real-time databases, authentication, cloud functions, and serverless backend solutions.",
        icon: <Cloud className="h-6 w-6" style={{ color: "#ffca28" }} />,
      },
    ],
  },
  {
    category: "DevOps & Tools",
    description:
      "Streamlining development workflows with version control, containerization, and deployment automation.",
    skills: [
      {
        name: "Git",
        level: 92,
        experience: "2+ Years",
        description:
          "Advanced version control, branching strategies, merge conflicts, and team collaboration workflows.",
        icon: <GitBranch className="h-6 w-6" style={{ color: "#f05032" }} />,
      },
      {
        name: "GitHub",
        level: 95,
        experience: "2+ Years",
        description:
          "Managing CI/CD pipelines, Pull Requests, code reviews, and open-source contributions.",
        icon: <ShieldCheck className="h-6 w-6" style={{ color: "#181717" }} />,
      },
      {
        name: "Docker",
        level: 75,
        experience: "6+ Months",
        description:
          "Containerizing applications, Docker Compose, multi-stage builds, and consistent deployment.",
        icon: <Container className="h-6 w-6" style={{ color: "#2496ED" }} />,
      },
      {
        name: "Nginx",
        level: 70,
        experience: "6+ Months",
        description:
          "Web server configuration, reverse proxy, load balancing, and static file serving.",
        icon: <Server className="h-6 w-6" style={{ color: "#009639" }} />,
      },
      {
        name: "TanStack Query",
        level: 88,
        experience: "1+ Year",
        description:
          "Server-state management, caching, data fetching optimization, and synchronization.",
        icon: <Search className="h-6 w-6" style={{ color: "#ff6b6b" }} />,
      },
    ],
  },
];

export const technologies = [
  { name: "JavaScript", icon: Code2, color: "text-yellow-400" },
  { name: "TypeScript", icon: Braces, color: "text-blue-500" },
  { name: "React.js", icon: Atom, color: "text-cyan-400" },
  { name: "Next.js", icon: Layers, color: "text-white" },
  { name: "Tailwind", icon: Wind, color: "text-sky-400" },
  { name: "Node.js", icon: Server, color: "text-green-500" },
  { name: "Express.js", icon: Cpu, color: "text-gray-300" },
  { name: "MongoDB", icon: Database, color: "text-green-600" },
  { name: "PostgreSQL", icon: Database, color: "text-blue-600" },
  { name: "Firebase", icon: Flame, color: "text-orange-400" },
  { name: "Docker", icon: Container, color: "text-blue-400" },
  { name: "Git", icon: GitBranch, color: "text-orange-500" },
  { name: "GitHub", icon: FaGithub, color: "text-white" },
];
