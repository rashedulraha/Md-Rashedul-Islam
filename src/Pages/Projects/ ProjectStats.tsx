import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code, Globe, Zap, ShieldCheck } from "lucide-react";
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
  // Featured logic can be added here if needed in data

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
      <Card className="p-4 bg-card/20 backdrop-blur-sm border-border/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-bold text-lg">{totalProjects}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card/20 backdrop-blur-sm border-border/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Globe className="h-4 w-4 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Live</p>
            <p className="font-bold text-lg">{liveProjects}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card/20 backdrop-blur-sm border-border/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Zap className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="font-bold text-lg">{activeProjects}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card/20 backdrop-blur-sm border-border/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <ShieldCheck className="h-4 w-4 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Featured</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
