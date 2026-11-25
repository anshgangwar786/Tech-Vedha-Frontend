// Pages for services added in the admin (Service catalogue → Added services → "Has its own page").
//
// The built-in pages (data/service-pages.ts) use icons, illustrations and tool logos that live in code. A page written
// in the admin can't, so its content is plain JSON: icons are picked by name from SERVICE_ICONS, "What you get" cards
// draw a checklist from their own items, and tech-stack tools are typed by name (TOOLS_BY_NAME gives the known ones
// their logo). toServicePage() turns it into the shape the service page components render.
//
// The admin's editor uses CUSTOM_SERVICE_PAGE_DEFAULTS / _TEMPLATES / SERVICE_ICON_NAMES through
// Tech-Vedha-Admin/data/customServicePage.json, written by `npm run sync:defaults` there.

import {
  Bot,
  Briefcase,
  Building2,
  Camera,
  ChartColumn,
  ChartLine,
  CircleCheck,
  Clock,
  Cloud,
  Code,
  Cpu,
  Database,
  Factory,
  FileText,
  Globe,
  GraduationCap,
  Handshake,
  Headphones,
  HeartPulse,
  House,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  Megaphone,
  MessageCircle,
  Monitor,
  Package,
  Palette,
  PenTool,
  Rocket,
  Ruler,
  Search,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Truck,
  Users,
  Video,
  Wallet,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ListTemplates } from "@/lib/content/mergeContent";
import { slugify } from "@/lib/content/serviceSlugs";
import {
  SERVICE_PAGE_LABELS,
  TOOLS_BY_NAME,
  type ResolvedServicePage,
  type ServicePageLabels,
  type TechTool,
} from "@/data/service-pages";
import type { Service } from "@/data/services";

/** Icons an admin can pick for cards on their page (dropdown in the editor). */
export const SERVICE_ICONS = {
  sparkles: Sparkles,
  check: CircleCheck,
  layers: Layers,
  rocket: Rocket,
  target: Target,
  lightbulb: Lightbulb,
  zap: Zap,
  workflow: Workflow,
  settings: Settings,
  wrench: Wrench,
  code: Code,
  bot: Bot,
  cpu: Cpu,
  server: Server,
  cloud: Cloud,
  database: Database,
  monitor: Monitor,
  smartphone: Smartphone,
  globe: Globe,
  shield: Shield,
  "shield-check": ShieldCheck,
  lock: Lock,
  "chart-column": ChartColumn,
  "chart-line": ChartLine,
  "trending-up": TrendingUp,
  megaphone: Megaphone,
  search: Search,
  mail: Mail,
  message: MessageCircle,
  video: Video,
  camera: Camera,
  palette: Palette,
  "pen-tool": PenTool,
  ruler: Ruler,
  "file-text": FileText,
  users: Users,
  handshake: Handshake,
  headphones: Headphones,
  briefcase: Briefcase,
  store: Store,
  "shopping-cart": ShoppingCart,
  wallet: Wallet,
  package: Package,
  truck: Truck,
  building: Building2,
  house: House,
  factory: Factory,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  clock: Clock,
} satisfies Record<string, LucideIcon>;

export type ServiceIconName = keyof typeof SERVICE_ICONS;
export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS) as ServiceIconName[];

const icon = (name: string): LucideIcon => SERVICE_ICONS[name as ServiceIconName] ?? Sparkles;

type IconCard = { title: string; detail: string; icon: string };

/** A page written in the admin. Empty lists and fields fall back to the service's catalogue entry or are hidden. */
export type CustomServicePageContent = {
  seo: { title: string; description: string; keywords: string[] };
  hero: { title: string; highlight: string; intro: string; platforms: string[] };
  labels: ServicePageLabels;
  coverage: { title: string[]; intro: string; items: IconCard[]; helpText: string };
  whyUs: { title: string[]; icon: string; points: { title: string; detail: string }[] };
  deliverables: {
    title: string[];
    intro: string;
    cards: { title: string; detail: string; checklist: string[] }[];
    ownership: { title: string; detail: string; items: string[] };
  };
  useCases: { title: string[]; intro: string; items: IconCard[] };
  process: {
    title: string[];
    intro: string;
    ctaDetail: string;
    tracks: { label: string; steps: { title: string; summary: string; deliverables: string[] }[] }[];
  };
  techStack: {
    eyebrow: string;
    title: string;
    highlight: string;
    intro: string;
    highlights: string[];
    groups: { title: string; tagline: string; tools: string[] }[];
  };
  faq: { title: string; items: { question: string; answer: string }[] };
};

