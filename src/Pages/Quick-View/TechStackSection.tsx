import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { techStackData } from "./Data/quickViewData";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";

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

// Type assertion
const typedTechStackData = techStackData as TechStackDataType;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const, // <--- TypeScript Error Fix (Added 'as const')
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function TechStackSection() {
  // State for custom tab animation handling
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-muted/10">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-sm border-primary/30 bg-primary/5 text-primary/80 backdrop-blur-md">
            Technical Expertise
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Tech Stack & <br className="sm:hidden" />
            {/* Fixed: bg-linear-to-r -> bg-gradient-to-r */}
            <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive overview of the tools and technologies I use to
            build scalable, production-ready applications.
          </p>
        </motion.div>

        <Tabs
          defaultValue="frontend"
          className="w-full max-w-6xl mx-auto"
          onValueChange={setActiveTab}>
          {/* Custom Tabs List with Sliding Animation */}
          <div className="relative flex justify-center mb-16">
            <TabsList className="relative bg-background/50 border border-border/50 p-1.5 rounded-2xl backdrop-blur-xl shadow-xl shadow-black/5 overflow-visible">
              {/* Sliding Active Pill */}
              <motion.div
                className="absolute top-1.5 left-1.5 h-[calc(100%-12px)] bg-background border border-border/50 rounded-xl shadow-md z-0"
                initial={false}
                animate={{
                  x: `calc(${Object.keys(typedTechStackData).indexOf(activeTab) * 100}% + 6px)`,
                  width: `calc(25% - 12px)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {(
                Object.entries(typedTechStackData) as [string, TechCategory][]
              ).map(([key, value]: [string, TechCategory]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="relative z-10 gap-2 px-6 py-3 rounded-xl text-sm font-medium data-[state=active]:text-foreground data-[state=active]:shadow-none text-muted-foreground transition-colors">
                  <value.icon
                    className={`h-4 w-4 ${activeTab === key ? "text-primary" : ""}`}
                  />
                  <span className="capitalize hidden sm:inline">{key}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content with Staggered Animation */}
          {(Object.entries(typedTechStackData) as [string, TechCategory][]).map(
            ([key, category]: [string, TechCategory]) => (
              <TabsContent key={key} value={key} className="focus:outline-none">
                <motion.div
                  key={key}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.technologies.map(
                    (tech: Technology, idx: number) => (
                      <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="h-full">
                        <Card className="group relative h-full overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 transition-all duration-300">
                          {/* Glow effect on hover */}
                          <div
                            className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                          />

                          <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                            <div className="mb-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-xl bg-background border border-border/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                  <tech.icon className="h-6 w-6 text-foreground" />
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-2xl font-bold tracking-tighter text-foreground">
                                    {tech.level}%
                                  </span>
                                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                    Proficiency
                                  </span>
                                </div>
                              </div>

                              <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                {tech.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {key === "frontend" &&
                                  "User Interface & Experience"}
                                {key === "backend" && "Server Side & Logic"}
                                {key === "devops" && "Infrastructure & CI/CD"}
                                {key === "ai" && "Intelligence & Automation"}
                              </p>
                            </div>

                            {/* Advanced Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                <span>Beginner</span>
                                <span>Expert</span>
                              </div>
                              <div className="relative h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${tech.level}%` }}
                                  transition={{
                                    duration: 1,
                                    delay: 0.2 + idx * 0.1,
                                  }}
                                  viewport={{ once: true }}
                                  // Fixed: bg-linear-to-r -> bg-gradient-to-r
                                  className={`absolute top-0 left-0 h-full rounded-full bg-linear-to-r ${category.color} shadow-[0_0_10px_rgba(var(--primary),0.5)]`}
                                />
                              </div>
                            </div>
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
