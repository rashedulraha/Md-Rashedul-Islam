const Animation = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      {/* 1. Technical Grid with Moving Effect */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), 
                            linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* 2. Moving Grid Overlay (Animate-Grid-Move apply kora) */}
      <div className="absolute inset-0 animate-grid-move opacity-[0.05] dark:opacity-[0.1] bg-[grid-size:50px_50px]" />

      {/* 3. Radial Gradient "Flashlight" Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,var(--background)_100%)]" />

      {/* 4. High-Tech Floating Orbs (Better Glow) */}
      <div className="absolute -top-[10%] -left-[10%] h-100 w-100 rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-[10%] -right-[10%] h-100 w-100 rounded-full bg-primary/10 blur-[120px] animate-pulse-slow [animation-delay:5s]" />

      {/* 5. Precision Beams (Faster & Sharper) */}
      <div className="absolute top-0 left-[20%] h-px w-[30%] bg-linear-to-r from-transparent via-primary/40 to-transparent animate-move-beam" />
      <div className="absolute bottom-[20%] right-0 h-px w-[20%] bg-linear-to-r from-transparent via-primary/30 to-transparent animate-move-beam [animation-delay:7s]" />
      <div className="absolute top-[40%] left-0 h-px w-[15%] bg-linear-to-r from-transparent via-primary/20 to-transparent animate-move-beam [animation-delay:3s]" />

      {/* 6. Dynamic Particles (Smaller & Realistic) */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/40 animate-particle-float"
          style={{
            // eslint-disable-next-line react-hooks/purity
            top: `${Math.random() * 100}%`,
            // eslint-disable-next-line react-hooks/purity
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${8 + i}s`,
          }}
        />
      ))}

      {/* 7. Corner Accents with Sharp Lines */}
      <div className="absolute inset-6 border border-primary/5 pointer-events-none">
        <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-primary/30" />
        <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-primary/30" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/30" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/30" />
      </div>
    </div>
  );
};

export default Animation;
