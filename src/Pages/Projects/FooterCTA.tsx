import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";

export default function FooterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mt-20 sm:mt-28 mx-5 sm:mx-8 lg:mx-12",
        "px-6 py-10 sm:px-10 sm:py-12 md:p-14",
        "rounded-2xl border border-border bg-card/40",
        "text-center space-y-7",
      )}>
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Interested in working together?
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          I'm currently open to new opportunities and collaborations. Let's
          discuss how I can support your next project.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Button
          asChild
          className={cn(
            "min-w-45 transition-all duration-300",
            "hover:shadow-md hover:-translate-y-0.5",
            "active:translate-y-0 active:shadow-sm",
          )}>
          <Link to="/contact">Get in Touch</Link>
        </Button>

        <Button
          variant="outline"
          asChild
          className={cn(
            "min-w-45 group relative overflow-hidden transition-all duration-300",
            "border-border hover:border-primary/70 hover:bg-primary/5",
            "hover:shadow-sm hover:-translate-y-0.5",
            // subtle interactive border feel
            "after:absolute after:inset-0 after:rounded-md after:border after:border-primary/0 after:transition-all after:duration-300",
            "hover:after:border-primary/30 hover:after:scale-[1.02]",
          )}>
          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5">
            <FaGithub />
            View GitHub
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
}
