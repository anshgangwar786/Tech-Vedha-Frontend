export type ServiceId = "marketing" | "apps" | "cad" | "software";

export type Service = {
  id: ServiceId;
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

/** Services whose page content exists in data/service-pages.ts. Add an id here when its page is ready. */
const LIVE_PAGES: ReadonlySet<ServiceId> = new Set(["marketing", "apps"]);

/** True once the service has its own page at /services/<slug>. */
export function hasServicePage(id: ServiceId): boolean {
  return LIVE_PAGES.has(id);
}

/** Where a service links to: its own page when built, otherwise its card on the homepage. */
export function serviceHref(id: ServiceId): string {
  const service = SERVICES.find((item) => item.id === id);
  return service && hasServicePage(id) ? `/services/${service.slug}` : `/#service-${id}`;
}

export const SERVICES: Service[] = [
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
