import type { ContactSectionContent } from "@/components/home/Contact";
import { ENQUIRY_FORM_COPY, formCopy } from "@/data/forms";
import { serviceIcon } from "@/data/service-icons";
import { toolByName, type TechTool } from "@/data/service-tools";
import { SERVICES, type Service } from "@/data/services";
import { STORY_TEMPLATE, storiesSection, type StoriesContent } from "@/data/stories";
import { slugify } from "@/lib/content/serviceSlugs";
import type { LucideIcon } from "lucide-react";

export type { TechTool } from "@/data/service-tools";

// Service pages. The built-in pages (App Development, Digital Marketing) and the pages of services added in the admin
// (data/custom-service-pages.ts) share ONE plain content shape (ServicePageContent): icons and tools are picked by
// name, "What you get" cards hold an optional image, a drawing choice and checklist lines, and every list can grow or
// shrink. toServicePage() turns that content into what the components render (ResolvedServicePage).

/** Drawings a "What you get" card can show when it has no image. "checklist" draws the card's own lines. */
export const DELIVERABLE_VISUALS = [
  "checklist",
  "app-screens",
  "release-checklist",
  "campaign-dashboard",
  "campaign-checklist",
  "search-rankings",
  "monthly-report",
] as const;
export type DeliverableVisual = Exclude<(typeof DELIVERABLE_VISUALS)[number], "checklist">;

/** An image: file address, alt text and its pixel size. Empty src = none. */
export type ImageCopy = { src: string; alt: string; width: number; height: number };
const NO_IMAGE = (): ImageCopy => ({ src: "", alt: "", width: 0, height: 0 });

/** A checklist drawing: title and lines (ticked when `done`). */
export type ChecklistCopy = { title: string; items: { label: string; done: boolean }[] };

/** Words drawn on the checklist pictures. Part of the fixed drawings, not edited in the admin. */
export type ChecklistLabels = { passed: string; inReview: string; titleSuffix: string };
export const CHECKLIST_LABELS: ChecklistLabels = { passed: "Passed", inReview: "In review", titleSuffix: "CHECKLIST" };

/** Texts of the drawn "What you get" pictures (components/service/visuals.tsx). Fixed design, not edited in the admin. */
export type DeliverableVisualsCopy = {
  appScreens: {
    storeName: string;
    searchPlaceholder: string;
    bannerLabel: string;
    productName: string;
    productStock: string;
    addToCart: string;
  };
  releaseChecklist: ChecklistCopy;
  campaignDashboard: {
    title: string;
    badge: string;
    stats: { label: string; value: string }[];
    chart: ImageCopy;
    channels: { name: string; width: string }[];
    channelStatus: string;
    toastTitle: string;
    toastDetail: string;
  };
  campaignChecklist: ChecklistCopy;
  searchRankings: {
    title: string;
    badge: string;
    query: string;
    resultUrl: string;
    resultTitle: string;
    resultText: string;
    keywords: { keyword: string; width: string; rank: string }[];
    toastTitle: string;
    toastDetail: string;
  };
  monthlyReport: {
    title: string;
    badge: string;
    donutTop: string;
    donutBottom: string;
    channels: { name: string; share: number }[];
    notes: { title: string; detail: string }[];
    toastBadge: string;
    toastTitle: string;
    toastDetail: string;
  };
};

export const DELIVERABLE_VISUALS_COPY: DeliverableVisualsCopy = {
  appScreens: {
    storeName: "Your Showroom",
    searchPlaceholder: "Search sofas, lamps…",
    bannerLabel: "Festive sale",
    productName: "Oak lounge chair",
    productStock: "In stock · 3 stores",
    addToCart: "Add to cart"
  },
  releaseChecklist: {
    title: "RELEASE 1.0 · CHECKLIST",
    items: [
      {
        label: "Login and sign-up",
        done: true
      },
      {
        label: "Payments",
        done: true
      },
      {
        label: "Android devices",
        done: true
      },
      {
        label: "iPhone and iPad",
        done: true
      },
      {
        label: "Store listing",
        done: false
      }
    ]
  },
  campaignDashboard: {
    title: "CAMPAIGNS · LAST 30 DAYS",
    badge: "Live",
    stats: [
      {
        label: "Leads",
        value: "↑ Growing"
      },
      {
        label: "Top channel",
        value: "Google Search"
      },
      {
        label: "Report",
        value: "Monthly"
      }
    ],
    chart: {
      src: "/services/campaign-chart.svg",
      alt: "",
      width: 364,
      height: 64
    },
    channels: [
      {
        name: "Google Search",
        width: "86%"
      },
      {
        name: "Meta Ads",
        width: "68%"
      },
      {
        name: "YouTube",
        width: "44%"
      },
      {
        name: "Email",
        width: "56%"
      },
      {
        name: "WhatsApp",
        width: "74%"
      }
    ],
    channelStatus: "Live",
    toastTitle: "New enquiry",
    toastDetail: "From a Meta ad · just now"
  },
  campaignChecklist: {
    title: "CAMPAIGN LAUNCH · CHECKLIST",
    items: [
      {
        label: "Tracking and analytics",
        done: true
      },
      {
        label: "Keyword research",
        done: true
      },
      {
        label: "Ad creatives",
        done: true
      },
      {
        label: "Audience targeting",
        done: true
      },
      {
        label: "Budget and bids",
        done: false
      }
    ]
  },
  searchRankings: {
    title: "SEARCH RANKINGS · KEYWORDS",
    badge: "Google",
    query: "sofa store near me",
    resultUrl: "yourstore.in › sofas",
    resultTitle: "Sofas and lounge chairs — Your Store",
    resultText: "Visit our showroom or order online.",
    keywords: [
      {
        keyword: "sofa store near me",
        width: "92%",
        rank: "Top 3"
      },
      {
        keyword: "buy sofa online",
        width: "74%",
        rank: "Page 1"
      },
      {
        keyword: "oak lounge chair",
        width: "86%",
        rank: "Top 3"
      },
      {
        keyword: "home décor store",
        width: "64%",
        rank: "Page 1"
      },
      {
        keyword: "living room furniture",
        width: "46%",
        rank: "Rising"
      }
    ],
    toastTitle: "Page 1 on Google",
    toastDetail: "“sofa store near me”"
  },
  monthlyReport: {
    title: "MONTHLY REPORT · OCTOBER",
    badge: "Shared",
    donutTop: "Leads by",
    donutBottom: "channel",
    channels: [
      {
        name: "Search",
        share: 34
      },
      {
        name: "Meta",
        share: 24
      },
      {
        name: "YouTube",
        share: 10
      },
      {
        name: "Email",
        share: 12
      },
      {
        name: "WhatsApp",
        share: 20
      }
    ],
    notes: [
      {
        title: "What worked",
        detail: "Search and WhatsApp brought the most enquiries."
      },
      {
        title: "Next month",
        detail: "Shift budget from YouTube to Search and Meta retargeting."
      }
    ],
    toastBadge: "PDF",
    toastTitle: "October report",
    toastDetail: "Sent to your inbox"
  }
};

