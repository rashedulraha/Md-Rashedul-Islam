import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MapPin, Mail } from "lucide-react";
import SocialLinks from "./SocialLinks";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function ContactInfo() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="p-5 sm:p-6 lg:p-8 bg-card/20 backdrop-blur-sm border-border/40">
        <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
          Let's Connect
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background/50 border border-border/40">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-0.5">
                Location
              </p>
              <p className="font-semibold text-sm sm:text-base">
                Naogaon, Bangladesh
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background/50 border border-border/40">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <div className="min-w-0 overflow-hidden">
              <p className="text-xs sm:text-sm text-muted-foreground mb-0.5">
                Email
              </p>
              <p className="font-semibold text-sm sm:text-base truncate">
                rashedulraha.bd@gmail.com
              </p>
            </div>
          </div>
        </div>

        <SocialLinks />
      </Card>
    </motion.div>
  );
}
