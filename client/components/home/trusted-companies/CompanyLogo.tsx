interface CompanyLogoProps {
  name: string;
}

export default function CompanyLogo({
  name,
}: CompanyLogoProps) {
  return (
    <div
      className="
      flex
      h-16
      min-w-[180px]
      items-center
      justify-center
      rounded-2xl
      border
      border-slate-200
      bg-white/70
      px-8
      backdrop-blur-md
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-blue-200
      hover:shadow-xl
    "
    >
      <span className="text-lg font-bold tracking-wide text-slate-500 transition duration-300 hover:text-slate-900">
        {name}
      </span>
    </div>
  );
}