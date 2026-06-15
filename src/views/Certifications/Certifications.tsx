"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ExternalLink,
  Calendar,
  Building2,
  Search,
  Filter,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

// Certificate Type Definition
interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  category: "Full-Stack" | "Cloud & DevOps" | "UI/UX" | "Other";
  skills: string[];
  featured: boolean;
}

// Default Data (Apni chaile alada file thekeo import korte parben)
const defaultCertificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Advanced Next.js & React Architecture",
    issuer: "Vercel / Next.js Expert Program",
    date: "March 2024",
    credentialId: "NX-88291-RH",
    credentialUrl: "#",
    category: "Full-Stack",
    skills: ["Next.js 14", "React 18", "Server Actions", "Turbopack"],
    featured: true,
  },
  {
    id: "cert-2",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    date: "January 2024",
    credentialId: "AWS-ASA-9921",
    credentialUrl: "#",
    category: "Cloud & DevOps",
    skills: ["AWS S3", "EC2", "Serverless", "CloudFront Architecture"],
    featured: true,
  },
  {
    id: "cert-3",
    title: "TypeScript Enterprise Design Patterns",
    issuer: "UI.dev / TypeScript Academy",
    date: "November 2023",
    credentialId: "TS-7712-RE",
    credentialUrl: "#",
    category: "Full-Stack",
    skills: ["Generics", "Advanced Types", "Async Workflows"],
    featured: false,
  },
  {
    id: "cert-4",
    title: "Prisma & PostgreSQL Masterclass",
    issuer: "MongoDB & Prisma Institute",
    date: "September 2023",
    credentialId: "PR-DB-0021",
    credentialUrl: "#",
    category: "Cloud & DevOps",
    skills: ["PostgreSQL", "Prisma ORM", "Database Indexing", "Pooling"],
    featured: false,
  },
  {
    id: "cert-5",
    title: "Advanced Interaction & Motion Design",
    issuer: "Framer Motion Academy",
    date: "June 2023",
    credentialId: "FM-MOTION-443",
    credentialUrl: "#",
    category: "UI/UX",
    skills: ["Framer Motion", "3D Transforms", "SVG Animations"],
    featured: true,
  },
];

interface PageCertificationsProps {
  certificates?: Certificate[];
}

export default function PageCertifications({
  certificates = defaultCertificates,
}: PageCertificationsProps) {
  const categories = ["All", "Full-Stack", "Cloud & DevOps", "UI/UX", "Other"];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic
  const filteredCertificates = certificates.filter((cert) => {
    const matchesCategory =
      selectedCategory === "All" || cert.category === selectedCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative min-h-screen w-full bg-background text-foreground px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between border-b border-border pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-4">
              <Award className="w-3.5 h-3.5" /> Verified Achievements
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-muted-foreground">
              Certifications
            </h1>
            <p className="mt-3 text-base text-muted-foreground max-w-xl">
              A curated collection of my professional achievements, verified
              skills, and industry-recognized credentials.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 md:mt-0 flex gap-4 justify-center md:justify-end">
            <div className="bg-card border border-border rounded-xl px-5 py-3 text-center min-w-[110px] shadow-sm">
              <div className="text-2xl font-bold text-primary">
                {certificates.length}+
              </div>
              <div className="text-xs text-muted-foreground">Total Certs</div>
            </div>
            <div className="bg-card border border-border rounded-xl px-5 py-3 text-center min-w-[110px] shadow-sm">
              <div className="text-2xl font-bold text-secondary-foreground">
                {certificates.filter((c) => c.featured).length}
              </div>
              <div className="text-xs text-muted-foreground">Expert Level</div>
            </div>
          </div>
        </div>

        {/* Search & Filtering Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full mt-8">
          {/* Search Input - Shadcn Style */}
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search certs, issuers, or technical skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            />
          </div>

          {/* Category Tabs - Shadcn Badge/Toggle Style */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <Filter className="w-3.5 h-3.5 text-muted-foreground mr-1 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert) => (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                className={`group relative flex flex-col justify-between rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 overflow-hidden ${
                  cert.featured
                    ? "border-primary/50 shadow-md"
                    : "border-border hover:border-primary/30"
                }`}>
                {/* Top Featured Gradient Tag */}
                {cert.featured && (
                  <div className="absolute top-0 right-0 p-3">
                    <div className="flex items-center gap-1 bg-primary/90 text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <GraduationCap className="w-3 h-3" /> Featured
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Institution Details */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium">
                    <Building2 className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                    <span>{cert.issuer}</span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-lg font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>

                  {/* Date & ID Row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{cert.date}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="font-mono text-[11px] opacity-80">
                          ID: {cert.credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tech Tags / Skills Learned */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {cert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button/Link */}
                <div className="mt-auto border-t border-border p-4 bg-secondary/20 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    {cert.category}
                  </span>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline decoration-primary/30 underline-offset-4">
                    Verify Link
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-input rounded-xl bg-card/50">
            <Award className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">
              No Certificates Found
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
