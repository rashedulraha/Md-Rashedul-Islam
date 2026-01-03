import { ExternalLink, CircleDot, Layout } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/Routes/Types/Particle";

//!  get data to public json file
const loadProjects = async () => {
  const res = await fetch("/projects.json");
  const json = await res.json();
  return json;
};
const data = await loadProjects();

export default function Projects() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* Tech Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Mobile View - Vertical Layout */}
        <div className="block lg:hidden">
          <div className="text-center mb-8 space-y-4">
            <h2 className="text-primary font-mono text-[10px] xs:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase">
              Project_Archive
            </h2>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              Featured <br />
              <span className="text-primary italic">Projects</span>
            </h1>

            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-sm mx-auto px-4 border-l-2 border-primary/30 pl-3 text-left">
              Explore my digital workshop. From MERN stack applications to
              complex logistics systems, focusing on clean code and user-centric
              design.
            </p>

            <div className="flex flex-col gap-2 font-mono text-[10px] text-muted-foreground items-center">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>DEPLOYED_APPS: {data.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                <span>STATUS: ACTIVE_DEVELOPMENT</span>
              </div>
            </div>
          </div>

          {/* Mobile Projects Grid */}
          <div className="space-y-6 pb-8">
            {data.map((project: Project, index: number) => (
              <Card
                key={index}
                className="group rounded relative bg-card/10 backdrop-blur-2xl border-border/40 hover:border-primary/40 transition-all duration-500 overflow-hidden shadow-lg">
                <div className="flex flex-col">
                  {/* Project Image Section */}
                  <div className="w-full h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    {/* Floating Tech Count Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <Badge className="bg-background/80 backdrop-blur-md text-primary border-primary/20 text-[8px] xs:text-[9px]">
                        {project.tech.length} STACK
                      </Badge>
                    </div>
                  </div>

                  {/* Project Details Section */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between relative">
                    <span className="absolute -right-2 -top-4 text-6xl sm:text-7xl font-black text-primary/5 italic select-none">
                      0{index + 1}
                    </span>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1 max-w-[70%]">
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors truncate">
                            {project.title}
                          </h3>
                          <p className="text-[10px] xs:text-[11px] text-primary/70 font-mono uppercase tracking-wider leading-none truncate">
                            {project.subtitle}
                          </p>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 sm:p-2 rounded-full bg-secondary/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
                            <FaGithub className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 sm:p-2 rounded-full bg-secondary/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
                            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 relative z-10">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="flex items-center gap-1 bg-primary/5 border border-primary/10 px-1.5 sm:px-2 py-0.5 rounded text-[8px] xs:text-[9px] font-mono text-primary/80 uppercase">
                            <CircleDot className="h-1.5 w-1.5" />
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/20">
                        <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground italic truncate mr-2">
                          // {project.metric}
                        </span>
                        <Layout className="h-3 w-3 text-primary/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet View - Two Column Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[calc(100vh-180px)]">
          {/* LEFT SIDE: Heading & Description */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-center space-y-6 text-center lg:text-left items-center lg:items-start">
            <div className="space-y-2">
              <h2 className="text-primary font-mono text-xs tracking-[0.5em] uppercase">
                Project_Archive
              </h2>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                Featured <br />
                <span className="text-primary italic">Projects</span>
              </h1>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs border-l-2 border-primary/30 pl-4 text-left">
              Explore my digital workshop. From MERN stack applications to
              complex logistics systems, focusing on clean code and user-centric
              design.
            </p>

            <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>DEPLOYED_APPS: {data.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                <span>STATUS: ACTIVE_DEVELOPMENT</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Scrollable Projects Cards */}
          <div className="col-span-1 lg:col-span-8 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)] pr-4 custom-scrollbar">
            {data.map((project: Project, index: number) => (
              <Card
                key={index}
                className="group rounded relative bg-card/10 backdrop-blur-2xl border-border/40 hover:border-primary/40 transition-all duration-500 overflow-hidden shadow-xl">
                <div className="flex flex-col md:flex-row min-h-70">
                  {/* Project Image Section */}
                  <div className="w-full md:w-[45%] h-56 md:h-auto overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover md:grayscale-50 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    {/* Floating Tech Count Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <Badge className="bg-background/80 backdrop-blur-md text-primary border-primary/20 text-[10px]">
                        {project.tech.length} STACK
                      </Badge>
                    </div>
                  </div>

                  {/* Project Details Section */}
                  <div className="p-6 flex-1 flex flex-col justify-between relative">
                    <span className="absolute -right-2 -top-4 text-7xl font-black text-primary/5 italic select-none">
                      0{index + 1}
                    </span>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-primary/70 font-mono uppercase tracking-widest leading-none">
                            {project.subtitle}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
                            <FaGithub className="h-4 w-4" />
                          </a>
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="flex items-center gap-1 bg-primary/5 border border-primary/10 px-2 py-1 rounded text-xs font-mono text-primary/80 uppercase">
                            <CircleDot className="h-1.5 w-1.5" />
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border/20">
                        <span className="text-xs font-mono text-muted-foreground italic">
                          // {project.metric}
                        </span>
                        <Layout className="h-3 w-3 text-primary/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
