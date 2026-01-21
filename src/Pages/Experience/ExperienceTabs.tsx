import { motion } from "framer-motion";

interface ExperienceTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ExperienceTabs({
  activeTab,
  setActiveTab,
}: ExperienceTabsProps) {
  const tabs = ["Timeline", "Expertise", "Testimonials"];

  return (
    <div className="sticky top-20 z-20 mb-12 py-2 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-1 p-1 bg-muted/20 border border-border/40 rounded-2xl w-fit overflow-x-auto no-scrollbar max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 sm:px-8 py-2 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all relative ${
              activeTab === tab
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}>
            {activeTab === tab && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-primary rounded-xl z-0 shadow-lg shadow-primary/20"
                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 uppercase tracking-widest">
              {tab}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
