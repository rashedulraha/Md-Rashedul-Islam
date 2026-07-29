"use client";

import React, { useEffect, useState } from "react";
import GithubSlugger from "github-slugger";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function cleanHeadingText(rawText: string): string {
  return rawText
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(
      /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu,
      ""
    )
    .replace(/^[^a-zA-Z0-9\s\(\)]+/, "")
    .trim();
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!content) return;
    
    // Parse the markdown string to extract headings
    const slugger = new GithubSlugger();
    const headingLines = content.split("\n").filter((line) => line.match(/^(#{2,3})\s+(.+)/));
    
    const parsedHeadings = headingLines.map((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)/);
      if (!match) return null;
      
      const level = match[1].length;
      const rawText = match[2].trim();
      const id = slugger.slug(rawText);
      const text = cleanHeadingText(rawText) || rawText;
      
      return { id, text, level };
    }).filter(Boolean) as TocItem[];

    setHeadings(parsedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px", threshold: 0 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-4">
      <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
        On this page
      </h3>
      <ul className="space-y-2 text-sm border-l border-border/40 pl-3">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className="relative"
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              {isActive && (
                <span className="absolute -left-[13px] top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full transition-all" />
              )}
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    setActiveId(heading.id);
                  }
                }}
                className={`block truncate transition-colors py-1 ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={heading.text}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
