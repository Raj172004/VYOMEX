"use client";

import { BadgeCheck, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
}

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({
  testimonial,
}: Props) {
  return (
    <div
      className="
        group
        rounded-[30px]
        border
        border-slate-200
        bg-white
        p-9
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-[0_30px_80px_rgba(37,99,235,.15)]
      "
    >
      <div className="mb-6 flex">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star
            key={index}
            size={18}
            fill="currentColor"
            className="text-yellow-400"
          />
        ))}
      </div>

      <p className="leading-8 text-slate-600">
        {testimonial.review}
      </p>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-black text-white">
          {testimonial.name.charAt(0)}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900">
              {testimonial.name}
            </h3>

            <BadgeCheck
              size={18}
              className="text-blue-600"
            />
          </div>

          <p className="text-sm text-slate-500">
            {testimonial.role}
            {" • "}
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}