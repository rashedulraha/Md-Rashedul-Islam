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

  if (loading)
    return <div className="min-h-screen bg-background animate-pulse" />;
  if (!project)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════
          NAV / BACK BUTTON (Floating)
          ═══════════════════════════════════════════════════════════ */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/projects"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border-2 border-border text-foreground hover:bg-muted transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION (Full Screen Image + Overlay)
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay - Light mode compatible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background dark:from-black/30 dark:via-background/60 dark:to-background" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4">
              {/* Badges - Light mode compatible */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-background/80 backdrop-blur-md border-2 border-border text-foreground text-xs px-2.5 py-0.5 font-medium">
                  {project.category}
                </Badge>
                {parseInt(project.id) === 1 && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-0 font-bold text-xs px-2.5 py-0.5">
                    <Sparkles className="w-3 h-3 mr-1" /> Featured
                  </Badge>
                )}
                <Badge className="bg-emerald-500/20 backdrop-blur-md border-2 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-0.5 font-medium">
                  {project.status}
                </Badge>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
                {project.title}
              </h1>

              <p className="text-xl text-white/90 font-mono max-w-2xl drop-shadow-md">
                {project.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT (Overlapping the Image - Single Card with Partitions)
          ═══════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 -mt-5 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border-2 border-border rounded-3xl overflow-hidden ">
          {/* PARTITION 1: STATS (4 columns) */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-border">
            <div className="p-6 border-b md:border-b-0 md:border-r-2 border-border">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
                <p className="text-xs text-muted-foreground font-mono uppercase">
                  Rating
                </p>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {project.rating}
                <span className="text-sm text-muted-foreground font-normal">
                  /5
                </span>
              </span>
            </div>

            <div className="p-6 border-b md:border-b-0 md:border-r-2 border-border">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <p className="text-xs text-muted-foreground font-mono uppercase">
                  Views
                </p>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {project.views.toLocaleString()}
              </span>
            </div>

            <div className="p-6 border-b md:border-b-0 md:border-r-2 border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <p className="text-xs text-muted-foreground font-mono uppercase">
                  Duration
                </p>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {project.duration}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <p className="text-xs text-muted-foreground font-mono uppercase">
                  Team Size
                </p>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {project.teamSize}
                <span className="text-sm text-muted-foreground font-normal">
                  {" "}
                  people
                </span>
              </span>
            </div>
          </div>

          {/* PARTITION 2: ABOUT + ROLE (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-border">
            <div className="p-6 border-b md:border-b-0 md:border-r-2 border-border">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  About Project
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.longDesc}
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    My Role
                  </h3>
                </div>
                <p className="text-base font-medium text-foreground">
                  {project.role}
                </p>
              </div>

              <div className="pt-5 border-t-2 border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
          <div className="p-6 border-b-2 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">
                Tech Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-sm rounded-lg bg-muted border border-border text-foreground hover:border-primary/50 hover:text-primary transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* PARTITION 4: CHALLENGES + OUTCOME (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-border">
            <div className="p-6 border-b md:border-b-0 md:border-r-2 border-border">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Challenges
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.challenges}
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Outcome
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* PARTITION 5: ARCHITECTURE */}
          <div className="p-6 border-b-2 border-border">
            <div className="flex items-center gap-2 mb-3">
              <Box className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">
                Architecture
              </h3>
            </div>
            <div className="p-4 rounded-lg bg-muted border-2 border-border">
              <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>

          {/* PARTITION 6: SCREENSHOTS */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="p-6 border-b-2 border-border">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  Screenshots
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.screenshots.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-lg overflow-hidden border-2 border-border aspect-video group">
                    <Image
                      src={img}
                      alt={`Screenshot ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PARTITION 7: ACTION BUTTONS */}
          <div className="p-6 flex flex-col sm:flex-row gap-3 justify-center">
            {project.links.live && (
              <Button asChild size="lg">
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
              <Button asChild variant="outline" size="lg">
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
        </motion.div>
      </div>
    </div>
  );
}
