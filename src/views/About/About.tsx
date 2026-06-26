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
            <div className="w-full rounded-2xl overflow-hidden border border-border bg-card/50 shadow-lg transition-all duration-500 group-hover:shadow-xl flex">
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
            {/* Bio with Highlighted Topics */}

            <div className="space-y-5 text-base leading-relaxed grow">
              <p className="text-foreground/90">
                I am a passionate developer from{" "}
                <span className="text-foreground font-semibold border-b border-primary/40">
                  Bangladesh
                </span>
                . I build{" "}
                <span className="text-primary font-semibold">
                  modern web applications
                </span>{" "}
                using technologies such as TypeScript, JavaScript, and Python. I
                also work with C++ and Go.
              </p>

              <p className="text-foreground/90">
                My expertise includes both{" "}
                <span className="text-primary font-semibold">
                  frontend development
                </span>{" "}
                and{" "}
                <span className="text-primary font-semibold">
                  backend development
                </span>
                . I create{" "}
                <span className="text-foreground font-semibold">
                  clean user interfaces
                </span>{" "}
                and design{" "}
                <span className="text-primary font-semibold">
                  scalable backend systems
                </span>{" "}
                and APIs.
              </p>

              <p className="text-foreground/90">
                Currently, I am exploring{" "}
                <span className="text-foreground font-semibold">
                  AI integrations
                </span>{" "}
                and Retrieval-Augmented Generation (RAG) systems. My goal is to
                build{" "}
                <span className="text-primary font-semibold">
                  intelligent applications
                </span>{" "}
                that deliver more meaningful and capable experiences.
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
              <Link href="/contact">
                <Button variant="default" className="ml-2 gap-2 h-11 px-5">
                  Contact Me <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
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
