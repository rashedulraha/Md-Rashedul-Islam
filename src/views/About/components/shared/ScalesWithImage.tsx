"use client";

import { Scales } from "@/components/ui/scales";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ScalesWithContentProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  scaleSize?: number;
}

export function ScalesWithContent({
  children,
  className = "",
  containerClassName = "",
  scaleSize = 8,
}: ScalesWithContentProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full items-center justify-center overflow-hidden py-10 md:py-20",
        containerClassName,
      )}>
      <div
        className={cn(
          "relative rounded-lg bg-muted/50 dark:bg-muted/30",
          className,
        )}>
        {/* Left Scale */}
        <div className="absolute -inset-y-[30%] -left-10 h-[160%] w-8 mask-t-from-90% mask-b-from-90%">
          <Scales size={scaleSize} className="rounded-lg" />
        </div>

        {/* Right Scale */}
        <div className="absolute -inset-y-[30%] -right-10 h-[160%] w-8 mask-t-from-90% mask-b-from-90%">
          <Scales size={scaleSize} className="rounded-lg" />
        </div>

        {/* Top Scale */}
        <div className="absolute -inset-x-[30%] -top-10 h-8 w-[160%] mask-r-from-90% mask-l-from-90%">
          <Scales size={scaleSize} className="rounded-lg" />
        </div>

        {/* Bottom Scale */}
        <div className="absolute -inset-x-[30%] -bottom-10 h-8 w-[160%] mask-r-from-90% mask-l-from-90%">
          <Scales size={scaleSize} className="rounded-lg" />
        </div>

        {/* Content Container - Using shadcn Card */}
        <Card className="relative z-10 h-full w-full overflow-hidden rounded-none shadow-sm ring-1 shadow-black/10 ring-black/5 dark:shadow-white/5 dark:ring-white/10">
          {children}
        </Card>
      </div>
    </div>
  );
}

// Fixed Image Demo - Using public directory
export function ScalesWithImageDemo() {
  return (
    <ScalesWithContent className="h-72 w-72">
      <div className="relative h-full w-full">
        <Image
          src="/Rashedul.jpeg"
          alt="Portrait"
          fill
          className="object-cover filter"
          priority
        />
      </div>
    </ScalesWithContent>
  );
}

// Rest of your examples remain the same...
export function ScalesWithVideo() {
  return (
    <ScalesWithContent className="h-80 w-96">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover">
        <source src="/your-video-url.mp4" type="video/mp4" />
      </video>
    </ScalesWithContent>
  );
}

export function ScalesWithText() {
  return (
    <ScalesWithContent className="h-64 w-80">
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
        <h3 className="text-2xl font-bold mb-2 text-foreground">
          Your Content
        </h3>
        <p className="text-muted-foreground">Add any React component here</p>
      </div>
    </ScalesWithContent>
  );
}

export function ScalesWithCustomComponent() {
  return (
    <ScalesWithContent className="h-96 w-80">
      <div className="relative h-full w-full p-4">
        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="bg-primary/10 rounded-lg" />
          <div className="bg-secondary/10 rounded-lg" />
          <div className="bg-accent/10 rounded-lg col-span-2" />
        </div>
      </div>
    </ScalesWithContent>
  );
}

export function ScalesResponsive() {
  return (
    <ScalesWithContent className="h-64 w-64 md:h-80 md:w-72 lg:h-96 lg:w-80">
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <span className="text-center font-bold text-foreground">
          Responsive Content
        </span>
      </div>
    </ScalesWithContent>
  );
}
