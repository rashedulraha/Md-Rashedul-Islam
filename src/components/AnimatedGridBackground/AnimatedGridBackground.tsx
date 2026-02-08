import React, { useEffect, useRef } from "react";

interface ParticleConfig {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface BinaryStream {
  x: number;
  speed: number;
  chars: string[];
  charHeight: number;
  opacity: number;
  offset: number;
}

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const binaryStreamsRef = useRef<BinaryStream[]>([]);
  const particlesRef = useRef<ParticleConfig[]>([]);
  const fpsRef = useRef<number>(60);
  const frameCountRef = useRef<number>(0);

  // Color palette with proper OKLCH syntax
  const colorPalette = {
    border: "oklch(1 0 0 / 0.1)",
    primary: "oklch(0.922 0 0)",
    secondary: "oklch(0.269 0 0)",
    accent: "oklch(0.627 0.265 303.9)",
    muted: "oklch(0.269 0 0)",
    card: "oklch(0.205 0 0)",
    background: "oklch(0.145 0 0)",
    chart1: "oklch(0.488 0.243 264.376)",
    chart2: "oklch(0.696 0.17 162.48)",
    chart3: "oklch(0.769 0.188 70.08)",
    chart4: "oklch(0.627 0.265 303.9)",
    chart5: "oklch(0.645 0.246 16.439)",
    ring: "oklch(0.556 0 0)",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    // Initialize floating particles
    const initParticles = (width: number, height: number) => {
      const particles: ParticleConfig[] = [];
      const chartColors = [
        colorPalette.chart1,
        colorPalette.chart2,
        colorPalette.chart3,
        colorPalette.chart4,
        colorPalette.chart5,
      ];

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 1 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.3,
          color: chartColors[Math.floor(Math.random() * chartColors.length)],
        });
      }
      particlesRef.current = particles;
    };

    // Initialize binary streams
    const initBinaryStreams = (width: number) => {
      binaryStreamsRef.current = [];
      const columns = Math.floor(width / 40);

      for (let i = 0; i < columns; i++) {
        const charCount = 10 + Math.floor(Math.random() * 20);
        const chars: string[] = [];

        for (let j = 0; j < charCount; j++) {
          chars.push(Math.random() > 0.5 ? "0" : "1");
        }

        binaryStreamsRef.current.push({
          x: i * 40 + 20,
          speed: 0.3 + Math.random() * 0.5,
          chars,
          charHeight: 20,
          opacity: 0.1 + Math.random() * 0.2,
          offset: Math.random() * 1000,
        });
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      initBinaryStreams(rect.width);
      initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame: number;
    lastTimeRef.current = performance.now();

    // Grid drawing
    const drawGrid = () => {
      const gridSize = 40;
      const lineWidth = 0.3;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.strokeStyle = colorPalette.border;
      ctx.lineWidth = lineWidth;

      for (let x = 0; x < width; x += gridSize) {
        const wave = Math.sin(timeRef.current * 0.1 + x * 0.0005) * 1;
        ctx.beginPath();
        ctx.moveTo(x + wave, 0);
        ctx.lineTo(x + wave, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        const wave = Math.cos(timeRef.current * 0.1 + y * 0.0005) * 1;
        ctx.beginPath();
        ctx.moveTo(0, y + wave);
        ctx.lineTo(width, y + wave);
        ctx.stroke();
      }
    };

    // Binary rain
    const drawBinaryRain = () => {
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.font = "14px 'Courier New', monospace";
      ctx.textAlign = "center";

      binaryStreamsRef.current.forEach((stream, index) => {
        const currentY =
          (timeRef.current * 10 * stream.speed + stream.offset) % height;

        stream.chars.forEach((char, charIndex) => {
          const y =
            (currentY - charIndex * stream.charHeight + height) % height;

          let opacity = stream.opacity;
          const positionInStream = charIndex / stream.chars.length;

          if (positionInStream < 0.2) {
            opacity *= positionInStream * 5;
          } else if (positionInStream > 0.8) {
            opacity *= (1 - positionInStream) * 5;
          }

          ctx.fillStyle =
            char === "1"
              ? `oklch(0.922 0 0 / ${opacity * 0.7})`
              : `oklch(0.269 0 0 / ${opacity * 0.5})`;

          ctx.fillText(char, stream.x, y);

          if (Math.random() > 0.985) {
            const glowRadius = 8 + Math.sin(timeRef.current * 2 + index) * 4;
            const gradient = ctx.createRadialGradient(
              stream.x,
              y - 5,
              0,
              stream.x,
              y - 5,
              glowRadius,
            );

            gradient.addColorStop(
              0,
              `oklch(0.627 0.265 303.9 / ${opacity * 0.3})`,
            );
            gradient.addColorStop(1, `oklch(0.627 0.265 303.9 / 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(
              stream.x - glowRadius,
              y - 5 - glowRadius,
              glowRadius * 2,
              glowRadius * 2,
            );
          }
        });
      });
    };

    // Floating particles
    const drawParticles = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.fillStyle = `${particle.color} / ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particlesRef.current.forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120 && distance > 0) {
            const lineOpacity = (1 - distance / 120) * 0.15;
            ctx.strokeStyle = `${particle.color} / ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });
    };

    // Curved shapes
    const drawCurvedShape = (side: "left" | "right", offsetY: number) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const curveWidth = width * 0.35;

      ctx.beginPath();
      if (side === "left") {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        const cp1x =
          curveWidth * 0.3 + Math.sin(timeRef.current * 0.4 + offsetY) * 30;
        const cp1y =
          height * 0.3 + Math.cos(timeRef.current * 0.3 + offsetY) * 60;
        const cp2x =
          curveWidth * 0.5 + Math.cos(timeRef.current * 0.4 + offsetY) * 40;
        const cp2y =
          height * 0.7 + Math.sin(timeRef.current * 0.3 + offsetY) * 50;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, curveWidth, height);
        ctx.lineTo(0, height);
      } else {
        ctx.moveTo(width, 0);
        ctx.lineTo(width, height);
        const cp1x =
          width -
          curveWidth * 0.3 -
          Math.sin(timeRef.current * 0.4 + offsetY) * 30;
        const cp1y =
          height * 0.3 + Math.cos(timeRef.current * 0.3 + offsetY) * 60;
        const cp2x =
          width -
          curveWidth * 0.5 -
          Math.cos(timeRef.current * 0.4 + offsetY) * 40;
        const cp2y =
          height * 0.7 + Math.sin(timeRef.current * 0.3 + offsetY) * 50;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width - curveWidth, height);
        ctx.lineTo(width, height);
      }
      ctx.closePath();

      const gradient = ctx.createRadialGradient(
        side === "left" ? 0 : width,
        height / 2,
        0,
        side === "left" ? 0 : width,
        height / 2,
        curveWidth * 1.8,
      );

      gradient.addColorStop(0, "oklch(0.269 0 0 / 0.25)");
      gradient.addColorStop(0.5, "oklch(0.205 0 0 / 0.15)");
      gradient.addColorStop(1, "oklch(0.145 0 0 / 0)");

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Center glow
    const drawCenterGlow = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerX = width / 2;
      const centerY = height * 0.65;
      const pulse = 0.9 + Math.sin(timeRef.current * 0.8) * 0.1;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        250 * pulse,
      );

      gradient.addColorStop(0, "oklch(0.488 0.243 264.376 / 0.15)");
      gradient.addColorStop(0.4, "oklch(0.371 0 0 / 0.08)");
      gradient.addColorStop(0.7, "oklch(0.269 0 0 / 0.03)");
      gradient.addColorStop(1, "oklch(0.145 0 0 / 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    // Perspective grid
    const drawPerspectiveGrid = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerX = width / 2;
      const centerY = height * 0.65;
      const gridLines = 16;
      const gridSpacing = 30;

      ctx.strokeStyle = "oklch(0.556 0 0 / 0.05)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < gridLines; i++) {
        const angle = (Math.PI * 2 * i) / gridLines + timeRef.current * 0.02;
        const distance = 400;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance,
        );
        ctx.stroke();
      }

      for (let i = 1; i <= 12; i++) {
        const radius =
          i * gridSpacing * (0.95 + Math.sin(timeRef.current * 0.3 + i) * 0.05);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    // Floating numbers
    const drawFloatingNumbers = () => {
      const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerX = width / 2;
      const centerY = height * 0.65;

      ctx.font = "16px 'Courier New', monospace";
      ctx.textAlign = "center";

      const chartColors = [
        colorPalette.chart1,
        colorPalette.chart2,
        colorPalette.chart3,
        colorPalette.chart4,
        colorPalette.chart5,
      ];

      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + timeRef.current * 0.05;
        const distance = 80 + Math.sin(timeRef.current * 0.2 + i) * 30;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const number = numbers[i % numbers.length];
        const opacity = 0.1 + Math.sin(timeRef.current * 0.5 + i) * 0.05;

        ctx.fillStyle = `${chartColors[i % chartColors.length]} / ${opacity})`;
        ctx.fillText(number, x, y);
      }
    };

    // Data streams
    const drawDataStreams = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const streamCount = 6;
      const streamWidth = width / streamCount;

      for (let i = 0; i < streamCount; i++) {
        const x = i * streamWidth + streamWidth / 2;
        const speed = 1 + i * 0.2;
        const segmentHeight = 25;

        for (let j = 0; j < 15; j++) {
          const y =
            (timeRef.current * speed * 20 + j * segmentHeight * 3) % height;
          const opacity = 0.03 + Math.sin(timeRef.current * 0.5 + i) * 0.02;

          const gradient = ctx.createLinearGradient(x, y, x, y + segmentHeight);
          gradient.addColorStop(0, `oklch(0.922 0 0 / ${opacity})`);
          gradient.addColorStop(1, `oklch(0.922 0 0 / 0)`);

          ctx.fillStyle = gradient;
          ctx.fillRect(x - 1, y, 2, segmentHeight);
        }
      }
    };

    // FPS update
    const updateFPS = () => {
      frameCountRef.current++;
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        fpsRef.current = Math.round((frameCountRef.current * 1000) / elapsed);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
    };

    // Main animation loop
    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      timeRef.current += 0.005;

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "oklch(0.08 0 0)");
      gradient.addColorStop(0.5, "oklch(0.05 0 0)");
      gradient.addColorStop(1, "oklch(0.03 0 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      drawGrid();
      drawPerspectiveGrid();
      drawCurvedShape("left", 0);
      drawCurvedShape("right", Math.PI);
      drawCenterGlow();
      drawDataStreams();
      drawParticles();
      drawFloatingNumbers();
      drawBinaryRain();

      updateFPS();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [
    colorPalette.border,
    colorPalette.chart1,
    colorPalette.chart2,
    colorPalette.chart3,
    colorPalette.chart4,
    colorPalette.chart5,
  ]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent opacity-20" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,oklch(0.145_0_0/0.3)_100%)] opacity-30" />

        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(0deg, transparent 99%, oklch(0.627 0.265 303.9 / 0.03) 100%)`,
              backgroundSize: "100% 3px",
            }}
          />
        </div>

        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            background: `linear-gradient(135deg, oklch(0.488 0.243 264.376 / 0.05) 0%, transparent 50%, oklch(0.696 0.17 162.48 / 0.05) 100%)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedGridBackground;
