"use client";

import { Menu, Send, X, Terminal, ChevronDown, Award } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";

// Primary links - always visible
const primaryLinks = [
  { title: "Home", to: "/" },
  { title: "Projects", to: "/projects" },
  { title: "Skills", to: "/skills" },
  { title: "Experiences", to: "/experience" },
  { title: "About", to: "/about" },
];

// Secondary links - inside "More" dropdown
const moreLinks = [
  {
    title: "Certifications",
    to: "/certifications",
    icon: Award,
    description: "Awards & certificates",
  },
  {
    title: "Blogs",
    to: "/blogs",
    icon: Terminal,
    description: "Tech articles & insights",
  },
  {
    title: "Quick View",
    to: "/quick-view",
    icon: Send,
    description: "Portfolio snapshot",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [pathname]);

  const isMoreLinkActive = moreLinks.some((link) => link.to === pathname);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
        className={cn(
          "fixed left-0 right-0 z-50 flex justify-center transition-all duration-500",
          scrolled ? "top-0" : "top-4",
        )}>
        <div className="relative group w-full flex justify-center">
          {/* Gradient Border: Only show in Pill Mode (!scrolled) */}
          {!scrolled && (
            <div className="absolute -inset-[1.5px] rounded-full navbar-gradient-border opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
          )}

          {/* Main Container */}
          <div
            className={cn(
              "relative flex h-16 items-center justify-between gap-2 md:gap-6 transition-all duration-500 overflow-hidden",
              // State: NOT Scrolled (Room / Pill Mode)
              !scrolled
                ? "max-w-5xl w-[90%] md:w-[95%] mt-0 rounded-full bg-background/80 backdrop-blur-xl shadow-lg"
                : // State: Scrolled (Full Width / Transparent)
                  "w-full max-w-full mt-0 rounded-none bg-background/60 backdrop-blur-2xl shadow-none",
              // Creative border (theme-aware)
            )}
            style={{
              borderTop: "1.5px solid var(--border)",
              borderLeft: "1px solid var(--border)",
              borderRight: "1px solid var(--border)",
              borderBottom: scrolled
                ? "1px solid color-mix(in srgb, var(--border) 15%)"
                : "1px solid color-mix(in srgb, var(--border) 15%)",
            }}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

            {/* Content Wrapper: Controls Max Width in Scroll Mode */}
            <div
              className={cn(
                "flex items-center justify-between gap-2 md:gap-6 w-full transition-all duration-500",
                // When scrolled, constrain content width
                scrolled && "max-w-7xl mx-auto w-[95%]",
              )}>
              {/* Logo Section */}
              <Link
                href="/"
                className="flex items-center gap-2 group/logo shrink-0 active:scale-95 transition-transform"
                aria-label="Rashed Dev Home">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover/logo:bg-primary/40 transition-colors duration-300" />
                  <div className="relative p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter text-foreground">
                  Rashed<span className="text-primary">.</span>
                  <span className="text-foreground/70">Dev</span>
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav
                aria-label="Desktop Main Navigation"
                className="hidden md:flex items-center gap-1 shrink-0">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.to}
                    className={cn(
                      "relative px-2.5 py-2 text-sm lg:text-[15px] font-medium transition-all duration-300 rounded-full whitespace-nowrap",
                      pathname === link.to
                        ? "text-foreground bg-primary/10 border border-primary/20 shadow-sm"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/50",
                    )}>
                    {link.title}
                  </Link>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      role="button"
                      tabIndex={0}
                      className={cn(
                        "relative flex items-center gap-1.5 px-3 py-2 text-sm lg:text-[15px] font-medium transition-all duration-300 rounded-full cursor-pointer select-none outline-none group/trigger whitespace-nowrap",
                        isMoreLinkActive
                          ? "text-foreground bg-primary/10 border border-primary/20 shadow-sm"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted/50",
                      )}>
                      <span>More</span>
                      <ChevronDown className="h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={12}
                    className="w-64 p-2 rounded-2xl bg-card/95 backdrop-blur-2xl shadow-2xl"
                    style={{
                      borderTop: "1.5px solid var(--border)",
                      borderLeft: "1px solid var(--border)",
                      borderRight: "1px solid var(--border)",
                      borderBottom:
                        "1px solid color-mix(in srgb, var(--border) 15%)",
                    }}>
                    {/* Top accent line for dropdown */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none rounded-t-2xl" />

                    {moreLinks.map((link, index) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.to;
                      return (
                        <div key={link.title}>
                          <DropdownMenuItem asChild>
                            <Link
                              href={link.to}
                              className={cn(
                                "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 group/item",
                                isActive
                                  ? "bg-primary/10 text-foreground"
                                  : "hover:bg-muted/50",
                              )}>
                              <div
                                className={cn(
                                  "p-2 rounded-lg transition-all duration-300 shrink-0",
                                  isActive
                                    ? "bg-primary/20 text-primary border border-primary/30"
                                    : "bg-muted/50 text-foreground/70 group-hover/item:bg-primary/10 group-hover/item:text-primary border border-border/50",
                                )}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm text-foreground">
                                    {link.title}
                                  </span>
                                  {isActive && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-1.5 h-1.5 rounded-full bg-primary"
                                    />
                                  )}
                                </div>
                                <p className="text-xs text-foreground/70 mt-0.5">
                                  {link.description}
                                </p>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                          {index < moreLinks.length - 1 && (
                            <DropdownMenuSeparator className="my-1 bg-border/50" />
                          )}
                        </div>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Status Badge */}
                <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping" />
                  </div>
                  <span className="text-xs font-medium text-primary">
                    Available
                  </span>
                </div>

                <ModeToggle />
                {/* Desktop Contact Button */}
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    "hidden md:flex rounded-full px-4 lg:px-5 h-9 lg:h-10 shrink-0",
                    "border-border bg-muted/30 text-foreground",
                    "transition-all duration-300 gap-2 text-sm font-medium group",
                    "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                  )}>
                  <Link href="/contact">Hire Me</Link>
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
                      className="w-[90vw] sm:w-100 bg-background/98 backdrop-blur-2xl p-0 text-foreground mobile-menu-pattern"
                      style={{
                        borderLeft: "1.5px solid var(--border)",
                      }}>
                      <div className="flex flex-col h-full p-6 sm:p-8">
                        <SheetHeader className="text-left mb-8">
                          <SheetTitle className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                              <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <span className="font-black tracking-tighter text-xl text-foreground">
                              Rashed<span className="text-primary">.</span>
                              <span className="text-foreground/70">Dev</span>
                            </span>
                          </SheetTitle>
                        </SheetHeader>

                        <div className="mb-6">
                          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-3 px-4">
                            Main Menu
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
                                  className={cn(
                                    "flex items-center px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-300 active:scale-95",
                                    pathname === link.to
                                      ? "bg-primary/10 text-foreground border border-primary/20 shadow-sm"
                                      : "text-foreground/70 hover:bg-muted/50 hover:text-foreground border border-transparent",
                                  )}>
                                  <span className="flex-1">{link.title}</span>
                                  {pathname === link.to && (
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </nav>
                        </div>

                        <div className="mb-6">
                          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-3 px-4">
                            Explore More
                          </p>
                          <nav
                            aria-label="Mobile Explore Navigation"
                            className="flex flex-col gap-2">
                            {moreLinks.map((link, index) => {
                              const Icon = link.icon;
                              return (
                                <motion.div
                                  key={link.title}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: (primaryLinks.length + index) * 0.05,
                                  }}>
                                  <Link
                                    href={link.to}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 active:scale-95",
                                      pathname === link.to
                                        ? "bg-primary/10 border border-primary/20"
                                        : "hover:bg-muted/50 border border-transparent",
                                    )}>
                                    <div
                                      className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        pathname === link.to
                                          ? "bg-primary/20 text-primary border border-primary/30"
                                          : "bg-muted/50 text-foreground/70 border border-border/50",
                                      )}>
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={cn(
                                            "font-medium",
                                            pathname === link.to
                                              ? "text-foreground"
                                              : "text-foreground/70",
                                          )}>
                                          {link.title}
                                        </span>
                                        {pathname === link.to && (
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        )}
                                      </div>
                                      <p className="text-xs text-foreground/70 mt-0.5">
                                        {link.description}
                                      </p>
                                    </div>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </nav>
                        </div>

                        <div className="mt-auto p-4 rounded-xl bg-primary/10 border border-primary/20">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-3 h-3 rounded-full bg-primary" />
                              <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary animate-ping" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-primary">
                                Available for work
                              </p>
                              <p className="text-xs text-foreground/70">
                                Open to new opportunities
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button
                            asChild
                            variant="outline"
                            className={cn(
                              "w-full h-12 rounded-xl",
                              "border-border bg-muted/30 text-foreground",
                              "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                              "transition-all duration-300 gap-2 font-medium group",
                            )}>
                            <Link
                              href="/contact"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-center gap-2 w-full h-full">
                              Let's Talk
                              <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                          </Button>
                        </div>

                        <div className="text-center mt-6 pt-4 border-t border-border/50">
                          <p className="text-xs text-foreground/70">
                            © {new Date().getFullYear()} Rashedul Islam. All
                            rights reserved.
                          </p>
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
