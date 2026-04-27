import { typingSnippets } from "./constants";
import { roundRect } from "./utils";
import type { TypingState } from "./types";

interface EditorTheme {
  bg: string;
  card: string;
  border: string;
}

export const initTypingState = (): TypingState => ({
  snippetIndex: 0,
  lineIndex: 0,
  charIndex: 0,
  cursorBlink: true,
  cursorTimer: 0,
  typeAccumulator: 0,
  pauseAccumulator: 0,
  state: "typing",
  clearAccumulator: 0,
  clearedLines: 0,
});

export const drawTypingTerminal = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  deltaTime: number,
  typingStateRef: React.MutableRefObject<TypingState>,
  theme: EditorTheme,
) => {
  if (width < 640) return;
  const typing = typingStateRef.current;
  const sn = typingSnippets[typing.snippetIndex % typingSnippets.length];
  const FS = 12,
    LH = 19,
    PAD = 14,
    LNUM_W = 40,
    MINI_W = 34,
    TITLEBAR_H = 34,
    TABBAR_H = 34,
    STATUSBAR_H = 22;
  const TW = Math.min(400, width * 0.37);
  const TH =
    sn.lines.length * LH + PAD * 2 + TITLEBAR_H + TABBAR_H + STATUSBAR_H;
  const TX = width - TW - 24,
    TY = height - TH - 24,
    R = 10;

  typing.cursorTimer += deltaTime;
  if (typing.cursorTimer >= 0.53) {
    typing.cursorBlink = !typing.cursorBlink;
    typing.cursorTimer = 0;
  }

  if (typing.state === "typing") {
    typing.typeAccumulator += deltaTime;
    while (typing.typeAccumulator >= 0.034) {
      typing.typeAccumulator -= 0.034;
      const fullLine = sn.lines[typing.lineIndex].map((t) => t.v).join("");
      if (typing.charIndex < fullLine.length) typing.charIndex++;
      else if (typing.lineIndex < sn.lines.length - 1) {
        typing.lineIndex++;
        typing.charIndex = 0;
        typing.typeAccumulator += 0.1;
      } else {
        typing.state = "pausing";
        typing.pauseAccumulator = 0;
      }
    }
  } else if (typing.state === "pausing") {
    typing.pauseAccumulator += deltaTime;
    if (typing.pauseAccumulator >= 3.5) {
      typing.state = "clearing";
      typing.clearAccumulator = 0;
      typing.clearedLines = 0;
    }
  } else if (typing.state === "clearing") {
    typing.clearAccumulator += deltaTime;
    if (typing.clearAccumulator >= 0.07) {
      typing.clearAccumulator = 0;
      typing.clearedLines++;
      if (typing.clearedLines >= sn.lines.length) {
        typing.snippetIndex = (typing.snippetIndex + 1) % typingSnippets.length;
        typing.lineIndex = 0;
        typing.charIndex = 0;
        typing.state = "typing";
        typing.typeAccumulator = 0;
      }
    }
  }

  ctx.save();
  ctx.shadowBlur = 60;
  ctx.shadowColor = `rgba(0,0,0,0.5)`;
  roundRect(ctx, TX, TY, TW, TH, R);
  ctx.fillStyle = theme.bg;
  ctx.fill();
  ctx.shadowBlur = 0;
  roundRect(ctx, TX, TY, TW, TH, R);
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  roundRect(ctx, TX, TY, TW, TITLEBAR_H, [R, R, 0, 0]);
  ctx.fillStyle = theme.card;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(TX, TY + TITLEBAR_H);
  ctx.lineTo(TX + TW, TY + TITLEBAR_H);
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  const dotY = TY + TITLEBAR_H / 2;
  [{ c: "#ff6058" }, { c: "#ffbd2e" }, { c: "#28ca42" }].forEach((d, i) => {
    ctx.beginPath();
    ctx.arc(TX + 14 + i * 16, dotY, 5, 0, Math.PI * 2);
    ctx.fillStyle = d.c;
    ctx.fill();
  });

  const iconX = TX + TW / 2 - 24,
    iconY = TY + TITLEBAR_H / 2 - 8;
  roundRect(ctx, iconX, iconY, 20, 15, 3);
  ctx.fillStyle = sn.iconBg;
  ctx.fill();
  ctx.font = `bold 7.5px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillStyle = sn.iconFg;
  ctx.fillText(sn.icon, iconX + 10, iconY + 10.5);
  ctx.font = `11px 'Courier New', monospace`;
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText(sn.file, iconX + 24, TY + TITLEBAR_H / 2 + 4);

  const tabY = TY + TITLEBAR_H;
  ctx.fillStyle = theme.bg;
  ctx.fillRect(TX, tabY, TW, TABBAR_H);
  const tabW = Math.min(140, TW * 0.38);
  ctx.fillStyle = theme.card;
  ctx.fillRect(TX, tabY, tabW, TABBAR_H);
  ctx.fillStyle = sn.accentColor;
  ctx.fillRect(TX, tabY, tabW, 1.5);
  ctx.beginPath();
  ctx.moveTo(TX + tabW, tabY);
  ctx.lineTo(TX + tabW, tabY + TABBAR_H);
  ctx.moveTo(TX, tabY + TABBAR_H);
  ctx.lineTo(TX + TW, tabY + TABBAR_H);
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.font = `11px 'Courier New', monospace`;
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText(sn.file, TX + 11, tabY + TABBAR_H / 2 + 4);
  ctx.beginPath();
  ctx.arc(TX + tabW - 10, tabY + TABBAR_H / 2, 3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fill();

  const edY = tabY + TABBAR_H,
    edH = TH - TITLEBAR_H - TABBAR_H - STATUSBAR_H;
  ctx.beginPath();
  ctx.rect(TX, edY, TW, edH);
  ctx.clip();
  ctx.fillStyle = theme.bg;
  ctx.fillRect(TX, edY, TW, edH);
  ctx.fillStyle = theme.border;
  ctx.fillRect(TX, edY, LNUM_W, edH);
  ctx.beginPath();
  ctx.moveTo(TX + LNUM_W, edY);
  ctx.lineTo(TX + LNUM_W, edY + edH);
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 0.5;
  for (let indent = 1; indent <= 4; indent++) {
    const gx = TX + LNUM_W + indent * 16;
    ctx.beginPath();
    ctx.moveTo(gx, edY);
    ctx.lineTo(gx, edY + edH);
    ctx.stroke();
  }

  if (typing.state === "typing") {
    const alY = edY + PAD + typing.lineIndex * LH;
    ctx.fillStyle = theme.card;
    ctx.globalAlpha = 0.4;
    ctx.fillRect(TX + LNUM_W, alY, TW - LNUM_W - MINI_W, LH);
    ctx.globalAlpha = 1.0;
  }

  const visibleLines =
    typing.state === "clearing"
      ? sn.lines.length - typing.clearedLines
      : typing.lineIndex + 1;
  for (let i = 0; i < visibleLines && i < sn.lines.length; i++) {
    const row = sn.lines[i];
    const fullLine = row.map((t) => t.v).join("");
    const lineY = edY + PAD + i * LH + FS;
    const isCurrent = i === typing.lineIndex && typing.state === "typing";
    let charsLeft = isCurrent ? typing.charIndex : Infinity;
    let lineX = TX + LNUM_W + PAD;
    ctx.font = `${FS - 1}px 'Courier New', monospace`;
    ctx.textAlign = "right";
    ctx.fillStyle = isCurrent
      ? "rgba(255,255,255,0.55)"
      : "rgba(255,255,255,0.2)";
    ctx.fillText(String(i + 1), TX + LNUM_W - 6, lineY);
    ctx.textAlign = "left";
    row.forEach((tok) => {
      const display = tok.v.slice(0, Math.max(0, charsLeft));
      charsLeft -= tok.v.length;
      if (!display) return;
      ctx.font = `${FS}px 'Courier New', monospace`;
      ctx.shadowBlur = 3;
      ctx.shadowColor = tok.c + "55";
      ctx.fillStyle = tok.c;
      ctx.fillText(display, lineX, lineY);
      ctx.shadowBlur = 0;
      lineX += ctx.measureText(display).width;
    });
    if (isCurrent && typing.cursorBlink) {
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.shadowBlur = 8;
      ctx.shadowColor = `${sn.accentColor}bb`;
      ctx.fillRect(lineX, lineY - FS + 2, 2, FS + 1);
      ctx.shadowBlur = 0;
    }
    if (fullLine.trim()) {
      const mmX = TX + TW - MINI_W + 5,
        mmY =
          edY + PAD + i * ((edH - PAD * 2) / Math.max(sn.lines.length, 1)) + 2;
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(mmX, mmY, Math.min(MINI_W - 8, fullLine.length * 0.75), 2);
    }
  }

  ctx.beginPath();
  ctx.moveTo(TX + TW - MINI_W, edY);
  ctx.lineTo(TX + TW - MINI_W, edY + edH);
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.restore();
  ctx.save();

  const sbY = TY + TH - STATUSBAR_H;
  roundRect(ctx, TX, sbY, TW, STATUSBAR_H, [0, 0, R, R]);
  ctx.fillStyle = theme.card;
  ctx.fill();
  roundRect(ctx, TX, sbY, TW, STATUSBAR_H, [0, 0, R, R]);
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.font = "10px sans-serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText(
    `  ⎇ main    Ln ${typing.lineIndex + 1}, Col ${typing.charIndex + 1}    ${sn.language}    UTF-8`,
    TX + 4,
    sbY + STATUSBAR_H / 2 + 3.5,
  );
  ctx.restore();
};
