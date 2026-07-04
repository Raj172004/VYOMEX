"use client";

export default function PortfolioHeader() {
  return (
    <div className="mx-auto mb-20 max-w-3xl text-center">
      <span
        className="
          rounded-full
          bg-blue-100
          px-4
          py-2
          text-sm
          font-semibold
          text-blue-700
        "
      >
        FEATURED PROJECTS
      </span>

      <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
        Software Crafted
        <br />
        For Performance
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Every solution is engineered with premium design, scalable
        architecture and measurable business outcomes.
      </p>
    </div>
  );
}