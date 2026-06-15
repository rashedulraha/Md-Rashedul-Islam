"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Download, Mail, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuickStats from "../shared/QuickStats";
import CanvasTextRashedulIslam from "@/components/canvas-text-demo";

// Animation variants with proper Framer Motion types
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Button configuration
const buttonConfig = {
  resume: {
    icon: Download,
    text: "Download Resume",
    variant: "default" as const,
    href: "/resume.pdf",
  },
  contact: {
    icon: Mail,
    text: "Get In Touch",
    variant: "outline" as const,
    href: "/contact",
  },
};

const HeroContent = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    link.click();
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 w-full text-center lg:text-left">
      {/* Badge */}
      <motion.div variants={itemVariants}>
        <Badge className="mb-5 bg-foreground/5 text-foreground border-foreground/20 text-xs md:text-sm font-medium px-4 py-2 rounded-full">
          Full-Stack Developer | System Architect
        </Badge>
      </motion.div>

      {/* Canvas Text Component */}
      <motion.div variants={itemVariants} className="mb-6">
        <CanvasTextRashedulIslam />
      </motion.div>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-sm md:text-base lg:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal tracking-wide">
        Passionate Full-Stack Developer specializing in React, Next.js, Node.js,
        and cloud architecture. I transform complex problems into elegant,
        scalable digital solutions with clean code and modern practices.
      </motion.p>

      {/* Quick Stats Component */}
      <motion.div variants={itemVariants} className="mb-10">
        <QuickStats />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
        {/* Download Resume Button */}
        <Button
          size="lg"
          onClick={handleDownload}
          className="group w-full sm:w-auto h-11 md:h-12 text-sm md:text-base font-medium rounded-full px-6 md:px-8 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/30 hover:scale-105">
          <Download className="w-4 h-4 mr-2" />
          {buttonConfig.resume.text}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Get In Touch Button */}
        <Link href={buttonConfig.contact.href} className="w-full sm:w-auto">
          <Button
            variant={buttonConfig.contact.variant}
            size="lg"
            className="w-full h-11 md:h-12 text-sm md:text-base font-medium rounded-full px-6 md:px-8 border-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 hover:scale-105">
            <Mail className="w-4 h-4 mr-2" />
            {buttonConfig.contact.text}
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
