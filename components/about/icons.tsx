import { Check, Factory, House, type LucideIcon, Shield, Smartphone, Sparkles, Store, TrendingUp, Volume2 } from "lucide-react";
import type { AudienceIcon } from "@/data/about";
import type { ServiceId } from "@/data/services";

/** Line icons for the About page, from lucide-react. They inherit `currentColor`. */

type IconProps = { className?: string };

const WING_ICONS: Record<ServiceId, LucideIcon> = {
  marketing: Volume2,
  apps: Smartphone,
  cad: House,
  software: Shield,
};

/** 21 px wing icon from the hero "What we do" panel. Services added in the admin share a generic icon. */
export function WingIcon({ id, className }: IconProps & { id: string }) {
  const Icon = WING_ICONS[id as ServiceId] ?? Sparkles;
  return <Icon aria-hidden strokeWidth={1.6} className={className} />;
}

const AUDIENCE_ICONS: Record<AudienceIcon, LucideIcon> = {
  retail: Store,
  homes: House,
  commercial: Factory,
  growth: TrendingUp,
};

/** 22 px icon for the "Who we work with" cards. */
export function AudienceGlyph({ icon, className }: IconProps & { icon: AudienceIcon }) {
  const Icon = AUDIENCE_ICONS[icon];
  return <Icon aria-hidden strokeWidth={1.6} className={className} />;
}

/** 13 px tick used in the Tech Vedha column of the comparison table. */
export function Tick({ className }: IconProps) {
  return <Check aria-hidden strokeWidth={3} className={className} />;
}
