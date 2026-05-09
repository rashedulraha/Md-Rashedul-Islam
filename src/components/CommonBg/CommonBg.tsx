import { motion } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

/* ─── single floating orb ─── */
function Orb({
  size,
  style,
  duration,
  delay = 0,
}: {
  size: number;
  style: React.CSSProperties;
  duration: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, ...style }}
      animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ─── looping scan line ─── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
      }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─── floating particle ─── */
function Particle({
  x,
  y,
  size,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: "rgba(255,255,255,0.06)",
      }}
      animate={{ y: [0, -22, 0], opacity: [0.06, 0.22, 0.06] }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── HUD corner bracket ─── */
function Corner({
  position,
  top,
  right,
  bottom,
  left,
}: {
  position: string;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
}) {
  return (
    <div
      className={`absolute w-10 h-10 pointer-events-none ${position}`}
      style={{
        borderTop: top ? "1.5px solid rgba(255,255,255,0.07)" : "none",
        borderBottom: bottom ? "1.5px solid rgba(255,255,255,0.07)" : "none",
        borderLeft: left ? "1.5px solid rgba(255,255,255,0.07)" : "none",
        borderRight: right ? "1.5px solid rgba(255,255,255,0.07)" : "none",
      }}
    />
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function CommonBg() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 65, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 65, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const particles = [
    { x: "8%", y: "18%", size: 3, delay: 0.0 },
    { x: "22%", y: "65%", size: 2, delay: 1.2 },
    { x: "78%", y: "12%", size: 4, delay: 0.4 },
    { x: "62%", y: "72%", size: 2, delay: 2.1 },
    { x: "45%", y: "88%", size: 3, delay: 1.7 },
    { x: "91%", y: "42%", size: 2, delay: 0.9 },
    { x: "14%", y: "78%", size: 3, delay: 3.0 },
    { x: "54%", y: "28%", size: 2, delay: 0.6 },
    { x: "34%", y: "8%", size: 4, delay: 2.5 },
    { x: "73%", y: "92%", size: 2, delay: 1.4 },
    { x: "88%", y: "60%", size: 3, delay: 3.3 },
    { x: "5%", y: "50%", size: 2, delay: 2.0 },
  ];

  return (
    <>
      {/* ── fixed background layer ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-foreground/[0.04]" />

        {/* aurora orbs */}
        <Orb
          size={560}
          duration={22}
          delay={0}
          style={{
            top: "15%",
            left: "8%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <Orb
          size={480}
          duration={27}
          delay={4}
          style={{
            bottom: "10%",
            right: "6%",
            background:
              "radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <Orb
          size={640}
          duration={32}
          delay={2}
          style={{
            top: "40%",
            left: "35%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--foreground) 0.7px, transparent 0.7px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* square grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* scan line */}
        <ScanLine />

        {/* particles */}
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* HUD corners */}
        <Corner position="top-6 left-6" top left />
        <Corner position="top-6 right-6" top right />
        <Corner position="bottom-6 left-6" bottom left />
        <Corner position="bottom-6 right-6" bottom right />

        {/* horizontal accent lines */}
        {["20%", "80%"].map((top, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              top,
              background:
                "linear-gradient(to right, transparent 5%, rgba(255,255,255,0.025) 30%, rgba(255,255,255,0.025) 70%, transparent 95%)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.5 }}
          />
        ))}
      </div>

      {/* ── mouse spotlight — tracks globally ── */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.05), transparent 50%)`,
        }}
      />
    </>
  );
}
