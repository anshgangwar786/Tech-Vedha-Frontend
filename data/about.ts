import { ENQUIRY_FORM_COPY, formCopy } from "@/data/forms";

/**
 * About page content (Figma "Tech Vedha — About"), edited in Tech-Vedha-Admin → About Us.
 *
 * ABOUT_CONTENT holds EVERYTHING the page shows, grouped by section in page order (top to bottom): each top-level key
 * is one card in the admin. Nothing here is read from another page (the service cards, the FAQ and the "Let's talk"
 * block are this page's own copies), so the About page can be edited on its own.
 */

/** Icons available to the hero's service cards (components/about/icons.tsx). */
export const WING_ICONS = ["marketing", "apps", "cad", "software", "generic"] as const;
export type WingIconName = (typeof WING_ICONS)[number];

/** Icons available to the "Who we work with" cards (components/about/icons.tsx). */
export const AUDIENCE_ICONS = ["retail", "homes", "commercial", "growth"] as const;
export type AudienceIcon = (typeof AUDIENCE_ICONS)[number];

type WingCard = {
  icon: WingIconName;
  number: string;
  wing: string;
  title: string;
  /** Where the card links: a service page, or a homepage section. */
  href: string;
  tags: string[];
  /** Shown in the brand colour. */
  featured: boolean;
};

type AudienceCard = { icon: AudienceIcon; title: string; detail: string; tags: string[]; featured: boolean };

export type LoopStep = {
  /** Short label on the ring tab, e.g. "CAD Design". */
  wing: string;
  /** What the step covers in general ("What it covers" view). */
  covers: { title: string; detail: string; tags: string[] };
  /** The same step for one example project ("Example" view). */
  example: { title: string; tags: string[] };
  /** Dark button under the step panel. */
  link: { label: string; href: string };
};

/**
 * This page's own copy of the short enquiry form, with its fields in the order the form shows them: the fields top to
 * bottom, the message under the form, the "Enquiry sent" pop-up, then what isn't on screen (error messages under
 * fields, the email fallback, the screen-reader name).
 */
function enquiryForm() {
  const f = formCopy(ENQUIRY_FORM_COPY);
  return {
    nameLabel: f.nameLabel,
    phoneLabel: f.phoneLabel,
    phonePrefill: f.phonePrefill,
    phonePlaceholder: f.phonePlaceholder,
    emailLabel: f.emailLabel,
    serviceLabel: f.serviceLabel,
    servicePlaceholder: f.servicePlaceholder,
    serviceOptions: f.serviceOptions,
    messageLabel: f.messageLabel,
    messagePlaceholder: f.messagePlaceholder,
    errorMessage: f.errorMessage,
    submitLabel: f.submitLabel,
    sent: f.sent,
    validation: f.validation,
    emailSubject: f.emailSubject,
    emailNoService: f.emailNoService,
    formLabel: f.formLabel,
  };
}

