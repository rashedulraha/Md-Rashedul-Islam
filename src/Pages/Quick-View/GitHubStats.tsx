import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

export default function GitHubStats() {
  const topLanguages = [
    { lang: "TypeScript", percent: 40, color: "bg-blue-500" },
    { lang: "Python", percent: 25, color: "bg-green-500" },
    { lang: "Go", percent: 20, color: "bg-cyan-500" },
    { lang: "JavaScript", percent: 15, color: "bg-yellow-500" },
  ];

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
            Open Source
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            GitHub{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Analytics
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Streak Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}>
            <Card className="text-center p-6 border-border/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-primary mb-2">1k+</div>
                <div className="text-sm text-muted-foreground">
                  Total Contributions
                </div>
                <div className="text-2xl font-bold mt-4">🔥 200+</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <Card className="p-6 border-border/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4">Top Languages</h3>
                <div className="space-y-3">
                  {topLanguages.map((lang) => (
                    <div key={lang.lang}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{lang.lang}</span>
                        <span>{lang.percent}%</span>
                      </div>
                      <Progress
                        value={lang.percent}
                        className={`h-2 ${lang.color}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* DSA Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            <Card className="text-center p-6 border-border/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">
                  DSA Problems Solved
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <Badge variant="outline">LeetCode</Badge>
                  <Badge variant="outline">CodeForces</Badge>
                  <Badge variant="outline">HackerRank</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
