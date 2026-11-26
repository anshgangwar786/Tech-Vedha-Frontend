import { media } from "@/data/media";
import { ENQUIRY_FORM_COPY, formCopy } from "@/data/forms";
import { STORY_TEMPLATE, storiesSection } from "@/data/stories";

/** An empty image: the card or step shows its drawn illustration until an image is uploaded. */
const NO_IMAGE = () => ({ src: "", alt: "", width: 0, height: 0 });

/**
 * Homepage content. HOME_CONTENT (bottom of this file) groups everything by page section, top to bottom, exactly as
 * the homepage renders it. It is the admin editor's schema: each top-level key becomes one card in Dashboard →
 * Homepage. Every word and image on the homepage is here — nothing is read from another page's content.
 *
 * A document is already saved for this page: keep existing keys and shapes, only add new ones.
 */

/** Replaces "{count}" in older saved copy with a number in words ("Four"). New copy is plain text. */
export const withCount = (text: string, count: string) => text.replaceAll("{count}", count);

/**
 * The same object with its keys in the order the page shows them (the admin editor lists fields in key order). Listed
 * keys come first, any others after them, so no value is ever dropped. Used for copies made by shared builders.
 */
function inOrder<T extends object>(value: T, keys: readonly (keyof T)[]): T {
  const out: Partial<T> = {};
  // Only keys the object has: a story card of one kind never gains another kind's fields.
  for (const key of keys) if (key in value) out[key] = value[key];
  for (const key of Object.keys(value) as (keyof T)[]) if (!(key in out)) out[key] = value[key];
  return out as T;
}

/** A button: visible label and where it goes ("/#contact", "/about", "https://…"). */
export type CtaLink = { label: string; href: string };

/** Progress state of a step in a mock-up (dropdown in the admin). */
export type StepState = "done" | "current" | "todo";

// ── SEO ──────────────────────────────────────────────────────────────────────

export const HOME_SEO = {
  title: "Tech Vedha — IT Solutions for Marketing, Apps, CAD and Software",
  description:
    "Tech Vedha is one IT partner for digital marketing, Android and iOS app development, CAD design and planning, custom software and cybersecurity — across India and abroad.",
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
};

// ── Hero ─────────────────────────────────────────────────────────────────────

export const HERO = {
  /** Decorative light wave behind the hero, one per theme. */
  background: {
    dark: { src: media("/home/wave-dark.svg"), alt: "", width: 1831, height: 1183 },
    light: { src: media("/home/wave-light.svg"), alt: "", width: 1831, height: 1183 },
  },
  eyebrow: "IT solutions · India and abroad",
  titleLead: "Build for",
  titleAccent: "Tomorrow.",
  intro: "Design, software, apps, security and marketing — one partner instead of four vendors.",
  primaryCta: { label: "Start a project", href: "/#contact" },
  secondaryCta: { label: "Explore services", href: "/#services" },
  strip: "Digital Marketing · App Development · CAD Design · Software and Security",
  ringText: "TECH VEDHA • BUILD FOR TOMORROW • ",
};

// ── Digital blueprint ────────────────────────────────────────────────────────

export const BLUEPRINT = {
  eyebrow: "The digital blueprint",
  title: ["Drawn as a blueprint.", "Built as one."],
  intro: "Four wings, assembled from the foundation up, so every part fits the next.",
  tagline: "ONE STRUCTURE · ONE TEAM",
  /** The stacked slabs, top to bottom. */
  slabs: [
    { number: "01", wing: "Foot traffic", title: "Digital Marketing" },
    { number: "02", wing: "Front doors", title: "App Development" },
    { number: "03", wing: "Architecture", title: "CAD Design and Planning" },
    { number: "04", wing: "Foundation", title: "Software and Cybersecurity" },
  ],
};

// ── Services ─────────────────────────────────────────────────────────────────

