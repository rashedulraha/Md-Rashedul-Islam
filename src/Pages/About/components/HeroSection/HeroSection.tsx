import { motion } from "framer-motion";
import ProfileImage from "./ProfileImage";
import HeroContent from "./HeroContent";

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
      variants={containerVariants}
      className="mb-12 sm:mb-16 lg:mb-20">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
        <ProfileImage />
        <HeroContent />
      </div>
    </motion.section>
  );
}
