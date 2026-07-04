"use client";

import { services } from "@/constants/services";

import ServiceCard from "./ServiceCard";

export default function ServicesGrid() {
  return (
    <div
      className="
        grid
        gap-8

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {services.map((service) => (
        <ServiceCard
          key={service.title}
          title={service.title}
          description={service.description}
          icon={service.icon}
        />
      ))}
    </div>
  );
}