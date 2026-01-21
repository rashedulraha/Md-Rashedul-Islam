import Animation from "@/components/Animation/Animation";
import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Animation />
      <Navbar />

      <main className="relative z-10 h-full flex items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroBanner />
        </div>
      </main>
    </div>
  );
};

export default Home;