/** A service card as the switcher draws it (built in components/home/Services.tsx from the cards below). */
export type HomeServiceItem = {
  /** Links like /#service-<anchor> scroll to the card and open it. */
  anchor: string;
  number: string;
  wing: string;
  title: string;
  summary: string;
  /** Where the "Explore …" button goes. Empty = no button. */
  href: string;
  /** Uploaded image that fills the left panel instead of the drawing (null = the drawing). */
  image: { src: string; alt: string; width: number; height: number } | null;
};

/**
 * The drawn illustrations beside the service cards. Fixed design, not edited in the admin: a card can replace its
 * drawing with an uploaded image instead (Homepage → Services → card → Card image).
 */
export const SERVICE_SCENES = {
  marketing: {
    windowTitle: "Campaigns",
    chartTitle: "Enquiries",
    chartPeriod: "Last 30 days",
    chart: {
      dark: { src: media("/home/enquiries-chart-dark.svg"), alt: "", width: 448, height: 93 },
      light: { src: media("/home/enquiries-chart-light.svg"), alt: "", width: 448, height: 93 },
    },
    weeks: ["Week 1", "Week 2", "Week 3", "Week 4"],
    /** reach = length of the bar, 0–100. */
    channels: [
      { name: "SEO", reach: 78 },
      { name: "Meta Ads", reach: 64 },
      { name: "WhatsApp", reach: 56 },
      { name: "YouTube", reach: 41 },
      { name: "Email", reach: 33 },
    ],
    liveLabel: "Live",
    searchQuery: "interior designer near me",
    resultUrl: "yourbusiness.in",
    resultTitle: "Your business — Interiors and showroom",
  },
  apps: {
    androidLabel: "Android",
    iosLabel: "iOS",
    clock: "9:41",
    greeting: "Hello, Anita",
    heading: "Find your style",
    avatarLetter: "A",
    searchPlaceholder: "Search products",
    tabs: ["All", "Chairs", "Lighting"],
    bannerTitle: "New collection",
    bannerButton: "Explore",
    popularLabel: "Popular",
    seeAllLabel: "See all",
    products: ["Oak chair", "Floor lamp"],
    navHomeLabel: "Home",
    orderTitle: "Order status",
    arrivalLabel: "Arriving today",
    orderNumber: "Order TV-2048",
    orderSteps: [
      { label: "Confirmed", state: "done" },
      { label: "Packed", state: "done" },
      { label: "Out for delivery", state: "current" },
      { label: "Delivered", state: "todo" },
    ] as { label: string; state: StepState }[],
    courierInitial: "R",
    courierName: "Ravi",
    courierRole: "Delivery partner",
    trackLabel: "Track live",
    pipelineTitle: "Delivery pipeline",
    pipelinePlatforms: "Android · iOS",
    pipeline: [
      { label: "Design", state: "done" },
      { label: "Build", state: "done" },
      { label: "Test", state: "done" },
      { label: "Release", state: "current" },
      { label: "Support", state: "todo" },
    ] as { label: string; state: StepState }[],
  },
  cad: {
    windowTitle: "Ground floor plan",
    sheet: "A-101",
    /** View switch in the title bar; the first one is highlighted. */
    views: ["2D", "3D", "BOQ"],
    widthLabel: "7.9 m",
    sideWidthLabel: "4.1 m",
    depthLabel: "8.5 m",
    rooms: {
      showroom: { name: "SHOWROOM", area: "67 m²" },
      office: { name: "OFFICE", area: "17 m²" },
      storage: { name: "STORAGE", area: "17 m²" },
    },
    statusBar: ["Scale 1:100", "Units: m", "Snap on"],
    boqTitle: "Bill of quantities",
    boqBadge: "BOQ",
    itemHeader: "ITEM",
    qtyHeader: "QTY",
    unitHeader: "UNIT",
    boq: [
      { item: "Vitrified flooring", qty: "102", unit: "sq.m" },
      { item: "Gypsum partition", qty: "18", unit: "r.m" },
      { item: "LED downlights", qty: "24", unit: "nos" },
    ],
  },
  software: {
    windowTitle: "Operations",
    planActive: "Subscription",
    planOther: "One-time",
    modules: ["Dashboard", "Inventory", "Orders", "Billing", "Staff"],
    /** The highlighted module (must match one of the modules above). */
    activeModule: "Inventory",
    listTitle: "Inventory",
    addLabel: "Add item",
    itemHeader: "ITEM",
    statusHeader: "STATUS",
    /** inStock = filled dot; off = outlined dot. */
    inventory: [
      { item: "Oak dining chair", status: "In stock", inStock: true },
      { item: "Floor lamp, brass", status: "In stock", inStock: true },
      { item: "Wall shelf, 90 cm", status: "Low stock", inStock: false },
      { item: "Linen sofa, 3-seat", status: "In stock", inStock: true },
      { item: "Ceramic vase", status: "Reorder", inStock: false },
    ],
    protectedTitle: "Protected",
    protectedText: "All layers active",
    layers: ["Threat detection", "Network security", "Data protection", "Compliance and risk"],
  },
};

