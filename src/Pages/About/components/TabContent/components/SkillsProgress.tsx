import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { ProficiencyItem } from "@/Pages/About/types";

const proficiencyData: ProficiencyItem[] = [
  { name: "Frontend Development", level: 95 },
  { name: "Backend Development", level: 85 },
  { name: "Database Management", level: 80 },
  { name: "DevOps & Tools", level: 75 },
];

export default function SkillsProgress() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <Card className="p-5 sm:p-6 lg:p-8 bg-card/20 backdrop-blur-sm border-border/40">
        <h4 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">
          Proficiency Level
        </h4>
        <div className="space-y-4 sm:space-y-5">
          {proficiencyData.map((skill, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-medium">
                  {skill.name}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground font-bold">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
