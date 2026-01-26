import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SpotlightPreview } from "../shared/SpotlightPreview/SpotlightPreview";
import { FaGithub } from "react-icons/fa";

const data = {
  title: " Interested in working together?",
  subTitle:
    "Im currently open to new opportunities and collaborations. Lets discuss how I can support your next project",
  button1: "Get in Touch",
  button2: " View GitHub",
  link: "https://github.com/rashedulraha",
  icons: FaGithub,
};

export default function FooterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mt-20 sm:mt-28 mx-5 sm:mx-8 lg:mx-12",
        "rounded-2xl border border-border bg-card/40",
        "text-center space-y-7 overflow-hidden border",
      )}>
      <SpotlightPreview data={data} />
    </motion.div>
  );
}
