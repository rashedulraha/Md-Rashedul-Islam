import { motion } from "framer-motion";

import { User, Briefcase, Code, GraduationCap, Star } from "lucide-react";
import type { TabConfig } from "../types";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs: TabConfig[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <User className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: <Star className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
];

export default function NavigationTabs({
  activeTab,
  setActiveTab,
}: NavigationTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-10 sm:mb-12 lg:mb-16">
      <div className="relative w-full overflow-x-auto scrollbar-hide pb-2">
        <div className="flex items-center gap-1 sm:gap-2 p-1 bg-muted/20 border border-border/40 rounded-xl sm:rounded-2xl w-fit min-w-full sm:min-w-0 mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-primary rounded-lg sm:rounded-xl z-0 shadow-lg shadow-primary/20"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                {tab.icon}
                <span className="hidden xs:inline">{tab.label}</span>
                <span className="xs:hidden">{tab.label.slice(0, 3)}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
