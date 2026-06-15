"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

// Components
import ProjectHeader from "./ProjectHeader";
import ProjectFilters from "./ProjectFilters";
import TechCloud from "./TechCloud";
import FooterCTA from "./FooterCTA";
import Navbar from "../shared/Navbar/Navbar";

import ProjectCard from "./ProjectCard";

// Types
import type {
  Project,
  ProjectCategory,
  ComplexityLevel,
  ProjectStatus,
} from "@/Routes/Types/projectType";
import ProjectStats from "./ ProjectStats";
import { useLenis } from "@/Hooks/useLenis";
import CommonBg from "@/components/CommonBg/CommonBg";
import FeaturedProjects from "../Quick-View/FeaturedProjects";

// JSON Data Structure Interface
interface RawProject {
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
  complexity: string;
  duration: string;
  date: string;
  tags: string[];
  teamSize: number;
  contributions: number;
  metric: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
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
        const data: RawProject[] = await res.json();

        const transformedData: Project[] = data.map((item) => ({
          ...item,
          category: item.category as ProjectCategory,
          status: item.status as ProjectStatus,
          complexity: item.complexity as Exclude<ComplexityLevel, "all">,
          featured: item.views > 1000,
        }));

        setProjects(transformedData);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const matchesComplexity =
        selectedComplexity === "all" ||
        project.complexity === selectedComplexity;
      return matchesSearch && matchesCategory && matchesComplexity;
    });
  }, [projects, searchQuery, selectedCategory, selectedComplexity]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedComplexity("all");
  };

  return (
    <div className="relative min-h-screen  ">
      <CommonBg />
      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-20">
        <ProjectHeader />
        <FeaturedProjects />

        <FooterCTA />
      </main>
    </div>
  );
}
