import React from "react";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Uses & Everyday Gear | Rashedul Raha",
  description:
    "Explore the hardware, dev tools, CLI utilities, and core technology stack Rashedul Raha uses for software engineering and design.",
};

interface ToolCardProps {
  name: string;
  image: string;
}

function ToolCard({ name, image }: ToolCardProps) {
  return (
    <div className="group flex flex-col items-center justify-center p-3.5 rounded-2xl border border-border/40 bg-card/40 hover:bg-card/80 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
      <div className="w-12 h-12 rounded-xl bg-background/80 border border-border/40 p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={36}
          height={36}
          className="w-8 h-8 object-contain"
          unoptimized
        />
      </div>
      <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground text-center mt-2.5 truncate max-w-full">
        {name}
      </span>
    </div>
  );
}

export default function UsesPage() {
  const craftTools = [
    { name: "Zed", image: "/images/image_1.jpg" },
    { name: "Claude Code", image: "/images/image_2.jpg" },
    { name: "Ghostty", image: "/images/image.jpg" },
    { name: "Arc", image: "/images/image_11.jpg" },
    { name: "Linear", image: "/images/image_3.jpg" },
    {
      name: "Figma",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    { name: "Docker", image: "/images/docker.svg" },
    {
      name: "Biome",
      image:
        "https://raw.githubusercontent.com/biomejs/resources/main/logo/png/biome-logo-square.png",
    },
    {
      name: "PostHog",
      image: "https://posthog.com/brand/posthog-icon.svg",
    },
  ];

  const cliTools = [
    {
      name: "Zsh",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    },
    {
      name: "tmux",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tmux/tmux-original.svg",
    },
    {
      name: "LazyGit",
      image:
        "https://raw.githubusercontent.com/jesseduffield/lazygit/master/assets/logo.png",
    },
    {
      name: "Neovim",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neovim/neovim-original.svg",
    },
    {
      name: "zoxide",
      image:
        "https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/man/zoxide.png",
    },
    {
      name: "eza",
      image:
        "https://raw.githubusercontent.com/eza-community/eza/main/logo.png",
    },
    {
      name: "Starship",
      image: "https://starship.rs/icon.png",
    },
    {
      name: "GitHub CLI",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Homebrew",
      image: "https://brew.sh/assets/img/homebrew-256x256.png",
    },
    {
      name: "Git Worktrees",
      image: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
    },
  ];

  const appTools = [
    {
      name: "Raycast",
      image: "https://www.raycast.com/favicon-32x32.png",
    },
    {
      name: "Notion",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
    },
    {
      name: "Cleanshot X",
      image: "https://cleanshot.com/favicon.ico",
    },
    {
      name: "Screen Studio",
      image: "https://screen.studio/favicon.png",
    },
    {
      name: "1Password",
      image: "https://1password.com/favicon.ico",
    },
    {
      name: "Karabiner-Elements",
      image: "https://karabiner-elements.pqrs.org/icon.png",
    },
    {
      name: "Spotify",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spotify/spotify-original.svg",
    },
  ];

  const data = [
    {
      title: "Hardware Setup",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            My primary workstation for software development, microservices architecture, and daily engineering tasks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-background group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="MacBook Pro Workstation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg">Apple Silicon Workstation</h4>
                  <p className="text-zinc-300 text-sm">Ultra-fast compilation, native Unix terminal runtime, and all-day battery efficiency.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-background group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Custom Mechanical Keyboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg">Custom Mechanical Keyboard</h4>
                  <p className="text-zinc-300 text-sm">Tactile switches and ergonomic layout built for fast, comfortable code authoring.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Craft & Dev Environment",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-6 leading-relaxed max-w-2xl">
            Primary code editors, intelligent assistants, design software, and container runtimes I craft software in.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {craftTools.map((tool) => (
              <ToolCard key={tool.name} name={tool.name} image={tool.image} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "CLI & Keyboard First",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-6 leading-relaxed max-w-2xl">
            Command line tools, terminal multiplexers, shell enhancements, and Git utilities for keyboard-first workflow.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {cliTools.map((tool) => (
              <ToolCard key={tool.name} name={tool.name} image={tool.image} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Apps & Daily Flow",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-6 leading-relaxed max-w-2xl">
            Productivity applications, launcher tools, documentation apps, and media players that fuel daily engineering.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {appTools.map((tool) => (
              <ToolCard key={tool.name} name={tool.name} image={tool.image} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Core Tech Stack",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            My go-to technology stack for building high-performance web applications and backend systems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-background group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Next.js and React"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg">Next.js 15 & React 19</h4>
                  <p className="text-zinc-300 text-sm">App Router architecture, Server Actions, and dynamic micro-animations.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-[#090d16] p-6 flex flex-col justify-center">
              <h4 className="text-white font-bold text-base mb-4">Core Frameworks & Tools</h4>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">TypeScript 5.7</span>
                <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">Tailwind CSS v4</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">Framer Motion</span>
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">Node.js & Express</span>
                <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">PostgreSQL & Prisma</span>
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">Docker & Nginx</span>
                <span className="px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20">Redis & Supabase</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper>
      <Timeline data={data} />
      <Footer />
    </PageWrapper>
  );
}
