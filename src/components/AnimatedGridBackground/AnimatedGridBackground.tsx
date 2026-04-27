import React, { useEffect, useRef } from "react";
import { editorThemeColors } from "./constants";
import { initParticles, drawParticles } from "./ParticleEngine";
import { initBinaryStreams, drawBinaryRain } from "./BinaryRainEngine";
import { initFloatingCodes, drawFloatingCodes } from "./FloatingCodeEngine";
import { initTypingState, drawTypingTerminal } from "./TypingTerminalEngine";
import {
  drawGrid,
  drawPerspectiveGrid,
  drawCurvedShape,
  drawCenterGlow,
  drawFloatingNumbers,
  drawDataStreams,
} from "./GridEffects";
import type {
  ParticleConfig,
  BinaryStream,
  FloatingCode,
  TypingState,
} from "./types";

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const particlesRef = useRef<ParticleConfig[]>([]);
  const binaryStreamsRef = useRef<BinaryStream[]>([]);
  const floatingCodesRef = useRef<FloatingCode[]>([]);
  const typingStateRef = useRef<TypingState>(initTypingState());
  const isMobileRef = useRef<boolean>(false);
  // eslint-disable-next-line react-hooks/purity
  const lastFrameTimeRef = useRef<number>(performance.now());
  const fpsRef = useRef<number>(60);
  const frameCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      particlesRef.current = initParticles(rect.width, rect.height);
      binaryStreamsRef.current = initBinaryStreams(rect.width);
      const floatData = initFloatingCodes(rect.width, rect.height);
      floatingCodesRef.current = floatData.codes;
      isMobileRef.current = floatData.isMobile;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    let animationFrame: number;
    lastTimeRef.current = performance.now();

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

    const animate = () => {
      const now = performance.now();
      const deltaTime = Math.min((now - lastFrameTimeRef.current) / 1000, 0.1);
      lastFrameTimeRef.current = now;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      timeRef.current += 0.005;

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "oklch(0.08 0 0)");
      gradient.addColorStop(0.5, "oklch(0.05 0 0)");
      gradient.addColorStop(1, "oklch(0.03 0 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      drawGrid(ctx, width, height, timeRef.current);
      drawPerspectiveGrid(ctx, width, height, timeRef.current);
      drawCurvedShape(ctx, width, height, timeRef.current, "left", 0);
      drawCurvedShape(ctx, width, height, timeRef.current, "right", Math.PI);
      drawCenterGlow(ctx, width, height, timeRef.current);
      drawFloatingCodes(
        ctx,
        width,
        height,
        deltaTime,
        floatingCodesRef,
        isMobileRef,
      );
      drawDataStreams(ctx, width, height, timeRef.current);
      drawParticles(ctx, width, height, particlesRef.current);
      drawFloatingNumbers(ctx, width, height, timeRef.current);
      drawBinaryRain(ctx, height, timeRef.current, binaryStreamsRef.current);

      drawTypingTerminal(
        ctx,
        width,
        height,
        deltaTime,
        typingStateRef,
        editorThemeColors,
      );

      updateFPS();
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

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
