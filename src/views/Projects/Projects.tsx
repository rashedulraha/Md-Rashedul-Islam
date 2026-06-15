"use client";

import { useState, useEffect, useMemo } from "react";

// Components
import ProjectHeader from "./ProjectHeader";

import FooterCTA from "./FooterCTA";
import Navbar from "../shared/Navbar/Navbar";

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
import Responsive from "../Responsive/Responsive";

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

  return (
    <div className="relative min-h-screen">
      <CommonBg />
      <Navbar />
      <Responsive>
        <main className="relative z-10">
          <ProjectHeader />
          <FeaturedProjects />
          <FooterCTA />
        </main>
      </Responsive>
    </div>
  );
}
