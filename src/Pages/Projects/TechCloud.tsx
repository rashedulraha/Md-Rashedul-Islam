import { motion } from "framer-motion";
import type { Project } from "@/Routes/Types/projectType";

interface TechCloudProps {
  projects: Project[];
}

export default function TechCloud({ projects }: TechCloudProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-20 space-y-6">
      <h3 className="text-xl font-bold">Technologies Used</h3>
      <div className="flex flex-wrap gap-2">
        {Array.from(new Set(projects.flatMap((p) => p.tech)))
          .slice(0, 20)
          .map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="px-3 py-1.5 text-sm bg-card/20 backdrop-blur-sm border border-border/40 rounded-full hover:border-primary/50 hover:text-primary transition-colors">
              {tech}
            </motion.span>
          ))}
      </div>
    </motion.div>
  );
}
