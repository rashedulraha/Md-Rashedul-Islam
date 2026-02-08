"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  Users,
  GitCommit,
  Tag,
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
  activeProject,
  setActiveProject,
  compact = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);

  const isActive = activeProject === project.id;

  // Status Colors
  const getStatusConfig = (status: ProjectStatus) => {
    const configs: Record<
      ProjectStatus,
      { bg: string; text: string; label: string; icon: string }
    > = {
      live: {
        bg: "bg-emerald-500/15",
        text: "text-emerald-400",
        label: "Live",
        icon: "🟢",
      },
      development: {
        bg: "bg-amber-500/15",
        text: "text-amber-400",
        label: "In Progress",
        icon: "🟡",
      },
      archived: {
        bg: "bg-rose-500/15",
        text: "text-rose-400",
        label: "Archived",
        icon: "🔴",
      },
      planning: {
        bg: "bg-purple-500/15",
        text: "text-purple-400",
        label: "Planning",
        icon: "🟣",
      },
    };
    return (
      configs[status] || {
        bg: "bg-blue-500/15",
        text: "text-blue-400",
        label: "Unknown",
        icon: "⚪",
      }
    );
  };

  const getComplexityConfig = (complexity: string) => {
    const configs: Record<string, { color: string; icon: string }> = {
      beginner: { color: "text-emerald-400", icon: "⭐" },
      intermediate: { color: "text-amber-400", icon: "⭐⭐" },
      advanced: { color: "text-rose-400", icon: "⭐⭐⭐" },
    };
    return configs[complexity] || { color: "text-blue-400", icon: "⭐" };
  };

  const statusConfig = getStatusConfig(project.status);
  const complexityConfig = getComplexityConfig(project.complexity);

  const githubUrl = project.links?.github;
  const liveUrl = project.links?.live;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liveUrl) {
      window.open(liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Compact Card View
  if (compact) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ scale: 1.03, y: -2 }}
        onMouseEnter={() => {
          setIsHovered(true);
          setActiveProject(project.id);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveProject(null);
        }}
        className="relative h-full">
        <Card
          className={`group h-full relative overflow-hidden border transition-all duration-300 cursor-pointer ${
            isActive
              ? "border-primary/50 bg-card/90 shadow-lg shadow-primary/10"
              : "border-border/40 bg-card/50 hover:bg-card/80 hover:border-primary/30"
          } backdrop-blur-sm`}
          onClick={handleCardClick}
          role="article"
          aria-label={`${project.title} project card`}>
          {/* Status & Featured Badges */}
          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between pointer-events-none">
            <Badge
              className={`${statusConfig.bg} ${statusConfig.text} border-0 text-[10px] px-2 py-0.5 font-medium`}>
              {statusConfig.icon} {statusConfig.label}
            </Badge>
            {project.featured && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 text-white p-1 shadow-md">
                <Sparkles className="w-3 h-3" />
              </Badge>
            )}
          </div>

          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            {project.image && !imageError ? (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary/30" />
              </div>
            )}
            {/* Overlay on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <ArrowUpRight className="w-8 h-8 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors mb-1">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {project.description}
            </p>

            {/* Stats & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1" title="Total views">
                  <Eye className="w-3 h-3" /> {project.views}
                </span>
                <span
                  className="flex items-center gap-1"
                  title={`Rating: ${project.rating}/5`}>
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{" "}
                  {project.rating}
                </span>
              </div>
              {liveUrl && (
                <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Regular Full Card View
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => {
        setIsHovered(true);
        setActiveProject(project.id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveProject(null);
      }}
      className="relative h-full">
      <Card
        className={`group relative overflow-hidden transition-all duration-300 h-full flex flex-col ${
          isActive
            ? "border-primary/60 bg-card/90 shadow-xl shadow-primary/20"
            : "border-border/40 bg-card/60 hover:bg-card/80 hover:border-primary/40"
        } backdrop-blur-sm`}
        role="article"
        aria-label={`${project.title} project details`}>
        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 text-white text-[10px] px-2.5 py-1 flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3" /> Featured
            </Badge>
          </motion.div>
        )}

        {/* Project Image */}
        <div
          className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50 cursor-pointer"
          onClick={handleCardClick}>
          {project.image && !imageError ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Zap className="w-12 h-12 text-primary/20" />
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              className={`${statusConfig.bg} ${statusConfig.text} border-0 text-[10px] font-bold uppercase shadow-sm`}>
              {statusConfig.icon} {statusConfig.label}
            </Badge>
          </div>

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && liveUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                <div className="text-white text-center">
                  <ExternalLink className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm font-medium">View Live Project</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col grow">
          {/* Title & Description */}
          <div className="mb-4">
            <h3 className="font-bold text-xl mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-muted-foreground/80 line-clamp-1 italic mb-2">
                {project.subtitle}
              </p>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack with Show More */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {(showAllTech ? project.tech : project.tech?.slice(0, 4))?.map(
                (tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-[10px] bg-primary/5 border border-primary/10 text-primary/90 hover:bg-primary/10 transition-colors">
                    {tech}
                  </Badge>
                ),
              )}
            </div>
            {project.tech && project.tech.length > 4 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllTech(!showAllTech);
                }}
                className="text-xs text-primary hover:underline mt-2"
                aria-label={
                  showAllTech
                    ? "Show less technologies"
                    : "Show more technologies"
                }>
                {showAllTech ? "Show less" : `+${project.tech.length - 4} more`}
              </button>
            )}
          </div>

          {/* Project Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
            <div
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Total project views">
              <Eye className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">
                {project.views.toLocaleString()}
              </span>
            </div>
            <div
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              title={`User rating: ${project.rating} out of 5`}>
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
              <span className="font-medium">{project.rating}/5</span>
            </div>
            <div
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Project duration">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{project.duration}</span>
            </div>
            <div
              className={`flex items-center gap-2 font-bold ${complexityConfig.color}`}
              title={`Complexity level: ${project.complexity}`}>
              <span>{complexityConfig.icon}</span>
              <span className="uppercase text-[10px] tracking-wide">
                {project.complexity}
              </span>
            </div>
          </div>

          {/* Additional Metrics */}
          {(project.teamSize || project.contributions || project.metric) && (
            <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground border-t border-border/50 pt-3">
              {project.teamSize && (
                <div className="flex items-center gap-1.5" title="Team size">
                  <Users className="w-3.5 h-3.5" />
                  <span>{project.teamSize} members</span>
                </div>
              )}
              {project.contributions && (
                <div
                  className="flex items-center gap-1.5"
                  title="Total contributions">
                  <GitCommit className="w-3.5 h-3.5" />
                  <span>{project.contributions} commits</span>
                </div>
              )}
              {project.metric && (
                <div className="flex items-center gap-1.5" title="Key metric">
                  <Tag className="w-3.5 h-3.5" />
                  <span className="text-primary/80 font-medium">
                    {project.metric}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!githubUrl}
              onClick={(e) => {
                e.stopPropagation();
                if (githubUrl)
                  window.open(githubUrl, "_blank", "noopener,noreferrer");
              }}
              aria-label={`View ${project.title} source code on GitHub`}>
              <FaGithub className="w-4 h-4" />
              <span className="font-medium">Code</span>
            </Button>

            <Button
              size="sm"
              className="flex-1 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!liveUrl}
              onClick={(e) => {
                e.stopPropagation();
                if (liveUrl)
                  window.open(liveUrl, "_blank", "noopener,noreferrer");
              }}
              aria-label={`View ${project.title} live demo`}>
              <ExternalLink className="w-4 h-4" />
              <span className="font-medium">Live Demo</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
