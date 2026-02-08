import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({
  project,
  activeProject,
  setActiveProject,
  index,
}: any) {
  const isMobileActive = activeProject === project.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all duration-500 cursor-pointer"
      // Toggle active state on click for mobile
      onClick={() => setActiveProject(isMobileActive ? null : project.id)}>
      {/* Content Area */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye size={14} /> {project.views}
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500" /> {project.rating}
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t: string) => (
            <Badge
              key={t}
              variant="secondary"
              className="text-[10px] bg-primary/10">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* OVERLAY: Visible on Desktop Hover OR Mobile Active (Tap) */}
      <div
        className={`
          absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 
          bg-background/90 backdrop-blur-md transition-all duration-300
          ${isMobileActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0"}
        `}>
        <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
          <a href={project.liveLink} target="_blank" rel="noreferrer">
            <Button size="sm" className="shadow-lg shadow-primary/20">
              <ExternalLink className="mr-2" size={16} /> Live Demo
            </Button>
          </a>
          <a href={project.githubLink} target="_blank" rel="noreferrer">
            <Button size="sm" variant="outline">
              <Github className="mr-2" size={16} /> GitHub
            </Button>
          </a>
        </div>

        {/* Mobile Hint */}
        <p className="text-[10px] text-muted-foreground md:hidden mt-2">
          Tap outside to close
        </p>
      </div>
    </motion.div>
  );
}
