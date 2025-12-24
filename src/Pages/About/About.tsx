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
      icon: <Briefcase className="w-3 h-3" />,
    },
    {
      label: "Projects",
      value: "20+ Done",
      icon: <Code className="w-3 h-3" />,
    },
    {
      label: "Contributions",
      value: "800+ Git",
      icon: <Award className="w-3 h-3" />,
    },
  ];

  return (
    <div className="relative h-screen w-full bg-background overflow-hidden">
      <Navbar />

      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 h-screen pt-16 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center h-full">
          {/* LEFT: Image Section */}
          <div className="col-span-12 lg:col-span-5 space-y-2">
            <div className="relative group max-w-xs mx-auto lg:max-w-sm">
              {/* Profile Image Container */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-primary/20 bg-card shadow-lg">
                <img
                  src={image}
                  alt="Rashedul Islam"
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 -right-2 bg-card/90 backdrop-blur-xl border border-border p-2 rounded shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-1 rounded">
                    <User className="text-primary w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-wider">
                      Available for
                    </p>
                    <p className="text-[10px] font-bold whitespace-nowrap">
                      Freelance / Full-time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xs mx-auto lg:max-w-sm">
              <div className="flex items-center gap-2 p-2 rounded bg-card/40 border border-border/40 backdrop-blur-sm">
                <MapPin className="text-primary w-3 h-3 shrink-0" />
                <span className="text-[9px] font-mono truncate">
                  Naogaon, Dhaka
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-card/40 border border-border/40 backdrop-blur-sm">
                <Mail className="text-primary w-3 h-3 shrink-0" />
                <span className="text-[9px] font-mono truncate">
                  rashedulraha.bd
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Biography & Details */}
          <div className="col-span-12 lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <h2 className="text-primary font-mono tracking-wider text-[9px] uppercase italic">
                // System.Profile_Overview
              </h2>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase leading-tight">
                I Build <span className="text-primary italic">Scalable</span>{" "}
                Digital Products.
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
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
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-2 rounded border border-border/40 bg-card/30 backdrop-blur-sm group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-1.5 mb-1 text-primary">
                    {stat.icon}
                    <span className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-black tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Passion */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="mt-0.5 bg-primary/10 p-1.5 rounded shrink-0">
                  <GraduationCap className="text-primary w-3 h-3" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">Lifelong Learner</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Continuously exploring new technologies like Docker and
                    Microservices to optimize performance and deployment
                    workflows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <div className="mt-0.5 bg-primary/10 p-1.5 rounded shrink-0">
                  <Code className="text-primary w-3 h-3" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">
                    Clean Code Advocate
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    I believe in writing maintainable, reusable, and
                    well-documented code that provides value to both users and
                    fellow developers.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                asChild
                size="sm"
                className="w-full sm:w-auto px-6 font-bold hover:shadow-md hover:shadow-primary/10 rounded transition-all active:scale-95">
                <a href="/Md-Rasheduli-Islam.pdf" download>
                  Download Resume <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded px-6 font-bold border-primary/20 hover:bg-primary/5 w-full sm:w-auto">
                Read Blog
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
