import { PinContainer } from "@/components/ui/3d-pin";

export function AnimatedPinDemo() {
  return (
    <div className="w-full flex items-center justify-center bg-background py-20">
      <PinContainer
        title="Visit Live Site"
        href="https://koda-rashed.vercel.app">
        <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-88 h-auto bg-card text-card-foreground rounded-xl border border-border">
          {/* Main Title - Bolder & Clear */}
          <h3 className="max-w-xs font-bold text-xl text-foreground">
            Running Project
          </h3>

          {/* Primary Description - Balanced Size */}
          <div className="mt-2">
            <p className="text-muted-foreground text-[14px] leading-relaxed font-medium">
              A minimalist, high-performance project management tool inspired by
              Linear. Engineered for speed with Next.js, TypeScript, and
              Tailwind.
            </p>
          </div>

          {/* Image and Solo Note Container */}
          <div className="mt-4 w-full flex flex-col">
            {/* Image Box */}
            <div className="w-full rounded-lg overflow-hidden bg-muted/20 p-1 border border-border/50">
              <img
                src="/koda.png"
                alt="project preview"
                className="w-full aspect-video object-cover rounded-md"
              />
            </div>

            {/* Solo Note - Smaller & Subtle */}
            <div className="mt-3 px-1">
              <p className="text-[12px] text-muted-foreground/80 italic leading-snug">
                Solo-developed during my learning journey to master
                high-performance web development and clean architecture.
              </p>
            </div>
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
