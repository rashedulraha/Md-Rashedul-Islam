import { cn } from "@/lib/utils";
import { Spotlight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { IconType } from "react-icons/lib";

export interface ctaProps {
  data: {
    title: string;
    subTitle: string;
    button1: string;
    button2: string;
    link?: string | undefined;
    icons1?: IconType;
    icons2?: IconType;
    icons3?: IconType;
  };
}

export function SpotlightPreview({ data }: ctaProps) {
  const Icon1 = data.icons1;
  const Icon2 = data.icons2;
  const Icon3 = data.icons3;

  return (
    <div className="relative flex w-full overflow-hidden rounded-md  antialiased md:items-center md:justify-center px-6 py-10 sm:px-10 sm:py-12 md:p-14">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-size-[40px_40px] select-none",
          "bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0 space-y-3 md:space-y-4">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
            {data.title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {data.subTitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            asChild
            className={cn(
              "min-w-45 transition-all duration-300",
              "hover:shadow-md hover:-translate-y-0.5",
              "active:translate-y-0 active:shadow-sm",
            )}>
            <Link to="/contact">
              {Icon1 && <Icon1 />}
              {data.button1}
              {Icon3 && <Icon3 />}
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className={cn(
              "min-w-45 group relative overflow-hidden transition-all duration-300",
              "border-border hover:border-primary/70 hover:bg-primary/5",
              "hover:shadow-sm hover:-translate-y-0.5",

              "after:absolute after:inset-0 after:rounded-md after:border after:border-primary/0 after:transition-all after:duration-300",
              "hover:after:border-primary/30 hover:after:scale-[1.02]",
            )}>
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5">
              {data.button2}
              {Icon2 && <Icon2 />}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
