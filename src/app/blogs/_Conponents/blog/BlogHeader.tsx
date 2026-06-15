"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";
import { BlogCategory } from "../../_types/blog";

interface BlogHeaderProps {
  categories: BlogCategory[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogHeader({
  categories,
  selectedCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
}: BlogHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16">
      {/* Badge */}
      <Badge className="mb-4 px-4 py-1.5 text-xs rounded-full bg-primary/10 text-primary border-primary/20 font-medium">
        <BookOpen className="w-3 h-3 mr-1.5" />
        Tech Insights & Tutorials
      </Badge>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
        The{" "}
        <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
          Dev Blog
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
        Deep dives into modern web development, best practices, and real-world
        engineering challenges.
      </p>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50"
          }`}>
          All Posts
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategorySelect(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.name
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50"
            }`}>
            {category.name} ({category.count})
          </button>
        ))}
      </div>
    </motion.div>
  );
}
