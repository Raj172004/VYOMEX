interface Props {
  title: string;
  description: string;
}

export default function SectionTitle({
  title,
  description,
}: Props) {
  return (
    <div className="mx-auto mb-20 max-w-4xl text-center">
      <h2 className="text-5xl font-black leading-tight tracking-tight text-slate-900 lg:text-6xl">
        {title}
      </h2>

      <p className="mx-auto mt-7 max-w-2xl text-xl leading-9 text-slate-600">
        {description}
      </p>
    </div>
  );
}