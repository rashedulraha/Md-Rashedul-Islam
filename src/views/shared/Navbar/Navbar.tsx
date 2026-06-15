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
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll effect - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Check if current path matches any of the more links
  const isMoreLinkActive = moreLinks.some((link) => link.to === pathname);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
        className={cn(
          "fixed top-5 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500",
          scrolled && "top-3",
        )}>
        {/* Floating Pill Container with Animated Gradient Border */}
        <div className="relative group">
          {/* Animated Gradient Border */}
          <div className="absolute -inset-[1.5px] rounded-full navbar-gradient-border opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

          <div
            className={cn(
              "relative flex h-14 sm:h-16 items-center justify-between gap-4 md:gap-6",
              "px-4 sm:px-6",
              "border border-foreground/10 rounded-full",
              "bg-background/80 backdrop-blur-2xl",
              "shadow-lg shadow-black/5",
              "transition-all duration-300",
              scrolled && "shadow-xl shadow-black/10 bg-background/90",
            )}>
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center gap-2 group/logo shrink-0 active:scale-95 transition-transform">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover/logo:bg-primary/40 transition-colors duration-300" />
                <div className="relative p-1.5 rounded-lg bg-foreground/5 border border-foreground/10">
                  <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                </div>
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter text-foreground">
                Rashed<span className="text-primary">.</span>
                <span className="text-foreground/60">Dev</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {/* Primary Links */}
              {primaryLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.to}
                  className={cn(
                    "relative px-3 py-2 text-sm lg:text-[15px] font-medium transition-all duration-300 rounded-full",
                    pathname === link.to
                      ? "text-foreground bg-foreground/10 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                  )}>
                  {link.title}
                </Link>
              ))}

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "relative flex items-center gap-1.5 px-3 py-2 text-sm lg:text-[15px] font-medium transition-all duration-300 rounded-full",
                      isMoreLinkActive
                        ? "text-foreground bg-foreground/10 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                    )}>
                    <span>More</span>
                    <motion.div
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                    </motion.div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-64 p-2 rounded-2xl border border-foreground/10 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-black/20">
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
                                : "hover:bg-foreground/5",
                            )}>
                            <div
                              className={cn(
                                "p-2 rounded-lg transition-all duration-300 shrink-0",
                                isActive
                                  ? "bg-primary/20 text-primary"
                                  : "bg-foreground/5 text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary",
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
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {link.description}
                              </p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        {index < moreLinks.length - 1 && (
                          <DropdownMenuSeparator className="my-1 bg-foreground/5" />
                        )}
                      </div>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Status Badge - "Available for work" */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  Available
                </span>
              </div>

              <ModeToggle />

              {/* Desktop Contact Button */}
              <Button
                asChild
                variant="outline"
                className={cn(
                  "hidden md:flex rounded-full px-5 lg:px-6 h-9 lg:h-10",
                  "border-foreground/20 bg-foreground/5 text-foreground",
                  "transition-all duration-300 gap-2 text-sm font-medium group",
                )}>
                <Link href="/contact">
                  Contact
                  <Send className="h-3.5 w-3.5 lg:h-4 lg:w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-foreground " />
                </Link>
              </Button>

              {/* Mobile Menu Trigger */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-foreground hover:bg-foreground/5 hover:text-foreground transition-all rounded-full">
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

                  {/* Mobile Menu Sheet */}
                  <SheetContent
                    side="right"
                    className="w-[90vw] sm:w-[400px] bg-background/98 backdrop-blur-2xl border-l border-foreground/10 p-0 text-foreground mobile-menu-pattern">
                    <div className="flex flex-col h-full p-6 sm:p-8">
                      <SheetHeader className="text-left mb-8">
                        <SheetTitle className="flex items-center gap-3">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                            className="p-2.5 rounded-xl bg-foreground/5 border border-foreground/10">
                            <Terminal className="h-5 w-5 sm:h-6 sm:w-6" />
                          </motion.div>
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-black tracking-tighter text-xl text-foreground">
                            Rashed<span className="text-primary">.</span>
                            <span className="text-foreground/60">Dev</span>
                          </motion.span>
                        </SheetTitle>
                      </SheetHeader>

                      {/* Primary Links Section */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-4">
                          Main Menu
                        </p>
                        <nav className="flex flex-col gap-2">
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
                                    ? "bg-foreground/10 text-foreground border border-foreground/20 shadow-sm"
                                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground border border-transparent",
                                )}>
                                <span className="flex-1">{link.title}</span>
                                {pathname === link.to && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 rounded-full bg-primary"
                                  />
                                )}
                              </Link>
                            </motion.div>
                          ))}
                        </nav>
                      </div>

                      {/* More Links Section */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-4">
                          Explore More
                        </p>
                        <nav className="flex flex-col gap-2">
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
                                      : "hover:bg-foreground/5 border border-transparent",
                                  )}>
                                  <div
                                    className={cn(
                                      "p-2 rounded-lg transition-colors",
                                      pathname === link.to
                                        ? "bg-primary/20 text-primary"
                                        : "bg-foreground/5 text-muted-foreground",
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
                                            : "text-muted-foreground",
                                        )}>
                                        {link.title}
                                      </span>
                                      {pathname === link.to && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-1.5 h-1.5 rounded-full bg-primary"
                                        />
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {link.description}
                                    </p>
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </nav>
                      </div>

                      {/* Mobile Status */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-auto p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                              Available for work
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Open to new opportunities
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Mobile Contact Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4">
                        <Button
                          asChild
                          variant="outline"
                          className={cn(
                            "w-full h-12 rounded-xl",
                            "border-foreground/20 bg-foreground/5 text-foreground",
                            "hover:bg-foreground hover:text-background hover:border-foreground",
                            "transition-all duration-300 gap-2 font-medium group",
                          )}
                          onClick={() => setIsOpen(false)}>
                          <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2">
                            Let's Talk
                            <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </Button>
                      </motion.div>

                      {/* Footer Note for Mobile */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-6 pt-4 border-t border-foreground/10">
                        <p className="text-xs text-muted-foreground">
                          © 2025 Rashedul Islam. All rights reserved.
                        </p>
                      </motion.div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
