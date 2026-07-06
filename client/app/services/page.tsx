import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/Footer";

import ServicesHero from "@/components/services/hero/ServicesHero";
import ServicesGrid from "@/components/services/grid/ServicesGrid";
import ServiceProcess from "@/components/services/process/ServiceProcess";
import ServiceTechnologies from "@/components/services/technologies/ServiceTechnologies";
import ServiceBenefits from "@/components/services/benefits/ServiceBenefits";
import ServicePricing from "@/components/services/pricing/ServicePricing";
import ServiceFAQ from "@/components/services/faq/ServiceFAQ";
import ServiceCTA from "@/components/services/cta/ServiceCTA";

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <ServicesHero />

        <ServicesGrid />

        <ServiceProcess />

        <ServiceTechnologies />

        <ServiceBenefits />

        <ServicePricing />

        <ServiceFAQ />

        <ServiceCTA />
      </main>

      <Footer />
    </>
  );
}