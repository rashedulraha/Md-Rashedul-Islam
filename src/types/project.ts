export interface ProjectData {
  id: string;
  name: string;
  tagline?: string;
  overview: string;
  live_demo?: string;
  github_repo?: string;
  silicon_img_banner?: string;
  screenshots?: any[];
  tech_stack?: {
    frameworks_libraries?: string[];
    languages?: string[];
  };
  key_features?: string[];
  architecture?: Record<string, any>;
  responsibilities?: string[];
  challenges?: string[];
  database_schema?: {
    tables?: { name: string; fields: string[] }[];
  };
  role?: string;
  problem?: string;
  solution?: string;
  result?: string;
  outcome_profit?: {
    business_impact?: string;
    client_testimonial?: string;
  };
  readmeContent?: string;
}

export function getProjectBanner(project: ProjectData): string {
  return project.silicon_img_banner || "/images/placeholder.jpg";
}
