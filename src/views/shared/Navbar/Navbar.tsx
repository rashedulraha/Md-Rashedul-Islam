"use client";

import { Menu, Send, X, Key, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";

// Navigation links targeting sections on the single homepage
const primaryLinks = [
  { title: "Home", to: "/#hero" },
  { title: "Pipeline", to: "/#pipeline" },
  { title: "Stack", to: "/#skills" },
  { title: "Experience", to: "/#experience" },
  { title: "Blog Log", to: "/#blog" },
  { title: "Connect", to: "/#connect" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Session gateway states
  const [showGateway, setShowGateway] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const isClientAdmin = document.cookie.split("; ").find((row) => row.startsWith("is_admin="));
      setIsAdmin(!!isClientAdmin);
    };
    checkAdmin();
    const interval = setInterval(checkAdmin, 2000);
    return () => clearInterval(interval);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname, isOpen]);

  const handleVerifyToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim() === "admin") {
      document.cookie = "is_admin=true; path=/";
      setIsAdmin(true);
      setShowGateway(false);
      setTokenInput("");
      setAuthError(false);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const handleLogout = () => {
    document.cookie = "is_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setIsAdmin(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
        className={cn(
          "fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 px-6",
          scrolled ? "top-0 px-0" : "top-5",
        )}>
        <div className={cn(
          "relative group flex justify-center transition-all duration-500",
          scrolled ? "w-full" : "max-w-5xl w-full"
        )}>
          {/* Subtle Outer Glow Border: Only show in Pill Mode (!scrolled) */}
          {!scrolled && (
            <div className="absolute -inset-[1px] rounded-full border border-border/30 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px] pointer-events-none" />
          )}

          {/* Main Container */}
          <div
            className={cn(
              "relative flex h-16 items-center justify-between gap-2 md:gap-4 transition-all duration-500 overflow-hidden",
              !scrolled
                ? "max-w-5xl w-full mt-0 rounded-full bg-background/85 backdrop-blur-xl shadow-lg px-6"
                : "w-full max-w-full mt-0 rounded-none bg-background/70 backdrop-blur-2xl shadow-none px-6",
            )}
            style={{
              borderTop: "1px solid var(--border)",
              borderLeft: "1px solid var(--border)",
              borderRight: "1px solid var(--border)",
              borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
            }}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

            {/* Content Wrapper */}
            <div
              className={cn(
                "flex items-center justify-between gap-2 md:gap-4 w-full transition-all duration-500",
                scrolled && "max-w-7xl mx-auto w-[95%]",
              )}>
              {/* Logo Section */}
              <div className="flex-1">
                <Link
                  href="/"
                  className="font-mono text-sm tracking-[0.25em] text-foreground font-bold uppercase shrink-0 active:scale-95 transition-transform"
                  aria-label="Mr. Islam Portfolio">
                  [ MR. ISLAM ]
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="flex-2 flex items-center justify-center">
                <nav
                  aria-label="Desktop Main Navigation"
                  className="hidden md:flex items-center shrink-0">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border"
                  >
                    {primaryLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.to}
                        className="relative px-3 py-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground rounded-full transition-all duration-300 whitespace-nowrap">
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Action Buttons & Session Token Gateway */}
              <div className="flex flex-1 items-center gap-3 shrink-0 justify-end">
                {/* Admin Session Gateway configuration block */}
                <div className="hidden md:flex items-center">
                  <AnimatePresence mode="wait">
                    {showGateway ? (
                      <motion.form
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        onSubmit={handleVerifyToken}
                        className="flex items-center gap-1.5 bg-card border border-border rounded-full px-2 py-0.5"
                      >
                        <input
                          type="password"
                          placeholder="session_token"
                          value={tokenInput}
                          onChange={(e) => setTokenInput(e.target.value)}
                          className={cn(
                            "bg-transparent border-none outline-none font-mono text-[9px] text-foreground w-20 px-1 focus:ring-0",
                            authError && "text-red-500 placeholder-red-500"
                          )}
                        />
                        <button
                          type="submit"
                          className="text-[9px] text-primary hover:text-primary/80 transition-colors font-mono font-bold"
                        >
                          OPEN
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowGateway(false)}
                          className="text-[9px] text-muted-foreground hover:text-foreground font-mono"
                        >
                          ✕
                        </button>
                      </motion.form>
                    ) : isAdmin ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded-full text-[9px]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-400 font-mono font-bold tracking-wider">[ VERIFIED ]</span>
                        <Link href="/#admin-uplink" className="text-zinc-300 hover:text-white font-mono underline ml-1">
                          PANEL
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-muted-foreground hover:text-red-400 font-mono ml-1.5"
                        >
                          <Lock className="w-2.5 h-2.5" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowGateway(true)}
                        className="text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors flex items-center gap-1 cursor-pointer"
                        title="Admin Session Access"
                      >
                        <Key className="w-3.5 h-3.5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <ModeToggle />

                {/* Desktop Contact Button */}
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    "hidden md:flex rounded-full px-4 h-9 shrink-0",
                    "border-border bg-card text-foreground font-mono text-xs",
                    "transition-all duration-300 gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary",
                  )}>
                  <a href="mailto:rashedulraha.bd@gmail.com">Connect</a>
                </Button>

                {/* Mobile Menu Trigger */}
                <div className="md:hidden">
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle Menu"
                        className="h-10 w-10 text-foreground hover:bg-muted/50 hover:text-foreground transition-all rounded-full">
                        <AnimatePresence mode="wait">
                          {isOpen ? (
                            <motion.div
                              key="close"
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: 90, opacity: 0 }}
                              transition={{ duration: 0.2 }}>
                              <X className="h-5 w-5" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="menu"
                              initial={{ rotate: 90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: -90, opacity: 0 }}
                              transition={{ duration: 0.2 }}>
                              <Menu className="h-5 w-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </SheetTrigger>

                    <SheetContent
                      side="right"
                      className="w-[90vw] sm:w-100 bg-background/98 backdrop-blur-2xl p-0 text-foreground"
                      style={{
                        borderLeft: "1px solid var(--border)",
                      }}>
                      <div className="flex flex-col h-full p-6 sm:p-8">
                        <SheetHeader className="text-left mb-8 border-b border-border pb-4">
                          <SheetTitle className="flex items-center gap-3">
                            <span className="font-mono text-sm tracking-[0.2em] text-foreground font-bold uppercase">
                              [ MR. ISLAM ]
                            </span>
                          </SheetTitle>
                        </SheetHeader>

                        {/* Navigation Links */}
                        <div className="mb-6">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 px-4">
                            INDEX
                          </p>
                          <nav
                            aria-label="Mobile Main Navigation"
                            className="flex flex-col gap-2">
                            {primaryLinks.map((link, index) => (
                              <motion.div
                                key={link.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}>
                                <Link
                                  href={link.to}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center px-4 py-3 text-sm font-mono text-muted-foreground hover:bg-card hover:text-foreground rounded-xl border border-transparent transition-all duration-300">
                                  <span className="flex-1">{link.title}</span>
                                </Link>
                              </motion.div>
                            ))}
                            {isAdmin && (
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: primaryLinks.length * 0.05 }}>
                                <Link
                                  href="/#admin-uplink"
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center px-4 py-3 text-sm font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 rounded-xl">
                                  <span className="flex-1">Admin Panel</span>
                                </Link>
                              </motion.div>
                            )}
                          </nav>
                        </div>

                        {/* Mobile Session Token Inline Input */}
                        <div className="mb-6 border-t border-border pt-6">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 px-4">
                            Session Gateway
                          </p>
                          <div className="px-4">
                            {isAdmin ? (
                              <div className="flex items-center justify-between bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl">
                                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">[ VERIFIED SESSION ]</span>
                                <button
                                  onClick={handleLogout}
                                  className="text-[10px] text-muted-foreground hover:text-red-400 font-mono"
                                >
                                  LOCK
                                </button>
                              </div>
                            ) : (
                              <form onSubmit={handleVerifyToken} className="flex gap-2">
                                <input
                                  type="password"
                                  placeholder="Enter session token..."
                                  value={tokenInput}
                                  onChange={(e) => setTokenInput(e.target.value)}
                                  className={cn(
                                    "flex-1 bg-card border border-border rounded-xl px-3.5 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary",
                                    authError && "border-red-500"
                                  )}
                                />
                                <Button type="submit" variant="outline" className="font-mono text-xs px-4">
                                  Verify
                                </Button>
                              </form>
                            )}
                          </div>
                        </div>

                        <div className="mt-auto p-4 rounded-xl bg-card border border-border">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                            </div>
                            <div>
                              <p className="text-xs font-mono font-bold text-foreground">
                                SYSTEM STATUS: OPERATIONAL
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                Remote availability: 2026/Q3
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button
                            asChild
                            variant="outline"
                            className="w-full h-12 rounded-xl border-border bg-card text-foreground transition-all duration-300 gap-2 font-mono font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary">
                            <a
                              href="mailto:rashedulraha.bd@gmail.com"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-center gap-2 w-full h-full">
                              CONNECT VIA EMAIL
                              <Send className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
