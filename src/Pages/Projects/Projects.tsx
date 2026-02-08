import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Components
import ProjectHeader from "./ProjectHeader";
import ProjectFilters from "./ProjectFilters";
import TechCloud from "./TechCloud";
import FooterCTA from "./FooterCTA";
import ProjectStats from "./ ProjectStats";
import Navbar from "../shared/Navbar/Navbar";

import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";

// Hooks & Types
import { useLenis } from "@/Hooks/useLenis";
import type {
  Project,
  ProjectCategory,
  ComplexityLevel,
} from "@/Routes/Types/projectType";
import ProjectCard from "./ProjectCard";

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

  useLenis();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch("/projects.json");
        const data = await res.json();
        const transformedData: Project[] = data.map(
          (item: any, index: number) => ({
            ...item,
            id: item.id || `project-${index}`,
            category: item.category || "web",
            status: item.status || "live",
            complexity: item.complexity || "intermediate",
            tags: item.tags || item.tech,
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

  useEffect(() => {
    let filtered = projects;
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tech.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (selectedComplexity !== "all") {
      filtered = filtered.filter((p) => p.complexity === selectedComplexity);
    }
    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedCategory, selectedComplexity]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedComplexity("all");
  };

  // --- RENDERING LOGIC USING IF-ELSE ---
  let mainContent;

  if (loading) {
    mainContent = (
      <motion.div
        key="loading"
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="p-6 animate-pulse bg-card/20 backdrop-blur-sm border-border/40 h-64"
          />
        ))}
      </motion.div>
    );
  } else if (filteredProjects.length > 0) {
    mainContent = (
      <motion.div
        key="projects"
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            activeProject={activeProject}
            setActiveProject={setActiveProject}
          />
        ))}
      </motion.div>
    );
  } else {
    mainContent = (
      <motion.div
        key="no-results"
        className="flex flex-col items-center justify-center py-20">
        <Card className="p-12 text-center bg-card/20 backdrop-blur-sm border-border/40 max-w-md">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No matching projects</h3>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <AnimatedGridBackground />
      </div>
      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <ProjectHeader />
        <ProjectFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedComplexity={selectedComplexity}
          setSelectedComplexity={setSelectedComplexity}
        />
        <ProjectStats projects={projects} />

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">
            {filteredProjects.length} Projects Found
          </h3>
          <Badge variant="secondary" className="bg-primary/5 capitalize">
            {selectedCategory} • {selectedComplexity}
          </Badge>
        </div>

        <AnimatePresence mode="wait">{mainContent}</AnimatePresence>

        <TechCloud projects={projects} />
        <FooterCTA />
      </main>
    </div>
  );
}
