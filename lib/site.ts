/**
 * Site-wide constants: brand, contact details and navigation.
 *
 * SITE_CONTENT is the bundled copy of the "Site & menus" page in Tech-Vedha-Admin. Pages read the live
 * version through getSite() (server/content.ts); the constants exported below are built from the bundled
 * copy and are what the site shows when the admin is unreachable.
 */

/**
 * Contact defaults (each can be overridden with an env var, and then in the admin). The email comes from the
 * Figma design; the phone number is a DUMMY shown (and linked for call / WhatsApp) until the real one is saved
 * in the admin (Website pages → Site & menus). siteUrl is only used off Vercel when SITE_URL is unset.
 */
export const DUMMY = {
  email: "info@techvedha.tech",
  phone: "+91 98765 43210",
  siteUrl: "https://www.example.com",
} as const;

const digitsOnly = (value: string) => value.replace(/\D/g, "");

/**
 * Public origin of this website (canonical URLs, sitemap.xml, robots.txt, Open Graph, JSON-LD):
 *   1. SITE_URL, when set (set it once a custom domain is live).
 *   2. On Vercel: this project's production domain, which Vercel provides automatically.
 *   3. Local dev: http://localhost:3002.
 */
function siteOrigin(): string {
  const configured = (process.env.SITE_URL ?? "").trim().replace(/^['"]|['"]$/g, "").trim();
  if (configured) return configured.replace(/\/+$/, "");
  // NEXT_PUBLIC_ copy: Vercel exposes it to the browser bundle too, where the plain one is undefined.
  const vercelDomain =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelDomain) return `https://${vercelDomain}`;
  return process.env.NODE_ENV === "production" ? DUMMY.siteUrl : "http://localhost:3002";
}

export type NavLink = { label: string; href: string };

const NAV: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Editable in Tech-Vedha-Admin → Site & menus. */
export const SITE_CONTENT = {
  name: "Tech Vedha",
  tagline: "Build for Tomorrow",
  description:
    "Tech Vedha is one IT partner for digital marketing, Android and iOS app development, CAD design and planning, custom software and cybersecurity — across India and abroad.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || DUMMY.email,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || DUMMY.phone,
  /** International format, digits only. Empty = the contact phone. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  /** Footer links. */
  navLinks: NAV,
  /** Header and mobile menu (Figma: Services · About · Contact). */
  headerLinks: NAV.filter((link) => link.label !== "Work"),
  /** Top bar, the "Services" drop-down and the phone menu. */
  header: {
    ctaLabel: "Start a project",
    servicesLabel: "Services",
    /** {count} = number of services in words. */
    servicesNote: "Why manage {count} vendors? One partner designs, builds, secures and markets it.",
    servicesLinkLabel: "See how it fits together",
    servicesLinkHref: "/#why",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
  footer: {
    text: "Your trusted partner for complete IT solutions.",
    servicesTitle: "Services",
    companyTitle: "Company",
    contactTitle: "Contact",
  },
  /** Second button beside "Start a project" where a page doesn't set its own. */
  whatsappButtonLabel: "Chat on WhatsApp",
  /** Pop-up shown after an enquiry form is sent (every form on the site). */
  enquirySent: {
    title: "Enquiry sent",
    text: "Thank you. One person from our team will reply with next steps, and a written plan follows the discovery call.",
    homeLabel: "Back to home",
    closeLabel: "Close",
  },
  /** Page shown for a broken or old link. */
  notFound: {
    eyebrow: "Error 404",
    titleLead: "This page isn't",
    titleAccent: "on the blueprint.",
    intro: "The link may be old or mistyped. Head back home, or tell us what you were looking for.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "Back to home", href: "/" },
  },
  /** The /site-map page for visitors. Page addresses are fixed; titles and descriptions can be changed. */
  sitemapPage: {
    eyebrow: "Every page, one place",
    title: "Sitemap",
    pagesTitle: "Pages",
    servicesTitle: "Services",
    homeTitle: "On the homepage",
    /** Added after the summary of a service that doesn't have its own page yet. */
    comingSoon: "Full page coming soon.",
    pages: [
      { path: "/", title: "Home", description: "One IT partner for marketing, apps, CAD and software — how the four services fit together." },
      { path: "/about", title: "About", description: "Why Tech Vedha exists, who we work with and how we work." },
      { path: "/contact", title: "Contact", description: "Send an enquiry, email us or chat on WhatsApp." },
    ],
    /** Homepage sections listed on the sitemap and the error page. */
    homeSections: [
      { href: "/#services", title: "Services" },
      { href: "/#why", title: "Why Tech Vedha" },
      { href: "/#security", title: "Security" },
      { href: "/#process", title: "How we work" },
      { href: "/#work", title: "Client stories" },
      { href: "/#faq", title: "FAQ" },
      { href: "/#contact", title: "Start a project" },
    ],
  },
};

export type SiteContent = typeof SITE_CONTENT;

const isCompleteLink = (link: NavLink) => Boolean(link.label.trim() && link.href.trim());

/** Splits the brand name for the two-tone wordmark: first word, then the rest (upper case). */
function wordmark(name: string): [string, string] {
  const [first = "", ...rest] = name.trim().toUpperCase().split(/\s+/);
  return [first, rest.join(" ")];
}

/** Everything components need about the site, derived from (live or bundled) SITE_CONTENT. */
export function buildSite(content: SiteContent) {
  const site = {
    name: content.name,
    tagline: content.tagline,
    description: content.description,
    url: siteOrigin(),
    email: content.email,
    phone: content.phone,
    locale: "en_IN",
  };
  return {
    SITE: site,
    EMAIL_URL: `mailto:${site.email}`,
    PHONE_URL: `tel:+${digitsOnly(site.phone)}`,
    WHATSAPP_URL: `https://wa.me/${digitsOnly(content.whatsappNumber || site.phone)}`,
    // A link without both a label and an address (half-filled in the admin) is left out.
    NAV_LINKS: content.navLinks.filter(isCompleteLink),
    HEADER: content.header,
    FOOTER: content.footer,
    WHATSAPP_BUTTON_LABEL: content.whatsappButtonLabel,
    ENQUIRY_SENT: content.enquirySent,
    NOT_FOUND: content.notFound,
    SITEMAP_PAGE: content.sitemapPage,
    /** The brand name as a two-part wordmark: "TECH" + "VEDHA". */
    WORDMARK: wordmark(content.name),
    HEADER_LINKS: content.headerLinks.filter(isCompleteLink),
    /**
     * Footer bottom row. Privacy ("/privacy") and Terms ("/terms") are left out until those pages exist,
     * so the footer never links to a 404; add them back here (and to lib/pages.ts) once they are built.
     * The /site-map page still exists but is intentionally not linked from the footer.
     */
    LEGAL_LINKS: [] as NavLink[],
  };
}

export type SiteData = ReturnType<typeof buildSite>;

/** Bundled values — used where live content can't be read (OG images, robots) and as the fallback. */
export const { SITE, EMAIL_URL, PHONE_URL, WHATSAPP_URL, NAV_LINKS, HEADER_LINKS, LEGAL_LINKS, HEADER, ENQUIRY_SENT } =
  buildSite(SITE_CONTENT);

export type HeaderCopy = SiteContent["header"];
export type EnquirySentCopy = SiteContent["enquirySent"];
