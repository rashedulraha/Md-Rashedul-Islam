"use client";

import Network from "./Network";
import SoundCard from "./SoundCard";
import TechStack from "./tech_stack";
import Usesd from "./Usesd";

import ServicesCarousel from "./ServicesCarousel";

export default function Features() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 auto-rows-fr">
          {/* First part  */}
          <SoundCard />
          {/* second part */}
          <div className="col-span-12 lg:col-span-5 flex h-full">
            <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl h-full min-h-72 card-premium">
              <TechStack />
            </div>
          </div>
          <ServicesCarousel />
          <Network />
          <Usesd />
        </div>
      </div>
    </section>
  );
}
