
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Work from "@/components/Work";
import SkillsSection from "@/components/SkillsSection";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import CertificatesSection from "@/components/CertificatesSection";

export default function Home() {
  return (
    <>
      <div>
        <div hidden>
          {/*$*/}
          {/*/$*/}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 z-40 h-22.5 w-full select-none lg:h-25 top-0"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent)",
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        />
        <main>
          <Hero />
          <div className="container relative flex flex-col max-sm:px-1 mx-auto ">
            <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
              <div
                aria-hidden="true"
                className="w-full border-x bg-size-[5px_5px] mask-[linear-gradient(to_bottom,transparent,black_10rem)] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
              />
              <div className="relative col-span-1 min-w-0">
                <Features />
                <AboutSection />
                <SkillsSection />
                <Work />
                <Blog />
                <CertificatesSection />
                <Testimonials />
                <FAQ />
              </div>
              <div
                aria-hidden="true"
                className="w-full border-x bg-size-[5px_5px] mask-[linear-gradient(to_bottom,transparent,black_10rem)] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
              />
            </div>
          </div>
        </main>

        <div className="container relative flex flex-col max-sm:px-1 mx-auto">
          <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
            <div
              aria-hidden="true"
              className="w-full border-x bg-size-[5px_5px] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
            />
            <div className="relative col-span-1 min-w-0">
              <Contact />
            </div>
            <div
              aria-hidden="true"
              className="w-full border-x bg-size-[5px_5px] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
            />
          </div>
        </div>
        {/*/$*/}
        <Footer />
        {/*$*/}
        {/*/$*/}
        {/*$!*/}
        <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
        {/*/$*/}
      </div>
    </>
  );
}
