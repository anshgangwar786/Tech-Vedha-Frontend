/**
 * Homepage copy. Service data lives in data/services.ts.
 *
 * HOME_CONTENT (bottom of this file) groups everything by page section, top to bottom, exactly as the homepage
 * renders it. It is the admin editor's schema: each top-level key becomes one card in Dashboard → Homepage.
 */

export const SECURITY_LAYERS = [
  {
    number: "01",
    title: "Data protection",
    summary: "Your records stay encrypted, backed up and private.",
    points: ["Encrypted at rest and in transit", "Verified backups", "Role-based access"],
  },
  {
    number: "02",
    title: "Network security",
    summary: "Only the right traffic reaches your systems.",
    points: ["Managed firewall", "Admin access over VPN", "Unused ports closed"],
  },
  {
    number: "03",
    title: "Threat detection",
    summary: "Suspicious activity is spotted and stopped early.",
    points: ["Continuous monitoring", "Instant alerts", "Scheduled malware scans"],
  },
  {
    number: "04",
    title: "Compliance and risk",
    summary: "Policies and audit trails keep you review-ready.",
    points: ["Access policies", "Audit trail on every change", "Regular risk reviews"],
  },
] as const;

export type ProcessStepId = "discover" | "design" | "build" | "test" | "launch" | "support";

export type ProcessStep = {
  id: ProcessStepId;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    summary: "We learn your goals, your customers and what the project must do.",
    deliverables: ["Project brief", "Scope", "Timeline"],
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    summary: "Plans, screens and architecture you review before anything is built.",
    deliverables: ["Wireframes", "UI design", "Architecture"],
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    summary: "Clean, reviewed code and a secure setup from day one.",
    deliverables: ["Development", "Code review", "Secure setup"],
  },
  {
    id: "test",
    number: "04",
    title: "Test",
    summary: "Rigorous QA across devices and real-world use before launch.",
    deliverables: ["Device testing", "Performance", "Security checks"],
  },
  {
    id: "launch",
    number: "05",
    title: "Launch",
    summary: "Deployment, store release and go-live, handled end to end.",
    deliverables: ["Deployment", "Play Store", "App Store"],
  },
  {
    id: "support",
    number: "06",
    title: "Support",
    summary: "Ongoing updates, fixes and care after launch.",
    deliverables: ["Updates", "Monitoring", "Support"],
  },
];

export const QUALITY_GATES = [
  "Code review",
  "Automated tests",
  "Device testing",
  "Performance",
  "Security scan",
  "Accessibility",
];

export type StoryCategory = "Marketing" | "Apps" | "CAD" | "Software";

type StoryBase = {
  id: string;
  category: StoryCategory;
  role: string;
  company: string;
  /** Desktop masonry column (0–2), following the Figma layout. */
  column: 0 | 1 | 2;
};

export type Story =
  | (StoryBase & { kind: "quote"; quote: string; avatar: string })
  | (StoryBase & { kind: "stat"; stat: string; statLabel: string; quote: string; avatar: string })
  | (StoryBase & { kind: "photo"; quote: string; photo: string; photoAlt: string })
  | (StoryBase & { kind: "featured"; quote: string; avatar: string });

export const STORY_FILTERS = ["All", "Marketing", "Apps", "CAD", "Software"] as const;
export type StoryFilter = (typeof STORY_FILTERS)[number];

