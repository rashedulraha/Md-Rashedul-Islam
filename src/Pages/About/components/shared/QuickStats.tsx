import { motion } from "framer-motion";
import { aboutData } from "@/Data/AboutData/AboutData";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
      {aboutData.slice(0, 4).map((stat, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="text-center lg:text-left bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-3 sm:p-4">
          <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
            <div className="text-primary [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
              {stat.icon}
            </div>
            <span className="text-xl sm:text-2xl lg:text-3xl font-black">
              {stat.value}
            </span>
          </div>
          <p className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
