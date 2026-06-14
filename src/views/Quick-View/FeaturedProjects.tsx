"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  X,
  ExternalLink,
  Github,
  Layers,
  Star,
} from "lucide-react";
import { featuredProjects } from "./Data/quickViewData";
import { useState } from "react";
import Link from "next/link";

// Type definition
interface Project {
  title: string;
  desc: string;
  longDesc?: string;
  gradient?: string; // Kept for fallback if needed
  image: string; // Now expecting Unsplash URL
  tech: string;
  github?: string;
  live?: string;
  stats: string;
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

// ─── Professional Project Modal ───
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-10">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all duration-300 border border-white/10">
                <X className="w-5 h-5" />
              </button>

              {/* Split Layout: Image Left | Content Right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                {/* Left: Large Image Showcase */}
                <div className="relative h-64 lg:h-auto bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] to-transparent lg:bg-gradient-to-r" />

                  {/* Floating Badge on Image */}
                  <div className="absolute bottom-6 left-6 z-10">
                    <Badge className="bg-primary text-white border-0 px-3 py-1 shadow-lg shadow-primary/25">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      Featured
                    </Badge>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground font-mono text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {project.stats}
                    </p>
                  </div>

                  <div className="mb-8 space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {project.longDesc || project.desc}
                    </p>

                    {/* Features List (Visual filler for better look) */}
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Highlights
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span>High-performance architecture</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span>Modern responsive UI/UX</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span>Scalable backend integration</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5" /> Technology
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(",").map((t, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-white/5 border-white/10 text-xs px-3 py-1 rounded-md hover:bg-white/10 transition-colors">
                          {t.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                    {project.live && (
                      <Button
                        asChild
                        className="bg-primary hover:bg-primary/90 text-white h-11 rounded-lg font-medium flex-1 justify-center">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Preview
                        </a>
                      </Button>
                    )}

                    {project.github && (
                      <Button
                        variant="outline"
                        asChild
                        className="h-11 rounded-lg border-white/20 hover:bg-white/5 hover:text-white flex-1 justify-center">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───
export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section className="py-24 relative overflow-hidden bg-muted/10">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1 text-xs rounded-full border-white/10 bg-white/5 text-slate-300">
              Selected Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              Exploring the intersection of design and engineering through
              real-world applications.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {featuredProjects.map((project, idx) => (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <Card className="group relative h-full flex flex-col border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                  {/* Unsplash Image Area */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={
                        typeof project.image === "string"
                          ? project.image
                          : "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />

                    {/* Hover Overlay for CTA */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        size="sm"
                        onClick={() =>
                          setSelectedProject(project as unknown as Project)
                        }
                        className="bg-white text-black hover:bg-gray-200 rounded-full px-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-3 pt-5 px-6">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg font-bold text-white leading-tight">
                        {project.title}
                      </CardTitle>
                      {project.live && (
                        <Link
                          href={`${project.live}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                    <div className="mt-2">
                      <Badge
                        variant="secondary"
                        className="bg-white/5 border-white/10 text-[10px] px-2 py-0.5 rounded">
                        {project.tech.split(",")[0].trim()}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 px-6 pb-6 grow">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex items-center text-xs text-muted-foreground font-mono mt-auto border-t border-white/5 pt-3">
                      <span>{project.stats}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
