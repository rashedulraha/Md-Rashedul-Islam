import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { testimonials } from "@/Data/AboutData/AboutData";

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

export default function TestimonialsTab() {
  return (
    <motion.div
      key="testimonials"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 sm:space-y-8">
      <h3 className="text-2xl sm:text-3xl font-bold">Client Testimonials</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="p-4 sm:p-5 lg:p-6 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all h-full flex flex-col">
              <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 italic flex-1 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border/40">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
