import { colorPalette } from "./constants";

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  const gridSize = 40,
    lineWidth = 0.3;
  ctx.strokeStyle = colorPalette.border;
  ctx.lineWidth = lineWidth;
  for (let x = 0; x < width; x += gridSize) {
    const wave = Math.sin(time * 0.1 + x * 0.0005) * 1;
    ctx.beginPath();
    ctx.moveTo(x + wave, 0);
    ctx.lineTo(x + wave, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    const wave = Math.cos(time * 0.1 + y * 0.0005) * 1;
    ctx.beginPath();
    ctx.moveTo(0, y + wave);
    ctx.lineTo(width, y + wave);
    ctx.stroke();
  }
};

export const drawPerspectiveGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  const cx = width / 2,
    cy = height * 0.65;
  ctx.strokeStyle = "oklch(0.556 0 0 / 0.05)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI * 2 * i) / 16 + time * 0.02;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * 400, cy + Math.sin(angle) * 400);
    ctx.stroke();
  }
  for (let i = 1; i <= 12; i++) {
    const r = i * 30 * (0.95 + Math.sin(time * 0.3 + i) * 0.05);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
};

export const drawCurvedShape = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  side: "left" | "right",
  offsetY: number,
) => {
  const cw = width * 0.35;
  ctx.beginPath();
  if (side === "left") {
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.bezierCurveTo(
      cw * 0.3 + Math.sin(time * 0.4 + offsetY) * 30,
      height * 0.3 + Math.cos(time * 0.3 + offsetY) * 60,
      cw * 0.5 + Math.cos(time * 0.4 + offsetY) * 40,
      height * 0.7 + Math.sin(time * 0.3 + offsetY) * 50,
      cw,
      height,
    );
    ctx.lineTo(0, height);
  } else {
    ctx.moveTo(width, 0);
    ctx.lineTo(width, height);
    ctx.bezierCurveTo(
      width - cw * 0.3 - Math.sin(time * 0.4 + offsetY) * 30,
      height * 0.3 + Math.cos(time * 0.3 + offsetY) * 60,
      width - cw * 0.5 - Math.cos(time * 0.4 + offsetY) * 40,
      height * 0.7 + Math.sin(time * 0.3 + offsetY) * 50,
      width - cw,
      height,
    );
    ctx.lineTo(width, height);
  }
  ctx.closePath();
  const grad = ctx.createRadialGradient(
    side === "left" ? 0 : width,
    height / 2,
    0,
    side === "left" ? 0 : width,
    height / 2,
    cw * 1.8,
  );
  grad.addColorStop(0, "oklch(0.269 0 0 / 0.25)");
  grad.addColorStop(0.5, "oklch(0.205 0 0 / 0.15)");
  grad.addColorStop(1, "oklch(0.145 0 0 / 0)");
  ctx.fillStyle = grad;
  ctx.fill();
};

export const drawCenterGlow = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  const cx = width / 2,
    cy = height * 0.65;
  const pulse = 0.9 + Math.sin(time * 0.8) * 0.1;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 250 * pulse);
  grad.addColorStop(0, "oklch(0.488 0.243 264.376 / 0.15)");
  grad.addColorStop(0.4, "oklch(0.371 0 0 / 0.08)");
  grad.addColorStop(0.7, "oklch(0.269 0 0 / 0.03)");
  grad.addColorStop(1, "oklch(0.145 0 0 / 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
};

export const drawFloatingNumbers = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  const cx = width / 2,
    cy = height * 0.65;
  const numbers = "0123456789".split("");
  const chartColors = [
    colorPalette.chart1,
    colorPalette.chart2,
    colorPalette.chart3,
    colorPalette.chart4,
    colorPalette.chart5,
  ];
  ctx.font = "16px 'Courier New', monospace";
  ctx.textAlign = "center";
  for (let i = 0; i < 20; i++) {
    const angle = (Math.PI * 2 * i) / 20 + time * 0.05;
    const dist = 80 + Math.sin(time * 0.2 + i) * 30;
    const op = 0.1 + Math.sin(time * 0.5 + i) * 0.05;
    ctx.fillStyle = `${chartColors[i % chartColors.length]} / ${op})`;
    ctx.fillText(
      numbers[i % numbers.length],
      cx + Math.cos(angle) * dist,
      cy + Math.sin(angle) * dist,
    );
  }
};

export const drawDataStreams = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  for (let i = 0; i < 6; i++) {
    const x = i * (width / 6) + width / 6 / 2;
    for (let j = 0; j < 15; j++) {
      const y = (time * (1 + i * 0.2) * 20 + j * 75) % height;
      const op = 0.03 + Math.sin(time * 0.5 + i) * 0.02;
      const grad = ctx.createLinearGradient(x, y, x, y + 25);
      grad.addColorStop(0, `oklch(0.922 0 0 / ${op})`);
      grad.addColorStop(1, `oklch(0.922 0 0 / 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(x - 1, y, 2, 25);
    }
  }
};
