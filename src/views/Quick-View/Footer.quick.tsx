"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  ArrowUp,
  ExternalLink,
  MapPin,
  Clock,
  FileCode,
  Layout,
  BookOpen,
  Users,
  Server,
  Braces,
  Figma,
  GitBranch,
  Compass,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// ===== CREATIVE BORDER STYLES (Theme-aware) =====
const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

const innerCardBorderStyle = {
  borderTop: "1px solid var(--border)",
  borderLeft: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderRight: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 10%)",
};

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
      href: "mailto:rashedulraha.bd@gmail.com",
      icon: Mail,
      external: true,
    },
  ],
  techStack: [
    { name: "React/Next.js", icon: Braces },
    { name: "TypeScript", icon: FileCode },
    { name: "Node.js", icon: Server },
    { name: "TailwindCSS", icon: Layout },
    { name: "Figma", icon: Figma },
    { name: "Git", icon: GitBranch },
  ],
  contact: {
    email: "rashedulraha.bd@gmail.com",
    location: "Dhaka, Bangladesh",
    timezone: "GMT+6",
  },
};

// Social Links (theme-aware)
const socialLinks = [
  { name: "GitHub", icon: FaGithub, href: "https://github.com/rashedulraha" },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://linkedin.com/in/rashedulraha",
  },
  {
    name: "Twitter",
    icon: FaXTwitter,
    href: "https://twitter.com/rashedulraha",
  },
  { name: "Email", icon: Mail, href: "mailto:rashedulraha.bd@gmail.com" },
];

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
    <div
      className="relative overflow-hidden rounded-xl bg-card p-5 transition-all duration-500 hover:shadow-lg group"
      style={innerCardBorderStyle}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-semibold text-sm text-foreground">Stay Updated</h4>
      </div>
      <p className="text-xs text-foreground/70 mb-3">
        Get the latest updates about my projects and blog posts.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 text-sm bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          required
        />
        <Button
          type="submit"
          size="sm"
          className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground transition-all">
          {subscribed ? "Subscribed!" : "Subscribe"}
        </Button>
      </form>
      <p className="text-[10px] text-foreground/50 mt-2">
        No spam, unsubscribe anytime.
      </p>
    </div>
  );
}

// Main Footer Component
export default function Footer() {
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

  return (
    <footer className="relative bg-background overflow-hidden">
      {/* Top Border with Creative Style */}
      <div
        className="relative"
        style={{
          borderTop: "1.5px solid var(--border)",
        }}>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110">
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
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Rashedul Islam
                  </h3>
                  <p className="text-[10px] text-foreground/70 font-mono tracking-wider uppercase">
                    Full Stack Developer
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed">
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
                    aria-label={social.name}
                    className="p-2 rounded-lg bg-muted/30 border border-border/50 text-foreground/70 transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:border-primary/30 hover:text-primary">
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-foreground/70">
                  <div className="p-1 rounded bg-primary/10 border border-primary/20">
                    <MapPin className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span>{footerLinks.contact.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground/70">
                  <div className="p-1 rounded bg-primary/10 border border-primary/20">
                    <Clock className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span>{footerLinks.contact.timezone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-1 rounded bg-primary/10 border border-primary/20">
                    <Mail className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <a
                    href={`mailto:${footerLinks.contact.email}`}
                    className="text-foreground/70 hover:text-primary transition-colors">
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
                <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                  <Compass className="w-3 h-3 text-primary" />
                </div>
                Explore
              </h4>
              <ul className="space-y-2">
                {footerLinks.explore.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors group">
                        <Icon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}>
              <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                  <FileCode className="w-3 h-3 text-primary" />
                </div>
                Resources
              </h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between group text-sm text-foreground/70 hover:text-primary transition-colors">
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
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <Braces className="w-3 h-3 text-primary" />
                  </div>
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {footerLinks.techStack.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="outline"
                      className="text-[10px] gap-1 bg-muted/30 border-border/50 text-foreground/80 hover:border-primary/50 hover:text-primary transition-all duration-300">
                      <tech.icon className="w-2.5 h-2.5" />
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <NewsletterSignup />
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div
            className="relative pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{
              borderTop: "1px solid color-mix(in srgb, var(--border) 40%)",
            }}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <p className="text-xs text-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-foreground font-medium">
                Rashedul Islam
              </span>
              . All rights reserved.
            </p>

            <p className="text-xs text-foreground/60 flex items-center gap-1.5">
              Built with
              <span className="text-primary font-semibold">Next.js</span>
              <span className="text-foreground/40">&</span>
              <span className="text-primary font-semibold">TypeScript</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
