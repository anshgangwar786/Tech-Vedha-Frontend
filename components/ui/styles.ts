/** Class names shared across pages (values from the Figma components). */

/** Section rhythm: 136 px vertical padding on desktop (service and About pages). */
export const SECTION = "py-24 lg:py-[136px]";

/** Tighter section rhythm: 130 px vertical padding on desktop (home and Contact pages). */
export const SECTION_TIGHT = "py-24 lg:py-[130px]";

/** Large section titles: Urbanist Light, 72 px at desktop. */
export const DISPLAY_TITLE =
  "font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.03] font-light tracking-[-0.03em] text-fg";

/** Intro paragraph under a section title. */
export const INTRO = "text-[17px] leading-[1.6] text-fg-muted";

/** Base card surface. */
export const CARD = "rounded-[20px] border border-line bg-surface";

/** Hover lift used by every clickable card: 250 ms ease-out, brand-tinted border and glow. */
export const CARD_HOVER =
  "transition duration-250 ease-out hover:border-brand/45 hover:shadow-[0_12px_30px_rgb(77_178_255/0.16)]";

/** Rounded icon tile (48 px) holding a 22 px line icon. */
export const ICON_TILE =
  "grid size-12 shrink-0 place-items-center rounded-[14px] border border-line bg-surface-raised text-brand";

/** Small step / list numbers (Urbanist Light, brand blue). */
export const NUMBER = "font-display font-light leading-none text-brand";

/** Tab and step motion from the prototype: Smart animate, 450 ms, cubic-bezier(0.32, 0.72, 0, 1). */
export const SMART_ANIMATE = "duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]";

/** Brand gradient (#1e9bf0 → #1446e0) used on icon tiles and featured cards. */
export const BRAND_GRADIENT = "bg-linear-135 from-[#1e9bf0] to-[#1446e0]";

/**
 * Highlighted surface: brand gradient under a 22% navy veil, used for the featured card in a set
 * (App Development wing, Retail audience, Tech Vedha column, Vision card, active loop step).
 */
export const HIGHLIGHT =
  "bg-[linear-gradient(rgb(6_20_46/0.22),rgb(6_20_46/0.22)),linear-gradient(135deg,#1e9bf0,#1446e0)] text-white";

/** Small pill on surface-raised (28 px). */
export const PILL = "inline-flex h-7 w-fit items-center gap-1.5 rounded-full bg-surface-raised px-3 text-xs font-medium text-fg";

/** Uppercase micro label (10 px, 0.14em). */
export const MICRO = "text-[10px] font-medium tracking-[0.14em] text-fg-subtle uppercase";
