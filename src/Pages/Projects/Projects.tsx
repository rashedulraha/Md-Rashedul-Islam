import { useState, useEffect } from "react";
import {
  Code,
  Search,
  ChevronRight,
  Globe,
  GitBranch,
  Zap,
  ShieldCheck,
  Layers,
  Server,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import type {
  ComplexityLevel,
  Project,
  ProjectCategory,
} from "@/Routes/Types/projectType";
import { useLenis } from "@/Hooks/useLenis";
import ProjectCard from "@/components/projectCard/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all");
  const [selectedComplexity, setSelectedComplexity] =
    useState<ComplexityLevel>("all");
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  //! awesome scroll animation
  useLenis();

  // Load projects data
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch("/projects.json");
        const data = await res.json();

        // Transform data to match the Project interface
        const transformedData: Project[] = data.map(
          (item: Record<string, unknown>, index: number) => ({
            ...item,
            id: item.id || `project-${index}`,
            category: item.category || "web", // Default to "web" if not provided
            status: item.status || "live", // Default to "live" if not provided
            views: item.views || Math.floor(Math.random() * 2000) + 500, // Random views if not provided
            rating: item.rating || (Math.random() * 1.5 + 3.5).toFixed(1), // Random rating if not provided
            complexity: item.complexity || "intermediate", // Default to "intermediate" if not provided
            duration:
              item.duration || `${Math.floor(Math.random() * 4) + 1} months`, // Random duration if not provided
            date:
              item.date ||
              `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(
                2,
                "0"
              )}-${String(Math.floor(Math.random() * 28) + 1).padStart(
                2,
                "0"
              )}`, // Random date if not provided
            tags: item.tags || item.tech, // Use tech as tags if not provided
            teamSize: item.teamSize || Math.floor(Math.random() * 4) + 1, // Random team size if not provided
            contributions:
              item.contributions || Math.floor(Math.random() * 150) + 20, // Random contributions if not provided
          })
        );

        setProjects(transformedData);
        setFilteredProjects(transformedData);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects based on search, category and complexity
  useEffect(() => {
    let filtered = projects;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          project.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Filter by complexity
    if (selectedComplexity !== "all") {
      filtered = filtered.filter(
        (project) => project.complexity === selectedComplexity
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedCategory, selectedComplexity]);

  // Stats calculations
  const totalProjects = projects.length;
  const liveProjects = projects.filter((p) => p.status === "live").length;

  // Format number with K suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString();
  };

  // Get status color
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "live":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "development":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "archived":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // Get complexity color
  const getComplexityColor = (complexity: Project["complexity"]) => {
    switch (complexity) {
      case "beginner":
        return "bg-green-500/10 text-green-600";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-600";
      case "advanced":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedComplexity("all");
  };

  // Get category icon
  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case "web":
        return <Globe className="h-4 w-4" />;
      case "mobile":
        return <Layers className="h-4 w-4" />;
      case "fullstack":
        return <Server className="h-4 w-4" />;
      case "opensource":
        return <GitBranch className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500">
      {/* Subtle Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <Animation />
      </div>
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        {/* --- HEADER SECTION --- */}
        <header className="max-w-4xl mb-12 sm:mb-20 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.4em]">
            <span className="w-6 sm:w-12 h-[1.5px] bg-primary" />
            <span>Project Portfolio // 2026 </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
            Professional <br />
            <span className="text-muted-foreground italic font-serif lowercase font-light">
              Project Showcase.
            </span>
          </motion.h1>

          {/* Core Skills Badges for HR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 pt-2">
            {[
              "Full-Stack Development",
              "UI/UX Design",
              "API Integration",
              "Performance Optimization",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-[9px] font-bold border border-border rounded-full bg-muted/20 text-muted-foreground uppercase tracking-wider">
                {skill}
              </span>
            ))}
          </motion.div>
        </header>

        {/* --- SEARCH AND FILTER SECTION --- */}
        <div className="mb-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, technologies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-card/20 backdrop-blur-sm border-border/40 focus:border-primary/50 transition-all"
            />
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "all",
                    "web",
                    "mobile",
                    "fullstack",
                    "opensource",
                  ] as ProjectCategory[]
                ).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
                      selectedCategory === category
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}>
                    {selectedCategory === category && (
                      <motion.div
                        layoutId="active-category-pill"
                        className="absolute inset-0 bg-primary rounded-xl z-0 shadow-lg shadow-primary/20"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10 uppercase tracking-widest flex items-center gap-2">
                      {getCategoryIcon(category)}
                      {category === "all" ? "All" : category}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Complexity
              </h3>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "all",
                    "beginner",
                    "intermediate",
                    "advanced",
                  ] as ComplexityLevel[]
                ).map((complexity) => (
                  <button
                    key={complexity}
                    onClick={() => setSelectedComplexity(complexity)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
                      selectedComplexity === complexity
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}>
                    {selectedComplexity === complexity && (
                      <motion.div
                        layoutId="active-complexity-pill"
                        className="absolute inset-0 bg-primary rounded-xl z-0 shadow-lg shadow-primary/20"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10 uppercase tracking-widest">
                      {complexity === "all" ? "All" : complexity}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- STATS SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 bg-card/20 backdrop-blur-sm border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-bold text-lg">{totalProjects}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card/20 backdrop-blur-sm border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Globe className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Live</p>
                <p className="font-bold text-lg">{liveProjects}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card/20 backdrop-blur-sm border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Zap className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="font-bold text-lg">
                  {projects.filter((p) => p.status === "development").length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card/20 backdrop-blur-sm border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <ShieldCheck className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Featured</p>
                <p className="font-bold text-lg">
                  {projects.filter((p) => p.featured).length}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* --- RESULTS HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}>
            <h3 className="text-xl font-bold">
              {filteredProjects.length} Project
              {filteredProjects.length !== 1 ? "s" : ""} Found
            </h3>
            <p className="text-sm text-muted-foreground">Sorted by recency</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}>
            <Badge variant="secondary" className="bg-primary/5">
              {selectedCategory !== "all" ? selectedCategory : "All Categories"}
              {selectedComplexity !== "all" && ` • ${selectedComplexity}`}
            </Badge>
          </motion.div>
        </div>

        {/* --- PROJECTS GRID --- */}
        <AnimatePresence mode="wait">
          {loading ? (
            // Loading Skeleton
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card
                  key={i}
                  className="p-6 animate-pulse bg-card/20 backdrop-blur-sm border-border/40">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="h-8 bg-muted rounded w-20"></div>
                      <div className="h-8 bg-muted rounded w-20"></div>
                    </div>
                    <div className="h-8 bg-muted rounded w-24"></div>
                  </div>
                </Card>
              ))}
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              key="projects"
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  getStatusColor={getStatusColor}
                  getComplexityColor={getComplexityColor}
                  formatNumber={formatNumber}
                  activeProject={activeProject}
                  setActiveProject={setActiveProject}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-20">
              <Card className="p-12 text-center bg-card/20 backdrop-blur-sm border-border/40 max-w-md">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No matching projects</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or filters
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- TECHNOLOGY CLOUD --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-20 space-y-6">
          <h3 className="text-xl font-bold">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(projects.flatMap((p) => p.tech)))
              .slice(0, 20)
              .map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 text-sm bg-card/20 backdrop-blur-sm border border-border/40 rounded-full hover:border-primary/50 hover:text-primary transition-colors">
                  {tech}
                </motion.span>
              ))}
          </div>
        </motion.div>

        {/* --- RESPONSIVE FOOTER (Quick Action) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 sm:mt-32 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-border/50 bg-card/5 backdrop-blur-xl flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
              Interested in my{" "}
              <span className="text-primary italic">work?</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Let's discuss how I can contribute to your next project or
              collaboration opportunity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="px-10 py-4 text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              Get In Touch
            </Button>
            <Button
              variant="outline"
              className="px-10 py-4 text-[10px] font-black uppercase tracking-widest border border-border hover:bg-muted/50 rounded-2xl transition-all flex items-center justify-center gap-2">
              View GitHub <ChevronRight size={14} />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
