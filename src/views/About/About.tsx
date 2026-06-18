"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Mail, ArrowUpRight, Code2, Brain, Server } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Responsive from "../Responsive/Responsive";
import Navbar from "../shared/Navbar/Navbar";

const AboutPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Responsive>
      <Navbar />

      <main>
        {/* MAIN SECTION: Image + Content with Consistent Height */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeUp}>
          {/* Left: Image with Fixed Height */}
          <div className="relative group flex">
            <div className="w-full rounded-2xl overflow-hidden border border-border bg-card shadow-lg transition-all duration-500 group-hover:shadow-xl flex">
              <img
                src="/Rashedul.jpeg"
                alt="Rashedul Islam"
                className="w-full h-full object-cover min-h-[500px] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative glow */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right: Content with Same Height */}
          <div className="flex flex-col justify-between space-y-6 min-h-[500px]">
            {/* Header */}
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-2 text-sm px-3 py-1">
                Available for opportunities
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Rashedul Islam
              </h1>
              <p className="text-xl text-primary font-semibold">
                Full-Stack Developer & AI/RAG Enthusiast
              </p>
            </div>

            {/* Bio with Highlighted Topics - Improved Readability */}
            <div className="space-y-5 text-base leading-relaxed flex-grow">
              <p className="text-foreground/90">
                I'm a passionate developer based in{" "}
                <span className="text-foreground font-semibold border-b-2 border-primary/30">
                  Bangladesh
                </span>
                , building{" "}
                <span className="text-primary font-semibold">
                  modern, scalable, and production-ready web applications
                </span>{" "}
                using TypeScript, JavaScript, Python, C++, and Go.
              </p>

              <p className="text-foreground/90">
                I specialize in both{" "}
                <span className="text-foreground font-semibold">
                  frontend and backend development
                </span>{" "}
                — crafting{" "}
                <span className="text-primary font-semibold">
                  clean, responsive user interfaces
                </span>{" "}
                and designing{" "}
                <span className="text-primary font-semibold">
                  efficient, scalable backend systems and APIs
                </span>
                .
              </p>

              <p className="text-foreground/90">
                Currently exploring{" "}
                <span className="text-foreground font-semibold">
                  AI integrations and RAG-based systems
                </span>
                , focusing on building{" "}
                <span className="text-primary font-semibold">
                  smarter and more intelligent applications
                </span>
                .
              </p>
            </div>

            {/* Location & Email */}
            <div className="flex flex-wrap items-center gap-6 text-base">
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">Bangladesh</span>
              </span>
              <a
                href="mailto:rashedulraha@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-medium">rashedulraha@gmail.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              <Link href="https://github.com/rashedulraha" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <FaGithub className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/rashedulraha" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <FaLinkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com/rashedulraha" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <FaXTwitter className="h-5 w-5" />
                </Button>
              </Link>

              <Button variant="default" className="ml-2 gap-2 h-11 px-5">
                Contact Me <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM SECTION: 3 Column Info with Icons */}
        <motion.div
          className="border-t border-border pt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}>
          {/* Column 1: Focus Areas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Focus Areas
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Rag System Design", "AI/RAG", "Backend", "Cloud", "DSA"].map(
                (tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-medium text-sm px-3 py-1">
                    {tag}
                  </Badge>
                ),
              )}
            </div>
          </div>

          {/* Column 2: Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Education & Training
              </h3>
            </div>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground font-semibold">
                  Programming Hero
                </span>
                <Badge variant="outline" className="text-xs h-6 px-2 ml-auto">
                  L1 & L2
                </Badge>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground font-semibold">Phitron</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Stat */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Server className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Key Achievement
              </h3>
            </div>
            <p className="text-base leading-relaxed">
              Solved{" "}
              <span className="text-primary font-bold text-2xl">500+</span>{" "}
              <span className="text-foreground">DSA problems</span>, building
              strong{" "}
              <span className="text-foreground font-semibold">
                problem-solving
              </span>{" "}
              and
              <span className="text-foreground font-semibold">
                {" "}
                system thinking abilities
              </span>
              .
            </p>
          </div>
        </motion.div>
      </main>
    </Responsive>
  );
};

export default AboutPage;
