import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiGo,
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
} from "react-icons/si";

const TechMarquee: React.FC = () => {
  const technologies = [
    {
      name: "JavaScript",
      icon: <SiJavascript />,
      color: "hover:text-[#F7DF1E]",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript />,
      color: "hover:text-[#3178C6]",
    },
    { name: "Golang", icon: <SiGo />, color: "hover:text-[#00ADD8]" },
    { name: "React.js", icon: <SiReact />, color: "hover:text-[#61DAFB]" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "hover:text-foreground" },
    {
      name: "Tailwind",
      icon: <SiTailwindcss />,
      color: "hover:text-[#06B6D4]",
    },
    { name: "Node.js", icon: <SiNodedotjs />, color: "hover:text-[#339933]" },
    { name: "MongoDB", icon: <SiMongodb />, color: "hover:text-[#47A248]" },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
      color: "hover:text-[#4169E1]",
    },
    { name: "Prisma", icon: <SiPrisma />, color: "hover:text-[#2D3748]" },
    { name: "Firebase", icon: <SiFirebase />, color: "hover:text-[#FFCA28]" },
    { name: "Docker", icon: <SiDocker />, color: "hover:text-[#2496ED]" },
    { name: "Nginx", icon: <SiNginx />, color: "hover:text-[#009639]" },
    { name: "Git", icon: <SiGit />, color: "hover:text-[#F05032]" },
  ];

  // We duplicate the array to ensure there's no gap during the loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className="pt-10 w-full overflow-hidden">
      <div
        className="relative flex items-center"
        style={{
          // Creates the transparent fade on both sides
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}>
        <motion.div
          className="flex flex-nowrap gap-12 py-4"
          animate={{
            x: ["0%", "-50%"], // Move from start to halfway (since it's duplicated)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25, // Adjust speed (higher = slower)
              ease: "linear",
            },
          }}
          // Pause animation on hover
          whileHover={{ animationPlayState: "paused" }}>
          {duplicatedTech.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className={`flex items-center gap-3 text-base md:text-xl font-bold text-foreground/50 transition-all duration-300 ${tech.color} hover:scale-110 cursor-pointer`}>
              <span className="text-2xl md:text-4xl">{tech.icon}</span>
              <span className="tracking-tighter whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;
