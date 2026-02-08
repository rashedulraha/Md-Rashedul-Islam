import { motion } from "framer-motion";
import {
  Search,
  Globe,
  Layers,
  Server,
  GitBranch,
  Code,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type {
  ProjectCategory,
  ComplexityLevel,
} from "@/Routes/Types/projectType";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: ProjectCategory;
  setSelectedCategory: (value: ProjectCategory) => void;
  selectedComplexity: ComplexityLevel;
  setSelectedComplexity: (value: ComplexityLevel) => void;
  onClearFilters: () => void;
}

export default function ProjectFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedComplexity,
  setSelectedComplexity,
  onClearFilters,
}: ProjectFiltersProps) {
  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case "web":
        return <Globe className="h-4 w-4" />;
      case "mobile":
        return <Layers className="h-4 w-4" />;
      case "fullstack":
        return <Server className="h-4 w-4" />;
      case "opensource":
        return <GitBranch className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || selectedComplexity !== "all";

  return (
    <div className="mb-12 space-y-6">
      {/* Search Input Section */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, technologies, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 bg-card/20 backdrop-blur-sm border-border/40 focus:border-primary/50 transition-all text-sm"
          />
        </motion.div>

        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}>
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="h-14 px-6 text-muted-foreground hover:text-destructive flex items-center gap-2">
              <X className="h-4 w-4" /> Clear All
            </Button>
          </motion.div>
        )}
      </div>

      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "all",
                "web",
                "mobile",
                "fullstack",
                "opensource",
              ] as ProjectCategory[]
            ).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative group ${
                  selectedCategory === category
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground bg-card/10 border border-border/40"
                }`}>
                {selectedCategory === category && (
                  <motion.div
                    layoutId="active-category-pill"
                    className="absolute inset-0 bg-primary rounded-xl z-0 shadow-lg shadow-primary/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 uppercase tracking-widest flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Complexity */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Complexity Level
          </h3>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "all",
                "beginner",
                "intermediate",
                "advanced",
              ] as ComplexityLevel[]
            ).map((complexity) => (
              <button
                key={complexity}
                onClick={() => setSelectedComplexity(complexity)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative group ${
                  selectedComplexity === complexity
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground bg-card/10 border border-border/40"
                }`}>
                {selectedComplexity === complexity && (
                  <motion.div
                    layoutId="active-complexity-pill"
                    className="absolute inset-0 bg-primary rounded-xl z-0 shadow-lg shadow-primary/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 uppercase tracking-widest">
                  {complexity}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
