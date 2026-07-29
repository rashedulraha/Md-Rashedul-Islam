/* eslint-disable react-hooks/purity */
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ResumeButton } from "./ResumeButton";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  MapPin,
  Calendar,
  Download,
} from "lucide-react";

const avatarSlides = [
  {
    src: "/personal_img/protfolio.jpeg",
    alt: "Portfolio Photo",
    title: "Workspace",
    description: "My creative workspace setup where the magic happens.",
    location: "Dhaka, BD",
    date: "Oct 2025",
  },
  {
    src: "/personal_img/rashedul-2.jpeg",
    alt: "Rashedul Photo 2",
    title: "Portrait",
    description: "Professional headshot for the portfolio.",
    location: "Studio 101",
    date: "Nov 2025",
  },
  {
    src: "/personal_img/rashedul.jpeg",
    alt: "Rashedul Photo 1",
    title: "Creative",
    description: "Brainstorming and creative session in action.",
    location: "Paharpur, BD",
    date: "Dec 2025",
  },
  {
    src: "/personal_img/rashedul-2.jpeg",
    alt: "Rashedul Photo 4",
    title: "Vibes",
    description: "Late night coding and studio vibes.",
    location: "Home Workspace",
    date: "Jan 2026",
  },
];

// --- Swipe Configuration ---
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// --- Advanced Premium Gallery Modal ---
function CenterGalleryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  const next = useCallback(() => {
    const nextIndex = (currentIndex + 1) % avatarSlides.length;
    goTo(nextIndex);
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    const prevIndex =
      (currentIndex - 1 + avatarSlides.length) % avatarSlides.length;
    goTo(prevIndex);
  }, [currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "f") setIsFullscreen((prev) => !prev);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFullscreen, onClose, next, prev]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSlide = avatarSlides[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md ${
        isFullscreen ? "p-0" : "p-4 md:p-6"
      }`}
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={`relative bg-background shadow-2xl overflow-hidden transition-all duration-500 flex flex-col ${
          isFullscreen
            ? "w-screen h-screen rounded-none border-0"
            : "w-full max-w-2xl max-h-[90vh] rounded-2xl border border-white/10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-3 sm:p-4 bg-linear-to-b from-black/70 to-transparent">
          {/* Image Counter */}
          <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 text-xs font-medium border border-white/10">
            {currentIndex + 1} / {avatarSlides.length}
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <a
              href={currentSlide.src}
              download
              className="p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 transition-all text-white/80 hover:text-white border border-white/10"
              title="Download Image"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 transition-all text-white/80 hover:text-white border border-white/10"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-red-500/80 backdrop-blur-md hover:bg-red-500 transition-all text-white border border-red-400/50 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Image Area (Draggable) */}
        <div
          className={`relative w-full overflow-hidden bg-black ${isFullscreen ? "flex-1" : "aspect-16/10"}`}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? "100%" : "-100%",
                  opacity: 0,
                  scale: 0.9,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                },
                exit: (dir: number) => ({
                  x: dir < 0 ? "100%" : "-100%",
                  opacity: 0,
                  scale: 0.9,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) next();
                else if (swipe > swipeConfidenceThreshold) prev();
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing group"
            >
              <Image
                src={currentSlide.src}
                alt={currentSlide.alt}
                fill
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={
                  isFullscreen ? "100vw" : "(max-width: 1024px) 100vw, 800px"
                }
                priority
                draggable={false}
              />

              {/* Overlay Gradient for Text readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/0 to-black/0 pointer-events-none" />

              {/* Location and Date Badge */}
              <div className="absolute bottom-4 left-4 right-12 z-20 flex flex-wrap gap-2 pointer-events-none">
                {currentSlide.location && (
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-white/90 text-xs border border-white/10">
                    <MapPin className="w-3 h-3 text-indigo-400" />
                    {currentSlide.location}
                  </div>
                )}
                {currentSlide.date && (
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-white/90 text-xs border border-white/10">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    {currentSlide.date}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (Middle) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-sm transition-all text-white/70 hover:text-white hover:scale-110 border border-transparent hover:border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-sm transition-all text-white/70 hover:text-white hover:scale-110 border border-transparent hover:border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Details Section */}
        <div className="p-4 sm:p-5 bg-card border-t border-border flex flex-col gap-4">
          {/* Title & Description */}
          <div>
            <motion.h3
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold text-foreground"
            >
              {currentSlide.title}
            </motion.h3>
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-1 text-sm text-muted-foreground leading-relaxed"
            >
              {currentSlide.description}
            </motion.p>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {avatarSlides.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(idx);
                }}
                className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                  idx === currentIndex
                    ? "ring-2 ring-primary scale-105 shadow-md"
                    : "ring-1 ring-border opacity-50 hover:opacity-100 hover:scale-105"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatarRef = useRef<HTMLSpanElement>(null);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("rashedulraha.bd@gmail.com");
    toast.success("Email copied to clipboard!");
  };

  // Floating particles for background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <>
      <section
        aria-label="Introduction"
        className="relative flex max-h-250 min-h-dvh w-full flex-col items-center justify-center overflow-hidden py-pagebuilder"
        id="hero-section"
      >
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none text-foreground/5"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 60% 80% at 50% 20%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 80% at 50% 20%, black 30%, transparent 100%)",
          }}
        />

        {/* Background particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-indigo-500/20 dark:bg-indigo-400/10"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Existing gradient background */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 z-0 h-96 w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-700/20 blur-3xl will-change-transform dark:bg-[#0b0218]"
        />

        <div className="container relative z-20 mx-auto mb-8 flex w-full flex-col items-center justify-center gap-y-4 md:mb-14 md:gap-y-6">
          {/* Recruiter Status Pill */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex cursor-pointer items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/15 active:scale-[0.99] sm:text-sm text-foreground"
            href="#contact"
          >
            <span className="relative flex size-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400 mr-1">
              Available:
            </span>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              Open for Full-Time Roles & Projects
            </span>
            <ChevronRight className="ml-1 size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-7xl text-balance text-center font-sans font-normal text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground"
          >
            Building bridges between design and code
          </motion.h1>

          {/* Subtitle - Personal Brand Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-full max-w-2xl text-center text-sm sm:text-base md:text-lg text-muted-foreground font-normal leading-relaxed mt-2"
          >
            Full-Stack Software Developer with{" "}
            <strong>3 years of experience</strong> engineering high-performance
            web applications, robust REST APIs, and responsive UI systems using{" "}
            <strong>Next.js, TypeScript, Node.js & PostgreSQL</strong>.
          </motion.p>

          {/* Avatar Greeting Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="relative z-20 flex flex-wrap items-center justify-center text-center font-medium text-xs sm:text-sm text-foreground/90 gap-2 mt-2"
          >
            <span>Hello! I'm Rashedul Islam</span>
            <span
              ref={avatarRef}
              className="group relative z-30 cursor-pointer inline-flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mx-1 inline-block w-14 sm:w-18 overflow-hidden rounded-full border-2 border-primary/40 shadow-md transition-shadow"
              >
                <Image
                  alt="Rashedul Islam — Software Developer"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full aspect-square"
                  src="/personal_img/rashedul-2.jpeg"
                />
              </motion.span>
            </span>
            <span className="text-muted-foreground font-medium">
              • 3 Years Exp Full-Stack Developer
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="z-10 mt-4 flex flex-col items-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-modal", {
                    detail: { view: "contact" },
                  }),
                )
              }
              className="group relative inline-flex w-fit cursor-pointer items-center justify-between overflow-hidden rounded-full border border-black/20 bg-black/10 py-1 pr-1 pl-4 font-medium text-base opacity-85 backdrop-blur-xs transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-black/40 hover:bg-black hover:opacity-100 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98] dark:border-white/10 dark:bg-white/10 dark:hover:border-white/30 dark:hover:bg-white dark:hover:shadow-white/20"
            >
              <span className="z-10 px-3 text-black transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-white dark:text-white dark:group-hover:text-black">
                Let's Connect
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-y-1 right-1 w-10 rounded-full bg-black transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-[calc(100%-8px)] dark:bg-white"
              />
              <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-black p-2.5 transition-colors duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-transparent dark:bg-white">
                <svg
                  fill="none"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4.5 text-white transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 dark:text-black ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  <path
                    d="M18.5 12L4.99997 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
                <svg
                  fill="none"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute size-4.5 -translate-x-6 text-white opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  <path
                    d="M18.5 12L4.99997 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </motion.button>
            <ResumeButton />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-full px-4 py-2 font-light text-base text-black transition-all duration-300 hover:text-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-white/70 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white/90"
              type="button"
              tabIndex={0}
              onClick={copyEmail}
            >
              <span className="relative size-4">
                <svg
                  className="absolute inset-0"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  style={{ opacity: 1, transform: "scale(1.1)" }}
                >
                  <path d="M216,40V168H168V88H88V40Z" opacity="0.2" />
                  <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                </svg>
              </span>
              <span className="relative grid select-none text-left">
                <span className="invisible col-start-1 row-start-1">
                  Email copied!
                </span>
                <span className="invisible col-start-1 row-start-1">
                  rashedulraha.bd@gmail.com
                </span>
                <span
                  className="col-start-1 row-start-1 text-sm"
                  style={{ opacity: 1, transform: "none" }}
                >
                  rashedulraha.bd@gmail.com
                </span>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Footer glow */}
        <div className="absolute inset-x-0 bottom-0 h-56">
          <div aria-hidden="true" className="relative h-60 w-full z-19 mt-4">
            <div className="absolute bottom-0 left-1/2 z-0 -translate-x-1/2 h-125 w-300 mask-[linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-40 left-1/2 -translate-x-1/2 h-28 w-200 overflow-hidden rounded-full blur-3xl animate-hero-glow will-change-[transform,opacity]"
              >
                <div className="h-full w-[300%] bg-[linear-gradient(90deg,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#7c3aed)] animate-hero-glow-shift will-change-transform" />
              </motion.div>
              <div className="absolute -right-108 -bottom-188.25 -left-113.5 h-238.75 rounded-[100%] bg-linear-to-b from-indigo-500/40 to-transparent dark:from-white" />
              <div className="absolute -right-127.5 -bottom-189.75 -left-133 aspect-[2.346/1] h-239 rounded-[100%] bg-[#F3F2F8] dark:bg-black shadow-[inset_0_2px_20px_#4f46e510,0_-10px_50px_1px_#4f46e520] dark:shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d]">
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_30px_#4f46e530,0_-10px_60px_1px_#4f46e540] dark:shadow-[inset_0_2px_30px_#fff,0_-10px_60px_1px_#ffffffa2] animate-hero-glow-pulse will-change-[opacity]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Center Modal Gallery - Advanced & Interactive */}
      <AnimatePresence>
        {isModalOpen && (
          <CenterGalleryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
