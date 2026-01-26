import { motion } from "framer-motion";
import { Download, Mail, ArrowRight } from "lucide-react";
import { SpotlightPreview } from "@/Pages/shared/SpotlightPreview/SpotlightPreview";

const data = {
  title: "Ready to Build Something Amazing?",
  subTitle: `I'm always excited to take on new challenges and collaborate on
          innovative projects. Let's discuss how I can contribute to your team's
          success.`,
  button1: "Start Conversation",
  button2: "View Portfolio",
  icons1: Mail,
  icons2: Download,
  icons3: ArrowRight,
};

export default function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-12 overflow-hidden rounded-lg sm:rounded-lg  lg:rounded-lg border border-border/50 bg-linear-to-br from-card/20 to-card/5 backdrop-blur-xl text-center ">
      <SpotlightPreview data={data} />
    </motion.section>
  );
}
