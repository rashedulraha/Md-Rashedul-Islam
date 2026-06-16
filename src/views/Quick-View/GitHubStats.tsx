"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  Calendar,
  TrendingUp,
  GitCommit,
  Award,
  ExternalLink,
  Sparkles,
  Zap,
  Target,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- GitHub Data Types ---
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
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

// Language colors mapping
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3b82f6",
  JavaScript: "#eab308",
  Python: "#22c55e",
  Go: "#06b6d4",
  Rust: "#f97316",
  Java: "#ef4444",
  HTML: "#f97316",
  CSS: "#3b82f6",
  "C++": "#a855f7",
  PHP: "#6366f1",
};

// Activity icons mapping
const activityIcons: Record<string, any> = {
  PushEvent: GitCommit,
  PullRequestEvent: GitFork,
  CreateEvent: Star,
  IssuesEvent: Activity,
  WatchEvent: BookOpen,
  ForkEvent: GitFork,
};

// Activity colors mapping
const activityColors: Record<string, string> = {
  PushEvent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  PullRequestEvent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  CreateEvent: "text-green-500 bg-green-500/10 border-green-500/20",
  IssuesEvent: "text-red-500 bg-red-500/10 border-red-500/20",
  WatchEvent: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  ForkEvent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
};

// Custom Progress component with custom indicator color
function CustomProgress({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

// Custom hook for GitHub data
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
          if (r.language) {
            langStats[r.language] = (langStats[r.language] || 0) + 1;
          }
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
            eventsData.slice(0, 5).map((e: any) => ({
              id: e.id,
              type: e.type || "PushEvent",
              repo:
                e.repo?.name?.split("/")[1] || e.repo?.name || GITHUB_USERNAME,
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
          setLanguages({
            TypeScript: 45,
            JavaScript: 28,
            Python: 15,
            Go: 8,
            Rust: 5,
          });
          setRecentActivity([
            {
              id: "1",
              type: "PushEvent",
              repo: "awesome-project",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
            {
              id: "2",
              type: "PullRequestEvent",
              repo: "open-source-contrib",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
            {
              id: "3",
              type: "CreateEvent",
              repo: "new-starter-kit",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
            {
              id: "4",
              type: "IssuesEvent",
              repo: "bug-fix",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
            {
              id: "5",
              type: "WatchEvent",
              repo: "trending-repo",
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

// Main Stats Card Component
function MainStatCard({
  stats,
  languages,
}: {
  stats: GitHubStats;
  languages: Record<string, number>;
}) {
  const totalLangs = Object.values(languages).reduce((a, b) => a + b, 0);
  const topLangs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <Card className="bg-linear-to-br from-card to-card/80 backdrop-blur-sm border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                <AvatarImage
                  src={`https://github.com/${GITHUB_USERNAME}.png`}
                />
                <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/5">
                  <Github className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-green-500 border-2 border-background">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                @{GITHUB_USERNAME}
                <Badge variant="secondary" className="text-[10px] px-1.5">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </CardTitle>
              <CardDescription>Full Stack Developer</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <Link
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank">
              <Github className="w-3.5 h-3.5" />
              Profile
              <ExternalLink className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Main Contribution Number */}
        <div className="relative text-center py-5 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
          <div className="relative">
            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              2193 +
            </div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <p className="text-xs text-muted-foreground">
                Total Contributions (Last Year)
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Stats Grid - 3x2 Layout */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group/stat">
            <div className="p-1.5 rounded-md bg-orange-500/10 text-orange-500">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-bold">{stats.currentStreak}</p>
              <p className="text-[10px] text-muted-foreground">Day Streak</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group/stat">
            <div className="p-1.5 rounded-md bg-yellow-500/10 text-yellow-500">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-bold">{stats.longestStreak}</p>
              <p className="text-[10px] text-muted-foreground">Longest</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group/stat">
            <div className="p-1.5 rounded-md bg-yellow-500/10 text-yellow-500">
              <Star className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-bold">
                {stats.totalStars.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">Stars</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group/stat">
            <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-500">
              <GitFork className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-bold">
                {stats.totalForks.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">Forks</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group/stat">
            <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-500">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-bold">
                {stats.totalFollowers.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">Followers</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group/stat">
            <div className="p-1.5 rounded-md bg-green-500/10 text-green-500">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-sm font-bold">{stats.totalRepos}</p>
              <p className="text-[10px] text-muted-foreground">Repos</p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Languages Section with Custom Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">
                Tech Stack
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">
              {totalLangs} repos
            </p>
          </div>
          <div className="space-y-2.5">
            {topLangs.map(([lang, count]) => (
              <TooltipProvider key={lang}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1 cursor-help">
                      <div className="flex justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                LANGUAGE_COLORS[lang] || "#6b7280",
                            }}
                          />
                          <span className="font-medium">{lang}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {count} repos
                        </span>
                      </div>
                      <CustomProgress
                        value={(count / totalLangs) * 100}
                        color={LANGUAGE_COLORS[lang] || "#6b7280"}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="text-xs">
                    {Math.round((count / totalLangs) * 100)}% of repositories
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Activity Card Component
function ActivityCard({
  activities,
  username,
}: {
  activities: RecentActivity[];
  username: string;
}) {
  const getActivityAction = (type: string) => {
    const actions: Record<string, string> = {
      PushEvent: "pushed to",
      PullRequestEvent: "opened PR in",
      CreateEvent: "created",
      IssuesEvent: "opened issue in",
      WatchEvent: "starred",
      ForkEvent: "forked",
    };
    return actions[type] || "updated";
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50 h-full flex flex-col hover:border-primary/30 transition-all duration-500 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-xs gap-1" asChild>
            <Link href={`https://github.com/${username}`} target="_blank">
              View all
              <ExternalLink className="w-3 h-3" />
            </Link>
          </Button>
        </div>
        <CardDescription>
          Latest GitHub events and contributions
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3">
          {activities.map((activity, idx) => {
            const Icon = activityIcons[activity.type] || Activity;
            const colorClass =
              activityColors[activity.type] || "text-gray-500 bg-gray-500/10";
            const action = getActivityAction(activity.type);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="group/activity">
                <Link href={activity.url} target="_blank" className="block">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-border/50">
                    <div
                      className={cn(
                        "p-2 rounded-lg shrink-0 transition-all duration-300",
                        colorClass,
                      )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium truncate max-w-[150px] sm:max-w-[200px]">
                          {activity.repo}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[9px] px-1.5 py-0 h-4">
                          {action}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {activity.date}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span className="text-[10px] text-muted-foreground capitalize">
                          {activity.type.replace("Event", "")}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/activity:opacity-100 transition-all duration-300 shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Stats Footer */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <GitCommit className="w-3 h-3" />
              <span>Active contributor</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Updated just now</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-24 mt-1" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-32 w-full rounded-lg" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Main Component
export default function GitHubStats() {
  const { stats, languages, recentActivity, loading, error } = useGitHubData();

  if (loading) {
    return (
      <section className="bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted mb-4">
              <Github className="w-3 h-3" />
              <span className="text-xs">GitHub Insights</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              GitHub Activity
            </h2>
            <p className="text-muted-foreground">
              Loading GitHub statistics...
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
            GitHub <span className="text-primary">Activity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Real-time contributions, coding progress, and open-source impact
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MainStatCard stats={stats} languages={languages} />
          <ActivityCard
            activities={recentActivity}
            username={GITHUB_USERNAME}
          />
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center">
            <p className="text-xs text-muted-foreground bg-muted/30 inline-block px-3 py-1 rounded-full">
              {error}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
