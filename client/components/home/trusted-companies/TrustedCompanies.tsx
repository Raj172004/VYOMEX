import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import LogoMarquee from "./LogoMarquee";

export default function TrustedCompanies() {
  return (
    <Section
      spacing="md"
      background="default"
    >
      <Container>

        <div className="mb-12 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">

            Trusted Technologies & Inspiration

          </p>

          <h2 className="mt-5 text-4xl font-black text-slate-900">

            Built With Modern Technologies

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">

            We build scalable digital experiences using modern technologies,
            engineering best practices and enterprise-grade tools.

          </p>

        </div>

        <LogoMarquee />

      </Container>
    </Section>
  );
}