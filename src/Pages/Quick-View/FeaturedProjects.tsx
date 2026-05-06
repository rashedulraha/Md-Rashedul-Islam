import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { featuredProjects } from "./Data/quickViewData";
import { FaGithub } from "react-icons/fa";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function FeaturedProjects() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-muted/10">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-150 h-150 bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-100 h-100 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-sm border-primary/30 bg-primary/5 text-primary/80 backdrop-blur-md">
            Portfolio Highlights
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Featured{" "}
            <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of projects that demonstrate my ability to solve complex
            problems and build scalable, user-centric applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredProjects.map((project, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Card className="group relative h-full flex flex-col overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:bg-card/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                {/* Top Banner Area */}
                <div
                  className={`h-48 w-full relative overflow-hidden bg-linear-to-br ${project.gradient}`}>
                  {/* Grid Pattern Overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQgMEgwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

                  {/* Floating Icon/Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileHover={{ scale: 1.1, rotate: 5, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-8xl drop-shadow-2xl opacity-80">
                      {project.image}
                    </motion.div>
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white hover:bg-black/60 transition-colors shadow-lg">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      Featured
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </CardTitle>
                  {/* Tech Stack as Pills */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {typeof project.tech === "string" ? (
                      project.tech.split(",").map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5 h-5 rounded-md font-medium bg-muted/50 border-border/50">
                          {tech.trim()}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs font-mono text-muted-foreground">
                        {String(project.tech)}
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col grow pt-0">
                  <p className="text-sm text-muted-foreground mb-6 grow leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    {/* Stats */}
                    <div className="text-xs text-muted-foreground font-medium">
                      {project.stats}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 group/btn px-4 h-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                      asChild>
                      <a
                        href="https://github.com/rashedulraha"
                        target="_blank"
                        rel="noopener noreferrer">
                        <FaGithub className="h-4 w-4" />
                        <span>Details</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
