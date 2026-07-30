"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import { Check, Copy, Terminal, Info, AlertTriangle, Lightbulb } from "lucide-react";

interface BlogMarkdownRendererProps {
  content: string;
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
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="font-normal text-zinc-300">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2.5 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-normal">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-normal">Copy</span>
            </>
          )}
        </button>
      </div>

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

  const currentStyle = styles[type];

  return (
    <div className={`my-6 flex items-start gap-3 rounded-xl border ${currentStyle.border} ${currentStyle.bg} p-4 text-sm leading-relaxed text-foreground/90 font-normal`}>
      {currentStyle.icon}
      <div className="flex-1 space-y-1 font-normal">{children}</div>
    </div>
  );
}

export default function BlogMarkdownRenderer({ content }: BlogMarkdownRendererProps) {
  if (!content) return null;

  return (
    <div className="w-full">
      <div
        className="prose prose-neutral dark:prose-invert max-w-none w-full
        prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground
        prose-h1:text-3xl prose-h1:font-normal prose-h1:border-b prose-h1:border-border/50 prose-h1:pb-3 prose-h1:mb-6
        prose-h2:text-2xl prose-h2:font-normal prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-2 prose-h2:mt-10 prose-h2:mb-5
        prose-h3:text-xl prose-h3:font-normal prose-h3:mt-8 prose-h3:mb-4
        prose-h4:text-lg prose-h4:font-normal prose-h4:mt-6 prose-h4:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4 prose-p:text-base prose-p:font-normal
        prose-a:text-primary hover:prose-a:underline prose-a:font-normal
        prose-strong:text-foreground prose-strong:font-normal
        prose-b:text-foreground prose-b:font-normal
        prose-code:text-primary prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-xs prose-code:before:content-none prose-code:after:content-none prose-code:font-normal
        prose-img:rounded-2xl prose-img:border prose-img:border-border/50 prose-img:shadow-md prose-img:my-8
        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-2.5 prose-ul:font-normal
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6 prose-ol:space-y-4 prose-ol:font-normal
        prose-li:text-muted-foreground prose-li:leading-relaxed prose-li:font-normal
        prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:text-sm prose-table:font-normal
        prose-th:border prose-th:border-border prose-th:bg-muted/40 prose-th:p-3 prose-th:text-left prose-th:font-normal prose-th:text-foreground
        prose-td:border prose-td:border-border/60 prose-td:p-3 prose-td:text-muted-foreground prose-td:font-normal
        prose-hr:my-10 prose-hr:border-border/60
      "
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeSlug]}
          components={{
            h1({ children, id, ...props }) {
              return (
                <h1
                  id={id}
                  className="text-3xl font-normal tracking-tight text-foreground mt-10 mb-6 pb-3 border-b border-border/50 scroll-mt-28"
                  {...props}
                >
                  {children}
                </h1>
              );
            },
            h2({ children, id, ...props }) {
              return (
                <h2
                  id={id}
                  className="text-2xl font-normal tracking-tight text-foreground mt-10 mb-4 pb-2 border-b border-border/30 scroll-mt-28"
                  {...props}
                >
                  {children}
                </h2>
              );
            },
            h3({ children, id, ...props }) {
              return (
                <h3
                  id={id}
                  className="text-xl font-normal text-foreground mt-8 mb-3 scroll-mt-28"
                  {...props}
                >
                  {children}
                </h3>
              );
            },
            h4({ children, id, ...props }) {
              return (
                <h4
                  id={id}
                  className="text-lg font-normal text-foreground mt-6 mb-3 scroll-mt-28"
                  {...props}
                >
                  {children}
                </h4>
              );
            },
            strong({ children, ...props }) {
              return (
                <strong className="font-normal text-foreground" {...props}>
                  {children}
                </strong>
              );
            },
            b({ children, ...props }) {
              return (
                <b className="font-normal text-foreground" {...props}>
                  {children}
                </b>
              );
            },
            p({ children, ...props }) {
              return (
                <p className="text-muted-foreground leading-relaxed my-4 text-base font-normal" {...props}>
                  {children}
                </p>
              );
            },
            li({ children, ...props }) {
              return (
                <li className="text-muted-foreground leading-relaxed my-1.5 font-normal" {...props}>
                  {children}
                </li>
              );
            },
            pre({ children }) {
              const codeElement: any = React.Children.toArray(children)[0];
              if (codeElement && codeElement.type === "code") {
                return <CodeBlock {...codeElement.props} />;
              }
              return <pre className="my-6 overflow-x-auto rounded-xl bg-zinc-950 p-4 font-normal">{children}</pre>;
            },
            blockquote({ children }) {
              return <CalloutBlock>{children}</CalloutBlock>;
            },
            img({ src, alt }) {
              const srcStr = typeof src === "string" ? src : "";
              return (
                <img
                  src={srcStr}
                  alt={alt || "Blog image"}
                  className="rounded-2xl border border-border/50 shadow-md my-8 max-h-[550px] w-full object-cover"
                />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
