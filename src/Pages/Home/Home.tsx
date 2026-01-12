import Animation from "@/components/Animation/Animation";
import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";

const Home = () => {
  return (
    <div className="relative min-h-screen lg:h-screen w-full overflow-y-auto lg:overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
      <Animation />
      <Navbar />

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 container mx-auto flex items-center justify-center min-h-screen">
        <HeroBanner />
      </main>
    </div>
  );
};

export default Home;
