import type { ContactGlyphName } from "@/components/contact/icons";
import { CONTACT_FORM_COPY, formCopy } from "@/data/forms";
import { buildSite, SITE_CONTENT, type SiteData } from "@/lib/site";

export type { ContactFormCopy } from "@/data/forms";

/**
 * Contact page copy (Figma "Tech Vedha — Contact · Dark / Light").
 *
 * CONTACT_CONTENT is the bundled copy of the "Contact" page in Tech-Vedha-Admin, grouped by page section in page
 * order (one admin card per top-level key). Pages read the live version through getContact() (server/content.ts).
 * Everything the page says is its own; only the email address, phone number and WhatsApp number (and their links)
 * come from the contact settings in Site & menus, filled in by buildContact().
 */

/** Icons an editor can pick on this page (dropdown with plain names in the admin). */
export const CONTACT_ICONS = ["mail", "chat", "phone", "user", "building", "pin", "calendar", "file", "shield", "clock", "globe", "layers"] as const;

type QuickContact = { label: string; value: string; link: string; icon: ContactGlyphName; highlight: boolean };

type Channel = {
  title: string;
  icon: ContactGlyphName;
  description: string;
  value: string;
  link: string;
  tag: { icon: ContactGlyphName; label: string };
  cta: string;
};

/** An empty image: the drawn street map shows until one is uploaded. */
const NO_IMAGE = () => ({ src: "", alt: "", width: 0, height: 0 });

/** The form's error messages in the order of the fields they belong to (services, name, company, phone, email…). */
function orderedValidation() {
  const v = formCopy(CONTACT_FORM_COPY.validation);
  return {
    serviceRequired: v.serviceRequired,
    otherServiceName: v.otherServiceName,
    textRequired: v.textRequired,
    textTooShort: v.textTooShort,
    textTooLong: v.textTooLong,
    nameRequired: v.nameRequired,
    nameTooShort: v.nameTooShort,
    nameTooLong: v.nameTooLong,
    nameNumbers: v.nameNumbers,
    nameLetters: v.nameLetters,
    companyName: v.companyName,
    phoneRequired: v.phoneRequired,
    phoneCharacters: v.phoneCharacters,
    phoneLength: v.phoneLength,
    phoneStart: v.phoneStart,
    emailRequired: v.emailRequired,
    emailTooLong: v.emailTooLong,
    emailSpaces: v.emailSpaces,
    emailOneAt: v.emailOneAt,
    emailNameMissing: v.emailNameMissing,
    emailDots: v.emailDots,
    emailDomain: v.emailDomain,
    cityName: v.cityName,
    timeframeRequired: v.timeframeRequired,
  };
}

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
  /** Top of the page: breadcrumb, label, headline and intro. */
  hero: {
    breadcrumb: { homeLabel: "Home", homeHref: "/", currentLabel: "Contact" },
    eyebrow: "Contact Tech Vedha · For businesses in India and abroad",
    titleLead: "Tell us what you’re building.",
    titleAccent: "We’ll plan it with you.",
    intro:
      "Send your project details once. One person from our team replies with next steps, and a written plan follows the discovery call.",
    a11y: { breadcrumbLabel: "Breadcrumb" },
  },
  /** Card left of the form on desktop (under it on phones): blue header, contact rows, promises, hours and region. */
  brandCard: {
    wordmarkLead: "TECH",
    wordmarkAccent: "VEDHA",
    title: "One partner. Built for tomorrow.",
    text: "Space, software, apps, security and marketing — for businesses in India and abroad.",
    /** Email and phone values come from the contact settings (Site & menus). */
    quickContacts: [
      { icon: "mail", label: "Email", value: "", link: "", highlight: false },
      { icon: "chat", label: "WhatsApp", value: "Chat with our team", link: "", highlight: false },
      { icon: "phone", label: "Phone", value: "", link: "", highlight: true },
      { icon: "user", label: "Who you talk to", value: "One point of contact, every service", link: "", highlight: false },
    ] as QuickContact[],
    /** Shown instead of the phone number only when none is set at all. */
    phonePlaceholder: "+91 · number to add",
    promises: ["Plan before we build", "Security from day one", "We stay after launch"],
    hours: "Mon–Sat · 10:00 AM – 7:00 PM IST",
    regionLabel: "India and abroad",
    a11y: { cardLabel: "Contact details", promisesLabel: "How we work" },
  },
  /**
   * The "Send an enquiry" form, right of the contact card on desktop (this page's own copy). Fields in the order the
   * form shows them; error messages in the order of the fields they belong to.
   */
  form: { ...formCopy(CONTACT_FORM_COPY), validation: orderedValidation() },
  /** "Other ways to reach us": heading and the email, WhatsApp and call cards. */
  channels: {
    eyebrow: "Other ways to reach us",
    title: "Pick the channel",
    highlight: "that suits you.",
    intro: "Every channel reaches the same Tech Vedha team — and the same person who will run your project.",
    /** Email and call values come from the contact settings (Site & menus). */
    cards: [
      {
        icon: "mail",
        title: "Email",
        description: "Briefs, tenders, purchase orders and documents.",
        value: "",
        link: "",
        tag: { icon: "file", label: "Best for detailed briefs" },
        cta: "Write to us",
      },
      {
        icon: "chat",
        title: "WhatsApp",
        description: "Quick questions, voice notes and photos of your space or app.",
        value: "Chat with our team",
        link: "",
        tag: { icon: "clock", label: "Answered in working hours" },
        cta: "Start a chat",
      },
      {
        icon: "phone",
        title: "Call",
        description: "Talk through a project that needs to start soon.",
        value: "",
        link: "",
        tag: { icon: "user", label: "One point of contact" },
        cta: "Call now",
      },
    ] as Channel[],
  },
  /** "What happens next" strip under the cards. */
  nextSteps: {
    eyebrow: "After you enquire",
    title: "What happens next",
    /** Small label on each step. {n} = step number. */
    stepLabel: "Step {n}",
    steps: [
      { title: "We get back to you", detail: "One point of contact confirms your goals and what you need." },
      { title: "Discovery call and plan", detail: "We map the wings you need and share a written plan." },
      { title: "Agree, then build", detail: "Drawings, screens and campaigns approved before work starts." },
    ],
  },
  /**
   * "Office and company details": heading, map, office card and registration details.
   * DUMMY COMPANY DETAILS — consistent sample values shown until the real ones are saved in the admin. Registration
   * numbers are zero-filled on purpose so none can be mistaken for a real company's. An empty value shows missingValue.
   */
  company: {
    eyebrow: "Office and company details",
    title: "Find us, and everything",
    highlight: "procurement needs.",
    intro: "Vendor registration paperwork is shared on request.",
    /** Optional picture for the map box (e.g. a real map screenshot). Empty = the drawn street map. */
    mapImage: NO_IMAGE(),
    /** Small badge on the map pin. Empty = the first letters of the pin title. */
    mapPinBadge: "TV",
    mapPinTitle: "Tech Vedha office",
    addressShort: "Connaught Place, New Delhi",
    directionsLabel: "Get directions",
    /** What "Get directions" searches for on Google Maps. */
    mapsQuery: "Connaught Place, New Delhi",
    officeLabel: "Our office",
    city: "New Delhi, India",
    address: "2nd Floor, Sample Tower, Connaught Place, New Delhi 110001",
    hours: "Mon–Sat · 10:00 AM – 7:00 PM IST",
    whatsappLink: "Prefer WhatsApp? Message us anytime",
    procurementTitle: "For procurement teams",
    registration: [
      { label: "Registered name", value: "Tech Vedha Private Limited" },
      { label: "GSTIN", value: "07AAAAA0000A0Z0" },
      { label: "UDYAM / MSME", value: "UDYAM-DL-00-0000000" },
      { label: "CIN", value: "U00000DL0000PTC000000" },
      { label: "Certifications", value: "Shared on request" },
    ],
    /** Shown for a registration number left empty. */
    missingValue: "To add",
  },
  /** Thin band above the footer. */
  exploreBand: {
    text: "Already know which service you need?",
    linkLabel: "Explore services",
    linkHref: "/#services",
  },
};

