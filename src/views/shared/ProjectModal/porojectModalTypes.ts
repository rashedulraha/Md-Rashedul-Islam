export interface ProjectDetails {
  title: string;
  description: string;
  team: string;
  startDate: string;
  projectUrl: string;
  buttonText: string;
  technologies: string[];
  role: string;
}
export interface ProjectDialogProps {
  projectData: ProjectDetails;
}