/** Sample copy for review — replace with approved client stories, names and photos before launch. */
export const STORIES: Story[] = [
  {
    id: "instagram-ads",
    column: 0,
    kind: "quote",
    category: "Marketing",
    quote:
      "Our Instagram ads finally reach people near the store, and enquiries now come straight into WhatsApp. We reply from one place instead of juggling DMs, calls and forms.",
    role: "Owner",
    company: "Home décor store",
    avatar: "/home/avatars/homedecor.jpg",
  },
  {
    id: "app-launch",
    column: 0,
    kind: "photo",
    category: "Apps",
    quote: "Our Android and iOS apps went live together, and updates still keep coming.",
    role: "Founder",
    company: "Grocery delivery startup",
    photo: "/home/stories/app-launch.jpg",
    photoAlt: "Founder of a grocery delivery startup in their warehouse",
  },
  {
    id: "four-to-one",
    column: 0,
    kind: "stat",
    category: "Apps",
    stat: "4 → 1",
    statLabel: "vendors to manage",
    quote: "Design, app, software and marketing — all handled by one team with one invoice.",
    role: "Owner",
    company: "Multi-brand showroom",
    avatar: "/home/avatars/showroom.jpg",
  },
  {
    id: "3d-showroom",
    column: 1,
    kind: "photo",
    category: "CAD",
    quote: "The 3D views let us walk the showroom before a single partition went up.",
    role: "Proprietor",
    company: "Furniture showroom",
    photo: "/home/stories/3d-showroom.jpg",
    photoAlt: "Furniture showroom owner holding a tablet with a 3D floor plan",
  },
  {
    id: "floor-plans",
    column: 1,
    kind: "featured",
    category: "CAD",
    quote:
      "We came for floor plans and stayed for everything else. The same team drew our villas in 2D and 3D, prepared the BOQ, built the booking app and ran the launch campaign. One WhatsApp group replaced four vendors and endless follow-ups.",
    role: "Director",
    company: "Residential builder",
    avatar: "/home/avatars/builder.jpg",
  },
  {
    id: "clinic-app",
    column: 1,
    kind: "quote",
    category: "Apps",
    quote:
      "Patients book appointments in the app and get WhatsApp reminders. The team tested it on every phone our patients use before launch.",
    role: "Clinic administrator",
    company: "Healthcare clinic",
    avatar: "/home/avatars/clinic.jpg",
  },
  {
    id: "three-stores",
    column: 2,
    kind: "stat",
    category: "Software",
    stat: "3 stores",
    statLabel: "on one billing system",
    quote: "Billing, stock and staff logins run on one system now — no more end-of-day spreadsheets.",
    role: "Managing partner",
    company: "Electronics retail chain",
    avatar: "/home/avatars/retail.jpg",
  },
  {
    id: "subscription",
    column: 2,
    kind: "quote",
    category: "Software",
    quote:
      "We chose the subscription model because our processes keep changing. Every new requirement gets added without a new contract, and the security checks run in the background.",
    role: "Operations head",
    company: "Manufacturing unit",
    avatar: "/home/avatars/manufacturing.jpg",
  },
  {
    id: "cad-drawings",
    column: 2,
    kind: "quote",
    category: "CAD",
    quote:
      "They turn our sketches into accurate CAD drawings quickly, and the bill of quantities matches the drawings line for line, which makes contractor quotes far easier.",
    role: "Architect",
    company: "Interior design studio",
    avatar: "/home/avatars/studio.jpg",
  },
  {
    id: "youtube-seo",
    column: 2,
    kind: "photo",
    category: "Marketing",
    quote: "Our YouTube shorts and Google ranking now bring new customers in every week.",
    role: "Owner",
    company: "Clothing boutique",
    photo: "/home/stories/youtube-seo.jpg",
    photoAlt: "Clothing boutique owner smiling in their store",
  },
];

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

export const PROMISES = ["One team", "One timeline", "One invoice", "One point of contact"];

/** Replaces "{count}" in admin-edited copy with the number of services in words ("Four"). */
export const withCount = (text: string, count: string) => text.replaceAll("{count}", count);

/** A button: visible label and where it goes ("/#contact", "/about", "https://…"). */
export type CtaLink = { label: string; href: string };

export const HERO = {
  eyebrow: "IT solutions · India and abroad",
  titleLead: "Build for",
  titleAccent: "Tomorrow.",
  intro: "Design, software, apps, security and marketing — one partner instead of four vendors.",
  primaryCta: { label: "Start a project", href: "/#contact" },
  secondaryCta: { label: "Explore services", href: "/#services" },
  strip: "Digital Marketing · App Development · CAD Design · Software and Security",
  ringText: "TECH VEDHA • BUILD FOR TOMORROW • ",
};

