"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  X,
  ExternalLink,
  Github,
  Monitor,
  TrendingUp,
  Box,
  Calendar,
  Star,
  Users,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

// ─── INTERFACES ───
interface ProjectLinks {
  live: string;
  github: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDesc?: string;
  image: string;
  screenshots?: string[];
  architecture?: string;
  category: string;
  status: string;
  tech: string[];
  links: ProjectLinks;
  views: number;
  rating: number;
  complexity: string;
  duration: string;
  date: string;
  tags: string[];
  challenges?: string;
  teamSize: number;
  contributions: number;
  metric: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

// ─── PROJECT CARD COMPONENT ───
function ProjectCard({
  project,
  layoutClass,
  onClick,
}: {
  project: Project;
  layoutClass?: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 hover:border-sky-500/30 transition-all duration-300 ${layoutClass}`}
      onClick={onClick}>
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="space-y-2">
          <Badge className="w-fit bg-sky-500/10 backdrop-blur-md text-sky-400 border-sky-500/20 text-[10px] px-2 py-0.5 uppercase tracking-wider">
            {project.subtitle}
          </Badge>

          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {project.title}
          </h3>

          <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{project.metric}</span>
          </div>

          <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.description}
          </p>
        </div>

        <div className="absolute top-6 right-6 p-2 bg-black/60 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2.5 group-hover:translate-y-0 border border-white/10">
          <ArrowRight className="w-4 h-4 text-sky-400" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROJECT MODAL WITH LENIS SCROLL FIX ───
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "architecture" | "gallery"
  >("overview");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window Wrapper with 'data-lenis-prevent' to bypass Lenis Interception */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          data-lenis-prevent="true"
          className="relative w-full max-w-4xl bg-[#0c0c0e] border border-white/10 rounded-3xl shadow-2xl overflow-y-auto flex flex-col max-h-[85vh] z-10">
          {/* Cover Header */}
          <div className="relative h-[25vh] md:h-[35vh] w-full flex-shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all">
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-6 left-6 md:left-10">
              <Badge className="mb-2 bg-sky-600 text-white border-0 text-xs px-2.5 py-0.5">
                Case Study
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                {project.title}
              </h2>
              <p className="text-sm text-gray-400 font-mono mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-10 flex-1 bg-[#0c0c0e]">
            {/* Tabs Navigation */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl w-fit mb-6 border border-white/5">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${activeTab === "overview" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}>
                Overview
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${activeTab === "architecture" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}>
                System Architecture
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${activeTab === "gallery" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}>
                Gallery / Specs
              </button>
            </div>

            <div className="min-h-[250px]">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      About the Project
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {project.longDesc || project.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-white/5 border-white/5 text-gray-300 px-2.5 py-1 text-xs rounded-md">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.challenges && (
                      <div className="bg-orange-500/[0.03] border border-orange-500/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-orange-400 mb-1.5">
                          <AlertCircle className="w-4 h-4" />
                          <h4 className="text-xs font-bold uppercase tracking-wider">
                            Challenges & Bottlenecks
                          </h4>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {project.challenges}
                        </p>
                      </div>
                    )}
                    <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
                        <TrendingUp className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">
                          Core Operational Metric
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {project.metric}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                    {project.links.live && (
                      <Button
                        asChild
                        className="bg-white text-black hover:bg-neutral-200 h-11 rounded-xl font-medium flex-1 justify-center text-xs">
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer">
                          <ExternalLink className="w-3.5 h-3.5 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button
                        variant="outline"
                        asChild
                        className="h-11 rounded-xl border-white/10 hover:bg-white/5 text-white flex-1 justify-center text-xs">
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer">
                          <Github className="w-3.5 h-3.5 mr-2" />
                          GitHub Repo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ARCHITECTURE */}
              {activeTab === "architecture" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-400">
                  <h3 className="text-base font-semibold text-white">
                    System & Folder Architecture
                  </h3>
                  <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/5 min-h-[180px] flex items-center justify-center">
                    {project.architecture ? (
                      <div className="text-center space-y-2">
                        <Box className="w-10 h-10 text-sky-400 mx-auto opacity-80" />
                        <p className="text-sm font-mono text-neutral-300 max-w-xl leading-relaxed">
                          {project.architecture}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-500">
                        No custom architecture mapping defined for this build.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: GALLERY & ANALYTICS */}
              {activeTab === "gallery" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
                  <div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Metrics Analytics
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 bg-white/[0.02] rounded-xl">
                        <p className="text-[10px] text-neutral-500">
                          Complexity
                        </p>
                        <p className="text-sm font-bold text-white uppercase mt-0.5">
                          {project.complexity}
                        </p>
                      </div>
                      <div className="p-3 bg-white/[0.02] rounded-xl">
                        <p className="text-[10px] text-neutral-500">Duration</p>
                        <p className="text-sm font-bold text-white mt-0.5">
                          {project.duration}
                        </p>
                      </div>
                      <div className="p-3 bg-white/[0.02] rounded-xl">
                        <p className="text-[10px] text-neutral-500">
                          Team Size
                        </p>
                        <p className="text-sm font-bold text-white mt-0.5">
                          {project.teamSize} Member(s)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">
                      Project Previews
                    </h3>
                    <div className="flex overflow-x-auto gap-4 pb-2 snap-x scrollbar-thin">
                      {(project.screenshots || [project.image]).map(
                        (img, i) => (
                          <div
                            key={i}
                            className="min-w-[280px] md:min-w-[360px] snap-center rounded-xl overflow-hidden border border-white/10 aspect-video">
                            <img
                              src={img}
                              alt={`Preview ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── MAIN COMPONENT FETCHING LOCAL JSON ───
export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] w-full flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <>
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-150 h-150 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center md:text-left">
            <Badge className="mb-4 bg-white/10 border-white/5 text-white px-3 py-1 text-xs">
              Portfolio Showcase
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
              Featured Projects
            </h2>
            <p className="text-neutral-400 text-base md:text-lg max-w-2xl">
              A curated selection of full-stack web applications and real-world
              digital products developed by me.
            </p>
          </motion.div>

          {/* BENTO GRID STRUCTURE */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
            {/* Project 1: Hero (2x2 Layout) */}
            {projects[0] && (
              <ProjectCard
                project={projects[0]}
                layoutClass="md:col-span-2 md:row-span-2"
                onClick={() => setSelectedProject(projects[0])}
              />
            )}

            {/* Project 2: Standard (1x1 Layout) */}
            {projects[1] && (
              <ProjectCard
                project={projects[1]}
                layoutClass="md:col-span-1 md:row-span-1"
                onClick={() => setSelectedProject(projects[1])}
              />
            )}

            {/* Project 3: Standard (1x1 Layout) */}
            {projects[2] && (
              <ProjectCard
                project={projects[2]}
                layoutClass="md:col-span-1 md:row-span-1"
                onClick={() => setSelectedProject(projects[2])}
              />
            )}

            {/* Project 4: Wide (2x1 Layout) */}
            {projects[3] && (
              <ProjectCard
                project={projects[3]}
                layoutClass="md:col-span-2 md:row-span-1"
                onClick={() => setSelectedProject(projects[3])}
              />
            )}

            {/* Project 5: Standard (1x1 Layout) */}
            {projects[4] && (
              <ProjectCard
                project={projects[4]}
                layoutClass="md:col-span-1 md:row-span-1"
                onClick={() => setSelectedProject(projects[4])}
              />
            )}

            {/* Project 6: Wide (2x1 Layout) */}
            {projects[5] && (
              <ProjectCard
                project={projects[5]}
                layoutClass="md:col-span-2 md:row-span-1"
                onClick={() => setSelectedProject(projects[5])}
              />
            )}

            {/* Project 7: Standard (1x1 Layout) */}
            {projects[6] && (
              <ProjectCard
                project={projects[6]}
                layoutClass="md:col-span-1 md:row-span-1"
                onClick={() => setSelectedProject(projects[6])}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Render Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
