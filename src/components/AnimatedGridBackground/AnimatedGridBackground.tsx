import React, { useEffect, useRef } from "react";

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    let animationFrame: number;
    let time = 0;

    const drawGrid = () => {
      const gridSize = 2;
      const lineWidth = 0.5;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = lineWidth;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawCurvedShape = (side: "left" | "right", offsetY: number) => {
      const width = canvas.width;
      const height = canvas.height;
      const curveWidth = width * 0.4;

      ctx.beginPath();

      if (side === "left") {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);

        // Animated curve
        const cp1x = curveWidth * 0.3 + Math.sin(time * 0.8 + offsetY) * 50;
        const cp1y = height * 0.3 + Math.cos(time * 0.5 + offsetY) * 100;
        const cp2x = curveWidth * 0.5 + Math.cos(time * 0.6 + offsetY) * 60;
        const cp2y = height * 0.7 + Math.sin(time * 0.7 + offsetY) * 80;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, curveWidth, height);
        ctx.lineTo(0, height);
      } else {
        ctx.moveTo(width, 0);
        ctx.lineTo(width, height);

        // Animated curve
        const cp1x =
          width - curveWidth * 0.3 - Math.sin(time * 0.8 + offsetY) * 50;
        const cp1y = height * 0.3 + Math.cos(time * 0.5 + offsetY) * 100;
        const cp2x =
          width - curveWidth * 0.5 - Math.cos(time * 0.6 + offsetY) * 60;
        const cp2y = height * 0.7 + Math.sin(time * 0.7 + offsetY) * 80;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width - curveWidth, height);
        ctx.lineTo(width, height);
      }

      ctx.closePath();

      // Create gradient
      const gradient = ctx.createRadialGradient(
        side === "left" ? 0 : width,
        height / 2,
        0,
        side === "left" ? 0 : width,
        height / 2,
        curveWidth * 1.5,
      );

      gradient.addColorStop(0, "rgba(80, 80, 80, 0.4)");
      gradient.addColorStop(0.5, "rgba(60, 60, 60, 0.2)");
      gradient.addColorStop(1, "rgba(40, 40, 40, 0)");

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawCenterGlow = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;
      const radius = 300;

      // Main glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius,
      );
      gradient.addColorStop(0, "rgba(100, 100, 100, 0.3)");
      gradient.addColorStop(0.3, "rgba(80, 80, 80, 0.15)");
      gradient.addColorStop(0.6, "rgba(60, 60, 60, 0.05)");
      gradient.addColorStop(1, "rgba(40, 40, 40, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bright center spot
      const spotGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        150,
      );
      spotGradient.addColorStop(0, "rgba(200, 200, 200, 0.2)");
      spotGradient.addColorStop(0.5, "rgba(150, 150, 150, 0.1)");
      spotGradient.addColorStop(1, "rgba(100, 100, 100, 0)");

      ctx.fillStyle = spotGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPerspectiveGrid = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.65;
      const gridLines = 40;
      const gridSpacing = 20;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      // Perspective lines radiating from center
      for (let i = 0; i < gridLines; i++) {
        const angle = (Math.PI * 2 * i) / gridLines;
        const distance = 800;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance,
        );
        ctx.stroke();
      }

      // Concentric circles
      for (let i = 1; i <= 15; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, i * gridSpacing, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      drawGrid();

      // Draw perspective grid at bottom
      drawPerspectiveGrid();

      // Draw curved shapes on sides
      drawCurvedShape("left", 0);
      drawCurvedShape("right", Math.PI);

      // Draw center glow
      drawCenterGlow();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60 pointer-events-none" />
    </div>
  );
};

export default AnimatedGridBackground;
