import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, Mail, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuickStats from "../shared/QuickStats";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={itemVariants}
      className="flex-1 text-center lg:text-left w-full">
      <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-3 py-1">
        Full-Stack Developer
      </Badge>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase mb-3 sm:mb-4 leading-tight">
        Rashedul <span className="text-primary block sm:inline">Islam</span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
        Passionate Full-Stack Developer specializing in React, Next.js, and
        Node.js. I transform complex problems into elegant, scalable digital
        solutions.
      </p>

      <QuickStats />

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
        <Button
          size="lg"
          className="group w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base">
          <Download className="w-4 h-4 mr-2" />
          Download Resume
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Link to="/contact" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full h-11 sm:h-12 text-sm sm:text-base">
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
