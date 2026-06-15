"use client";

import { motion } from "framer-motion";
import { JSX } from "react";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  // Simple markdown-like rendering (for production, use react-markdown or MDX)
  const renderContent = () => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = "";

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={index}
              className="my-6 p-6 rounded-2xl bg-muted/50 border border-border/50 overflow-x-auto">
              <code className="text-sm font-mono text-foreground">
                {codeContent}
              </code>
            </pre>,
          );
          codeContent = "";
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        return;
      }

      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={index}
            className="text-3xl font-bold text-foreground mt-8 mb-4">
            {line.substring(2)}
          </h1>,
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className="text-2xl font-bold text-foreground mt-8 mb-4">
            {line.substring(3)}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="text-xl font-bold text-foreground mt-6 mb-3">
            {line.substring(4)}
          </h3>,
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="ml-6 text-muted-foreground mb-2 list-disc">
            {line.substring(2)}
          </li>,
        );
      } else if (line.trim() === "") {
        elements.push(<div key={index} className="h-4" />);
      } else {
        elements.push(
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {line}
          </p>,
        );
      }
    });

    return elements;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="prose prose-lg max-w-none">
      {renderContent()}
    </motion.div>
  );
}
