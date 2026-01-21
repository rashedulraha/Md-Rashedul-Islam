import { motion } from "framer-motion";

interface Skill {
  name: string;
  icon: React.ReactNode; // Assuming icon is passed as element
  level: number;
  description: string;
}

interface SkillBentoGridProps {
  skills: Skill[];
}

export default function SkillBentoGrid({ skills }: SkillBentoGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {skills.map((skill, idx) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="group relative p-6 sm:p-8 rounded-4xl border border-border/40 bg-card/10 hover:bg-card/30 hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-45 sm:min-h-55">
          <div className="flex justify-between items-start">
            <div className="p-4 rounded-2xl bg-background border border-border group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
              {skill.icon}
            </div>
            <div className="text-right">
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                Expertise
              </p>
              <span className="text-xs font-black text-primary uppercase">
                {skill.level}%
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">
                {skill.name}
              </h4>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {skill.description}
              </p>
            </div>

            {/* Minimal Progress Bar */}
            <div className="relative h-0.5 w-full bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
