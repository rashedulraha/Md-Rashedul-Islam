import {
  Terminal,
  Layout,
  Chrome,
  GitBranch,
  Database,
  HardDrive,
  Zap,
  Cpu,
  Cloud,
  Shield,
  Globe,
  Brain,
  Award,
  Users,
  Star,
  Code2,
  TrendingUp,
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
} from "lucide-react";
import type { TechStackData, Project, Achievement, SocialLink } from "../types";

export const techStackData: TechStackData = {
  frontend: {
    icon: Layout,
    color: "from-blue-500 to-cyan-500",
    technologies: [
      { name: "TypeScript", level: 90, icon: Terminal },
      { name: "React", level: 95, icon: Layout },
      { name: "Next.js", level: 88, icon: Chrome },
      { name: "Redux/Zustand", level: 85, icon: GitBranch },
      { name: "Tailwind CSS", level: 92, icon: Layout },
      { name: "GraphQL", level: 82, icon: Database },
    ],
  },
  backend: {
    icon: Terminal,
    color: "from-green-500 to-emerald-500",
    technologies: [
      { name: "Node.js", level: 90, icon: Terminal },
      { name: "Golang", level: 85, icon: HardDrive },
      { name: "Python", level: 88, icon: Terminal },
      { name: "FastAPI", level: 87, icon: Zap },
      { name: "PostgreSQL", level: 92, icon: Database },
      { name: "Redis", level: 85, icon: Database },
    ],
  },
  devops: {
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    technologies: [
      { name: "Docker", level: 90, icon: Cpu },
      { name: "Kubernetes", level: 82, icon: Cpu },
      { name: "AWS", level: 88, icon: Cloud },
      { name: "CI/CD", level: 85, icon: GitBranch },
      { name: "Terraform", level: 78, icon: Shield },
      { name: "Nginx", level: 86, icon: Globe },
    ],
  },
  ai: {
    icon: Brain,
    color: "from-orange-500 to-red-500",
    technologies: [
      { name: "LLM Integration", level: 88, icon: Brain },
      { name: "RAG Systems", level: 85, icon: Database },
      { name: "LangChain", level: 82, icon: GitBranch },
      { name: "Vector DB", level: 80, icon: Database },
      { name: "OpenAI API", level: 87, icon: Brain },
      { name: "Prompt Engineering", level: 90, icon: Terminal },
    ],
  },
};

export const featuredProjects: Project[] = [
  {
    title: "AI-Powered Medical Assistant",
    tech: "Next.js, FastAPI, LangChain, Pinecone, OpenAI",
    desc: "Built a RAG system that summarizes medical reports and provides intelligent responses with 95% accuracy.",
    gradient: "from-purple-500 to-pink-500",
    stats: "95% Accuracy • 200ms Response • HIPAA Compliant",
    image: "🤖",
  },
  {
    title: "Scalable E-Commerce Platform",
    tech: "Next.js, Golang, PostgreSQL, Redis, AWS",
    desc: "Microservices-based platform handling 10k+ concurrent users with 200ms response time.",
    gradient: "from-blue-500 to-cyan-500",
    stats: "10k+ Users • 200ms RT • 99.9% Uptime",
    image: "🛍️",
  },
  {
    title: "Real-Time Analytics Dashboard",
    tech: "React, Node.js, WebSocket, MongoDB, Docker",
    desc: "Real-time data visualization with live updates and interactive charts for business intelligence.",
    gradient: "from-green-500 to-emerald-500",
    stats: "Real-time • 50k Events/sec • 5Dashboards",
    image: "📊",
  },
  {
    title: "Enterprise Auth Service",
    tech: "Go, JWT, OAuth2, PostgreSQL, Redis",
    desc: "Enterprise-grade authentication service supporting multiple providers and SSO with rate limiting.",
    gradient: "from-orange-500 to-red-500",
    stats: "SSO Ready • OAuth2 • JWT • Rate Limited",
    image: "🔐",
  },
];

export const achievements: Achievement[] = [
  {
    icon: Award,
    label: "DSA Problems",
    value: "500+",
    color: "text-yellow-500",
  },
  {
    icon: Users,
    label: "Contributions",
    value: "50+",
    color: "text-green-500",
  },
  {
    icon: Star,
    label: "GitHub Stars",
    value: "200+",
    color: "text-purple-500",
  },
  {
    icon: GitBranch,
    label: "Repositories",
    value: "50+",
    color: "text-blue-500",
  },
];

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    href: "https://github.com/rashedulraha",
    label: "GitHub",
    variant: "outline",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/rashedulraha/",
    label: "LinkedIn",
    variant: "outline",
  },
  {
    icon: Mail,
    href: "mailto:rashedulraha.bd@gmail.com",
    label: "Email",
    variant: "outline",
  },
  {
    icon: Twitter,
    href: "https://x.com/rashedulraha",
    label: "X",
    variant: "outline",
  },
  {
    icon: ExternalLink,
    href: "/projects",
    label: "View Projects",
    variant: "default",
  },
];

export const expertiseAreas: string[] = [
  "System Architecture & Design",
  "Microservices & Event-Driven Systems",
  "Cloud-Native Development",
  "AI Integration & RAG Systems",
  "Database Optimization",
  "Performance Tuning",
];

export const recentWork: Array<{
  icon: unknown;
  label: string;
  value: string;
}> = [
  {
    icon: Code2,
    label: "Active Development",
    value: "Next.js 16 + Go Microservices",
  },
  {
    icon: Brain,
    label: "Learning Focus",
    value: "Kubernetes & Distributed Systems",
  },
  {
    icon: TrendingUp,
    label: "Currently Exploring",
    value: "Vector Databases & LLMs",
  },
];
