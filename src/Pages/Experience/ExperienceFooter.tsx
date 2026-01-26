import { motion } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";
import { SpotlightPreview } from "../shared/SpotlightPreview/SpotlightPreview";

const data = {
  title: "Ready to initiate the next project?",
  subTitle:
    "Im currently open to new opportunities and collaborations. Lets discuss how I can support your next project",
  button1: "Get Full Resume",
  button2: "Contact Me",
  icons1: Download,
  icons2: ChevronRight,
};

export default function ExperienceFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mt-20 overflow-hidden rounded-lg sm:rounded-lg border border-border/50 bg-card/5 backdrop-blur-xl flex flex-col items-center text-center space-y-8">
      <SpotlightPreview data={data} />
    </motion.div>
  );
}