export const BLUEPRINT = {
  eyebrow: "The digital blueprint",
  title: ["Drawn as a blueprint.", "Built as one."],
  intro: "{count} wings, assembled from the foundation up, so every part fits the next.",
  tagline: "ONE STRUCTURE · ONE TEAM",
};

export const SERVICES_SECTION = {
  title: ["{count} wings.", "One blueprint."],
  intro: "{count} services engineered as a single, connected system — so nothing gets lost between vendors.",
  exploreLabel: "Explore",
};

export const WHY = {
  eyebrow: "Why Tech Vedha",
  heading: "All of it, from one partner.",
  text: "We design your space, build its software, launch its app, secure its data and market it — across India and abroad.",
  primaryCta: { label: "Start a project", href: "/#contact" },
  secondaryCta: { label: "How we work", href: "/#process" },
  promises: PROMISES,
};

export const SECURITY = {
  eyebrow: "Security",
  title: ["Security in", "every layer."],
  intro: "Every build ships with protection designed in, not bolted on — four layers, working together.",
  layers: SECURITY_LAYERS.map((layer) => ({ ...layer, points: [...layer.points] })),
};

export const PROCESS = {
  eyebrow: "Process",
  title: ["From idea to launch,", "and beyond."],
  intro: "Six clear steps, with something you can review at every one.",
  exampleLabel: "Example project · Showroom app",
  /** Phone and tablet buttons under the step card. */
  nextLabel: "Next",
  restartLabel: "Start over",
  /** Small counter on each step (desktop). {n} = step number, {total} = number of steps. */
  stepCounter: "Step {n} of {total}",
  steps: PROCESS_STEPS,
  banner: {
    heading: "Ready for step one?",
    text: "Tell us about your project and we'll start with a discovery call.",
    primaryCta: { label: "Start a project", href: "/#contact" },
  },
};

export const PILLARS = {
  eyebrow: "Why Tech Vedha",
  title: ["Built on four", "pillars of trust."],
  intro: "Four promises behind every project.",
  clientCentric: {
    brief: "We need billing for our [three stores], with [staff logins] and [live stock].",
    briefCredit: "— your brief",
    title: "Client-centric",
    text: "Built around how your business works — no templates.",
    exampleLabel: "Example brief",
    features: ["GST billing", "Multi-store setup", "Role-based logins", "Real-time stock sync"],
  },
  quality: {
    gates: QUALITY_GATES,
    badge: "Ready to launch",
    title: "Quality and reliability",
    text: "Every release passes six gates before it ships.",
  },
  scalable: {
    stages: ["1 store", "City", "India", "Abroad"],
    title: "Scalable",
    text: "Grows from one store to many countries.",
  },
  secure: {
    title: "Secure and compliant",
    text: "Your data is protected in every layer.",
  },
};

export const STORIES_SECTION = {
  eyebrow: "Client stories",
  title: ["In our clients'", "own words."],
  showMore: "Show more stories",
  note: "Sample copy for review — replace with approved client stories, names and photos before launch.",
  items: STORIES,
};

export const FAQ_SECTION = {
  eyebrow: "FAQ",
  title: ["Questions,", "answered."],
  helpTitle: "Still unsure?",
  helpText: "Chat with us on WhatsApp →",
  items: FAQS,
};

export const CONTACT_SECTION = {
  eyebrow: "Let's talk",
  heading: "Let's build your success together.",
  intro: "Tell us what you need. We'll reply with a plan.",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  whatsappValue: "Chat with us",
  /** The enquiry form beside it (also on the About and service pages). */
  form: {
    nameLabel: "Name",
    phoneLabel: "Phone / WhatsApp",
    phonePlaceholder: "+91 98765 43210",
    emailLabel: "Email",
    serviceLabel: "Service",
    servicePlaceholder: "Select a service",
    messageLabel: "Message",
    messagePlaceholder: "A few lines about your project",
    submitLabel: "Send enquiry",
  },
};

export type EnquiryFormCopy = typeof CONTACT_SECTION.form;

/** Every homepage section, in page order (top to bottom). Keys must match the admin's `home` sections. */
export const HOME_CONTENT = {
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
