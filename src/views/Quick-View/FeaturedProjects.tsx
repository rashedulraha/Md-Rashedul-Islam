"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  X,
  ExternalLink,
  Monitor,
  TrendingUp,
  Box,
  Calendar,
  Star,
  Users,
  AlertCircle,
  Sparkles,
  Code2,
  Layers,
  Search,
  Grid3x3,
  LayoutGrid,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

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

// ─── SAMPLE DATA (Fallback if JSON fails) ───
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Analytics Dashboard",
    subtitle: "Enterprise Analytics Platform",
    description:
      "Real-time analytics dashboard with AI-driven insights and predictive modeling for business intelligence.",
    longDesc:
      "A comprehensive analytics platform that processes millions of data points in real-time, providing actionable insights through machine learning algorithms.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
    category: "Web App",
    status: "Live",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "TensorFlow",
      "PostgreSQL",
    ],
    links: { live: "https://example.com", github: "https://github.com" },
    views: 15234,
    rating: 4.8,
    complexity: "High",
    duration: "6 months",
    date: "2024-01-15",
    tags: ["AI", "Analytics", "Dashboard"],
    challenges:
      "Handling real-time data processing at scale while maintaining sub-second response times.",
    teamSize: 4,
    contributions: 65,
    metric: "50K+ data points processed daily",
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    subtitle: "Modern Shopping Experience",
    description:
      "Full-featured e-commerce platform with cart, payments, and admin dashboard.",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format",
    category: "E-Commerce",
    status: "Live",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    links: { live: "https://example.com", github: "https://github.com" },
    views: 8923,
    rating: 4.6,
    complexity: "Medium",
    duration: "4 months",
    date: "2024-02-10",
    tags: ["E-Commerce", "Payments", "Shopping"],
    teamSize: 3,
    contributions: 70,
    metric: "2K+ monthly active users",
  },
  {
    id: "3",
    title: "Task Management System",
    subtitle: "Team Collaboration Tool",
    description:
      "Real-time task management with drag-drop, comments, and team collaboration features.",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format",
    category: "Productivity",
    status: "Live",
    tech: ["React", "Firebase", "Tailwind", "WebSockets"],
    links: { live: "https://example.com", github: "https://github.com" },
    views: 4567,
    rating: 4.5,
    complexity: "Medium",
    duration: "3 months",
    date: "2024-03-05",
    tags: ["Productivity", "Team", "Tasks"],
    teamSize: 2,
    contributions: 85,
    metric: "500+ tasks completed",
  },
  {
    id: "4",
    title: "Portfolio Website",
    subtitle: "Creative Agency Showcase",
    description:
      "Modern portfolio with 3D animations and smooth scrolling experience.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format",
    category: "Portfolio",
    status: "Live",
    tech: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
    links: { live: "https://example.com", github: "https://github.com" },
    views: 12345,
    rating: 4.9,
    complexity: "High",
    duration: "2 months",
    date: "2024-03-20",
    tags: ["Portfolio", "3D", "Animation"],
    teamSize: 1,
    contributions: 100,
    metric: "10K+ monthly visitors",
  },
];

