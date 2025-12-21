import { Menu, Cpu, Send } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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

const NavLinks = [
  { title: "Home", to: "/" },
  { title: "Projects", to: "/projects" },
  { title: "Tech Stack", to: "/stack" },
  { title: "Experience", to: "/experience" },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo Section with Hover Effect */}
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] transition-all group-hover:bg-primary group-hover:border-primary">
            <Cpu className="h-6 w-6 text-primary group-hover:text-primary-foreground animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Rashed
            <span className="text-primary group-hover:animate-bounce">.</span>
            Dev
          </span>
        </Link>

        {/* Desktop Navigation with Active State Indicator */}
        <nav className="hidden md:flex items-center gap-1">
          {NavLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.title}
                to={link.to}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                {link.title}
                {/* Active Underline Animation */}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-[1.5px] h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block mr-2">
            <ModeToggle />
          </div>

          <Button
            asChild
            className="hidden md:flex rounded-full px-6 bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 gap-2">
            <Link to="/contact">
              Let's Talk <Send className="h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg border border-border/40">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-75 bg-background/95 backdrop-blur-2xl border-l border-border/40">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold tracking-tight">Rashed.Dev</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 px-4 ">
                  {NavLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-xl text-lg font-medium transition-all",
                        location.pathname === link.to
                          ? "bg-primary/10 text-primary border-l-4 border-primary"
                          : "text-muted-foreground hover:bg-muted"
                      )}>
                      {link.title}
                    </Link>
                  ))}
                  <Button className="mt-4 w-full h-12 text-lg rounded-xl">
                    Contact Me
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
