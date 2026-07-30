"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/routing";
import { useTranslations } from "next-intl";

const tools = [
  {
    name: "Zed",
    image: "/images/image_1.jpg",
    delay: 200,
    size: "size-24",
  },
  {
    name: "Claude Code",
    image: "/images/image_2.jpg",
    delay: 100,
    size: "size-24",
  },
  {
    name: "Ghostty",
    image: "/images/image.jpg",
    delay: 0,
    size: "size-28",
  },
  {
    name: "Arc",
    image: "/images/image_11.jpg",
    delay: 100,
    size: "size-24",
  },
  {
    name: "Linear",
    image: "/images/image_3.jpg",
    delay: 200,
    size: "size-24",
  },
];

const Usesd = () => {
  const t = useTranslations("Features.Uses");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div
      ref={sectionRef}
      className="col-span-12 md:col-span-6 lg:col-span-4 h-full">
      <Link href="/uses" className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl cursor-pointer h-full min-h-72 card-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ y: -4 }}
          className="w-full h-full flex flex-col justify-between"
          >
          {/* Background gradient on hover */}
          <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="size-full relative z-10">
          <div className="mt-10 flex items-center justify-center gap-3 md:mt-12">
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + idx * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="inline-block text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-[20px] border-2 border-foreground/10 p-2 transition-all duration-500 group-hover:-translate-y-3 group-hover:border-primary/60 ${tool.size} delay-[${tool.delay}ms]`}>
                  <div className="grid h-full place-items-center rounded-xl border border-border bg-muted/50 shadow-inner transition-colors duration-500 group-hover:bg-primary/10 glass">
                    <Image
                      alt={tool.name}
                      loading="lazy"
                      width={50}
                      height={50}
                      className="h-10 w-10 object-contain"
                      style={{ color: "transparent" }}
                      src={tool.image}
                    />
                  </div>
                </motion.div>

                {/* Tool name label */}
                <p className="mt-1 text-[9px] text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tool.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Overlay */}
        <div className="pointer-events-none z-10 flex flex-col gap-0.5 p-5 w-full text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-primary/80">
            {t('badge')}
          </p>
          <p className="text-sm font-roboto text-muted-foreground tracking-wide dark:text-muted-foreground group-hover:text-foreground dark:group-hover:text-foreground transition-colors duration-500">
            {t('title')}
          </p>
        </div>

        {/* Arrow Button */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          whileHover={{ y: -2, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute right-4 bottom-4 z-20 flex size-9 items-center justify-center rounded-2xl border-dashed bg-background/5 hover:bg-background/10 max-md:border dark:bg-foreground/5 dark:hover:bg-foreground/10 transition-all duration-300 ease-out">
          <ArrowRight className="size-4.5 text-muted-foreground dark:text-muted-foreground" />
        </motion.div>

        {/* Tool count badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/30">
          <span className="w-1 h-1 rounded-full bg-primary" />
          <span className="text-[9px] text-muted-foreground/60 uppercase tracking-wider font-medium">
            {tools.length} {t('toolsCount')}
          </span>
        </motion.div>
      </motion.div>
      </Link>
    </div>
  );
};

export default Usesd;
