import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";

import StatCard from "./StatCard";

export default function Stats() {
  return (
    <Section background="muted">

      <Container>

        <Heading
          badge="OUR ACHIEVEMENTS"
          title="Numbers That Reflect Our Commitment"
          subtitle="Every project is built with quality, performance and long-term business value."
        />

        <div className="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard index={0} />

          <StatCard index={1} />

          <StatCard index={2} />

          <StatCard index={3} />

        </div>

      </Container>

    </Section>
  );
}