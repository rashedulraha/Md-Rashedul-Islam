import { useState, useEffect } from "react";
import {
  ExternalLink,
  CircleDot,
  Code,
  Eye,
  Star,
  Clock,
  Search,
  ChevronRight,
  Users,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import { FaGithub } from "react-icons/fa";
import type {
  ComplexityLevel,
  Project,
  ProjectCategory,
} from "@/Routes/Types/projectType";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all");
  const [selectedComplexity, setSelectedComplexity] =
    useState<ComplexityLevel>("all");
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground container mx-auto">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <Navbar />

      {/* MOBILE/TABLET VIEW */}
      <div className="lg:hidden">
        <main className="relative z-10 pt-20 pb-8 px-4">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-primary font-mono text-xs uppercase tracking-wider">
                  PROJECT_PORTFOLIO
                </h2>
                <h1 className="text-3xl font-black tracking-tight mt-1">
                  Featured <span className="text-primary">Projects</span>
                </h1>
              </div>
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary border-primary/20">
                {totalProjects} Projects
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm">
              Curated collection of professional projects built with modern
              technologies
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm"
              />
            </div>

            {/* Filter Tabs */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs">
                  All
                </Button>
                <Button
                  variant={selectedCategory === "web" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("web")}
                  className="text-xs">
                  Web
                </Button>
                <Button
                  variant={
                    selectedCategory === "fullstack" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory("fullstack")}
                  className="text-xs">
                  Full Stack
                </Button>
                <Button
                  variant={
                    selectedCategory === "opensource" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory("opensource")}
                  className="text-xs">
                  Open Source
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="p-3 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-primary/10">
                  <Code className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-bold">{totalProjects}</p>
                </div>
              </div>
            </Card>
            <Card className="p-3 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-green-500/10">
                  <Globe className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Live</p>
                  <p className="font-bold">{liveProjects}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Projects Grid */}
          <div className="space-y-4">
            {loading ? (
              // Loading Skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-4 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="flex gap-2 mb-3">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                </Card>
              ))
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCardMobile
                  key={project.id}
                  project={project}
                  index={index}
                  getStatusColor={getStatusColor}
                  getComplexityColor={getComplexityColor}
                  formatNumber={formatNumber}
                />
              ))
            ) : (
              <Card className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No projects found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4">
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <main className="relative z-10">
          <div className="flex h-[calc(100vh-5rem)] pt-16">
            {/* LEFT SIDE - Fixed Dashboard */}
            <div className="w-2/5 flex flex-col p-8 lg:p-12">
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <h2 className="text-primary font-mono text-sm uppercase tracking-wider">
                    PROJECT_PORTFOLIO
                  </h2>
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                    Professional <br />
                    <span className="text-primary">Projects</span>
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    A curated showcase of production-ready applications and
                    solutions
                  </p>
                </div>

                {/* Search and Filters */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects or technologies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Category</h3>
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
                        <Button
                          key={category}
                          variant={
                            selectedCategory === category
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="text-xs">
                          {category === "all"
                            ? "All"
                            : category.charAt(0).toUpperCase() +
                              category.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Complexity</h3>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "all",
                          "beginner",
                          "intermediate",
                          "advanced",
                        ] as ComplexityLevel[]
                      ).map((complexity) => (
                        <Button
                          key={complexity}
                          variant={
                            selectedComplexity === complexity
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedComplexity(complexity)}
                          className="text-xs">
                          {complexity === "all"
                            ? "All"
                            : complexity.charAt(0).toUpperCase() +
                              complexity.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technologies Cloud */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(projects.flatMap((p) => p.tech)))
                      .slice(0, 12)
                      .map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-sm bg-background/70 backdrop-blur-sm border rounded-full hover:border-primary/50 hover:text-primary transition-colors">
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-primary/10">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Projects
                        </p>
                        <p className="font-bold text-lg">{totalProjects}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-green-500/10">
                        <Globe className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Live Projects
                        </p>
                        <p className="font-bold text-lg">{liveProjects}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Scrollable Projects */}
            <div className="w-3/5 overflow-y-auto custom-scrollbar px-8 py-8">
              <div className="max-w-4xl mx-auto">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {filteredProjects.length} Project
                      {filteredProjects.length !== 1 ? "s" : ""} Found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sorted by recency
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/5">
                    {selectedCategory !== "all"
                      ? selectedCategory
                      : "All Categories"}
                    {selectedComplexity !== "all" && ` • ${selectedComplexity}`}
                  </Badge>
                </div>

                {/* Projects Grid */}
                <div className="space-y-6">
                  {loading ? (
                    // Loading Skeletons
                    Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="p-6 animate-pulse">
                        <div className="flex justify-between mb-4">
                          <div>
                            <div className="h-5 bg-muted rounded w-48 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-32"></div>
                          </div>
                          <div className="h-8 bg-muted rounded w-20"></div>
                        </div>
                        <div className="h-4 bg-muted rounded w-full mb-4"></div>
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
                    ))
                  ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                      <ProjectCardDesktop
                        key={project.id}
                        project={project}
                        index={index}
                        getStatusColor={getStatusColor}
                        getComplexityColor={getComplexityColor}
                        formatNumber={formatNumber}
                      />
                    ))
                  ) : (
                    <Card className="p-12 text-center">
                      <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        No matching projects
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Try adjusting your search terms or filters
                      </p>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Mobile Project Card Component
interface ProjectCardMobileProps {
  project: Project;
  index: number;
  getStatusColor: (status: Project["status"]) => string;
  getComplexityColor: (complexity: Project["complexity"]) => string;
  formatNumber: (num: number) => string;
}

const ProjectCardMobile: React.FC<ProjectCardMobileProps> = ({
  project,
  index,
  getStatusColor,
  getComplexityColor,
  formatNumber,
}) => {
  return (
    <Card className="group relative bg-card/20 backdrop-blur-xl border-border/40 p-4 transition-all hover:bg-primary/3 hover:border-primary/50 overflow-hidden">
      {/* Background Number */}
      <span className="absolute -right-2 -top-2 text-4xl font-black text-primary/5 italic select-none">
        0{index + 1}
      </span>

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              className={`text-[10px] px-1.5 py-0.5 ${getStatusColor(
                project.status
              )}`}>
              {project?.status?.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
              {project.category}
            </Badge>
          </div>
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="flex items-center gap-1 bg-background/50 border border-border/50 px-2 py-1 rounded text-[10px] font-medium">
            <CircleDot className="h-1.5 w-1.5 text-primary" />
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="text-[10px] text-muted-foreground px-2 py-1">
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-primary/70" />
            <span className="text-xs font-medium">
              {formatNumber(project.views)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-primary/70" />
            <span className="text-xs font-medium">{project.rating}</span>
          </div>
          <Badge
            className={`text-[10px] px-1.5 py-0.5 ${getComplexityColor(
              project.complexity
            )}`}>
            {project.complexity}
          </Badge>
        </div>

        <div className="flex gap-1.5">
          <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
            <a href={project.links.github} target="_blank" rel="noreferrer">
              <FaGithub className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
            <a href={project.links.live} target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Desktop Project Card Component
interface ProjectCardDesktopProps {
  project: Project;
  index: number;
  getStatusColor: (status: Project["status"]) => string;
  getComplexityColor: (complexity: Project["complexity"]) => string;
  formatNumber: (num: number) => string;
}

const ProjectCardDesktop: React.FC<ProjectCardDesktopProps> = ({
  project,
  index,
  getStatusColor,
  getComplexityColor,
  formatNumber,
}) => {
  return (
    <Card className="group relative bg-card/20 backdrop-blur-xl border-border/40 p-6 transition-all hover:bg-primary/3 hover:border-primary/50 overflow-hidden hover:shadow-xl">
      {/* Background Decor */}
      <span className="absolute -right-4 -top-4 text-6xl font-black text-primary/5 italic select-none">
        0{index + 1}
      </span>

      {/* Main Content */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getStatusColor(project.status)}>
              {project?.status?.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {project.category}
            </Badge>
            <span className="text-xs text-muted-foreground ml-auto">
              {project.date}
            </span>
          </div>

          <div className="mb-3">
            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {project.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 bg-background/50 border border-border/50 px-3 py-1.5 rounded-lg text-sm font-medium group-hover:border-primary/30 transition-colors">
                <CircleDot className="h-2 w-2 text-primary" />
                {tech}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="text-sm text-muted-foreground px-3 py-1.5">
                +{project.tech.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-4">
          <Button size="icon" variant="ghost" className="h-10 w-10" asChild>
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              title="View Code">
              <FaGithub className="h-4 w-4" />
            </a>
          </Button>
          <Button size="icon" variant="ghost" className="h-10 w-10" asChild>
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              title="Live Demo">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Views</p>
              <p className="font-semibold">{formatNumber(project.views)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="font-semibold">{project.rating}/5.0</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold">{project.duration}</p>
            </div>
          </div>

          <Badge className={getComplexityColor(project.complexity)}>
            {project?.complexity?.toUpperCase()}
          </Badge>
        </div>

        <Button size="sm" variant="outline" className="group/btn" asChild>
          <a href={project.links.live} target="_blank" rel="noreferrer">
            Visit Project
            <ChevronRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Team Size (if available) */}
      {project.teamSize && (
        <div className="mt-3 pt-3 border-t border-border/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>Team of {project.teamSize}</span>
          </div>
          {project.contributions && (
            <span className="text-xs text-muted-foreground">
              {project.contributions} contributions
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
