import React, { useEffect, useRef } from "react";

interface ParticleConfig {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface BinaryStream {
  x: number;
  speed: number;
  chars: string[];
  charHeight: number;
  opacity: number;
  offset: number;
}

interface FloatingCode {
  text: string;
  language: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  maxOpacity: number;
  color: string;
  fontSize: number;
  age: number;
  lifetime: number;
  wobbleOffset: number;
}

interface TypingState {
  snippetIndex: number;
  lineIndex: number;
  charIndex: number;
  cursorBlink: boolean;
  cursorTimer: number;
  typeAccumulator: number;
  pauseAccumulator: number;
  state: "typing" | "pausing" | "clearing";
  clearAccumulator: number;
  clearedLines: number;
}

// ── Token type for syntax highlighting
interface Token {
  c: string;
  v: string;
}

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const binaryStreamsRef = useRef<BinaryStream[]>([]);
  const particlesRef = useRef<ParticleConfig[]>([]);
  const fpsRef = useRef<number>(60);
  const frameCountRef = useRef<number>(0);
  const floatingCodesRef = useRef<FloatingCode[]>([]);
  const typingStateRef = useRef<TypingState>({
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
  // eslint-disable-next-line react-hooks/purity
  const lastFrameTimeRef = useRef<number>(performance.now());
  const isMobileRef = useRef<boolean>(false);

  const colorPalette = {
    border: "oklch(1 0 0 / 0.1)",
    primary: "oklch(0.922 0 0)",
    secondary: "oklch(0.269 0 0)",
    accent: "oklch(0.627 0.265 303.9)",
    muted: "oklch(0.269 0 0)",
    card: "oklch(0.205 0 0)",
    background: "oklch(0.145 0 0)",
    chart1: "oklch(0.488 0.243 264.376)",
    chart2: "oklch(0.696 0.17 162.48)",
    chart3: "oklch(0.769 0.188 70.08)",
    chart4: "oklch(0.627 0.265 303.9)",
    chart5: "oklch(0.645 0.246 16.439)",
    ring: "oklch(0.556 0 0)",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const withOpacity = (color: string, opacity: number): string =>
      color.replace(")", ` / ${opacity})`);

    // ─── Helpers ────────────────────────────────────────────────────────────

    const roundRect = (
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

    // ─── Floating code data (unchanged) ─────────────────────────────────────

    const codeSnippetsData = [
      {
        text: "const app = express();",
        language: "JavaScript",
        color: colorPalette.chart3,
      },
      {
        text: "def fibonacci(n):",
        language: "Python",
        color: colorPalette.chart2,
      },
      {
        text: '<div className="app">',
        language: "JSX",
        color: colorPalette.chart4,
      },
      { text: "display: flex;", language: "CSS", color: colorPalette.chart1 },
      {
        text: 'import React from "react";',
        language: "JavaScript",
        color: colorPalette.chart3,
      },
      {
        text: "async function fetchData()",
        language: "TypeScript",
        color: colorPalette.chart1,
      },
      {
        text: "SELECT * FROM users;",
        language: "SQL",
        color: colorPalette.chart2,
      },
      {
        text: "interface Props {",
        language: "TypeScript",
        color: colorPalette.chart4,
      },
      {
        text: ".map((item) => ...)",
        language: "JavaScript",
        color: colorPalette.chart3,
      },
      {
        text: "pip install numpy",
        language: "CLI",
        color: colorPalette.chart2,
      },
      {
        text: 'git commit -m "feat:"',
        language: "CLI",
        color: colorPalette.chart5,
      },
      {
        text: "export default App;",
        language: "JavaScript",
        color: colorPalette.chart3,
      },
      { text: "color: #00ff88;", language: "CSS", color: colorPalette.chart1 },
      {
        text: "const [state, setState]",
        language: "React",
        color: colorPalette.chart4,
      },
      {
        text: 'print("Hello World")',
        language: "Python",
        color: colorPalette.chart2,
      },
      { text: "npm run build", language: "CLI", color: colorPalette.chart5 },
      {
        text: "return <Layout />",
        language: "JSX",
        color: colorPalette.chart4,
      },
      {
        text: "background: linear-gradient",
        language: "CSS",
        color: colorPalette.chart1,
      },
      {
        text: "useEffect(() => {",
        language: "React",
        color: colorPalette.chart4,
      },
      {
        text: "for (let i = 0; i < n; i++)",
        language: "JavaScript",
        color: colorPalette.chart3,
      },
      {
        text: "class Node<T> {",
        language: "TypeScript",
        color: colorPalette.chart1,
      },
      {
        text: "border-radius: 8px;",
        language: "CSS",
        color: colorPalette.chart1,
      },
      {
        text: "app.listen(3000);",
        language: "JavaScript",
        color: colorPalette.chart3,
      },
      {
        text: "raise ValueError()",
        language: "Python",
        color: colorPalette.chart2,
      },
    ];

    // ─── VS Code-style snippets with token-level syntax highlighting ─────────
    // CHANGED: replaced plain string lines with Token[][] rows

    const typingSnippets: {
      language: string;
      file: string;
      icon: string;
      iconBg: string;
      iconFg: string;
      accentColor: string;
      lines: Token[][];
    }[] = [
      {
        language: "JavaScript",
        file: "api.js",
        icon: "JS",
        iconBg: "#c8a016",
        iconFg: "#0d0d0f",
        accentColor: "#c8a016",
        lines: [
          [
            { c: "#c792ea", v: "const " },
            { c: "#82aaff", v: "fetchUsers" },
            { c: "#89ddff", v: " = " },
            { c: "#c792ea", v: "async" },
            { c: "#89ddff", v: " () => {" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c792ea", v: "const " },
            { c: "#eeffff", v: "res" },
            { c: "#89ddff", v: " = " },
            { c: "#c792ea", v: "await " },
            { c: "#82aaff", v: "fetch" },
            { c: "#89ddff", v: "(" },
            { c: "#c3e88d", v: '"/api/users"' },
            { c: "#89ddff", v: ");" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c792ea", v: "if " },
            { c: "#89ddff", v: "(!res." },
            { c: "#82aaff", v: "ok" },
            { c: "#89ddff", v: ") " },
            { c: "#c792ea", v: "throw new " },
            { c: "#ffcb6b", v: "Error" },
            { c: "#89ddff", v: "(res." },
            { c: "#82aaff", v: "status" },
            { c: "#89ddff", v: ");" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c792ea", v: "const " },
            { c: "#eeffff", v: "data" },
            { c: "#89ddff", v: " = " },
            { c: "#c792ea", v: "await " },
            { c: "#eeffff", v: "res" },
            { c: "#89ddff", v: "." },
            { c: "#82aaff", v: "json" },
            { c: "#89ddff", v: "();" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c792ea", v: "return " },
            { c: "#eeffff", v: "data" },
            { c: "#89ddff", v: "." },
            { c: "#82aaff", v: "map" },
            { c: "#89ddff", v: "(" },
            { c: "#ffcb6b", v: "u" },
            { c: "#89ddff", v: " => " },
            { c: "#eeffff", v: "u" },
            { c: "#89ddff", v: "." },
            { c: "#82aaff", v: "name" },
            { c: "#89ddff", v: ");" },
          ],
          [{ c: "#89ddff", v: "};" }],
        ],
      },
      {
        language: "Python",
        file: "train.py",
        icon: "PY",
        iconBg: "#3b8ad9",
        iconFg: "#ffffff",
        accentColor: "#3b8ad9",
        lines: [
          [
            { c: "#c792ea", v: "import " },
            { c: "#82aaff", v: "torch" },
            { c: "#89ddff", v: "; " },
            { c: "#c792ea", v: "import " },
            { c: "#82aaff", v: "torch.nn" },
            { c: "#89ddff", v: " as " },
            { c: "#eeffff", v: "nn" },
          ],
          [{ c: "#89ddff", v: "" }],
          [
            { c: "#c792ea", v: "class " },
            { c: "#ffcb6b", v: "MLP" },
            { c: "#89ddff", v: "(" },
            { c: "#82aaff", v: "nn.Module" },
            { c: "#89ddff", v: "):" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c792ea", v: "def " },
            { c: "#82aaff", v: "__init__" },
            { c: "#89ddff", v: "(" },
            { c: "#ffcb6b", v: "self" },
            { c: "#89ddff", v: ", " },
            { c: "#ffcb6b", v: "dims" },
            { c: "#89ddff", v: "):" },
          ],
          [
            { c: "#89ddff", v: "    " },
            { c: "#c792ea", v: "super" },
            { c: "#89ddff", v: "()." },
            { c: "#82aaff", v: "__init__" },
            { c: "#89ddff", v: "()" },
          ],
          [
            { c: "#89ddff", v: "    " },
            { c: "#eeffff", v: "self" },
            { c: "#89ddff", v: "." },
            { c: "#82aaff", v: "net" },
            { c: "#89ddff", v: " = " },
            { c: "#82aaff", v: "nn.Sequential" },
            { c: "#89ddff", v: "(*[" },
          ],
          [
            { c: "#89ddff", v: "      " },
            { c: "#82aaff", v: "nn.Linear" },
            { c: "#89ddff", v: "(" },
            { c: "#eeffff", v: "dims" },
            { c: "#89ddff", v: "[i], " },
            { c: "#eeffff", v: "dims" },
            { c: "#89ddff", v: "[i+1])" },
          ],
        ],
      },
      {
        language: "TypeScript",
        file: "types.ts",
        icon: "TS",
        iconBg: "#007acc",
        iconFg: "#ffffff",
        accentColor: "#007acc",
        lines: [
          [
            { c: "#c792ea", v: "interface " },
            { c: "#ffcb6b", v: "ApiResponse" },
            { c: "#89ddff", v: "<" },
            { c: "#ffcb6b", v: "T" },
            { c: "#89ddff", v: "> {" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#82aaff", v: "data" },
            { c: "#89ddff", v: ": " },
            { c: "#ffcb6b", v: "T" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#82aaff", v: "status" },
            { c: "#89ddff", v: ": " },
            { c: "#c3e88d", v: "'ok'" },
            { c: "#89ddff", v: " | " },
            { c: "#c3e88d", v: "'error'" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#82aaff", v: "meta" },
            { c: "#89ddff", v: ": {" },
          ],
          [
            { c: "#89ddff", v: "    " },
            { c: "#82aaff", v: "timestamp" },
            { c: "#89ddff", v: ": " },
            { c: "#ffcb6b", v: "number" },
          ],
          [
            { c: "#89ddff", v: "    " },
            { c: "#82aaff", v: "requestId" },
            { c: "#89ddff", v: ": " },
            { c: "#ffcb6b", v: "string" },
          ],
          [{ c: "#89ddff", v: "  }" }],
          [{ c: "#89ddff", v: "}" }],
        ],
      },
      {
        language: "CSS",
        file: "layout.css",
        icon: "CSS",
        iconBg: "#264de4",
        iconFg: "#ffffff",
        accentColor: "#264de4",
        lines: [
          [
            { c: "#82aaff", v: ".hero" },
            { c: "#89ddff", v: " {" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c3e88d", v: "display" },
            { c: "#89ddff", v: ": " },
            { c: "#f78c6c", v: "grid" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c3e88d", v: "grid-template-columns" },
            { c: "#89ddff", v: ": " },
            { c: "#f78c6c", v: "repeat(3, 1fr)" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c3e88d", v: "backdrop-filter" },
            { c: "#89ddff", v: ": " },
            { c: "#f78c6c", v: "blur(20px)" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c3e88d", v: "border" },
            { c: "#89ddff", v: ": " },
            { c: "#f78c6c", v: "1px solid rgba(255,255,255,.1)" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c3e88d", v: "border-radius" },
            { c: "#89ddff", v: ": " },
            { c: "#f78c6c", v: "12px" },
          ],
          [{ c: "#89ddff", v: "}" }],
        ],
      },
      {
        language: "React",
        file: "Theme.tsx",
        icon: "TSX",
        iconBg: "#007acc",
        iconFg: "#ffffff",
        accentColor: "#61dafb",
        lines: [
          [
            { c: "#c792ea", v: "const " },
            { c: "#82aaff", v: "ThemeProvider" },
            { c: "#89ddff", v: " = (" },
            { c: "#ffcb6b", v: "{ children }" },
            { c: "#89ddff", v: ") => {" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c792ea", v: "const " },
            { c: "#89ddff", v: "[" },
            { c: "#eeffff", v: "theme" },
            { c: "#89ddff", v: ", " },
            { c: "#eeffff", v: "setTheme" },
            { c: "#89ddff", v: "] = " },
            { c: "#82aaff", v: "useState" },
            { c: "#89ddff", v: "(" },
            { c: "#c3e88d", v: '"dark"' },
            { c: "#89ddff", v: ");" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#82aaff", v: "useEffect" },
            { c: "#89ddff", v: "(() => {" },
          ],
          [
            { c: "#89ddff", v: "    " },
            { c: "#eeffff", v: "document" },
            { c: "#89ddff", v: "." },
            { c: "#82aaff", v: "body" },
            { c: "#89ddff", v: "." },
            { c: "#82aaff", v: "className" },
            { c: "#89ddff", v: " = " },
            { c: "#eeffff", v: "theme" },
            { c: "#89ddff", v: ";" },
          ],
          [
            { c: "#89ddff", v: "  }, [" },
            { c: "#eeffff", v: "theme" },
            { c: "#89ddff", v: "]);" },
          ],
          [
            { c: "#89ddff", v: "  " },
            { c: "#c792ea", v: "return " },
            { c: "#89ddff", v: "<" },
            { c: "#82aaff", v: "ctx.Provider" },
            { c: "#89ddff", v: " value={{ theme, setTheme }}>" },
          ],
          [{ c: "#89ddff", v: "    {children}" }],
        ],
      },
    ];

    // ─── Init helpers (unchanged) ───────────────────────────────────────────

    const initParticles = (width: number, height: number) => {
      const chartColors = [
        colorPalette.chart1,
        colorPalette.chart2,
        colorPalette.chart3,
        colorPalette.chart4,
        colorPalette.chart5,
      ];
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.3,
        color: chartColors[Math.floor(Math.random() * chartColors.length)],
      }));
    };

    const initBinaryStreams = (width: number) => {
      const columns = Math.floor(width / 40);
      binaryStreamsRef.current = Array.from({ length: columns }, (_, i) => ({
        x: i * 40 + 20,
        speed: 0.3 + Math.random() * 0.5,
        chars: Array.from(
          { length: 10 + Math.floor(Math.random() * 20) },
          () => (Math.random() > 0.5 ? "1" : "0"),
        ),
        charHeight: 20,
        opacity: 0.1 + Math.random() * 0.2,
        offset: Math.random() * 1000,
      }));
    };

    const initFloatingCodes = (width: number, height: number) => {
      const isMobile = width < 768;
      isMobileRef.current = isMobile;
      const count = isMobile ? 5 : 10;
      floatingCodesRef.current = Array.from({ length: count }, (_, i) => {
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
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initBinaryStreams(rect.width);
      initParticles(rect.width, rect.height);
      initFloatingCodes(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    let animationFrame: number;
    lastTimeRef.current = performance.now();
    lastFrameTimeRef.current = performance.now();

    // ─── All original draw functions (unchanged) ────────────────────────────

    const drawGrid = () => {
      const gridSize = 40,
        lineWidth = 0.3;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.strokeStyle = colorPalette.border;
      ctx.lineWidth = lineWidth;
      for (let x = 0; x < width; x += gridSize) {
        const wave = Math.sin(timeRef.current * 0.1 + x * 0.0005) * 1;
        ctx.beginPath();
        ctx.moveTo(x + wave, 0);
        ctx.lineTo(x + wave, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        const wave = Math.cos(timeRef.current * 0.1 + y * 0.0005) * 1;
        ctx.beginPath();
        ctx.moveTo(0, y + wave);
        ctx.lineTo(width, y + wave);
        ctx.stroke();
      }
    };

    const drawBinaryRain = () => {
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.font = "14px 'Courier New', monospace";
      ctx.textAlign = "center";
      binaryStreamsRef.current.forEach((stream, index) => {
        const currentY =
          (timeRef.current * 10 * stream.speed + stream.offset) % height;
        stream.chars.forEach((char, charIndex) => {
          const y =
            (currentY - charIndex * stream.charHeight + height) % height;
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
            const gr = 8 + Math.sin(timeRef.current * 2 + index) * 4;
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

    const drawParticles = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        ctx.fillStyle = `${particle.color} / ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        particlesRef.current.forEach((other) => {
          const dx = particle.x - other.x,
            dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            ctx.strokeStyle = `${particle.color} / ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });
    };

    const drawCurvedShape = (side: "left" | "right", offsetY: number) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const cw = width * 0.35;
      ctx.beginPath();
      if (side === "left") {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.bezierCurveTo(
          cw * 0.3 + Math.sin(timeRef.current * 0.4 + offsetY) * 30,
          height * 0.3 + Math.cos(timeRef.current * 0.3 + offsetY) * 60,
          cw * 0.5 + Math.cos(timeRef.current * 0.4 + offsetY) * 40,
          height * 0.7 + Math.sin(timeRef.current * 0.3 + offsetY) * 50,
          cw,
          height,
        );
        ctx.lineTo(0, height);
      } else {
        ctx.moveTo(width, 0);
        ctx.lineTo(width, height);
        ctx.bezierCurveTo(
          width - cw * 0.3 - Math.sin(timeRef.current * 0.4 + offsetY) * 30,
          height * 0.3 + Math.cos(timeRef.current * 0.3 + offsetY) * 60,
          width - cw * 0.5 - Math.cos(timeRef.current * 0.4 + offsetY) * 40,
          height * 0.7 + Math.sin(timeRef.current * 0.3 + offsetY) * 50,
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

    const drawCenterGlow = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const cx = width / 2,
        cy = height * 0.65;
      const pulse = 0.9 + Math.sin(timeRef.current * 0.8) * 0.1;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 250 * pulse);
      grad.addColorStop(0, "oklch(0.488 0.243 264.376 / 0.15)");
      grad.addColorStop(0.4, "oklch(0.371 0 0 / 0.08)");
      grad.addColorStop(0.7, "oklch(0.269 0 0 / 0.03)");
      grad.addColorStop(1, "oklch(0.145 0 0 / 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    };

    const drawPerspectiveGrid = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const cx = width / 2,
        cy = height * 0.65;
      ctx.strokeStyle = "oklch(0.556 0 0 / 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 * i) / 16 + timeRef.current * 0.02;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 400, cy + Math.sin(angle) * 400);
        ctx.stroke();
      }
      for (let i = 1; i <= 12; i++) {
        const r = i * 30 * (0.95 + Math.sin(timeRef.current * 0.3 + i) * 0.05);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawFloatingNumbers = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
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
        const angle = (Math.PI * 2 * i) / 20 + timeRef.current * 0.05;
        const dist = 80 + Math.sin(timeRef.current * 0.2 + i) * 30;
        const op = 0.1 + Math.sin(timeRef.current * 0.5 + i) * 0.05;
        ctx.fillStyle = `${chartColors[i % chartColors.length]} / ${op})`;
        ctx.fillText(
          numbers[i % numbers.length],
          cx + Math.cos(angle) * dist,
          cy + Math.sin(angle) * dist,
        );
      }
    };

    const drawDataStreams = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      for (let i = 0; i < 6; i++) {
        const x = i * (width / 6) + width / 6 / 2;
        for (let j = 0; j < 15; j++) {
          const y = (timeRef.current * (1 + i * 0.2) * 20 + j * 75) % height;
          const op = 0.03 + Math.sin(timeRef.current * 0.5 + i) * 0.02;
          const grad = ctx.createLinearGradient(x, y, x, y + 25);
          grad.addColorStop(0, `oklch(0.922 0 0 / ${op})`);
          grad.addColorStop(1, `oklch(0.922 0 0 / 0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(x - 1, y, 2, 25);
        }
      }
    };

    const drawFloatingCodes = (deltaTime: number) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.textAlign = "left";
      floatingCodesRef.current.forEach((code) => {
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
            codeSnippetsData[
              Math.floor(Math.random() * codeSnippetsData.length)
            ];
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
          opacity =
            code.maxOpacity * (1 - ((code.age - stableEnd) / fadeOut) ** 2);
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

    // ─── CHANGED: drawTypingTerminal — now a full VS Code editor replica ─────

    const drawTypingTerminal = (deltaTime: number) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      if (width < 640) return;

      const typing = typingStateRef.current;
      const sn = typingSnippets[typing.snippetIndex % typingSnippets.length];

      // ── Layout constants
      const FS = 12;
      const LH = 19;
      const PAD = 14;
      const LNUM_W = 40;
      const MINI_W = 34;
      const TITLEBAR_H = 34;
      const TABBAR_H = 34;
      const STATUSBAR_H = 22;
      const TW = Math.min(400, width * 0.37);
      const TH =
        sn.lines.length * LH + PAD * 2 + TITLEBAR_H + TABBAR_H + STATUSBAR_H;
      const TX = width - TW - 24;
      const TY = height - TH - 24;
      const R = 10;

      // ── State machine (identical logic, new data shape) ──────────────────
      typing.cursorTimer += deltaTime;
      if (typing.cursorTimer >= 0.53) {
        typing.cursorBlink = !typing.cursorBlink;
        typing.cursorTimer = 0;
      }

      if (typing.state === "typing") {
        typing.typeAccumulator += deltaTime;
        const charDelay = 0.034;
        while (typing.typeAccumulator >= charDelay) {
          typing.typeAccumulator -= charDelay;
          const fullLine = sn.lines[typing.lineIndex].map((t) => t.v).join("");
          if (typing.charIndex < fullLine.length) {
            typing.charIndex++;
          } else if (typing.lineIndex < sn.lines.length - 1) {
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
            typing.snippetIndex =
              (typing.snippetIndex + 1) % typingSnippets.length;
            typing.lineIndex = 0;
            typing.charIndex = 0;
            typing.state = "typing";
            typing.typeAccumulator = 0;
          }
        }
      }

      // ── Draw ─────────────────────────────────────────────────────────────
      ctx.save();

      // Window shadow
      ctx.shadowBlur = 60;
      ctx.shadowColor = `rgba(0,0,0,0.5)`;
      roundRect(ctx, TX, TY, TW, TH, R);
      ctx.fillStyle = "#1e1e2e";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Window border
      roundRect(ctx, TX, TY, TW, TH, R);
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ── Title bar
      roundRect(ctx, TX, TY, TW, TITLEBAR_H, [R, R, 0, 0]);
      ctx.fillStyle = "#2d2d3f";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(TX, TY + TITLEBAR_H);
      ctx.lineTo(TX + TW, TY + TITLEBAR_H);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Traffic lights
      const dotY = TY + TITLEBAR_H / 2;
      [{ c: "#ff6058" }, { c: "#ffbd2e" }, { c: "#28ca42" }].forEach((d, i) => {
        ctx.beginPath();
        ctx.arc(TX + 14 + i * 16, dotY, 5, 0, Math.PI * 2);
        ctx.fillStyle = d.c;
        ctx.fill();
      });

      // File icon + title
      const iconX = TX + TW / 2 - 24;
      const iconY = TY + TITLEBAR_H / 2 - 8;
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

      // ── Tab bar
      const tabY = TY + TITLEBAR_H;
      ctx.fillStyle = "#1e1e2e";
      ctx.fillRect(TX, tabY, TW, TABBAR_H);
      const tabW = Math.min(140, TW * 0.38);
      ctx.fillStyle = "#2d2d3f";
      ctx.fillRect(TX, tabY, tabW, TABBAR_H);
      // Active tab top accent (language color)
      ctx.fillStyle = sn.accentColor;
      ctx.fillRect(TX, tabY, tabW, 1.5);
      // Tab dividers
      ctx.beginPath();
      ctx.moveTo(TX + tabW, tabY);
      ctx.lineTo(TX + tabW, tabY + TABBAR_H);
      ctx.moveTo(TX, tabY + TABBAR_H);
      ctx.lineTo(TX + TW, tabY + TABBAR_H);
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      // Tab label
      ctx.font = `11px 'Courier New', monospace`;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText(sn.file, TX + 11, tabY + TABBAR_H / 2 + 4);
      // Unsaved dot
      ctx.beginPath();
      ctx.arc(TX + tabW - 10, tabY + TABBAR_H / 2, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fill();

      // ── Editor body (clipped)
      const edY = tabY + TABBAR_H;
      const edH = TH - TITLEBAR_H - TABBAR_H - STATUSBAR_H;
      ctx.beginPath();
      ctx.rect(TX, edY, TW, edH);
      ctx.clip();

      ctx.fillStyle = "#1e1e2e";
      ctx.fillRect(TX, edY, TW, edH);
      // Gutter
      ctx.fillStyle = "#252535";
      ctx.fillRect(TX, edY, LNUM_W, edH);
      // Gutter right border
      ctx.beginPath();
      ctx.moveTo(TX + LNUM_W, edY);
      ctx.lineTo(TX + LNUM_W, edY + edH);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Indentation guides
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.5;
      for (let indent = 1; indent <= 4; indent++) {
        const gx = TX + LNUM_W + indent * 16;
        ctx.beginPath();
        ctx.moveTo(gx, edY);
        ctx.lineTo(gx, edY + edH);
        ctx.stroke();
      }

      // Active line highlight
      if (typing.state === "typing") {
        const alY = edY + PAD + typing.lineIndex * LH;
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.fillRect(TX + LNUM_W, alY, TW - LNUM_W - MINI_W, LH);
      }

      // Code lines
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

        // Line number
        ctx.font = `${FS - 1}px 'Courier New', monospace`;
        ctx.textAlign = "right";
        ctx.fillStyle = isCurrent
          ? "rgba(255,255,255,0.55)"
          : "rgba(255,255,255,0.2)";
        ctx.fillText(String(i + 1), TX + LNUM_W - 6, lineY);

        // Tokens with per-token syntax color
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

        // Blinking cursor
        if (isCurrent && typing.cursorBlink) {
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.shadowBlur = 8;
          ctx.shadowColor = `${sn.accentColor}bb`;
          ctx.fillRect(lineX, lineY - FS + 2, 2, FS + 1);
          ctx.shadowBlur = 0;
        }

        // Minimap bar
        if (fullLine.trim()) {
          const mmX = TX + TW - MINI_W + 5;
          const mmY =
            edY +
            PAD +
            i * ((edH - PAD * 2) / Math.max(sn.lines.length, 1)) +
            2;
          ctx.fillStyle = "rgba(255,255,255,0.06)";
          ctx.fillRect(
            mmX,
            mmY,
            Math.min(MINI_W - 8, fullLine.length * 0.75),
            2,
          );
        }
      }

      // Minimap divider
      ctx.beginPath();
      ctx.moveTo(TX + TW - MINI_W, edY);
      ctx.lineTo(TX + TW - MINI_W, edY + edH);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── Status bar (drawn outside clip so it fills the bottom)
      ctx.restore();
      ctx.save();

      const sbY = TY + TH - STATUSBAR_H;
      roundRect(ctx, TX, sbY, TW, STATUSBAR_H, [0, 0, R, R]);
      ctx.fillStyle = "#3c3c7a";
      ctx.fill();
      roundRect(ctx, TX, sbY, TW, STATUSBAR_H, [0, 0, R, R]);
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
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

    // ─── FPS + main loop (unchanged) ────────────────────────────────────────

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
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      timeRef.current += 0.005;

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "oklch(0.08 0 0)");
      gradient.addColorStop(0.5, "oklch(0.05 0 0)");
      gradient.addColorStop(1, "oklch(0.03 0 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      drawGrid();
      drawPerspectiveGrid();
      drawCurvedShape("left", 0);
      drawCurvedShape("right", Math.PI);
      drawCenterGlow();
      drawFloatingCodes(deltaTime);
      drawDataStreams();
      drawParticles();
      drawFloatingNumbers();
      drawBinaryRain();
      drawTypingTerminal(deltaTime);

      updateFPS();
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [
    colorPalette.border,
    colorPalette.chart1,
    colorPalette.chart2,
    colorPalette.chart3,
    colorPalette.chart4,
    colorPalette.chart5,
  ]);

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
