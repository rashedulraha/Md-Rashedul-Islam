import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  ExternalLink,
} from "lucide-react";

const skills = [
  { name: "React.js", color: "text-blue-400" },
  { name: "Node.js", color: "text-green-500" },
  { name: "Next.js", color: "text-white" },
  { name: "MongoDB", color: "text-emerald-500" },
  { name: "Tailwind", color: "text-cyan-400" },
  { name: "Firebase", color: "text-orange-500" },
];

export default function HeroBanner() {
  return (
    <div className="relative z-10 grid h-full w-full grid-cols-12 items-center px-10">
      {/* LEFT: Introduction Text */}
      <div className="col-span-5 space-y-6">
        <h2 className="text-primary font-mono tracking-widest">
          WELCOME TO MY WORLD
        </h2>
        <h1 className="text-6xl font-black leading-tight tracking-tighter text-white">
          I Build <span className="text-primary">Scalable</span> <br /> Web
          Solutions
        </h1>
        <p className="max-w-md text-muted-foreground text-lg">
          Expert in MERN Stack and Modern UI/UX. Turning complex problems into
          simple, beautiful digital experiences.
        </p>
        <div className="flex gap-4">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold hover:opacity-90 transition-all">
            Download CV
          </button>
        </div>
      </div>

      {/* MIDDLE: Skills Visualizer (Matching your image) */}
      <div className="col-span-6 flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group relative flex items-center gap-3 bg-secondary/30 border border-border/50 p-4 rounded-xl backdrop-blur-sm hover:border-primary/50 transition-all">
            <div className={`h-3 w-3 rounded-full bg-current ${skill.color}`} />
            <span className="font-bold text-foreground tracking-wide uppercase text-sm">
              {skill.name}
            </span>
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* RIGHT: Vertical Social Media Bar */}
      <div className="col-span-1 flex flex-col items-center gap-8 border-l border-border/30 py-10">
        <p className="rotate-90 text-xs font-mono tracking-[0.3em] text-muted-foreground mb-10">
          FOLLOW ME
        </p>
        <div className="flex flex-col gap-6">
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={24} />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter size={24} />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
