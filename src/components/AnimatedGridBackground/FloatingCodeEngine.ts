import { codeSnippetsData } from "./constants";
import { withOpacity } from "./utils";
import type { FloatingCode } from "./types";

export const initFloatingCodes = (
  width: number,
  height: number,
): { codes: FloatingCode[]; isMobile: boolean } => {
  const isMobile = width < 768;
  const count = isMobile ? 5 : 10;
  const codes = Array.from({ length: count }, (_, i) => {
    const data =
      codeSnippetsData[
        (i * 3 + Math.floor(Math.random() * 2)) % codeSnippetsData.length
      ];
    return {
      text: data.text,
      language: data.language,
      color: data.color,
      x: (width / count) * i + Math.random() * (width / count) * 0.6,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.06 - Math.random() * 0.12,
      maxOpacity: isMobile
        ? 0.06 + Math.random() * 0.1
        : 0.08 + Math.random() * 0.18,
      fontSize: isMobile ? 9 + Math.random() * 3 : 11 + Math.random() * 5,
      age: -i * 1.8,
      lifetime: 20 + Math.random() * 14,
      wobbleOffset: Math.random() * Math.PI * 2,
    };
  });
  return { codes, isMobile };
};

export const drawFloatingCodes = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  deltaTime: number,
  codesRef: React.MutableRefObject<FloatingCode[]>,
  isMobileRef: React.MutableRefObject<boolean>,
) => {
  ctx.textAlign = "left";
  codesRef.current.forEach((code) => {
    code.age += deltaTime;
    code.x += code.vx + Math.sin(code.age * 0.4 + code.wobbleOffset) * 0.15;
    code.y += code.vy;
    if (
      code.age > code.lifetime ||
      code.y < -60 ||
      code.x < -250 ||
      code.x > width + 250
    ) {
      const data =
        codeSnippetsData[Math.floor(Math.random() * codeSnippetsData.length)];
      const isMobile = isMobileRef.current;
      Object.assign(code, {
        text: data.text,
        language: data.language,
        color: data.color,
        x: Math.random() * width,
        y: height + 30 + Math.random() * 120,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.06 - Math.random() * 0.12,
        maxOpacity: isMobile
          ? 0.06 + Math.random() * 0.1
          : 0.08 + Math.random() * 0.18,
        fontSize: isMobile ? 9 + Math.random() * 3 : 11 + Math.random() * 5,
        age: 0,
        lifetime: 20 + Math.random() * 14,
        wobbleOffset: Math.random() * Math.PI * 2,
      });
      return;
    }
    let opacity = 0;
    const fadeIn = 2.5,
      fadeOut = 2.5,
      stableEnd = code.lifetime - fadeOut;
    if (code.age < 0) opacity = 0;
    else if (code.age < fadeIn)
      opacity = code.maxOpacity * (code.age / fadeIn) ** 2;
    else if (code.age <= stableEnd) opacity = code.maxOpacity;
    else
      opacity = code.maxOpacity * (1 - ((code.age - stableEnd) / fadeOut) ** 2);
    if (opacity <= 0.001) return;
    ctx.font = `${code.fontSize}px 'Courier New', monospace`;
    ctx.shadowBlur = 14;
    ctx.shadowColor = withOpacity(code.color, 0.35);
    ctx.fillStyle = withOpacity(code.color, opacity * 0.5);
    ctx.fillText(code.text, code.x, code.y);
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    ctx.fillStyle = withOpacity(code.color, opacity);
    ctx.fillText(code.text, code.x, code.y);
    ctx.font = `${Math.max(7, code.fontSize - 3)}px 'Courier New', monospace`;
    ctx.fillStyle = `oklch(0.556 0 0 / ${opacity * 0.4})`;
    ctx.fillText(
      `// ${code.language}`,
      code.x,
      code.y + Math.max(7, code.fontSize - 3) + 3,
    );
  });
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
};
