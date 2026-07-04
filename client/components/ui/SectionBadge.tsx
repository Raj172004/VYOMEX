interface Props {
  children: React.ReactNode;
}

export default function SectionBadge({
  children,
}: Props) {
  return (
    <div className="mb-5 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
      {children}
    </div>
  );
}