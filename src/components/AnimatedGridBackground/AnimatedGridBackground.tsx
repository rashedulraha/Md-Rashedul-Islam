import React, { useEffect, useRef } from "react";

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracking for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;

    // Your original grid function (improved)
    const drawGrid = () => {
      const gridSize = 40;
      const lineWidth = 0.3;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = lineWidth;

      // Vertical lines with subtle wave
      for (let x = 0; x < canvas.width; x += gridSize) {
        const wave = Math.sin(timeRef.current * 0.5 + x * 0.001) * 2;
        ctx.beginPath();
        ctx.moveTo(x + wave, 0);
        ctx.lineTo(x + wave, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines with subtle wave
      for (let y = 0; y < canvas.height; y += gridSize) {
        const wave = Math.cos(timeRef.current * 0.5 + y * 0.001) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + wave);
        ctx.lineTo(canvas.width, y + wave);
        ctx.stroke();
      }

      // Diagonal lines for extra depth
      ctx.strokeStyle = "rgba(255, 255, 255, 0.01)";
      const diagonalSpacing = 80;
      for (let i = -canvas.height; i < canvas.width; i += diagonalSpacing) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();
      }
    };

    // Your original curved shapes (enhanced)
    const drawCurvedShape = (side: "left" | "right", offsetY: number) => {
      const width = canvas.width;
      const height = canvas.height;
      const curveWidth = width * 0.35;

      ctx.beginPath();

      if (side === "left") {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);

        // Enhanced animation with multiple waves
        const cp1x =
          curveWidth * 0.3 +
          Math.sin(timeRef.current * 0.8 + offsetY) * 50 +
          Math.cos(timeRef.current * 0.3) * 20;
        const cp1y =
          height * 0.3 +
          Math.cos(timeRef.current * 0.5 + offsetY) * 100 +
          Math.sin(timeRef.current * 0.4) * 30;
        const cp2x =
          curveWidth * 0.5 +
          Math.cos(timeRef.current * 0.6 + offsetY) * 60 -
          Math.sin(timeRef.current * 0.2) * 25;
        const cp2y =
          height * 0.7 +
          Math.sin(timeRef.current * 0.7 + offsetY) * 80 +
          Math.cos(timeRef.current * 0.5) * 40;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, curveWidth, height);
        ctx.lineTo(0, height);
      } else {
        ctx.moveTo(width, 0);
        ctx.lineTo(width, height);

        const cp1x =
          width -
          curveWidth * 0.3 -
          Math.sin(timeRef.current * 0.8 + offsetY) * 50 -
          Math.cos(timeRef.current * 0.3) * 20;
        const cp1y =
          height * 0.3 +
          Math.cos(timeRef.current * 0.5 + offsetY) * 100 +
          Math.sin(timeRef.current * 0.4) * 30;
        const cp2x =
          width -
          curveWidth * 0.5 -
          Math.cos(timeRef.current * 0.6 + offsetY) * 60 +
          Math.sin(timeRef.current * 0.2) * 25;
        const cp2y =
          height * 0.7 +
          Math.sin(timeRef.current * 0.7 + offsetY) * 80 +
          Math.cos(timeRef.current * 0.5) * 40;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width - curveWidth, height);
        ctx.lineTo(width, height);
      }

      ctx.closePath();

      // Enhanced gradient with mouse interaction
      const gradient = ctx.createRadialGradient(
        side === "left" ? 0 : width,
        mouseRef.current.y,
        0,
        side === "left" ? 0 : width,
        height / 2,
        curveWidth * 2,
      );

      gradient.addColorStop(
        0,
        `rgba(80, 80, 80, ${0.3 + Math.sin(timeRef.current) * 0.1})`,
      );
      gradient.addColorStop(0.4, "rgba(60, 60, 60, 0.25)");
      gradient.addColorStop(0.7, "rgba(40, 40, 40, 0.15)");
      gradient.addColorStop(1, "rgba(20, 20, 20, 0)");

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Your original center glow (enhanced with particles)
    const drawCenterGlow = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;
      const radius = 300;

      // Interactive glow based on mouse position
      const mouseDistance = Math.sqrt(
        Math.pow(mouseRef.current.x - centerX, 2) +
          Math.pow(mouseRef.current.y - centerY, 2),
      );
      const mouseEffect = Math.max(0, 1 - mouseDistance / 500);

      // Main glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius * (1 + mouseEffect * 0.5),
      );

      gradient.addColorStop(
        0,
        `rgba(120, 120, 120, ${0.25 + mouseEffect * 0.1})`,
      );
      gradient.addColorStop(
        0.3,
        `rgba(90, 90, 90, ${0.15 + mouseEffect * 0.05})`,
      );
      gradient.addColorStop(
        0.6,
        `rgba(60, 60, 60, ${0.05 + mouseEffect * 0.02})`,
      );
      gradient.addColorStop(1, "rgba(40, 40, 40, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bright center spot with pulse animation
      const pulse = 0.8 + Math.sin(timeRef.current * 2) * 0.2;
      const spotGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        150 * pulse,
      );

      spotGradient.addColorStop(
        0,
        `rgba(200, 200, 200, ${0.2 + mouseEffect * 0.1})`,
      );
      spotGradient.addColorStop(
        0.5,
        `rgba(150, 150, 150, ${0.1 + mouseEffect * 0.05})`,
      );
      spotGradient.addColorStop(1, "rgba(100, 100, 100, 0)");

      ctx.fillStyle = spotGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150 * pulse, 0, Math.PI * 2);
      ctx.fill();
    };

    // Your original perspective grid (enhanced)
    const drawPerspectiveGrid = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;
      const gridLines = 24;
      const gridSpacing = 25;

      // Mouse influence on perspective
      const mouseAngle = Math.atan2(
        mouseRef.current.y - centerY,
        mouseRef.current.x - centerX,
      );

      // Perspective lines radiating from center with mouse influence
      for (let i = 0; i < gridLines; i++) {
        const angle = (Math.PI * 2 * i) / gridLines + mouseAngle * 0.1;
        const distance = 600 + Math.sin(timeRef.current + i) * 50;

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + Math.sin(timeRef.current + i) * 0.03})`;
        ctx.lineWidth = 0.8 + Math.sin(timeRef.current * 3 + i) * 0.3;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance,
        );
        ctx.stroke();
      }

      // Concentric circles with animation
      for (let i = 1; i <= 20; i++) {
        const pulse = 1 + Math.sin(timeRef.current + i * 0.2) * 0.1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + Math.cos(timeRef.current + i) * 0.02})`;
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.arc(centerX, centerY, i * gridSpacing * pulse, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    // NEW: Floating particles system
    const drawParticles = () => {
      const particleCount = 100;
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;

      for (let i = 0; i < particleCount; i++) {
        const angle = (i * Math.PI * 2) / particleCount + timeRef.current * 0.2;
        const distance = 100 + Math.sin(timeRef.current * 0.5 + i) * 50;
        const size = 1 + Math.sin(timeRef.current * 2 + i) * 0.5;

        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        // Particle with glow
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        gradient.addColorStop(
          0,
          `rgba(255, 255, 255, ${0.3 + Math.sin(timeRef.current + i) * 0.2})`,
        );
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    // NEW: Energy beams from center
    const drawEnergyBeams = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;
      const beamCount = 8;

      for (let i = 0; i < beamCount; i++) {
        const angle = (Math.PI * 2 * i) / beamCount + timeRef.current * 0.1;
        const length = 400 + Math.sin(timeRef.current * 3 + i) * 100;

        const gradient = ctx.createLinearGradient(
          centerX,
          centerY,
          centerX + Math.cos(angle) * length,
          centerY + Math.sin(angle) * length,
        );

        gradient.addColorStop(
          0,
          `rgba(100, 150, 255, ${0.1 + Math.sin(timeRef.current * 2) * 0.05})`,
        );
        gradient.addColorStop(0.5, "rgba(80, 120, 220, 0.05)");
        gradient.addColorStop(1, "rgba(60, 100, 200, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * length,
          centerY + Math.sin(angle) * length,
        );
        ctx.stroke();
      }
    };

    // NEW: Digital rain effect
    const drawDigitalRain = () => {
      const columns = Math.floor(canvas.width / 20);
      const charSet = "01アイウエオカキクケコサシスセソ";

      ctx.fillStyle = "rgba(0, 255, 200, 0.1)";
      ctx.font = "14px monospace";

      for (let i = 0; i < columns; i++) {
        const x = i * 20;
        const speed = 5 + Math.sin(timeRef.current + i) * 3;
        const y = (timeRef.current * speed * 20) % canvas.height;

        for (let j = 0; j < 5; j++) {
          const charY = (y - j * 20 + canvas.height) % canvas.height;
          const char = charSet.charAt(
            Math.floor(Math.random() * charSet.length),
          );
          const opacity = 0.8 - j * 0.15;

          ctx.fillStyle = `rgba(0, ${255 - j * 30}, ${200 - j * 20}, ${opacity * 0.3})`;
          ctx.fillText(char, x, charY);
        }
      }
    };

    const animate = () => {
      timeRef.current += 0.01;

      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0a0a12");
      gradient.addColorStop(0.5, "#050510");
      gradient.addColorStop(1, "#000008");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw all effects in layers
      drawGrid();
      drawPerspectiveGrid();
      drawCurvedShape("left", 0);
      drawCurvedShape("right", Math.PI);
      drawCenterGlow();
      drawEnergyBeams();
      drawParticles();
      drawDigitalRain();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Enhanced overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-30" />
        {/* Center focus */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40" />
        {/* Color tint */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-purple-900/10 mix-blend-overlay" />
        {/* Scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,200,0.03)_1px,transparent_1px)] bg-size-[100%_2px] opacity-20" />
      </div>
    </div>
  );
};

export default AnimatedGridBackground;
