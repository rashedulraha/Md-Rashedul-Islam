const Animation = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[oklch(0.145_0_0)]">
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[60px_60px] animate-grid-move" />

      {/* Subtle Floating Orbs */}
      <div className="absolute top-1/3 left-1/4 h-32 w-32 rounded-full bg-[oklch(0.985_0_0/0.03)] blur-[100px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 h-24 w-24 rounded-full bg-[oklch(0.985_0_0/0.03)] blur-[100px] animate-float animation-delay-3000" />

      {/* Moving Light Beams */}
      <div className="absolute top-0 left-1/4 h-0.5 w-1/4 bg-linear-to-r from-transparent via-[oklch(0.985_0_0/0.1)] to-transparent animate-move-beam" />
      <div className="absolute bottom-0 right-1/4 h-0.5 w-1/4 bg-linear-to-r from-transparent via-[oklch(0.985_0_0/0.1)] to-transparent animate-move-beam animation-delay-5000" />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[oklch(0.145_0_0/0.4)] to-[oklch(0.145_0_0)] animate-pulse-slow" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 h-16 w-16 border-l border-t border-[oklch(0.985_0_0/0.1)] animate-fade-in-out" />
      <div className="absolute top-0 right-0 h-16 w-16 border-r border-t border-[oklch(0.985_0_0/0.1)] animate-fade-in-out animation-delay-1000" />
      <div className="absolute bottom-0 left-0 h-16 w-16 border-l border-b border-[oklch(0.985_0_0/0.1)] animate-fade-in-out animation-delay-2000" />
      <div className="absolute bottom-0 right-0 h-16 w-16 border-r border-b border-[oklch(0.985_0_0/0.1)] animate-fade-in-out animation-delay-3000" />

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/3 h-1 w-1 rounded-full bg-[oklch(0.985_0_0/0.2)] animate-particle-float" />
      <div className="absolute top-1/2 right-1/3 h-1 w-1 rounded-full bg-[oklch(0.985_0_0/0.2)] animate-particle-float animation-delay-2000" />
      <div className="absolute bottom-1/4 left-2/3 h-1 w-1 rounded-full bg-[oklch(0.985_0_0/0.2)] animate-particle-float animation-delay-4000" />
    </div>
  );
};

export default Animation;