/** A button or link: visible label and where it goes. */
type Link = { label: string; href: string };

/** Breadcrumb trail at the top of a service page. */
export type ServiceBreadcrumb = {
  homeLabel: string;
  homeHref: string;
  servicesLabel: string;
  servicesHref: string;
  currentLabel: string;
};

type IconCard = { icon: string; title: string; detail: string };
type ProcessSteps = { title: string; summary: string; deliverables: string[] }[];

/**
 * Everything on one service page, section by section in page order, as plain data (what the admin edits). Every page
 * owns all of it: nothing is read from the homepage, the About page or the Service catalogue.
 */
export type ServicePageContent = {
  /** A built-in ServiceId (empty for the pages of added services, which take it from their slug). */
  id: string;
  seo: { title: string; description: string; keywords: string[] };
  hero: {
    breadcrumb: ServiceBreadcrumb;
    eyebrow: string;
    title: string;
    highlight: string;
    intro: string;
    primaryCta: Link;
    /** Empty link = the WhatsApp chat (number from Site & menus). */
    secondaryCta: Link;
    platforms: string[];
    a11y: { breadcrumbLabel: string; platformsLabel: string };
  };
  coverage: {
    eyebrow: string;
    title: string[];
    intro: string;
    items: IconCard[];
    itemCta: Link;
    helpTitle: string;
    helpText: string;
    helpCta: Link;
    /** {title} = the card's title. */
    a11y: { itemCtaSuffix: string };
  };
  whyUs: { eyebrow: string; title: string[]; icon: string; points: { title: string; detail: string }[] };
  deliverables: {
    eyebrow: string;
    title: string[];
    intro: string;
    /** Each card: an uploaded image, or else its drawing ("checklist" = drawn from its own lines). */
    cards: { image: ImageCopy; visual: string; checklist: string[]; title: string; detail: string; href: string }[];
    ctaLabel: string;
    ownership: { title: string; detail: string; items: string[] };
  };
  useCases: { eyebrow: string; title: string[]; intro: string; items: IconCard[] };
  process: {
    eyebrow: string;
    title: string[];
    intro: string;
    tracks: { label: string; steps: ProcessSteps }[];
    /** "Ready for step one?" banner under the steps; hidden when its text is empty. */
    banner: { heading: string; text: string; primaryCta: Link; secondaryCta: Link };
    a11y: { tabsLabel: string; deliverablesLabel: string };
  };
  techStack: {
    eyebrow: string;
    title: string;
    highlight: string;
    intro: string;
    highlights: string[];
    /** Tool names; a known name shows its logo (data/service-tools.ts), any other a letter badge. */
    groups: { title: string; tagline: string; tools: string[] }[];
    /** After the number of tools in a group, e.g. "6 tools". */
    toolsWord: string;
  };
  stories: StoriesContent & { initialFilter: string };
  faq: { eyebrow: string; title: string; helpTitle: string; helpText: string; items: { question: string; answer: string }[] };
  contact: ContactSectionContent;
};

export type ProcessTrack = { id: string; label: string; steps: ProcessSteps };

/** A service page as the components render it: icons and tools resolved, empty items dropped, catalogue attached. */
export type ResolvedServicePage = Omit<
  ServicePageContent,
  "coverage" | "whyUs" | "deliverables" | "useCases" | "process" | "techStack"
> & {
  service: Service;
  coverage: Omit<ServicePageContent["coverage"], "items"> & { items: { title: string; detail: string; icon: LucideIcon }[] };
  whyUs: Omit<ServicePageContent["whyUs"], "icon"> & { icon: LucideIcon };
  deliverables: Omit<ServicePageContent["deliverables"], "cards"> & {
    cards: { image: ImageCopy | null; visual: DeliverableVisual | null; checklist: string[]; title: string; detail: string; href: string }[];
  };
  useCases: Omit<ServicePageContent["useCases"], "items"> & { items: { title: string; detail: string; icon: LucideIcon }[] };
  /** Undefined when the page has no steps (the section is hidden). */
  process?: Omit<ServicePageContent["process"], "tracks"> & { tracks: ProcessTrack[] };
  techStack: Omit<ServicePageContent["techStack"], "groups"> & { groups: { title: string; tagline: string; tools: TechTool[] }[] };
};

