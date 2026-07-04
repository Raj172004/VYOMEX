interface Props {
  badge: string;
  title: string;
  description: string;
  center?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  description,
  center = true,
}: Props) {
  return (
    <div
      className={`mb-16 ${
        center ? "text-center mx-auto" : ""
      } max-w-3xl`}
    >
      <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
        {badge}
      </span>

      <h2 className="mt-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      <p className="mt-6 text-lg leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}