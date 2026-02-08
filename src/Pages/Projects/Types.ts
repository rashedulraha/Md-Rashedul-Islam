export type ProjectCategory = "all" | "web" | "mobile" | "desktop" | "ui/ux";
export type ComplexityLevel = "all" | "beginner" | "intermediate" | "advanced";
export type ProjectStatus = "live" | "development" | "archived";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tech: string[];
  tags: string[];
  views: number;
  rating: string;
  complexity: ComplexityLevel;
  duration: string;
  date: string;
  teamSize: number;
  contributions: number;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}
