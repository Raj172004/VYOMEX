"use client";

import Marquee from "react-fast-marquee";

import CompanyLogo from "./CompanyLogo";

import { logos } from "@/data/logos";

export default function LogoMarquee() {
  return (
    <Marquee
      speed={45}
      gradient={false}
      pauseOnHover
    >
      <div className="flex gap-8 py-2">
        {logos.map((logo) => (
          <CompanyLogo
            key={logo}
            name={logo}
          />
        ))}
      </div>
    </Marquee>
  );
}