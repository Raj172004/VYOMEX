"use client";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import WhyChooseHeader from "./WhyChooseHeader";
import WhyChooseGrid from "./WhyChooseGrid";

export default function WhyChoose() {
  return (
    <Section
      id="why-choose"
      className="relative overflow-hidden py-28"
    >
      <Container>
        <WhyChooseHeader />

        <WhyChooseGrid />
      </Container>
    </Section>
  );
}