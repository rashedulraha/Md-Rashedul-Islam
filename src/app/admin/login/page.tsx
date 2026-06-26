"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Terminal, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Success: Redirect to admin panel
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/95 px-4 relative overflow-hidden select-none">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6">
        <Button variant="ghost" size="sm" asChild className="gap-2 text-zinc-400 hover:text-white">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-md bg-zinc-950/80 border-zinc-800/80 backdrop-blur-md shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />
        
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-primary mb-2 shadow-inner">
            <Terminal className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Control Panel Access
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in to manage active chats and settings
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 rounded-lg border border-red-500/30 bg-red-950/30 p-3.5 text-sm text-red-400">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <p className="font-medium leading-none">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-300">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-zinc-900/60 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-900/60 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-zinc-200 text-black font-semibold h-10 transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">{loading ? "Authenticating..." : "Access Control Panel"}</span>
            </Button>
            <p className="text-[10px] text-zinc-600 text-center select-none">
              Unauthorized access is monitored. Access key required.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
