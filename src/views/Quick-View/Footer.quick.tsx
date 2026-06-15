"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  ArrowUp,
  Heart,
  Code2,
  Sparkles,
  ExternalLink,
  MapPin,
  Clock,
  FileCode,
  Layout,
  BookOpen,
  Users,
  Star,
  Award,
  Feather,
  Compass,
  Server,
  Braces,
  Figma,
  Terminal,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Footer Links Data
const footerLinks = {
  explore: [
    { name: "Home", href: "/", icon: Compass },
    { name: "About", href: "/about", icon: Users },
    { name: "Projects", href: "/projects", icon: FileCode },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Mail },
  ],
  resources: [
    {
      name: "GitHub",
      href: "https://github.com/rashedulraha",
      icon: FaGithub,
      external: true,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/rashedulraha",
      icon: FaLinkedin,
      external: true,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/rashedulraha",
      icon: FaXTwitter,
      external: true,
    },
    {
      name: "Resume",
      href: "./Md-Rasheduli-Islam.pdf",
      icon: FileCode,
      external: true,
    },
    {
      name: "Email",
      href: "mailto:rashedul@example.com",
      icon: Mail,
      external: true,
    },
  ],
  techStack: [
    { name: "React/Next.js", icon: Braces, color: "text-blue-500" },
    { name: "TypeScript", icon: FileCode, color: "text-blue-600" },
    { name: "Node.js", icon: Server, color: "text-green-500" },
    { name: "TailwindCSS", icon: Layout, color: "text-cyan-500" },
    { name: "Figma", icon: Figma, color: "text-purple-500" },
    { name: "Git", icon: GitBranch, color: "text-orange-500" },
  ],
  contact: {
    email: "rashedul@example.com",
    location: "Dhaka, Bangladesh",
    timezone: "GMT+6",
  },
};

// Social Links with colors
const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/rashedulraha",
    color: "hover:text-white hover:bg-[#333]",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://linkedin.com/in/rashedulraha",
    color: "hover:text-white hover:bg-[#0077b5]",
  },
  {
    name: "Twitter",
    icon: FaXTwitter,
    href: "https://twitter.com/rashedulraha",
    color: "hover:text-white hover:bg-[#1da1f2]",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:rashedul@example.com",
    color: "hover:text-white hover:bg-[#ea4335]",
  },
];

// Animated Counter Component
function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        {count}+
      </div>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

// Newsletter Signup Component
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/2 border-border/50 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-sm">Stay Updated</h4>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Get the latest updates about my projects and blog posts.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 text-sm"
            required
          />
          <Button type="submit" size="sm" className="h-9 px-4">
            {subscribed ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground mt-2">
          No spam, unsubscribe anytime.
        </p>
      </CardContent>
    </Card>
  );
}

// Main Footer Component
export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stats = [
    { value: 48, label: "Projects" },
    { value: 5, label: "Years Exp" },
    { value: 127, label: "Followers" },
    { value: 324, label: "Stars" },
  ];

  return (
    <footer className="relative bg-background border-t border-border/50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Rashedul Islam
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Building scalable web applications with modern technologies.
              Passionate about clean code and great user experiences.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-lg bg-muted/50 text-muted-foreground transition-all duration-300 hover:scale-110",
                    social.color,
                  )}>
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{footerLinks.contact.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{footerLinks.contact.timezone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3 h-3" />
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="hover:text-primary transition-colors">
                  {footerLinks.contact.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Explore Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}>
            <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <link.icon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}>
            <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between group text-sm text-muted-foreground hover:text-primary transition-colors">
                    <span className="flex items-center gap-2">
                      <link.icon className="w-3 h-3" />
                      {link.name}
                    </span>
                    {link.external && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6">
            {/* Tech Stack */}
            <div>
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {footerLinks.techStack.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className="text-[10px] gap-1">
                    <tech.icon className={cn("w-2.5 h-2.5", tech.color)} />
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <NewsletterSignup />
          </motion.div>
        </div>

        {/* Made with love message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6">
          <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
            <Feather className="w-3 h-3" />
            Crafted with passion for code and creativity
            <Sparkles className="w-3 h-3 text-primary" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
