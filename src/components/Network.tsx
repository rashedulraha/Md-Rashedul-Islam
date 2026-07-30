import React from "react";
import { WorldMapNetwork } from "./WorldMapNetwork";

const Network = () => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 h-full">
      <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 h-full min-h-72 card-premium">
        <WorldMapNetwork />
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 absolute top-0 left-0 text-left">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            FLEXIBLE WITH TIMEZONES
          </p>
          <h3 className="text-sm sm:text-base md:text-lg font-roboto font-medium text-foreground tracking-normal leading-snug">
            Based in Bangladesh, available globally
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Network;
