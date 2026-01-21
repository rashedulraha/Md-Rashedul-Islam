import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, Badge } from "lucide-react";
import { aboutData } from "@/Data/AboutData/AboutData";
import image from "../../assets/rashedul.jpeg";
import type { Stat } from "../types";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function AboutHero() {
  const stats: Stat[] = aboutData.slice(0, 4) as Stat[];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-12 sm:mb-16 lg:mb-20">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
        {/* Profile Image */}
        <motion.div
          variants={itemVariants}
          className="relative group w-full max-w-60 sm:max-w-70 lg:max-w-none lg:w-auto">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-primary/20 bg-card shadow-2xl">
            <img
              src={image}
              alt="Rashedul Islam"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
          </div>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-4 bg-card/95 backdrop-blur-xl border border-border p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl w-[calc(100%-2rem)] sm:w-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-green-500/20 p-1.5 sm:p-2 rounded-lg">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-[9px] sm:text-xs text-muted-foreground uppercase font-bold tracking-wider">
                  Status
                </p>
                <p className="text-xs sm:text-sm font-bold text-green-600">
                  Available for Hire
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Content */}
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

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center lg:text-left bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                  <div className="text-primary [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                    {stat.icon}
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black">
                    {stat.value}
                  </span>
                </div>
                <p className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

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
      </div>
    </motion.section>
  );
}
