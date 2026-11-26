import { addedServiceSlugs } from "@/lib/content/serviceSlugs";

/**
 * The service catalogue (Tech-Vedha-Admin → Services → Service catalogue): which service pages exist, at which
 * address, and the name and one-line summary search engines see (Organization JSON-LD).
 *
 * Nothing a visitor reads on a page comes from here: every page keeps its own copy of the service names, numbers,
 * summaries and links it shows (header menu and footer in Site & menus, homepage cards, About cards, form options…),
 * so each page can be edited on its own.
 */

/** The four built-in services. Code is tied to these ids (their pages and page keys). */
export type ServiceId = "marketing" | "apps" | "cad" | "software";

/** A catalogue entry as edited in the admin (Service catalogue → Services). */
export type CatalogueService = {
  /** A built-in ServiceId, or the slug of a service added in the admin. */
  id: string;
  /** URL segment of the service page: /services/<slug>. */
  slug: string;
  /** Name for search engines and the admin. */
  title: string;
  /** One sentence for search engines. */
  summary: string;
};

/** A service as the site routes it: its catalogue entry, and whether it has its own page at /services/<slug>. */
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

/** Address of a service's page. */
export function serviceHref(service: Service): string {
  return `/services/${service.slug}`;
}

/** Bundled catalogue (the admin's defaults). Pages read the live one via server/content.ts → getServices(). */
export const SERVICE_CATALOGUE: CatalogueService[] = [
  {
    id: "marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    summary: "SEO, Meta, YouTube, email and WhatsApp campaigns that bring customers in.",
  },
  {
    id: "apps",
    slug: "app-development",
    title: "App Development",
    summary: "Android and iOS apps, designed, tested, launched and supported.",
  },
  {
    id: "cad",
    slug: "cad-design-and-planning",
    title: "CAD Design and Planning",
    summary: "2D/3D plans and BOQ for homes, retail spaces and industry.",
  },
  {
    id: "software",
    slug: "software-and-cybersecurity",
    title: "Software and Cybersecurity",
    summary: "Custom software on subscription or one-time, protected end to end.",
  },
];

const BUILT_IN_IDS: ReadonlySet<string> = new Set(SERVICE_CATALOGUE.map((service) => service.id));

/** A service added in the admin (Service catalogue → Added services). */
export type AddedService = {
  title: string;
  /** Its address (/services/<slug>). Made from the title when left empty. */
  slug: string;
  summary: string;
  /** Has its own page at /services/<slug>, written in the admin under Services → <title>. */
  page: boolean;
};

/** Item shape of the admin's "Added services" list, which is empty by default. */
export const ADDED_SERVICE_TEMPLATE: AddedService = { title: "", slug: "", summary: "", page: false };

/**
 * The full catalogue: the built-in services, then the ones added in the admin. Added services without a title are
 * skipped (a half-filled draft never shows up); each gets a unique slug (lib/content/serviceSlugs.ts, shared with the
 * admin).
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
    extra.push({ id: slug, slug, title: item.title.trim(), summary: item.summary.trim(), page: item.page });
  });
  return [...builtIn.map((service) => ({ ...service, page: LIVE_PAGES.has(service.id) })), ...extra];
}

/** The bundled catalogue as the site routes it (fallback when the admin is unreachable). */
export const SERVICES: Service[] = withAddedServices(SERVICE_CATALOGUE, []);

/** Admin document of the catalogue: the built-in services and the added ones (empty until then). */
export const SERVICES_CONTENT = { items: SERVICE_CATALOGUE, added: [] as AddedService[] };
/** Ids and slugs are tied to pages and code. Must match the admin. */
export const SERVICES_LOCKED = ["items[].id", "items[].slug"] as const;
export const SERVICES_TEMPLATES = { added: ADDED_SERVICE_TEMPLATE };

/** "Four", "Five" … for copy that counts things ("Four wings."). Digits past twelve. */
export function countWord(count: number): string {
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
  return words[count] ?? String(count);
}
