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

const links = [
  { title: "Home", to: "/" },
  { title: "Projects", to: "/projects" },
  { title: "Tech Stack", to: "/stack" },
  { title: "Experience", to: "/experience" },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 group shrink-0 active:scale-95 transition-transform">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-sm group-hover:bg-primary group-hover:border-primary transition-all">
            <Cpu className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tighter text-foreground">
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
                "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground"
              )}>
              {link.title}
              {location.pathname === link.to && (
                <span className="absolute inset-x-2 -bottom-4.25 h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
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
            className="hidden md:flex rounded-full px-6 bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all gap-2">
            <Link to="/contact">
              Let's Talk <Send className="h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 border border-border/40 hover:bg-primary/5">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-70 sm:w-87.5 bg-background/95 backdrop-blur-2xl border-l border-border/40 p-0">
                <div className="flex flex-col h-full p-6">
                  <SheetHeader className="text-left mb-8">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-primary/10">
                        <Cpu className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-bold tracking-tight">
                        Rashed.Dev
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                      <Link
                        key={link.title}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center text-base font-medium transition-all active:scale-95",
                          location.pathname === link.to
                            ? "bg-primary/10 text-primary border-l-4 border-primary"
                            : "text-muted-foreground hover:bg-muted/50"
                        )}>
                        <Button className="w-full rounded" variant={"outline"}>
                          {" "}
                          {link.title}
                        </Button>
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Contact Button (Bottom of drawer) */}
                  <div className="mt-auto pt-6">
                    <Button
                      asChild
                      className="w-full  rounded bg-primary text-primary-foreground gap-2"
                      onClick={() => setIsOpen(false)}>
                      <Link to="/contact">
                        Contact Me <Send className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
