"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TechMarquee from "../shared/HeroBanner/TechMarquee";
import Responsive from "../Responsive/Responsive";
import HorizontalResponsive from "@/components/Responsive/HorizontalResponsive";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.45, 0.27, 0.9] as any,
    },
  },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.3 },
  },
};

export function ThreeDMarqueeHome() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 400, 600], [1, 0.8, 0]);
  const scale = useTransform(scrollY, [0, 400, 600], [1, 0.98, 0.92]);
  const blur = useTransform(scrollY, [0, 500], [0, 8]);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show loading state on server
  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  const socialLinks = [
    {
      href: "https://github.com/rashedulraha",
      icon: FaGithub,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/rashedulraha",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://twitter.com/rashedulraha",
      icon: FaXTwitter,
      label: "Twitter",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background: 3D Marquee */}
      <div className="absolute inset-0 z-0">
        <ThreeDMarquee
          className="pointer-events-none h-full w-full opacity-30 md:opacity-40"
          images={images}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, 
            transparent 0%, 
            transparent 20%, 
            hsl(var(--background) / 0.8) 60%,
            hsl(var(--background)) 100%
          )`,
        }}
      />

      <HorizontalResponsive>
        <Responsive>
          <motion.div
            style={{ opacity, scale, filter: `blur(${blur}px)` }}
            className="relative z-20 w-full transition-all duration-300">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center">
              <motion.h1
                variants={scaleVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter mb-4 sm:mb-6 bg-linear-to-br from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                Rashedul Islam
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl lg:text-3xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto px-4 mb-6 sm:mb-8">
                Crafting{" "}
                <span className="text-primary font-semibold bg-primary/10 px-2 py-1 rounded-lg inline-block">
                  Next-Gen Web Experiences
                </span>{" "}
                from Scratch.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 mb-8 sm:mb-10 leading-relaxed">
                I build responsive web apps, dashboards, APIs, and AI-integrated
                tools with clean UI, maintainable code, and deployment-ready
                architecture.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto px-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto font-bold rounded-full px-6 sm:px-8 py-2 sm:py-3 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95 group">
                    Let's Connect
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/projects" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto font-bold rounded-full px-6 sm:px-8 py-2 sm:py-3 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95">
                    Explore Work
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
                    aria-label={social.label}>
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <div className="pt-8 ">
              <TechMarquee />
            </div>
          </motion.div>
        </Responsive>
      </HorizontalResponsive>
    </div>
  );
}
