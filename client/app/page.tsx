import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/Footer";

import Hero from "@/components/home/hero/Hero";
import TrustedCompanies from "@/components/home/trusted-companies/TrustedCompanies";
import Stats from "@/components/home/stats/Stats";
import Services from "@/components/home/services/Services";
import Process from "@/components/home/process/Process";
import WhyChoose from "@/components/home/why-choose/WhyChoose";
import Portfolio from "@/components/home/portfolio/Portfolio";
import Testimonials from "@/components/home/testimonials/Testimonials";
import FAQ from "@/components/home/faq/FAQ";
import CTA from "@/components/home/cta/CTA";

import SectionDivider from "@/components/ui/effects/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Global Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 -z-50">
          <div className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full bg-cyan-300/10 blur-[180px]" />

          <div className="absolute right-0 top-[900px] h-[700px] w-[700px] rounded-full bg-blue-400/10 blur-[200px]" />

          <div className="absolute left-1/2 top-[1900px] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[240px]" />
        </div>

        <Hero />

        <TrustedCompanies />

        <SectionDivider />

        <Stats />

        <SectionDivider />

        <Services />

        <SectionDivider />

        <Process />

        <SectionDivider />

        <WhyChoose />

        <SectionDivider />

        <Portfolio />

        <SectionDivider />

        <Testimonials />

        <SectionDivider />

        <FAQ />

        <SectionDivider />

        <CTA />
      </main>

      <Footer />
    </>
  );
}