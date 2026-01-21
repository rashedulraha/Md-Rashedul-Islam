import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function TechFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mt-20 sm:mt-32 mx-5 sm:mx-8 lg:mx-12",
        "px-8 py-12 sm:px-14 sm:py-16",
        "rounded-lg sm:rounded-lg",
        "border border-border/50",
        "bg-card/10 backdrop-blur-xl",
        "text-center space-y-9",
        "shadow-sm",
      )}>
      {/* Text */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
          Let's build the{" "}
          <span className="text-primary italic relative">
            Future
            <span className="absolute -bottom-1 left-0 h-0.75 w-full bg-primary/30 rounded-full" />
          </span>
          together.
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Available for full-stack engineering roles and strategic technical
          consultations. Expert in React, TypeScript, and Next.js with a passion
          for clean architecture.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Button
          asChild
          className={cn(
            "min-w-47.5 transition-all duration-300",
            "hover:shadow-md hover:-translate-y-0.5",
            "active:translate-y-0 active:shadow-sm",
          )}>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2">
            Launch Conversation
          </Link>
        </Button>

        <Button
          variant="outline"
          asChild
          className={cn(
            "min-w-47.5 group relative overflow-hidden",
            "transition-all duration-300",
            "border-border hover:border-primary/70",
            "hover:bg-primary/5 hover:-translate-y-0.5",
            "after:absolute after:inset-0 after:rounded-md",
            "after:border after:border-primary/0 after:transition-all",
            "hover:after:border-primary/30 hover:after:scale-[1.02]",
          )}>
          <Link
            to="/projects"
            className="flex items-center justify-center gap-1.5">
            View Project Lab
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