// ─── SKELETON LOADING COMPONENT ───
function ProjectSkeleton() {
  return (
    <div className="col-span-1 rounded-3xl overflow-hidden border-2 border-border bg-card animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-6 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-20 bg-muted rounded" />
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded w-16" />
          <div className="h-6 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}

// ─── ENHANCED PROJECT CARD ───
function ProjectCard({
  project,
  layoutClass,
  onClick,
  isFeatured = false,
}: {
  project: Project;
  layoutClass?: string;
  onClick: () => void;
  isFeatured?: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: "spring", stiffness: 200, damping: 20 },
        },
      }}
      layout
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-border bg-card hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 ${layoutClass}`}
      onClick={onClick}>
      {/* Image Section */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground border-0 text-xs px-3 py-1 font-semibold">
            {project.category}
          </Badge>
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500 text-yellow-950 text-xs font-bold">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col">
        {/* Title & Subtitle */}
        <div className="mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground font-mono line-clamp-1">
            {project.subtitle}
          </p>
        </div>

        {/* Metric */}
        <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-3">
          <TrendingUp className="w-4 h-4" />
          <span className="line-clamp-1">{project.metric}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-xs rounded-lg bg-muted text-foreground border border-border font-medium">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2.5 py-1 text-xs rounded-lg bg-muted text-foreground border border-border font-medium">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* View Project Button */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
            View Details
          </span>
          <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROJECT MODAL ───
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
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Window Wrapper - Added data-lenis-prevent here to allow overlay area interactions */}
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl bg-card border-2 border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Cover Header */}
              <div className="relative h-[30vh] md:h-[40vh] w-full flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2.5 bg-card/80 hover:bg-primary hover:text-primary-foreground text-foreground rounded-full backdrop-blur-md transition-all border-2 border-border">
                  <X className="w-5 h-5" />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10">
                  <Badge className="mb-3 bg-primary text-primary-foreground border-0 text-xs px-3 py-1 font-semibold">
                    Case Study
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-mono">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Body - Added data-lenis-prevent directly to the scrollable body container as well */}
              <div
                data-lenis-prevent="true"
                className="p-6 md:p-10 flex-1 overflow-y-auto">
                {/* Stats Dashboard */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  <div className="p-4 rounded-2xl bg-muted border-2 border-border">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Rating
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {project.rating}/5
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted border-2 border-border">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Monitor className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Views
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {project.views.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted border-2 border-border">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Duration
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {project.duration}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted border-2 border-border">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Team
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {project.teamSize}
                    </div>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex gap-1 p-1 bg-muted rounded-2xl w-fit mb-6 border-2 border-border">
                  {["overview", "architecture", "gallery"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all capitalize ${
                        activeTab === tab
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-card"
                      }`}>
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-primary" />
                          About the Project
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.longDesc || project.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-muted border-2 border-border text-foreground px-3 py-1.5 text-sm rounded-lg font-medium">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.challenges && (
                          <div className="p-5 rounded-2xl bg-orange-500/10 border-2 border-orange-500/30">
                            <div className="flex items-center gap-2 text-orange-500 mb-2">
                              <AlertCircle className="w-5 h-5" />
                              <h4 className="text-sm font-bold uppercase tracking-wider">
                                Challenges
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {project.challenges}
                            </p>
                          </div>
                        )}
                        <div className="p-5 rounded-2xl bg-primary/10 border-2 border-primary/30">
                          <div className="flex items-center gap-2 text-primary mb-2">
                            <TrendingUp className="w-5 h-5" />
                            <h4 className="text-sm font-bold uppercase tracking-wider">
                              Key Metric
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.metric}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-border">
                        {project.links.live && (
                          <Button
                            asChild
                            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl font-semibold flex-1">
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.links.github && (
                          <Button
                            variant="outline"
                            asChild
                            className="h-12 rounded-xl border-2 border-border hover:bg-muted text-foreground flex-1 font-semibold">
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer">
                              <FaGithub className="w-4 h-4 mr-2" />
                              GitHub Repo
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Architecture Tab */}
                  {activeTab === "architecture" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Box className="w-5 h-5 text-primary" />
                        System Architecture
                      </h3>
                      <div className="bg-muted rounded-2xl p-8 border-2 border-border min-h-[200px] flex items-center justify-center">
                        {project.architecture ? (
                          <div className="text-center space-y-3">
                            <Box className="w-12 h-12 text-primary mx-auto" />
                            <p className="text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
                              {project.architecture}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Architecture details coming soon...
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Gallery Tab */}
                  {activeTab === "gallery" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6">
                      <h3 className="text-lg font-bold text-foreground mb-4">
                        Project Previews
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(project.screenshots || [project.image]).map(
                          (img, i) => (
                            <div
                              key={i}
                              className="rounded-2xl overflow-hidden border-2 border-border aspect-video relative hover:scale-105 transition-transform duration-300">
                              <Image
                                src={img}
                                alt={`Preview ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          ),
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN COMPONENT ───
export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [gridLayout, setGridLayout] = useState<"dynamic" | "grid">("dynamic");

  // Load projects data
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/projects.json");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          // Fallback to sample data
          setProjects(sampleProjects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects(sampleProjects);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Filter projects based on category and search
  useEffect(() => {
    let filtered = [...projects];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.tech.some((t) => t.toLowerCase().includes(query)) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery, projects]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["all", ...new Set(projects.map((p) => p.category))];
    return cats;
  }, [projects]);

  // Get layout class for each project
  const getLayoutClass = (index: number) => {
    if (gridLayout === "grid") return "md:col-span-1 md:row-span-1";

    // Dynamic bento layout
    if (index === 0) return "md:col-span-2 md:row-span-2";
    if (index === 3 || index === 6) return "md:col-span-2 md:row-span-1";
    if (index === 8) return "md:col-span-2 md:row-span-1";
    return "md:col-span-1 md:row-span-1";
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
        <Search className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">
        No projects found
      </h3>
      <p className="text-muted-foreground mb-6">
        We couldn't find any projects matching "{searchQuery}"
        {selectedCategory !== "all" && ` in category "${selectedCategory}"`}
      </p>
      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}
          className="rounded-full">
          Clear all filters
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="skeleton h-8 w-32 mx-auto mb-4 rounded-lg bg-muted animate-pulse" />
            <div className="skeleton h-12 w-96 mx-auto mb-4 rounded-lg bg-muted animate-pulse" />
            <div className="skeleton h-6 w-[500px] mx-auto rounded-lg bg-muted animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
            {[1, 2, 3, 4].map((i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-2 border-primary/20 px-3 py-1 text-xs font-semibold">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Portfolio Showcase
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight  text-start">
              Featured <span>Projects</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl  text-start">
              A curated selection of full-stack web applications and real-world
              digital products.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-1 max-w-2xl w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects by name, technology, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border-2 border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-foreground placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Layout Toggle */}
              <div className="flex gap-2 p-1 bg-muted rounded-xl border-2 border-border">
                <button
                  onClick={() => setGridLayout("dynamic")}
                  className={`p-2 rounded-lg transition-all ${gridLayout === "dynamic" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridLayout("grid")}
                  className={`p-2 rounded-lg transition-all ${gridLayout === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Found {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "bg-card text-muted-foreground hover:bg-muted border-border hover:border-primary/40"
                }`}>
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </motion.div>

          {/* Dynamic Bento Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px] md:auto-rows-[320px]">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  layoutClass={getLayoutClass(index)}
                  onClick={() => setSelectedProject(project)}
                  isFeatured={index === 0}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* Project Modal */}
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
