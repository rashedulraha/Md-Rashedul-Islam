import React, { useEffect, useRef } from "react";

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const binaryStreamsRef = useRef<
    Array<{
      x: number;
      speed: number;
      chars: string[];
      charHeight: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Custom Color Palette defined using your OKLCH theme

    // Initialize binary streams for the background effect
    const initBinaryStreams = () => {
      binaryStreamsRef.current = [];
      const columns = Math.floor(canvas.width / 40);

      for (let i = 0; i < columns; i++) {
        const charCount = 10 + Math.floor(Math.random() * 20);
        const chars = [];

        for (let j = 0; j < charCount; j++) {
          chars.push(Math.random() > 0.5 ? "0" : "1");
        }

        binaryStreamsRef.current.push({
          x: i * 40 + 20,
          speed: 0.3 + Math.random() * 0.5,
          chars: chars,
          charHeight: 20,
          opacity: 0.1 + Math.random() * 0.2,
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBinaryStreams();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame: number;
    lastTimeRef.current = Date.now();

    // Render static and waving grid lines
    const drawGrid = () => {
      const gridSize = 40;
      const lineWidth = 0.3;

      // Using your --border color from dark theme
      ctx.strokeStyle = "oklch(1 0 0 / 10%)";
      ctx.lineWidth = lineWidth;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        const wave = Math.sin(timeRef.current * 0.1 + x * 0.0005) * 1;
        ctx.beginPath();
        ctx.moveTo(x + wave, 0);
        ctx.lineTo(x + wave, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        const wave = Math.cos(timeRef.current * 0.1 + y * 0.0005) * 1;
        ctx.beginPath();
        ctx.moveTo(0, y + wave);
        ctx.lineTo(canvas.width, y + wave);
        ctx.stroke();
      }
    };

    // Render scrolling binary rain strings
    const drawBinaryRain = () => {
      const now = Date.now();
      lastTimeRef.current = now;

      ctx.font = "14px 'Courier New', monospace";
      ctx.textAlign = "center";

      binaryStreamsRef.current.forEach((stream, index) => {
        const currentY = (timeRef.current * 10 * stream.speed) % canvas.height;

        stream.chars.forEach((char, charIndex) => {
          const y =
            (currentY - charIndex * stream.charHeight + canvas.height) %
            canvas.height;

          let opacity = stream.opacity;
          const positionInStream = charIndex / stream.chars.length;

          if (positionInStream < 0.2) {
            opacity *= positionInStream * 5;
          } else if (positionInStream > 0.8) {
            opacity *= (1 - positionInStream) * 5;
          }

          // Using primary and secondary color palette
          if (char === "1") {
            // --primary from dark theme
            ctx.fillStyle = `oklch(0.922 0 0 / ${opacity * 0.7})`;
          } else {
            // --secondary from dark theme
            ctx.fillStyle = `oklch(0.269 0 0 / ${opacity * 0.5})`;
          }

          ctx.fillText(char, stream.x, y);

          // Random sparkle/glow effect
          if (Math.random() > 0.97) {
            const glowRadius = 8 + Math.sin(timeRef.current * 2 + index) * 4;
            const gradient = ctx.createRadialGradient(
              stream.x,
              y - 5,
              0,
              stream.x,
              y - 5,
              glowRadius,
            );

            // Using accent colors
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

    // Draw background organic shapes
    const drawCurvedShape = (side: "left" | "right", offsetY: number) => {
      const width = canvas.width;
      const height = canvas.height;
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

      // Using muted theme colors
      gradient.addColorStop(0, "oklch(0.269 0 0 / 0.25)"); // --muted dark
      gradient.addColorStop(0.5, "oklch(0.205 0 0 / 0.15)"); // --card dark
      gradient.addColorStop(1, "oklch(0.145 0 0 / 0)"); // --background dark

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Radial center glow effect
    const drawCenterGlow = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;
      const pulse = 0.9 + Math.sin(timeRef.current * 0.8) * 0.1;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        250 * pulse,
      );

      gradient.addColorStop(0, "oklch(0.488 0.243 264.376 / 0.15)"); // --chart-1 dark
      gradient.addColorStop(0.4, "oklch(0.371 0 0 / 0.08)"); // --accent dark
      gradient.addColorStop(0.7, "oklch(0.269 0 0 / 0.03)"); // --muted dark
      gradient.addColorStop(1, "oklch(0.145 0 0 / 0)"); // --background dark

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Perspective circular grid
    const drawPerspectiveGrid = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;
      const gridLines = 16;
      const gridSpacing = 30;

      // Using ring color
      ctx.strokeStyle = "oklch(0.556 0 0 / 0.05)"; // --ring dark theme
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

    // Random floating digits
    const drawFloatingNumbers = () => {
      const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;

      ctx.font = "16px 'Courier New', monospace";
      ctx.textAlign = "center";

      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + timeRef.current * 0.05;
        const distance = 80 + Math.sin(timeRef.current * 0.2 + i) * 30;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const number = numbers[i % numbers.length];
        const opacity = 0.1 + Math.sin(timeRef.current * 0.5 + i) * 0.05;

        const chartColors = [
          "oklch(0.488 0.243 264.376)", // chart-1
          "oklch(0.696 0.17 162.48)", // chart-2
          "oklch(0.769 0.188 70.08)", // chart-3
          "oklch(0.627 0.265 303.9)", // chart-4
          "oklch(0.645 0.246 16.439)", // chart-5
        ];

        ctx.fillStyle = `${chartColors[i % chartColors.length]} / ${opacity})`;
        ctx.fillText(number, x, y);
      }
    };

    // Vertical data stream segments
    const drawDataStreams = () => {
      const streamCount = 6;
      const streamWidth = canvas.width / streamCount;

      for (let i = 0; i < streamCount; i++) {
        const x = i * streamWidth + streamWidth / 2;
        const speed = 1 + i * 0.2;
        const segmentHeight = 25;

        for (let j = 0; j < 15; j++) {
          const y =
            (timeRef.current * speed * 20 + j * segmentHeight * 3) %
            canvas.height;
          const opacity = 0.03 + Math.sin(timeRef.current * 0.5 + i) * 0.02;

          const gradient = ctx.createLinearGradient(x, y, x, y + segmentHeight);
          gradient.addColorStop(0, `oklch(0.922 0 0 / ${opacity})`);
          gradient.addColorStop(1, `oklch(0.922 0 0 / 0)`);

          ctx.fillStyle = gradient;
          ctx.fillRect(x - 1, y, 2, segmentHeight);
        }
      }
    };

    const animate = () => {
      timeRef.current += 0.005;

      // Fill background with custom OKLCH gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "oklch(0.08 0 0)");
      gradient.addColorStop(0.5, "oklch(0.05 0 0)");
      gradient.addColorStop(1, "oklch(0.03 0 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animation Loop
      drawGrid();
      drawPerspectiveGrid();
      drawCurvedShape("left", 0);
      drawCurvedShape("right", Math.PI);
      drawCenterGlow();
      drawDataStreams();
      drawFloatingNumbers();
      drawBinaryRain();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Visual Overlay layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent opacity-20" />

        {/* Radial center focus */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/30 opacity-30" />

        {/* Low-opacity CRT scan lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(0deg,transparent_99%,oklch(0.627_0.265_303.9/0.03)_100%)] bg-size-[100%_3px]" />
        </div>

        {/* Subtle ambient lighting blend */}
        <div className="absolute inset-0 bg-linear-to-br from-oklch(0.488_0.243_264.376/0.05) via-transparent to-oklch(0.696_0.17_162.48/0.05) mix-blend-overlay" />
      </div>
    </div>
  );
};

export default AnimatedGridBackground;
