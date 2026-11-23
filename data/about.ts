import type { ServiceId } from "@/data/services";

/** About page copy (Figma "Tech Vedha — About"). Service names and wings come from data/services.ts. */

export const ABOUT_SEO = {
  title: "About Tech Vedha — One IT Partner for Your Space, Software, Apps and Marketing",
  description:
    "Tech Vedha plans your space, builds its software and apps, secures its data and markets it — one team for businesses in India and abroad.",
  keywords: [
    "about Tech Vedha",
    "IT company India",
    "one IT partner",
    "CAD, software, apps and marketing",
    "IT services for retail and showrooms",
  ],
};

/** Tags shown on each wing card in the hero panel. */
export const WING_TAGS: Record<ServiceId, string[]> = {
  marketing: ["SEO", "Meta Ads", "WhatsApp"],
  apps: ["Android", "iOS", "UI/UX"],
  cad: ["2D/3D", "BOQ", "Retail"],
  software: ["Subscription", "Security"],
};

export const HERO_FACTS = [
  { label: "Services", value: "Four wings, one team" },
  { label: "Where", value: "India and abroad" },
  { label: "Software models", value: "Subscription or one-time" },
  { label: "Apps", value: "Android and iOS" },
];

/** "Why we exist": what juggling four vendors looks like, against one team. */
export const VENDOR_COMPARISON = [
  { topic: "Who you call", vendors: ["Designer", "Developer", "App agency", "Marketer"], us: "One team, one point of contact" },
  { topic: "Timelines", vendors: ["Plan A", "Plan B", "Plan C", "Plan D"], us: "One shared plan from start to launch" },
  { topic: "Handoffs", vendors: ["Files emailed", "Briefs repeated", "Specs lost"], us: "No handoffs — the same team builds it all" },
  { topic: "Updates", vendors: ["4 chats", "4 status calls"], us: "One update covering every wing" },
  { topic: "When something breaks", vendors: ["Who owns it?", "Back-and-forth"], us: "One team owns the fix" },
];

export type AudienceIcon = "retail" | "homes" | "commercial" | "growth";

export const AUDIENCES: { title: string; detail: string; icon: AudienceIcon; tags: string[] }[] = [
  {
    title: "Retail and showrooms",
    detail: "Shops and showrooms that need a layout, billing, an app and customers through the door.",
    icon: "retail",
    tags: ["CAD", "Software", "Apps", "Marketing"],
  },
  {
    title: "Homes and builders",
    detail: "Homeowners, villa and apartment projects that need accurate plans and costing.",
    icon: "homes",
    tags: ["2D/3D plans", "BOQ"],
  },
  {
    title: "Commercial and industrial",
    detail: "Offices, warehouses and plants planned at scale, with software to run them.",
    icon: "commercial",
    tags: ["Planning", "Software", "Security"],
  },
  {
    title: "Growing businesses",
    detail: "Teams in India and abroad that want one partner instead of four vendors.",
    icon: "growth",
    tags: ["Any wing", "India and abroad"],
  },
];

export type LoopStep = {
  service: ServiceId;
  /** Short label on the ring, e.g. "CAD Design". */
  wing: string;
  /** What the step covers in general ("What it covers" view). */
  covers: { title: string; detail: string; tags: string[] };
  /** The same step for one example project: a new retail showroom. */
  example: { title: string; tags: string[] };
};

/** "One loop. Every wing.": the four services in the order a project moves through them. */
export const LOOP_STEPS: LoopStep[] = [
  {
    service: "cad",
    wing: "CAD Design",
    covers: {
      title: "Design the space",
      detail: "Plan the showroom, shop or site with accurate 2D and 3D drawings and a costed bill of quantities.",
      tags: ["2D and 3D", "BOQ", "Space planning"],
    },
    example: { title: "Showroom floor plan", tags: ["2D layout", "3D walkthrough", "Costed BOQ"] },
  },
  {
    service: "software",
    wing: "Software",
    covers: {
      title: "Build the infrastructure",
      detail: "Billing, stock and operations software to run it — on subscription or one-time, protected from day one.",
      tags: ["Subscription", "One-time", "Security"],
    },
    example: { title: "Billing and stock software", tags: ["GST billing", "Live stock", "Staff logins"] },
  },
  {
    service: "apps",
    wing: "Apps",
    covers: {
      title: "Create the interface",
      detail: "Android and iOS apps so customers can browse, book and buy from anywhere.",
      tags: ["Android", "iOS", "UI/UX"],
    },
    example: { title: "The showroom’s customer app", tags: ["Product catalogue", "Offers and orders", "Android and iOS"] },
  },
  {
    service: "marketing",
    wing: "Marketing",
    covers: {
      title: "Drive the traffic",
      detail: "SEO, Meta, YouTube, email and WhatsApp campaigns that bring people to the space and the app.",
      tags: ["SEO", "Meta Ads", "WhatsApp"],
    },
    example: { title: "Launch campaign", tags: ["Meta and Google ads", "WhatsApp broadcast", "Local SEO"] },
  },
];

export const LOOP_EXAMPLE_DETAIL = "What this step would produce for one example project: a new retail showroom.";

export const PRINCIPLES = [
  { title: "One point of contact", detail: "You talk to one team for every service, so nothing gets lost between vendors." },
  { title: "Plan before we build", detail: "Drawings, screens and architecture are agreed with you before any build starts." },
  { title: "Security from day one", detail: "Protection is designed into every build, not added at the end." },
  { title: "We stay after launch", detail: "Updates, fixes and support from the same team that built it." },
];

export const MISSION = {
  statement: "Give businesses one trusted partner for complete IT solutions.",
  detail: "Space, software, apps, security and marketing — planned and delivered by the same team.",
};

export const VISION = {
  statement: "Help businesses in India and abroad build for tomorrow.",
  regions: ["India", "Abroad"],
};
