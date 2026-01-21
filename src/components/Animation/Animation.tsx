import { useState, useEffect, useRef } from "react";
import { AnimationComponentTypes } from "@/Data/AnimationComponentData/AnimationComponentData";
import type { MousePosition, Particle, TechItem } from "./types";
import BackgroundLayers from "./BackgroundLayers";
import GridLines from "./GridLines";
import GeometricPatterns from "./GeometricPatterns";
import FloatingElements from "./FloatingElements";
import Effects from "./Effects";
import "./animations.css";

const Animation: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tech items from your data
  const techItems: TechItem[] = AnimationComponentTypes as TechItem[];

  // Check for user's motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Generate particles on mount
  useEffect(() => {
    const generatedParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 15 + 10,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generatedParticles);
  }, []);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden ${
        reducedMotion ? "animation-reduced-motion" : ""
      }`}>
      {/* Background Layers */}
      <BackgroundLayers reducedMotion={reducedMotion} />

      {/* Grid Lines (Enhanced Visibility) */}
      <GridLines />

      {/* Geometric Patterns */}
      <GeometricPatterns reducedMotion={reducedMotion} />

      {/* Floating Elements */}
      <FloatingElements
        reducedMotion={reducedMotion}
        mousePosition={mousePosition}
        techItems={techItems}
      />

      {/* Effects */}
      <Effects reducedMotion={reducedMotion} particles={particles} />
    </div>
  );
};

export default Animation;
