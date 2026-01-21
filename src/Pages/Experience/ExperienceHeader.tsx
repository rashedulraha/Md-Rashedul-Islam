import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Metric {
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface ExperienceHeaderProps {
  metricsData: Metric[];
}

export default function ExperienceHeader({
  metricsData,
}: ExperienceHeaderProps) {
  return (
    <header className="max-w-4xl mb-12 sm:mb-20 space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 text-primary font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.4em]">
        <span className="w-6 sm:w-12 h-[1.5px] bg-primary" />
        <span>Professional Career // 2026</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
        Experience & <br />
        <span className="text-muted-foreground italic font-serif lowercase font-light">
          Career Evolution.
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-2 pt-2">
        {metricsData.map((metric) => (
          <span
            key={metric.id}
            className="px-3 py-1 text-[9px] font-bold border border-border rounded-full bg-muted/20 text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <metric.icon size={10} className={metric.color} />
            {metric.value} {metric.label}
          </span>
        ))}
      </motion.div>
    </header>
  );
}
