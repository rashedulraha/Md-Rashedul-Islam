import { motion } from "framer-motion";
import type { SkillCategory } from "./types";

interface ExpertiseViewProps {
  skillCategories: SkillCategory[];
}

export default function ExpertiseView({ skillCategories }: ExpertiseViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {skillCategories.map((cat, idx) => (
        <div
          key={idx}
          className="group p-6 sm:p-8 rounded-4xl border border-border/40 bg-card/10 hover:bg-card/30 hover:border-primary/30 transition-all duration-500 flex flex-col justify-between min-h-60">
          <div className="flex justify-between items-start">
            <div
              className={`p-4 rounded-2xl bg-background border border-border group-hover:border-primary/50 transition-all ${cat.color}`}>
              {cat.icon}
            </div>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="space-y-4 pt-6">
            <h4 className="text-lg font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
              {cat.name}
            </h4>
            <p className="text-[11px] text-muted-foreground leading-snug">
              {cat.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((s, i) => (
                <span
                  key={i}
                  className="text-[8px] font-black uppercase tracking-widest bg-muted/40 px-2 py-1 rounded-md border border-border/50">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