export type ServiceScenesCopy = typeof SERVICE_SCENES;


/** Drawing of a card added on the homepage (when it has no uploaded image). Fixed design. */
export const GENERIC_SCENE = {
  badge: "One team",
  partnerTitle: "One partner",
  partnerText: "Plan to support",
  steps: [
    { title: "Plan", done: true },
    { title: "Build", done: true },
    { title: "Launch", done: false },
    { title: "Support", done: false },
  ],
};

/** A card added on the homepage. */
export const EXTRA_SERVICE_CARD = {
  show: true,
  number: "",
  label: "",
  title: "",
  summary: "",
  image: NO_IMAGE(),
  buttonLink: "",
};

export type ExtraServiceCard = typeof EXTRA_SERVICE_CARD;

/**
 * The "Services" section of the homepage. Each card holds everything the homepage shows for it, top to bottom:
 * number, small label, title, summary, the "Explore" button's link and an optional image that replaces its drawing.
 * Homepage content only: editing a card here changes nothing on any other page.
 */
export const SERVICES_SECTION = {
  title: ["Four wings.", "One blueprint."],
  intro: "Four services engineered as a single, connected system — so nothing gets lost between vendors.",
  exploreLabel: "Explore",
  marketing: {
    show: true,
    number: "01",
    label: "Foot traffic",
    title: "Digital Marketing",
    summary: "SEO, Meta, YouTube, email and WhatsApp campaigns that bring customers in.",
    image: NO_IMAGE(),
    buttonLink: "/services/digital-marketing",
  },
  apps: {
    show: true,
    number: "02",
    label: "Front doors",
    title: "App Development",
    summary: "Android and iOS apps, designed, tested, launched and supported.",
    image: NO_IMAGE(),
    buttonLink: "/services/app-development",
  },
  cad: {
    show: true,
    number: "03",
    label: "Architecture",
    title: "CAD Design and Planning",
    summary: "2D/3D plans and BOQ for homes, retail spaces and industry.",
    image: NO_IMAGE(),
    buttonLink: "",
  },
  software: {
    show: true,
    number: "04",
    label: "Foundation",
    title: "Software and Cybersecurity",
    summary: "Custom software on subscription or one-time, protected end to end.",
    image: NO_IMAGE(),
    buttonLink: "",
  },
  /** Cards added after the four above (empty until one is added). */
  extraCards: [] as ExtraServiceCard[],
  a11y: { listLabel: "Services" },
};

// ── Why Tech Vedha (marquee) ─────────────────────────────────────────────────

export const PROMISES = ["One team", "One timeline", "One invoice", "One point of contact"];

export const WHY = {
  eyebrow: "Why Tech Vedha",
  /** Big outlined words scrolling above the heading. */
  marqueeWords: ["Digital Marketing", "App Development", "CAD Design", "Software", "Cybersecurity"],
  /** Which way the line above the heading scrolls. */
  marqueeDirection: "right-to-left",
  heading: "All of it, from one partner.",
  text: "We design your space, build its software, launch its app, secure its data and market it — across India and abroad.",
  primaryCta: { label: "Start a project", href: "/#contact" },
  secondaryCta: { label: "How we work", href: "/#process" },
  promises: PROMISES,
  /** Which way the line under the buttons scrolls (opposite to the top line by default). */
  promisesDirection: "left-to-right",
  a11y: { pauseLabel: "Pause scrolling text", playLabel: "Play scrolling text" },
};

