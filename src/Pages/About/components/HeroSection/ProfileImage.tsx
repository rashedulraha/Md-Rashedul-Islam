import { motion } from "framer-motion";
import image from "../../../../assets/rashedul.jpeg";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function ProfileImage() {
  return (
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
  );
}
