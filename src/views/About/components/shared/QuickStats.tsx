// QuickStats.tsx (if needed)
export default function QuickStats() {
  return (
    <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8">
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          5+
        </div>
        <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium">
          Years Exp
        </div>
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          50+
        </div>
        <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium">
          Projects
        </div>
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          100+
        </div>
        <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium">
          Clients
        </div>
      </div>
    </div>
  );
}
