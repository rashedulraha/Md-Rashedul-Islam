import type { LucideIcon } from "lucide-react";

export interface CodeSymbol {
  Icon: LucideIcon;
  delay: number;
  duration: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface TechItem {
  Icon: LucideIcon;
  text: string;
  description: string;
  color: string;
  duration: number;
  delay: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}