// ── Security ─────────────────────────────────────────────────────────────────

export const SECURITY_LAYERS = [
  {
    image: NO_IMAGE(),
    number: "01",
    title: "Data protection",
    summary: "Your records stay encrypted, backed up and private.",
    points: ["Encrypted at rest and in transit", "Verified backups", "Role-based access"],
  },
  {
    image: NO_IMAGE(),
    number: "02",
    title: "Network security",
    summary: "Only the right traffic reaches your systems.",
    points: ["Managed firewall", "Admin access over VPN", "Unused ports closed"],
  },
  {
    image: NO_IMAGE(),
    number: "03",
    title: "Threat detection",
    summary: "Suspicious activity is spotted and stopped early.",
    points: ["Continuous monitoring", "Instant alerts", "Scheduled malware scans"],
  },
  {
    image: NO_IMAGE(),
    number: "04",
    title: "Compliance and risk",
    summary: "Policies and audit trails keep you review-ready.",
    points: ["Access policies", "Audit trail on every change", "Regular risk reviews"],
  },
];

/**
 * The drawn illustrations at the top of the security cards (cards 1–4 in order; extra cards reuse them in turn).
 * Fixed design, not edited in the admin: a card can replace its drawing with an uploaded image instead.
 */
export const SECURITY_VISUALS = {
  vault: {
    records: [
      { name: "Customer records", digits: "4821" },
      { name: "Payment data", digits: "0937" },
      { name: "Staff accounts", digits: "1150" },
    ],
    mask: "•••• ••••",
    badge: "Encrypted",
  },
  firewall: { internetLabel: "Internet", firewallLabel: "Firewall", systemsLabel: "Your systems" },
  monitor: {
    title: "Monitoring live",
    period: "24 h",
    events: [
      { label: "Blocked login attempt", time: "2m" },
      { label: "Suspicious IP blocked", time: "14m" },
      { label: "Malware scan clean", time: "1h" },
    ],
  },
  audit: {
    score: "3/4",
    title: "Audit-ready",
    text: "One review scheduled",
    items: [
      { label: "Access policy", done: true },
      { label: "Audit trail", done: true },
      { label: "Data retention", done: true },
      { label: "Risk review", done: false },
    ],
  },
};

export type SecurityVisualsCopy = typeof SECURITY_VISUALS;

export const SECURITY = {
  eyebrow: "Security",
  title: ["Security in", "every layer."],
  intro: "Every build ships with protection designed in, not bolted on — four layers, working together.",
  /** The cards: image (replaces the drawing at the top), number, title, summary, points. */
  layers: SECURITY_LAYERS,
};

// ── Process ──────────────────────────────────────────────────────────────────

export type ProcessStepId = "discover" | "design" | "build" | "test" | "launch" | "support";

export type ProcessStep = {
  /** Uploaded image shown instead of the step's drawing (empty = the drawing). */
  image: { src: string; alt: string; width: number; height: number };
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    image: NO_IMAGE(),
    number: "01",
    title: "Discover",
    summary: "We learn your goals, your customers and what the project must do.",
    deliverables: ["Project brief", "Scope", "Timeline"],
  },
  {
    image: NO_IMAGE(),
    number: "02",
    title: "Design",
    summary: "Plans, screens and architecture you review before anything is built.",
    deliverables: ["Wireframes", "UI design", "Architecture"],
  },
  {
    image: NO_IMAGE(),
    number: "03",
    title: "Build",
    summary: "Clean, reviewed code and a secure setup from day one.",
    deliverables: ["Development", "Code review", "Secure setup"],
  },
  {
    image: NO_IMAGE(),
    number: "04",
    title: "Test",
    summary: "Rigorous QA across devices and real-world use before launch.",
    deliverables: ["Device testing", "Performance", "Security checks"],
  },
  {
    image: NO_IMAGE(),
    number: "05",
    title: "Launch",
    summary: "Deployment, store release and go-live, handled end to end.",
    deliverables: ["Deployment", "Play Store", "App Store"],
  },
  {
    image: NO_IMAGE(),
    number: "06",
    title: "Support",
    summary: "Ongoing updates, fixes and care after launch.",
    deliverables: ["Updates", "Monitoring", "Support"],
  },
];

