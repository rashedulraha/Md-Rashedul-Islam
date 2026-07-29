"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  X, 
  RefreshCw, 
  Search, 
  LayoutGrid, 
  List, 
  Image as ImageIcon,
  ArrowLeft
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getProjects, createProject, updateProject, deleteProject } from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";
import { Skeleton } from "@/components/ui/skeleton";

export interface IProject {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  badge?: string;
  type: string;
  stats?: string;
  features: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  readmeContent?: string;
  createdAt?: string;
}

export function ProjectsTab() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "editor">("list");
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  
  // View Mode: grid, list, image
  const [viewMode, setViewMode] = useState<"grid" | "list" | "image">("grid");

  // Delete confirm modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("All");

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    image: "",
    badge: "",
    type: "Web App",
    stats: "",
    features: "",
    tags: "",
    liveUrl: "",
    githubUrl: "",
    readmeContent: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getProjects();
      const data = res.data;
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
      } else {
        setError("Failed to load projects.");
      }
    } catch (err) {
      setError("Error connecting to backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      subtitle: "",
      description: "",
      image: "",
      badge: "Q1 2026",
      type: "Web App",
      stats: "",
      features: "",
      tags: "Next.js, React, TypeScript, Tailwind CSS",
      liveUrl: "",
      githubUrl: "",
      readmeContent: "",
    });
    setCurrentView("editor");
  };

  const openEditModal = (project: IProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      slug: project.slug || "",
      subtitle: project.subtitle || "",
      description: project.description || "",
      image: project.image || "",
      badge: project.badge || "",
      type: project.type || "Web App",
      stats: project.stats || "",
      features: Array.isArray(project.features) ? project.features.join(", ") : "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      readmeContent: project.readmeContent || "",
    });
    setCurrentView("editor");
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const res = await deleteProject(deletingId);
      if (res.data.success) {
        fetchProjects();
        setDeletingId(null);
      } else {
        alert(res.data.message || "Failed to delete project");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting project");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      subtitle: formData.subtitle,
      description: formData.description,
      image: formData.image,
      badge: formData.badge,
      type: formData.type,
      stats: formData.stats,
      features: formData.features.split(",").map((s) => s.trim()).filter(Boolean),
      tags: formData.tags.split(",").map((s) => s.trim()).filter(Boolean),
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      readmeContent: formData.readmeContent,
    };

    try {
      const res = editingProject
        ? await updateProject(editingProject.id, payload)
        : await createProject(payload);

      const data = res.data;
      if (data.success) {
        setCurrentView("list");
        fetchProjects();
      } else {
        alert(data.message || "Operation failed.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = activeType === "All" || p.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [projects, searchQuery, activeType]);

  if (currentView === "editor") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <button 
            onClick={() => setCurrentView("list")}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>
        
        <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-6">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Subtitle (Optional)</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. AI Powered Platform"
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                >
                  <option value="Web App">Web App</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="UI Kit">UI Kit</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Badge</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Q1 2026"
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Stats Badge</label>
                <input
                  type="text"
                  value={formData.stats}
                  onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                  placeholder="4.3k checks"
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Image URL *</label>
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Description *</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Next.js, React, Tailwind CSS"
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Features (comma-separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1, Feature 2"
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Live Demo URL</label>
                <input
                  type="text"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">GitHub Repo URL</label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <span>Documentation (Raw README.md Content)</span>
                  <span className="text-[10px] text-indigo-400 font-normal">(Renders dynamic GitHub-style markdown)</span>
                </label>
                <label className="cursor-pointer text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
                  <span>Upload .md file</span>
                  <input
                    type="file"
                    accept=".md,.markdown,text/plain"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setFormData({ ...formData, readmeContent: (event.target?.result as string) || "" });
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                </label>
              </div>
              <textarea
                rows={12}
                value={formData.readmeContent}
                onChange={(e) => setFormData({ ...formData, readmeContent: e.target.value })}
                placeholder="# Project Title&#10;&#10;Paste raw README.md content here... Supports headers, code blocks, lists, badges, and images."
                className="w-full bg-muted/60 border border-border rounded-xl p-3 text-xs font-mono text-foreground focus:outline-none focus:border-primary/50 leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
              <button
                type="button"
                onClick={() => setCurrentView("list")}
                className="px-4 py-2 bg-muted hover:bg-accent text-xs font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Projects Management</h2>
          <p className="text-muted-foreground mt-1">Manage, format views, and customize your portfolio projects dynamically.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent text-foreground text-xs font-semibold rounded-xl transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>

      {/* Controls Bar: Search, Filters, and View Mode Switcher */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/60 border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {["All", "Web App", "Mobile App", "UI Kit"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeType === type
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-muted/60 border border-border p-1 rounded-xl gap-1 shrink-0">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            title="Grid Cards View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            title="Compact List View"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
          <button
            onClick={() => setViewMode("image")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "image" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            title="Gallery Images View"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Images</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Main Content by Selected View Mode */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card-premium p-5 flex flex-col justify-between space-y-4">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <div className="flex gap-2 pt-2">
                {[1, 2, 3].map((t) => (
                  <Skeleton key={t} className="h-5 w-14 rounded-md" />
                ))}
              </div>
              <div className="flex justify-between pt-4 border-t border-border/50">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No projects found matching criteria.
        </div>
      ) : (
        <>
          {/* 1. GRID CARDS VIEW */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-premium p-5 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-4 relative">
                      <img
                        src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                          {project.type}
                        </span>
                        {project.badge && (
                          <span className="px-2.5 py-1 bg-primary/80 backdrop-blur-md rounded-full text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                            {project.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground line-clamp-1">{project.title}</h3>
                    {project.subtitle && (
                      <p className="text-xs font-semibold text-primary mt-0.5">{project.subtitle}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-muted/60 text-[10px] font-medium text-foreground/80 border border-border/40"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs">
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                          title="GitHub Repository"
                        >
                          <FaGithub className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-foreground rounded-lg font-medium transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(project.id)}
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* 2. COMPACT LIST VIEW */}
          {viewMode === "list" && (
            <div className="card-premium overflow-hidden">
              <div className="divide-y divide-border/50">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"}
                        alt={project.title}
                        className="w-16 h-12 object-cover rounded-lg bg-muted shrink-0 border border-border/40"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-foreground truncate">{project.title}</h3>
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-bold">
                            {project.type}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-md mt-0.5">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => openEditModal(project)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-xs font-semibold rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(project.id)}
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ONLY IMAGE GALLERY VIEW */}
          {viewMode === "image" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="relative aspect-video rounded-xl overflow-hidden group bg-muted border border-border/50 shadow-md"
                >
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between">
                    <span className="self-start px-2 py-0.5 bg-primary/80 text-primary-foreground rounded-md text-[9px] font-bold uppercase tracking-wider">
                      {project.type}
                    </span>

                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{project.title}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-md text-[10px] font-semibold backdrop-blur-md flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(project.id)}
                          className="p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-md backdrop-blur-md"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Project"
        message="Are you sure you want to delete this project? It will be removed from your portfolio."
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingId(null)}
      />
    </div>
  );
}
