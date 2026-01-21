interface BackgroundLayersProps {
  reducedMotion: boolean;
}

export default function BackgroundLayers({
  reducedMotion,
}: BackgroundLayersProps) {
  return (
    <>
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

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
