"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { resetPassword } from "@/services/apiService";
import { Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { Link } from "@/routing";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !email) {
      setStatus({
        type: "error",
        message: "Invalid reset token or email. Please request a new link.",
      });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({
        type: "error",
        message: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await resetPassword({ email, token, newPassword });
      if (response.data?.success) {
        setStatus({
          type: "success",
          message: response.data.message || "Password updated successfully!",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setStatus({
          type: "error",
          message: response.data?.message || "Failed to reset password.",
        });
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Something went wrong. Please try again.";
      setStatus({
        type: "error",
        message: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl p-8 shadow-xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
          <ShieldCheck className="w-8 h-8" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center text-foreground mb-2">
        Reset Password
      </h1>
      <p className="text-sm text-center text-muted-foreground mb-8">
        Create a new strong password for your admin account.
      </p>

      {status && (
        <div
          className={`p-4 rounded-xl mb-6 text-sm flex items-start gap-3 border ${
            status.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="newPassword" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="newPassword"
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-muted/20 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-muted/20 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !token || !email}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 text-sm shadow-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Resetting Password...
            </>
          ) : (
            <>
              Update Password
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-border/50 pt-6">
        <Link
          href="/dashboard"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Return to Admin Login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <PageWrapper>
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
      <Footer />
    </PageWrapper>
  );
}
