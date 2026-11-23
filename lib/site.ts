/** Site-wide constants: brand, contact details and navigation. */

/**
 * Contact defaults (each can be overridden with an env var). The email comes from the Figma design;
 * the phone number and site URL are still PLACEHOLDERS — replace them (or set the env vars) before launch.
 */
const DUMMY = {
  email: "info@techvedha.tech",
  phone: "+91 98765 43210",
  siteUrl: "https://www.example.com",
} as const;

const digitsOnly = (value: string) => value.replace(/\D/g, "");

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || DUMMY.phone;
const whatsappNumber = digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || phone);

export const SITE = {
  name: "Tech Vedha",
  tagline: "Build for Tomorrow",
  description:
    "Tech Vedha is one IT partner for digital marketing, Android and iOS app development, CAD design and planning, custom software and cybersecurity — across India and abroad.",
  url: (process.env.SITE_URL || DUMMY.siteUrl).replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || DUMMY.email,
  phone,
  locale: "en_IN",
} as const;

export const EMAIL_URL = `mailto:${SITE.email}`;
export const PHONE_URL = `tel:+${digitsOnly(SITE.phone)}`;
export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}`;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Header and mobile menu (Figma: Services · About · Contact). The footer keeps the full NAV_LINKS. */
export const HEADER_LINKS: NavLink[] = NAV_LINKS.filter((link) => link.label !== "Work");

/**
 * Footer bottom row. Privacy ("/privacy") and Terms ("/terms") are left out until those pages exist,
 * so the footer never links to a 404; add them back here (and to lib/pages.ts) once they are built.
 */
export const LEGAL_LINKS: NavLink[] = [{ label: "Sitemap", href: "/site-map" }];
