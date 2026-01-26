"use client";

import { PinContainer } from "@/components/ui/3d-pin";

export function AnimatedPinDemo() {
  return (
    <div className="w-full flex items-center justify-center bg-background py-20">
      <PinContainer
        title="This is my running project using next js"
        href="https://koda-rashed.vercel.app">
        <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-[22rem] h-auto min-h-[25rem] bg-card text-card-foreground rounded-xl border border-border">
          <h3 className="max-w-xs pb-2 font-bold text-base md:text-lg text-foreground">
            Running project
          </h3>

          <div className="text-base font-normal">
            <span className="text-muted-foreground text-sm font-inter lowercase font-medium">
              A minimalist, high-performance project management tool inspired by
              Linear. Engineered for speed with Next.js, TypeScript, Tailwind,
              and Real-time sync.
            </span>
          </div>

          {/* Image Container with Padding */}
          <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden bg-muted/20 p-1 flex-col ">
            <img
              src="/koda.png"
              alt="project preview"
              className="w-full h-full object-cover rounded-md"
              style={{ width: "100%", display: "block" }}
            />
            <div className="mt-3">
              <p>
                Solo-developed during my learning journey to master
                high-performance web development and clean architecture
              </p>
            </div>
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
