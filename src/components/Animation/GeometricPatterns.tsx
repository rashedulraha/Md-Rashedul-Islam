interface GeometricPatternsProps {
  reducedMotion: boolean;
}

export default function GeometricPatterns({
  reducedMotion,
}: GeometricPatternsProps) {
  return (
    <>
      {/* Permanent Diagonal Lines Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.06] pointer-events-none">
        <defs>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="80"
            height="80">
            <path
              d="M0,80 L80,0"
              stroke="hsl(var(--foreground))"
              strokeWidth="0.8"
              opacity="0.3"
            />
            <path
              d="M0,40 L40,0 M40,80 L80,40"
              stroke="hsl(var(--foreground))"
              strokeWidth="0.6"
              opacity="0.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
      </svg>

      {/* Enhanced Geometric Lines - More Visible */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1] dark:opacity-[0.08] pointer-events-none">
        {/* Corner accent lines - Thicker */}
        <path
          d="M0,0 L300,0 L0,300 Z"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M100%,0 L100%-300,0 L100%,300 Z"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M0,100% L300,100% L0,100%-300 Z"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M100%,100% L100%-300,100% L100%,100%-300 Z"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Center geometric pattern - More visible */}
        <g transform="translate(50%, 50%)">
          <circle
            cx="0"
            cy="0"
            r="120"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <circle
            cx="0"
            cy="0"
            r="240"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="0.8"
            opacity="0.2"
          />
          <line
            x1="-150"
            y1="0"
            x2="150"
            y2="0"
            stroke="hsl(var(--foreground))"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <line
            x1="0"
            y1="-150"
            x2="0"
            y2="150"
            stroke="hsl(var(--foreground))"
            strokeWidth="0.8"
            opacity="0.3"
          />
        </g>
      </svg>

      {/* Geometric Shapes - Enhanced Visibility */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12]">
        {/* Hexagons - More visible */}
        <div
          className="absolute top-[10%] left-[15%] w-28 h-28 border-[2.5px] border-primary/40"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: reducedMotion
              ? "none"
              : "rotateShape 40s linear infinite",
          }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-36 h-36 border-[2.5px] border-chart-2/40"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: reducedMotion
              ? "none"
              : "rotateShape 35s linear infinite reverse",
          }}
        />

        {/* Triangles - More visible */}
        <div
          className="absolute top-[60%] left-[5%] w-24 h-24 border-[2.5px] border-chart-4/40"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            animation: reducedMotion
              ? "none"
              : "floatShape 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[30%] right-[20%] w-32 h-32 border-[2.5px] border-primary/40"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            animation: reducedMotion
              ? "none"
              : "floatShape 30s ease-in-out infinite reverse",
            animationDelay: "5s",
          }}
        />

        {/* Circles - More visible */}
        <div
          className="absolute top-[40%] left-[70%] w-20 h-20 border-[2.5px] border-chart-2/40 rounded-full"
          style={{
            animation: reducedMotion ? "none" : "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[40%] left-[30%] w-24 h-24 border-[2.5px] border-chart-4/40 rounded-full"
          style={{
            animation: reducedMotion ? "none" : "pulse 5s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
      </div>
    </>
  );
}
