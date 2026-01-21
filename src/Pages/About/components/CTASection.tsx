import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-12 sm:mt-16 lg:mt-20 p-6 sm:p-8 md:p-10 lg:p-16 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] border border-border/50 bg-linear-to-br from-card/20 to-card/5 backdrop-blur-xl text-center">
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight">
          Ready to Build Something{" "}
          <span className="text-primary italic block sm:inline mt-1 sm:mt-0">
            Amazing?
          </span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-4">
          I'm always excited to take on new challenges and collaborate on
          innovative projects. Let's discuss how I can contribute to your team's
          success.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 max-w-md mx-auto">
          <Button size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Start Conversation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/projects.pdf" download>
              <Download className="w-4 h-4 mr-2" />
              View Portfolio
            </a>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