/**
 * What a new page starts with: copy that is true of any Tech Vedha service, and empty lists for everything specific
 * to the service (hidden until written). The hero and "What we cover" fall back to the catalogue entry.
 */
export const CUSTOM_SERVICE_PAGE_DEFAULTS: CustomServicePageContent = {
  seo: { title: "", description: "", keywords: [] },
  hero: { title: "", highlight: "", intro: "", platforms: [] },
  labels: { ...SERVICE_PAGE_LABELS },
  coverage: {
    title: ["Everything it covers,", "under one roof."],
    intro: "Hire us for one part, or for all of them together.",
    items: [],
    helpText: "Tell us what you need. We'll suggest where to start.",
  },
  whyUs: {
    title: ["One team, from the first", "plan to every update."],
    icon: "sparkles",
    points: [
      { title: "One point of contact", detail: "One person runs your project and answers your questions, start to finish." },
      { title: "Plan before we build", detail: "Scope, timeline and cost agreed in writing before any work starts." },
      { title: "Security from day one", detail: "Access, data and backups are protected from the very first day." },
      { title: "We stay after launch", detail: "Updates, fixes and support continue once the work is live." },
    ],
  },
  deliverables: {
    title: ["Real things you can", "review and keep."],
    intro: "Every project ends with deliverables you own and can review at each step.",
    cards: [],
    ownership: { title: "You own everything", detail: "Handed over at the end, in your name.", items: [] },
  },
  useCases: { title: ["Who it's", "built for."], intro: "", items: [] },
  process: {
    title: ["How it", "gets done."],
    intro: "",
    ctaDetail: "Tell us what you need and we'll start with a discovery call.",
    tracks: [],
  },
  techStack: { eyebrow: "Tech stack", title: "Proven tools.", highlight: "Zero lock-in.", intro: "", highlights: [], groups: [] },
  faq: {
    title: "Questions, answered.",
    items: [
      {
        question: "How long does a project take?",
        answer: "It depends on the scope. After the discovery call you get a written plan with a timeline, before any work starts.",
      },
      {
        question: "Can you work with what we already have?",
        answer: "Yes. We start by reviewing your current setup, then plan the changes with you.",
      },
      {
        question: "Do you work with businesses outside India?",
        answer: "Yes. We work with businesses across India and abroad.",
      },
    ],
  },
};

/** Item shape of the lists that start empty (lib/content/mergeContent.ts reads saved items with these). */
export const CUSTOM_SERVICE_PAGE_TEMPLATES: ListTemplates = {
  "seo.keywords": "",
  "hero.platforms": "",
  "coverage.items": { title: "", detail: "", icon: "sparkles" },
  "deliverables.cards": { title: "", detail: "", checklist: [""] },
  "deliverables.ownership.items": "",
  "useCases.items": { title: "", detail: "", icon: "store" },
  "process.tracks": { label: "", steps: [{ title: "", summary: "", deliverables: [""] }] },
  "techStack.highlights": "",
  "techStack.groups": { title: "", tagline: "", tools: [""] },
};

const text = (value: string) => value.trim();
const lines = (values: string[]) => values.map(text).filter(Boolean);
/** A heading's lines, or the default heading when every line is empty. */
const heading = (values: string[], fallback: string[]) => (lines(values).length ? lines(values) : fallback);

/** A tool by name: its logo when a built-in page has it, otherwise a letter badge. */
function toolByName(name: string): TechTool {
  const known = TOOLS_BY_NAME.get(name.toLowerCase());
  if (known) return { ...known, name };
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return { name, initials: initials || "•" };
}

