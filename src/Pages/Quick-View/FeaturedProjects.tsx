// src/components/quick-view/FeaturedProjects.tsx
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { featuredProjects } from "./Data/quickViewData";

export default function FeaturedProjects() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-sm border-primary/30">
            Portfolio Highlights
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world applications showcasing my expertise and problem-solving
            skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}>
              <Card className="group h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
                <div
                  className={`h-32 bg-linear-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-6xl">
                    {project.image}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-black/50 text-white border-none">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-xs font-mono">
                    {project.tech}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {project.stats}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 group/btn"
                      asChild>
                      <a
                        href="https://github.com/rashedulraha"
                        target="_blank"
                        rel="noopener noreferrer">
                        View Details{" "}
                        <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
