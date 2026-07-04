export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  badge: string;
  title: string[];
  description: string;
  primaryButton: string;
  secondaryButton: string;
  stats: HeroStat[];
}