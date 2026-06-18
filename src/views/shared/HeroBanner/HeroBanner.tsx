import {
  ExternalLink,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { socialData } from "@/Data/HeroBanner/HeroBanner";
import { TextGenerateEffectDemo } from "@/views/Home/shared/TextGenerateEffect";
import TechMarquee from "./TechMarquee";

export default function HeroBanner() {
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const socialLinks = socialData;

  const fullText =
    "I build responsive web apps, dashboards, APIs, and AI-integrated tools with clean UI, maintainable code, and deployment-ready architecture.";

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("heroBannerVisited");
    if (hasVisited) {
      setTypedText(fullText);
      setTextIndex(fullText.length);
    }
  }, [fullText]);

  useEffect(() => {
    if (textIndex >= fullText.length) return;

    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 25);

      return () => clearTimeout(timeout);
    } else {
      sessionStorage.setItem("heroBannerVisited", "true");
    }
  }, [textIndex, fullText]);

  return (
    <section className="relative w-full min-h-full h-full flex justify-center items-end overflow-hidden">
      {/* ── Left Sidebar Socials (Desktop Only) ── */}
      <div className="absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center gap-8 z-20">
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-border to-primary/50" />

        <div className="flex flex-col gap-6">
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="relative group text-muted-foreground hover:text-primary transition-all hover:scale-125 active:scale-90">
              {/* Icon Container */}
              <div className="p-2 rounded-lg bg-muted/30 border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                <social.icon size={20} />
              </div>

              {/* Tooltip */}
              <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="h-24 w-px bg-gradient-to-t from-transparent via-border to-primary/50" />
      </div>

      {/* ── Main Content Container ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center md:justify-center text-center max-w-4xl w-full space-y-6 py-20 md:py-0">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-md border-primary/20 text-primary gap-2 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for new projects
          </Badge>
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <TextGenerateEffectDemo />

          {/* Typing Subheading */}
          <div className="relative">
            <p className="text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed min-h-[60px]">
              {typedText}
              {textIndex < fullText.length && (
                <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse align-middle" />
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full py-5">
          {/* Primary Button */}
          <Link href="/Md-Rasheduli-Islam.pdf" target="_blank">
            <Button
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group shadow-lg shadow-primary/20">
              Show Resume
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>

          {/* Secondary Button */}
          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-semibold rounded-full px-8 h-12 text-base backdrop-blur-sm border-border bg-muted/30 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 active:scale-95 group">
              Contact Me
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Tech Stack Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center gap-2 text-xs text-foreground/50">
          <Terminal className="w-3 h-3" />
          <span className="font-mono tracking-wider">
            Built with Next.js, TypeScript & AI
          </span>
        </motion.div>
      </motion.div>

      {/* ── Mobile Socials (Bottom) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-6 flex lg:hidden gap-4">
        {socialLinks.map((social, i) => (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-muted/30 border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 active:scale-90">
            <social.icon size={18} />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
