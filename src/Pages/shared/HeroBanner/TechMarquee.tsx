import React from "react";

const TechMarquee: React.FC = () => {
  // All technologies from your image
  const technologies = [
    "JavaScript",
    "TypeScript",
    "Go",
    "React.js",
    "Next.js",
    "Tailwind",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Firebase",
    "Docker",
    "Nginx",
    "Git",
  ];

  return (
    <div className="pt-5 w-full animate-in fade-in duration-1000 delay-500">
      <div
        className="relative flex overflow-hidden select-none"
        style={{
          // This creates the transparent fade on both sides
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}>
        {/* We use two sets of the list to make the animation infinite */}
        <div className="flex flex-nowrap shrink-0 items-center justify-around gap-12 py-4 animate-marquee">
          {technologies.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="inline-block text-base md:text-xl font-black text-foreground tracking-tighter opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default">
              {tech}
            </span>
          ))}
        </div>

        {/* Duplicate list for seamless loop */}
        <div
          className="flex flex-nowrap shrink-0 items-center justify-around gap-12 py-4 animate-marquee"
          aria-hidden="true">
          {technologies.map((tech, index) => (
            <span
              key={`dup-${tech}-${index}`}
              className="inline-block text-base md:text-xl font-black text-foreground tracking-tighter opacity-50 hover:opacity-100 transition-opacity duration-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
