import { FlipWords } from "@/components/ui/flip-words";

export function FlipWordsText() {
  const words = [
    "Next.js",
    "React.js",
    "Tailwind CSS",
    "Shadcn UI",
    "DaisyUI",
    "TypeScript",
    "Node.js",
    "Prisma",
    "PostgreSQL",
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center text-2xl md:text-4xl tracking-tight ">
        {/* Main Static Text */}
        <span className="text-foreground font-semibold">Crafting with</span>

        {/* Dynamic Words with a distinct style */}
        <FlipWords
          words={words}
          className="font-bold text-primary drop-shadow-sm"
        />
      </div>
    </div>
  );
}
