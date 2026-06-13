import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Code2,
  Rocket,
  Sparkles,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Download,
  MapPin,
  Coffee,
  Zap,
} from "lucide-react";
import { achievements } from "./Data/quickViewData";

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
}

/* ─── tiny helpers ─────────────────────────────────────────── */

function FloatingOrb({
  size,
  style,
  duration,
  delay = 0,
}: {
  size: number;
  style: React.CSSProperties;
  duration: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, ...style }}
      animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
      }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
  );
}

function Particle({
  x,
  y,
  size,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-foreground/[0.07] pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -25, 0], opacity: [0.07, 0.25, 0.07] }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── main component ───────────────────────────────────────── */

export default function HeroSection({ name, title, bio }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  /* mouse spotlight */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const spotY = useSpring(mouseY, { stiffness: 70, damping: 22 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  /* typewriter */
  const [, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setTyping(true);
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        if (i < title.length) {
          setDisplayed((p) => p + title[i++]);
        } else {
          clearInterval(iv);
          setTyping(false);
        }
      }, 48);
      return () => clearInterval(iv);
    }, 600);
    return () => clearTimeout(t);
  }, [title]);

  /* rotating role */
  const roles = [
    "Web Developer",
    "UI Architect",
    "React Engineer",
    "Full-Stack Creator",
  ];
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(
      () => setRoleIdx((p) => (p + 1) % roles.length),
      2800,
    );
    return () => clearInterval(iv);
  }, [roles.length]);

  /* skill tags */
  const skills = [
    // Frontend
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",

    // Backend
    "Node.js",
    "Express.js",

    // Database
    "MongoDB",
    "PostgreSQL",
    "Prisma",

    // Programming & Problem Solving (Phitron)
    "C",
    "C++",
    "Data Structures",
    "Algorithms",
    "Problem Solving",

    // Tools
    "Git",
    "Docker",
    "Firebase",
    "Figma",
  ];
  const [activeSkill, setActiveSkill] = useState(0);
  useEffect(() => {
    const iv = setInterval(
      () => setActiveSkill((p) => (p + 1) % skills.length),
      1800,
    );
    return () => clearInterval(iv);
  }, [skills.length]);

  const socials = [
    { Icon: Github, href: "https://github.com/rashedulraha", label: "GitHub" },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/rashedulraha/",
      label: "LinkedIn",
    },
    { Icon: Twitter, href: "https://x.com/rashedulraha", label: "Twitter" },
    { Icon: Mail, href: "mailto:rashedulraha.bd@gmail.com", label: "Email" },
  ];

  const particles = [
    { x: "8%", y: "18%", size: 3, delay: 0 },
    { x: "22%", y: "65%", size: 2, delay: 1.2 },
    { x: "78%", y: "12%", size: 4, delay: 0.4 },
    { x: "62%", y: "72%", size: 2, delay: 2.1 },
    { x: "45%", y: "88%", size: 3, delay: 1.7 },
    { x: "91%", y: "42%", size: 2, delay: 0.9 },
    { x: "14%", y: "78%", size: 3, delay: 3.0 },
    { x: "54%", y: "28%", size: 2, delay: 0.6 },
    { x: "34%", y: "8%", size: 4, delay: 2.5 },
    { x: "73%", y: "92%", size: 2, delay: 1.4 },
    { x: "88%", y: "60%", size: 3, delay: 3.3 },
    { x: "5%", y: "50%", size: 2, delay: 2.0 },
  ];

  const scrollToNext = () =>
    document
      .getElementById("tech-stack")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background"
      onMouseMove={onMouseMove}>
      {/* ════════════════════════════════════════
          FIXED FUTURISTIC BACKGROUND
          position:fixed — never scrolls away
          ════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-background via-background to-foreground/4" />

        {/* aurora blobs */}
        <FloatingOrb
          size={560}
          duration={22}
          delay={0}
          style={{
            top: "15%",
            left: "8%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <FloatingOrb
          size={480}
          duration={27}
          delay={4}
          style={{
            bottom: "10%",
            right: "6%",
            background:
              "radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <FloatingOrb
          size={640}
          duration={32}
          delay={2}
          style={{
            top: "40%",
            left: "35%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--foreground) 0.7px, transparent 0.7px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* square grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* animated scan line */}
        <ScanLine />

        {/* floating particles */}
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* HUD corner brackets */}
        {[
          { pos: "top-6 left-6", bt: true, bb: false, bl: true, br: false },
          { pos: "top-6 right-6", bt: true, bb: false, bl: false, br: true },
          { pos: "bottom-6 left-6", bt: false, bb: true, bl: true, br: false },
          { pos: "bottom-6 right-6", bt: false, bb: true, bl: false, br: true },
        ].map(({ pos, bt, bb, bl, br }, i) => (
          <div
            key={i}
            className={`absolute w-10 h-10 pointer-events-none ${pos}`}
            style={{
              borderTop: bt ? "1.5px solid rgba(255,255,255,0.08)" : "none",
              borderBottom: bb ? "1.5px solid rgba(255,255,255,0.08)" : "none",
              borderLeft: bl ? "1.5px solid rgba(255,255,255,0.08)" : "none",
              borderRight: br ? "1.5px solid rgba(255,255,255,0.08)" : "none",
            }}
          />
        ))}

        {/* horizontal accent lines */}
        {["20%", "80%"].map((top, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              top,
              background:
                "linear-gradient(to right, transparent 5%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent 95%)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.5 }}
          />
        ))}
      </div>

      {/* mouse spotlight — also fixed so it tracks across the whole viewport */}
      <motion.div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          background: `radial-gradient(550px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.055), transparent 50%)`,
        }}
      />

      {/* ════════════════════════════════════════
          CONTENT — no opacity/y transforms
          so it NEVER hides while scrolling
          ════════════════════════════════════════ */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* status pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-foreground/6 border border-foreground/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] text-muted-foreground tracking-wide">
                Open to work · Available now
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground/60">
                <MapPin className="w-3 h-3" /> Bangladesh
              </span>
            </div>
          </motion.div>

          {/* rotating role badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="flex justify-center mb-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/8 backdrop-blur-sm">
              <Code2 className="w-3.5 h-3.5 text-foreground/50" />
              <span className="text-xs text-muted-foreground">I am a</span>
              <div
                className="relative h-4 overflow-hidden"
                style={{ minWidth: 140 }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="absolute left-0 text-xs font-semibold text-foreground/90 whitespace-nowrap">
                    {roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* NAME */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.28,
              type: "spring",
              stiffness: 80,
              damping: 18,
            }}
            className="mb-5">
            <h1
              className="font-black tracking-[-0.04em] leading-[0.9] relative inline-block"
              style={{ fontSize: "clamp(3.2rem,10vw,8.5rem)" }}>
              <span className="bg-linear-to-br from-foreground via-foreground/80 to-foreground/45 bg-clip-text text-transparent">
                {name}
              </span>
              <motion.span
                className="block mt-3 h-0.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
              />
            </h1>
          </motion.div>

          {/* typewriter title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2.5 bg-foreground/5 px-5 py-2.5 rounded-lg border border-foreground/9 backdrop-blur-sm">
              <Terminal className="h-4 w-4 text-foreground/45 shrink-0" />
              <code className="text-sm sm:text-[15px] text-foreground/75 font-mono tracking-tight">
                {title}
                <motion.span
                  animate={{ opacity: typing ? [1, 0] : 0 }}
                  transition={{ duration: 0.55, repeat: typing ? Infinity : 0 }}
                  className="inline-block w-0.5 h-3.75 bg-foreground/55 ml-0.5 align-middle rounded-sm"
                />
              </code>
            </div>
          </motion.div>

          {/* skill tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex justify-center flex-wrap gap-2 mb-8">
            {skills.map((tag, i) => (
              <motion.span
                key={tag}
                animate={{
                  opacity: i === activeSkill ? 1 : 0.35,
                  scale: i === activeSkill ? 1.06 : 1,
                }}
                transition={{ duration: 0.35 }}
                className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wide text-muted-foreground border bg-foreground/4 backdrop-blur-sm"
                style={{
                  borderColor:
                    i === activeSkill
                      ? "rgba(255,255,255,0.22)"
                      : "rgba(255,255,255,0.07)",
                }}>
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52 }}
            className="text-sm sm:text-[15px] text-muted-foreground max-w-xl mx-auto mb-12 leading-[1.75] tracking-[0.01em]">
            {bio}
          </motion.p>

          {/* achievement stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-12">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.055, y: -4 }}
                transition={{ type: "spring", stiffness: 320 }}
                className="relative text-center py-4 px-3 rounded-2xl bg-foreground/4.5 backdrop-blur-md border border-foreground/8 hover:border-foreground/20 hover:bg-foreground/9 transition-colors duration-300 group overflow-hidden cursor-default">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-white/4 to-transparent pointer-events-none rounded-2xl" />
                <item.icon
                  className={`h-4.5 w-4.5 ${item.color} mx-auto mb-2 relative z-10`}
                />
                <div className="text-[1.35rem] font-black text-foreground tracking-tight relative z-10">
                  {item.value}
                </div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-[0.12em] mt-0.5 relative z-10">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
            {/* Primary */}
            <motion.div
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              className="relative group">
              <div className="absolute -inset-px rounded-full bg-linear-to-r from-foreground/60 via-foreground/30 to-foreground/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Button
                size="lg"
                className="relative rounded-full px-8 h-11 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-md shadow-foreground/10 transition-all duration-300 gap-2 group">
                <Rocket className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Let's Connect
              </Button>
            </motion.div>

            {/* Secondary */}
            <motion.div
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-11 text-sm font-medium border border-foreground/18 bg-background/40 backdrop-blur-sm hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 gap-2 group"
                onClick={scrollToNext}>
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Explore Work
              </Button>
            </motion.div>

            {/* Resume */}
            <motion.div
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full px-7 h-11 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/[0.07] border border-foreground/8 hover:border-foreground/20 transition-all duration-300 gap-2 group">
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* social + fun row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.82 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* social */}
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground/5 backdrop-blur-md border border-foreground/8">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest mr-1 hidden sm:block">
                Find me
              </span>
              {socials.map(({ Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="p-1.5 rounded-full hover:bg-foreground/10 transition-all duration-200 group">
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* fun info */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/4 border border-foreground/[0.07] backdrop-blur-sm">
              <Coffee className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span className="text-[11px] text-muted-foreground/70 font-mono">
                Fueled by chai &amp; clean code
              </span>
              <Sparkles className="w-3 h-3 text-muted-foreground/40" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={scrollToNext}>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity">
          <span className="text-[9px] text-muted-foreground uppercase tracking-[0.18em] font-mono">
            scroll
          </span>
          <ArrowDown className="w-3 h-3 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
