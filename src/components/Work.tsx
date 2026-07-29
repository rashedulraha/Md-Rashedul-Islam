"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll } from "framer-motion";
import { ExternalLink, ChevronRight, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Link } from "@/routing";
import { useTranslations, useLocale } from "next-intl";
import { getProjects } from "@/services/apiService";
import { ProjectData, getProjectBanner } from "@/types/project";
import { Skeleton } from "@/components/ui/skeleton";

const FALLBACK_PROJECTS: ProjectData[] = [
  {
    id: "zopshop",
    name: "Zopshop POS & Multi-Branch System",
    tagline: "Full-Stack Point of Sale & Inventory Platform",
    overview: "Multi-tenant POS solution designed for real-time inventory synchronization across physical retail stores and digital storefronts.",
    problem: "Small retail outlets suffered from offline transaction losses, slow checkout lag during peak hours, and stock mismatch across locations.",
    solution: "Engineered a Next.js 16 App Router application with optimistic offline state, Prisma ORM, and WebSocket live stock sync across stores.",
    result: "⚡ Reduced transaction checkout duration by 60% and maintained 99.9% data sync accuracy across 5+ active branch locations.",
    live_demo: "https://zopshop.vercel.app",
    silicon_img_banner: "/images/zopshop-banner.jpg",
    tech_stack: {
      frameworks_libraries: ["Next.js 16", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    },
  },
  {
    id: "portfolio-engine",
    name: "Developer Portfolio & Analytics Platform",
    tagline: "High-Performance Portfolio Engine & Admin Dashboard",
    overview: "Custom portfolio system with dynamic SSR, real-time analytics tracking, guestbook, and interactive AI assistant.",
    problem: "Static portfolio templates lacked real-time traffic insights, interactive recruiter engagement, and customizable backend CMS.",
    solution: "Built a Next.js App Router application with dynamic server actions, Express.js backend API, and real-time visitor tracking.",
    result: "🚀 Achieved 98/100 Lighthouse performance score and under 1.2s page load latency globally.",
    live_demo: "https://rashedul-raha.vercel.app",
    silicon_img_banner: "/images/portfolio-banner.jpg",
    tech_stack: {
      frameworks_libraries: ["Next.js 16", "React 19", "Node.js", "Express", "Framer Motion", "MongoDB"],
    },
  },
  {
    id: "devconnect",
    name: "DevConnect Community & Q&A Hub",
    tagline: "Real-time Developer Collaboration & Knowledge Sharing",
    overview: "Community platform for software engineers to share snippet solutions, collaborate via live channels, and rate technical articles.",
    problem: "Developers lacked a focused, high-speed space to get immediate code peer-reviews without heavy forum clutter.",
    solution: "Developed a RESTful backend API using Node.js, Express, Socket.io, and PostgreSQL with full JWT authentication.",
    result: "📈 Scaled to support over 10,000+ monthly active requests with sub-100ms API response latency.",
    live_demo: "https://github.com",
    silicon_img_banner: "/images/devconnect-banner.jpg",
    tech_stack: {
      frameworks_libraries: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Docker", "Redis"],
    },
  },
];

export default function Work() {
  const t = useTranslations("Work");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<ProjectData[]>(FALLBACK_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      try {
        const res = await getProjects();
        const data = res.data;
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const apiProjects: ProjectData[] = data.data.map((item: any, idx: number) => {
            const fallback = FALLBACK_PROJECTS[idx % FALLBACK_PROJECTS.length];
            return {
              id: item.id || item.slug || `project-${idx}`,
              name: item.title || fallback.name,
              tagline: item.subtitle || item.type || fallback.tagline,
              overview: item.description || fallback.overview,
              problem: item.problem || fallback.problem,
              solution: item.solution || fallback.solution,
              result: item.result || fallback.result,
              live_demo: item.liveUrl || item.live_demo || fallback.live_demo,
              github_repo: item.githubUrl || item.github_repo,
              silicon_img_banner: item.image || item.silicon_img_banner || fallback.silicon_img_banner,
              screenshots: [],
              tech_stack: {
                frameworks_libraries: (item.tags && item.tags.length > 0) ? item.tags : fallback.tech_stack?.frameworks_libraries,
                languages: item.tags || [],
              },
              key_features: item.features || [],
            };
          });
          setProjects(apiProjects);
        }
      } catch (err) {
        console.error("Failed to load projects, using fallback data", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, [locale]);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    if (projects.length === 0) return;
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const index = Math.min(
        Math.floor(value * projects.length),
        projects.length - 1,
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, projects.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-8 md:pt-16"
      id="work"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center px-4 mb-6"
      >
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          FEATURED CASE STUDIES
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight">
          Featured{" "}
          <span className="bg-gradient-to-r from-primary via-indigo-400 to-sky-400 bg-clip-text text-transparent">
            work & impact.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl mx-auto">
          Case studies highlighting technical problems, engineered solutions, realistic measurable outcomes, and full tech stacks.
        </p>
      </motion.div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto px-4 md:px-6"
      >
        {isLoading ? (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-4">
            {/* Left - Sticky Skeleton */}
            <div className="w-full lg:w-[45%]">
              <div className="relative w-full max-w-xl mx-auto p-2.5 md:p-3 rounded-4xl card-premium">
                <Skeleton className="w-full aspect-video rounded-3xl" />
                <Skeleton className="h-11 w-full rounded-full mt-4" />
              </div>
            </div>
            {/* Right - Scrolling Content Skeletons */}
            <div className="w-full lg:w-[55%] space-y-12">
              {[1, 2].map((_, index) => (
                <div key={index} className="flex flex-col justify-center py-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="h-8 w-10 rounded-md" />
                    <Skeleton className="h-0.5 flex-1" />
                  </div>
                  <Skeleton className="h-8 w-3/4 mb-2 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 mb-3 rounded-md" />
                  <Skeleton className="h-4 w-full mb-2 rounded-md" />
                  <Skeleton className="h-4 w-5/6 mb-6 rounded-md" />
                  <div className="flex flex-wrap gap-2 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-7 w-20 rounded-full" />
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-32 rounded-full" />
                    <Skeleton className="h-10 w-28 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-4">
            {/* Left - Sticky Image Container */}
            <div className="w-full lg:w-[45%]">
              <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center pb-8 lg:pb-0 z-10">
                <div className="relative w-full max-w-xl mx-auto p-2.5 md:p-3 rounded-4xl transition-all duration-700 card-premium">
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-muted">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: activeIndex === index ? 1 : 0,
                          scale: activeIndex === index ? 1 : 1.05,
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={getProjectBanner(project)}
                          alt={project.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </motion.div>
                    ))}

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest drop-shadow-md">
                            {projects[activeIndex]?.tech_stack
                              ?.frameworks_libraries?.[0] || "Project"}
                          </span>
                          <p className="text-foreground font-semibold text-sm md:text-base mt-1 drop-shadow-md line-clamp-1">
                            {projects[activeIndex]?.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute top-6 right-6 flex flex-col gap-2 p-2.5 rounded-full border border-border shadow-lg glass">
                      {projects.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                            activeIndex === index
                              ? "h-6 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                              : "h-1.5 bg-foreground/40 hover:bg-foreground/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* View All Projects Link */}
                  <Link
                    href="/work"
                    className="group relative inline-flex mt-4 cursor-pointer items-center justify-between overflow-hidden rounded-full border border-border bg-muted/50 py-1 pr-1 pl-4 font-medium text-base backdrop-blur-xl transition-all duration-300 ease-out hover:border-primary/30 hover:bg-accent active:scale-[0.98] w-full block text-center"
                  >
                    <span className="z-10 px-3 text-foreground transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-primary-foreground">
                      {t("viewAll")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-1 right-1 w-10 rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-[calc(100%-8px)]"
                    />
                    <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-primary p-2.5 transition-colors duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-transparent">
                      <svg
                        fill="none"
                        height={24}
                        viewBox="0 0 24 24"
                        width={24}
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4.5 text-primary-foreground transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
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
                        className="absolute size-4.5 -translate-x-6 text-primary-foreground opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
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
                  </Link>
                </div>
              </div>
            </div>

            {/* Right - Structured Scrolling Content */}
            <div className="w-full lg:w-[55%]">
              <div className="space-y-12 lg:space-y-0 lg:pb-[20vh] lg:pt-[10vh]">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex flex-col justify-center lg:min-h-[80vh] py-8 lg:py-0"
                    initial={{ opacity: 0.2, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Number */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl font-bold text-muted-foreground/40 font-mono">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <div className="h-0.5 flex-1 bg-border" />
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">
                      {project.name}
                    </h3>
                    <p className="text-primary text-xs sm:text-sm font-semibold mb-4">
                      {project.tagline}
                    </p>

                    {/* Problem / Solution / Result Structured Cards */}
                    <div className="space-y-3 mb-5 text-xs sm:text-sm">
                      {project.problem && (
                        <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                          <p className="font-semibold text-red-500 mb-0.5">🎯 Problem</p>
                          <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/15">
                          <p className="font-semibold text-blue-500 mb-0.5">💡 Solution</p>
                          <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                        </div>
                      )}
                      {project.result && (
                        <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                          <p className="font-semibold text-emerald-500 mb-0.5">⚡ Measurable Impact</p>
                          <p className="text-foreground font-medium leading-relaxed">{project.result}</p>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech_stack?.frameworks_libraries?.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted border border-border px-2.5 py-1 text-[11px] font-semibold text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link
                        href={`/work/${project.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all duration-300 shadow-sm"
                      >
                        {t("viewDetails")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {project.live_demo && (
                        <a
                          href={project.live_demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border hover:border-primary/30 hover:bg-accent text-xs font-semibold transition-all duration-300 shadow-sm text-foreground"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {t("viewLive")}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
