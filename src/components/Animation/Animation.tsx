const Animation = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[oklch(0.145_0_0)]">
      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Dynamic Glows matching the image colors */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px] animate-pulse delay-700" />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
    </div>
  );
};

export default Animation;
