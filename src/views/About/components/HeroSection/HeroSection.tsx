import { motion } from "framer-motion";
import ProfileImage from "./ProfileImage";
import HeroContent from "./HeroContent";
import { ScalesWithImageDemo } from "../shared/ScalesWithImage";

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

export default function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
        {/* <ProfileImage /> */}
        <div className="w-full md:flex-1">
          <ScalesWithImageDemo />
        </div>
        <div className="w-full md:flex-2">
          <HeroContent />
        </div>
      </div>
    </motion.section>
  );
}
