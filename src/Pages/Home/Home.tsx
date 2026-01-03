import Animation from "@/components/Animation/Animation";
import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";

const Home = () => {
  return (
    <div className="relative min-h-screen lg:h-screen w-full overflow-y-auto lg:overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
      <Animation />
      <Navbar />

      <main className="relative z-10 min-h-[calc(100vh-64px)] w-full flex items-center justify-center pt-16 px-4">
        <HeroBanner />
      </main>
    </div>
  );
};

export default Home;
