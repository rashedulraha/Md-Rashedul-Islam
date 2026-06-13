import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillsCategories } from "@/Data/AboutData/AboutData";
import SkillsProgress from "./components/SkillsProgress";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function SkillsTab() {
  return (
    <motion.div
      key="skills"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 sm:space-y-8">
      <h3 className="text-2xl sm:text-3xl font-bold">Technical Skills</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {skillsCategories.map((category, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="p-4 sm:p-5 lg:p-6 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all h-full">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 shrink-0">
                    <div className="text-primary [&>svg]:w-5 [&>svg]:h-5">
                      {category.icon}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-bold mb-1.5">
                      {category.title}
                    </h4>
                    <Badge variant="outline" className="text-[10px] sm:text-xs">
                      {category.level}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs bg-background/50 border border-border rounded-full hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <SkillsProgress />
    </motion.div>
  );
}
