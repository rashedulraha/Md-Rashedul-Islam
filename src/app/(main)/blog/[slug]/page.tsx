import React from "react";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft, Share2, Tag, User } from "lucide-react";
import { Link } from "@/routing";
import { getBlogBySlug } from "@/services/apiService";
import BlogMarkdownRenderer from "@/components/BlogMarkdownRenderer";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const res = await getBlogBySlug(resolvedParams.slug);
    if (res.data?.success && res.data?.data) {
      const post = res.data.data;
      const title = `${post.title} | Blog | Rashedul Raha`;
      const description =
        post.description ||
        post.content?.slice(0, 160) ||
        "Read articles on software engineering, web performance, and modern tech stack.";
      const imageUrl = post.image || "/images/og-default.jpg";
      const canonicalUrl = `https://rashedulraha.com/blog/${post.slug}`;

      return {
        title,
        description,
        keywords: [
          post.category,
          "Rashedul Raha Blog",
          "Software Engineering",
          "Web Development",
          "Next.js",
          "React",
        ],
        authors: [{ name: "Rashedul Raha", url: "https://rashedulraha.com" }],
        openGraph: {
          title,
          description,
          url: canonicalUrl,
          siteName: "Rashedul Raha Portfolio & Blog",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
          type: "article",
          publishedTime: post.publishedAt || post.createdAt,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [imageUrl],
        },
        alternates: {
          canonical: canonicalUrl,
        },
      };
    }
  } catch (e) {
    // fallback
  }

  return {
    title: "Blog Article | Rashedul Raha",
    description: "Read thoughts and guides on technology, design, and web development.",
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: any = null;
  try {
    const res = await getBlogBySlug(slug);
    if (res.data?.success && res.data?.data) {
      post = res.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
  }

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image || "https://rashedulraha.com/images/og-default.jpg",
    datePublished: post.publishedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: "Rashedul Raha",
      url: "https://rashedulraha.com",
    },
    publisher: {
      "@type": "Person",
      name: "Rashedul Raha",
      url: "https://rashedulraha.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rashedulraha.com/blog/${post.slug}`,
    },
  };

  return (
    <PageWrapper className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* JSON-LD Rich Snippet for Auto SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-8 md:py-12">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-muted/30 transition-all group-hover:bg-accent group-hover:scale-105">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to All Articles
          </Link>
        </div>

        {/* Article Editorial Header */}
        <header className="mb-12 text-left space-y-6 border-b border-border/40 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            {post.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-normal tracking-wide border border-primary/20">
                <Tag className="w-3.5 h-3.5" />
                {post.category}
              </span>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.publishedAt || post.createdAt}>
                {formatDate(post.publishedAt || post.createdAt)}
              </time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>

          <h1 className="font-instrument-serif text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.15] tracking-tight font-normal text-balance">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-3xl">
              {post.description}
            </p>
          )}

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-normal text-sm">
              RR
            </div>
            <div>
              <p className="text-xs font-normal text-foreground">Rashedul Raha</p>
              <p className="text-[11px] font-normal text-muted-foreground">Software Engineer & Writer</p>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        {post.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl mb-12 border border-border/60 bg-muted shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="mb-16">
          {post.content ? (
            <BlogMarkdownRenderer content={post.content} />
          ) : (
            <p className="text-base text-muted-foreground font-normal leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        {/* Footer Article Bio & Navigation */}
        <div className="border-t border-border/50 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-muted/20 p-6 rounded-2xl border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-base font-normal shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-normal text-foreground">Published by Rashedul Raha</h3>
              <p className="text-xs font-normal text-muted-foreground">Building modern web platforms and writing about code & system architecture.</p>
            </div>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-xs font-normal text-foreground hover:bg-accent transition-colors shrink-0"
          >
            Explore More Articles
          </Link>
        </div>
      </article>

      {/* Page Footer */}
      <Footer />
    </PageWrapper>
  );
}
