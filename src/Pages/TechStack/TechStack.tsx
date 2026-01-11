import { techData } from "@/Data/TechStack/TechStack";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import { useLenis } from "@/Hooks/useLenis";

const stacks = techData;

export default function TechStack() {
  //! awesome animation scroll
  useLenis();

  // Function to generate random percentage between 80-85%
  const getRandomPercentage = () => {
    // eslint-disable-next-line react-hooks/purity
    return Math.floor(Math.random() * 6) + 80; // 80 to 85
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden flex items-center justify-center">
      <Navbar />

      {/* Background Animation remains fixed */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-5xl w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 opacity-0 animate-fade-in">
            <h2 className="text-primary font-mono tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-3">
              Technical Inventory
            </h2>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight">
              My <span className="text-primary">Tech</span> Ecosystem
            </h1>
          </div>

          {/* Stacks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {stacks.map((group, idx) => {
              // Generate random percentages for each skill in this group
              const skillPercentages = group.skills.map(() =>
                getRandomPercentage()
              );

              return (
                <div
                  key={group.category}
                  className="space-y-4 sm:space-y-6 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-primary/40" />
                    <h3 className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                      {group.category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {group.skills.map((skill, skillIdx) => {
                      const percentage = skillPercentages[skillIdx];

                      return (
                        <div
                          key={skill.name}
                          className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-lg sm:rounded-xl border border-border/40 bg-card/10 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-1 shadow-sm hover:shadow-md">
                          <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                            {skill.icon}
                          </div>

                          <span className="text-[10px] sm:text-xs font-bold text-muted-foreground group-hover:text-primary uppercase tracking-tight transition-colors text-center mb-2">
                            {skill.name}
                          </span>

                          {/* Progress Bar */}
                          <div className="w-full">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[8px] sm:text-[9px] font-bold text-primary">
                                Proficiency
                              </span>
                              <span className="text-[9px] sm:text-[10px] font-bold text-primary">
                                {percentage}%
                              </span>
                            </div>

                            <div className="w-full h-1.5 sm:h-2 bg-muted/30 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${percentage}%`,
                                  animation: `fillProgress 1s ease-out forwards`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional info section */}
          <div
            className="mt-16 sm:mt-20 text-center opacity-0 animate-fade-in"
            style={{ animationDelay: "450ms" }}>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Continuously expanding my technical knowledge and staying
              up-to-date with the latest technologies to build efficient,
              scalable, and user-friendly applications.
            </p>
            <div className="mt-6 flex justify-center gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  2+
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Years Experience
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  20+
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Projects Completed
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  12+
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS for progress bar animation */}
      <style>{`
        @keyframes fillProgress {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
      `}</style>
    </div>
  );
}
