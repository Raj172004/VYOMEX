"use client";

import { whyChoose } from "@/constants/whyChoose";

import FeatureCard from "./FeatureCard";
import MetricCard from "./MetricCard";

export default function WhyChooseGrid() {
  return (
    <div
      className="
        grid
        gap-10

        lg:grid-cols-3
      "
    >
      <div
        className="
          grid
          gap-8

          md:grid-cols-2
          lg:col-span-2
        "
      >
        {whyChoose.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      <MetricCard />
    </div>
  );
}