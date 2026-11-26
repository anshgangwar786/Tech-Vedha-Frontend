// Pages for services added in the admin (Service catalogue → Added services → "Page" on).
//
// They use the same plain content shape as the built-in pages (data/service-pages.ts → ServicePageContent): icons
// and tools picked by name, "What you get" cards with an optional image, a drawing choice and checklist lines, and
// every list addable. A new page starts from the copy below (empty lists for everything specific to the service,
// hidden until written); toServicePage() turns it into what the components render.
//
// The admin's editor uses CUSTOM_SERVICE_PAGE_DEFAULTS / _TEMPLATES / SERVICE_ICON_NAMES through
// Tech-Vedha-Admin/data/customServicePage.json, written by `npm run sync:defaults` there.

import type { ListTemplates } from "@/lib/content/mergeContent";
import {
  SERVICE_PAGE_TEMPLATES,
  contactSection,
  coverageExtras,
  faqHelp,
  heroA11y,
  heroButtons,
  inWebsiteOrder,
  pageStories,
  processA11y,
  processBanner,
  toServicePage,
  type ServicePageContent,
} from "@/data/service-pages";

export { SERVICE_ICON_NAMES, SERVICE_ICONS, type ServiceIconName } from "@/data/service-icons";
export { toServicePage };

/** A page written in the admin: the same shape as the built-in pages. */
export type CustomServicePageContent = ServicePageContent;

/**
 * What a new page starts with: copy that is true of any Tech Vedha service, and empty lists for everything specific
 * to the service (hidden until written).
 */
export const CUSTOM_SERVICE_PAGE_DEFAULTS: CustomServicePageContent = inWebsiteOrder<CustomServicePageContent>({
  id: "",
  seo: { title: "", description: "", keywords: [] },
  hero: {
    breadcrumb: { homeLabel: "Home", homeHref: "/", servicesLabel: "Services", servicesHref: "/#services", currentLabel: "" },
    eyebrow: "",
    title: "",
    highlight: "",
    intro: "",
    ...heroButtons(),
    platforms: [],
    a11y: heroA11y(),
  },
  coverage: {
    eyebrow: "What we cover",
    title: ["Everything it covers,", "under one roof."],
    intro: "Hire us for one part, or for all of them together.",
    items: [],
    ...coverageExtras("Tell us what you need. We'll suggest where to start."),
  },
  whyUs: {
    eyebrow: "Why Tech Vedha",
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
    eyebrow: "What you get",
    title: ["Real things you can", "review and keep."],
    intro: "Every project ends with deliverables you own and can review at each step.",
    ctaLabel: "Explore",
    cards: [],
    ownership: { title: "You own everything", detail: "Handed over at the end, in your name.", items: [] },
  },
  useCases: { eyebrow: "Who it's for", title: ["Who it's", "built for."], intro: "", items: [] },
  process: {
    eyebrow: "How it works",
    title: ["How it", "gets done."],
    intro: "",
    tracks: [],
    banner: processBanner("Tell us what you need and we'll start with a discovery call."),
    a11y: processA11y(),
  },
  techStack: {
    eyebrow: "Tech stack",
    title: "Proven tools.",
    highlight: "Zero lock-in.",
    intro: "",
    highlights: [],
    toolsWord: "tools",
    groups: [],
  },
  stories: pageStories(""),
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    ...faqHelp(),
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
  contact: contactSection(),
});

/** Only the internal id is locked (hidden in the editor); every list can grow or shrink. Must match the admin. */
export const CUSTOM_SERVICE_PAGE_LOCKED: readonly string[] = ["id"];

/** Starting values of new items: the same as the built-in pages. */
export const CUSTOM_SERVICE_PAGE_TEMPLATES: ListTemplates = SERVICE_PAGE_TEMPLATES;
