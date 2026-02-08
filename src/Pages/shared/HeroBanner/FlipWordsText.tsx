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
    <div>
      <div className="text-muted-foreground italic font-serif lowercase font-light flex items-center">
        Build
        <FlipWords words={words} />
      </div>
    </div>
  );
}
