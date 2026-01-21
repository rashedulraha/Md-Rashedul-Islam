import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import ContactInfo from "../shared/ContactInfo";
import { Details } from "@/Data/AboutData/AboutData";

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
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
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

export default function OverviewTab() {
  return (
    <motion.div
      key="overview"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* About Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {Details.slice(0, 4).map((detail, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="p-4 sm:p-5 lg:p-6 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all group h-full">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all shrink-0">
                  <div className="text-primary [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                    {detail.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {detail.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                    {detail.content}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <ContactInfo />
    </motion.div>
  );
}
