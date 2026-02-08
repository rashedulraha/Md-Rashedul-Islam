import { ExternalLink, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HeroBanner() {
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const fullText =
    "Architecting scalable backend systems and high-performance web interfaces with modern engineering principles.";

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, fullText]);

  return (
    <section
      className="relative w-full mt-18.75 h-[calc(100vh-75px)]
 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Elements (Inspired by image) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-250 h-150  rounded-[100%] blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl w-full space-y-5 md:my-10">
        {/* Top Badge: Floating Style */}
        <div className="animate-fade-in">
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full bg-secondary/30 backdrop-blur-md border-primary/20 text-primary gap-2 text-xs tracking-wide uppercase font-semibold hover:bg-primary/10 transition-colors">
            <Sparkles className="h-3.5 w-3.5" />
            Available for new opportunities
          </Badge>
        </div>

        {/* Hero Heading: Large & Bold */}
        <div className="space-y-6">
          <h1 className="text-2xl  sm:text-3xl md:text-5xl lg:text-6xl font-medium md:leading-17 text-wrap bg-clip-text text-transparent bg-linear-to-b from-foreground to-muted-foreground/60 leading-snug tracking-wide md:text-center">
            Welcome To My World
          </h1>

          {/* Subheading with Typing Effect */}
          <div className="min-h-15 flex flex-col items-center">
            <p className="text-sm md:text-base md:leading-8 text-muted-foreground max-w-2xl">
              {typedText}
              <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
            </p>
          </div>
        </div>

        {/* Action Buttons: Prominent and Glowy */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
          <Button
            asChild
            size={"lg"}
            className="w-full sm:w-auto font-semibold cursor-pointer">
            <a
              href="/Md-Rasheduli-Islam.pdf"
              download
              className="flex items-center gap-2">
              Get Resume{" "}
              <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Button>

          <Link to="/contact" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto font-semibold cursor-pointer">
              Contact Me <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Partner-style Tech Stack Bottom Row */}
        <div className="pt-8 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 font-medium">
            Expertise in modern stack
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {["Next.js", "Node.js", "TypeScript", "Golang", "PostgreSQL"].map(
              (tech) => (
                <span
                  key={tech}
                  className="text-lg md:text-xl font-bold text-white tracking-tighter">
                  {tech}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Experience Indicator (Floating Right like image details) */}
      <div className="absolute bottom-10 right-10 hidden lg:flex items-center gap-3 text-muted-foreground border-l border-white/10 pl-4">
        <span className="text-3xl font-light text-white">02+</span>
        <span className="text-[10px] uppercase tracking-widest leading-tight">
          Years <br /> Experience
        </span>
      </div>
    </section>
  );
}
