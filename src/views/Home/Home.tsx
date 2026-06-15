"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";

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
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Navbar />

      <main className="relative z-10 h-full flex md:items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroBanner />
        </div>
      </main>
    </div>
  );
};

export default Home;
