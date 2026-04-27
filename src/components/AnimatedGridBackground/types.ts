export interface ParticleConfig {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export interface BinaryStream {
  x: number;
  speed: number;
  chars: string[];
  charHeight: number;
  opacity: number;
  offset: number;
}

export interface FloatingCode {
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

export interface TypingState {
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

export interface Token {
  c: string;
  v: string;
}
