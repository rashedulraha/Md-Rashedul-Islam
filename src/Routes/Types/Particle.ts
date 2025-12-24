export interface Particle {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface ProjectLinks {
  live: string;
  github: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  links: ProjectLinks;
  metric: string;
}

//
export interface EvolutionPhase {
  phase: string;
  role: string;
  org: string;
  duration: string;
  description: string;
  stack: string[];
  impact: string;
}
