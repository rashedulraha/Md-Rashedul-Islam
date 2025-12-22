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

export default function About() {
  const stats = [
    {
      label: "Experience",
      value: "1+ Years",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Projects",
      value: "20+ Done",
      icon: <Code className="w-4 h-4" />,
    },
    {
      label: "Contributions",
      value: "800+ Git",
      icon: <Award className="w-4 h-4" />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <Navbar />

      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* LEFT: Image Section */}
          <div className="col-span-12 lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              {/* Image Frame Decor - Hidden on mobile for cleaner look */}
              <div className="hidden sm:block absolute -inset-4 border border-primary/20 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              <div className="hidden sm:block absolute -inset-4 border border-primary/10 rounded-3xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 delay-75" />

              {/* Profile Image Container */}
              <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-primary/20 bg-card shadow-xl">
                <img
                  src={image}
                  alt="Rashedul Islam"
                  className="w-full h-full object-cover  transition-all duration-700 scale-105 hover:scale-100"
                />
              </div>

              {/* Floating Badge - Adjusted for mobile */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-card/90 backdrop-blur-xl border border-border p-3 sm:p-4 rounded sm:rounded shadow-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-primary/20 p-1.5 sm:p-2 rounded">
                    <User className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6 sm:pt-8 max-w-md mx-auto lg:max-w-none">
              <div className="flex items-center gap-2 sm:gap-3 p-3 rounded bg-card/40 border border-border/40 backdrop-blur-sm">
                <MapPin className="text-primary w-4 h-4 shrink-0" />
                <span className="text-xs font-mono truncate">
                  Naogaon, Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 rounded bg-card/40 border border-border/40 backdrop-blur-sm">
                <Mail className="text-primary w-4 h-4 shrink-0" />
                <span className="text-xs font-mono truncate">
                  rashedulraha.bd@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Biography & Details */}
          <div className="col-span-12 lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-primary font-mono tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs uppercase italic">
                // System.Profile_Overview
              </h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-tight sm:leading-none">
                I Build <span className="text-primary italic">Scalable</span>{" "}
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                Digital Products.
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                Hi, I'm
                <span className="text-foreground font-bold">
                  Rashedul Islam
                </span>
                , a Full-Stack Developer passionate about turning complex
                problems into elegant, pixel-perfect interfaces. With a focus on
                the MERN stack and Next.js, I bridge the gap between robust
                backend logic and seamless user experiences.
              </p>
            </div>

            {/* Stats Grid - Responsive columns */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-2 sm:p-4 rounded sm:rounded border border-border/40 bg-card/30 backdrop-blur-sm group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 text-primary">
                    {stat.icon}
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-xl sm:text-2xl font-black tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Passion */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-0.5 sm:mt-1 bg-primary/10 p-1.5 sm:p-2 rounded-lg shrink-0">
                  <GraduationCap className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg mb-1">
                    Lifelong Learner
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Continuously exploring new technologies like Docker and
                    Microservices to optimize performance and deployment
                    workflows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-0.5 sm:mt-1 bg-primary/10 p-1.5 sm:p-2 rounded-lg shrink-0">
                  <Code className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg mb-1">
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

            {/* Action Buttons - Full width on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto px-10 font-bold hover:shadow-md hover:shadow-primary/10 rounded transition-all active:scale-95">
                <a href="/Md-Rasheduli-Islam.pdf" download>
                  Download Resume <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded px-6 sm:px-8 font-bold border-primary/20 hover:bg-primary/5 w-full sm:w-auto">
                Read Blog
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
