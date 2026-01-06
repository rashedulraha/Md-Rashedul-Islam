import { InfinityIcon, ExternalLink, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { skillsGroup, socialData } from "@/Data/HeroBanner/HeroBanner";

export default function HeroBanner() {
  // Typing animation for the subtitle
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const fullText =
    "Turning complex backend logic and pixel-perfect designs into seamless user experiences using the latest web technologies.";

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, fullText]);

  // Social Links Configuration
  const socialLinks = socialData;
  const skillGroups = skillsGroup;

  // top language
  const techColors = {
    "Next.js": "bg-gray-500/20 text-gray-500",
    "Node.js": "bg-green-500/20 text-green-400",
    TypeScript: "bg-blue-500/20 text-blue-400",
    Go: "bg-sky-500/20 text-sky-400",
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-8 lg:gap-8">
        {/* LEFT: Intro Section */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-25 animate-pulse"></div>
            <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-[10px] font-mono tracking-widest text-primary">
              <InfinityIcon className="h-3 w-3" /> FULL-STACK DEVELOPER
            </div>
          </div>

          <div className="space-y-2 w-full">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight">
              Welcome <br className="hidden sm:block" />
              To My <span className="text-primary italic">World</span>
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-muted-foreground">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0" />
              <span className="text-center lg:text-left">
                Building digital experiences with passion and precision
              </span>
            </div>
          </div>

          <p className="max-w-full sm:max-w-md text-muted-foreground text-sm sm:text-base leading-relaxed h-8">
            {typedText}
            <span className="inline-block w-1 h-4 bg-primary ml-1 animate-pulse"></span>
          </p>

          <div className="flex flex-col mt-5 md:mt-0 sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="group w-full sm:w-auto px-6 sm:px-8 font-bold hover:shadow-lg hover:shadow-primary/20 rounded-full transition-all active:scale-95">
              <a
                href="/Md-Rasheduli-Islam.pdf"
                download
                className="flex items-center justify-center gap-2">
                Download Resume{" "}
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Link to={"/contact"} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="group w-full sm:w-auto px-6 sm:px-8 font-bold hover:shadow-lg hover:shadow-primary/20 rounded-full transition-all active:scale-95 border-primary/30 hover:bg-primary/10">
                <span className="flex items-center justify-center gap-2">
                  Email me{" "}
                  <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 w-full">
            <div className="flex -space-x-2">
              {(["Next.js", "Node.js", "TypeScript", "Go"] as const).map(
                (tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className={`px-2 sm:px-3 py-1 backdrop-blur-sm border border-border/50 text-xs ${techColors[tech]}`}>
                    {tech}
                  </Badge>
                )
              )}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold text-primary">2+</span> years
              experience
            </div>
          </div>
        </div>

        {/* MIDDLE: Technical Skills Grid */}
        <div className="lg:col-span-6 w-full">
          <div className="relative">
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 p-4 sm:p-6 bg-card/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-border/30">
              <TooltipProvider>
                {skillGroups.map((skill, i) => (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <div
                        className="group flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-border/50 bg-background/60 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-105 cursor-help"
                        style={{
                          animationDelay: `${i * 50}ms`,
                          animation: "fadeIn 0.5s ease-out forwards",
                          opacity: 0,
                        }}>
                        <div className="p-1.5 sm:p-2.5 rounded-lg bg-background group-hover:scale-110 transition-transform shadow-sm">
                          {skill.icon}
                        </div>
                        <span className="mt-1 sm:mt-2 text-[8px] sm:text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-tighter group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-card text-card-foreground font-mono text-[10px] border border-border">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">{skill.name}</span>
                        <span>{skill.level}</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* RIGHT: Social Sidebar (Hidden on small, Desktop only) */}
        <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center gap-8">
          <div className="h-20 w-px bg-linear-to-b from-transparent via-border to-primary"></div>
          <div className="flex flex-col gap-5">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-muted-foreground hover:text-primary transition-all hover:scale-125 active:scale-90 relative group">
                <social.icon size={20} />
                <span className="absolute -left-8 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
          <div className="h-20 w-px bg-linear-to-t from-transparent via-border to-primary"></div>
        </div>

        {/* Mobile Social Bar (Visible on small screens) */}
        <div className="col-span-1 lg:hidden flex justify-center items-center gap-4 sm:gap-6 pt-4 w-full">
          <div className="h-px w-8 sm:w-12 bg-linear-to-r from-transparent to-primary"></div>
          <div className="flex gap-4 sm:gap-6">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-muted-foreground hover:text-primary transition-transform active:scale-90 hover:scale-110">
                <social.icon size={18} />
              </a>
            ))}
          </div>
          <div className="h-px w-8 sm:w-12 bg-linear-to-l from-transparent to-primary"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
