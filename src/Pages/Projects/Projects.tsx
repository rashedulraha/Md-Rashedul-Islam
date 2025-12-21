import { Github, ExternalLink, Zap, Truck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";

const projects = [
  {
    title: "Blood Bridge",
    subtitle: "MERN Blood Donation Platform",
    description:
      "A comprehensive role-based system for donors and volunteers. Integrated Stripe for funding and complex filtering for donor locations.",
    icon: <Heart className="text-red-500 h-6 w-6" />,
    tech: ["React", "Node.js", "MongoDB", "Stripe", "TanStack Query"],
    links: { live: "#", github: "https://github.com/rashedulraha" },
    metric: "Role-Based RBAC",
  },
  {
    title: "Sharebite",
    subtitle: "Community Food Sharing",
    description:
      "Community-driven marketplace for surplus food. Features real-time request tracking and Firebase secure authentication.",
    icon: <Zap className="text-yellow-500 h-6 w-6" />,
    tech: ["React", "Firebase", "Axios", "AOS", "Tailwind"],
    links: { live: "#", github: "https://github.com/rashedulraha" },
    metric: "Real-time CRUD",
  },
  {
    title: "ParcelTrack",
    subtitle: "Logistics & Delivery System",
    description:
      "Full-stack logistics platform with automated routing and real-time delivery lifecycle management for Riders and Admins.",
    icon: <Truck className="text-blue-500 h-6 w-6" />,
    tech: ["Node.js", "Express", "Firebase", "RBAC", "DaisyUI"],
    links: { live: "#", github: "https://github.com/rashedulraha" },
    metric: "Lifecycle Tracking",
  },
];

export default function Projects() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-28 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-primary font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase">
              Deployment_Archive
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
              Featured <span className="text-primary">Projects</span>
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-[10px] text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
            <p>// TOTAL_REPOS: 03</p>
            <p>// STATUS: PRODUCTION_READY</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group relative flex flex-col h-full bg-card/20 backdrop-blur-xl border-border/40 transition-all duration-300 hover:border-primary/50 hover:bg-primary/3 overflow-hidden">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[9px] border-primary/30 text-primary uppercase">
                    {project.metric}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold pt-4 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-[10px] text-primary/70 font-mono uppercase tracking-widest">
                  {project.subtitle}
                </p>
              </CardHeader>

              <CardContent className="grow space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded border border-border/40 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="gap-3 border-t border-border/20 pt-4 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  asChild>
                  <a href={project.links.live} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 border border-border/40 hover:text-primary hover:border-primary/50"
                  asChild>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>

              {/* Decorative Scanline Effect on Hover */}
              <div className="absolute inset-0 pointer-events-none border-t border-primary/0 group-hover:border-primary/10 transition-all duration-500" />
            </Card>
          ))}
        </div>

        {/* Global Footer info */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/20 pt-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tight">
              All systems operational // server_status: optimal
            </span>
          </div>
          <a
            href="https://github.com/rashedulraha"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] font-mono text-primary hover:text-primary/80 transition-colors uppercase tracking-[0.2em] font-bold">
            View full archive →
          </a>
        </div>
      </main>
    </div>
  );
}
