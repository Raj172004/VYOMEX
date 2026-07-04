interface Props {
  gradient: string;
}

export default function BrowserMockup({
  gradient,
}: Props) {
  return (
    <div className="overflow-hidden rounded-t-3xl border-b border-slate-200">

      <div className="flex items-center gap-2 bg-slate-100 px-5 py-4">

        <div className="h-3 w-3 rounded-full bg-red-500" />

        <div className="h-3 w-3 rounded-full bg-yellow-400" />

        <div className="h-3 w-3 rounded-full bg-green-500" />

      </div>

      <div
        className={`relative h-64 overflow-hidden bg-gradient-to-br ${gradient}`}
      >

        <div className="absolute left-10 top-8 h-40 w-52 rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl" />

        <div className="absolute right-10 top-12 h-28 w-36 rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl" />

        <div className="absolute bottom-8 left-16 right-16 h-16 rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl" />

      </div>

    </div>
  );
}