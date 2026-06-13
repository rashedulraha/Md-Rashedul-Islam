import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpotlightPreview } from "../shared/SpotlightPreview/SpotlightPreview";

const data = {
  title: "Let's build the Future together.",
  subTitle: `Available for full-stack engineering roles and strategic technical
          consultations. Expert in React, TypeScript, and Next.js with a passion
          for clean architecture.`,
  button1: "Launch Conversation",
  button2: "View Project Lab",
  icons2: ChevronRight,
};

export default function TechFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mt-20 sm:mt-32 mx-5 sm:mx-8 lg:mx-12",
        "rounded-lg sm:rounded-lg",
        "border border-border/50",
        "bg-card/10 backdrop-blur-xl",
        "text-center space-y-9",
        "shadow-sm",
      )}>
      {/* CTA Buttons */}
      <SpotlightPreview data={data} />
    </motion.div>
  );
}
