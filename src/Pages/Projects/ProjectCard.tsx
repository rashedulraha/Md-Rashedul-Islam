import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Star, Eye, Layers } from "lucide-react";
import type { Project } from "@/Routes/Types/projectType";

interface ProjectCardProps {
  project: Project;
  index: number;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}

export default function ProjectCard({
  project,
  index,
  activeProject,
  setActiveProject,
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      development: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      archived: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };
    return colors[status] || "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setActiveProject(project.id)}
      onMouseLeave={() => setActiveProject(null)}
      className="h-full">
      <Card className="group relative h-full overflow-hidden border-border/40 bg-linear-to-br from-card/80 to-card/30 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-primary/10">
        {/* --- Image Section --- */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Stats */}
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="flex gap-4 text-xs font-medium text-white">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" /> {project.views}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" /> {project.rating}
              </span>
            </div>
          </div>

          {/* Top Status Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge
              variant="outline"
              className={`${getStatusColor(project.status)} backdrop-blur-md font-semibold uppercase tracking-wider text-[10px]`}>
              {project.status}
            </Badge>
          </div>
        </div>

        {/* --- Content Section --- */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all duration-300">
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground mt-2 line-clamp-2 min-h-10">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 my-5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-1 text-[10px] rounded-md bg-secondary/50 border border-border/50 text-secondary-foreground">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] text-muted-foreground">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-primary/20 hover:bg-primary/10 transition-colors">
              <a href={project.links.github} target="_blank" rel="noreferrer">
                <Github className="w-4 h-4 mr-2" /> Code
              </a>
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <a href={project.links.live} target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
              </a>
            </Button>
          </div>
        </div>

        {/* Dynamic Border Glow (Animated on active) */}
        {activeProject === project.id && (
          <motion.div
            layoutId="glow"
            className="absolute inset-0 border-2 border-primary/50 pointer-events-none rounded-xl"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Card>
    </motion.div>
  );
}
