import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, Zap } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/20 via-primary/10 to-transparent p-10 sm:p-16 text-center max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-grid-white/5 mask-[radial-gradient(ellipse_at_center,white,transparent)]" />
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
            />
            <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Build Something{" "}
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Let's collaborate on your next big idea. I'm always excited to
              work on challenging projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2 group" asChild>
                <a href="/contact">
                  Start a Conversation
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 group"
                asChild>
                <a href="/projects">
                  View All Projects
                  <Code2 className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