/** Every word inside the six step illustrations, one group per step. */
/**
 * The drawn example for each step (steps 1–6 in order; added steps reuse them in turn). Fixed design, not edited in the
 * admin: a step can replace its drawing with an uploaded image instead.
 */
export const PROCESS_VISUALS = {
  discover: {
    windowTitle: "Project brief",
    projectName: "Showroom app",
    tags: ["Retail", "Android", "iOS"],
    checklist: [
      { label: "Goals", done: true },
      { label: "Customers", done: true },
      { label: "Must-have features", done: true },
      { label: "Timeline", done: false },
    ],
  },
  design: {
    heroLabel: "Hero",
    stylesLabel: "STYLES",
    typeSample: "Aa",
    screensLabel: "SCREENS",
    /** The first one is highlighted. */
    screens: ["Home", "Product", "Checkout"],
  },
  build: {
    fileName: "checkout.ts",
    status: "Build passing",
    /** One line of code per entry (keywords and function names are coloured automatically). */
    code: [
      "export async function checkout(cart) {",
      "  const order = await api.create(cart);",
      "  await payments.charge(order);",
      "  return notify(order.id);",
      "}",
    ],
    chips: ["main", "Review approved"],
  },
  test: {
    windowTitle: "Test run",
    progress: "5 of 6",
    checklist: [
      { label: "Login and sign-up", done: true },
      { label: "Payments", done: true },
      { label: "Android devices", done: true },
      { label: "iPhone and iPad", done: true },
    ],
    runningCheck: "Load test",
    runningLabel: "Running",
  },
  launch: {
    appInitials: "YS",
    appName: "Your Showroom",
    appCategory: "Shopping",
    getLabel: "Get",
    stores: ["Play Store", "App Store"],
    liveLabel: "Live",
  },
  support: {
    question: "Can we add a festive banner to the app?",
    answer: "Done — it's live on Android and iOS.",
    doneTitle: "Update shipped",
    doneText: "Support request closed",
  },
};

export type ProcessVisualsCopy = typeof PROCESS_VISUALS;

export const PROCESS = {
  eyebrow: "Process",
  title: ["From idea to launch,", "and beyond."],
  intro: "Six clear steps, with something you can review at every one.",
  exampleLabel: "Example project · Showroom app",
  steps: PROCESS_STEPS,
  /** Small counter on each step (desktop). {n} = step number, {total} = number of steps. */
  stepCounter: "Step {n} of {total}",
  /** Phone and tablet buttons under the step card. */
  nextLabel: "Next",
  restartLabel: "Start over",
  banner: {
    heading: "Ready for step one?",
    text: "Tell us about your project and we'll start with a discovery call.",
    primaryCta: { label: "Start a project", href: "/#contact" },
    /** Empty link = the WhatsApp number from Site & menus. */
    secondaryCta: { label: "Chat on WhatsApp", href: "" },
  },
  a11y: {
    stepsLabel: "Process steps",
    previousLabel: "Previous step",
    nextLabel: "Next step",
    /** Collapsed step columns (desktop). {number} = step number, {title} = step title. */
    stepColumnLabel: "Step {number}: {title}",
  },
};

// ── Four pillars ─────────────────────────────────────────────────────────────

export const QUALITY_GATES = [
  "Code review",
  "Automated tests",
  "Device testing",
  "Performance",
  "Security scan",
  "Accessibility",
];

