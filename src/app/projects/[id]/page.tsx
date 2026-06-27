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
  Palette,
  Server
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

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)] animate-pulse py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="h-10 w-24 bg-muted rounded-full" />
        <div className="space-y-4">
          <div className="h-6 w-32 bg-muted rounded" />
          <div className="h-12 w-3/4 bg-muted rounded" />
          <div className="h-6 w-1/2 bg-muted rounded font-mono" />
        </div>
        <div className="aspect-video w-full bg-muted rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
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
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center py-12">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent)] text-destructive">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Project Not Found
          </h1>
          <p className="text-base text-[var(--text-secondary)]">
            The telemetry logs cannot find the requested project node.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-95 transition-all text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

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

  const categoryColors: Record<string, string> = {
    "Web App": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "E-Commerce": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Productivity: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Portfolio: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Education: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    Dashboard: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 md:py-16" style={{ color: "var(--text-primary)" }}>
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        
        {/* Header Breadcrumb & Back button */}
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--accent)]/80 transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-semibold">Back to Projects</span>
          </Link>
          <span className="text-xs font-mono text-[var(--text-secondary)] uppercase">
            [ ID: 0{project.id} // ACTIVE_NODE ]
          </span>
        </div>

        {/* Title and Subtitle Block */}
        <div className="space-y-4 text-left">
          <div className="flex flex-wrap gap-2">
            <Badge className={cn("border px-2.5 py-0.5 text-xs font-mono rounded", categoryColors[project.category] || "bg-[var(--accent)] text-[var(--text-secondary)]")}>
              {project.category}
            </Badge>
            {parseInt(project.id) === 1 && (
              <Badge className="bg-amber-500/10 text-amber-600 border border-amber-500/20 font-mono text-xs px-2.5 py-0.5 rounded">
                <Sparkles className="w-3 h-3 mr-1 inline" /> Featured
              </Badge>
            )}
            <Badge className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-0.5 rounded font-mono">
              {project.status}
            </Badge>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            {project.title}
          </h1>

          <p className="text-lg font-mono text-[var(--text-secondary)] leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Fixed Width Featured Image Card */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--accent)] shadow-md">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card border border-[var(--border)] rounded-xl p-5 shadow-sm text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[var(--text-secondary)]">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-xs font-mono uppercase tracking-wider">Rating</span>
            </div>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {project.rating} <span className="text-xs font-normal text-[var(--text-secondary)]">/ 5</span>
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[var(--text-secondary)]">
              <Eye className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="text-xs font-mono uppercase tracking-wider">Views</span>
            </div>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {project.views.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[var(--text-secondary)]">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs font-mono uppercase tracking-wider">Duration</span>
            </div>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {project.duration}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[var(--text-secondary)]">
              <Users className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="text-xs font-mono uppercase tracking-wider">Team Size</span>
            </div>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {project.teamSize} <span className="text-xs font-normal text-[var(--text-secondary)]">members</span>
            </p>
          </div>
        </div>

        {/* Detailed Info Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Main Left Columns */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[var(--border)]/60 pb-2">
                <Code2 className="w-4.5 h-4.5 text-primary" />
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[var(--text-primary)]">
                  Project Architecture & Overview
                </h3>
              </div>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
                {project.longDesc}
              </p>
            </div>

            {/* Challenges Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[var(--border)]/60 pb-2">
                <AlertCircle className="w-4.5 h-4.5 text-amber-500" />
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[var(--text-primary)]">
                  Technical Challenges
                </h3>
              </div>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
                {project.challenges}
              </p>
            </div>

            {/* Outcome Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[var(--border)]/60 pb-2">
                <Award className="w-4.5 h-4.5 text-emerald-500" />
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[var(--text-primary)]">
                  System Outcome & Metrics
                </h3>
              </div>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
                {project.outcome}
              </p>
            </div>

          </div>

          {/* Sidebar Right Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* My Role Box */}
            <div className="bg-card border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Briefcase className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">My Contribution</span>
              </div>
              <p className="text-base font-semibold text-[var(--text-primary)]">
                {project.role}
              </p>
            </div>

            {/* Key Metric Box */}
            <div className="bg-card border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Target Performance</span>
              </div>
              <p className="text-base font-semibold text-[var(--text-primary)]">
                {project.metric}
              </p>
            </div>

            {/* Tech Stack List */}
            <div className="bg-card border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Zap className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Tech Stack Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => {
                  const Icon = techIcons[t] || Terminal;
                  return (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-[var(--accent)] border border-[var(--border)] text-[var(--text-primary)] hover:border-primary/45 transition-colors font-mono">
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Micro Architecture Blueprint */}
            <div className="bg-card border border-[var(--border)] rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Box className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Architecture Blueprints</span>
              </div>
              <div className="p-3.5 bg-[var(--accent)] border border-[var(--border)]/60 rounded-lg text-xs font-mono text-[var(--text-secondary)] leading-relaxed break-all">
                {project.architecture}
              </div>
            </div>

          </div>
        </div>

        {/* Screenshots Section */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="space-y-4 text-left border-t border-[var(--border)]/65 pt-8">
            <div className="flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[var(--text-primary)]">
                System Interface & Telemetry Screens
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((img, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden border border-[var(--border)] aspect-video group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                  <Image
                    src={img}
                    alt={`Screenshot ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-101"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
                      Viewscreen 0{i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center border-t border-[var(--border)]/65 pt-8 bg-card/40 p-6 rounded-xl">
          {project.links.live && (
            <Button
              asChild
              className="px-6 py-2.5 rounded-md font-mono text-xs font-bold uppercase bg-primary text-primary-foreground hover:opacity-95 shadow-md transition-all cursor-pointer">
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Establish Uplink Link
              </a>
            </Button>
          )}
          {project.links.github && (
            <Button
              asChild
              variant="outline"
              className="px-6 py-2.5 rounded-md font-mono text-xs font-bold uppercase border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--accent)] transition-all cursor-pointer">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2">
                <FaGithub className="w-4 h-4" />
                Repository Node
              </a>
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
