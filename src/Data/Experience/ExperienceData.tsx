import {
  Award,
  Calendar,
  Code,
  Database,
  GitBranch,
  Palette,
  Smartphone,
  Users,
} from "lucide-react";

export const skillCategoriesData = [
  {
    name: "Frontend Architecture",
    icon: <Smartphone className="h-4 w-4" />,
    color: "text-blue-500",
    description:
      "Building high-performance, accessible, and scalable user interfaces.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Framer Motion",
    ],
  },
  {
    name: "Backend Systems",
    icon: <Database className="h-4 w-4" />,
    color: "text-green-500",
    description:
      "Designing robust server-side logic and optimized database schemas.",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    name: "Cloud & Deployment",
    icon: <GitBranch className="h-4 w-4" />,
    color: "text-purple-500",
    description:
      "Automating workflows and managing cloud infrastructure for 99.9% uptime.",
    skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel", "Netlify"],
  },
  {
    name: "Product Design",
    icon: <Palette className="h-4 w-4" />,
    color: "text-pink-500",
    description:
      "Crafting intuitive user journeys and pixel-perfect design systems.",
    skills: [
      "Figma",
      "Adobe XD",
      "Responsive Design",
      "Accessibility",
      "Prototyping",
    ],
  },
];

export const metricsData = [
  {
    id: 1,
    label: "Projects Completed",
    value: "25+",
    icon: Code,
    color: "text-blue-500",
  },
  {
    id: 2,
    label: "Years of Experience",
    value: "3+",
    icon: Calendar,
    color: "text-green-500",
  },
  {
    id: 3,
    label: "Global Clients",
    value: "15+",
    icon: Users,
    color: "text-purple-500",
  },
  {
    id: 4,
    label: "Awards Won",
    value: "05",
    icon: Award,
    color: "text-yellow-500",
  },
];

export const certificationsData = [
  {
    id: 1,
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-DEV-12345",
  },
  {
    id: 2,
    name: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2022",
    credentialId: "MDB-DEV-67890",
  },
  {
    id: 3,
    name: "React Advanced Patterns",
    issuer: "Udemy",
    date: "2023",
    credentialId: "UDM-REACT-54321",
  },
];

export const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Developer at TechCorp",
    content:
      "Rashedul is an exceptional developer with a keen eye for detail and a passion for creating efficient solutions.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Project Manager at DevStudio",
    content:
      "His ability to quickly adapt to new technologies and deliver high-quality code is impressive.",
    rating: 5,
  },
];
