import type { JSX } from "react";

export type TabType =
  | "overview"
  | "experience"
  | "skills"
  | "education"
  | "testimonials";

export interface TabConfig {
  id: TabType;
  label: string;
  icon: JSX.Element;
}

export interface Stat {
  icon: JSX.Element;
  value: string;
  label: string;
}

export interface Detail {
  icon: JSX.Element;
  title: string;
  content: string;
  highlights?: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  icon: JSX.Element;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  icon: JSX.Element;
  title: string;
  level: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credential: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface Proficiency {
  name: string;
  level: number;
}
