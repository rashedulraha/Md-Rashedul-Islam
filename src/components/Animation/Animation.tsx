import {
  Code2,
  Braces,
  Terminal,
  Workflow,
  Database,
  Layers,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import type {
  CodeSymbol,
  MousePosition,
  TechItem,
} from "@/Routes/Types/AnimationComponentTypes";
import { AnimationComponentTypes } from "@/Data/AnimationComponentData/AnimationComponentData";

// --- Component ---
const Animation: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for user's motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  //! Tech stack items with react-icons
  const techItems: TechItem[] = AnimationComponentTypes;

  // Code symbols with lucide icons
  const codeSymbols: CodeSymbol[] = [
    { Icon: Code2, delay: 0, duration: 20 },
    { Icon: Braces, delay: 2, duration: 22 },
    { Icon: Terminal, delay: 4, duration: 24 },
    { Icon: Workflow, delay: 6, duration: 21 },
    { Icon: Database, delay: 8, duration: 23 },
    { Icon: Layers, delay: 10, duration: 25 },
  ];

  // Calculate distance from mouse to element
  const calculateDistance = useCallback(
    (elementX: number, elementY: number): number => {
      const dx = mousePosition.x - elementX;
      const dy = mousePosition.y - elementY;
      return Math.sqrt(dx * dx + dy * dy);
    },
    [mousePosition]
  );

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden ${
        reducedMotion ? "animation-reduced-motion" : ""
      }`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background/95 to-background" />

      {/* Square Grid Pattern - House-like structure */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "-1px -1px",
          opacity: "0.08",
        }}
      />

      {/* Additional subtle grid overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
          backgroundPosition: "-1px -1px",
          opacity: "0.05",
        }}
      />

      {/* Animated gradient overlay that follows mouse */}
      <div
        className="absolute opacity-[0.02] dark:opacity-[0.03] w-96 h-96 rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transition: reducedMotion
            ? "none"
            : "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] opacity-50 -translate-x-[30%] -translate-y-[30%]"
        style={{
          animation: reducedMotion
            ? "none"
            : "floatSlow 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] opacity-50 translate-x-[30%] translate-y-[30%]"
        style={{
          animation: reducedMotion
            ? "none"
            : "floatSlow 25s ease-in-out infinite reverse",
          animationDelay: "5s",
        }}
      />

      {/* Interactive Floating Tech Stack Items */}
      <div className="absolute inset-0">
        {techItems.map((item, index) => {
          const IconComponent = item.Icon;
          const positionX = (index * 11 + 8) % 85;
          const positionY = (index * 13 + 10) % 70;
          const elementX = (positionX * window.innerWidth) / 100;
          const elementY = (positionY * window.innerHeight) / 100;
          const distance = calculateDistance(elementX, elementY);
          const isNearMouse = distance < 150;
          const hoverScale = isHovered === index ? 1.2 : isNearMouse ? 1.1 : 1;
          const opacity = isHovered === index ? 0.4 : isNearMouse ? 0.2 : 0.08;

          return (
            <div
              key={item.text}
              className="absolute transition-all duration-300 ease-out"
              style={{
                left: `${positionX}%`,
                top: `${positionY}%`,
                transform: `scale(${hoverScale})`,
                opacity: reducedMotion ? 0.1 : opacity,
                animation: reducedMotion
                  ? "none"
                  : `floatTech ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
                pointerEvents: "auto",
              }}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}>
              <div className="flex items-center gap-2 backdrop-blur-sm p-2 rounded-lg bg-background/10 border border-border/20">
                <IconComponent className={`w-6 h-6 ${item.color}`} />
                <div className="flex flex-col">
                  <span className="text-foreground/40 font-mono text-sm font-semibold tracking-wide">
                    {item.text}
                  </span>
                  {isHovered === index && (
                    <span className="text-foreground/30 font-mono text-xs">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Symbols with Lucide Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSymbols.map((item, index) => {
          const IconComponent = item.Icon;
          return (
            <div
              key={index}
              className="absolute opacity-[0.04] dark:opacity-[0.06]"
              style={{
                left: `${(index * 15 + 5) % 90}%`,
                top: `${(index * 17 + 20) % 75}%`,
                animation: reducedMotion
                  ? "none"
                  : `floatSymbol ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
              }}>
              <IconComponent className="w-5 h-5 text-foreground" />
            </div>
          );
        })}
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scan line effect */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div
          className="h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent"
          style={{
            animation: reducedMotion ? "none" : "scan 8s linear infinite",
          }}
        />
      </div>

      {/* Corner vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background opacity-30" />
        <div className="absolute inset-0 bg-linear-to-l from-background via-transparent to-background opacity-30" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-background opacity-30" />
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(10px) rotate(-1deg);
          }
        }

        @keyframes floatTech {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) translateX(5px) rotate(1deg);
          }
          50% {
            transform: translateY(5px) translateX(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-5px) translateX(10px) rotate(0.5deg);
          }
        }

        @keyframes floatSymbol {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.04;
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
            opacity: 0.08;
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .animation-reduced-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `}</style>
    </div>
  );
};

export default Animation;