/** @deprecated name kept for imports: the content shape of a service page. */
export type ServicePage = ServicePageContent;

// ── Starter copy shared by the bundled pages (each call returns a fresh object, so every page owns its copy) ──

export const heroButtons = () => ({
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Chat on WhatsApp", href: "" },
});

export const heroA11y = () => ({ breadcrumbLabel: "Breadcrumb", platformsLabel: "Platforms" });

export const coverageExtras = (helpText: string) => ({
  itemCta: { label: "View details", href: "#contact" },
  helpTitle: "Not sure where to start?",
  helpText,
  helpCta: { label: "Talk to us", href: "/contact" },
  a11y: { itemCtaSuffix: "about {title}" },
});

export const processBanner = (text: string) => ({
  heading: "Ready for step one?",
  text,
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Chat on WhatsApp", href: "" },
});

export const processA11y = () => ({ tabsLabel: "Project type", deliverablesLabel: "Deliverables" });

/** This page's own client stories, opening on `initialFilter` (one of the filter buttons). */
export const pageStories = (initialFilter: string) => {
  const { eyebrow, title, filters, ...rest } = storiesSection();
  return { eyebrow, title, filters, initialFilter, ...rest };
};

export const faqHelp = () => ({ helpTitle: "Still unsure?", helpText: "Chat with us on WhatsApp →" });

export const contactSection = (): ContactSectionContent => ({
  eyebrow: "Let's talk",
  heading: "Let's build your success together.",
  intro: "Tell us what you need. We'll reply with a plan.",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  whatsappValue: "Chat with us",
  form: formCopy(ENQUIRY_FORM_COPY),
});

/** Only the page's id is tied to code. Every list can grow or shrink. Must match Tech-Vedha-Admin (site-page-defs). */
export const SERVICE_PAGE_LOCKED: readonly string[] = ["id"];

/** Starting values of a NEW item in each list (the admin's "Add …" buttons). Shared by both page types. */
export const SERVICE_PAGE_TEMPLATES: Record<string, unknown> = {
  "seo.keywords": "",
  "hero.platforms": "",
  "coverage.title": "",
  "coverage.items": { icon: "sparkles", title: "", detail: "" },
  "whyUs.title": "",
  "whyUs.points": { title: "", detail: "" },
  "deliverables.title": "",
  "deliverables.cards": { image: NO_IMAGE(), visual: "checklist", checklist: [""], title: "", detail: "", href: "" },
  "deliverables.cards[].checklist": "",
  "deliverables.ownership.items": "",
  "useCases.title": "",
  "useCases.items": { icon: "store", title: "", detail: "" },
  "process.title": "",
  "process.tracks": { label: "", steps: [{ title: "", summary: "", deliverables: [""] }] },
  "process.tracks[].steps": { title: "", summary: "", deliverables: [""] },
  "process.tracks[].steps[].deliverables": "",
  "techStack.highlights": "",
  "techStack.groups": { title: "", tagline: "", tools: [""] },
  "techStack.groups[].tools": "",
  "stories.filters": "",
  "stories.items": STORY_TEMPLATE,
  "faq.items": { question: "", answer: "" },
};

// ── Field order in the admin ─────────────────────────────────────────────────
// The admin editor shows a page's fields in the key order of its bundled copy. Inside each section the keys are put
// in the order the website shows them (top to bottom, left to right); screen-reader labels (`a11y`) come last.
// Keys not listed keep their place after the listed ones. Only the order changes, never a key or a value.

/** Key order per path pattern ("[]" = every item of a list). */
const SERVICE_PAGE_FIELD_ORDER: Record<string, readonly string[]> = {
  deliverables: ["eyebrow", "title", "intro", "cards", "ctaLabel", "ownership"],
  // On each card the picture comes first (uploaded image, or else the drawing / checklist), then title, text, button.
  "deliverables.cards[]": ["image", "visual", "checklist", "title", "detail", "href"],
  // Cards show their icon on top, then the title and text.
  "coverage.items[]": ["icon", "title", "detail"],
  "useCases.items[]": ["icon", "title", "detail"],
  // The "N tools" word sits in each group's header, after the group's title.
  techStack: ["eyebrow", "title", "highlight", "intro", "highlights", "groups", "toolsWord"],
  stories: ["eyebrow", "title", "filters", "initialFilter", "items", "showMore", "note", "a11y"],
  "stories.items[]": [
    "kind",
    "column",
    "photo",
    "photoAlt",
    "stat",
    "statLabel",
    "quote",
    "avatar",
    "role",
    "company",
    "category",
  ],
  "contact.form": [
    "nameLabel",
    "phoneLabel",
    "phonePrefill",
    "phonePlaceholder",
    "emailLabel",
    "serviceLabel",
    "servicePlaceholder",
    "serviceOptions",
    "messageLabel",
    "messagePlaceholder",
    "submitLabel",
    "errorMessage",
    "validation",
    "sent",
    "emailSubject",
    "emailNoService",
    "formLabel",
  ],
  // Messages in the order of the fields they belong to: name, phone, email, then the rest.
  "contact.form.validation": [
    "nameRequired",
    "nameTooShort",
    "nameTooLong",
    "nameNumbers",
    "nameLetters",
    "phoneRequired",
    "phoneCharacters",
    "phoneLength",
    "phoneStart",
    "emailRequired",
    "emailTooLong",
    "emailSpaces",
    "emailOneAt",
    "emailNameMissing",
    "emailDots",
    "emailDomain",
  ],
};

/** A plain data object (not a list, an icon component or another React element). */
const isPlainData = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value) && !("$$typeof" in value) &&
  Object.getPrototypeOf(value) === Object.prototype;

