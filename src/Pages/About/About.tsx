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

  const aboutDetails = [
    {
      icon: <GraduationCap className="w-4 h-4" />,
      title: "My Programming Journey",
      content:
        "Started with basic HTML/CSS in 2020, gradually progressed to JavaScript, React, and full-stack development. Completed multiple courses and built numerous projects to solidify my skills.",
    },
    {
      icon: <Code className="w-4 h-4" />,
      title: "Work I Enjoy",
      content:
        "Building scalable web applications with modern technologies. Love solving complex problems, creating intuitive user interfaces, and optimizing performance.",
    },
    {
      icon: <User className="w-4 h-4" />,
      title: "Hobbies & Interests",
      content:
        "Outside programming, I enjoy sports (football, cricket), reading tech blogs, photography, and exploring new coffee shops. Passionate about mentoring aspiring developers.",
    },
    {
      icon: <Award className="w-4 h-4" />,
      title: "My Personality",
      content:
        "Detail-oriented problem solver who values clean code and collaboration. Believe in continuous learning and staying updated with industry trends.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Remove overflow-x-hidden from here */}

      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* Full height container with flex */}
        <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] pt-16">
          {/* LEFT SIDE: Fixed Image Section - NO SCROLL */}
          <div className="lg:w-2/5 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="w-full max-w-[320px] lg:max-w-100 space-y-6 sm:space-y-8">
              {/* Profile Image Container - Centered */}
              <div className="relative group">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-xl">
                  <img
                    src={image}
                    alt="Rashedul Islam"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-3 -right-3 bg-card/95 backdrop-blur-xl border border-border p-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-lg">
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
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-card/60 border border-border/60 backdrop-blur-sm">
                  <MapPin className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm font-mono">
                    Naogaon, Dhaka, Bangladesh
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-card/60 border border-border/60 backdrop-blur-sm">
                  <Mail className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm font-mono break-all">
                    rashedulraha.bd@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Scrollable Content Section */}
          <div className="lg:w-3/5 overflow-y-auto h-full custom-scrollbar px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
              {/* Header Section */}
              <div className="space-y-4">
                <h2 className="text-primary font-mono tracking-wider text-sm uppercase italic">
                  // System.Profile_Overview
                </h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-tight">
                  I Build <span className="text-primary italic">Scalable</span>
                  <br />
                  Digital Products.
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Hi, I'm
                  <span className="text-foreground font-bold">
                    {" "}
                    Rashedul Islam
                  </span>
                  , a Full-Stack Developer passionate about turning complex
                  problems into elegant, pixel-perfect interfaces. With a focus
                  on the MERN stack and Next.js, I bridge the gap between robust
                  backend logic and seamless user experiences.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-lg border border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/60 hover:bg-card/80 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3 text-primary">
                      {stat.icon}
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* About Details Section - From Requirements */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold border-b border-border/40 pb-2">
                  About Me
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aboutDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-lg bg-card/40 border border-border/40 backdrop-blur-sm hover:bg-card/60 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-all">
                          {detail.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {detail.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {detail.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info Sections */}
              <div className="space-y-6">
                {/* Education Section */}
                <div className="p-5 rounded-lg bg-card/40 border border-border/40 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <GraduationCap className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">
                        Educational Background
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Bachelor of Science in Computer Science & Engineering
                        (Ongoing)
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                          <span>
                            Focus on Software Engineering & Web Technologies
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                          <span>
                            Completed multiple online certifications in
                            Full-Stack Development
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                          <span>
                            Active participant in coding communities and
                            hackathons
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="p-5 rounded-lg bg-card/40 border border-border/40 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Code className="text-primary w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-3">
                        Technical Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "React",
                          "Next.js",
                          "TypeScript",
                          "Node.js",
                          "Express",
                          "MongoDB",
                          "Tailwind CSS",
                          "Git",
                          "GitHub",
                          "REST APIs",
                          "HTML/CSS",
                          "JavaScript",
                          "Redux",
                          "JWT",
                          "Firebase",
                        ].map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-xs bg-background/50 border border-border rounded-full hover:border-primary/50 hover:text-primary transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Sticky at bottom of scroll area */}
              <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm py-4 mt-8 border-t border-border/40">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto px-8 font-bold hover:shadow-lg hover:shadow-primary/20 rounded-lg transition-all active:scale-95">
                    <a href="/Md-Rasheduli-Islam.pdf" download>
                      Download Resume <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto px-8 font-bold hover:shadow-lg hover:shadow-primary/10 rounded-lg transition-all active:scale-95 border-primary/20">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Me
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
