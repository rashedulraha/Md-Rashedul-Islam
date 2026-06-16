"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Eye,
  Globe,
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import Responsive from "../Responsive/Responsive";

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

// --- Creative Component: Spotlight Card (Fixed TypeScript) ---
function SpotlightCard({ children, className, ...props }: any) {
  const divRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Fix: Explicitly use HTMLDivElement
    const { left, top } = e.currentTarget.getBoundingClientRect();
    // Fix: Set styles on the element
    e.currentTarget.style.setProperty("--x", `${e.clientX - left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - top}px`);
  }

  return (
    <div
      ref={divRef}
      className={cn(
        "group relative rounded-xl bg-card border-2 border-border overflow-hidden",
        "hover:border-primary/30 transition-colors duration-300",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}>
      {/* Spotlight Gradient (Using CSS Variables) */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(
                    800px circle at var(--x) var(--y),
                    rgba(255, 255, 255, 0.06),
                    transparent 40%
                )`,
          }}
        />
      </div>

      {/* Content Layer - Ensure pointer events work for children */}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
}

// --- Creative Component: 3D Tilt Card ---
function TiltCard({ children, className, isFeatured }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 10 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 10 });

  const transform = useTransform(
    [xSpring, ySpring],
    ([latestX, latestY]) =>
      `perspective(1000px) rotateX(${latestY}deg) rotateY(${latestX}deg) scale3d(1.02, 1.02, 1.02)`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 5);
    y.set(-yPct * 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      className={cn(
        "transition-all duration-300 ease-out",
        className,
        isFeatured ? "md:col-span-2 lg:col-span-2" : "",
      )}>
      {children}
    </motion.div>
  );
}

// Helper for className merge
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        await new Promise((r) => setTimeout(r, 1000));
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
      <section className="bg-background py-16 md:py-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-12 space-y-4">
            <div className="h-12 bg-muted/50 rounded-2xl w-1/3 animate-pulse" />
            <div className="h-6 bg-muted/30 rounded-xl w-2/3 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="border-2 border-border rounded-2xl bg-card overflow-hidden h-[500px] relative">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
                <div className="h-64 bg-muted/50 w-full" />
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="h-8 bg-muted/50 rounded-lg w-3/4" />
                    <div className="h-4 bg-muted/30 rounded w-1/2" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted/30 rounded w-full" />
                    <div className="h-3 bg-muted/30 rounded w-full" />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <div className="h-10 bg-muted/50 rounded-lg flex-1" />
                    <div className="h-10 bg-muted/50 rounded-lg flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="bg-background min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <Responsive>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors px-4 py-1">
            <Sparkles className="w-3 h-3 mr-2" />
            Selected Works
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-4 bg-clip-text bg-linear-to-b from-foreground to-foreground/60">
            Featured Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of high-performance web applications crafted with
            precision.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-xl bg-card/50 border-2 border-border rounded-3xl p-2 mb-12 shadow-2xl shadow-black/5">
          <div className="p-4">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/70" />
              <input
                type="text"
                placeholder="Search by technology, name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-background border-2 border-border focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-base text-foreground"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-all">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all overflow-hidden group ${
                    selectedCategory === category
                      ? "bg-foreground text-background border-2 border-transparent shadow-lg shadow-primary/20"
                      : "bg-muted/30 text-muted-foreground border-2 border-border hover:border-primary/30 hover:text-foreground hover:bg-muted/50"
                  }`}>
                  <span className="relative z-10">
                    {category === "all" ? "All Projects" : category}
                  </span>
                  {selectedCategory === category && (
                    <motion.span
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground bg-background/50 px-4 py-1.5 rounded-full border border-border">
                <Eye className="w-3.5 h-3.5 text-primary" />
                Showing {filteredProjects.length} result
                {filteredProjects.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <TiltCard key={project.id} isFeatured={index === 0}>
                <SpotlightCard className="h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-black/60 backdrop-blur-md border-0 text-white text-xs px-3 py-1.5 shadow-lg">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-muted/20">
                    <div className="mb-auto">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono mb-3 opacity-80">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-medium">{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-medium">
                          {project.teamSize} people
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs rounded-lg bg-muted border border-border text-foreground font-medium">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2.5 py-1 text-xs rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons (Fixed & Working) */}
                    <div className="flex gap-2 mt-auto relative z-20">
                      {project.links.live && (
                        <Button asChild size="sm" className="flex-1">
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1">
                        <Link
                          href={`/projects/${project.id}`}
                          className="flex items-center justify-center gap-1.5">
                          View Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-dashed border-border rounded-3xl bg-muted/30 p-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              No projects found
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any projects matching your search criteria.
            </p>
            <Button
              onClick={() => {
                setSearchInput("");
                setSelectedCategory("all");
              }}
              size="lg">
              Clear all filters
            </Button>
          </motion.div>
        )}
      </Responsive>
    </section>
  );
}