function ordered(value: unknown, pattern: string): unknown {
  if (Array.isArray(value)) return value.map((item) => ordered(item, `${pattern}[]`));
  if (!isPlainData(value)) return value;
  const order = SERVICE_PAGE_FIELD_ORDER[pattern] ?? [];
  const keys = [...order.filter((key) => key in value), ...Object.keys(value).filter((key) => !order.includes(key))];
  return Object.fromEntries(keys.map((key) => [key, ordered(value[key], pattern ? `${pattern}.${key}` : key)]));
}

/** The same page content with its keys in website order (see SERVICE_PAGE_FIELD_ORDER). */
export const inWebsiteOrder = <T,>(page: T): T => ordered(page, "") as T;

/** A list template (e.g. "deliverables.cards") with its keys in website order. */
export const templateInWebsiteOrder = <T,>(pattern: string, item: T): T => ordered(item, `${pattern}[]`) as T;


/** Bundled copy of each built-in service page (edited in Tech-Vedha-Admin → Services → <service>). */
export const SERVICE_PAGE_CONTENT: ServicePageContent[] = ([
  {
    id: "apps",
    seo: {
      title: "Android and iOS App Development",
      description: "Native Android and iOS apps, designed, tested, launched on the Play Store and App Store, and supported by one team. Start a project with Tech Vedha.",
      keywords: [
        "app development company",
        "Android app development",
        "iOS app development",
        "mobile app development India",
        "UI/UX design",
        "app testing and launch",
        "app maintenance and support"
      ]
    },
    hero: {
      breadcrumb: {
        homeLabel: "Home",
        homeHref: "/",
        servicesLabel: "Services",
        servicesHref: "/#services",
        currentLabel: "App Development"
      },
      eyebrow: "02 · Front doors",
      title: "Apps your customers",
      highlight: "keep opening.",
      intro: "Native Android and iOS apps, designed, tested, launched and supported by one team — so your app keeps getting better after launch.",
      primaryCta: {
        label: "Start a project",
        href: "#contact"
      },
      secondaryCta: {
        label: "Chat on WhatsApp",
        href: ""
      },
      platforms: [
        "Android",
        "iOS"
      ],
      a11y: {
        breadcrumbLabel: "Breadcrumb",
        platformsLabel: "Platforms"
      }
    },
    coverage: {
      eyebrow: "What we cover",
      title: [
        "Everything your app needs,",
        "under one roof."
      ],
      intro: "Five parts of one build. Hire us for one, or for all of them together.",
      items: [
        {
          icon: "smartphone",
          title: "iOS Apps",
          detail: "Secure, intuitive iPhone and iPad apps that feel at home on Apple devices."
        },
        {
          icon: "screens",
          title: "UI/UX Design",
          detail: "Screens and flows you review and approve before any code is written."
        },
        {
          icon: "checklist",
          title: "Testing and Launch",
          detail: "QA on real devices, then store listing, submission and release."
        },
        {
          icon: "message",
          title: "Ongoing Support",
          detail: "Updates, fixes and new features as your business and your users change."
        },
        {
          icon: "tablet",
          title: "Android Apps",
          detail: "Native, high-performance apps for the phones most of your customers carry."
        }
      ],
      itemCta: {
        label: "View details",
        href: "#contact"
      },
      helpTitle: "Not sure where to start?",
      helpText: "Tell us the idea. We'll suggest the right mix of the five.",
      helpCta: {
        label: "Talk to us",
        href: "/contact"
      },
      a11y: {
        itemCtaSuffix: "about {title}"
      }
    },
    whyUs: {
      eyebrow: "Why Tech Vedha",
      title: [
        "One team, from first",
        "screen to every update."
      ],
      icon: "smartphone",
      points: [
        {
          title: "Native performance",
          detail: "Built for each platform, so the app feels fast and smooth."
        },
        {
          title: "Design-led UI",
          detail: "Screens designed with you and approved before code."
        },
        {
          title: "Tested before launch",
          detail: "QA on real Android and iOS devices before release."
        },
        {
          title: "Support after launch",
          detail: "Updates and fixes from the team that built it."
        }
      ]
    },
    deliverables: {
      eyebrow: "What you get",
      title: [
        "Real things you can",
        "hold, test and ship."
      ],
      intro: "Every project ends with deliverables you own and can review at each step.",
      cards: [
        {
          image: NO_IMAGE(),
          visual: "app-screens",
          checklist: [],
          title: "Android and iOS apps",
          detail: "Native apps for both platforms, built from screens you approved.",
          href: "#what-we-cover"
        },
        {
          image: NO_IMAGE(),
          visual: "release-checklist",
          checklist: [],
          title: "A release you can trust",
          detail: "Every build is tested on real devices and checked off before it reaches the stores.",
          href: "#how-it-works"
        }
      ],
      ctaLabel: "Explore",
      ownership: {
        title: "You own everything",
        detail: "Handed over at launch, in your name.",
        items: [
          "Source code",
          "Design files",
          "Store accounts in your name",
          "Documentation"
        ]
      }
    },
    useCases: {
      eyebrow: "Who it's for",
      title: [
        "Apps for the way",
        "your business runs."
      ],
      intro: "From the shop floor to the field team — pick the one that sounds like you.",
      items: [
        {
          icon: "shopping-bag",
          title: "Retail and e-commerce",
          detail: "Catalogue, cart and payments for your store."
        },
        {
          icon: "calendar",
          title: "Bookings and appointments",
          detail: "Let customers pick a slot and pay ahead."
        },
        {
          icon: "map-pin",
          title: "Field staff",
          detail: "Orders, visits and photos from the road."
        },
        {
          icon: "layout",
          title: "Internal tools",
          detail: "Stock, approvals and reports for your team."
        },
        {
          icon: "heart",
          title: "Customer loyalty",
          detail: "Points, offers and reminders that bring people back."
        },
        {
          icon: "grid",
          title: "Showroom catalogues",
          detail: "Show every product, even what is not on the floor."
        }
      ]
    },
    process: {
      eyebrow: "How it works",
      title: [
        "How your app",
        "gets built."
      ],
      intro: "Pick where you're starting from. The steps change to match.",
      tracks: [
        {
          label: "New app",
          steps: [
            {
              title: "Discover",
              summary: "We learn your business, your customers and what the app must do, then agree scope and timeline.",
              deliverables: [
                "Project brief",
                "Scope",
                "Timeline"
              ]
            },
            {
              title: "Design",
              summary: "Wireframes and UI for every key screen. You review and approve them before anything is built.",
              deliverables: [
                "Wireframes",
                "UI design",
                "Clickable prototype"
              ]
            },
            {
              title: "Build",
              summary: "Native development for Android and iOS, with code reviews and a secure setup from day one.",
              deliverables: [
                "Android",
                "iOS",
                "Code review"
              ]
            },
            {
              title: "Test",
              summary: "QA across real devices and real-world use: sign-up, payments, performance and security checks.",
              deliverables: [
                "Device testing",
                "Performance",
                "Security checks"
              ]
            },
            {
              title: "Launch",
              summary: "Store listings, submission and go-live on the Play Store and App Store.",
              deliverables: [
                "Play Store",
                "App Store",
                "Go-live"
              ]
            },
            {
              title: "Support",
              summary: "Ongoing updates, fixes and new features after launch.",
              deliverables: [
                "Updates",
                "Monitoring",
                "Support"
              ]
            }
          ]
        },
        {
          label: "Existing app",
          steps: [
            {
              title: "Audit",
              summary: "We review your current app, its code, reviews and analytics to see what is working and what is not.",
              deliverables: [
                "App review",
                "Code audit",
                "Findings"
              ]
            },
            {
              title: "Plan",
              summary: "A prioritised plan of fixes, redesigns and new features, agreed with you.",
              deliverables: [
                "Priorities",
                "Scope",
                "Timeline"
              ]
            },
            {
              title: "Improve",
              summary: "Fixes, UI updates and new features built on top of your existing app.",
              deliverables: [
                "Bug fixes",
                "Redesign",
                "New features"
              ]
            },
            {
              title: "Test",
              summary: "Regression testing so nothing that worked before breaks.",
              deliverables: [
                "Regression tests",
                "Device testing"
              ]
            },
            {
              title: "Release",
              summary: "Staged updates to the Play Store and App Store.",
              deliverables: [
                "Release notes",
                "Store update"
              ]
            },
            {
              title: "Care",
              summary: "Ongoing monitoring and updates from then on.",
              deliverables: [
                "Monitoring",
                "Updates",
                "Support"
              ]
            }
          ]
        }
      ],
      banner: {
        heading: "Ready for step one?",
        text: "Tell us about your app and we'll start with a discovery call.",
        primaryCta: {
          label: "Start a project",
          href: "#contact"
        },
        secondaryCta: {
          label: "Chat on WhatsApp",
          href: ""
        }
      },
      a11y: {
        tabsLabel: "Project type",
        deliverablesLabel: "Deliverables"
      }
    },
    techStack: {
      eyebrow: "Tech stack",
      title: "Proven tools.",
      highlight: "Zero lock-in.",
      intro: "We pick the stack that fits your product — not our habits. Everything we ship is modern, well-documented and yours to own.",
      highlights: [
        "iOS · Android · Web from one team",
        "Open standards, no proprietary lock-in",
        "Full source code handed over"
      ],
      groups: [
        {
          title: "Mobile",
          tagline: "Native & cross-platform apps",
          tools: [
            "Swift",
            "Kotlin",
            "Flutter",
            "React Native"
          ]
        },
        {
          title: "Frontend",
          tagline: "Fast, accessible interfaces",
          tools: [
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind"
          ]
        },
        {
          title: "Backend",
          tagline: "APIs that scale with you",
          tools: [
            "Node.js",
            "Python",
            "Go",
            "GraphQL"
          ]
        },
        {
          title: "Data",
          tagline: "Storage, sync & real-time",
          tools: [
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "Firebase"
          ]
        },
        {
          title: "Cloud & DevOps",
          tagline: "Ship daily, sleep well",
          tools: [
            "AWS",
            "Google Cloud",
            "Docker",
            "Kubernetes"
          ]
        },
        {
          title: "Design & QA",
          tagline: "Pixel-checked, test-covered",
          tools: [
            "Figma",
            "Jest",
            "Cypress",
            "GH Actions"
          ]
        }
      ],
      toolsWord: "tools"
    },
    stories: pageStories("Apps"),
    faq: {
      eyebrow: "FAQ",
      title: "App questions, answered.",
      helpTitle: "Still unsure?",
      helpText: "Chat with us on WhatsApp →",
      items: [
        {
          question: "How long does an app take to build?",
          answer: "It depends on features, platforms and integrations. After a discovery call we share a timeline for your specific app."
        },
        {
          question: "Do you build for both Android and iOS?",
          answer: "Yes. We build native apps for Android, for iOS, or for both together, depending on what your customers use."
        },
        {
          question: "Can you improve an app we already have?",
          answer: "Yes. We start with an audit of the current app, then plan fixes, redesigns or new features with you."
        },
        {
          question: "Do I need designs ready before we start?",
          answer: "No. Our UI/UX team designs the screens with you, and you approve them before anything is built."
        },
        {
          question: "Will you publish the app to the stores?",
          answer: "Yes. We prepare the store listings and handle submission and release on the Play Store and App Store."
        },
        {
          question: "Who owns the app and its code?",
          answer: "Ownership terms are agreed in your project contract before work starts."
        },
        {
          question: "What happens after launch?",
          answer: "Ongoing support: updates, fixes and improvements as your needs change."
        }
      ]
    },
    contact: contactSection()
  },
  {
    id: "marketing",
    seo: {
      title: "Digital Marketing: SEO, Meta, YouTube, Email and WhatsApp",
      description: "SEO, Meta and YouTube ads, email and WhatsApp campaigns, planned, run and reported by one team. Bring more customers through your door with Tech Vedha.",
      keywords: [
        "digital marketing agency",
        "SEO services",
        "Meta ads",
        "Facebook and Instagram ads",
        "YouTube marketing",
        "email marketing",
        "WhatsApp marketing",
        "digital marketing India"
      ]
    },
    hero: {
      breadcrumb: {
        homeLabel: "Home",
        homeHref: "/",
        servicesLabel: "Services",
        servicesHref: "/#services",
        currentLabel: "Digital Marketing"
      },
      eyebrow: "01 · Foot traffic",
      title: "Digital marketing",
      highlight: "for more customers.",
      intro: "Digital marketing services for businesses in India and abroad — SEO, Google and Meta ads, YouTube, email and WhatsApp marketing, planned, run and reported by one team.",
      primaryCta: {
        label: "Start a project",
        href: "#contact"
      },
      secondaryCta: {
        label: "Chat on WhatsApp",
        href: ""
      },
      platforms: [
        "Search",
        "Social"
      ],
      a11y: {
        breadcrumbLabel: "Breadcrumb",
        platformsLabel: "Platforms"
      }
    },
    coverage: {
      eyebrow: "What we cover",
      title: [
        "Digital marketing services,",
        "under one roof."
      ],
      intro: "SEO, paid ads, video, email and WhatsApp marketing. Hire us for one channel, or for a full-funnel plan.",
      items: [
        {
          icon: "search",
          title: "SEO Services",
          detail: "Technical, on-page and local SEO that helps you rank higher on Google and grow organic traffic."
        },
        {
          icon: "megaphone",
          title: "Meta Ads",
          detail: "Facebook and Instagram ad campaigns that reach buyers by interest, location and intent."
        },
        {
          icon: "play",
          title: "YouTube Marketing",
          detail: "YouTube video ads and channel SEO that put your brand in front of the right viewers."
        },
        {
          icon: "mail",
          title: "Email Marketing",
          detail: "Email campaigns and automations that turn past customers into repeat buyers."
        },
        {
          icon: "message",
          title: "WhatsApp Marketing",
          detail: "WhatsApp Business broadcasts and messaging that turn enquiries into sales."
        }
      ],
      itemCta: {
        label: "View details",
        href: "#contact"
      },
      helpTitle: "Not sure where to start?",
      helpText: "Tell us the idea. We'll suggest the right mix of the five.",
      helpCta: {
        label: "Talk to us",
        href: "/contact"
      },
      a11y: {
        itemCtaSuffix: "about {title}"
      }
    },
    whyUs: {
      eyebrow: "Why Tech Vedha",
      title: [
        "One marketing team, from",
        "first search to every sale."
      ],
      icon: "megaphone",
      points: [
        {
          title: "Search-first strategy",
          detail: "Keyword research and SEO planned around what your buyers search for."
        },
        {
          title: "Creative that converts",
          detail: "Ad copy and creatives designed with you and approved before launch."
        },
        {
          title: "Tracked from day one",
          detail: "Conversion tracking on every campaign, so ad spend goes where it works."
        },
        {
          title: "Reports you can read",
          detail: "Clear monthly reports on leads, sales and return on ad spend."
        }
      ]
    },
    deliverables: {
      eyebrow: "What you get",
      title: [
        "Real results you can",
        "see, track and own."
      ],
      intro: "Every digital marketing campaign comes with tracking, reports and creative assets you own.",
      cards: [
        {
          image: NO_IMAGE(),
          visual: "campaign-dashboard",
          checklist: [],
          title: "Campaigns on every channel",
          detail: "Google Search, Meta, YouTube, email and WhatsApp campaigns, managed from one plan you approved.",
          href: "#what-we-cover"
        },
        {
          image: NO_IMAGE(),
          visual: "campaign-checklist",
          checklist: [],
          title: "A launch you can trust",
          detail: "Tracking, targeting and ad creatives are checked before any budget is spent.",
          href: "#how-it-works"
        },
        {
          image: NO_IMAGE(),
          visual: "search-rankings",
          checklist: [],
          title: "Rank higher on Google",
          detail: "SEO and keyword tracking that moves your pages up for the searches buyers actually make.",
          href: "#what-we-cover"
        },
        {
          image: NO_IMAGE(),
          visual: "monthly-report",
          checklist: [],
          title: "Reports you can read",
          detail: "A monthly report on leads by channel, what worked, and where next month’s budget goes.",
          href: "#how-it-works"
        }
      ],
      ctaLabel: "Explore",
      ownership: {
        title: "You own everything",
        detail: "Set up in your name from day one.",
        items: [
          "Ad accounts in your name",
          "Analytics access",
          "Creative files",
          "Monthly reports"
        ]
      }
    },
    useCases: {
      eyebrow: "Who it's for",
      title: [
        "Digital marketing for the",
        "way your business runs."
      ],
      intro: "From one store to many cities — lead generation and online growth built for your industry.",
      items: [
        {
          icon: "store",
          title: "Retail stores",
          detail: "Local SEO and offers that bring footfall to your shop or showroom."
        },
        {
          icon: "shopping-cart",
          title: "E-commerce",
          detail: "Google Shopping, search and social ads that drive online orders."
        },
        {
          icon: "map-pin",
          title: "Local services",
          detail: "Google Business Profile and local search, so nearby customers find you."
        },
        {
          icon: "house",
          title: "Real estate and builders",
          detail: "Lead generation for new projects and site visits."
        },
        {
          icon: "graduation-cap",
          title: "Education and coaching",
          detail: "Admission campaigns across search, social and YouTube."
        },
        {
          icon: "utensils",
          title: "Restaurants and cafés",
          detail: "Reviews, offers and WhatsApp reminders that fill tables."
        }
      ]
    },
    process: {
      eyebrow: "How it works",
      title: [
        "How we grow",
        "your business."
      ],
      intro: "Pick where you're starting from. The steps change to match.",
      tracks: [
        {
          label: "Starting fresh",
          steps: [
            {
              title: "Discover",
              summary: "We learn your business, your customers and your goals, then agree channels, budget and timeline.",
              deliverables: [
                "Marketing brief",
                "Goals and KPIs",
                "Timeline"
              ]
            },
            {
              title: "Plan",
              summary: "Keyword research, audiences and a channel plan, approved by you before any spend.",
              deliverables: [
                "Keyword research",
                "Audiences",
                "Channel plan"
              ]
            },
            {
              title: "Create",
              summary: "Ad copy, creatives and landing pages written and designed, then approved by you.",
              deliverables: [
                "Ad creatives",
                "Landing pages",
                "Content calendar"
              ]
            },
            {
              title: "Launch",
              summary: "Campaigns go live on Google, Meta, YouTube, email and WhatsApp, with tracking set up first.",
              deliverables: [
                "Conversion tracking",
                "Campaign setup",
                "Go-live"
              ]
            },
            {
              title: "Optimise",
              summary: "Weekly tuning of bids, audiences and keywords, so spend goes where it works.",
              deliverables: [
                "Bid tuning",
                "A/B tests",
                "Audience tuning"
              ]
            },
            {
              title: "Report",
              summary: "Monthly reports on leads and sales, with a clear plan for next month.",
              deliverables: [
                "Monthly report",
                "Live dashboards",
                "Next steps"
              ]
            }
          ]
        },
        {
          label: "Already running ads",
          steps: [
            {
              title: "Audit",
              summary: "We review your ad accounts, website, rankings and past campaigns to see what is working and what is not.",
              deliverables: [
                "Account audit",
                "SEO audit",
                "Findings"
              ]
            },
            {
              title: "Plan",
              summary: "A prioritised plan of fixes, new campaigns and budget changes, agreed with you.",
              deliverables: [
                "Priorities",
                "Goals and KPIs",
                "Timeline"
              ]
            },
            {
              title: "Improve",
              summary: "Tracking fixes, new creatives and landing page updates on top of your existing campaigns.",
              deliverables: [
                "Tracking fixes",
                "New creatives",
                "Landing pages"
              ]
            },
            {
              title: "Launch",
              summary: "Campaigns relaunch with fixed tracking, so every change is measured.",
              deliverables: [
                "Relaunch checks",
                "Conversion tracking"
              ]
            },
            {
              title: "Scale",
              summary: "Scale the campaigns that work and pause the ones that do not.",
              deliverables: [
                "Budget shifts",
                "Scaling"
              ]
            },
            {
              title: "Report",
              summary: "Monthly reports and ongoing optimisation from then on.",
              deliverables: [
                "Live dashboards",
                "Monthly report",
                "Next steps"
              ]
            }
          ]
        }
      ],
      banner: {
        heading: "Ready for step one?",
        text: "Tell us about your business and we'll start with a discovery call.",
        primaryCta: {
          label: "Start a project",
          href: "#contact"
        },
        secondaryCta: {
          label: "Chat on WhatsApp",
          href: ""
        }
      },
      a11y: {
        tabsLabel: "Project type",
        deliverablesLabel: "Deliverables"
      }
    },
    techStack: {
      eyebrow: "Marketing stack",
      title: "Proven tools.",
      highlight: "Zero lock-in.",
      intro: "We pick the marketing tools that fit your goals — not our habits. Every ad account, report and creative is yours to own.",
      highlights: [
        "Search · Social · Email from one team",
        "Ad accounts set up in your name",
        "Clear monthly reporting"
      ],
      groups: [
        {
          title: "Search & SEO",
          tagline: "Get found when buyers search",
          tools: [
            "Search Console",
            "Semrush",
            "Business Profile",
            "GA4"
          ]
        },
        {
          title: "Paid ads",
          tagline: "Spend that is aimed and tracked",
          tools: [
            "Google Ads",
            "Meta Ads",
            "YouTube Ads",
            "LinkedIn Ads"
          ]
        },
        {
          title: "Social",
          tagline: "Content people stop for",
          tools: [
            "Instagram",
            "Facebook",
            "Canva",
            "Buffer"
          ]
        },
        {
          title: "Email",
          tagline: "Campaigns that bring people back",
          tools: [
            "Mailchimp",
            "Brevo",
            "HubSpot",
            "Zapier"
          ]
        },
        {
          title: "WhatsApp",
          tagline: "Messages where customers chat",
          tools: [
            "WhatsApp API",
            "Broadcasts",
            "CRM sync",
            "Automations"
          ]
        },
        {
          title: "Tracking & reports",
          tagline: "Know what is working",
          tools: [
            "Tag Manager",
            "Looker Studio",
            "Hotjar",
            "Analytics"
          ]
        }
      ],
      toolsWord: "tools"
    },
    stories: pageStories("Marketing"),
    faq: {
      eyebrow: "FAQ",
      title: "Digital marketing questions, answered.",
      helpTitle: "Still unsure?",
      helpText: "Chat with us on WhatsApp →",
      items: [
        {
          question: "How soon will I see results from SEO and ads?",
          answer: "Paid ads can bring visits within days, while SEO usually builds over a few months. We share expected timelines after a discovery call."
        },
        {
          question: "Do you manage Google Ads and Meta ads?",
          answer: "Yes. We plan and run campaigns on Google Search, YouTube, Facebook and Instagram, depending on where your customers are."
        },
        {
          question: "Can you work with our existing ad accounts?",
          answer: "Yes. We start with an audit of your current accounts and campaigns, then plan improvements with you."
        },
        {
          question: "Who creates the ads and posts?",
          answer: "Our team writes and designs the creatives with you, and you approve them before anything goes live."
        },
        {
          question: "How do you report marketing results?",
          answer: "You get a clear monthly report on spend, reach, leads and sales, plus access to live dashboards."
        },
        {
          question: "Who owns the ad accounts and data?",
          answer: "Accounts are set up in your name, so your data and campaign history stay with you."
        },
        {
          question: "Do you offer digital marketing outside India?",
          answer: "Yes. We run digital marketing campaigns for businesses across India and abroad."
        }
      ]
    },
    contact: contactSection()
  }
] as ServicePageContent[]).map(inWebsiteOrder);

