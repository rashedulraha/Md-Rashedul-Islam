import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";
import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";
import ProjectDialog from "../shared/ProjectModal/ProjectDialog";
import myProjectDetails from "./Data/ProjectData";

const Home = () => {
  const [showProjectDialog, setShowProjectDialog] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("hasVisitedHome");

    if (!visited) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowProjectDialog(true);
      localStorage.setItem("hasVisitedHome", "true");
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatedGridBackground />
      <Navbar />

      <main className="relative z-10 h-full flex md:items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroBanner />

          {showProjectDialog && (
            <div className="flex justify-center">
              <ProjectDialog projectData={myProjectDetails} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
