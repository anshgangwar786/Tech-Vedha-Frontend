import { media } from "@/data/media";
import { CONTACT_FORM_COPY, formCopy } from "@/data/forms";

/**
 * Site-wide content: brand, contact details, logo, header, "Start a project" pop-up, footer, 404 and sitemap pages.
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

/** A service in the header's "Services" drop-down and the phone menu (this list is the menu's own copy). */
type MenuService = { number: string; wing: string; title: string; href: string; offerings: { title: string; detail: string }[] };

const MENU_SERVICES: MenuService[] = [
  {
    number: "01",
    wing: "Foot traffic",
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    offerings: [
      { title: "SEO", detail: "Rank higher, grow organic traffic" },
      { title: "Meta Ads", detail: "Facebook and Instagram campaigns" },
      { title: "YouTube Marketing", detail: "Video and channel growth" },
      { title: "Email Marketing", detail: "Targeted global campaigns" },
      { title: "WhatsApp Marketing", detail: "Broadcasts and business messaging" },
    ],
  },
  {
    number: "02",
    wing: "Front doors",
    title: "App Development",
    href: "/services/app-development",
    offerings: [
      { title: "Android Apps", detail: "Native, high-performance" },
      { title: "iOS Apps", detail: "Secure, intuitive" },
      { title: "UI/UX Design", detail: "Interfaces people enjoy" },
      { title: "Testing and Launch", detail: "QA to store release" },
      { title: "Ongoing Support", detail: "Updates and maintenance" },
    ],
  },
  {
    number: "03",
    wing: "Architecture",
    title: "CAD Design and Planning",
    href: "/#service-cad",
    offerings: [
      { title: "Residential", detail: "Homes, villas, apartments" },
      { title: "Retail and Showrooms", detail: "Shop layout planning" },
      { title: "Commercial and Industrial", detail: "Large-scale planning" },
      { title: "2D and 3D Modelling", detail: "Accurate drawings" },
      { title: "BOQ", detail: "Bill of quantities" },
    ],
  },
  {
    number: "04",
    wing: "Foundation",
    title: "Software and Cybersecurity",
    href: "/#service-software",
    offerings: [
      { title: "Subscription Software", detail: "Monthly or yearly, always supported" },
      { title: "One-time Software", detail: "Full ownership" },
      { title: "Threat Detection", detail: "Prevention and monitoring" },
      { title: "Network and Data Protection", detail: "Secure your assets" },
      { title: "Compliance and Risk", detail: "Stay audit-ready" },
    ],
  },
];

/** The "Start a project" pop-up's own form copy (Contact page has a separate one). */
const PROJECT_FORM = formCopy(CONTACT_FORM_COPY);

/**
 * Editable in Tech-Vedha-Admin → Site & menus. Grouped in the order a visitor meets things: brand and contact
 * settings, the logo, the header, the "Start a project" pop-up, the footer, then the 404 and sitemap pages.
 */
