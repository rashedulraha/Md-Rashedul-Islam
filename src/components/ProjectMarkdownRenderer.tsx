"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";

interface ProjectMarkdownRendererProps {
  content: string;
}

export default function ProjectMarkdownRenderer({
  content,
}: ProjectMarkdownRendererProps) {
  if (!content) return null;

  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none w-full
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
      prose-h1:text-3xl prose-h1:border-b prose-h1:border-border prose-h1:pb-3 prose-h1:mb-6
      prose-h2:text-2xl prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-2 prose-h2:mt-8 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
      prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4
      prose-a:text-indigo-500 hover:prose-a:underline prose-a:font-medium
      prose-strong:text-foreground prose-strong:font-semibold
      prose-code:text-indigo-400 prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm
      prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border/60 prose-pre:rounded-xl prose-pre:p-4 prose-pre:my-6
      prose-img:rounded-xl prose-img:border prose-img:border-border/50 prose-img:shadow-md prose-img:my-6
      prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-2
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-ol:space-y-2
      prose-li:text-muted-foreground
      prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-6
      prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:text-sm
      prose-th:border prose-th:border-border prose-th:bg-muted/40 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
      prose-td:border prose-td:border-border/60 prose-td:p-3 prose-td:text-muted-foreground
      prose-hr:my-8 prose-hr:border-border
    "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