export const PILLARS = {
  eyebrow: "Why Tech Vedha",
  title: ["Built on four", "pillars of trust."],
  intro: "Four promises behind every project.",
  clientCentric: {
    number: "01",
    brief: "We need billing for our [three stores], with [staff logins] and [live stock].",
    briefCredit: "— your brief",
    title: "Client-centric",
    text: "Built around how your business works — no templates.",
    exampleLabel: "Example brief",
    features: ["GST billing", "Multi-store setup", "Role-based logins", "Real-time stock sync"],
  },
  quality: {
    number: "02",
    gates: QUALITY_GATES,
    badge: "Ready to launch",
    title: "Quality and reliability",
    text: "Every release passes six gates before it ships.",
  },
  scalable: {
    number: "03",
    stages: ["1 store", "City", "India", "Abroad"],
    title: "Scalable",
    text: "Grows from one store to many countries.",
  },
  secure: {
    number: "04",
    /** Optional picture in place of the lock drawing (empty = the lock). */
    image: NO_IMAGE(),
    title: "Secure and compliant",
    text: "Your data is protected in every layer.",
  },
  a11y: { featuresLabel: "What the brief becomes", gatesLabel: "Release gates", stagesLabel: "Growth stages" },
};

// ── Client stories ───────────────────────────────────────────────────────────

/** Fields of each story card, top to bottom as the card shows them (layout first; id and kind are fixed). */
const STORY_FIELD_ORDER = [
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
] as const;

const stories = storiesSection();
export const STORIES_SECTION = inOrder(
  {
    ...stories,
    items: stories.items.map((story) => inOrder(story, STORY_FIELD_ORDER as unknown as (keyof typeof story)[])),
  },
  ["eyebrow", "title", "filters", "items", "showMore", "note", "a11y"],
);

// ── FAQ ──────────────────────────────────────────────────────────────────────

export const FAQS = [
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
];

export const FAQ_SECTION = {
  eyebrow: "FAQ",
  title: ["Questions,", "answered."],
  helpTitle: "Still unsure?",
  helpText: "Chat with us on WhatsApp →",
  items: FAQS,
};

// ── Contact ("Let's talk") ───────────────────────────────────────────────────

/** This page's copy of the enquiry form, fields in the order the form shows them (screen-reader name last). */
function enquiryForm() {
  const form = formCopy(ENQUIRY_FORM_COPY);
  return inOrder(
    {
      ...form,
      validation: inOrder(form.validation, [
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
        "textRequired",
        "textTooShort",
        "textTooLong",
      ]),
    },
    [
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
      "errorMessage",
      "submitLabel",
      "validation",
      "sent",
      "emailSubject",
      "emailNoService",
      "formLabel",
    ],
  );
}

export const CONTACT_SECTION = {
  eyebrow: "Let's talk",
  heading: "Let's build your success together.",
  intro: "Tell us what you need. We'll reply with a plan.",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  whatsappValue: "Chat with us",
  /** This page's own enquiry form: labels, service choices, messages and the "Enquiry sent" pop-up. */
  form: enquiryForm(),
};

/** Every homepage section, in page order (top to bottom). Keys must match the admin's `home` sections. */
export const HOME_CONTENT = {
  seo: HOME_SEO,
  hero: HERO,
  blueprint: BLUEPRINT,
  services: SERVICES_SECTION,
  why: WHY,
  security: SECURITY,
  process: PROCESS,
  pillars: PILLARS,
  stories: STORIES_SECTION,
  faq: FAQ_SECTION,
  contact: CONTACT_SECTION,
};

export type HomeContent = typeof HOME_CONTENT;

/** Values tied to code: always the bundled value. Must match Tech-Vedha-Admin (app/lib/content/site-page-defs/home.ts). */
export const HOME_LOCKED: readonly string[] = [];
/** Starting values of a new item in the homepage's lists (the admin's "Add …" buttons). */
export const HOME_TEMPLATES: Record<string, unknown> = {
  "blueprint.slabs": { number: "", wing: "", title: "" },
  "services.extraCards": EXTRA_SERVICE_CARD,
  "security.layers": { image: NO_IMAGE(), number: "", title: "", summary: "", points: [""] },
  "process.steps": { image: NO_IMAGE(), number: "", title: "", summary: "", deliverables: [""] },
  "stories.items": STORY_TEMPLATE,
  "faq.items": { question: "", answer: "" },
};
