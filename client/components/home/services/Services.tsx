"use client";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import ServicesHeader from "./ServicesHeader";
import ServicesGrid from "./ServicesGrid";

export default function Services() {
  return (
    <Section
      id="services"
      className="relative overflow-hidden py-28"
    >
      <Container>
        <ServicesHeader />

        <ServicesGrid />
      </Container>
    </Section>
  );
}