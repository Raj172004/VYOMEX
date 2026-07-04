"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import { heroData } from "@/constants/hero";

export default function HeroStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.35,
  });

  return (
    <div
      ref={ref}
      className="
        mt-14
        grid
        grid-cols-3
        gap-8
      "
    >
      {heroData.stats.map((stat) => {
        const number = Number(stat.value.replace(/\D/g, ""));
        const suffix = stat.value.replace(/[0-9]/g, "");

        return (
          <div key={stat.label}>
            <h3 className="text-4xl font-black text-slate-900 lg:text-5xl">
              {inView ? (
                <>
                  <CountUp
                    end={number}
                    duration={2.2}
                  />
                  {suffix}
                </>
              ) : (
                0
              )}
            </h3>

            <p className="mt-3 text-sm font-medium text-slate-500">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}