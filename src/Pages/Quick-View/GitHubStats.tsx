import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Flame, Trophy, Code2 } from "lucide-react";

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
      type: "spring" as const, // <--- এখানে 'as const' যোগ করা হয়েছে (TypeScript Error Fix)
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function GitHubStats() {
  const topLanguages = [
    { lang: "TypeScript", percent: 40, color: "bg-blue-500" },
    { lang: "Python", percent: 25, color: "bg-green-500" },
    { lang: "Go", percent: 20, color: "bg-cyan-500" },
    { lang: "JavaScript", percent: 15, color: "bg-yellow-500" },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-muted/10">
      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-150 h-150 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-100 h-100 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            Open Source
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            GitHub{" "}
            <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
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
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Flame className="h-6 w-6 text-orange-500" />
                </div>
                <div className="text-4xl font-black text-foreground mb-2 tracking-tighter">
                  1k+
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                  Total Contributions
                </div>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <div className="text-2xl font-bold text-orange-500 mb-1">
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
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Code2 className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-lg">Top Languages</h3>
                </div>

                <div className="space-y-5 grow flex flex-col justify-center">
                  {topLanguages.map((lang, idx) => (
                    <div key={lang.lang} className="group/bar">
                      <div className="flex justify-between text-sm mb-1.5 font-medium">
                        <span className="text-foreground group-hover/bar:text-primary transition-colors">
                          {lang.lang}
                        </span>
                        <span className="text-muted-foreground">
                          {lang.percent}%
                        </span>
                      </div>
                      <div className="relative h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percent}%` }}
                          transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                          viewport={{ once: true }}
                          className={`absolute top-0 left-0 h-full rounded-full ${lang.color} shadow-[0_0_10px_currentColor]`}
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
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6 text-purple-500" />
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
                    className="px-3 py-1 bg-muted/50 hover:bg-muted/80 transition-colors">
                    LeetCode
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-muted/50 hover:bg-muted/80 transition-colors">
                    CodeForces
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-muted/50 hover:bg-muted/80 transition-colors">
                    HackerRank
                  </Badge>
                </div>

                {/* Subtle Book Icon in background */}
                <div className="absolute -bottom-4 -right-4 opacity-5 rotate-12">
                  <BookOpen className="w-32 h-32" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
