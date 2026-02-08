import { Menu, Cpu, Send, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

const links = [
  { title: "Home", to: "/" },
  { title: "Projects", to: "/projects" },
  { title: "Tech Stack", to: "/stack" },
  { title: "Experience", to: "/experience" },
  { title: "About", to: "/about" },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        // Custom Variable Usage
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl shadow-lg shadow-background/20"
          : "border-b border-transparent bg-background/20 backdrop-blur-md",
      )}>
      <div className="mx-auto flex h-14 sm:h-16 lg:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-1.5 group shrink-0 active:scale-95 transition-transform">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            // Custom Variable Usage
            className="p-1.5 sm:p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-colors">
            <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </motion.div>
          {/* Custom Variable Usage */}
          <span className="text-base sm:text-lg lg:text-xl font-black tracking-tighter text-foreground">
            Rashed<span className="text-primary">.</span>Dev
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.title}
              to={link.to}
              className={cn(
                "relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all hover:text-foreground rounded-lg",
                location.pathname === link.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}>
              {link.title}
              {location.pathname === link.to && (
                <motion.span
                  layoutId="navbar-indicator"
                  // Custom Variable Usage
                  className="absolute inset-x-1 -bottom-0.5 h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />

          {/* Desktop Contact Button */}
          <Button
            asChild
            variant="outline"
            // Custom Variable Usage (Glassy style using vars)
            className="hidden md:flex rounded-full px-4 lg:px-6 h-9 lg:h-10 border-border bg-muted/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all gap-2 text-sm font-medium group">
            <Link to="/contact">
              Let's Talk{" "}
              <Send className="h-3.5 w-3.5 lg:h-4 lg:w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  // Custom Variable Usage
                  className="h-9 w-9 text-foreground hover:bg-muted hover:text-primary transition-all border border-transparent hover:border-border">
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
                // Custom Variable Usage
                className="w-70 sm:w-87.5 bg-background/95 backdrop-blur-2xl border-l border-border p-0 text-foreground">
                <div className="flex flex-col h-full p-5 sm:p-6">
                  <SheetHeader className="text-left mb-6 sm:mb-8">
                    <SheetTitle className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Cpu className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-black tracking-tighter text-lg text-foreground">
                        Rashed<span className="text-primary">.</span>Dev
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col gap-2">
                    {links.map((link, index) => (
                      <motion.div
                        key={link.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}>
                        <Link
                          to={link.to}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center px-4 py-3 text-sm sm:text-base font-medium rounded-xl transition-all active:scale-95",
                            location.pathname === link.to
                              ? "bg-primary/10 text-primary border border-primary/30 shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent",
                          )}>
                          <span className="flex-1">{link.title}</span>
                          {location.pathname === link.to && (
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

                  {/* Mobile Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-auto pt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-11 rounded-xl border-border bg-muted/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all gap-2 font-medium group"
                      onClick={() => setIsOpen(false)}>
                      <Link
                        to="/contact"
                        className="flex items-center justify-center gap-2">
                        Contact Me{" "}
                        <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
