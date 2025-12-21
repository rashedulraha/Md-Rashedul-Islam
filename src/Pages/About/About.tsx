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

export default function About() {
  const stats = [
    {
      label: "Experience",
      value: "2+ Years",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Projects",
      value: "20+ Done",
      icon: <Code className="w-4 h-4" />,
    },
    {
      label: "Contributions",
      value: "500+ Git",
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

      <main className="relative z-10 pt-28 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Image Section */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="relative group">
              {/* Image Frame Decor */}
              <div className="absolute -inset-4 border border-primary/20 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              <div className="absolute -inset-4 border border-primary/10 rounded-3xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 delay-75" />

              {/* Profile Image Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 bg-card">
                <img
                  src="https://via.placeholder.com/500" // ekhane amar pic link hobe
                  alt="Rashedul Islam"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-card/80 backdrop-blur-xl border border-border p-4 rounded-2xl shadow-xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <User className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                      Available for
                    </p>
                    <p className="text-sm font-bold">Freelance / Full-time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/40">
                <MapPin className="text-primary w-4 h-4" />
                <span className="text-xs font-mono">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/40">
                <Mail className="text-primary w-4 h-4" />
                <span className="text-xs font-mono">contact@rashed.dev</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Biography & Details */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary font-mono tracking-[0.3em] text-xs uppercase italic">
                // System.Profile_Overview
              </h2>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">
                I Build <span className="text-primary italic">Scalable</span>{" "}
                <br />
                Digital Products.
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                Hi, I'm{" "}
                <span className="text-foreground font-bold">
                  Rashedul Islam
                </span>
                , a Full-Stack Developer passionate about turning complex
                problems into elegant, pixel-perfect interfaces. With a focus on
                the MERN stack and Next.js, I bridge the gap between robust
                backend logic and seamless user experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2 text-primary">
                    {stat.icon}
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-2xl font-black tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Passion */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                  <GraduationCap className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Lifelong Learner</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Continuously exploring new technologies like Docker and
                    Microservices to optimize performance and deployment
                    workflows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                  <Code className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Clean Code Advocate</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I believe in writing maintainable, reusable, and
                    well-documented code that provides value to both users and
                    fellow developers.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-xl px-8 font-bold gap-2">
                Download Resume <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 font-bold border-primary/20 hover:bg-primary/5">
                Read Blog
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
