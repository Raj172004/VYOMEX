"use client";

import CountUp from "react-countup";
import { stats } from "@/data/stats";

interface Props {
  index: number;
}

export default function StatCard({
  index,
}: Props) {
  const item = stats[index];

  const Icon = item.icon;

  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-lg
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-blue-200
      hover:shadow-2xl
    "
    >
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

        <Icon
          size={30}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-5xl font-black text-slate-900">

        <CountUp
          end={item.value}
          duration={2}
        />

        {item.suffix}

      </h2>

      <h3 className="mt-5 text-xl font-bold text-slate-900">

        {item.title}

      </h3>

      <p className="mt-3 leading-7 text-slate-600">

        {item.description}

      </p>
    </div>
  );
}