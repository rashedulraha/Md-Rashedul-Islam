import type { Particle } from "./types";

interface EffectsProps {
  reducedMotion: boolean;
  particles: Particle[];
}

export default function Effects({ reducedMotion, particles }: EffectsProps) {
  return (
    <>
      {/* Floating orbs with gradient */}
      <div
        className="absolute top-0 left-0 w-150 h-150 rounded-full blur-[150px] opacity-25 -translate-x-[30%] -translate-y-[30%]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
          animation: reducedMotion
            ? "none"
            : "floatOrb 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-125 h-125 rounded-full blur-[150px] opacity-20 translate-x-[30%]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--chart-2) / 0.4) 0%, transparent 70%)",
          animation: reducedMotion
            ? "none"
            : "floatOrb 25s ease-in-out infinite reverse",
          animationDelay: "5s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-112.5 h-112.5 rounded-full blur-[150px] opacity-20 translate-y-[30%]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--chart-4) / 0.35) 0%, transparent 70%)",
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
            className="absolute rounded-full bg-primary/30 dark:bg-primary/20"
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

      {/* Enhanced Scan line effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div
          className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{
            animation: reducedMotion ? "none" : "scan 10s linear infinite",
          }}
        />
      </div>

      {/* Corner vignette with gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/50 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/50 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/70 via-transparent to-background/40 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40 opacity-50" />
      </div>

      {/* Radial gradient overlay for focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, hsl(var(--background) / 0.4) 100%)",
        }}
      />
    </>
  );
}