export const SITE_CONTENT = {
  /** Brand and contact settings used across the site (contact links, structured data, share images). */
  name: "Tech Vedha",
  tagline: "Build for Tomorrow",
  description:
    "Tech Vedha is one IT partner for digital marketing, Android and iOS app development, CAD design and planning, custom software and cybersecurity — across India and abroad.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || DUMMY.email,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || DUMMY.phone,
  /** International format, digits only. Empty = the contact phone. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  /** Defaults for every page's browser tab title, search description and keywords. */
  seo: {
    /** Title of a page that doesn't set its own. */
    defaultTitle: "Tech Vedha — IT Solutions for Marketing, Apps, CAD and Software",
    /** Added after a page's own title. {title} = the page's title, {name} = brand name. */
    titleTemplate: "{title} | {name}",
    keywords: [
      "IT solutions",
      "digital marketing agency",
      "app development company",
      "Android and iOS app development",
      "CAD design and planning",
      "BOQ",
      "custom software",
      "cybersecurity",
      "India",
    ],
  },
  /** Hidden link that keyboard users see first: jumps past the header. */
  skipLink: "Skip to content",
  /** Logo at the top left of every page (both theme versions). */
  logo: {
    dark: { src: media("/brand/logo-dark.png"), alt: "", width: 2000, height: 202 },
    light: { src: media("/brand/logo-light.png"), alt: "", width: 2000, height: 202 },
    a11y: { linkLabel: "{name} home" },
  },
  /** Top bar, the "Services" drop-down and the phone menu. */
  header: {
    /** "Services" button, then the drop-down it opens, top to bottom. */
    servicesLabel: "Services",
    /** Columns of the "Services" drop-down and rows of the phone menu. */
    menuServices: MENU_SERVICES,
    /** Line at the bottom of the drop-down. (Older saved text may still use {count}; it is filled in.) */
    servicesNote: "Why manage four vendors? One partner designs, builds, secures and markets it.",
    servicesLinkLabel: "See how it fits together",
    servicesLinkHref: "/#why",
    whatsappLabel: "WhatsApp",
    /** Links beside "Services" (and in the phone menu). */
    links: NAV.filter((link) => link.label !== "Work"),
    ctaLabel: "Start a project",
    ctaHref: "/contact",
    /** Phone menu only: button beside WhatsApp at the bottom. */
    emailLabel: "Email",
    a11y: {
      mainNav: "Main",
      themeToggle: "Toggle light and dark theme",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mobileNav: "Mobile",
      /** {email} = the email address. */
      emailLink: "Email {email}",
    },
  },
  /** Pop-up with the enquiry form, opened by every "Start a project" button. */
  projectForm: { ...PROJECT_FORM, a11y: { closeLabel: "Close form" } },
  /** Second button beside "Start a project" where a page doesn't set its own. */
  whatsappButtonLabel: "Chat on WhatsApp",
  /** Bottom of every page. */
  footer: {
    text: "Your trusted partner for complete IT solutions.",
    servicesTitle: "Services",
    serviceLinks: MENU_SERVICES.map((service) => ({ label: service.title, href: service.href })),
    companyTitle: "Company",
    companyLinks: NAV,
    contactTitle: "Contact",
    /** {year} = current year, {name} = brand name. */
    copyright: "© {year} {name}",
    /** Links in the bottom row (e.g. Privacy, Terms). Empty = none. */
    legalLinks: [] as NavLink[],
    a11y: { servicesNav: "Services", companyNav: "Company", legalNav: "Legal" },
  },
  /** Page shown for a broken or old link. */
  notFound: {
    /** Browser tab title. */
    metaTitle: "Page not found",
    eyebrow: "Error 404",
    titleLead: "This page isn't",
    titleAccent: "on the blueprint.",
    intro: "The link may be old or mistyped. Head back home, or tell us what you were looking for.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "Back to home", href: "/" },
    /** Quick links under the buttons. */
    links: [
      { label: "Services", href: "/#services" },
      { label: "Why Tech Vedha", href: "/#why" },
      { label: "Security", href: "/#security" },
      { label: "How we work", href: "/#process" },
      { label: "Client stories", href: "/#work" },
      { label: "FAQ", href: "/#faq" },
    ] as NavLink[],
    a11y: { linksLabel: "Popular sections" },
  },
  /** The /site-map page for visitors. Page addresses are fixed; everything else can be changed. */
  sitemapPage: {
    seo: { title: "Sitemap — Tech Vedha", description: "Every page on the Tech Vedha website." },
    breadcrumb: { home: "Home", current: "Sitemap", label: "Breadcrumb" },
    eyebrow: "Every page, one place",
    title: "Sitemap",
    pagesTitle: "Pages",
    pages: [
      { title: "Home", description: "One IT partner for marketing, apps, CAD and software — how the four services fit together.", path: "/" },
      { title: "About", description: "Why Tech Vedha exists, who we work with and how we work.", path: "/about" },
      { title: "Contact", description: "Send an enquiry, email us or chat on WhatsApp.", path: "/contact" },
    ],
    servicesTitle: "Services",
    /** Service cards (this page's own list). */
    services: [
      {
        title: "Digital Marketing",
        description: "SEO, Meta, YouTube, email and WhatsApp campaigns that bring customers in.",
        href: "/services/digital-marketing",
      },
      {
        title: "App Development",
        description: "Android and iOS apps, designed, tested, launched and supported.",
        href: "/services/app-development",
      },
      {
        title: "CAD Design and Planning",
        description: "2D/3D plans and BOQ for homes, retail spaces and industry. Full page coming soon.",
        href: "/#service-cad",
      },
      {
        title: "Software and Cybersecurity",
        description: "Custom software on subscription or one-time, protected end to end. Full page coming soon.",
        href: "/#service-software",
      },
    ],
    homeTitle: "On the homepage",
    /** Homepage sections listed on the sitemap. Leave a title empty to hide it. */
    homeSections: [
      { title: "Services", href: "/#services" },
      { title: "Why Tech Vedha", href: "/#why" },
      { title: "Security", href: "/#security" },
      { title: "How we work", href: "/#process" },
      { title: "Client stories", href: "/#work" },
      { title: "FAQ", href: "/#faq" },
      { title: "Start a project", href: "/#contact" },
    ],
  },
};

