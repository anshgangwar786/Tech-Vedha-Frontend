import { Check, Factory, House, type LucideIcon, Shield, Smartphone, Sparkles, Store, TrendingUp, Volume2 } from "lucide-react";
import type { AudienceIcon, WingIconName } from "@/data/about";

/** Line icons for the About page, from lucide-react. They inherit `currentColor`. */

type IconProps = { className?: string };

const WING_ICONS: Record<WingIconName, LucideIcon> = {
  marketing: Volume2,
  apps: Smartphone,
  cad: House,
  software: Shield,
  generic: Sparkles,
};

/** 21 px icon on a hero service card (picked per card in the admin). */
export function WingIcon({ icon, className }: IconProps & { icon: string }) {
  const Icon = WING_ICONS[icon as WingIconName] ?? Sparkles;
  return <Icon aria-hidden strokeWidth={1.6} className={className} />;
}

const AUDIENCE_ICONS: Record<AudienceIcon, LucideIcon> = {
  retail: Store,
  homes: House,
  commercial: Factory,
  growth: TrendingUp,
};

/** 22 px icon for the "Who we work with" cards (picked per card in the admin). */
export function AudienceGlyph({ icon, className }: IconProps & { icon: string }) {
  const Icon = AUDIENCE_ICONS[icon as AudienceIcon] ?? Store;
  return <Icon aria-hidden strokeWidth={1.6} className={className} />;
}

/** 13 px tick used in the Tech Vedha column of the comparison table. */
export function Tick({ className }: IconProps) {
  return <Check aria-hidden strokeWidth={3} className={className} />;
}
