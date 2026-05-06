import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Flame,
  Trophy,
  Code2,
  GitBranch,
  Star,
  Users,
} from "lucide-react";

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
  hidden: { opacity: 0, y: 20 },
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

export default function GitHubStats() {
  const topLanguages = [
    { lang: "TypeScript", percent: 40, color: "bg-foreground" },
    { lang: "Python", percent: 25, color: "bg-foreground/80" },
    { lang: "Go", percent: 20, color: "bg-foreground/60" },
    { lang: "JavaScript", percent: 15, color: "bg-foreground/40" },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-muted/5">
      {/* Background Decoration - B&W only */}
      <div className="absolute bottom-0 right-0 w-150 h-150 bg-foreground/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-100 h-100 bg-foreground/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-sm border-foreground/20 bg-foreground/5 text-foreground/80 backdrop-blur-md">
            Open Source
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            GitHub{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground/70 to-foreground/40 bg-clip-text text-transparent">
              Analytics
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tracking my coding journey and contributions to the community.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Streak Stats */}
          <motion.div variants={itemVariants}>
            <Card className="group relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Flame className="h-6 w-6 text-foreground/80" />
                </div>
                <div className="text-4xl font-black text-foreground mb-2 tracking-tighter">
                  2k+
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                  Total Contributions
                </div>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <div className="text-2xl font-bold text-foreground/80 mb-1">
                    🔥 200+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Current Day Streak
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Languages */}
          <motion.div variants={itemVariants}>
            <Card className="group h-full border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
                    <Code2 className="h-5 w-5 text-foreground/80" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">
                    Top Languages
                  </h3>
                </div>

                <div className="space-y-5 grow flex flex-col justify-center">
                  {topLanguages.map((lang, idx) => (
                    <div key={lang.lang} className="group/bar">
                      <div className="flex justify-between text-sm mb-1.5 font-medium">
                        <span className="text-foreground group-hover/bar:text-foreground/80 transition-colors">
                          {lang.lang}
                        </span>
                        <span className="text-muted-foreground">
                          {lang.percent}%
                        </span>
                      </div>
                      <div className="relative h-2.5 w-full bg-foreground/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percent}%` }}
                          transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                          viewport={{ once: true }}
                          className={`absolute top-0 left-0 h-full rounded-full ${lang.color} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* DSA Stats */}
          <motion.div variants={itemVariants}>
            <Card className="group relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6 text-foreground/80" />
                </div>
                <div className="text-4xl font-black text-foreground mb-2 tracking-tighter">
                  500+
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-6">
                  Problems Solved
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-foreground/5 hover:bg-foreground/10 text-foreground/80 border-foreground/20 transition-colors">
                    LeetCode
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-foreground/5 hover:bg-foreground/10 text-foreground/80 border-foreground/20 transition-colors">
                    CodeForces
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-foreground/5 hover:bg-foreground/10 text-foreground/80 border-foreground/20 transition-colors">
                    HackerRank
                  </Badge>
                </div>

                {/* Subtle Icon in background */}
                <div className="absolute -bottom-4 -right-4 opacity-5 rotate-12">
                  <BookOpen className="w-32 h-32 text-foreground" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional GitHub Stats Row - Optional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
          {[
            { icon: GitBranch, label: "Repositories", value: "50+" },
            { icon: Star, label: "Stars Earned", value: "200+" },
            { icon: Users, label: "Followers", value: "100+" },
            { icon: Code2, label: "Commits", value: "2k+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-4 rounded-xl bg-foreground/5 border border-border/30 backdrop-blur-sm">
              <stat.icon className="h-5 w-5 text-foreground/60 mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
