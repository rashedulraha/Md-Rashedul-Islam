import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Terminal, MousePointer2 } from "lucide-react";
import {
  achievements,
  socialLinks,
} from "@/Pages/Quick-View/Data/quickViewData";

// --- TypeScript Interfaces ---
interface Achievement {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  color: string;
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  variant?: "default" | "outline" | "ghost" | "link";
}

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
}

export default function HeroSection({ name, title, bio }: HeroSectionProps) {
  // --- Spotlight Effect Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // --- Typewriter Logic ---
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    let index = 0;
    const currentTitle = title;

    setDisplayedTitle("");
    setIsTyping(true);

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < currentTitle.length) {
          setDisplayedTitle((prev) => prev + currentTitle.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timeout);
  }, [title]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background selection:bg-foreground/10"
      onMouseMove={handleMouseMove}>
      {/* 1. Classic Grayscale Background (No Colors) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle Silver/Gray Aura - Top Left */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[20%] w-[700px] h-[700px] bg-neutral-200/10 dark:bg-neutral-900/20 rounded-full blur-[100px]"
        />

        {/* Subtle Charcoal Aura - Bottom Right */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] -right-[20%] w-[600px] h-[600px] bg-neutral-400/10 dark:bg-neutral-800/20 rounded-full blur-[120px]"
        />
      </div>

      {/* 2. Subtle Dotted Pattern (B&W) */}
      <div className="absolute inset-0 z-[1] opacity-[0.15] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,var(--foreground)_1px,transparent_1px)] bg-[length:24px_24px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      {/* 3. Dynamic Spotlight (White Light, No Color) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          // Changed to use foreground for a natural light effect
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(var(--foreground), 0.04), transparent 40%)`,
        }}
      />

      {/* 4. Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto flex flex-col items-center">
          {/* Badge - Classic Gray */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-400/20 bg-neutral-100/50 dark:bg-neutral-900/50 text-foreground/80 text-sm font-medium mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-foreground" />
            <span>Available for new opportunities</span>
          </motion.div>

          {/* Main Title - Pure B&W */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
            <span className="relative inline-block">
              <span className="relative z-10 text-foreground">{name}</span>
              {/* Classic Silver Underline */}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-2 left-0 h-3 w-full bg-foreground/10 z-0 blur-xl"
              />
            </span>
          </motion.h1>

          {/* Typing Animation Title - Minimalist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl lg:text-3xl font-mono text-muted-foreground mb-6 min-h-10 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 bg-neutral-50/50 dark:bg-neutral-900/50 px-4 py-1.5 rounded-lg border border-neutral-400/30 backdrop-blur-sm">
              <Terminal className="h-5 w-5 text-foreground" />
              <span className="text-foreground">{displayedTitle}</span>
              <span
                className={`w-2 h-5 bg-foreground ml-1 ${isTyping ? "animate-pulse" : "opacity-0"}`}>
                |
              </span>
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {bio}
          </motion.p>

          {/* Quick Stats - Glassmorphism B&W */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
            {achievements.map((item: Achievement, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(var(--foreground), 0.3)",
                }}
                transition={{ type: "spring" as const, stiffness: 300 }}
                className="group relative overflow-hidden text-center p-4 rounded-2xl bg-background/40 border border-neutral-400/20 backdrop-blur-md transition-all duration-300">
                {/* Hover glow effect - White/Silver */}
                <div className="absolute inset-0 bg-neutral-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring" as const, stiffness: 300 }}>
                    {/* Icon color handled by item.color in data, assuming grayscale */}
                    <item.icon
                      className={`h-6 w-6 mx-auto mb-2 text-foreground`}
                    />
                  </motion.div>
                  <div className="text-2xl font-bold text-foreground group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors">
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social & CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full">
            {/* Primary CTA - Classic Black/White */}
            <Button
              size="lg"
              className="rounded-full h-12 px-8 text-base font-bold bg-foreground text-background hover:bg-neutral-700 hover:text-white dark:bg-white dark:text-black hover:dark:bg-neutral-200 hover:shadow-xl transition-all gap-2 group">
              <span>Let's Connect</span>
              <MousePointer2 className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>

            {/* Secondary Socials */}
            <div className="flex gap-3">
              {socialLinks.map((social: SocialLink, i: number) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 border-neutral-400/30 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-md hover:bg-foreground hover:text-background dark:hover:bg-white dark:hover:text-black transition-all hover:scale-110"
                  asChild>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
