import {
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  FileText,
  Globe,
  Layers,
  type LucideIcon,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { cx } from "@/lib/cx";

/** Line icons for the Contact page, from lucide-react. They inherit `currentColor`. */
const GLYPHS = {
  mail: Mail,
  chat: MessageCircle,
  phone: Phone,
  user: User,
  building: Building2,
  pin: MapPin,
  calendar: Calendar,
  file: FileText,
  shield: Shield,
  clock: Clock,
  globe: Globe,
  navigation: Navigation,
  layers: Layers,
  arrow: ArrowRight,
} satisfies Record<string, LucideIcon>;

export type ContactGlyphName = keyof typeof GLYPHS;

/** Size it with a `size-*` class; colour comes from `text-*`. */
export function Glyph({ name, className }: { name: ContactGlyphName; className?: string }) {
  // An icon name the site doesn't know (e.g. mistyped in the admin) shows no icon instead of breaking the page.
  const Icon = Object.prototype.hasOwnProperty.call(GLYPHS, name) ? GLYPHS[name] : null;
  if (!Icon) return null;
  return <Icon aria-hidden strokeWidth={1.75} className={cx("shrink-0", className)} />;
}

/** Stacked-layers mark in the hero brand card (104 × 97, white on the brand gradient). */
export function LayersArt({ className }: { className?: string }) {
  const sheet = (y: number) => `M52 ${y}L97.0357 ${y + 19.4}L52 ${y + 38.8}L6.96429 ${y + 19.4}L52 ${y}Z`;
  return (
    <svg aria-hidden viewBox="0 0 104 97" fill="none" className={className}>
      <g fill="#fff" fillOpacity={0.16} stroke="#fff" strokeOpacity={0.55} strokeWidth={0.692857}>
        <path d={sheet(56.8143)} />
        <path d={sheet(40.1857)} />
        <path d={sheet(23.5571)} />
      </g>
      <path d={sheet(6.92857)} fill="#fff" fillOpacity={0.85} />
    </svg>
  );
}
