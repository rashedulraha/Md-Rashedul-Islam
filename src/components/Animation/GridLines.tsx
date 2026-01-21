export default function GridLines() {
  return (
    <>
      {/* Enhanced Permanent Grid Lines - More Visible */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.12] pointer-events-none">
        {/* Horizontal lines - More visible */}
        {[...Array(16)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-[0.5px] bg-foreground/25 dark:bg-foreground/20"
            style={{
              top: `${(i + 1) * 6.25}%`,
            }}
          />
        ))}

        {/* Vertical lines - More visible */}
        {[...Array(16)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-[0.5px] bg-foreground/25 dark:bg-foreground/20"
            style={{
              left: `${(i + 1) * 6.25}%`,
            }}
          />
        ))}

        {/* Thicker center lines for better visibility */}
        <div className="absolute left-1/2 top-0 h-full w-[0.75px] bg-foreground/30 dark:bg-foreground/25 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-[0.75px] bg-foreground/30 dark:bg-foreground/25 -translate-y-1/2" />
      </div>

      {/* Dot Grid Pattern - Enhanced Visibility */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground) / 0.25) 1.5px, transparent 1.5px)`,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0",
        }}
      />
    </>
  );
}
