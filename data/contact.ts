import type { ContactGlyphName } from "@/components/contact/icons";
import { EMAIL_URL, PHONE_URL, SITE, WHATSAPP_URL } from "@/lib/site";

/** Contact page copy (Figma "Tech Vedha — Contact · Dark / Light"). */

export const CONTACT_SEO = {
  title: "Contact Tech Vedha — Start a Project in India or Abroad",
  description:
    "Send your project details once. One person from Tech Vedha replies with next steps, and a written plan follows the discovery call. Email, WhatsApp or call.",
  keywords: [
    "contact Tech Vedha",
    "IT company enquiry",
    "start a project",
    "hire app developers India",
    "digital marketing agency contact",
    "CAD design and planning enquiry",
  ],
};

/**
 * PLACEHOLDER COMPANY DETAILS — shown exactly as in the design until the real values are confirmed.
 * Replace each value before launch; `null` registration numbers render as "To add".
 */
export const COMPANY = {
  city: "India · city to add",
  address: "Office address to add",
  /** Shorter form for the map pin label. */
  addressShort: "Address to add",
  hours: "Working hours to add",
  /** Used for the "Get directions" link; switch to the full street address once confirmed. */
  mapsQuery: "Tech Vedha India",
  registration: [
    { label: "Registered name", value: null },
    { label: "GSTIN", value: null },
    { label: "UDYAM / MSME", value: null },
    { label: "CIN", value: null },
    { label: "Certifications", value: null },
  ] as { label: string; value: string | null }[],
};

/** The phone number is still a dummy (lib/site.ts), so the page shows the design's placeholder until a real one is set. */
export const PHONE_LABEL = process.env.NEXT_PUBLIC_CONTACT_PHONE ? SITE.phone : "+91 · number to add";

export const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.mapsQuery)}`;

type QuickContact = { label: string; value: string; href?: string; icon: ContactGlyphName; highlight?: boolean };

/** Rows in the hero's brand card. */
export const QUICK_CONTACTS: QuickContact[] = [
  { label: "Email", value: SITE.email, href: EMAIL_URL, icon: "mail" },
  { label: "WhatsApp", value: "Chat with our team", href: WHATSAPP_URL, icon: "chat" },
  { label: "Phone", value: PHONE_LABEL, href: PHONE_URL, icon: "phone", highlight: true },
  { label: "Who you talk to", value: "One point of contact, every service", icon: "user" },
];

export const PROMISES = ["Plan before we build", "Security from day one", "We stay after launch"];

export const TIMEFRAMES = ["As soon as possible", "Within a month", "In 1–3 months", "Later this year", "Just exploring"];

type Channel = {
  title: string;
  icon: ContactGlyphName;
  description: string;
  value: string;
  tag: { icon: ContactGlyphName; label: string };
  cta: string;
  href: string;
};

export const CHANNELS: Channel[] = [
  {
    title: "Email",
    icon: "mail",
    description: "Briefs, tenders, purchase orders and documents.",
    value: SITE.email,
    tag: { icon: "file", label: "Best for detailed briefs" },
    cta: "Write to us",
    href: EMAIL_URL,
  },
  {
    title: "WhatsApp",
    icon: "chat",
    description: "Quick questions, voice notes and photos of your space or app.",
    value: "Chat with our team",
    tag: { icon: "clock", label: "Answered in working hours" },
    cta: "Start a chat",
    href: WHATSAPP_URL,
  },
  {
    title: "Call",
    icon: "phone",
    description: "Talk through a project that needs to start soon.",
    value: PHONE_LABEL,
    tag: { icon: "user", label: "One point of contact" },
    cta: "Call now",
    href: PHONE_URL,
  },
];

export const NEXT_STEPS = [
  { title: "We get back to you", detail: "One point of contact confirms your goals and what you need." },
  { title: "Discovery call and plan", detail: "We map the wings you need and share a written plan." },
  { title: "Agree, then build", detail: "Drawings, screens and campaigns approved before work starts." },
];
