"use client";

export default function ServicesHeader() {
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
        Our Services
      </span>

      <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
        Digital Solutions Built
        <br />
        for Modern Businesses
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        From strategy to deployment, we build scalable digital products
        that help startups and enterprises grow with confidence.
      </p>
    </div>
  );
}