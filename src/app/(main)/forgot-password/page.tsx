"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { forgotPassword } from "@/services/apiService";
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import { Link } from "@/routing";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await forgotPassword(email);
      if (response.data?.success) {
        setStatus({
          type: "success",
          message: response.data.message || "Password reset link sent to your email!",
        });
      } else {
        setStatus({
          type: "error",
          message: response.data?.message || "Failed to process request.",
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
    <PageWrapper>
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
              <KeyRound className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-foreground mb-2">
            Forgot Password?
          </h1>
          <p className="text-sm text-center text-muted-foreground mb-8">
            Enter your admin email address and we'll send you a link to reset your password.
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
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-muted/20 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 text-sm shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                <>
                  Send Reset Link
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
              ← Back to Admin Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
