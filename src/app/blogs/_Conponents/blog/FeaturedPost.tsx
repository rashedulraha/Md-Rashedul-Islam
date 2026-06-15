"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../../_types/blog";
import { formatDate } from "../../_Utilities/blog";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="creative-3d-card relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
          {/* Featured Badge */}
          <div className="absolute top-6 left-6 z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Featured Article</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 md:h-auto min-h-[400px] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card/40 via-transparent to-transparent md:bg-gradient-to-l" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                  {post.category}
                </span>
              </div>

              {/* Title & Excerpt with 3D pop-out */}
              <div className="creative-3d-inner">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-base text-muted-foreground mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="creative-3d-button px-3 py-1.5 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3 text-base font-semibold text-primary group-hover:gap-4 transition-all">
                <span>Read Full Article</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