// ── From content to what the components render ──────────────────────────────

const text = (value: string) => value.trim();
const lines = (values: string[]) => values.map(text).filter(Boolean);
/** A heading's lines, or `fallback` when every line is empty. */
const heading = (values: string[], fallback: string[]) => (lines(values).length ? lines(values) : fallback);
const or = (value: string, fallback: string) => text(value) || fallback;
const isDrawing = (value: string): value is DeliverableVisual =>
  value !== "checklist" && (DELIVERABLE_VISUALS as readonly string[]).includes(value);

/**
 * The page as the components render it. Blank items are dropped (so half-written ones never show) and a few emptied
 * fields fall back: the hero and SEO to the service's name and summary from the catalogue.
 */
export function toServicePage(content: ServicePageContent, service: Service): ResolvedServicePage {
  const { seo, hero, coverage, whyUs, deliverables, useCases, process, techStack, stories, faq, contact } = content;
  const iconCards = (items: IconCard[]) =>
    items
      .filter((item) => text(item.title))
      .map((item) => ({ title: text(item.title), detail: text(item.detail), icon: serviceIcon(item.icon) }));
  const tracks = process.tracks
    .map((track, index) => ({
      id: slugify(track.label) || `track-${index + 1}`,
      label: text(track.label) || `${index + 1}`,
      steps: track.steps
        .filter((step) => text(step.title))
        .map((step) => ({ title: text(step.title), summary: text(step.summary), deliverables: lines(step.deliverables) })),
    }))
    .filter((track) => track.steps.length);

  return {
    ...content,
    id: service.id,
    service,
    seo: { title: or(seo.title, service.title), description: or(seo.description, service.summary), keywords: lines(seo.keywords) },
    hero: {
      ...hero,
      breadcrumb: { ...hero.breadcrumb, currentLabel: or(hero.breadcrumb.currentLabel, service.title) },
      title: or(hero.title, service.title),
      intro: or(hero.intro, service.summary),
      platforms: lines(hero.platforms),
    },
    coverage: { ...coverage, title: lines(coverage.title), items: iconCards(coverage.items) },
    whyUs: {
      ...whyUs,
      title: lines(whyUs.title),
      icon: serviceIcon(whyUs.icon),
      points: whyUs.points.filter((point) => text(point.title)).map((point) => ({ title: text(point.title), detail: text(point.detail) })),
    },
    deliverables: {
      ...deliverables,
      title: lines(deliverables.title),
      cards: deliverables.cards
        .filter((card) => text(card.title))
        .map((card) => ({
          image: card.image?.src ? card.image : null,
          visual: isDrawing(card.visual) ? card.visual : null,
          checklist: lines(card.checklist),
          title: text(card.title),
          detail: text(card.detail),
          href: text(card.href),
        })),
      ownership: { ...deliverables.ownership, items: lines(deliverables.ownership.items) },
    },
    useCases: { ...useCases, title: lines(useCases.title), items: iconCards(useCases.items) },
    // Without steps the page has no "How it works" section.
    process: tracks.length ? { ...process, title: heading(process.title, []), tracks } : undefined,
    techStack: {
      ...techStack,
      highlights: lines(techStack.highlights),
      groups: techStack.groups
        .map((group) => ({ title: text(group.title), tagline: text(group.tagline), tools: lines(group.tools).map(toolByName) }))
        .filter((group) => group.title && group.tools.length),
    },
    stories,
    faq: {
      ...faq,
      items: faq.items
        .filter((item) => text(item.question) && text(item.answer))
        .map((item) => ({ question: text(item.question), answer: text(item.answer) })),
    },
    contact,
  };
}

/** Each built-in page resolved, with its catalogue entry (routing only: id, slug, page) attached. */
export function resolveServicePages(pages: ServicePageContent[], services: Service[]): ResolvedServicePage[] {
  return pages.map((page) => {
    const service = services.find((item) => item.id === page.id);
    if (!service) throw new Error(`Service page "${page.id}" has no entry in data/services.ts`);
    return toServicePage(page, service);
  });
}

/** Bundled values (fallback when the admin is unreachable). Pages read the live ones via server/content.ts. */
export const SERVICE_PAGES: ResolvedServicePage[] = resolveServicePages(SERVICE_PAGE_CONTENT, SERVICES);
