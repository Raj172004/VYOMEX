"use client";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import PortfolioHeader from "./PortfolioHeader";
import PortfolioGrid from "./PortfolioGrid";

export default function Portfolio() {
  return (
    <Section
      id="portfolio"
      className="relative overflow-hidden py-28"
    >
      <Container>
        <PortfolioHeader />

        <PortfolioGrid />
      </Container>
    </Section>
  );
}