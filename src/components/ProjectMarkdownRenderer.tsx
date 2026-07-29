"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";
import { Copy, Check, Info, AlertTriangle, Lightbulb, Terminal, Layers } from "lucide-react";

interface ProjectMarkdownRendererProps {
  content: string;
}

// Extract badges from markdown and clean up top stacked shields.io images
function sanitizeMarkdownContent(raw: string) {
  if (!raw) return { cleanedContent: "", extractedBadges: [] };

  const extractedBadges: { label: string; url?: string }[] = [];

  // Match shields.io badge markdown: [![Alt](https://img.shields.io/badge/LABEL-COLOR...)](URL) or ![Alt](https://img.shields.io/badge/...)
  const badgeRegex = /\[?\s*!\[([^\]]*)\]\((https:\/\/img\.shields\.io\/badge\/[^)]+)\)\s*\]?\(?([^)]*)\)?/gi;

  let match;
  while ((match = badgeRegex.exec(raw)) !== null) {
    const rawBadgeUrl = match[2];
    // Extract label from shields.io URL (e.g. NEXT.JS-16.2-blue -> NEXT.JS 16.2)
    const labelMatch = rawBadgeUrl.match(/badge\/([^/?#]+)/);
    if (labelMatch) {
      let label = decodeURIComponent(labelMatch[1])
        .split("-")[0]
        .replace(/_/g, " ")
        .trim();
      const versionMatch = rawBadgeUrl.match(/-([vV]?[0-9\.]+)-/);
      if (versionMatch) {
        label += ` ${versionMatch[1]}`;
      }
      if (label && !extractedBadges.some((b) => b.label.toLowerCase() === label.toLowerCase())) {
        extractedBadges.push({ label, url: match[3] || undefined });
      }
    }
  }

  // Remove lines or top blocks containing mostly shields.io badge links
  const lines = raw.split("\n");
  const cleanedLines = lines.filter((line) => {
    const isBadgeLine = line.includes("img.shields.io") || (line.trim().startsWith("<p") && line.includes("shields.io"));
    return !isBadgeLine;
  });

  let cleanedContent = cleanedLines.join("\n").trim();

  // Clean empty leading lines
  cleanedContent = cleanedContent.replace(/^[\r\n]+/, "");

  return { cleanedContent, extractedBadges };
}

// Custom Code Block component with Copy button & language header
function CodeBlock({ children, className, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1].toUpperCase() : "CODE";

  const getRawText = (node: any): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getRawText).join("");
    if (node?.props?.children) return getRawText(node.props.children);
    return "";
  };

  const rawCode = getRawText(children).trim();

  const handleCopy = () => {
    if (!rawCode) return;
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-zinc-950 shadow-md">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="font-semibold text-zinc-300">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2.5 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 text-sm font-mono text-zinc-100 leading-relaxed">
        <pre className="m-0 bg-transparent p-0">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Custom Callout / Alert Box
function CalloutBlock({ children }: { children: React.ReactNode }) {
  const textStr = React.Children.toArray(children)
    .map((c: any) => (typeof c === "string" ? c : c?.props?.children || ""))
    .join(" ");

  let type: "info" | "warning" | "tip" = "info";
  if (/note|info|important/i.test(textStr)) type = "info";
  if (/warning|caution/i.test(textStr)) type = "warning";
  if (/tip|hint/i.test(textStr)) type = "tip";

  const styles = {
    info: {
      bg: "bg-blue-500/10 dark:bg-blue-950/30",
      border: "border-blue-500/40",
      icon: <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />,
    },
    warning: {
      bg: "bg-amber-500/10 dark:bg-amber-950/30",
      border: "border-amber-500/40",
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
    },
    tip: {
      bg: "bg-emerald-500/10 dark:bg-emerald-950/30",
      border: "border-emerald-500/40",
      icon: <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
    },
  };

  const current = styles[type];

  return (
    <div className={`my-6 flex gap-3.5 rounded-xl border ${current.border} ${current.bg} p-4 text-sm text-foreground`}>
      {current.icon}
      <div className="flex-1 space-y-1 prose-p:my-1">{children}</div>
    </div>
  );
}

export default function ProjectMarkdownRenderer({ content }: ProjectMarkdownRendererProps) {
  if (!content) return null;

  const { cleanedContent, extractedBadges } = sanitizeMarkdownContent(content);

  return (
    <div className="w-full space-y-8">
      {/* Extracted Tech Badges Row */}
      {extractedBadges.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-card border border-border/60 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
            <Layers className="w-3.5 h-3.5 text-primary" />
            Tech Stack:
          </div>
          {extractedBadges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-full bg-secondary/80 border border-border/50 px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}

      {/* Main Rendered Documentation Content */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none w-full
        prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground
        prose-h1:text-3xl prose-h1:border-b prose-h1:border-border/60 prose-h1:pb-3 prose-h1:mb-6
        prose-h2:text-2xl prose-h2:border-b prose-h2:border-border/40 prose-h2:pb-2 prose-h2:mt-10 prose-h2:mb-5 prose-h2:font-medium
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-medium
        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4 prose-p:text-base
        prose-a:text-primary hover:prose-a:underline prose-a:font-medium
        prose-strong:text-foreground prose-strong:font-semibold
        prose-code:text-primary prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
        prose-img:rounded-xl prose-img:border prose-img:border-border/50 prose-img:shadow-md prose-img:my-6
        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-2.5
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6 prose-ol:space-y-4
        prose-li:text-muted-foreground prose-li:leading-relaxed
        prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:text-sm
        prose-th:border prose-th:border-border prose-th:bg-muted/40 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
        prose-td:border prose-td:border-border/60 prose-td:p-3 prose-td:text-muted-foreground
        prose-hr:my-10 prose-hr:border-border/60
      "
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeSlug]}
          components={{
            h2({ children, id, ...props }) {
              const childrenArr = React.Children.toArray(children);
              const textContent = childrenArr.map((c: any) => (typeof c === "string" ? c : c?.props?.children || "")).join("");
              const cleanTitle = textContent.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

              return (
                <h2
                  id={id}
                  className="text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 pb-2 border-b border-border/50 scroll-mt-28"
                  {...props}
                >
                  {cleanTitle || children}
                </h2>
              );
            },
            h3({ children, id, ...props }) {
              const childrenArr = React.Children.toArray(children);
              const textContent = childrenArr.map((c: any) => (typeof c === "string" ? c : c?.props?.children || "")).join("");
              const cleanTitle = textContent.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

              return (
                <h3
                  id={id}
                  className="text-lg font-medium text-foreground mt-7 mb-3 scroll-mt-28"
                  {...props}
                >
                  {cleanTitle || children}
                </h3>
              );
            },
            p({ children, ...props }) {
              return <p className="text-muted-foreground leading-relaxed my-4 text-base" {...props}>{children}</p>;
            },
            li({ children, ...props }) {
              return <li className="text-muted-foreground leading-relaxed my-1.5" {...props}>{children}</li>;
            },
            pre({ children }) {
              const codeElement: any = React.Children.toArray(children)[0];
              if (codeElement && codeElement.type === "code") {
                return <CodeBlock {...codeElement.props} />;
              }
              return <pre className="my-6 overflow-x-auto rounded-xl bg-zinc-950 p-4">{children}</pre>;
            },
            blockquote({ children }) {
              return <CalloutBlock>{children}</CalloutBlock>;
            },
            img({ src, alt }) {
              const srcStr = typeof src === "string" ? src : "";
              if (srcStr && srcStr.includes("shields.io")) return null;
              return (
                <img
                  src={srcStr}
                  alt={alt || "Documentation image"}
                  className="rounded-xl border border-border/50 shadow-md my-6 max-h-[500px] object-cover"
                />
              );
            },
          }}
        >
          {cleanedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

