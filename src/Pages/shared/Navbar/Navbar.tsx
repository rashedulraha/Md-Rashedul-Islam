import { Menu, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "projects" },
  { title: "Tech Stack", href: "stack" },
  { title: "Experience", href: "experience" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 transition-all group-hover:bg-primary/20">
            <Cpu className="h-5 w-5 text-primary animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tighter">
            Rashed<span className="text-primary">.</span>Dev
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-muted-foreground hover:text-primary transition-colors duration-300"
                    )}>
                    {link.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            className="hidden md:flex rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            variant="outline">
            Let's Talk
          </Button>
          <ModeToggle />

          {/* Mobile Sheet (Sidebar Menu) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background/95 backdrop-blur-lg">
                <SheetHeader>
                  <SheetTitle className="text-left text-primary font-bold">
                    MENU
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                      {link.title}
                    </a>
                  ))}
                  <Button className="w-full mt-4">Contact Me</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
