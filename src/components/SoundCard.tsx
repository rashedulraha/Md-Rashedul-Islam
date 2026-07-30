"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
const SoundCard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  // Outer avatars data
  const outerAvatars = [
    { src: "/personal_img/abdullah.jpg", position: "top-left" },
    { src: "/personal_img/rashedul.jpeg", position: "bottom-left" },
    { src: "/personal_img/romman.jpg", position: "top-right" },
    { src: "/personal_img/sojib-vai.webp", position: "bottom-right" },
  ];

  return (
    <div
      ref={sectionRef}
      className="col-span-12 lg:col-span-7 h-full">
      {/* Main Card */}
      <motion.div
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("open-modal", {
              detail: { view: "contact" },
            }),
          )
        }
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full flex flex-col items-center justify-end pb-8 md:pb-10 overflow-hidden group cursor-pointer rounded-2xl transition-all min-h-72 card-premium"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Background removed for card-premium */}

        {/* Connection Lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0"
              />
              <stop
                offset="50%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Curved paths connecting center to each corner */}
          {/* Top-left path */}
          <motion.path
            d="M 400 200 Q 250 150 150 100"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Bottom-left path */}
          <motion.path
            d="M 400 200 Q 250 250 150 300"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Top-right path */}
          <motion.path
            d="M 400 200 Q 550 150 650 100"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Bottom-right path */}
          <motion.path
            d="M 400 200 Q 550 250 650 300"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>

        {/* Outer ring animation */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full z-10">
          {/* Animated rings */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.05, 1] : 1,
              opacity: isHovered ? [0.3, 0.5, 0.3] : 0.3,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border border-primary/20"
          />
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.08, 1] : 1,
              opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute w-32 h-32 md:w-44 md:h-44 rounded-full border border-primary/15"
          />

          {/* Center Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute z-20 w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-background overflow-hidden shadow-2xl"
            style={{
              boxShadow: isHovered
                ? "0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)"
                : "0 0 20px hsl(var(--primary) / 0.2)",
            }}>
            <Image
              src="/personal_img/ababil-vai.png"
              alt="Rashedul Islam"
              width={150}
              height={150}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Outer 4 Avatars - Only show on hover */}
        {outerAvatars.map((avatar, idx) => {
          const positions = {
            "top-left": "top-[20%] left-[18%]",
            "bottom-left": "bottom-[35%] left-[12%]",
            "top-right": "top-[20%] right-[18%]",
            "bottom-right": "bottom-[35%] right-[12%]",
          };

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
                delay: isHovered ? 0.3 + idx * 0.1 : 0,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              whileHover={{ scale: 1.15 }}
              className={`absolute ${positions[avatar.position as keyof typeof positions]} z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background overflow-hidden shadow-lg`}
              style={{
                boxShadow: isHovered
                  ? "0 0 20px hsl(var(--primary) / 0.3)"
                  : "none",
              }}>
              <Image
                src={avatar.src}
                alt={`Avatar ${idx + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}

        {/* Typography & Bottom Elements */}
        <div className="z-30 text-center flex flex-col items-center gap-1.5 px-6 relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            LET'S BUILD TOGETHER
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg font-roboto font-medium text-foreground tracking-normal leading-relaxed text-balance">
            Clear communication, fast iterations, no surprises
          </motion.h3>
        </div>

        {/* Arrow Button */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ y: -2, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm text-primary transition-all duration-300 group-hover:bg-primary/20 border border-primary/20">
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </motion.div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/30">
          <span className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
          <span className="text-[8px] md:text-[9px] text-muted-foreground/60 uppercase tracking-wider font-medium">
            Ready to Connect
          </span>
        </motion.div>

        {/* Click hint overlay */}
        <div className="absolute inset-0 z-5 bg-background/0 group-hover:bg-background/5 transition-colors duration-300 rounded-2xl pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default SoundCard;
