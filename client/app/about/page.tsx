import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/Footer";

import AboutHero from "@/components/about/hero/AboutHero";
import Story from "@/components/about/story/Story";
import Mission from "@/components/about/mission/Mission";
import Values from "@/components/about/values/Values";
import Timeline from "@/components/about/timeline/Timeline";
import Achievements from "@/components/about/achievements/Achievements";
import Technologies from "@/components/about/technologies/Technologies";
import AboutCTA from "@/components/about/cta/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <AboutHero />

        <Story />

        <Mission />

        <Values />

        <Timeline />

        <Achievements />

        <Technologies />

        <AboutCTA />
      </main>

      <Footer />
    </>
  );
}