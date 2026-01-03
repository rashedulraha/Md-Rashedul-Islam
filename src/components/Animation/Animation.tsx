// Animation.jsx
import {
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiExpress,
  SiGit,
} from "react-icons/si";
import {
  Code2,
  Braces,
  Terminal,
  Workflow,
  Database,
  Layers,
} from "lucide-react";

const Animation = () => {
  // Tech stack items with react-icons
  const techItems = [
    {
      text: "React",
      Icon: SiReact,
      delay: 0,
      duration: 25,
      color: "text-cyan-400",
    },
    {
      text: "Next.js",
      Icon: SiNextdotjs,
      delay: 3,
      duration: 28,
      color: "text-white dark:text-white",
    },
    {
      text: "Vite",
      Icon: SiVite,
      delay: 6,
      duration: 30,
      color: "text-purple-400",
    },
    {
      text: "TypeScript",
      Icon: SiTypescript,
      delay: 9,
      duration: 26,
      color: "text-blue-400",
    },
    {
      text: "Tailwind",
      Icon: SiTailwindcss,
      delay: 12,
      duration: 27,
      color: "text-cyan-300",
    },
    {
      text: "Node.js",
      Icon: SiNodedotjs,
      delay: 15,
      duration: 29,
      color: "text-green-400",
    },
    {
      text: "MongoDB",
      Icon: SiMongodb,
      delay: 18,
      duration: 31,
      color: "text-green-500",
    },
    {
      text: "JavaScript",
      Icon: SiJavascript,
      delay: 21,
      duration: 26,
      color: "text-yellow-400",
    },
    {
      text: "Express",
      Icon: SiExpress,
      delay: 24,
      duration: 27,
      color: "text-gray-400",
    },
    {
      text: "Git",
      Icon: SiGit,
      delay: 27,
      duration: 28,
      color: "text-orange-400",
    },
  ];

  // Code symbols with lucide icons
  const codeSymbols = [
    { Icon: Code2, delay: 0, duration: 20 },
    { Icon: Braces, delay: 2, duration: 22 },
    { Icon: Terminal, delay: 4, duration: 24 },
    { Icon: Workflow, delay: 6, duration: 21 },
    { Icon: Database, delay: 8, duration: 23 },
    { Icon: Layers, delay: 10, duration: 25 },
  ];

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-background via-background/95 to-background" />

        {/* Ultra-subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, hsl(var(--primary)) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, hsl(var(--primary)) 0%, transparent 50%)
            `,
            animation: "floatSlow 20s ease-in-out infinite",
          }}
        />

        {/* Floating orbs */}
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-primary/2 rounded-full blur-[120px] opacity-50 -translate-x-[30%] -translate-y-[30%]"
          style={{
            animation: "floatSlow 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary/2 rounded-full blur-[120px] opacity-50 translate-x-[30%] translate-y-[30%]"
          style={{
            animation: "floatSlow 25s ease-in-out infinite reverse",
            animationDelay: "5s",
          }}
        />

        {/* Floating Tech Stack Items */}
        <div className="absolute inset-0 pointer-events-none">
          {techItems.map((item, index) => {
            const IconComponent = item.Icon;
            return (
              <div
                key={index}
                className="absolute opacity-[0.08] dark:opacity-[0.12] hover:opacity-20 transition-opacity"
                style={{
                  left: `${(index * 11 + 8) % 85}%`,
                  top: `${(index * 13 + 10) % 70}%`,
                  animation: "floatTech ease-in-out infinite",
                  animationDuration: `${item.duration}s`,
                  animationDelay: `${item.delay}s`,
                }}>
                <div className="flex items-center gap-2 backdrop-blur-sm">
                  <IconComponent className={`w-6 h-6 ${item.color}`} />
                  <span className="text-foreground/40 font-mono text-sm font-semibold tracking-wide">
                    {item.text}
                  </span>
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
                  animation: "floatSymbol ease-in-out infinite",
                  animationDuration: `${item.duration}s`,
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
              animation: "scan 8s linear infinite",
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
      </div>

      {/* Inline CSS Animations */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes floatTech {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -25px) rotate(5deg);
          }
          50% {
            transform: translate(-15px, -40px) rotate(-3deg);
          }
          75% {
            transform: translate(-25px, -15px) rotate(4deg);
          }
        }

        @keyframes floatSymbol {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(-15px, 20px) rotate(-10deg) scale(1.1);
          }
          66% {
            transform: translate(10px, -15px) rotate(8deg) scale(0.9);
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

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};

export default Animation;
