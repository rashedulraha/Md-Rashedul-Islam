import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "../ui/badge";
import {
  Calendar,
  CircleDot,
  ExternalLink,
  Eye,
  Star,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/Routes/Types/projectType";

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
  getStatusColor: (status: Project["status"]) => string;
  getComplexityColor: (complexity: Project["complexity"]) => string;
  formatNumber: (num: number) => string;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  getStatusColor,
  getComplexityColor,
  formatNumber,
  activeProject,
  setActiveProject,
}) => {
  const isActive = activeProject === project.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setActiveProject(project.id)}
      onHoverEnd={() => setActiveProject(null)}
      className="group relative rounded-3xl border border-border/40 bg-card/10 hover:bg-card/30 hover:border-primary/30 transition-all duration-500 overflow-hidden p-6">
      {/* Background Number */}
      <span className="absolute -right-4 -top-4 text-6xl font-black text-primary/5 italic select-none">
        0{index + 1}
      </span>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              className={`text-[10px] px-2 py-1 ${getStatusColor(
                project.status
              )}`}>
              {project?.status?.toUpperCase()}
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] px-2 py-1 border-border/40">
              {project.category}
            </Badge>
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="flex items-center gap-1 bg-background/50 border border-border/50 px-2 py-1 rounded-lg text-xs font-medium">
            <CircleDot className="h-1.5 w-1.5 text-primary" />
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="text-xs text-muted-foreground px-2 py-1">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-primary/70" />
            <span className="text-xs font-medium">
              {formatNumber(project.views)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
            <span className="text-xs font-medium">{project.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs font-medium">{project.date}</span>
          </div>
        </div>

        <Badge
          className={`text-[10px] px-2 py-1 ${getComplexityColor(
            project.complexity
          )}`}>
          {project?.complexity?.toUpperCase()}
        </Badge>
      </div>

      {/* Action Buttons - Visible on Hover */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-background/90 to-transparent">
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" asChild>
                <a href={project.links.live} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  Live Demo
                </a>
              </Button>
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  <FaGithub className="h-3.5 w-3.5 mr-2" />
                  Source Code
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Size and Contributions */}
      {project.teamSize && (
        <div className="mt-3 pt-3 border-t border-border/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>Team of {project.teamSize}</span>
          </div>
          {project.contributions && (
            <span className="text-xs text-muted-foreground">
              {project.contributions} contributions
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
