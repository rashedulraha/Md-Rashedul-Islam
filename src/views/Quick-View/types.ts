import type { LucideIcon } from "lucide-react";

export interface Technology {
  name: string;
  level: number;
  icon: LucideIcon;
}

export interface TechCategory {
  icon: LucideIcon;
  color: string;
  technologies: Technology[];
}

export interface TechStackData {
  frontend: TechCategory;
  backend: TechCategory;
  devops: TechCategory;
  ai: TechCategory;
}

export interface Project {
  title: string;
  tech: string;
  desc: string;
  gradient: string;
  stats: string;
  image: string;
}

export interface Achievement {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  variant: "default" | "outline";
}
