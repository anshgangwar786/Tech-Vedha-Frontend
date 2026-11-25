import type { ContactGlyphName } from "@/components/contact/icons";
import { buildSite, DUMMY, SITE_CONTENT, type SiteData } from "@/lib/site";

/**
 * Contact page copy (Figma "Tech Vedha — Contact · Dark / Light").
 *
 * CONTACT_CONTENT is the bundled copy of the "Contact" page in Tech-Vedha-Admin; pages read the live version
 * through getContact() (server/content.ts). Email, phone and WhatsApp values and links come from the site
 * settings (lib/site.ts), so they are filled in by buildContact().
 */

type QuickContact = { label: string; value: string; icon: ContactGlyphName; highlight?: boolean };

type Channel = {
  title: string;
  icon: ContactGlyphName;
  description: string;
  value: string;
  tag: { icon: ContactGlyphName; label: string };
  cta: string;
};

export const CONTACT_CONTENT = {
  seo: {
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
  },
  /** Top of the page, above the form. */
  hero: {
    eyebrow: "Contact Tech Vedha · For businesses in India and abroad",
    titleLead: "Tell us what you’re building.",
    titleAccent: "We’ll plan it with you.",
    intro:
      "Send your project details once. One person from our team replies with next steps, and a written plan follows the discovery call.",
  },
  /** Blue card beside the form. */
  brandCard: {
    title: "One partner. Built for tomorrow.",
    text: "Space, software, apps, security and marketing — for businesses in India and abroad.",
    /** Beside the working hours at the bottom of the card. */
    regionLabel: "India and abroad",
  },
  /** "Send an enquiry" form (this page and the "Start a project" pop-up on every page). */
  form: {
    title: "Send an enquiry",
    requiredNote: "Fields marked * are required.",
    step1: "What you need",
    servicesLabel: "What do you need?",
    otherServiceLabel: "Others",
    otherServicePlaceholder: "Tell us the service you need",
    step2: "About you",
    nameLabel: "Your name",
    namePlaceholder: "Full name",
    companyLabel: "Company",
    companyPlaceholder: "Business or brand name",
    phoneLabel: "Phone / WhatsApp",
    phonePlaceholder: "98765 43210",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    cityLabel: "City / country",
    cityPlaceholder: "Where is the business?",
    step3: "Timing and details",
    timeframeLabel: "When do you want to start?",
    timeframePlaceholder: "Select a timeframe",
    messageLabel: "Tell us about the project (optional)",
    messagePlaceholder: "Goals, current setup, anything we should know…",
    submitLabel: "Send enquiry",
    whatsappLabel: "Prefer WhatsApp? Send these details there",
    /** Shown instead of whatsappLabel on phones. */
    whatsappShortLabel: "Send on WhatsApp instead",
    note: "One person from our team replies with next steps. No spam, no sales calls.",
  },
  /** "Other ways to reach us" heading. */
  channelsSection: {
    eyebrow: "Other ways to reach us",
    title: "Pick the channel",
    highlight: "that suits you.",
    intro: "Every channel reaches the same Tech Vedha team — and the same person who will run your project.",
  },
  /** Heading of the "What happens next" strip. */
  nextStepsSection: {
    eyebrow: "After you enquire",
    title: "What happens next",
    /** Small label on each step. {n} = step number. */
    stepLabel: "Step {n}",
  },
  /** "Office and company details" heading and labels. */
  companySection: {
    eyebrow: "Office and company details",
    title: "Find us, and everything",
    highlight: "procurement needs.",
    intro: "Vendor registration paperwork is shared on request.",
    mapPinTitle: "Tech Vedha office",
    directionsLabel: "Get directions",
    officeLabel: "Our office",
    whatsappLink: "Prefer WhatsApp? Message us anytime",
    procurementTitle: "For procurement teams",
    /** Shown for a registration number left empty. */
    missingValue: "To add",
  },
  /** Thin band above the footer. */
  exploreBand: {
    text: "Already know which service you need?",
    linkLabel: "Explore services",
    linkHref: "/#services",
  },
  /**
   * PLACEHOLDER COMPANY DETAILS — shown exactly as in the design until the real values are confirmed.
   * Replace each value before launch; `null` registration numbers render as "To add".
   */
  company: {
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
  },
  /** Shown instead of the phone number while it is still the dummy one in lib/site.ts. */
  phonePlaceholder: "+91 · number to add",
  /** Rows in the hero's brand card. Email and phone values come from the site settings. */
  quickContacts: [
    { label: "Email", value: "", icon: "mail" },
    { label: "WhatsApp", value: "Chat with our team", icon: "chat" },
    { label: "Phone", value: "", icon: "phone", highlight: true },
    { label: "Who you talk to", value: "One point of contact, every service", icon: "user" },
  ] as QuickContact[],
  promises: ["Plan before we build", "Security from day one", "We stay after launch"],
  timeframes: ["As soon as possible", "Within a month", "In 1–3 months", "Later this year", "Just exploring"],
  /** Email and call values come from the site settings. */
  channels: [
    {
      title: "Email",
      icon: "mail",
      description: "Briefs, tenders, purchase orders and documents.",
      value: "",
      tag: { icon: "file", label: "Best for detailed briefs" },
      cta: "Write to us",
    },
    {
      title: "WhatsApp",
      icon: "chat",
      description: "Quick questions, voice notes and photos of your space or app.",
      value: "Chat with our team",
      tag: { icon: "clock", label: "Answered in working hours" },
      cta: "Start a chat",
    },
    {
      title: "Call",
      icon: "phone",
      description: "Talk through a project that needs to start soon.",
      value: "",
      tag: { icon: "user", label: "One point of contact" },
      cta: "Call now",
    },
  ] as Channel[],
  nextSteps: [
    { title: "We get back to you", detail: "One point of contact confirms your goals and what you need." },
    { title: "Discovery call and plan", detail: "We map the wings you need and share a written plan." },
    { title: "Agree, then build", detail: "Drawings, screens and campaigns approved before work starts." },
  ],
};

