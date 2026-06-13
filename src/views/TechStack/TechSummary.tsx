import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Globe, Cpu } from "lucide-react";

// Assuming a simplified type for the active category
interface CategoryData {
  category: string;
  description: string;
}

interface TechSummaryProps {
  categoryData: CategoryData;
}

export default function TechSummary({ categoryData }: TechSummaryProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryData.category}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-primary">
            {categoryData.category} Domain
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
            {categoryData.description}
          </p>
        </div>

        {/* Technical Stats */}
        <div className="grid grid-cols-1 gap-4 pt-6">
          {[
            {
              icon: <Cpu size={14} />,
              label: "Performance Focus",
              desc: "99.9% Uptime logic",
            },
            {
              icon: <ShieldCheck size={14} />,
              label: "Security First",
              desc: "Best practices followed",
            },
            {
              icon: <Globe size={14} />,
              label: "Global Standards",
              desc: "W3C Compliance",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-2xl border border-border/50 bg-card/10">
              <div className="text-primary mt-1">{item.icon}</div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
