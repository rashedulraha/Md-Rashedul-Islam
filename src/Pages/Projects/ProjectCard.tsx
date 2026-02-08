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
  Code2,
  Sparkles,
  Zap,
  Users,
  GitCommit,
  Activity,
  Award,
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const isActive = activeProject === project.id;

  // Enhanced Status Configuration
  const getStatusConfig = (status: ProjectStatus) => {
    const configs: Record<
      ProjectStatus,
      {
        gradient: string;
        text: string;
        label: string;
        icon: string;
        glow: string;
      }
    > = {
      live: {
        gradient: "from-emerald-500 to-green-500",
        text: "text-emerald-400",
        label: "Live",
        icon: "●",
        glow: "shadow-emerald-500/50",
      },
      development: {
        gradient: "from-amber-500 to-orange-500",
        text: "text-amber-400",
        label: "In Development",
        icon: "◐",
        glow: "shadow-amber-500/50",
      },
      archived: {
        gradient: "from-rose-500 to-red-500",
        text: "text-rose-400",
        label: "Archived",
        icon: "○",
        glow: "shadow-rose-500/50",
      },
      planning: {
        gradient: "from-purple-500 to-violet-500",
        text: "text-purple-400",
        label: "Planning",
        icon: "◑",
        glow: "shadow-purple-500/50",
      },
    };
    return (
      configs[status] || {
        gradient: "from-blue-500 to-cyan-500",
        text: "text-blue-400",
        label: "Unknown",
        icon: "●",
        glow: "shadow-blue-500/50",
      }
    );
  };

  const getComplexityConfig = (complexity: string) => {
    const configs: Record<
      string,
      { gradient: string; text: string; bars: number }
    > = {
      beginner: {
        gradient: "from-emerald-400 to-green-500",
        text: "text-emerald-400",
        bars: 1,
      },
      intermediate: {
        gradient: "from-amber-400 to-orange-500",
        text: "text-amber-400",
        bars: 2,
      },
      advanced: {
        gradient: "from-rose-400 to-red-500",
        text: "text-rose-400",
        bars: 3,
      },
    };
    return (
      configs[complexity] || {
        gradient: "from-blue-400 to-cyan-500",
        text: "text-blue-400",
        bars: 1,
      }
    );
  };

  const statusConfig = getStatusConfig(project.status);
  const complexityConfig = getComplexityConfig(project.complexity);

  const githubUrl = project.links?.github;
  const liveUrl = project.links?.live;

  // Card click goes to GitHub (source code)
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (githubUrl) {
      window.open(githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Compact Card View
  if (compact) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          delay: index * 0.08,
          duration: 0.4,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{ scale: 1.05, y: -8 }}
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
          className={`group h-full relative overflow-hidden border transition-all duration-500 cursor-pointer
            ${
              isActive
                ? "border-primary shadow-2xl shadow-primary/30 bg-linear-to-br from-card via-card/95 to-primary/5"
                : "border-border/50 bg-card/80 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20"
            } backdrop-blur-xl`}
          onClick={handleCardClick}
          role="article"
          aria-label={`${project.title} project - click to view source code`}>
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start pointer-events-none">
            <Badge
              className={`bg-linear-to-r ${statusConfig.gradient} text-white border-0 text-[10px] px-2.5 py-1 font-semibold shadow-lg ${statusConfig.glow} backdrop-blur-sm`}>
              <span className="animate-pulse mr-1">{statusConfig.icon}</span>
              {statusConfig.label}
            </Badge>
            {project.featured && (
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}>
                <Badge className="bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 text-white border-0 p-1.5 shadow-xl shadow-orange-500/50">
                  <Sparkles className="w-3.5 h-3.5" />
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden bg-linear-to-br from-primary/10 via-muted to-primary/5">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}>
                  <Zap className="w-8 h-8 text-primary/40" />
                </motion.div>
              </div>
            )}
            {project.image && !imageError ? (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/5 to-primary/20">
                <Code2 className="w-8 h-8 text-primary/50" />
              </div>
            ) : null}

            {/* Hover Overlay with GitHub Icon */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent backdrop-blur-sm flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}>
                    <FaGithub className="w-12 h-12 text-white mb-2" />
                  </motion.div>
                  <p className="text-white text-xs font-bold tracking-wide">
                    VIEW SOURCE CODE
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-4 relative">
            <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors mb-1.5">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground/80 line-clamp-2 mb-3 leading-relaxed">
              {project.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[11px]">
                <span
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                  title="Views">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="font-medium">
                    {project.views.toLocaleString()}
                  </span>
                </span>
                <span
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-yellow-500 transition-colors"
                  title="Rating">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{project.rating}</span>
                </span>
              </div>
              {liveUrl && (
                <Button
                  size="sm"
                  className="h-7 px-2.5 gap-1.5 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 text-[11px] pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(liveUrl, "_blank", "noopener,noreferrer");
                  }}>
                  <ExternalLink className="w-3 h-3" />
                  Live
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Full/Regular Card View
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 80,
      }}
      whileHover={{ y: -12, scale: 1.02 }}
      onMouseEnter={() => {
        setIsHovered(true);
        setActiveProject(project.id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveProject(null);
      }}
      className="relative h-full group">
      {/* Glowing Border Effect */}
      <div
        className={`absolute -inset-px bg-linear-to-r ${statusConfig.gradient} rounded-xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500`}
      />

      <Card
        className={`relative overflow-hidden transition-all duration-500 h-full flex flex-col cursor-pointer
          ${
            isActive
              ? "border-primary/60 bg-linear-to-br from-card via-card/95 to-primary/5 shadow-2xl shadow-primary/30"
              : "border-border/50 bg-card/80 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20"
          } backdrop-blur-xl`}
        role="article"
        aria-label={`${project.title} - click to view source code`}
        onClick={handleCardClick}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: index * 0.1 + 0.3,
            }}
            className="absolute top-4 right-4 z-20">
            <Badge className="bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 text-white border-0 text-[11px] px-3 py-1.5 flex items-center gap-1.5 shadow-xl shadow-orange-500/50 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-bold">Featured</span>
            </Badge>
          </motion.div>
        )}

        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden bg-linear-to-br from-primary/10 via-muted to-primary/5">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}>
                <Zap className="w-12 h-12 text-primary/40" />
              </motion.div>
            </div>
          )}
          {project.image && !imageError ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/5 to-primary/20">
              <Code2 className="w-16 h-16 text-primary/50" />
            </div>
          ) : null}

          {/* Status Badge on Image */}
          <div className="absolute top-4 left-4">
            <Badge
              className={`bg-linear-to-r ${statusConfig.gradient} text-white border-0 text-[11px] font-bold uppercase px-3 py-1.5 shadow-xl ${statusConfig.glow} backdrop-blur-sm`}>
              <span className="animate-pulse mr-1.5 text-sm">
                {statusConfig.icon}
              </span>
              {statusConfig.label}
            </Badge>
          </div>

          {/* Hover Overlay with GitHub */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent backdrop-blur-[2px] flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                  className="mb-3">
                  <FaGithub className="w-16 h-16 text-white drop-shadow-2xl" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-sm font-bold tracking-wider mb-1">
                  VIEW SOURCE CODE
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/70 text-xs">
                  Click anywhere to explore
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col grow relative">
          {/* Title & Description */}
          <div className="mb-5">
            <h3 className="font-bold text-2xl mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-primary/60 transition-all duration-300">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-muted-foreground/90 line-clamp-1 italic mb-2.5 font-medium">
                {project.subtitle}
              </p>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech?.slice(0, 5).map((tech, idx) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}>
                <Badge
                  variant="secondary"
                  className="text-[11px] px-3 py-1 bg-linear-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/15 transition-all duration-300 font-medium">
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.tech && project.tech.length > 5 && (
              <Badge
                variant="secondary"
                className="text-[11px] px-3 py-1 bg-muted text-muted-foreground border border-border/50">
                +{project.tech.length - 5} more
              </Badge>
            )}
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-border/50">
            <div className="flex items-center gap-3 group/stat">
              <div className="p-2 rounded-lg bg-primary/10 group-hover/stat:bg-primary/20 transition-colors">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Views</p>
                <p className="text-lg font-bold text-foreground">
                  {project.views.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 group/stat">
              <div className="p-2 rounded-lg bg-yellow-500/10 group-hover/stat:bg-yellow-500/20 transition-colors">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rating</p>
                <p className="text-lg font-bold text-foreground">
                  {project.rating}/5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 group/stat">
              <div className="p-2 rounded-lg bg-blue-500/10 group-hover/stat:bg-blue-500/20 transition-colors">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-bold text-foreground">
                  {project.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 group/stat">
              <div
                className={`p-2 rounded-lg bg-linear-to-br ${complexityConfig.gradient} bg-opacity-10`}>
                <Activity className={`w-5 h-5 ${complexityConfig.text}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Level</p>
                <p
                  className={`text-sm font-bold uppercase tracking-wide ${complexityConfig.text}`}>
                  {project.complexity}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          {(project.teamSize || project.contributions || project.metric) && (
            <div className="flex flex-wrap gap-4 mb-5 text-xs">
              {project.teamSize && (
                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">{project.teamSize} Team</span>
                </div>
              )}
              {project.contributions && (
                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <GitCommit className="w-4 h-4" />
                  <span className="font-medium">
                    {project.contributions} Commits
                  </span>
                </div>
              )}
              {project.metric && (
                <div className="flex items-center gap-2 text-primary/90 hover:text-primary transition-colors">
                  <Award className="w-4 h-4" />
                  <span className="font-semibold">{project.metric}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto relative z-10">
            <Button
              size="lg"
              className="flex-1 gap-2.5 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 font-semibold text-base disabled:opacity-40 pointer-events-auto"
              disabled={!githubUrl}
              onClick={(e) => {
                e.stopPropagation();
                if (githubUrl)
                  window.open(githubUrl, "_blank", "noopener,noreferrer");
              }}
              aria-label={`View ${project.title} source code`}>
              <FaGithub className="w-5 h-5" />
              Source Code
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex-1 gap-2.5 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 font-semibold text-base group/btn disabled:opacity-40 pointer-events-auto"
              disabled={!liveUrl}
              onClick={(e) => {
                e.stopPropagation();
                if (liveUrl)
                  window.open(liveUrl, "_blank", "noopener,noreferrer");
              }}
              aria-label={`View ${project.title} live demo`}>
              <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              Live Demo
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
