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

export default function HomePage() {
  return (
    <>
      <Navbar />

      <Hero />

      <TrustedCompanies />

      <Stats />

      <Services />

      <Process />

      <WhyChoose />

      <Portfolio />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </>
  );
}