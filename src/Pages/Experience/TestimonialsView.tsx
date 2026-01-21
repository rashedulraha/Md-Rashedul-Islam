import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "./types";

interface TestimonialsViewProps {
  testimonials: Testimonial[];
}

export default function TestimonialsView({
  testimonials,
}: TestimonialsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 gap-6">
      {testimonials.map((test) => (
        <div
          key={test.id}
          className="p-8 sm:p-12 rounded-[2.5rem] sm:rounded-4xl border border-border/40 bg-card/10 relative overflow-hidden group">
          <Quote className="absolute -top-4 -right-4 w-24 h-24 text-primary opacity-5 group-hover:opacity-10 transition-opacity" />
          <div className="flex gap-1 mb-6">
            {[...Array(test.rating)].map((_, i) => (
              <Star key={i} size={14} className="fill-primary text-primary" />
            ))}
          </div>
          <p className="text-lg sm:text-xl text-foreground font-serif italic mb-8 relative z-10">
            "{test.content}"
          </p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-black text-primary-foreground italic uppercase shadow-xl shadow-primary/20">
              {test.name[0]}
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest">
                {test.name}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase">
                {test.position}
              </p>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
