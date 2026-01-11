import {
  User,
  Code,
  GraduationCap,
  MapPin,
  Mail,
  Calendar,
  Award,
  Briefcase,
  Download,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import { motion } from "framer-motion";

import image from "../../assets/rashedul.jpeg";

import { aboutData, Details } from "@/Data/AboutData/AboutData";
import { Colors, Skills, } from "@/Data/Skills/Skills";
import { useLenis } from "@/Hooks/useLenis";
import { useEffect } from "react";

const TechnicalSkills = Skills;
const skillColors = Colors;

export default function About() {
  // Initialize Lenis for smooth scrolling
  useLenis();

  // Ref for the scrollable content

  const stats = aboutData;
  const aboutDetails = Details;

  // Add custom scrollbar styles and Lenis-specific styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: hsl(var(--muted) / 0.1);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: hsl(var(--primary) / 0.3);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--primary) / 0.5);
      }
      
      /* Lenis smooth scroll improvements */
      html.lenis {
        height: auto;
      }
      
      .lenis-smooth {
        scroll-behavior: auto !important;
      }
      
      .lenis-smooth [data-lenis-prevent] {
        overscroll-behavior: contain;
      }
      
      .lenis-stopped {
        overflow: hidden;
      }
      
      .lenis-scrolling iframe {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500">
      {/* Subtle Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <Animation />
      </div>
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        {/* --- HEADER SECTION --- */}
        <header className="max-w-4xl mb-12 sm:mb-20 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.4em]">
            <span className="w-6 sm:w-12 h-[1.5px] bg-primary" />
            <span>Developer Profile // 2026 Edition</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
            About <br />
            <span className="text-muted-foreground italic font-serif lowercase font-light">
              The Developer.
            </span>
          </motion.h1>

          {/* Core Skills Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 pt-2">
            {[
              "Full-Stack Development",
              "MERN Stack",
              "UI/UX Design",
              "Problem Solving",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-[9px] font-bold border border-border rounded-full bg-muted/20 text-muted-foreground uppercase tracking-wider">
                {skill}
              </span>
            ))}
          </motion.div>
        </header>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
          {/* Left: Profile Image and Quick Info */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-12">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative group">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden border-2 border-border/40 bg-card shadow-xl">
                <img
                  src={image}
                  alt="Rashedul Islam"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-3 -right-3 bg-card/95 backdrop-blur-xl border border-border p-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <User className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      Available for
                    </p>
                    <p className="text-sm font-bold whitespace-nowrap">
                      Freelance / Full-time
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/20 backdrop-blur-sm border border-border/40">
                <MapPin className="text-primary w-5 h-5 shrink-0" />
                <span className="text-sm font-mono">
                  Naogaon, Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/20 backdrop-blur-sm border border-border/40">
                <Mail className="text-primary w-5 h-5 shrink-0" />
                <span className="text-sm font-mono break-all">
                  rashedulraha.bd@gmail.com
                </span>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 gap-4">
              {stats.map((stat, i) => (
                <Card
                  key={i}
                  className="p-4 bg-card/20 backdrop-blur-sm border-border/40 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {stat.icon}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-2xl font-black tracking-tight">
                    {stat.value}
                  </p>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Right: Detailed Information */}
          <div className="lg:col-span-8 space-y-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4">
              <h2 className="text-2xl font-bold">Hello, I'm Rashedul Islam</h2>
              <p className="text-muted-foreground leading-relaxed">
                A Full-Stack Developer passionate about turning complex problems
                into elegant, pixel-perfect interfaces. With a focus on the MERN
                stack and Next.js, I bridge the gap between robust backend logic
                and seamless user experiences.
              </p>
            </motion.div>

            {/* About Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aboutDetails.map((detail, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                      {detail.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {detail.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {detail.content}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-3xl bg-card/20 backdrop-blur-sm border-border/40">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <GraduationCap className="text-primary w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3">
                    Educational Background
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Bachelor of Science in Computer Science & Engineering
                    (Ongoing)
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>
                        Focus on Software Engineering & Web Technologies
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>
                        Completed multiple online certifications in Full-Stack
                        Development
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>
                        Active participant in coding communities and hackathons
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-3xl bg-card/20 backdrop-blur-sm border-border/40">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Code className="text-primary w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-4">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {TechnicalSkills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 text-xs border border-border rounded-full hover:border-primary/50 hover:text-primary transition-colors ${
                          skillColors[skill as keyof typeof skillColors] ||
                          "bg-background/50 text-foreground/70"
                        }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6">
              <h3 className="text-2xl font-bold">Professional Journey</h3>

              <div className="relative pl-8">
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 h-full w-0.5 bg-border"></div>

                {/* Timeline Items */}
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute -left-8 w-4 h-4 rounded-full bg-primary"></div>
                    <div className="p-5 rounded-2xl bg-card/20 backdrop-blur-sm border-border/40">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          <Briefcase className="w-3 h-3 mr-1" />
                          Freelance Developer
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          2022 - Present
                        </span>
                      </div>
                      <h4 className="font-bold mb-2">
                        Full-Stack Web Developer
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Developing custom web applications for clients
                        worldwide, specializing in React, Node.js, and modern
                        web technologies.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-8 w-4 h-4 rounded-full bg-primary"></div>
                    <div className="p-5 rounded-2xl bg-card/20 backdrop-blur-sm border-border/40">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          Achievement
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          2023
                        </span>
                      </div>
                      <h4 className="font-bold mb-2">
                        Open Source Contributor
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Active contributor to various open-source projects with
                        over 100+ contributions on GitHub.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- RESPONSIVE FOOTER (Quick Action) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 sm:mt-32 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-border/50 bg-card/5 backdrop-blur-xl flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
              Let's build something{" "}
              <span className="text-primary italic">amazing</span> together.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Available for freelance projects and full-time opportunities.
              Let's discuss how I can contribute to your next project.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="px-10 py-4 text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              className="px-10 py-4 text-[10px] font-black uppercase tracking-widest border border-border hover:bg-muted/50 rounded-2xl transition-all flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Get In Touch
              <ChevronRight size={14} />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
