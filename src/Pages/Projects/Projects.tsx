import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Components Import
import ProjectHeader from "./ProjectHeader";
import ProjectFilters from "./ProjectFilters";
import TechCloud from "./TechCloud";
import FooterCTA from "./FooterCTA";
import ProjectStats from "./ ProjectStats";

// Shared Components
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import ProjectCard from "@/components/projectCard/ProjectCard";

// Types & Hooks
import type {
  Project,
  ProjectCategory,
  ComplexityLevel,
} from "@/Routes/Types/projectType";
import { useLenis } from "@/Hooks/useLenis";

export default function Projects() {
  // --- STATES ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all");
  const [selectedComplexity, setSelectedComplexity] =
    useState<ComplexityLevel>("all");
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useLenis();

  // --- DATA LOADING ---
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
            category: item.category || "web",
            status: item.status || "live",
            views: item.views || Math.floor(Math.random() * 2000) + 500,
            rating: item.rating || (Math.random() * 1.5 + 3.5).toFixed(1),
            complexity: item.complexity || "intermediate",
            duration:
              item.duration || `${Math.floor(Math.random() * 4) + 1} months`,
            date:
              item.date ||
              `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
            tags: item.tags || item.tech,
            teamSize: item.teamSize || Math.floor(Math.random() * 4) + 1,
            contributions:
              item.contributions || Math.floor(Math.random() * 150) + 20,
          }),
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

  // --- FILTER LOGIC ---
  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          project.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory,
      );
    }

    if (selectedComplexity !== "all") {
      filtered = filtered.filter(
        (project) => project.complexity === selectedComplexity,
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedCategory, selectedComplexity]);

  // --- HELPERS ---
  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString();
  };

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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedComplexity("all");
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <Animation />
      </div>
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        {/* 1. Header Component */}
        <ProjectHeader />

        {/* 2. Search & Filter Component */}
        <ProjectFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedComplexity={selectedComplexity}
          setSelectedComplexity={setSelectedComplexity}
        />

        {/* 3. Stats Component */}
        <ProjectStats projects={projects} />

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

        {/* 4. Tech Cloud Component */}
        <TechCloud projects={projects} />

        {/* 5. Footer CTA Component */}
        <FooterCTA />
      </main>
    </div>
  );
}
