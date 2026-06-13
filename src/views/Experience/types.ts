import type { JSX } from "react";

export interface TimelineItem {
  role: string;
  org: string;
  duration: string;
  phase: string;
  description: string;
  impact: string;
  stack: string[];
  link?: string;
}

export interface Metric {
  id: number;
  icon: unknown;
  value: string;
  label: string;
  color: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
}

export interface SkillCategory {
  name: string;
  icon: JSX.Element;
  description: string;
  skills: string[];
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
}
