"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Star,
  Clock,
  Users,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  status: string;
  tech: string[];
  links: { live: string; github: string };
  views: number;
  rating: number;
  duration: string;
  teamSize: number;
  metric: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchInput.trim()) {
      const query = searchInput.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tech.some((t) => t.toLowerCase().includes(query)),
      );
    }
    return filtered;
  }, [selectedCategory, searchInput, projects]);

  const categories = useMemo(() => {
    return ["all", ...new Set(projects.map((p) => p.category))];
  }, [projects]);

  if (loading) {
    return (
      <section className="bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-2 border-border rounded-2xl bg-card overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-16 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            Featured Projects
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            A curated selection of full-stack web applications and real-world
            digital products.
          </p>
        </motion.div>

        {/* Search + Filter Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-2 border-border rounded-2xl bg-card overflow-hidden mb-8">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title, tech, or description..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-muted/30 border border-border focus:outline-none focus:border-primary/40 transition-colors text-sm text-foreground placeholder:text-muted-foreground"
                aria-label="Search projects"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}>
                  {category === "all" ? "All Projects" : category}
                </button>
              ))}
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Found {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-2 border-border rounded-2xl bg-card overflow-hidden hover:border-primary/40 transition-colors group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-xs px-2.5 py-0.5 font-semibold">
                      {project.category}
                    </Badge>
                    {index === 0 && (
                      <Badge className="bg-linear-to-r from-yellow-400 to-amber-500 text-yellow-950 border-0 text-xs px-2.5 py-0.5 font-bold">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{project.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{project.teamSize}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-xs rounded bg-muted border border-border text-foreground">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary border border-primary/20">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-semibold">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-card border-2 border-primary/30 hover:border-primary text-primary transition-colors text-xs font-semibold">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="border-2 border-border rounded-2xl bg-card p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filter
            </p>
            <button
              onClick={() => {
                setSearchInput("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
