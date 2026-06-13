import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  issuer: string;
}

interface ExperienceSummaryProps {
  activeTab: string;
  certificationsData: Certification[];
}

export default function ExperienceSummary({
  activeTab,
  certificationsData,
}: ExperienceSummaryProps) {
  const descriptions = {
    Timeline:
      "A strategic log of roles and technical contributions that shaped high-performance products.",
    Expertise:
      "Deep-dive into core domains where I bridge the gap between user needs and technical feasibility.",
    Testimonials:
      "Direct feedback from industry professionals and clients who experienced my development workflow.",
  };

  const currentDescription =
    descriptions[activeTab as keyof typeof descriptions] || "";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-primary">
          {activeTab} Overview
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
          {currentDescription}
        </p>

        {/* Validation Stats */}
        <div className="pt-8 border-t border-border/40 space-y-4">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-2xl border border-border/50 bg-card/10 flex gap-4 items-center group">
              <div className="text-primary group-hover:scale-110 transition-transform">
                <Award size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">
                  {cert.name}
                </p>
                <p className="text-[9px] text-muted-foreground italic">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
