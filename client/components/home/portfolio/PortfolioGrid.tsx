"use client";

import { portfolio } from "@/data/portfolio";

import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid() {
  return (
    <div
      className="
        grid
        gap-10

        lg:grid-cols-3
      "
    >
      {portfolio.map((project) => (
        <PortfolioCard
          key={project.title}
          project={project}
        />
      ))}
    </div>
  );
}