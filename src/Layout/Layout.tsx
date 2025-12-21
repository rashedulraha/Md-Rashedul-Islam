import Animation from "@/components/Animation/Animation";
import HeroBanner from "@/Pages/shared/HeroBanner/HeroBanner";
import Navbar from "@/Pages/shared/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <Animation />
      <Navbar />
      <div className="h-full pt-16">
        <HeroBanner />
      </div>
    </div>
  );
};

export default Layout;
