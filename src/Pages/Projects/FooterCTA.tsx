import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FooterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mt-20 sm:mt-32 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-border/50 bg-card/5 backdrop-blur-xl flex flex-col items-center text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
          Interested in my <span className="text-primary italic">work?</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Let's discuss how I can contribute to your next project or
          collaboration opportunity.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button className="flex items-center justify-center gap-2">
          <Link to={"/contact"}>Get In Touch</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2">
          View GitHub <ChevronRight size={14} />
        </Button>
      </div>
    </motion.div>
  );
}
