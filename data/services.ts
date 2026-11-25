import { addedServiceSlugs } from "@/lib/content/serviceSlugs";

/** The four built-in services. Code is tied to these ids (pages, scenes, About loop steps). */
export type ServiceId = "marketing" | "apps" | "cad" | "software";

/** A catalogue entry as edited in the admin (Service catalogue → Services). */
export type CatalogueService = {
  /** A built-in ServiceId, or the slug of a service added in the admin. Used in anchors: /#service-<id>. */
  id: string;
  /** URL segment of the service page: /services/<slug>. */
  slug: string;
  number: string;
  wing: string;
  title: string;
  summary: string;
  /** Shorter label used in the outline marquee. */
  short: string[];
  offerings: { title: string; detail: string }[];
};

/** A service as the site shows it: its catalogue entry, and whether it has its own page at /services/<slug>. */
export type Service = CatalogueService & { page: boolean };

/** Built-in services whose page content exists in data/service-pages.ts. Add an id here when its page is ready. */
const LIVE_PAGES: ReadonlySet<string> = new Set<ServiceId>(["marketing", "apps"]);

/** True once the service has its own page at /services/<slug> (a built-in page, or an added service's page). */
export function hasServicePage(service: Service): boolean {
  return service.page;
}

/** True for the four built-in services (as opposed to ones added in the admin). */
export function isBuiltInService(id: string): id is ServiceId {
  return BUILT_IN_IDS.has(id);
}

/** Where a service links to: its own page when it has one, otherwise its card on the homepage. */
export function serviceHref(service: Service): string {
  return service.page ? `/services/${service.slug}` : `/#service-${service.id}`;
}

/** Bundled catalogue (the admin's defaults). Pages read the live one via server/content.ts → getServices(). */
export const SERVICE_CATALOGUE: CatalogueService[] = [
  {
    id: "marketing",
    slug: "digital-marketing",
    number: "01",
    wing: "Foot traffic",
    title: "Digital Marketing",
    summary: "SEO, Meta, YouTube, email and WhatsApp campaigns that bring customers in.",
    short: ["Digital Marketing"],
    offerings: [
      { title: "SEO", detail: "Rank higher, grow organic traffic" },
      { title: "Meta Ads", detail: "Facebook and Instagram campaigns" },
      { title: "YouTube Marketing", detail: "Video and channel growth" },
      { title: "Email Marketing", detail: "Targeted global campaigns" },
      { title: "WhatsApp Marketing", detail: "Broadcasts and business messaging" },
    ],
  },
  {
    id: "apps",
    slug: "app-development",
    number: "02",
    wing: "Front doors",
    title: "App Development",
    summary: "Android and iOS apps, designed, tested, launched and supported.",
    short: ["App Development"],
    offerings: [
      { title: "Android Apps", detail: "Native, high-performance" },
      { title: "iOS Apps", detail: "Secure, intuitive" },
      { title: "UI/UX Design", detail: "Interfaces people enjoy" },
      { title: "Testing and Launch", detail: "QA to store release" },
      { title: "Ongoing Support", detail: "Updates and maintenance" },
    ],
  },
  {
    id: "cad",
    slug: "cad-design-and-planning",
    number: "03",
    wing: "Architecture",
    title: "CAD Design and Planning",
    summary: "2D/3D plans and BOQ for homes, retail spaces and industry.",
    short: ["CAD Design"],
    offerings: [
      { title: "Residential", detail: "Homes, villas, apartments" },
      { title: "Retail and Showrooms", detail: "Shop layout planning" },
      { title: "Commercial and Industrial", detail: "Large-scale planning" },
      { title: "2D and 3D Modelling", detail: "Accurate drawings" },
      { title: "BOQ", detail: "Bill of quantities" },
    ],
  },
  {
    id: "software",
    slug: "software-and-cybersecurity",
    number: "04",
    wing: "Foundation",
    title: "Software and Cybersecurity",
    summary: "Custom software on subscription or one-time, protected end to end.",
    short: ["Software", "Cybersecurity"],
    offerings: [
      { title: "Subscription Software", detail: "Monthly or yearly, always supported" },
      { title: "One-time Software", detail: "Full ownership" },
      { title: "Threat Detection", detail: "Prevention and monitoring" },
      { title: "Network and Data Protection", detail: "Secure your assets" },
      { title: "Compliance and Risk", detail: "Stay audit-ready" },
    ],
  },
];

const BUILT_IN_IDS: ReadonlySet<string> = new Set(SERVICE_CATALOGUE.map((service) => service.id));

/** A service added in the admin (Service catalogue → Added services). Shown after the built-in four. */
export type AddedService = {
  title: string;
  /** Anchor on the homepage (/#service-<slug>). Made from the title when left empty. */
  slug: string;
  wing: string;
  summary: string;
  short: string[];
  offerings: { title: string; detail: string }[];
  /** Has its own page at /services/<slug>, written in the admin under Services → <title>. */
  page: boolean;
};

/**
 * Item shape of the admin's "Added services" list, which is empty by default (lib/content/mergeContent.ts uses it
 * to read saved items, the admin editor to create new ones). Blank values: an unfilled field never reaches the site.
 */
export const ADDED_SERVICE_TEMPLATE: AddedService = {
  title: "",
  slug: "",
  wing: "",
  summary: "",
  short: [""],
  offerings: [{ title: "", detail: "" }],
  page: false,
};

/**
 * The full catalogue: the built-in services, then the ones added in the admin. Added services without a title are
 * skipped (a half-filled draft never shows up); each gets a unique slug (lib/content/serviceSlugs.ts, shared with the
 * admin), the next number and fallbacks for empty fields.
 */
export function withAddedServices(builtIn: CatalogueService[], added: AddedService[]): Service[] {
  const slugs = addedServiceSlugs(
    builtIn.flatMap((service) => [service.id, service.slug]),
    added,
  );
  const extra: Service[] = [];
  added.forEach((item, index) => {
    const slug = slugs[index];
    if (!slug) return;
    const title = item.title.trim();
    const short = item.short.map((word) => word.trim()).filter(Boolean);
    extra.push({
      id: slug,
      slug,
      number: String(builtIn.length + extra.length + 1).padStart(2, "0"),
      wing: item.wing.trim() || "New service",
      title,
      summary: item.summary.trim(),
      short: short.length ? short : [title],
      offerings: item.offerings
        .map((offering) => ({ title: offering.title.trim(), detail: offering.detail.trim() }))
        .filter((offering) => offering.title),
      page: item.page,
    });
  });
  return [...builtIn.map((service) => ({ ...service, page: LIVE_PAGES.has(service.id) })), ...extra];
}

/** The bundled catalogue as the site shows it (fallback when the admin is unreachable). */
export const SERVICES: Service[] = withAddedServices(SERVICE_CATALOGUE, []);

/** "Four", "Five" … for copy that counts the services ("Four wings."). Digits past twelve. */
export function countWord(count: number): string {
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
  return words[count] ?? String(count);
}
