// Types - Updated to match your JSON structure
interface ProjectLink {
  live: string;
  github: string;
}

export interface Project {
  id: string; // Will be added dynamically
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  links: ProjectLink;
  metric: string;
  // Added fields with default values
  category: string;
  status: "live" | "development" | "archived";
  views: number;
  rating: number;
  complexity: "beginner" | "intermediate" | "advanced";
  duration: string;
  date: string;
  tags: string[];
  teamSize?: number;
  contributions?: number;
}

export type ProjectCategory =
  | "all"
  | "web"
  | "mobile"
  | "fullstack"
  | "opensource";

export type ComplexityLevel = "all" | "beginner" | "intermediate" | "advanced";
