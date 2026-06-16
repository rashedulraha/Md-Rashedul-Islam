"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";
import Responsive from "../Responsive/Responsive";
import { GridBackground } from "@/components/GridBackground";

const Home: React.FC = () => {
  const router = useRouter();
  const triggeredRef = useRef<boolean>(false);

  useEffect(() => {
    // Desktop scroll (wheel)
    const handleWheel = (e: WheelEvent) => {
      if (!triggeredRef.current && e.deltaY > 0) {
        triggeredRef.current = true;
        router.push("/quick-view");
      }
    };

    // Mobile touch
    let startY: number = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;

      if (!triggeredRef.current && startY > endY) {
        triggeredRef.current = true;
        router.push("/quick-view");
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />

      <GridBackground />

      {/* <main className="relative z-10 h-full flex md:items-end justify-center">
        <div className="w-full">
          <Responsive>
            <div className="py-5 md:my-10">
              <HeroBanner />
            </div>
          </Responsive>
        </div>
      </main> */}
    </div>
  );
};

export default Home;
