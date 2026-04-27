export const withOpacity = (color: string, opacity: number): string =>
  color.replace(")", ` / ${opacity})`);

export const roundRect = (
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | number[],
) => {
  const [tl, tr, br, bl] = Array.isArray(r) ? r : [r, r, r, r];
  c.beginPath();
  c.moveTo(x + tl, y);
  c.lineTo(x + w - tr, y);
  c.arcTo(x + w, y, x + w, y + tr, tr);
  c.lineTo(x + w, y + h - br);
  c.arcTo(x + w, y + h, x + w - br, y + h, br);
  c.lineTo(x + bl, y + h);
  c.arcTo(x, y + h, x, y + h - bl, bl);
  c.lineTo(x, y + tl);
  c.arcTo(x, y, x + tl, y, tl);
  c.closePath();
};
