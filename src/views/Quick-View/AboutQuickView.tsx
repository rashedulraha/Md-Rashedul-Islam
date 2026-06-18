import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Rocket,
  Trophy,
  CheckCircle2,
  Users,
  Briefcase,
  Target,
  Code,
} from "lucide-react";
import Responsive from "../Responsive/Responsive";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Creative border style using CSS variables (theme-aware)
// Top: more visible, Left/Right: medium, Bottom: almost invisible
const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

// Inner card border (subtler version)
const innerCardBorderStyle = {
  borderTop: "1px solid var(--border)",
  borderLeft: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderRight: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 10%)",
};

const AboutQuickView = () => {
  return (
    <Responsive>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
          About & Education
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          My learning journey and the foundations that shaped my technical
          skills.
        </p>
      </div>

      <motion.div
        className="space-y-6 leading-relaxed"
        variants={itemVariants}
        initial="hidden"
        animate="visible">
        {/* ── MAIN CARD WITH CREATIVE BORDER ── */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-xl bg-card/50 p-6 md:p-8 transition-all duration-500 hover:shadow-lg group"
          style={creativeBorderStyle}>
          {/* Top accent line - creative touch */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {/* Subtle corner glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Bio */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
                  Profile
                </span>
              </div>

              <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                I'm{" "}
                <span className="text-foreground font-bold text-lg md:text-xl">
                  Rashedul Islam
                </span>
                , a{" "}
                <span className="text-primary font-semibold">
                  Full-Stack Developer and AI/RAG enthusiast
                </span>{" "}
                based in Bangladesh. I build modern, scalable, and
                production-ready web applications using TypeScript, JavaScript,
                Python, C++, and Go.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
                  <Briefcase className="w-3 h-3 mr-1" /> 2+ Years Exp
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
                  <Code className="w-3 h-3 mr-1" /> 15+ Projects
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
                  <Target className="w-3 h-3 mr-1" /> 20+ Technologies
                </Badge>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education Card */}
              <div
                className="relative p-5 rounded-lg bg-muted/30 transition-all duration-300 hover:scale-[1.02] group/card"
                style={innerCardBorderStyle}>
                {/* Top accent for inner card */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Education
                  </span>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-foreground">
                        Programming Hero
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-2 text-[10px] h-4 px-1.5 border-primary/30">
                        L1 & L2
                      </Badge>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">
                      Phitron
                    </span>
                  </li>
                </ul>
              </div>

              {/* Achievement Card */}
              <div
                className="relative p-5 rounded-lg bg-muted/30 transition-all duration-300 hover:scale-[1.02] group/card"
                style={innerCardBorderStyle}>
                {/* Top accent for inner card */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Trophy className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Achievement
                  </span>
                </div>
                <p className="text-sm text-foreground/85">
                  Solved{" "}
                  <span className="text-primary font-bold text-xl block sm:inline">
                    500+
                  </span>{" "}
                  DSA problems, strengthening problem-solving and system
                  thinking abilities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── SECONDARY CARD ── */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-xl bg-card/50 p-6 md:p-8 transition-all duration-500 hover:shadow-lg group"
          style={creativeBorderStyle}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
                Expertise
              </span>
            </div>

            <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
              I enjoy working across both frontend and backend—building clean,
              responsive user interfaces and designing efficient, scalable
              backend systems and APIs. I am particularly interested in{" "}
              <span className="text-foreground font-semibold bg-primary/5 px-1.5 py-0.5 rounded">
                Rag system design, backend architecture, and real-world software
                scalability
              </span>
              .
            </p>

            <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
              Alongside full-stack development, I explore{" "}
              <span className="text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded">
                AI integrations and RAG-based systems
              </span>
              , focusing on building smarter and more intelligent applications.
            </p>

            {/* What I Bring */}
            <div className="pt-5 border-t border-border/30">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                What I Bring to the Table
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Clean Code",
                    desc: "Writing maintainable, scalable, and well-documented code.",
                  },
                  {
                    title: "Collaboration",
                    desc: "Thriving in agile teams, code reviews, and shared goals.",
                  },
                  {
                    title: "Impact-Driven",
                    desc: "Translating complex business needs into technical solutions.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-2.5 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}:
                      </p>
                      <p className="text-sm text-foreground/85">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── MISSION CARD ── */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-xl bg-primary/5 p-6 md:p-8 transition-all duration-500 hover:shadow-lg group"
          whileHover={{ x: 5 }}
          style={{
            borderTop: "1.5px solid color-mix(in srgb, var(--primary) 40%)",
            borderLeft: "1px solid color-mix(in srgb, var(--primary) 25%)",
            borderRight: "1px solid color-mix(in srgb, var(--primary) 25%)",
            borderBottom: "1px solid color-mix(in srgb, var(--primary) 8%)",
          }}>
          {/* Top accent line with primary color */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

          <div className="flex items-start gap-4 pl-3">
            <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" />
                Mission
                <span className="w-1 h-1 rounded-full bg-primary" />
              </p>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                I'm continuously learning, building projects, and improving my
                engineering skills with the goal of becoming a{" "}
                <span className="text-foreground font-bold bg-primary/10 px-2 py-0.5 rounded">
                  strong software engineer
                </span>{" "}
                who can design and develop impactful systems.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Responsive>
  );
};

export default AboutQuickView;
