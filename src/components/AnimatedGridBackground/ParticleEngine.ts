import { colorPalette } from "./constants";
import type { ParticleConfig } from "./types";

export const initParticles = (
  width: number,
  height: number,
): ParticleConfig[] => {
  const chartColors = [
    colorPalette.chart1,
    colorPalette.chart2,
    colorPalette.chart3,
    colorPalette.chart4,
    colorPalette.chart5,
  ];
  return Array.from({ length: 50 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.3,
    color: chartColors[Math.floor(Math.random() * chartColors.length)],
  }));
};

export const drawParticles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: ParticleConfig[],
) => {
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    ctx.fillStyle = `${p.color} / ${p.opacity})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    particles.forEach((o) => {
      const dx = p.x - o.x,
        dy = p.y - o.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120 && dist > 0) {
        ctx.strokeStyle = `${p.color} / ${(1 - dist / 120) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(o.x, o.y);
        ctx.stroke();
      }
    });
  });
};
