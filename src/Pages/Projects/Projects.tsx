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
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <Animation />

      <main className="relative z-10 flex h-full flex-col items-center justify-center pt-16 px-6">
        <div className="max-w-7xl w-full">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div className="space-y-2">
              <h2 className="text-primary font-mono text-xs tracking-[0.5em] uppercase">
                Deployment_Archive
              </h2>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                Featured <span className="text-primary">Projects</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-xs font-mono max-w-xs text-right">
              // TOTAL_REPOS: 03 <br />
              // STATUS: PRODUCTION_READY
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto no-scrollbar max-h-[65vh] p-2">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group relative bg-card/10 backdrop-blur-xl border-border/40 transition-all hover:border-primary/50 hover:bg-primary/2">
                <CardHeader className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      {project.icon}
                    </div>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] border-primary/30 text-primary">
                      {project.metric}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold pt-4">
                    {project.title}
                  </CardTitle>
                  <p className="text-xs text-primary/70 font-mono uppercase tracking-widest">
                    {project.subtitle}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono bg-secondary/50 px-2 py-0.5 rounded border border-border/40 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="gap-3 border-t border-border/20 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                    asChild>
                    <a href={project.links.live} target="_blank">
                      <ExternalLink className="h-3 w-3" /> Live Demo
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 border border-border/40 hover:text-primary"
                    asChild>
                    <a href={project.links.github} target="_blank">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 h-12 w-12 overflow-hidden rounded-tr-xl pointer-events-none">
                  <div className="absolute top-0 right-0 h-0.5 w-full bg-primary/20" />
                  <div className="absolute top-0 right-0 h-full w-0.5 bg-primary/20" />
                </div>
              </Card>
            ))}
          </div>

          {/* Global Footer info */}
          <div className="mt-8 flex items-center justify-between border-t border-border/20 pt-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                All systems operational
              </span>
            </div>
            <a
              href="https://github.com/rashedulraha"
              className="text-[10px] font-mono text-primary hover:underline uppercase tracking-widest">
              View full archive on GitHub →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
