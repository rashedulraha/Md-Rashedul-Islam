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
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 group transition-transform active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-sm transition-all group-hover:bg-primary group-hover:border-primary">
            <Cpu className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-foreground">
            Rashed<span className="text-primary">.</span>Dev
          </span>
        </Link>

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
                <span className="absolute inset-x-0 -bottom-[1.5px] h-0.5 bg-primary rounded-full shadow-sm shadow-primary/40" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            asChild
            className="hidden md:flex rounded-full px-6 bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all gap-2">
            <Link to="/contact">
              Let's Talk <Send className="h-4 w-4" />
            </Link>
          </Button>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-border/40">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background/95 backdrop-blur-2xl">
                <SheetHeader className="mb-8">
                  <SheetTitle className="flex items-center gap-2">
                    <Cpu className="text-primary" /> Rashed.Dev
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.title}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-lg font-medium",
                        location.pathname === link.to
                          ? "bg-primary/10 text-primary border-l-4 border-primary"
                          : "text-muted-foreground"
                      )}>
                      {link.title}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
