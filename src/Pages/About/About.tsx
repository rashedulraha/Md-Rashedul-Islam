import {
  User,
  Code,
  GraduationCap,
  MapPin,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";

import image from "../../assets/rashedul.jpeg";
import { Link } from "react-router-dom";
import { aboutData, Details } from "@/Data/AboutData/AboutData";

export default function About() {
  const stats = aboutData;
  const aboutDetails = Details;

  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <Navbar />

      {/* MOBILE/TABLET VIEW: Single column, full page scroll */}
      <div className="md:hidden">
        <main className="relative z-10 pt-20 pb-8 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Image for Mobile */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative group w-full max-w-70">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-xl">
                  <img
                    src={image}
                    alt="Rashedul Islam"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-card/95 backdrop-blur-xl border border-border p-2 rounded shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-1.5 rounded-lg">
                      <User className="text-primary w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                        Available for
                      </p>
                      <p className="text-xs font-bold whitespace-nowrap">
                        Freelance / Full-time
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Mobile */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-3 p-3 rounded bg-card/60 border border-border/60 backdrop-blur-sm">
                  <MapPin className="text-primary w-4 h-4 shrink-0" />
                  <span className="text-xs font-mono leading-tight">
                    Naogaon, Dhaka, Bangladesh
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded bg-card/60 border border-border/60 backdrop-blur-sm">
                  <Mail className="text-primary w-4 h-4 shrink-0" />
                  <span className="text-xs font-mono leading-tight break-all">
                    rashedulraha.bd@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Header Section */}
            <div className="space-y-4">
              <h2 className="text-primary font-mono tracking-wider text-xs uppercase italic">
                // System.Profile_Overview
              </h2>
              <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight">
                I Build <span className="text-primary italic">Scalable</span>
                Digital Products.
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hi, I'm
                <span className="text-foreground font-bold">
                  Rashedul Islam
                </span>
                , a Full-Stack Developer passionate about turning complex
                problems into elegant, pixel-perfect interfaces.
              </p>
            </div>

            {/* Stats Grid Mobile */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 rounded border border-border/40 bg-card/60 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 mb-2 text-primary">
                    {stat.icon}
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-base font-black tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* About Details Mobile */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-border/40 pb-2">
                About Me
              </h3>

              <div className="space-y-4">
                {aboutDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="p-4 rounded bg-card/40 border border-border/40 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        {detail.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-base mb-1">
                          {detail.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {detail.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Mobile */}
            <div className="space-y-6">
              {/* Education Section */}
              <div className="p-4 rounded bg-card/40 border border-border/40 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <GraduationCap className="text-primary w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-2">
                      Educational Background
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Bachelor of Science in Computer Science & Engineering
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                        <span>Focus on Software Engineering</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                        <span>Multiple online certifications</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills Section Mobile */}
              <div className="p-4 rounded bg-card/40 border border-border/40 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Code className="text-primary w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-base mb-2">
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Node.js",
                        "Express",
                        "MongoDB",
                        "Tailwind",
                        "Git",
                        "REST APIs",
                      ].map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-[10px] bg-background/50 border border-border rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Mobile */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                asChild
                size="lg"
                className="w-full font-bold hover:shadow-lg hover:shadow-primary/20 rounded-lg transition-all active:scale-95">
                <a href="/Md-Rasheduli-Islam.pdf" download>
                  Download Resume <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Link to="/contact" className="w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-bold hover:shadow-lg hover:shadow-primary/10 rounded-lg transition-all active:scale-95 border-primary/20">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* DESKTOP/LARGE SCREEN VIEW: Split layout with right side scroll */}
      <div className="hidden md:block">
        <main className="relative z-10">
          <div className="flex h-[calc(100vh-5rem)] pt-16">
            {/* LEFT SIDE: Fixed Image Section - NO SCROLL */}
            <div className="w-2/5 flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-100 space-y-8">
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
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Scrollable Content Section */}
            <div className="w-3/5 overflow-y-auto h-full custom-scrollbar px-8 py-8">
              <div className="max-w-4xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="space-y-4">
                  <h2 className="text-primary font-mono tracking-wider text-sm uppercase italic">
                    // System.Profile_Overview
                  </h2>
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight">
                    I Build
                    <span className="text-primary italic">Scalable</span>
                    <br />
                    Digital Products.
                  </h1>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                    Hi, I'm
                    <span className="text-foreground font-bold">
                      Rashedul Islam
                    </span>
                    , a Full-Stack Developer passionate about turning complex
                    problems into elegant, pixel-perfect interfaces. With a
                    focus on the MERN stack and Next.js, I bridge the gap
                    between robust backend logic and seamless user experiences.
                  </p>
                </div>
                {/* Quick Contact Info */}
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card/60 border border-border/60 backdrop-blur-sm w-full">
                    <MapPin className="text-primary w-5 h-5 shrink-0" />
                    <span className="text-sm font-mono">
                      Naogaon, Dhaka, Bangladesh
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card/60 border border-border/60 backdrop-blur-sm w-full">
                    <Mail className="text-primary w-5 h-5 shrink-0" />
                    <span className="text-sm font-mono break-all">
                      rashedulraha.bd@gmail.com
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-lg border border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/60 hover:bg-card/80 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3 text-primary">
                        {stat.icon}
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-2xl font-black tracking-tight">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* About Details Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold border-b border-border/40 pb-2">
                    About Me
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
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

                {/* Action Buttons */}
                <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm py-4 mt-8 border-t border-border/40">
                  <div className="flex gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="px-8 font-bold hover:shadow-lg hover:shadow-primary/20 rounded-lg transition-all active:scale-95">
                      <a href="/Md-Rasheduli-Islam.pdf" download>
                        Download Resume
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Link to="/contact">
                      <Button
                        variant="outline"
                        size="lg"
                        className="px-8 font-bold hover:shadow-lg hover:shadow-primary/10 rounded-lg transition-all active:scale-95 border-primary/20">
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
    </div>
  );
}