/** The page as the service page components render it. Blank items are dropped, empty fields fall back. */
export function toServicePage(content: CustomServicePageContent, service: Service): ResolvedServicePage {
  const d = CUSTOM_SERVICE_PAGE_DEFAULTS;
  const { seo, hero, labels, coverage, whyUs, deliverables, useCases, process, techStack, faq } = content;
  const iconCards = (items: IconCard[]) =>
    items.filter((item) => text(item.title)).map((item) => ({ title: text(item.title), detail: text(item.detail), icon: icon(item.icon) }));

  const coverageItems = iconCards(coverage.items);
  const tracks = process.tracks
    .map((track, index) => ({
      id: slugify(track.label) || `track-${index + 1}`,
      label: text(track.label) || `Option ${index + 1}`,
      steps: track.steps
        .filter((step) => text(step.title))
        .map((step) => ({ title: text(step.title), summary: text(step.summary), deliverables: lines(step.deliverables) })),
    }))
    .filter((track) => track.steps.length);

  return {
    id: service.id,
    service,
    seo: {
      title: text(seo.title) || service.title,
      description: text(seo.description) || service.summary || `${service.title} from Tech Vedha, for businesses in India and abroad.`,
      keywords: lines(seo.keywords),
    },
    hero: {
      title: text(hero.title) || service.title,
      highlight: text(hero.highlight) || "from one partner.",
      intro: text(hero.intro) || service.summary,
      platforms: lines(hero.platforms),
    },
    // An emptied label falls back to the standard one.
    labels: Object.fromEntries(
      Object.entries(d.labels).map(([key, fallback]) => [key, text(labels[key as keyof ServicePageLabels] ?? "") || fallback]),
    ) as ServicePageLabels,
    coverage: {
      title: heading(coverage.title, d.coverage.title),
      intro: text(coverage.intro),
      // Until cards are written, the catalogue's offerings stand in.
      items: coverageItems.length
        ? coverageItems
        : service.offerings.map((offering) => ({ title: offering.title, detail: offering.detail, icon: CircleCheck })),
      helpText: text(coverage.helpText) || d.coverage.helpText,
    },
    whyUs: {
      title: heading(whyUs.title, d.whyUs.title),
      icon: icon(whyUs.icon),
      points: whyUs.points.filter((point) => text(point.title)).map((point) => ({ title: text(point.title), detail: text(point.detail) })),
    },
    deliverables: {
      title: heading(deliverables.title, d.deliverables.title),
      intro: text(deliverables.intro),
      cards: deliverables.cards
        .filter((card) => text(card.title))
        .map((card) => ({ title: text(card.title), detail: text(card.detail), checklist: lines(card.checklist), href: "" })),
      ownership: {
        title: text(deliverables.ownership.title) || d.deliverables.ownership.title,
        detail: text(deliverables.ownership.detail),
        items: lines(deliverables.ownership.items),
      },
    },
    useCases: { title: heading(useCases.title, d.useCases.title), intro: text(useCases.intro), items: iconCards(useCases.items) },
    // Without tracks the page shows the shared six-step process (components/service/HowItWorks.tsx).
    process: tracks.length
      ? { title: heading(process.title, d.process.title), intro: text(process.intro), tracks, ctaDetail: text(process.ctaDetail) }
      : undefined,
    techStack: {
      eyebrow: text(techStack.eyebrow) || d.techStack.eyebrow,
      title: text(techStack.title) || d.techStack.title,
      highlight: text(techStack.highlight),
      intro: text(techStack.intro),
      highlights: lines(techStack.highlights),
      groups: techStack.groups
        .map((group) => ({ title: text(group.title), tagline: text(group.tagline), tools: lines(group.tools).map(toolByName) }))
        .filter((group) => group.title && group.tools.length),
    },
    faq: {
      title: text(faq.title) || d.faq.title,
      items: faq.items.filter((item) => text(item.question) && text(item.answer)).map((item) => ({ question: text(item.question), answer: text(item.answer) })),
    },
  };
}
