import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, Mail, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuickStats from "../shared/QuickStats";

import CanvasTextRashedulIslam from "@/components/canvas-text-demo";

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
      {/* Badge - Fixed Font Size */}
      <Badge className="mb-4 sm:mb-5 bg-foreground/5 text-foreground border-foreground/20 text-[11px] sm:text-xs md:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
        Full-Stack Developer | System Architect
      </Badge>

      {/* Canvas Text Component - Size Adjusted */}
      <div className="mb-4 sm:mb-6">
        <CanvasTextRashedulIslam />
      </div>

      {/* Description - Proper Font Sizes */}
      <p className="text-[13px] sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal tracking-wide">
        Passionate Full-Stack Developer specializing in React, Next.js, Node.js,
        and cloud architecture. I transform complex problems into elegant,
        scalable digital solutions with clean code and modern practices.
      </p>

      {/* Quick Stats Component */}
      <div className="mb-8 sm:mb-10">
        <QuickStats />
      </div>

      {/* CTA Buttons - Consistent Sizing */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
        <Button
          size="lg"
          className="group w-full sm:w-auto h-10 sm:h-11 md:h-12 text-[13px] sm:text-sm md:text-base font-medium rounded-full px-4 sm:px-6 md:px-8 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/30 hover:scale-105">
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
          Download Resume
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <Link to="/contact" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full h-10 sm:h-11 md:h-12 text-[13px] sm:text-sm md:text-base font-medium rounded-full px-4 sm:px-6 md:px-8 border-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 hover:scale-105">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
            Get In Touch
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
