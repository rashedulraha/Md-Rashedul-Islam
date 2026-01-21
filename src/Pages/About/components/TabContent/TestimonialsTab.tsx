import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import { certifications } from "@/Data/AboutData/AboutData";

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

export default function EducationTab() {
  return (
    <motion.div
      key="education"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 sm:space-y-8">
      <h3 className="text-2xl sm:text-3xl font-bold">
        Education & Certifications
      </h3>

      <motion.div variants={itemVariants}>
        <Card className="p-5 sm:p-6 lg:p-8 bg-card/20 backdrop-blur-sm border-border/40">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 rounded-xl bg-primary/10 shrink-0">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                Bachelor of Science in Computer Science & Engineering
              </h4>
              <p className="text-primary font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                Expected Graduation: 2025
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Specializing in Software Engineering and Web Technologies. Focus
                on building scalable applications and understanding modern
                development practices.
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <Badge variant="secondary" className="text-xs">
                  Data Structures
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Algorithms
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Web Technologies
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Database Systems
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div>
        <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">
          Professional Certifications
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-4 sm:p-5 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all h-full">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm sm:text-base mb-0.5">
                      {cert.name}
                    </h5>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {cert.year}
                  </Badge>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground break-all">
                  Credential: {cert.credential}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
