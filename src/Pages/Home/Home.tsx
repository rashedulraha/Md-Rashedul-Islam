import { useState } from "react";
import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";
import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";
import ProjectModal from "../shared/ProjectModal/ProjectModal";
import type { ProjectDetails } from "./Types/ModalTypes";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const myProjectDetails: ProjectDetails = {
    title: "E-commerce Website",
    description:
      "This is a modern e-commerce platform built with React and Node.js. I am working on this project with the 'Tech Masters' team. Our main goal is to provide an easy and affordable online store solution for small businesses.",
    team: "Tech Masters",
    startDate: "March, 2024",
    projectUrl: "https://github.com/yourusername/your-project-repo",
    buttonText: "View Project",
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatedGridBackground />
      <Navbar />

      <main className="relative z-10 h-full flex md:items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroBanner />

          <div className="flex justify-center mt-8">
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              Show Featured Project
            </button>
          </div>
        </div>
      </main>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectData={myProjectDetails}
      />
    </div>
  );
};

export default Home;
