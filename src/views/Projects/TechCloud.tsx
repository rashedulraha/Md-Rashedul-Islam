import { motion } from "framer-motion";
import type { Project } from "@/Routes/Types/projectType";

interface TechCloudProps {
  projects: Project[];
}

export default function TechCloud({ projects }: TechCloudProps) {
  const allTechs = Array.from(new Set(projects.flatMap((p) => p.tech))).slice(
    0,
    20,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 sm:mt-20 space-y-6 px-4 sm:px-0">
      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-center sm:text-left">
        Technologies I Work With
      </h3>

      <div className="flex flex-wrap justify-center sm:justify-start gap-3">
        {allTechs.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.2 },
            }}
            className={`
              inline-flex items-center px-4 py-2 
              text-sm font-medium 
              rounded-full 
              bg-muted/50 
              border border-border/60 
              text-foreground/90 
              transition-all duration-300 
              hover:border-primary/70 
              hover:bg-primary/5 
              hover:text-primary 
              hover:shadow-sm 
              cursor-default
            `}>
            {tech}
          </motion.span>
        ))}
      </div>

      {allTechs.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">
          No technologies listed yet.
        </p>
      )}
    </motion.div>
  );
}
