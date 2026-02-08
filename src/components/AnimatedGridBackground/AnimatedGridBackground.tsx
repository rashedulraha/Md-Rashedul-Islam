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

    // Initialize binary streams
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
          speed: 0.3 + Math.random() * 0.5, // Slower speed
          chars: chars,
          charHeight: 20,
          opacity: 0.1 + Math.random() * 0.2,
        });
      }
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBinaryStreams();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame: number;
    lastTimeRef.current = Date.now();

    // Your original grid with slower animation
    const drawGrid = () => {
      const gridSize = 40;
      const lineWidth = 0.3;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = lineWidth;

      // Vertical lines with very subtle wave
      for (let x = 0; x < canvas.width; x += gridSize) {
        const wave = Math.sin(timeRef.current * 0.1 + x * 0.0005) * 1; // Slower
        ctx.beginPath();
        ctx.moveTo(x + wave, 0);
        ctx.lineTo(x + wave, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        const wave = Math.cos(timeRef.current * 0.1 + y * 0.0005) * 1; // Slower
        ctx.beginPath();
        ctx.moveTo(0, y + wave);
        ctx.lineTo(canvas.width, y + wave);
        ctx.stroke();
      }
    };

    // SLOW binary code rain
    const drawBinaryRain = () => {
      const now = Date.now();
      lastTimeRef.current = now;

      ctx.font = "14px 'Courier New', monospace";
      ctx.textAlign = "center";

      binaryStreamsRef.current.forEach((stream, index) => {
        // Very slow movement
        const currentY = (timeRef.current * 10 * stream.speed) % canvas.height;

        stream.chars.forEach((char, charIndex) => {
          const y =
            (currentY - charIndex * stream.charHeight + canvas.height) %
            canvas.height;

          // Calculate opacity based on position
          let opacity = stream.opacity;
          const positionInStream = charIndex / stream.chars.length;

          if (positionInStream < 0.2) {
            opacity *= positionInStream * 5;
          } else if (positionInStream > 0.8) {
            opacity *= (1 - positionInStream) * 5;
          }

          // Alternate colors for visual interest
          if (char === "1") {
            ctx.fillStyle = `rgba(0, 255, 180, ${opacity * 0.7})`; // Cyan-green
          } else {
            ctx.fillStyle = `rgba(0, 200, 255, ${opacity * 0.5})`; // Blue
          }

          // Draw character
          ctx.fillText(char, stream.x, y);

          // Optional: Draw glow effect
          if (Math.random() > 0.97) {
            // Rare glow
            const glowRadius = 8 + Math.sin(timeRef.current * 2 + index) * 4;
            const gradient = ctx.createRadialGradient(
              stream.x,
              y - 5,
              0,
              stream.x,
              y - 5,
              glowRadius,
            );
            gradient.addColorStop(0, `rgba(0, 255, 200, ${opacity * 0.3})`);
            gradient.addColorStop(1, `rgba(0, 255, 200, 0)`);

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

    // Gentle curved shapes with slow animation
    const drawCurvedShape = (side: "left" | "right", offsetY: number) => {
      const width = canvas.width;
      const height = canvas.height;
      const curveWidth = width * 0.35;

      ctx.beginPath();

      if (side === "left") {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);

        // Slow animation
        const cp1x =
          curveWidth * 0.3 + Math.sin(timeRef.current * 0.4 + offsetY) * 30; // Slower
        const cp1y =
          height * 0.3 + Math.cos(timeRef.current * 0.3 + offsetY) * 60; // Slower
        const cp2x =
          curveWidth * 0.5 + Math.cos(timeRef.current * 0.4 + offsetY) * 40; // Slower
        const cp2y =
          height * 0.7 + Math.sin(timeRef.current * 0.3 + offsetY) * 50; // Slower

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

      gradient.addColorStop(0, "rgba(70, 70, 90, 0.25)");
      gradient.addColorStop(0.5, "rgba(50, 50, 70, 0.15)");
      gradient.addColorStop(1, "rgba(30, 30, 50, 0)");

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Soft center glow with gentle pulse
    const drawCenterGlow = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;

      // Very slow pulse
      const pulse = 0.9 + Math.sin(timeRef.current * 0.8) * 0.1;

      // Main glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        250 * pulse,
      );
      gradient.addColorStop(0, "rgba(90, 90, 110, 0.15)");
      gradient.addColorStop(0.4, "rgba(70, 70, 90, 0.08)");
      gradient.addColorStop(0.7, "rgba(50, 50, 70, 0.03)");
      gradient.addColorStop(1, "rgba(30, 30, 50, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Gentle perspective grid
    const drawPerspectiveGrid = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;
      const gridLines = 16; // Reduced for subtlety
      const gridSpacing = 30;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 0.5;

      // Perspective lines with slow rotation
      for (let i = 0; i < gridLines; i++) {
        const angle = (Math.PI * 2 * i) / gridLines + timeRef.current * 0.02; // Very slow
        const distance = 400;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance,
        );
        ctx.stroke();
      }

      // Subtle concentric circles
      for (let i = 1; i <= 12; i++) {
        const radius =
          i * gridSpacing * (0.95 + Math.sin(timeRef.current * 0.3 + i) * 0.05);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    // Floating numbers (gentle)
    const drawFloatingNumbers = () => {
      const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;

      ctx.font = "16px 'Courier New', monospace";
      ctx.textAlign = "center";

      // Draw numbers in circular pattern
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + timeRef.current * 0.05; // Slow
        const distance = 80 + Math.sin(timeRef.current * 0.2 + i) * 30;

        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        const number = numbers[i % numbers.length];
        const opacity = 0.1 + Math.sin(timeRef.current * 0.5 + i) * 0.05;

        ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`;
        ctx.fillText(number, x, y);
      }
    };

    // Data streams (slow and gentle)
    const drawDataStreams = () => {
      const streamCount = 6;
      const streamWidth = canvas.width / streamCount;

      for (let i = 0; i < streamCount; i++) {
        const x = i * streamWidth + streamWidth / 2;
        const speed = 1 + i * 0.2; // Slower
        const segmentHeight = 25;

        for (let j = 0; j < 15; j++) {
          const y =
            (timeRef.current * speed * 20 + j * segmentHeight * 3) %
            canvas.height;
          const opacity = 0.03 + Math.sin(timeRef.current * 0.5 + i) * 0.02;

          const gradient = ctx.createLinearGradient(x, y, x, y + segmentHeight);
          gradient.addColorStop(0, `rgba(80, 180, 220, ${opacity})`);
          gradient.addColorStop(1, `rgba(80, 180, 220, 0)`);

          ctx.fillStyle = gradient;
          ctx.fillRect(x - 1, y, 2, segmentHeight);
        }
      }
    };

    const animate = () => {
      // Increment time slowly
      timeRef.current += 0.005; // Reduced from 0.01

      // Clear with dark gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#080810");
      gradient.addColorStop(0.5, "#050510");
      gradient.addColorStop(1, "#030308");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw all effects (order matters for layering)
      drawGrid();
      drawPerspectiveGrid();
      drawCurvedShape("left", 0);
      drawCurvedShape("right", Math.PI);
      drawCenterGlow();
      drawDataStreams();
      drawFloatingNumbers();
      drawBinaryRain(); // Draw binary last for top layer

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
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Subtle overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-20" />
        {/* Center focus */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 opacity-30" />
        {/* Very subtle scan lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(0deg,transparent_99%,rgba(0,255,200,0.03)_100%)] bg-[length:100%_3px]" />
        </div>
        {/* Ambient color */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5 mix-blend-overlay" />
      </div>
    </div>
  );
};

export default AnimatedGridBackground;
