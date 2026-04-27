import type { BinaryStream } from "./types";

export const initBinaryStreams = (width: number): BinaryStream[] => {
  const columns = Math.floor(width / 40);
  return Array.from({ length: columns }, (_, i) => ({
    x: i * 40 + 20,
    speed: 0.3 + Math.random() * 0.5,
    chars: Array.from({ length: 10 + Math.floor(Math.random() * 20) }, () =>
      Math.random() > 0.5 ? "1" : "0",
    ),
    charHeight: 20,
    opacity: 0.1 + Math.random() * 0.2,
    offset: Math.random() * 1000,
  }));
};

export const drawBinaryRain = (
  ctx: CanvasRenderingContext2D,
  height: number,
  time: number,
  streams: BinaryStream[],
) => {
  ctx.font = "14px 'Courier New', monospace";
  ctx.textAlign = "center";
  streams.forEach((stream, index) => {
    const currentY = (time * 10 * stream.speed + stream.offset) % height;
    stream.chars.forEach((char, charIndex) => {
      const y = (currentY - charIndex * stream.charHeight + height) % height;
      let opacity = stream.opacity;
      const pos = charIndex / stream.chars.length;
      if (pos < 0.2) opacity *= pos * 5;
      else if (pos > 0.8) opacity *= (1 - pos) * 5;
      ctx.fillStyle =
        char === "1"
          ? `oklch(0.922 0 0 / ${opacity * 0.7})`
          : `oklch(0.269 0 0 / ${opacity * 0.5})`;
      ctx.fillText(char, stream.x, y);
      if (Math.random() > 0.985) {
        const gr = 8 + Math.sin(time * 2 + index) * 4;
        const grad = ctx.createRadialGradient(
          stream.x,
          y - 5,
          0,
          stream.x,
          y - 5,
          gr,
        );
        grad.addColorStop(0, `oklch(0.627 0.265 303.9 / ${opacity * 0.3})`);
        grad.addColorStop(1, `oklch(0.627 0.265 303.9 / 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(stream.x - gr, y - 5 - gr, gr * 2, gr * 2);
      }
    });
  });
};
