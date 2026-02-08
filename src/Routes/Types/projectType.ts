export interface ProjectLink {
  live: string;
  github: string;
}

export type ProjectCategory =
  | "all"
  | "web"
  | "mobile"
  | "fullstack"
  | "opensource";
export type ProjectStatus = "live" | "development" | "archived" | "planning";
export type ComplexityLevel = "all" | "beginner" | "intermediate" | "advanced";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tech: string[];
  links: ProjectLink;
  views: number;
  rating: number;
  complexity: Exclude<ComplexityLevel, "all">; // "all" বাদে বাকিগুলো
  duration: string;
  date: string;
  tags: string[];
  teamSize?: number;
  contributions?: number;
  metric: string;
  featured: boolean;
}
