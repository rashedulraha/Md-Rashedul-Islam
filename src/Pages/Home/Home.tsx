import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";
import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";
import ProjectDialog from "../shared/ProjectModal/ProjectDialog";
import myProjectDetails from "./Data/ProjectData";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const triggeredRef = useRef<boolean>(false);

  useEffect(() => {
    // Desktop scroll (wheel)
    const handleWheel = (e: WheelEvent) => {
      if (!triggeredRef.current && e.deltaY > 0) {
        triggeredRef.current = true;
        navigate("/quick-view");
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
        navigate("/quick-view");
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
  }, [navigate]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatedGridBackground />
      <Navbar />

      <main className="relative z-10 h-full flex md:items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroBanner />

          <div className="flex justify-center">
            <ProjectDialog projectData={myProjectDetails} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
