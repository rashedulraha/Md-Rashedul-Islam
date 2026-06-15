"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Code2,
  Rocket,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Coffee,
  Zap,
  Globe,
  Star,
  Code,
  Cpu,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  MessageCircle,
  Heart,
  ExternalLink,
  Database,
} from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
}

/* ─── Reusable bits ─────────────────────────────────────────── */

function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15);
      y.set((e.clientY - centerY) * 0.15);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}>
      {children}
    </motion.div>
  );
}

function FloatingShape({
  delay = 0,
  duration = 20,
  className = "",
}: {
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Main Component ───────────────────────────────────────── */

export default function HeroSection({ name, title, bio }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    rotateX.set((mouseY / (rect.height / 2)) * 6 * -1);
    rotateY.set((mouseX / (rect.width / 2)) * 6);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  /* Typewriter effect */
  useEffect(() => {
    let i = 0;
    setDisplayedTitle("");
    setIsTypingComplete(false);

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < title.length) {
          setDisplayedTitle((prev) => prev + title[i]);
          i++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 45);

      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(startTimer);
  }, [title]);

  const roles = [
    {
      title: "Full Stack Developer",
      icon: Code2,
      description: "Building end-to-end solutions",
    },
    {
      title: "UI/UX Architect",
      icon: Layers,
      description: "Creating seamless experiences",
    },
    {
      title: "Tech Lead",
      icon: Globe,
      description: "Leading innovation teams",
    },
    {
      title: "Problem Solver",
      icon: Cpu,
      description: "Solving complex challenges",
    },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setRoleIdx((p) => (p + 1) % roles.length),
      3000,
    );
    return () => clearInterval(interval);
  }, [roles.length]);

  const testimonials = [
    {
      text: "One of the most talented developers I've worked with",
      author: "Tech Lead, Google",
      rating: 5,
    },
    {
      text: "Exceptional problem-solving skills and clean code",
      author: "CTO, Startup",
      rating: 5,
    },
    {
      text: "Delivered complex features ahead of schedule",
      author: "Product Manager",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
      4000,
    );
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const featuredSkills = [
    { name: "React", icon: Code, level: "Expert" },
    { name: "Next.js", icon: Rocket, level: "Advanced" },
    { name: "TypeScript", icon: Terminal, level: "Expert" },
    { name: "Node.js", icon: Globe, level: "Advanced" },
    { name: "Tailwind", icon: Sparkles, level: "Expert" },
    { name: "PostgreSQL", icon: Database, level: "Advanced" },
  ];

  const socials = [
    {
      Icon: Github,
      href: "https://github.com/rashedulraha",
      label: "GitHub",
      color: "hover:text-[#333]",
    },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/rashedulraha/",
      label: "LinkedIn",
      color: "hover:text-[#0077b5]",
    },
    {
      Icon: Twitter,
      href: "https://x.com/rashedulraha",
      label: "Twitter",
      color: "hover:text-[#1DA1F2]",
    },
    {
      Icon: Mail,
      href: "mailto:rashedulraha.bd@gmail.com",
      label: "Email",
      color: "hover:text-[#EA4335]",
    },
  ];

  const scrollToNext = () => {
    const nextSection =
      document.getElementById("tech-stack") ||
      document.querySelector("section:not(.hero)");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="hero relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px)
            `,
          }}
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <FloatingShape
          delay={0}
          duration={25}
          className="top-20 right-20 w-32 h-32 border border-primary/20 rounded-full"
        />
        <FloatingShape
          delay={2}
          duration={20}
          className="bottom-32 left-20 w-24 h-24 border border-secondary/20 rounded-2xl"
        />
        <FloatingShape
          delay={1}
          duration={30}
          className="top-1/3 left-1/4 w-16 h-16 border border-accent/20 rounded-lg"
        />
      </div>

      {/* Content */}
      <motion.div
        ref={containerRef}
        style={{ rotateX, rotateY, y, scale, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left column */}
              <div className="text-center lg:text-left">
                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-background/50 backdrop-blur-md border border-border shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    Available for opportunities
                  </span>
                  <div className="w-px h-4 bg-border" />
                  <span className="text-xs text-muted-foreground">
                    Top rated
                  </span>
                </motion.div>

                {/* Rotating role */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 shadow-lg">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary blur-md opacity-50 animate-pulse" />
                    <Code2 className="w-5 h-5 text-primary relative z-10" />
                  </div>
                  <span className="text-sm text-foreground/80">I am a</span>
                  <div className="relative h-7 overflow-hidden min-w-[160px] sm:min-w-[200px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={roleIdx}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="flex flex-col absolute left-0">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const Icon = roles[roleIdx].icon;
                            return <Icon className="w-4 h-4 text-secondary" />;
                          })()}
                          <span className="text-base font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {roles[roleIdx].title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {roles[roleIdx].description}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                  <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                    {name}
                  </span>
                </motion.h1>

                {/* Typewriter title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-6">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary/5 border border-secondary/20 shadow-md">
                    <Terminal className="w-5 h-5 text-primary" />
                    <code className="text-base sm:text-lg text-foreground font-mono font-medium">
                      {displayedTitle}
                      {!isTypingComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle rounded-full"
                        />
                      )}
                    </code>
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {bio}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                  <MagneticButton>
                    <Button
                      asChild
                      size="lg"
                      className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base gap-2 shadow-lg group">
                      <Link href="/contact" className="flex items-center gap-2">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Rocket className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Let's connect
                        <MessageCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                  </MagneticButton>

                  <MagneticButton>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-6 text-base gap-2 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                      <Link
                        href="/projects"
                        onClick={scrollToNext}
                        className="flex items-center gap-2">
                        <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Explore work
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-6 text-base gap-2 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                      <a
                        href="/Md-Rasheduli-Islam.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2">
                        Show Resume
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </MagneticButton>
                </motion.div>

                {/* Socials */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-sm text-muted-foreground">
                    Follow me:
                  </span>
                  {socials.map(({ Icon, href, label, color }, idx) => (
                    <motion.a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-full bg-card hover:bg-primary/10 transition-all duration-300 group ${color}`}>
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-current transition-colors" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Right column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6">
                {/* Skills */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Core expertise
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {featuredSkills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/5 border border-border hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <skill.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-6 border border-primary/20 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-primary fill-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      What people say
                    </h3>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3">
                      <p className="text-base text-muted-foreground italic">
                        "{testimonials[activeTestimonial].text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {testimonials[activeTestimonial].author}
                        </span>
                        <div className="flex gap-1">
                          {[
                            ...Array(testimonials[activeTestimonial].rating),
                          ].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Show testimonial ${idx + 1}`}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeTestimonial === idx
                            ? "w-6 bg-primary"
                            : "w-2 bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl p-4 border border-border shadow-lg text-center">
                    <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      50+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Projects completed
                    </div>
                  </div>
                  <div className="bg-card rounded-2xl p-4 border border-border shadow-lg text-center">
                    <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">4+</div>
                    <div className="text-xs text-muted-foreground">
                      Years experience
                    </div>
                  </div>
                </div>

                {/* Fun fact */}
                <div className="flex items-center gap-3 px-5 py-3 bg-card rounded-full border border-border shadow-md">
                  <Coffee className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground font-medium">
                    Fueled by chai and clean code
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
