"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitch, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import TechMarquee from "../shared/HeroBanner/TechMarquee";

export function ThreeDMarqueeHome() {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* ─── BACKGROUND: 3D Marquee ─── */}
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        images={images}
      />

      {/* ─── VIGNETTE OVERLAY (Dynamic Theme) ─── */}
      {/* Using HSL variables to ensure it fades to the correct background color */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 10%, hsl(var(--background)) 90%)",
        }}
      />

      {/* ─── CONTENT CONTAINER ─── */}
      <div className="relative z-20 mx-auto w-full max-w-4xl px-4 pt-20 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center">
          {/* Main Name with Gradient */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-foreground via-muted-foreground to-muted-foreground/50">
            Rashedul Islam
          </motion.h1>

          {/* Role / Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-8">
            Crafting{" "}
            <span className="text-primary font-medium">
              Next-Gen Web Experiences
            </span>{" "}
            from Scratch.
          </motion.p>

          {/* Detailed Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-xl text-sm md:text-base text-muted-foreground mb-10 leading-relaxed">
            I am a Full Stack Developer & Tech Lead specialized in building
            scalable, high-performance applications using React, Next.js, and
            modern UI architectures.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {/* Primary Button */}
            <Link href="/contact">
              <Button
                variant={"outline"}
                className="w-full sm:w-auto font-bold rounded-full px-8 py-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95">
                Let's Connect
                <ArrowRight className="inline-block w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            {/* Secondary Button */}
            <Link href="/projects">
              <Button className="w-full sm:w-auto font-bold rounded-full px-8 py-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95">
                Explore Work
              </Button>
            </Link>
          </motion.div>

          {/* Social Icons (Dynamic Theme) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center gap-6">
            <a
              href="https://github.com/rashedulraha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform">
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/rashedulraha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/rashedulraha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform">
              <FaXTwitter className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        <TechMarquee />
      </div>
    </div>
  );
}
