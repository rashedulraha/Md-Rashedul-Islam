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

export default function PageCertifications() {
  // Demo Data (Replace with your real data)
  const certificates: Certificate[] = [
    {
      id: "cert-1",
      title: "Advanced Next.js & React Architecture",
      issuer: "Vercel / Next.js Expert Program",
      date: "March 2024",
      credentialId: "NX-88291-RH",
      credentialUrl: "#", // Add real link here
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
      credentialUrl: "#", // Add real link here
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
      credentialUrl: "#", // Add real link here
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
      credentialUrl: "#", // Add real link here
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
      credentialUrl: "#", // Add real link here
      category: "UI/UX",
      skills: ["Framer Motion", "3D Transforms", "SVG Animations"],
      featured: true,
    },
  ];

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
    <section className="relative min-h-screen w-full bg-black text-white px-4 gap-5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full ">
        {/* Header Section */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between border-b border-white/10 ">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/5 px-3 py-1 text-xs font-medium text-sky-400 mb-4">
              <Award className="w-3.5 h-3.5" /> Verified Achievements
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              Certifications
            </h1>
            <p className="mt-3 text-base text-neutral-400 max-w-xl">
              A curated collection of my professional achievements, verified
              skills, and industry-recognized credentials.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 md:mt-0 flex gap-4 justify-center md:justify-end">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center min-w-[110px]">
              <div className="text-2xl font-bold text-sky-400">
                {certificates.length}+
              </div>
              <div className="text-xs text-neutral-400">Total Certs</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center min-w-[110px]">
              <div className="text-2xl font-bold text-purple-400">
                {certificates.filter((c) => c.featured).length}
              </div>
              <div className="text-xs text-neutral-400">Expert Level</div>
            </div>
          </div>
        </div>

        {/* Search & Filtering Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center  w-full">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-sky-400 transition-colors" />
            <input
              type="text"
              placeholder="Search certs, issuers, or technical skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-sky-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-neutral-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <Filter className="w-3.5 h-3.5 text-neutral-400 mr-1 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-white text-black border-white shadow-lg shadow-white/5"
                    : "bg-white/5 text-neutral-400 border-white/5 hover:border-white/20 hover:text-white"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert) => (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border transition-all duration-300 group ${
                  cert.featured
                    ? "border-sky-500/30 shadow-[0_0_25px_-5px_rgba(14,165,233,0.1)]"
                    : "border-white/10 hover:border-white/20"
                }`}>
                {/* Top Glowing Gradient Tag for Featured ones */}
                {cert.featured && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 flex items-center gap-1 bg-gradient-to-r from-sky-500 to-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-md shadow-sky-500/20">
                    <GraduationCap className="w-3 h-3" /> Core Expertise
                  </div>
                )}

                <div>
                  {/* Institution Details */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-neutral-500 group-hover:text-sky-400 transition-colors" />
                    <span>{cert.issuer}</span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 leading-snug line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Date & ID Row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{cert.date}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-neutral-600" />
                        <span className="font-mono text-[11px]">
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
                        className="bg-white/[0.03] border border-white/5 text-[11px] px-2.5 py-0.5 rounded-md text-neutral-400 group-hover:border-white/10 group-hover:text-neutral-300 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button/Link */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    {cert.category}
                  </span>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer">
                    Verify Link
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State (English) */}
        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
            <Award className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-neutral-300">
              No Certificates Found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
              No certificates found matching your search criteria or filters.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
