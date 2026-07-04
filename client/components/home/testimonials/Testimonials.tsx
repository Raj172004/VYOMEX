import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

import { testimonials } from "@/data/testimonials";

import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <Section background="muted" data-aos="fade-up">

      <Container>

        <Heading
          badge="CLIENT REVIEWS"
          title="Trusted By Businesses Around The World"
          subtitle="Long-term partnerships built on quality engineering, transparency and measurable business results."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((testimonial) => (

            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
            />

          ))}

        </div>

      </Container>

    </Section>
  );
}