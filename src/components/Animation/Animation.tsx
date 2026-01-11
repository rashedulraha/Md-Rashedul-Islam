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
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number }>
  >([]);
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

  // Generate particles on mount
  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 15 + 10,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generatedParticles);
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

  // Tech stack items
  const techItems: TechItem[] = AnimationComponentTypes;

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
    [mousePosition]
  );

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden ${
        reducedMotion ? "animation-reduced-motion" : ""
      }`}>
      {/* Base gradient background with mesh effect */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-background/95" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background: `
              radial-gradient(at 0% 0%, hsla(var(--primary) / 0.15) 0px, transparent 50%),
              radial-gradient(at 100% 0%, hsla(var(--chart-2) / 0.1) 0px, transparent 50%),
              radial-gradient(at 100% 100%, hsla(var(--chart-4) / 0.12) 0px, transparent 50%),
              radial-gradient(at 0% 100%, hsla(var(--primary) / 0.08) 0px, transparent 50%)
            `,
            animation: reducedMotion
              ? "none"
              : "meshRotate 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Dot Grid Pattern - Modern & Clean */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground) / 0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Animated gradient overlay that follows mouse */}
      <div
        className="absolute opacity-[0.03] dark:opacity-[0.05] w-125 h-125 rounded-full blur-[150px] transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--chart-2)) 50%, transparent 100%)`,
          left: `${mousePosition.x - 250}px`,
          top: `${mousePosition.y - 250}px`,
        }}
      />

      {/* Floating orbs with gradient */}
      <div
        className="absolute top-0 left-0 w-150 h-150 rounded-full blur-[150px] opacity-20 -translate-x-[30%] -translate-y-[30%]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
          animation: reducedMotion
            ? "none"
            : "floatOrb 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-125 h-125 rounded-full blur-[150px] opacity-15 translate-x-[30%]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--chart-2) / 0.3) 0%, transparent 70%)",
          animation: reducedMotion
            ? "none"
            : "floatOrb 25s ease-in-out infinite reverse",
          animationDelay: "5s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-112.5 h-112.5 rounded-full blur-[150px] opacity-15 translate-y-[30%]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--chart-4) / 0.25) 0%, transparent 70%)",
          animation: reducedMotion
            ? "none"
            : "floatOrb 35s ease-in-out infinite",
          animationDelay: "10s",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/20 dark:bg-primary/10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: reducedMotion
                ? "none"
                : `floatParticle ${particle.speed}s ease-in-out infinite`,
              animationDelay: `${particle.id * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        {/* Hexagons */}
        <div
          className="absolute top-[10%] left-[15%] w-24 h-24 border-2 border-primary/30"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: reducedMotion
              ? "none"
              : "rotateShape 40s linear infinite",
          }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-32 h-32 border-2 border-chart-2/30"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: reducedMotion
              ? "none"
              : "rotateShape 35s linear infinite reverse",
          }}
        />

        {/* Triangles */}
        <div
          className="absolute top-[60%] left-[5%] w-20 h-20 border-2 border-chart-4/30"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            animation: reducedMotion
              ? "none"
              : "floatShape 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[30%] right-[20%] w-28 h-28 border-2 border-primary/30"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            animation: reducedMotion
              ? "none"
              : "floatShape 30s ease-in-out infinite reverse",
            animationDelay: "5s",
          }}
        />

        {/* Circles */}
        <div
          className="absolute top-[40%] left-[70%] w-16 h-16 border-2 border-chart-2/30 rounded-full"
          style={{
            animation: reducedMotion ? "none" : "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[40%] left-[30%] w-20 h-20 border-2 border-chart-4/30 rounded-full"
          style={{
            animation: reducedMotion ? "none" : "pulse 5s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Interactive Floating Tech Stack Items - Enhanced */}
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
                  bg-background/40 border border-border/40 
                  shadow-lg hover:shadow-xl hover:shadow-primary/10
                  transition-all duration-300
                  ${
                    isHovered === index
                      ? "bg-background/60 border-primary/50"
                      : ""
                  }
                `}>
                <div
                  className={`p-1.5 rounded-lg ${item.color} bg-background/50`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground/70 font-mono text-sm font-bold tracking-wide">
                    {item.text}
                  </span>
                  {isHovered === index && (
                    <span className="text-foreground/50 font-mono text-xs mt-0.5 animate-fade-in">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
              {isHovered === index && (
                <div className="absolute inset-0 rounded-xl animate-ping-slow opacity-20 bg-primary/20 -z-10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Code Symbols with Enhanced Styling */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSymbols.map((item, index) => {
          const IconComponent = item.Icon;
          return (
            <div
              key={index}
              className="absolute opacity-[0.06] dark:opacity-[0.08] hover:opacity-[0.12] transition-opacity duration-300"
              style={{
                left: `${(index * 15 + 5) % 90}%`,
                top: `${(index * 17 + 20) % 75}%`,
                animation: reducedMotion
                  ? "none"
                  : `floatSymbol ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
              }}>
              <div className="relative">
                <IconComponent className="w-8 h-8 text-foreground" />
                <div className="absolute inset-0 blur-sm">
                  <IconComponent className="w-8 h-8 text-primary/30" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animated Lines/Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop
              offset="50%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.5"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1={`${(i * 20) % 100}%`}
            y1="0%"
            x2={`${(i * 20 + 50) % 100}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            style={{
              animation: reducedMotion
                ? "none"
                : `drawLine ${15 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </svg>

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scan line effect - Enhanced */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden">
        <div
          className="h-px w-full bg-linear-to-r from-transparent via-primary/40 to-transparent"
          style={{
            animation: reducedMotion ? "none" : "scan 10s linear infinite",
          }}
        />
      </div>

      {/* Corner vignette with gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-background/50 opacity-40" />
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-transparent to-background/50 opacity-40" />
        <div className="absolute inset-0 bg-linear-to-l from-background/60 via-transparent to-background/40 opacity-40" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-background/40 opacity-40" />
      </div>

      {/* Radial gradient overlay for focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, hsl(var(--background) / 0.3) 100%)",
        }}
      />

      {/* Enhanced CSS animations */}
      <style>{`
        @keyframes floatOrb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-30px, -40px) scale(1.05);
          }
          66% {
            transform: translate(20px, 30px) scale(0.95);
          }
        }

        @keyframes floatTech {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) translateX(8px) rotate(2deg);
          }
          50% {
            transform: translateY(8px) translateX(-8px) rotate(-2deg);
          }
          75% {
            transform: translateY(-8px) translateX(15px) rotate(1deg);
          }
        }

        @keyframes floatSymbol {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.06;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.1);
            opacity: 0.12;
          }
        }

        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.7;
          }
        }

        @keyframes rotateShape {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes floatShape {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(10deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200vh);
          }
        }

        @keyframes meshRotate {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes drawLine {
          0%, 100% {
            opacity: 0;
            stroke-dashoffset: 1000;
          }
          50% {
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
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