export const ABOUT_CONTENT = {
  /** Browser tab, search results and link previews. */
  seo: {
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
  },

  /** Top of the page: breadcrumb, intro, buttons, the "What we do" panel and the quick facts under it. */
  hero: {
    breadcrumb: { homeLabel: "Home", homeHref: "/", currentLabel: "About" },
    eyebrow: "About Tech Vedha",
    titleLead: "One partner.",
    titleAccent: "Built for tomorrow.",
    intro:
      "Tech Vedha is an IT company that plans your space, builds its software and apps, secures its data and markets it — with one team, for businesses in India and abroad.",
    primaryCta: { label: "Start a project", href: "/#contact" },
    secondaryCta: { label: "How it connects", href: "#how-it-connects" },
    /** Label above the cards. (Older saved text may still use {count}; it is filled in.) */
    panelLabel: "What we do · four wings",
    panelBadge: "One team",
    wingCards: [
      {
        icon: "marketing",
        number: "01",
        wing: "Foot traffic",
        title: "Digital Marketing",
        href: "/services/digital-marketing",
        tags: ["SEO", "Meta Ads", "WhatsApp"],
        featured: false,
      },
      {
        icon: "apps",
        number: "02",
        wing: "Front doors",
        title: "App Development",
        href: "/services/app-development",
        tags: ["Android", "iOS", "UI/UX"],
        featured: true,
      },
      {
        icon: "cad",
        number: "03",
        wing: "Architecture",
        title: "CAD Design and Planning",
        href: "/#service-cad",
        tags: ["2D/3D", "BOQ", "Retail"],
        featured: false,
      },
      {
        icon: "software",
        number: "04",
        wing: "Foundation",
        title: "Software and Cybersecurity",
        href: "/#service-software",
        tags: ["Subscription", "Security"],
        featured: false,
      },
    ] as WingCard[],
    facts: [
      { label: "Services", value: "Four wings, one team" },
      { label: "Where", value: "India and abroad" },
      { label: "Software models", value: "Subscription or one-time" },
      { label: "Apps", value: "Android and iOS" },
    ],
    a11y: {
      breadcrumbLabel: "Breadcrumb",
      /** {title} = the card's title. */
      cardTagsLabel: "{title} includes",
    },
  },

  /** "Four vendors vs one team" comparison table. */
  whyWeExist: {
    eyebrow: "Why we exist",
    title: ["Four vendors. Four timelines.", "One headache."],
    intro:
      "Most businesses juggle a designer, a developer, an app agency and a marketer. We started Tech Vedha to replace all four with one team.",
    topicHeader: "What it takes",
    vendorsHeader: "Four separate vendors",
    usHeader: "Tech Vedha",
    rows: [
      { topic: "Who you call", vendors: ["Designer", "Developer", "App agency", "Marketer"], us: "One team, one point of contact" },
      { topic: "Timelines", vendors: ["Plan A", "Plan B", "Plan C", "Plan D"], us: "One shared plan from start to launch" },
      { topic: "Handoffs", vendors: ["Files emailed", "Briefs repeated", "Specs lost"], us: "No handoffs — the same team builds it all" },
      { topic: "Updates", vendors: ["4 chats", "4 status calls"], us: "One update covering every wing" },
      { topic: "When something breaks", vendors: ["Who owns it?", "Back-and-forth"], us: "One team owns the fix" },
    ],
    a11y: { tableCaption: "What it takes: Four separate vendors / Tech Vedha" },
  },

  /** Audience cards. */
  whoWeWorkWith: {
    eyebrow: "Who we work with",
    title: ["Built for businesses", "with a space to run."],
    intro: "From a single home to an industrial site — and the shops, showrooms and teams in between.",
    cards: [
      {
        icon: "retail",
        title: "Retail and showrooms",
        detail: "Shops and showrooms that need a layout, billing, an app and customers through the door.",
        tags: ["CAD", "Software", "Apps", "Marketing"],
        featured: true,
      },
      {
        icon: "homes",
        title: "Homes and builders",
        detail: "Homeowners, villa and apartment projects that need accurate plans and costing.",
        tags: ["2D/3D plans", "BOQ"],
        featured: false,
      },
      {
        icon: "commercial",
        title: "Commercial and industrial",
        detail: "Offices, warehouses and plants planned at scale, with software to run them.",
        tags: ["Planning", "Software", "Security"],
        featured: false,
      },
      {
        icon: "growth",
        title: "Growing businesses",
        detail: "Teams in India and abroad that want one partner instead of four vendors.",
        tags: ["Any wing", "India and abroad"],
        featured: false,
      },
    ] as AudienceCard[],
    a11y: { tagsLabel: "Wings involved" },
  },

  /** "One loop. Every wing.": view buttons, step panel and the ring of four steps. */
  howItConnects: {
    eyebrow: "How everything connects",
    title: ["One loop.", "Every wing."],
    intro: "Each service feeds the next. Pick a step to see what it covers.",
    coversLabel: "What it covers",
    exampleLabel: "Example: a new showroom",
    /** Shown instead of exampleLabel on small phones. */
    exampleShortLabel: "Example",
    /** Panel label in the example view, before "Step n of 4". */
    examplePanelLabel: "Example · New showroom",
    /** Panel counter. {n} = step number, {total} = number of steps. */
    stepCounter: "Step {n} of {total}",
    /** Text in the example view, under each step's title. */
    exampleDetail: "What this step would produce for one example project: a new retail showroom.",
    steps: [
      {
        covers: {
          title: "Design the space",
          detail: "Plan the showroom, shop or site with accurate 2D and 3D drawings and a costed bill of quantities.",
          tags: ["2D and 3D", "BOQ", "Space planning"],
        },
        example: { title: "Showroom floor plan", tags: ["2D layout", "3D walkthrough", "Costed BOQ"] },
        link: { label: "CAD Design", href: "/#service-cad" },
        wing: "CAD Design",
      },
      {
        covers: {
          title: "Build the infrastructure",
          detail: "Billing, stock and operations software to run it — on subscription or one-time, protected from day one.",
          tags: ["Subscription", "One-time", "Security"],
        },
        example: { title: "Billing and stock software", tags: ["GST billing", "Live stock", "Staff logins"] },
        link: { label: "Software", href: "/#service-software" },
        wing: "Software",
      },
      {
        covers: {
          title: "Create the interface",
          detail: "Android and iOS apps so customers can browse, book and buy from anywhere.",
          tags: ["Android", "iOS", "UI/UX"],
        },
        example: { title: "The showroom’s customer app", tags: ["Product catalogue", "Offers and orders", "Android and iOS"] },
        link: { label: "App Development", href: "/services/app-development" },
        wing: "Apps",
      },
      {
        covers: {
          title: "Drive the traffic",
          detail: "SEO, Meta, YouTube, email and WhatsApp campaigns that bring people to the space and the app.",
          tags: ["SEO", "Meta Ads", "WhatsApp"],
        },
        example: { title: "Launch campaign", tags: ["Meta and Google ads", "WhatsApp broadcast", "Local SEO"] },
        link: { label: "Digital Marketing", href: "/services/digital-marketing" },
        wing: "Marketing",
      },
    ] as LoopStep[],
    /** Centre of the ring, one line per entry. */
    centerLabel: ["Client", "success"],
    /** Label on each step around the ring. {n} = step number. */
    stepTab: "Step {n}",
    a11y: { viewLabel: "Loop view", tagsLabel: "Includes", stepsLabel: "Steps in the loop" },
  },

  /** "Four things we always do": heading beside a numbered list. */
  howWeWork: {
    eyebrow: "How we work",
    title: ["Four things we", "always do."],
    intro: "However big the project, and whichever wing it starts in.",
    points: [
      { title: "One point of contact", detail: "You talk to one team for every service, so nothing gets lost between vendors." },
      { title: "Plan before we build", detail: "Drawings, screens and architecture are agreed with you before any build starts." },
      { title: "Security from day one", detail: "Protection is designed into every build, not added at the end." },
      { title: "We stay after launch", detail: "Updates, fixes and support from the same team that built it." },
    ],
  },

  /** Mission card beside the vision card. */
  missionVision: {
    eyebrow: "Mission and vision",
    title: ["What we’re here", "to do."],
    intro: "One purpose and one direction behind every project, in every wing.",
    mission: {
      number: "01",
      label: "Mission",
      statement: "Give businesses one trusted partner for complete IT solutions.",
      detail: "Space, software, apps, security and marketing — planned and delivered by the same team.",
    },
    vision: {
      number: "02",
      label: "Vision",
      statement: "Help businesses in India and abroad build for tomorrow.",
      regions: ["India", "Abroad"],
    },
    a11y: { regionsLabel: "Where we work" },
  },

  /** This page's own FAQ (also published as FAQPage structured data). */
  faq: {
    eyebrow: "FAQ",
    title: ["Questions,", "answered."],
    helpTitle: "Still unsure?",
    helpText: "Chat with us on WhatsApp →",
    items: [
      {
        question: "Can I hire you for just one service?",
        answer: "Yes. Each service is available on its own. Many clients start with one and add others as they grow.",
      },
      {
        question: "Do you work with clients outside India?",
        answer: "Yes. We work with clients across India and abroad, with meetings and delivery handled remotely.",
      },
      {
        question: "Subscription or one-time software: which suits me?",
        answer:
          "Subscription suits software whose requirements keep evolving and need ongoing support. One-time purchase suits fixed operational needs where you want complete ownership. We recommend one after understanding your requirements.",
      },
      {
        question: "How long does a mobile app take to build?",
        answer:
          "It depends on scope: features, platforms and integrations. After a discovery call we share a timeline for your specific app.",
      },
      {
        question: "What does a CAD project include?",
        answer:
          "Accurate 2D and 3D drawings, smart space planning and a bill of quantities (BOQ), for residential, retail, commercial and industrial projects.",
      },
      {
        question: "Which marketing channels do you manage?",
        answer: "SEO, Meta (Facebook and Instagram) ads, YouTube, email and WhatsApp marketing.",
      },
      {
        question: "How do you keep my data secure?",
        answer:
          "Security is built into every layer: data protection, network security, threat detection and prevention, and compliance and risk management.",
      },
    ],
  },

  /** "Let's talk" block at the bottom, with this page's own enquiry form. */
  contact: {
    eyebrow: "Let's talk",
    heading: "Let's build your success together.",
    intro: "Tell us what you need. We'll reply with a plan.",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    whatsappValue: "Chat with us",
    form: enquiryForm(),
  },
};

export type AboutContent = typeof ABOUT_CONTENT;
export type HowItConnectsContent = AboutContent["howItConnects"];

/**
 * Nothing on the About page is locked: every list can be added to, reordered and shortened in the admin (the loop ring
 * places any number of steps evenly). Must match Tech-Vedha-Admin (app/lib/content/site-page-defs/about.ts).
 */
export const ABOUT_LOCKED: readonly string[] = [];

/** What a NEW item starts as when it is added in the admin, per list. */
export const ABOUT_TEMPLATES: Record<string, unknown> = {
  "hero.wingCards": { icon: "generic", number: "", wing: "", title: "", href: "", tags: [""], featured: false },
  "hero.facts": { label: "", value: "" },
  "whyWeExist.rows": { topic: "", vendors: [""], us: "" },
  "whoWeWorkWith.cards": { icon: "retail", title: "", detail: "", tags: [""], featured: false },
  "howItConnects.steps": {
    covers: { title: "", detail: "", tags: [""] },
    example: { title: "", tags: [""] },
    link: { label: "", href: "" },
    wing: "",
  },
  "howWeWork.points": { title: "", detail: "" },
  "faq.items": { question: "", answer: "" },
};