export type SiteContent = typeof SITE_CONTENT;

/** Values tied to code: always the bundled value. Must match Tech-Vedha-Admin (app/lib/content/site-pages). */
export const SITE_LOCKED: readonly string[] = ["sitemapPage.pages[].path"];
/** Starting values of a NEW item in each list (the admin's "Add …" buttons; also reads saved items of empty lists). */
const NEW_LINK = { label: "", href: "" };
export const SITE_TEMPLATES: Record<string, unknown> = {
  "seo.keywords": "",
  "header.links": NEW_LINK,
  "header.menuServices": { number: "", wing: "", title: "", href: "", offerings: [{ title: "", detail: "" }] },
  "header.menuServices[].offerings": { title: "", detail: "" },
  "projectForm.serviceOptions": "",
  "projectForm.timeframes": "",
  "footer.serviceLinks": NEW_LINK,
  "footer.companyLinks": NEW_LINK,
  "footer.legalLinks": NEW_LINK,
  "notFound.links": NEW_LINK,
  "sitemapPage.services": { title: "", description: "", href: "" },
  "sitemapPage.homeSections": { title: "", href: "/#" },
};

const isCompleteLink = (link: NavLink) => Boolean(link.label.trim() && link.href.trim());

/** Splits the brand name for the two-tone wordmark: first word, then the rest (upper case). */
function wordmark(name: string): [string, string] {
  const [first = "", ...rest] = name.trim().toUpperCase().split(/\s+/);
  return [first, rest.join(" ")];
}

/** Fills {name}-style placeholders. */
export const fillText = (pattern: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), pattern);

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
    SEO: content.seo,
    SKIP_LINK: content.skipLink,
    LOGO: content.logo,
    // A link without both a label and an address (half-filled in the admin) is left out.
    HEADER: {
      ...content.header,
      links: content.header.links.filter(isCompleteLink),
      menuServices: content.header.menuServices.filter((service) => service.title.trim()),
    },
    PROJECT_FORM: content.projectForm,
    FOOTER: {
      ...content.footer,
      serviceLinks: content.footer.serviceLinks.filter(isCompleteLink),
      companyLinks: content.footer.companyLinks.filter(isCompleteLink),
      legalLinks: content.footer.legalLinks.filter(isCompleteLink),
    },
    WHATSAPP_BUTTON_LABEL: content.whatsappButtonLabel,
    NOT_FOUND: { ...content.notFound, links: content.notFound.links.filter(isCompleteLink) },
    SITEMAP_PAGE: content.sitemapPage,
    /** The brand name as a two-part wordmark: "TECH" + "VEDHA". */
    WORDMARK: wordmark(content.name),
  };
}

export type SiteData = ReturnType<typeof buildSite>;

/** Bundled values — used where live content can't be read (OG images, robots) and as the fallback. */
export const { SITE, EMAIL_URL, PHONE_URL, WHATSAPP_URL, HEADER } = buildSite(SITE_CONTENT);

export type HeaderCopy = SiteContent["header"];
