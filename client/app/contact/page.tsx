import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/Footer";

import ContactHero from "@/components/contact/hero/ContactHero";
import ContactForm from "@/components/contact/form/ContactForm";
import ContactInfo from "@/components/contact/info/ContactInfo";
import OfficeMap from "@/components/contact/map/OfficeMap";
import ContactFAQ from "@/components/contact/faq/ContactFAQ";
import ContactCTA from "@/components/contact/cta/ContactCTA";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <ContactHero />

        <ContactForm />

        <ContactInfo />

        <OfficeMap />

        <ContactFAQ />

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}