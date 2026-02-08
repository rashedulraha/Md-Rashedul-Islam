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
    relative overflow-hidden
    h-full p-4 sm:p-5 
    bg-white/5 backdrop-blur-md 
    border border-white/10 
    shadow-[0_8px_30px_rgb(0,0,0,0.04)]
    hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)]
    hover:border-primary/20
    hover:-translate-y-1
    transition-all duration-500 ease-out
    group
  `}>
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center gap-5">
              {/* Icon Container with Glass Effect */}
              <div
                className={`
            p-3 rounded-2xl 
          ${stat.bg} 
          bg-opacity-10 backdrop-blur-xl
          ring-1 ring-white/10
          group-hover:scale-110 transition-transform duration-500
    `}>
                <stat.icon
                  className={`h-6 w-6 ${stat.color} filter drop-shadow-sm`}
                />
              </div>

              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
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
