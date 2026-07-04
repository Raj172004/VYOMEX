import { heroData } from "@/constants/hero";

export default function HeroDescription() {
  return (
    <p
      className="
      mt-8
      max-w-2xl
      text-lg
      leading-9
      text-slate-600

      lg:text-xl
    "
    >
      {heroData.description}
    </p>
  );
}