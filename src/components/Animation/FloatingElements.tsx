import { useState, useCallback } from "react";
import type { CodeSymbol, MousePosition, TechItem } from "./types";
import {
  Code2,
  Braces,
  Terminal,
  Workflow,
  Database,
  Layers,
  Sparkles,
  Zap,
  Box,
  GitBranch,
} from "lucide-react";

interface FloatingElementsProps {
  reducedMotion: boolean;
  mousePosition: MousePosition;
  techItems: TechItem[];
}

export default function FloatingElements({
  reducedMotion,
  mousePosition,
  techItems,
}: FloatingElementsProps) {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Code symbols with lucide icons
  const codeSymbols: CodeSymbol[] = [
    { Icon: Code2, delay: 0, duration: 20 },
    { Icon: Braces, delay: 2, duration: 22 },
    { Icon: Terminal, delay: 4, duration: 24 },
    { Icon: Workflow, delay: 6, duration: 21 },
    { Icon: Database, delay: 8, duration: 23 },
    { Icon: Layers, delay: 10, duration: 25 },
    { Icon: Sparkles, delay: 3, duration: 19 },
    { Icon: Zap, delay: 7, duration: 26 },
    { Icon: Box, delay: 5, duration: 18 },
    { Icon: GitBranch, delay: 9, duration: 27 },
  ];

  // Calculate distance from mouse to element
  const calculateDistance = useCallback(
    (elementX: number, elementY: number): number => {
      const dx = mousePosition.x - elementX;
      const dy = mousePosition.y - elementY;
      return Math.sqrt(dx * dx + dy * dy);
    },
    [mousePosition],
  );

  return (
    <>
      {/* Interactive Floating Tech Stack Items */}
      <div className="absolute inset-0">
        {techItems.map((item, index) => {
          const IconComponent = item.Icon;
          const positionX = (index * 11 + 8) % 85;
          const positionY = (index * 13 + 10) % 70;
          const elementX = (positionX * window.innerWidth) / 100;
          const elementY = (positionY * window.innerHeight) / 100;
          const distance = calculateDistance(elementX, elementY);
          const isNearMouse = distance < 200;
          const hoverScale = isHovered === index ? 1.3 : isNearMouse ? 1.15 : 1;
          const opacity = isHovered === index ? 0.9 : isNearMouse ? 0.6 : 0.25;

          return (
            <div
              key={item.text}
              className="absolute transition-all duration-500 ease-out cursor-pointer"
              style={{
                left: `${positionX}%`,
                top: `${positionY}%`,
                transform: `scale(${hoverScale})`,
                opacity: reducedMotion ? 0.3 : opacity,
                animation: reducedMotion
                  ? "none"
                  : `floatTech ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
                pointerEvents: "auto",
                zIndex: isHovered === index ? 10 : 1,
              }}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}>
              <div
                className={`
                  flex items-center gap-2.5 backdrop-blur-md p-2.5 rounded-xl 
                  bg-background/50 border border-border/50 
                  shadow-lg hover:shadow-xl hover:shadow-primary/10
                  transition-all duration-300
                  ${
                    isHovered === index
                      ? "bg-background/70 border-primary/60"
                      : ""
                  }
                `}>
                <div
                  className={`p-1.5 rounded-lg ${item.color} bg-background/60`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground/80 font-mono text-sm font-bold tracking-wide">
                    {item.text}
                  </span>
                  {isHovered === index && (
                    <span className="text-foreground/60 font-mono text-xs mt-0.5 animate-fade-in">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
              {isHovered === index && (
                <div className="absolute inset-0 rounded-xl animate-ping-slow opacity-20 bg-primary/30 -z-10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Code Symbols with Enhanced Visibility */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSymbols.map((item, index) => {
          const IconComponent = item.Icon;
          return (
            <div
              key={index}
              className="absolute opacity-[0.12] dark:opacity-[0.15] hover:opacity-[0.2] transition-opacity duration-300"
              style={{
                left: `${(index * 15 + 5) % 90}%`,
                top: `${(index * 17 + 20) % 75}%`,
                animation: reducedMotion
                  ? "none"
                  : `floatSymbol ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
              }}>
              <div className="relative">
                <IconComponent className="w-10 h-10 text-foreground/70" />
                <div className="absolute inset-0 blur-sm">
                  <IconComponent className="w-10 h-10 text-primary/40" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
