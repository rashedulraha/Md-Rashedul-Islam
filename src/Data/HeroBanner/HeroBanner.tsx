import {
  Boxes,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  Search,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const socialData = [
  {
    name: "GitHub",
    icon: FaGithub,
    url: "https://github.com/rashedulraha",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/rashedulraha",
  },
  {
    name: "Twitter",
    icon: FaXTwitter,
    url: "https://x.com/rashedulraha",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/rashedulraha",
  },
];

export const skillsGroup = [
  {
    name: "React",
    icon: <Layers className="h-5 w-5" style={{ color: "var(--chart-1)" }} />,
    level: "Expert",
  },
  {
    name: "JavaScript",
    icon: <Code2 className="h-5 w-5" style={{ color: "var(--chart-2)" }} />,
    level: "Advanced",
  },
  {
    name: "TypeScript",
    icon: <Terminal className="h-5 w-5" style={{ color: "var(--chart-3)" }} />,
    level: "Advanced",
  },
  {
    name: "Next.js",
    icon: <Globe className="h-5 w-5" />,
    level: "Intermediate",
  },
  {
    name: "TanStack Query",
    icon: <Zap className="h-5 w-5" style={{ color: "var(--chart-4)" }} />,
    level: "Data Fetching",
  },
  {
    name: "Node.js",
    icon: <Cpu className="h-5 w-5" style={{ color: "var(--chart-5)" }} />,
    level: "Backend",
  },
  {
    name: "MongoDB",
    icon: <Database className="h-5 w-5" style={{ color: "var(--chart-1)" }} />,
    level: "NoSQL",
  },
  {
    name: "Tailwind",
    icon: (
      <Smartphone className="h-5 w-5" style={{ color: "var(--chart-2)" }} />
    ),
    level: "Styling",
  },
  {
    name: "Git",
    icon: <GitBranch className="h-5 w-5" style={{ color: "var(--chart-3)" }} />,
    level: "VCS",
  },
  {
    name: "GitHub",
    icon: <FaGithub className="h-5 w-5" />,
    level: "Collab",
  },
  {
    name: "Docker",
    icon: <Boxes className="h-5 w-5" style={{ color: "var(--chart-4)" }} />,
    level: "DevOps",
  },
  {
    name: "SEO",
    icon: <Search className="h-5 w-5" style={{ color: "var(--chart-5)" }} />,
    level: "Optimization",
  },
];
