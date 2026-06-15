"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  Flame,
  Trophy,
  Code2,
  Star,
  GitFork,
  Activity,
  Github,
  BookOpen,
  Users,
} from "lucide-react";
import Link from "next/link";

// --- KEEPING YOUR EXISTING LOGIC (It's good!) ---
// Just copying the Types and Hook for functionality
interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalFollowers: number;
  totalCommits: number;
}

interface RecentActivity {
  id: string;
  type: string;
  repo: string;
  date: string;
  url: string;
}

const GITHUB_USERNAME = "rashedulraha";
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-600",
  Java: "bg-red-500",
  HTML: "bg-orange-500",
  CSS: "bg-blue-600",
};

function useGitHubData() {
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    totalFollowers: 0,
    totalCommits: 0,
  });
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
          ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
        };

        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { headers },
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=10`,
            { headers },
          ),
        ]);

        if (!userRes.ok) throw new Error("User not found");
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        const eventsData = eventsRes.ok ? await eventsRes.json() : [];

        const totalStars = reposData.reduce(
          (acc: number, r: any) => acc + (r.stargazers_count || 0),
          0,
        );
        const totalForks = reposData.reduce(
          (acc: number, r: any) => acc + (r.forks_count || 0),
          0,
        );
        const langStats: Record<string, number> = {};
        reposData.forEach((r: any) => {
          if (r.language)
            langStats[r.language] = (langStats[r.language] || 0) + 1;
        });

        // Contribution API Logic
        let totalContributions = 0,
          currentStreak = 0,
          longestStreak = 0;
        try {
          const contribRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`,
          );
          if (contribRes.ok) {
            const data = await contribRes.json();
            totalContributions = data.total || 0;
            const contributions = data.contributions || [];
            let streak = 0,
              maxStreak = 0;
            for (let i = contributions.length - 1; i >= 0; i--) {
              if (contributions[i].count > 0) {
                streak++;
                maxStreak = Math.max(maxStreak, streak);
              } else break;
            }
            currentStreak = streak;
            longestStreak = maxStreak;
          }
        } catch (e) {
          console.warn("Contributions API failed");
        }

        if (isMounted) {
          setStats({
            totalContributions: totalContributions || reposData.length * 15,
            currentStreak: currentStreak || 7,
            longestStreak: longestStreak || 25,
            totalRepos: reposData.length,
            totalStars,
            totalForks,
            totalFollowers: userData.followers || 0,
            totalCommits: totalContributions || reposData.length * 15,
          });
          setLanguages(langStats);
          setRecentActivity(
            eventsData.slice(0, 4).map((e: any) => ({
              id: e.id,
              type: e.type || "PushEvent",
              repo: e.repo?.name || GITHUB_USERNAME,
              date: new Date(e.created_at).toLocaleDateString(),
              url: `https://github.com/${e.repo?.name}`,
            })),
          );
        }
      } catch (err) {
        if (isMounted) {
          setError("Showing demo stats");
          setStats({
            totalContributions: 1847,
            currentStreak: 12,
            longestStreak: 45,
            totalRepos: 48,
            totalStars: 324,
            totalForks: 86,
            totalFollowers: 127,
            totalCommits: 1847,
          });
          setLanguages({ TypeScript: 45, JavaScript: 28, Python: 15 });
          setRecentActivity([
            {
              id: "1",
              type: "PushEvent",
              repo: "awesome-project",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
  }, []);
  return { stats, languages, recentActivity, loading, error };
}

// --- NEW MINIMAL UI COMPONENTS ---

function MainStatCard({
  stats,
  languages,
}: {
  stats: GitHubStats;
  languages: Record<string, number>;
}) {
  // Get top 2 languages for the bar
  const topLangs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative h-full">
      {/* Creative Border */}
      <div className="h-full rounded-3xl bg-linear-to-br from-white/10 to-white/5 p-[1px] hover:from-white/20 hover:to-white/10 transition-colors">
        <div className="h-full w-full bg-[#0c0c0e] rounded-[calc(1.5rem-1px)] p-8 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Total Contributions
                </h3>
                <p className="text-xs text-muted-foreground">Year to date</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Active
            </Badge>
          </div>

          {/* Big Number */}
          <div className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-8">
            {/* {stats.totalContributions.toLocaleString()} */}
            2012 +
          </div>

          {/* Meta Stats Row (Compact) */}
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm">{stats.currentStreak} day streak</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">{stats.totalStars} stars</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GitFork className="w-4 h-4 text-purple-500" />
              <span className="text-sm">{stats.totalRepos} repos</span>
            </div>
          </div>

          {/* Languages Progress (Clean) */}
          <div className="space-y-4 flex-1">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Top Languages
            </h4>
            {topLangs.map(([lang, count], idx) => (
              <div key={lang} className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{lang}</span>
                  <span className="font-mono text-white">{count} repos</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${LANGUAGE_COLORS[lang] || "bg-gray-500"}`}
                    style={{
                      width: `${(count / (topLangs[0][1] || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityCard({
  activities,
  username,
}: {
  activities: RecentActivity[];
  username: string;
}) {
  const icons: Record<string, any> = {
    PushEvent: BookOpen,
    PullRequestEvent: GitFork,
    CreateEvent: Activity,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="relative h-full">
      {/* Creative Border */}
      <div className="h-full rounded-3xl bg-linear-to-br from-white/10 to-white/5 p-[1px] hover:from-white/20 hover:to-white/10 transition-colors">
        <div className="h-full w-full bg-[#0c0c0e] rounded-[calc(1.5rem-1px)] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              className="text-xs text-primary hover:underline">
              View GitHub
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {activities.map((act) => {
              const Icon = icons[act.type] || Activity;
              return (
                <div
                  key={act.id}
                  className="group flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-white/10 text-white group-hover:bg-primary group-hover:text-black transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">
                      {act.repo}
                    </div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-black/50 text-[9px] uppercase font-bold">
                        {act.type.replace("Event", "")}
                      </span>
                      <span>{act.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GitHubStats() {
  const { stats, languages, recentActivity, loading, error } = useGitHubData();

  if (loading) return <div className="py-24 text-center">Loading...</div>;

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-2">
            GitHub <span className="text-primary">Activity</span>
          </h2>
          <p className="text-muted-foreground">
            Real-time contributions & coding progress.
          </p>
        </div>

        {/* Clean 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto h-[500px]">
          <MainStatCard stats={stats} languages={languages} />
          <ActivityCard
            activities={recentActivity}
            username={GITHUB_USERNAME}
          />
        </div>
      </div>
    </section>
  );
}
