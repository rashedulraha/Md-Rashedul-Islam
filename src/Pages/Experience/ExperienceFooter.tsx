import { motion } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ExperienceFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mt-20 sm:mt-32 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-border/50 bg-card/5 backdrop-blur-xl flex flex-col items-center text-center space-y-8">
      <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
        Ready to initiate the{" "}
        <span className="text-primary italic font-serif lowercase font-light">
          next project?
        </span>
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button className="flex items-center justify-center gap-2">
          <Download size={14} /> Get Full Resume
        </Button>
        <Button>
          <Link
            to={"/contact"}
            className="flex items-center justify-center gap-2">
            Contact Me <ChevronRight size={14} />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
