"use client";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import ProcessHeader from "./ProcessHeader";
import ProcessTimeline from "./ProcessTimeline";

export default function Process() {
  return (
    <Section
      id="process"
      className="relative py-28"
    >
      <Container>
        <ProcessHeader />

        <ProcessTimeline />
      </Container>
    </Section>
  );
}