export type ContactContent = typeof CONTACT_CONTENT;

/** Values tied to code: always the bundled value. Must match Tech-Vedha-Admin (app/lib/content/site-page-defs/contact.ts). */
export const CONTACT_LOCKED: readonly string[] = [];
/** Starting values of a new item in each list (the admin's "Add …" buttons). */
export const CONTACT_TEMPLATES: Record<string, unknown> = {
  "seo.keywords": "",
  "brandCard.quickContacts": { icon: "user", label: "", value: "", link: "", highlight: false },
  "brandCard.promises": "",
  "channels.cards": { icon: "file", title: "", description: "", value: "", link: "", tag: { icon: "clock", label: "" }, cta: "" },
  "nextSteps.steps": { title: "", detail: "" },
  "company.registration": { label: "", value: "" },
};

/** Two-letter badge from a name ("Tech Vedha office" → "TV"). */
function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("") || "•"
  );
}

/** The Contact page data, with email / phone / WhatsApp values and links taken from the contact settings. */
export function buildContact(content: ContactContent, site: SiteData) {
  const { SITE, EMAIL_URL, PHONE_URL, WHATSAPP_URL } = site;
  const phoneLabel = SITE.phone || content.brandCard.phonePlaceholder;
  /** Email, WhatsApp and phone rows link to the contact settings; any other row uses its own link (or none). */
  const linkOf = (icon: ContactGlyphName, link: string): string | undefined =>
    icon === "mail" ? EMAIL_URL : icon === "chat" ? WHATSAPP_URL : icon === "phone" ? PHONE_URL : link.trim() || undefined;
  const valueOf = (icon: ContactGlyphName, value: string) =>
    icon === "mail" ? SITE.email : icon === "phone" ? phoneLabel : value;
  // A row or card without a title is a half-filled draft: left out.
  const filled = (text: string) => text.trim() !== "";
  const { hero, company } = content;

  return {
    ...content,
    /** Breadcrumb trail (visible and JSON-LD). */
    TRAIL: [{ label: hero.breadcrumb.homeLabel, href: hero.breadcrumb.homeHref || "/" }, { label: hero.breadcrumb.currentLabel }],
    brandCard: {
      ...content.brandCard,
      quickContacts: content.brandCard.quickContacts
        .filter((item) => filled(item.label))
        .map((item) => ({ ...item, value: valueOf(item.icon, item.value), href: linkOf(item.icon, item.link) })),
    },
    channels: {
      ...content.channels,
      cards: content.channels.cards
        .filter((item) => filled(item.title))
        .map((item) => ({ ...item, value: valueOf(item.icon, item.value), href: linkOf(item.icon, item.link) })),
    },
    nextSteps: {
      ...content.nextSteps,
      steps: content.nextSteps.steps.filter((step) => filled(step.title)),
    },
    company: {
      ...company,
      mapPinBadge: company.mapPinBadge.trim() || initials(company.mapPinTitle),
      registration: company.registration.filter((row) => filled(row.label)),
      directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapsQuery)}`,
    },
  };
}

export type ContactData = ReturnType<typeof buildContact>;

/** Bundled values (fallback when the admin is unreachable). */
export const CONTACT = buildContact(CONTACT_CONTENT, buildSite(SITE_CONTENT));
