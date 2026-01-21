import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code, Globe, Zap, Star } from "lucide-react";
import type { Project } from "@/Routes/Types/projectType";

interface ProjectStatsProps {
  projects: Project[];
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  const totalProjects = projects.length;
  const liveProjects = projects.filter((p) => p.status === "live").length;
  const activeProjects = projects.filter(
    (p) => p.status === "development",
  ).length;
  const featuredProjects = projects.filter((p) => p.featured === true).length;
  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: Code,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Live Projects",
      value: liveProjects,
      icon: Globe,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "In Development",
      value: activeProjects,
      icon: Zap,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Featured",
      value: featuredProjects,
      icon: Star,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-12 px-4 sm:px-0">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}>
          <Card
            className={`
              h-full p-2 sm:p-3 
              border border-border/60 
              bg-card 
              shadow-sm 
              hover:shadow-md 
              hover:border-border 
              transition-all duration-300
            `}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
