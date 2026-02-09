// src/pages/Home.tsx (or your main page file)

import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";
import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";
import ProjectDialog from "../shared/ProjectModal/ProjectDialog";
// Import the new ProjectDialog component

const Home = () => {
  // Your project data remains the same
  const myProjectDetails = {
    title: "E-commerce Website",
    description:
      "A modern e-commerce platform built with React and Node.js, focused on providing a seamless user experience.",
    team: "Tech Masters",
    startDate: "March, 2024",
    projectUrl: "https://github.com/yourusername/your-project-repo",
    buttonText: "Show Featured Project",
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatedGridBackground />
      <Navbar />

      <main className="relative z-10 h-full flex md:items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroBanner />

          {/* Simply drop the component here and pass the data */}
          <div className="flex justify-center mt-8">
            <ProjectDialog projectData={myProjectDetails} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