export type ContactContent = typeof CONTACT_CONTENT;
export type ContactFormCopy = ContactContent["form"];

/** The Contact page data, with email / phone / WhatsApp values and links taken from the site settings. */
export function buildContact(content: ContactContent, site: SiteData) {
  const { SITE, EMAIL_URL, PHONE_URL, WHATSAPP_URL } = site;
  /** The phone number may still be the dummy one, so show the design's placeholder until a real one is set. */
  const phoneLabel = SITE.phone && SITE.phone !== DUMMY.phone ? SITE.phone : content.phonePlaceholder;
  const linkOf = (icon: ContactGlyphName) =>
    icon === "mail" ? EMAIL_URL : icon === "chat" ? WHATSAPP_URL : icon === "phone" ? PHONE_URL : undefined;
  const valueOf = (icon: ContactGlyphName, value: string) =>
    icon === "mail" ? SITE.email : icon === "phone" ? phoneLabel : value;

  return {
    CONTACT_SEO: content.seo,
    HERO: content.hero,
    BRAND_CARD: content.brandCard,
    FORM: content.form,
    CHANNELS_SECTION: content.channelsSection,
    NEXT_STEPS_SECTION: content.nextStepsSection,
    COMPANY_SECTION: content.companySection,
    EXPLORE_BAND: content.exploreBand,
    COMPANY: content.company,
    PHONE_LABEL: phoneLabel,
    DIRECTIONS_URL: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.company.mapsQuery)}`,
    QUICK_CONTACTS: content.quickContacts.map((item) => ({
      ...item,
      value: valueOf(item.icon, item.value),
      href: linkOf(item.icon),
    })),
    PROMISES: content.promises,
    TIMEFRAMES: content.timeframes,
    CHANNELS: content.channels.map((item) => ({
      ...item,
      value: valueOf(item.icon, item.value),
      href: linkOf(item.icon) ?? EMAIL_URL,
    })),
    NEXT_STEPS: content.nextSteps,
  };
}

export type ContactData = ReturnType<typeof buildContact>;

/** Bundled values (fallback when the admin is unreachable). */
export const {
  CONTACT_SEO,
  FORM,
  COMPANY,
  PHONE_LABEL,
  DIRECTIONS_URL,
  QUICK_CONTACTS,
  PROMISES,
  TIMEFRAMES,
  CHANNELS,
  NEXT_STEPS,
} = buildContact(CONTACT_CONTENT, buildSite(SITE_CONTENT));
