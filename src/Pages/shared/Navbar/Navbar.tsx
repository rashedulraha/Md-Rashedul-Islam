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

const links = [
  { title: "Home", to: "/" },
  { title: "Projects", to: "/projects" },
  { title: "Tech Stack", to: "/stack" },
  { title: "Experience", to: "/experience" },
  { title: "About", to: "/about" },
  { title: "Quick view", to: "/quick-view" },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
        className={cn(
          "fixed top-5 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500",
          scrolled && "top-2", // Moves up slightly on scroll
        )}>
        {/* Floating Pill Container */}
        <div
          className={cn(
            "flex h-12 sm:h-16 items-center justify-between gap-4 md:gap-8",
            "px-4 sm:px-6 lg:px-8",
            "border border-foreground/10 rounded-full",
            "bg-background/80 backdrop-blur-xl",
            "shadow-lg shadow-black/5",
            "transition-all duration-300",
            scrolled && "bg-background/95 shadow-xl shadow-black/10",
            "max-w-7xl w-auto", // Changed w-full to w-auto for true Island look
          )}>
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0 active:scale-95 transition-transform">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="p-2 rounded-xl bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
              <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            </motion.div>
            <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tighter text-foreground">
              Rashed<span className="text-foreground/40">.</span>Dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.to}
                className={cn(
                  "relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-lg",
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                )}>
                {link.title}
                {/* Active Indicator */}
                {location.pathname === link.to && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-foreground to-foreground/50 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Contact Button */}
            <Button
              asChild
              variant="outline"
              className={cn(
                "hidden md:flex rounded-full px-5 lg:px-6 h-9 lg:h-10",
                "border-foreground/20 bg-foreground/5 text-foreground",
                "hover:bg-foreground hover:text-background hover:border-foreground",
                "hover:shadow-lg hover:shadow-foreground/10",
                "transition-all duration-300 gap-2 text-sm font-medium group",
              )}>
              <Link to="/contact">
                Let's Talk
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
                  className="w-[85vw] sm:w-[400px] bg-background/98 backdrop-blur-2xl border-l border-foreground/10 p-0 text-foreground">
                  <div className="flex flex-col h-full p-6 sm:p-8">
                    <SheetHeader className="text-left mb-8">
                      <SheetTitle className="flex items-center gap-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="p-2.5 rounded-xl bg-foreground/5 border border-foreground/10">
                          <Cpu className="h-5 w-5 text-foreground" />
                        </motion.div>
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="font-black tracking-tighter text-xl text-foreground">
                          Rashed<span className="text-foreground/40">.</span>Dev
                        </motion.span>
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
                              "flex items-center px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-300 active:scale-95",
                              location.pathname === link.to
                                ? "bg-foreground/10 text-foreground border border-foreground/20 shadow-sm"
                                : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground border border-transparent",
                            )}>
                            <span className="flex-1">{link.title}</span>
                            {location.pathname === link.to && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-foreground to-foreground/50"
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
                        className={cn(
                          "w-full h-12 rounded-xl",
                          "border-foreground/20 bg-foreground/5 text-foreground",
                          "hover:bg-foreground hover:text-background hover:border-foreground",
                          "transition-all duration-300 gap-2 font-medium group",
                        )}
                        onClick={() => setIsOpen(false)}>
                        <Link
                          to="/contact"
                          className="flex items-center justify-center gap-2">
                          Contact Me
                          <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>

                    {/* Footer Note for Mobile */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-center mt-6 pt-4 border-t border-foreground/10">
                      <p className="text-xs text-muted-foreground">
                        © 2025 Rashedul Islam
                      </p>
                    </motion.div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content overlap 
          Height Calculation: top-5 (20px) + h-12 (48px) = 68px (Mobile)
                           top-5 (20px) + h-16 (64px) = 84px (Desktop)
      */}
      <div className="h-[68px] sm:h-[84px]" />
    </>
  );
}
