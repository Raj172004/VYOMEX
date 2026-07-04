"use client";

import ProcessCard from "./ProcessCard";

const steps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Understanding your business goals, users, competitors, and project requirements.",
  },
  {
    step: "02",
    title: "Planning",
    description:
      "Creating project architecture, UI wireframes, timelines, and technical roadmap.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Building scalable frontend and backend systems using modern technologies.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Testing, deployment, optimization, monitoring, and continuous improvement.",
  },
];

export default function ProcessTimeline() {
  return (
    <div className="mt-20 grid gap-8 lg:grid-cols-2">
      {steps.map((item) => (
        <ProcessCard
          key={item.step}
          step={item.step}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}