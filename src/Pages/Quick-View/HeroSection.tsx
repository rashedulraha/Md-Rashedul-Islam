import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Code2, Rocket } from "lucide-react";
import { achievements, socialLinks } from "./Data/quickViewData";

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
}

export default function HeroSection({ name, title, bio }: HeroSectionProps) {
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

  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeWord, setActiveWord] = useState(0);

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

  const rotatingWords = ["Developer", "Architect", "Creator", "Innovator"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-foreground/5"
      onMouseMove={handleMouseMove}>
      {/* NO ADDITIONAL BG - Just transparent gradient */}

      {/* Very subtle animated orbs - extremely low opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl"
        />
      </div>

      {/* Minimal dot pattern - very light */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,_var(--foreground)_0.5px,_transparent_0.5px)] [background-size:24px_24px]" />
      </div>

      {/* Spotlight Effect - Optional */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(139,92,246,0.03), transparent 40%)`,
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-6xl mx-auto">
          {/* Rotating Word Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/30 border border-border/50 mb-8">
            <Code2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">I am a</span>
            <motion.span
              key={activeWord}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-semibold text-primary">
              {rotatingWords[activeWord]}
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {name}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6">
            <div className="inline-flex items-center gap-2 bg-muted/20 px-3 py-1.5 rounded-lg border border-border/30">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <code className="text-xs sm:text-sm text-foreground/80">
                {displayedTitle}
                <span
                  className={`w-0.5 h-3.5 bg-primary ml-0.5 ${isTyping ? "animate-pulse" : "opacity-0"}`}
                />
              </code>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {bio}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center p-3 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/20 transition-all">
                <item.icon className={`h-5 w-5 ${item.color} mx-auto mb-2`} />
                <div className="text-xl font-bold text-foreground">
                  {item.value}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              size="default"
              className="rounded-full px-6 h-10 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 shadow-md hover:shadow-lg transition-all duration-300 group">
              Let's Connect
              <Rocket className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>

            <div className="flex gap-2">
              {socialLinks.slice(0, 4).map((social, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-9 w-9 border-border/40 bg-card/20 hover:bg-foreground hover:text-background hover:border-foreground transition-all"
                  asChild>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer">
                    <social.icon className="h-3.5 w-3.5" />
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
