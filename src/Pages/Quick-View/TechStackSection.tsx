import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { techStackData } from "./Data/quickViewData";
import { TabsContent } from "@radix-ui/react-tabs";

// Type definitions
interface Technology {
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface TechCategory {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  technologies: Technology[];
}

interface TechStackDataType {
  frontend: TechCategory;
  backend: TechCategory;
  devops: TechCategory;
  ai: TechCategory;
}

// Type assertion for techStackData
const typedTechStackData = techStackData as TechStackDataType;

export default function TechStackSection() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
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
            Technical Expertise
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Tech Stack &{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Production-ready skills with continuous learning and improvement
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-12 p-1 bg-muted/20">
            {(
              Object.entries(typedTechStackData) as [string, TechCategory][]
            ).map(([key, value]: [string, TechCategory]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="gap-2 data-[state=active]:bg-primary/10">
                <value.icon className="h-4 w-4" />
                <span className="capitalize">{key}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {(Object.entries(typedTechStackData) as [string, TechCategory][]).map(
            ([key, category]: [string, TechCategory]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.technologies.map(
                    (tech: Technology, idx: number) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}>
                        <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-background/50 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg bg-linear-to-br ${category.color} bg-opacity-10`}>
                                  <tech.icon className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-semibold">
                                  {tech.name}
                                </span>
                              </div>
                              <span className="text-sm font-mono text-primary">
                                {tech.level}%
                              </span>
                            </div>
                            <Progress value={tech.level} className="h-2" />
                          </CardContent>
                        </Card>
                      </motion.div>
                    ),
                  )}
                </motion.div>
              </TabsContent>
            ),
          )}
        </Tabs>
      </div>
    </section>
  );
}
