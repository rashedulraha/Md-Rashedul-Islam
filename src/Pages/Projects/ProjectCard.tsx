"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Star,
  Eye,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { Project, ProjectStatus } from "@/Routes/Types/projectType";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  project: Project;
  index: number;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
  compact?: boolean;
}

export default function ProjectCard({
  project,
  index,
  setActiveProject,
  compact = false,
}: ProjectCardProps) {
  const [, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Status Colors based on type
  const getStatusColor = (status: ProjectStatus) => {
    const colors: Record<ProjectStatus, { bg: string; text: string }> = {
      live: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
      development: { bg: "bg-amber-500/20", text: "text-amber-400" },
      archived: { bg: "bg-rose-500/20", text: "text-rose-400" },
      planning: { bg: "bg-purple-500/20", text: "text-purple-400" },
    };
    return colors[status] || { bg: "bg-blue-500/20", text: "text-blue-400" };
  };

  const getComplexityColor = (complexity: string) => {
    const colors: Record<string, string> = {
      beginner: "text-emerald-400",
      intermediate: "text-amber-400",
      advanced: "text-rose-400",
    };
    return colors[complexity] || "text-blue-400";
  };

  const statusColors = getStatusColor(project.status);
  const complexityColor = getComplexityColor(project.complexity);

  // Helper to get links safely
  const githubUrl = project.links?.github;
  const liveUrl = project.links?.live;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liveUrl) {
      window.open(liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (compact) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => {
          setIsHovered(true);
          setActiveProject(project.id);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveProject(null);
        }}
        className="relative h-full"
        onClick={handleCardClick}>
        <Card className="group h-full relative overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all duration-300 cursor-pointer">
          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between pointer-events-none">
            <Badge
              className={`${statusColors.bg} ${statusColors.text} border-0 text-[10px] px-2 py-0.5`}>
              {project.status}
            </Badge>
            {project.featured && (
              <Badge className="bg-linear-to-r from-yellow-500 to-orange-500 border-0 text-white p-1">
                <Sparkles className="w-3 h-3" />
              </Badge>
            )}
          </div>

          <div className="relative aspect-video overflow-hidden bg-muted">
            {project.image && !imageError ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary/30" />
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-3">
              {project.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {project.views}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" /> {project.rating}
                </span>
              </div>
              {liveUrl && <ArrowUpRight className="w-4 h-4 text-primary" />}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Regular Card
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => {
        setIsHovered(true);
        setActiveProject(project.id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveProject(null);
      }}
      className="relative h-full">
      <Card className="group relative overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:border-primary/40 transition-all duration-300 cursor-pointer h-full flex flex-col">
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-linear-to-r from-yellow-500 to-orange-500 border-0 text-white text-[10px] px-2 py-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </Badge>
          </div>
        )}

        <div
          className="relative aspect-video overflow-hidden bg-muted"
          onClick={handleCardClick}>
          {project.image && !imageError ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Zap className="w-12 h-12 text-primary/20" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge
              className={`${statusColors.bg} ${statusColors.text} border-0 text-[10px] font-bold uppercase`}>
              {project.status}
            </Badge>
          </div>
        </div>

        <div className="p-5 flex flex-col grow">
          <div className="mb-4">
            <h3 className="font-bold text-xl mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 italic mb-2">
              {project.subtitle}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech?.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-[10px] bg-primary/5 border-primary/10 text-primary/80">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" /> <span>{project.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />{" "}
              <span>{project.rating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> <span>{project.duration}</span>
            </div>
            <div className={`font-bold ${complexityColor}`}>
              {project.complexity.toUpperCase()}
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 border-primary/20 hover:bg-primary/5"
              disabled={!githubUrl}
              onClick={(e) => {
                e.stopPropagation();
                if (githubUrl) window.open(githubUrl, "_blank");
              }}>
              <FaGithub className="w-4 h-4" /> Code
            </Button>

            <Button
              size="sm"
              className="flex-1 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              disabled={!liveUrl}
              onClick={(e) => {
                e.stopPropagation();
                if (liveUrl) window.open(liveUrl, "_blank");
              }}>
              <ExternalLink className="w-4 h-4" /> Live
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
