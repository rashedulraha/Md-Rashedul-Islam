import {
  User,
  Code,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  ExternalLink,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";

import image from "../../assets/rashedul.jpeg";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    {
      label: "Experience",
      value: "1+ Years",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Projects",
      value: "20+ Done",
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Contributions",
      value: "800+ Git",
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <Navbar />

      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 xl:gap-12 items-start min-h-[calc(100vh-6rem)]">
          {/* LEFT: Image Section */}
          <div className="col-span-1 xl:col-span-5 w-full flex flex-col items-center xl:items-start space-y-4 sm:space-y-6">
            {/* Profile Image Container */}
            <div className="relative group w-full max-w-70 sm:max-w-[320px] md:max-w-90">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-xl">
                <img
                  src={image}
                  alt="Rashedul Islam"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 bg-card/95 backdrop-blur-xl border border-border p-2 sm:p-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-1.5 sm:p-2 rounded-lg">
                    <User className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      Available for
                    </p>
                    <p className="text-xs sm:text-sm font-bold whitespace-nowrap">
                      Freelance / Full-time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-70 sm:max-w-[320px] md:max-w-90">
              <div className="flex items-center gap-2 sm:gap-3 p-3 rounded-xl bg-card/60 border border-border/60 backdrop-blur-sm hover:bg-card/80 transition-all">
                <MapPin className="text-primary w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="text-xs sm:text-sm font-mono leading-tight">
                  Naogaon, Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 rounded-xl bg-card/60 border border-border/60 backdrop-blur-sm hover:bg-card/80 transition-all">
                <Mail className="text-primary w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="text-xs sm:text-sm font-mono leading-tight break-all">
                  rashedulraha.bd@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Biography & Details */}
          <div className="col-span-1 xl:col-span-7 w-full space-y-4 sm:space-y-6 md:space-y-8 flex flex-col justify-center">
            {/* Header Section */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-primary font-mono tracking-wider text-[10px] sm:text-xs md:text-sm uppercase italic">
                // System.Profile_Overview
              </h2>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight">
                I Build <span className="text-primary italic">Scalable</span>
                <br className="hidden sm:block" />
                Digital Products.
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Hi, I'm
                <span className="text-foreground font-bold">
                  {" "}
                  Rashedul Islam
                </span>
                , a Full-Stack Developer passionate about turning complex
                problems into elegant, pixel-perfect interfaces. With a focus on
                the MERN stack and Next.js, I bridge the gap between robust
                backend logic and seamless user experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-4 rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm group hover:border-primary/60 hover:bg-card/80 transition-all duration-300">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 text-primary">
                    {stat.icon}
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-black tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Passion */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm hover:bg-card/60 transition-all">
                <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg shrink-0">
                  <GraduationCap className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm sm:text-base mb-1">
                    Lifelong Learner
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Continuously exploring new technologies like Docker and
                    Microservices to optimize performance and deployment
                    workflows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm hover:bg-card/60 transition-all">
                <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg shrink-0">
                  <Code className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm sm:text-base mb-1">
                    Clean Code Advocate
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    I believe in writing maintainable, reusable, and
                    well-documented code that provides value to both users and
                    fellow developers.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 font-bold hover:shadow-lg hover:shadow-primary/20 rounded-xl transition-all active:scale-95 text-sm sm:text-base">
                <a href="/Md-Rasheduli-Islam.pdf" download>
                  Download Resume <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 font-bold hover:shadow-lg hover:shadow-primary/10 rounded-xl transition-all active:scale-95 border-primary/20 text-sm sm:text-base">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
