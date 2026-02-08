import { ExternalLink, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { socialData } from "@/Data/HeroBanner/HeroBanner";
import { TextGenerateEffectDemo } from "@/Pages/Home/shared/TextGenerateEffect";
import TechMarquee from "./TechMarquee";

export default function HeroBanner() {
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const socialLinks = socialData;

  const fullText =
    "I build interactive web applications with clean, modern design.";

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
    <section className="relative w-full min-h-[calc(100vh-75px)] h-full flex justify-center overflow-hidden">
      {/* 1. Left Sidebar Socials (Desktop Only) */}
      <div className="absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center gap-8 z-20">
        <div className="h-24 w-px bg-linear-to-b from-transparent via-border to-primary/50"></div>
        <div className="flex flex-col gap-6">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-muted-foreground hover:text-primary transition-all hover:scale-125 active:scale-90 relative group">
              <social.icon size={22} />
              <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {social.name}
              </span>
            </a>
          ))}
        </div>
        <div className="h-24 w-px bg-linear-to-t from-transparent via-border to-primary/50"></div>
      </div>

      {/* 2. Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/5 rounded-[100%] blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      {/* 3. Main Content Container */}
      <div className="relative z-10 flex flex-col items-center md:justify-center text-center max-w-4xl w-full space-y-3 py-20 md:py-0 ">
        {/* Top Badge */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-10">
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full bg-secondary/20 backdrop-blur-md border-primary/20 text-primary gap-2 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            Available for new projects
          </Badge>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <TextGenerateEffectDemo />

          {/* Typing Subheading */}
          <div className="min-h-15 md:min-h-7.5">
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {typedText}
              <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse align-middle" />
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto font-bold rounded-full px-8 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95">
            <a
              href="/Md-Rasheduli-Islam.pdf"
              download
              className="flex items-center gap-2">
              Get Resume <ExternalLink className="w-4 h-4" />
            </a>
          </Button>

          <Link to="/contact" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-bold rounded-full px-8 backdrop-blur-sm border-border hover:bg-primary/5 transition-all active:scale-95">
              Contact Me <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Tech Stack Display */}
        <TechMarquee />
      </div>

      {/* 4. Experience Indicator (Bottom Right) */}
      <div className="absolute bottom-10 right-6 xl:right-12 hidden md:flex items-center gap-4 text-muted-foreground border-l border-primary/20 pl-4 animate-in slide-in-from-right-8 duration-700">
        <span className="text-4xl font-light text-foreground tracking-tighter">
          02+
        </span>
        <span className="text-[10px] uppercase tracking-widest leading-tight font-medium">
          Years <br /> Experience
        </span>
      </div>

      {/* 5. Mobile Socials (Only visible on small screens) */}
      <div className="absolute bottom-6 flex lg:hidden gap-6 text-muted-foreground">
        {socialLinks.map((social, i) => (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors">
            <social.icon size={20} />
          </a>
        ))}
      </div>
    </section>
  );
}
