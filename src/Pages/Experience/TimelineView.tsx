import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface TimelineItem {
  role: string;
  org: string;
  duration: string;
  phase: string;
  description: string;
  impact: string;
  stack: string[];
  link?: string;
}

interface TimelineViewProps {
  timeline: TimelineItem[];
}

export default function TimelineView({ timeline }: TimelineViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4">
      {timeline.map((item, idx) => (
        <div
          key={idx}
          className="group p-6 sm:p-10 rounded-4xl border border-border/40 bg-card/10 hover:bg-card/30 hover:border-primary/30 transition-all duration-500 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded-full border border-primary/20">
                  {item.duration}
                </span>
                <span className="text-[9px] text-muted-foreground uppercase font-mono tracking-widest">
                  {item.phase}
                </span>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                {item.role}
              </h4>
              <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase">
                <Briefcase size={12} className="text-primary" /> {item.org}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-border pl-4">
                {item.description}
              </p>
            </div>
            <div className="md:w-48 space-y-4">
              <div className="p-4 bg-background/50 rounded-2xl border border-border">
                <p className="text-[8px] font-bold uppercase text-primary mb-1 tracking-widest text-center">
                  Outcome
                </p>
                <p className="text-center font-black text-sm uppercase leading-tight">
                  {item.impact}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
