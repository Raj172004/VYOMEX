interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function Heading({
  badge,
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <div className={center ? "text-center" : "text-left"}>
      {badge && (
        <div className="mb-6">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-cyan-200
              bg-cyan-50
              px-5
              py-2
              text-xs
              font-bold
              uppercase
              tracking-[0.35em]
              text-cyan-700
            "
          >
            {badge}
          </span>
        </div>
      )}

      <h2
        className="
          text-4xl
          font-black
          leading-tight
          tracking-tight
          text-slate-900

          sm:text-5xl

          lg:text-6xl
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`
            mt-8
            text-lg
            leading-8
            text-slate-600

            lg:text-xl

            ${
              center
                ? "mx-auto max-w-3xl"
                : "max-w-2xl"
            }
          `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}