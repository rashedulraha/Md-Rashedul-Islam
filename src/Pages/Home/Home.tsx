// src/pages/Home.tsx (or your main page file)

import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";
import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";
import ProjectDialog from "../shared/ProjectModal/ProjectDialog";
import myProjectDetails from "./Data/ProjectData";

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatedGridBackground />
      <Navbar />

      <main className="relative z-10 h-full flex md:items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroBanner />

          <div className="flex justify-center mt-8">
            <ProjectDialog projectData={myProjectDetails} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
