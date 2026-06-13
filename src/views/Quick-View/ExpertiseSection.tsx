import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Clock } from "lucide-react";
import { expertiseAreas, recentWork } from "./Data/quickViewData";

// Add this interface
interface WorkItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

export default function ExpertiseSection() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Expertise Areas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-primary" />
                  <CardTitle>Core Expertise</CardTitle>
                </div>
                <CardDescription>
                  Areas where I excel and deliver value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expertiseAreas.map((area: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{area}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Focus */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <CardTitle>Current Focus</CardTitle>
                </div>
                <CardDescription>
                  What I'm working on and learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(recentWork as WorkItem[]).map(
                    (work: WorkItem, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-3 mb-2">
                          <work.icon className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-sm">
                            {work.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {work.value}
                        </p>
                      </motion.div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
