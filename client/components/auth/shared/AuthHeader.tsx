"use client";

interface AuthHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export default function AuthHeader({
  badge,
  title,
  description,
}: AuthHeaderProps) {
  return (
    <>
      <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
        {badge}
      </span>

      <h2 className="mt-6 text-4xl font-black text-slate-900">
        {title}
      </h2>

      <p className="mt-4 leading-8 text-slate-600">
        {description}
      </p>
    </>
  );
}