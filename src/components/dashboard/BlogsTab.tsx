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
  BookOpen, 
  Search, 
  LayoutGrid, 
  List, 
  Clock, 
  FileText,
  Eye,
  Code,
  Bold,
  Italic,
  Heading,
  List as ListIcon,
  Quote as QuoteIcon,
  Link as LinkIcon,
  ArrowLeft,
  Save,
  Image as ImageIcon
} from "lucide-react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";
import { Skeleton } from "@/components/ui/skeleton";

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
  category: string;
  readTime: string;
  createdAt?: string;
}

const presetCategories = [
  "Nextjs",
  "React",
  "Performance",
  "Web-Vitals",
  "Developer-Tools",
  "Terminal",
  "Neovim",
  "Workflow",
  "Tutorial",
  "Architecture",
];

export function BlogsTab() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);

  // New State: switch between List view and Editor view
  const [currentView, setCurrentView] = useState<"list" | "editor">("list");

  // Markdown Editor mode
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");

  // View Mode & Filters
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Posts");

  // Confirm delete states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image: "",
    category: "Nextjs",
    readTime: "5 min read",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getBlogs();
      if (res.data.success && Array.isArray(res.data.data)) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      setError("Failed to load blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAdd = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      image: "",
      category: "Nextjs",
      readTime: "5 min read",
    });
    setEditorMode("write");
    setCurrentView("editor");
  };

  const openEdit = (blog: IBlog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      description: blog.description || "",
      content: blog.content || "",
      image: blog.image || "",
      category: blog.category || "Nextjs",
      readTime: blog.readTime || "5 min read",
    });
    setEditorMode("write");
    setCurrentView("editor");
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const res = await deleteBlog(deletingId);
      if (res.data.success) {
        fetchBlogs();
        setDeletingId(null);
      }
    } catch (err) {
      alert("Failed to delete blog post.");
    } finally {
      setIsDeleting(false);
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + `${prefix}text${suffix}`,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = (event.target?.result as string) || "";
        let autoTitle = formData.title;
        let autoDescription = formData.description;
        let autoSlug = formData.slug;

        const lines = text.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (!autoTitle && trimmed.startsWith("# ")) {
            autoTitle = trimmed.replace(/^#\s+/, "").trim();
          } else if (
            !autoDescription &&
            trimmed &&
            !trimmed.startsWith("#") &&
            !trimmed.startsWith("![") &&
            !trimmed.startsWith("<")
          ) {
            autoDescription = trimmed.slice(0, 180);
          }
        }

        if (autoTitle && !autoSlug) {
          autoSlug = autoTitle
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
        }

        setFormData((prev) => ({
          ...prev,
          title: prev.title || autoTitle,
          slug: prev.slug || autoSlug,
          description: prev.description || autoDescription,
          content: text,
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      };

      const res = editingBlog
        ? await updateBlog(editingBlog.id, payload)
        : await createBlog(payload);

      if (res.data.success) {
        setCurrentView("list");
        fetchBlogs();
      } else {
        alert(res.data.message || "Failed to save blog.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = useMemo(() => {
    const fetchedCats = Array.from(new Set(blogs.map((b) => b.category || "General")));
    const merged = Array.from(new Set([...presetCategories, ...fetchedCats]));
    return ["All Posts", ...merged];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "All Posts" || blog.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [blogs, searchQuery, activeCategory]);

  if (currentView === "editor") {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView("list")} 
            className="p-2 bg-muted hover:bg-accent rounded-xl text-muted-foreground hover:text-foreground transition-all flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              {editingBlog ? "Edit Blog Post" : "Write a New Article"}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Craft your article with the GitHub-flavored markdown editor below.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-premium p-6 border border-border/50 rounded-2xl bg-card space-y-8 shadow-xl">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Side: Metadata & Settings */}
            <div className="xl:col-span-4 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Exploring Advanced React Patterns"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <LayoutGrid className="w-3.5 h-3.5" /> Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-inner appearance-none"
                >
                  {presetCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> Read Time
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="e.g. 5 min read"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5" /> Cover Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                />
                {formData.image && (
                  <div className="mt-2 rounded-xl overflow-hidden aspect-video border border-border/50 relative group">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A compelling summary of your article..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-inner resize-none"
                />
              </div>
            </div>

            {/* Right Side: Markdown Editor */}
            <div className="xl:col-span-8 space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" /> Markdown Content *
                </label>

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/20 transition-all shadow-sm">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Upload .md / README.md</span>
                    <input
                      type="file"
                      accept=".md,.markdown,text/plain"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>

                  {/* Write / Preview Tab Switcher */}
                  <div className="flex items-center bg-background border border-border p-1 rounded-lg gap-1 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setEditorMode("write")}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        editorMode === "write" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" /> Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("preview")}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        editorMode === "preview" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-background border border-border rounded-xl shadow-inner overflow-hidden flex flex-col h-[600px]">
                {editorMode === "write" ? (
                  <>
                    {/* Markdown Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/20 text-muted-foreground overflow-x-auto custom-scrollbar">
                      <button type="button" onClick={() => insertMarkdown("**", "**")} className="p-2 hover:bg-muted rounded-lg hover:text-foreground transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
                      <button type="button" onClick={() => insertMarkdown("*", "*")} className="p-2 hover:bg-muted rounded-lg hover:text-foreground transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
                      <button type="button" onClick={() => insertMarkdown("### ")} className="p-2 hover:bg-muted rounded-lg hover:text-foreground transition-colors" title="Heading"><Heading className="w-4 h-4" /></button>
                      <div className="w-px h-5 bg-border mx-1"></div>
                      <button type="button" onClick={() => insertMarkdown("```javascript\n", "\n```")} className="p-2 hover:bg-muted rounded-lg hover:text-foreground transition-colors" title="Code Block"><Code className="w-4 h-4" /></button>
                      <button type="button" onClick={() => insertMarkdown("> ")} className="p-2 hover:bg-muted rounded-lg hover:text-foreground transition-colors" title="Quote"><QuoteIcon className="w-4 h-4" /></button>
                      <button type="button" onClick={() => insertMarkdown("- ")} className="p-2 hover:bg-muted rounded-lg hover:text-foreground transition-colors" title="Bullet List"><ListIcon className="w-4 h-4" /></button>
                      <button type="button" onClick={() => insertMarkdown("[link title](", ")")} className="p-2 hover:bg-muted rounded-lg hover:text-foreground transition-colors" title="Link"><LinkIcon className="w-4 h-4" /></button>
                    </div>

                    <textarea
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Start writing your article in GitHub-flavored Markdown here..."
                      className="flex-1 w-full p-5 text-sm text-foreground bg-transparent focus:outline-none resize-none font-mono leading-loose custom-scrollbar"
                    />
                  </>
                ) : (
                  <div className="flex-1 overflow-y-auto p-6 bg-transparent text-sm text-foreground space-y-4 prose prose-invert prose-emerald max-w-none custom-scrollbar">
                    {formData.content ? (
                      <div
                        className="space-y-4 leading-loose whitespace-pre-wrap font-sans"
                        dangerouslySetInnerHTML={{
                          __html: formData.content
                            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-primary mt-6 mb-3">$1</h3>')
                            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-foreground mt-8 mb-4">$1</h2>')
                            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-foreground mt-8 mb-4">$1</h1>')
                            .replace(/\*\*(.*)\*\*/gim, '<strong class="text-emerald-400 font-bold">$1</strong>')
                            .replace(/\*(.*)\*/gim, '<em class="text-emerald-200/80">$1</em>')
                            .replace(/```([\s\S]*?)```/gim, '<pre class="bg-[#090d16] p-4 rounded-xl border border-border/50 font-mono text-xs overflow-x-auto text-emerald-300 shadow-inner my-4">$1</pre>')
                            .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-1 italic text-muted-foreground bg-primary/5 rounded-r-lg my-4">$1</blockquote>')
                            .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" class="text-primary hover:underline font-medium">$1</a>'),
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                        <Eye className="w-12 h-12 mb-3" />
                        <p>Nothing to preview yet. Switch to Write mode to type markdown content.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-border/50">
            <button
              type="button"
              onClick={() => setCurrentView("list")}
              className="px-6 py-2.5 bg-muted hover:bg-accent text-sm font-semibold rounded-xl text-foreground transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSubmitting ? "Saving..." : editingBlog ? "Update Article" : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- LIST / CARDS VIEW ---
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground mt-1">
            Manage your articles, tutorials, and technical writings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            className="flex items-center gap-2 px-4 py-2.5 bg-muted hover:bg-accent rounded-xl text-xs font-bold text-foreground transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Write Article
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-b border-border/60 pb-3 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-muted-foreground/20 text-foreground font-bold border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles by title, description or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center bg-background border border-border p-1 rounded-xl gap-1 shrink-0 shadow-inner">
          <button
            onClick={() => setViewMode("cards")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "cards" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "list" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium animate-in fade-in">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card-premium p-5 flex flex-col justify-between space-y-4">
              <Skeleton className="aspect-16/11 w-full rounded-xl" />
              <Skeleton className="h-6 w-5/6 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
              <div className="flex justify-between pt-4 border-t border-border/50 items-center">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-7 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="card-premium p-16 text-center text-muted-foreground border-dashed border-2 border-border/50 rounded-3xl flex flex-col items-center justify-center gap-4">
          <BookOpen className="w-12 h-12 opacity-20" />
          <div>
            <h3 className="text-lg font-bold text-foreground">No articles found</h3>
            <p className="text-sm mt-1">Start sharing your knowledge by writing your first article.</p>
          </div>
          <button onClick={openAdd} className="mt-2 text-primary text-sm font-semibold hover:underline">Write now &rarr;</button>
        </div>
      ) : viewMode === "cards" ? (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="card-premium p-5 flex flex-col justify-between group rounded-2xl hover:border-primary/30 transition-colors duration-300">
              <div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-5 relative border border-border/50">
                  <img
                    src={blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">{blog.title}</h3>
                <p className="text-xs text-muted-foreground mt-3 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/50 text-xs">
                <a
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-primary hover:underline font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(blog)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-accent text-foreground rounded-lg font-semibold transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(blog.id)}
                    className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
                    title="Delete blog"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="card-premium overflow-hidden rounded-2xl border border-border/50">
          <div className="divide-y divide-border/50">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-5 min-w-0 flex-1">
                  <img
                    src={blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80"}
                    alt={blog.title}
                    className="w-24 h-16 object-cover rounded-xl bg-muted shrink-0 border border-border/50 shadow-sm"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-sm font-bold text-foreground truncate hover:text-primary transition-colors cursor-pointer">{blog.title}</h4>
                      <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-md text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                        {blog.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-xl">
                      {blog.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] font-semibold text-muted-foreground">
                       <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <a
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-muted hover:bg-accent text-primary rounded-lg transition-colors"
                    title="View post"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => openEdit(blog)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-muted hover:bg-accent text-foreground text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(blog.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                    title="Delete blog"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingId(null)}
      />
    </div>
  );
}
