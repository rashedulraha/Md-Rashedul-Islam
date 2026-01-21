import { motion } from "framer-motion";

interface Tech {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface TechOverviewProps {
  technologies: Tech[];
}

export default function TechOverview({ technologies }: TechOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mt-20 sm:mt-32 space-y-10">
      {/* Heading */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
          Complete Technology <span className="text-primary">Stack</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
          A modern and scalable tech stack I use to build high-performance
          applications.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {technologies.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group p-4 rounded-2xl border border-border/40 bg-card/10 backdrop-blur hover:border-primary/40 hover:bg-card/30 transition-all duration-300 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-background/40 group-hover:scale-110 transition-transform">
                <Icon className={`w-6 h-6 ${tech.color}`} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-center">
                {tech.name}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
