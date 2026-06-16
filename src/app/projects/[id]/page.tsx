"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Clock,
  Users,
  Briefcase,
  AlertCircle,
  Award,
  Box,
  Code2,
  TrendingUp,
  Eye,
  Sparkles,
  Zap,
  Layers,
  Shield,
  Cpu,
  Database,
  Cloud,
  Terminal,
  GitBranch,
  Globe,
  Smartphone,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDesc: string;
  image: string;
  screenshots: string[];
  architecture: string;
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
  role: string;
  challenges: string;
  outcome: string;
  teamSize: number;
  contributions: number;
  metric: string;
}

// ─── LOADING SKELETON ───
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="h-[85vh] w-full bg-muted" />
      <div className="container mx-auto px-4 -mt-5 relative z-10 pb-20">
        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-8 w-24 bg-muted rounded" />
              </div>
            ))}
          </div>
          <div className="p-6 space-y-4">
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-20 w-full bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch("/projects.json");
        const data = await response.json();
        const found = data.find((p: Project) => p.id === params.id);
        setProject(found);
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [params.id]);

  if (loading) return <LoadingSkeleton />;
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted">
            <AlertCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Project Not Found
          </h1>
          <p className="text-muted-foreground">
            The project you're looking for doesn't exist.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // ─── TECH ICON MAP ───
  const techIcons: Record<string, any> = {
    React: Smartphone,
    "Next.js": Layers,
    TypeScript: Terminal,
    Python: Terminal,
    TensorFlow: Cpu,
    PostgreSQL: Database,
    Node: Server,
    MongoDB: Database,
    Stripe: Shield,
    Redis: Database,
    Firebase: Cloud,
    Tailwind: Palette,
    Three: Globe,
    "Framer Motion": Zap,
    Redux: GitBranch,
    Django: Shield,
    AWS: Cloud,
    Prisma: Database,
  };

  // ─── CATEGORY COLORS ───
  const categoryColors: Record<string, string> = {
    "Web App": "from-blue-500 to-cyan-500",
    "E-Commerce": "from-emerald-500 to-teal-500",
    Productivity: "from-amber-500 to-orange-500",
    Portfolio: "from-purple-500 to-pink-500",
    Education: "from-rose-500 to-red-500",
    Dashboard: "from-indigo-500 to-blue-500",
  };

  const categoryBorderColors: Record<string, string> = {
    "Web App": "hover:border-blue-500/40",
    "E-Commerce": "hover:border-emerald-500/40",
    Productivity: "hover:border-amber-500/40",
    Portfolio: "hover:border-purple-500/40",
    Education: "hover:border-rose-500/40",
    Dashboard: "hover:border-indigo-500/40",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════
          NAV / BACK BUTTON (Floating)
          ═══════════════════════════════════════════════════════════ */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/projects"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 text-foreground hover:bg-muted transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-black/10 hover:scale-105">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION - MODERN GRADIENT BORDER
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Animated Gradient Border on Image */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-linear-to-br",
            categoryColors[project.category] || "from-primary to-secondary",
          )}>
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background dark:from-black/30 dark:via-background/60 dark:to-background" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-background/80 backdrop-blur-xl border border-border/50 text-foreground text-xs px-3 py-1 font-medium shadow-lg">
                  {project.category}
                </Badge>
                {parseInt(project.id) === 1 && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-0 font-bold text-xs px-3 py-1 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" /> Featured
                  </Badge>
                )}
                <Badge className="bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs px-3 py-1 font-medium shadow-lg">
                  {project.status}
                </Badge>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
                {project.title}
              </h1>

              <p className="text-xl text-white/90 font-mono max-w-2xl drop-shadow-lg">
                {project.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT - MODERN GRADIENT BORDER CARD
          ═══════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 -mt-5 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "relative rounded-3xl overflow-hidden",
            "bg-gradient-to-br p-[2px]",
            categoryColors[project.category] ||
              "from-primary/50 to-secondary/50",
          )}>
          {/* Inner Card */}
          <div className="bg-card rounded-3xl overflow-hidden">
            {/* PARTITION 1: STATS - MODERN GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="p-6 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    Rating
                  </p>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  {project.rating}
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    /5
                  </span>
                </span>
              </div>

              <div className="p-6 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    Views
                  </p>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  {project.views.toLocaleString()}
                </span>
              </div>

              <div className="p-6 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    Duration
                  </p>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  {project.duration}
                </span>
              </div>

              <div className="p-6 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Users className="w-4 h-4 text-purple-500" />
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    Team
                  </p>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  {project.teamSize}
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    people
                  </span>
                </span>
              </div>
            </div>

            {/* PARTITION 2: ABOUT + ROLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    About Project
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.longDesc}
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      My Role
                    </h3>
                  </div>
                  <p className="text-base font-medium text-foreground">
                    {project.role}
                  </p>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Key Metric
                    </h3>
                  </div>
                  <p className="text-base font-medium text-foreground">
                    {project.metric}
                  </p>
                </div>
              </div>
            </div>

            {/* PARTITION 3: TECH STACK */}
            <div className="p-6 md:p-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => {
                  const Icon = techIcons[t] || Terminal;
                  return (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-xl bg-muted border border-border/50 text-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300">
                      <Icon className="w-4 h-4" />
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* PARTITION 4: CHALLENGES + OUTCOME */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-t border-border">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Challenges
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Outcome
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* PARTITION 5: ARCHITECTURE */}
            <div className="p-6 md:p-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                  <Box className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Architecture
                </h3>
              </div>
              <div className="p-5 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                    <Database className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-mono text-muted-foreground leading-relaxed flex-1">
                    {project.architecture}
                  </p>
                </div>
              </div>
            </div>

            {/* PARTITION 6: SCREENSHOTS */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="p-6 md:p-8 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Screenshots
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-xl overflow-hidden border border-border/50 aspect-video group hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                      <Image
                        src={img}
                        alt={`Screenshot ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge className="bg-black/50 backdrop-blur-sm text-white border-0 text-xs">
                          Screenshot {i + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PARTITION 7: ACTION BUTTONS */}
            <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-3 justify-center border-t border-border bg-muted/20">
              {project.links.live && (
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95",
                    "bg-gradient-to-r",
                    categoryColors[project.category] ||
                      "from-primary to-primary/80",
                  )}>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.links.github && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl font-semibold border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 active:scale-95">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2">
                    <FaGithub className="w-5 h-5" />
                    GitHub Repo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── MISSING ICON ───
function Palette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  );
}

function Server({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
      />
    </svg>
  );
}
