import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiFirebase,
  SiDocker,
  SiNginx,
  SiGit,
  SiC,
  SiCplusplus,
  SiThealgorithms,
  SiHackerrank,
  SiFastapi,
  SiCodeforces,
} from "react-icons/si";

const TechMarquee: React.FC = () => {
  const technologies = [
    {
      name: "JavaScript",
      icon: <SiJavascript />,
      brandColor: "#F7DF1E",
      hoverColor: "hover:text-[#F7DF1E]",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript />,
      brandColor: "#3178C6",
      hoverColor: "hover:text-[#3178C6]",
    },
    {
      name: "React.js",
      icon: <SiReact />,
      brandColor: "#61DAFB",
      hoverColor: "hover:text-[#61DAFB]",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs />,
      brandColor: "#FFFFFF",
      hoverColor: "hover:text-white dark:hover:text-white",
    },
    {
      name: "Tailwind",
      icon: <SiTailwindcss />,
      brandColor: "#06B6D4",
      hoverColor: "hover:text-[#06B6D4]",
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs />,
      brandColor: "#339933",
      hoverColor: "hover:text-[#339933]",
    },
    {
      name: "MongoDB",
      icon: <SiMongodb />,
      brandColor: "#47A248",
      hoverColor: "hover:text-[#47A248]",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
      brandColor: "#4169E1",
      hoverColor: "hover:text-[#4169E1]",
    },
    {
      name: "Prisma",
      icon: <SiPrisma />,
      brandColor: "#2D3748",
      hoverColor: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "Firebase",
      icon: <SiFirebase />,
      brandColor: "#FFCA28",
      hoverColor: "hover:text-[#FFCA28]",
    },
    {
      name: "Docker",
      icon: <SiDocker />,
      brandColor: "#2496ED",
      hoverColor: "hover:text-[#2496ED]",
    },
    {
      name: "Nginx",
      icon: <SiNginx />,
      brandColor: "#009639",
      hoverColor: "hover:text-[#009639]",
    },
    {
      name: "Git",
      icon: <SiGit />,
      brandColor: "#F05032",
      hoverColor: "hover:text-[#F05032]",
    },
    {
      name: "C",
      icon: <SiC />,
      brandColor: "#A8B9CC",
      hoverColor: "hover:text-[#A8B9CC]",
    },
    {
      name: "C++",
      icon: <SiCplusplus />,
      brandColor: "#00599C",
      hoverColor: "hover:text-[#00599C]",
    },
    {
      name: "Data Structures",
      icon: <SiCodeforces />,
      brandColor: "#A020F0",
      hoverColor: "hover:text-purple-500",
    },
    {
      name: "Algorithms",
      icon: <SiThealgorithms />,
      brandColor: "#FF8C00",
      hoverColor: "hover:text-orange-500",
    },
    {
      name: "Problem Solving",
      icon: <SiHackerrank />,
      brandColor: "#00EA64",
      hoverColor: "hover:text-green-500",
    },
    {
      name: "REST API",
      icon: <SiFastapi />,
      brandColor: "#009688",
      hoverColor: "hover:text-teal-500",
    },
  ];

  // Duplicate array for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className="w-full overflow-hidden transition-colors duration-300">
      <div
        className="relative flex items-center py-8 md:py-12"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}>
        <motion.div
          className="flex flex-nowrap gap-12 md:gap-16 py-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: "paused" }}>
          {duplicatedTech.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className={`flex items-center gap-3 text-base md:text-xl font-bold transition-all duration-300 cursor-pointer group ${tech.hoverColor}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}>
              <span className="text-2xl md:text-4xl text-gray-800 dark:text-gray-200 group-hover:text-inherit transition-colors duration-300">
                {tech.icon}
              </span>
              <span className="tracking-tighter whitespace-nowrap text-gray-700 dark:text-gray-300 group-hover:text-inherit transition-colors duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;
