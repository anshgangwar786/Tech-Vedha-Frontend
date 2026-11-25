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

/** Hero: intro beside the "What we do" panel. */
export const ABOUT_HERO = {
  eyebrow: "About Tech Vedha",
  titleLead: "One partner.",
  titleAccent: "Built for tomorrow.",
  intro:
    "Tech Vedha is an IT company that plans your space, builds its software and apps, secures its data and markets it — with one team, for businesses in India and abroad.",
  primaryCta: { label: "Start a project", href: "/#contact" },
  secondaryCta: { label: "How it connects", href: "#how-it-connects" },
  /** {count} = number of services in words. */
  panelLabel: "What we do · {count} wings",
  panelBadge: "One team",
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

/** "Why we exist" section header and table column labels. */
export const WHY_WE_EXIST = {
  eyebrow: "Why we exist",
  title: ["Four vendors. Four timelines.", "One headache."],
  intro:
    "Most businesses juggle a designer, a developer, an app agency and a marketer. We started Tech Vedha to replace all four with one team.",
  topicHeader: "What it takes",
  vendorsHeader: "Four separate vendors",
  usHeader: "Tech Vedha",
};

/** "Why we exist": what juggling four vendors looks like, against one team. */
export const VENDOR_COMPARISON = [
  { topic: "Who you call", vendors: ["Designer", "Developer", "App agency", "Marketer"], us: "One team, one point of contact" },
  { topic: "Timelines", vendors: ["Plan A", "Plan B", "Plan C", "Plan D"], us: "One shared plan from start to launch" },
  { topic: "Handoffs", vendors: ["Files emailed", "Briefs repeated", "Specs lost"], us: "No handoffs — the same team builds it all" },
  { topic: "Updates", vendors: ["4 chats", "4 status calls"], us: "One update covering every wing" },
  { topic: "When something breaks", vendors: ["Who owns it?", "Back-and-forth"], us: "One team owns the fix" },
];

/** "Who we work with" section header. */
export const WHO_WE_WORK_WITH = {
  eyebrow: "Who we work with",
  title: ["Built for businesses", "with a space to run."],
  intro: "From a single home to an industrial site — and the shops, showrooms and teams in between.",
};

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

/** "How it connects" section header and the loop's labels. */
export const HOW_IT_CONNECTS = {
  eyebrow: "How everything connects",
  title: ["One loop.", "Every wing."],
  intro: "Each service feeds the next. Pick a step to see what it covers.",
  coversLabel: "What it covers",
  exampleLabel: "Example: a new showroom",
  /** Shown instead of exampleLabel on small phones. */
  exampleShortLabel: "Example",
  /** Panel label in the example view, before "Step n of 4". */
  examplePanelLabel: "Example · New showroom",
  /** Centre of the ring. */
  centerLabel: ["Client", "success"],
  /** Label on each step around the ring. {n} = step number. */
  stepTab: "Step {n}",
  /** Panel counter. {n} = step number, {total} = number of steps. */
  stepCounter: "Step {n} of {total}",
};

export const LOOP_EXAMPLE_DETAIL = "What this step would produce for one example project: a new retail showroom.";

/** "How we work" section header. */
export const HOW_WE_WORK = {
  eyebrow: "How we work",
  title: ["Four things we", "always do."],
  intro: "However big the project, and whichever wing it starts in.",
};

export const PRINCIPLES = [
  { title: "One point of contact", detail: "You talk to one team for every service, so nothing gets lost between vendors." },
  { title: "Plan before we build", detail: "Drawings, screens and architecture are agreed with you before any build starts." },
  { title: "Security from day one", detail: "Protection is designed into every build, not added at the end." },
  { title: "We stay after launch", detail: "Updates, fixes and support from the same team that built it." },
];

/** "Mission and vision" section header and card labels. */
export const MISSION_VISION = {
  eyebrow: "Mission and vision",
  title: ["What we’re here", "to do."],
  intro: "One purpose and one direction behind every project, in every wing.",
  missionLabel: "Mission",
  visionLabel: "Vision",
};

export const MISSION = {
  statement: "Give businesses one trusted partner for complete IT solutions.",
  detail: "Space, software, apps, security and marketing — planned and delivered by the same team.",
};

export const VISION = {
  statement: "Help businesses in India and abroad build for tomorrow.",
  regions: ["India", "Abroad"],
};
