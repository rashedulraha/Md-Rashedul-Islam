import Animation from "@/components/Animation/Animation";
import Navbar from "../shared/Navbar/Navbar";
import HeroBanner from "../shared/HeroBanner/HeroBanner";

const Home = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
      <Animation />
      <Navbar />
      <div className="relative z-10 h-full w-full flex items-center justify-center pt-16">
        <HeroBanner />
      </div>
    </div>
  );
};

export default Home;
