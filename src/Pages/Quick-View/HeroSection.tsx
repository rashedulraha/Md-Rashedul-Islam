import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Terminal, MousePointer2 } from "lucide-react";
import { achievements, socialLinks } from "./Data/quickViewData";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden selection:bg-foreground/20"
      onMouseMove={handleMouseMove}>
      {/* 1. Mesh Gradient Background - Classic B&W Theme */}

      {/* 3. Dynamic Spotlight Gradient - B&W Version */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(0,0,0,0.08), transparent 40%)`,
        }}
      />

      {/* 4. Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto flex flex-col items-center">
          {/* Badge - Classic Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-foreground/80 text-sm font-medium mb-8 shadow-lg shadow-black/5 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>Available for new opportunities</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                {name}
              </span>
              {/* Underline Glow Effect */}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-2 left-0 h-1 bg-linear-to-r from-foreground/20 via-foreground/40 to-foreground/20 rounded-full"
              />
            </span>
          </motion.h1>

          {/* Typing Animation Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl lg:text-3xl font-mono text-muted-foreground mb-6 min-h-16 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 bg-foreground/5 px-4 py-2 rounded-lg border border-foreground/10 backdrop-blur-sm">
              <Terminal className="h-5 w-5 text-foreground" />
              <span className="text-foreground">{displayedTitle}</span>
              <span
                className={`w-0.5 h-6 ml-1 ${
                  isTyping ? "animate-pulse" : "opacity-0"
                }`}
              />
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

          {/* Quick Stats - Glassmorphism Cards B&W */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(0,0,0,0.3)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative overflow-hidden text-center p-4 rounded-2xl bg-foreground/5 border border-foreground/10 backdrop-blur-md transition-all duration-300 hover:bg-foreground/10">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                    <item.icon
                      className={`h-6 w-6 ${item.color} mx-auto mb-2`}
                    />
                  </motion.div>
                  <div className="text-2xl font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social & CTA Buttons - Classic Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full">
            {/* Primary CTA */}
            <Button
              size="lg"
              className="rounded-full h-12 px-8 text-base font-bold shadow-lg shadow-black/25 hover:shadow-black/40 hover:scale-105 transition-all gap-2 group bg-foreground text-background hover:bg-foreground/90">
              <span>Let's Connect</span>
              <MousePointer2 className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>

            {/* Secondary Socials */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 border-foreground/20 bg-foreground/5 backdrop-blur-md hover:bg-foreground hover:text-background hover:border-foreground transition-all hover:scale-110"
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
