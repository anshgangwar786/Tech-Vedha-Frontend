import {
  Calendar,
  GraduationCap,
  Heart,
  House,
  LayoutGrid,
  LayoutPanelLeft,
  ListChecks,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  PanelsTopLeft,
  Search,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  SquarePlay,
  Store,
  Tablet,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaAws, FaLinkedin } from "react-icons/fa";
import {
  SiBrevo,
  SiBuffer,
  SiCypress,
  SiDocker,
  SiFacebook,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiGoogleads,
  SiGoogleanalytics,
  SiGooglesearchconsole,
  SiGoogletagmanager,
  SiGraphql,
  SiHotjar,
  SiHubspot,
  SiInstagram,
  SiJest,
  SiKotlin,
  SiKubernetes,
  SiLooker,
  SiMailchimp,
  SiMeta,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSemrush,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiWhatsapp,
  SiYoutube,
  SiZapier,
} from "react-icons/si";
import { SERVICES, type Service, type ServiceId } from "@/data/services";

/** Illustrations available to the "What you get" cards (see components/service/visuals). */
export type DeliverableVisual =
  | "app-screens"
  | "release-checklist"
  | "campaign-dashboard"
  | "campaign-checklist"
  | "search-rankings"
  | "monthly-report";

type IconItem = { title: string; detail: string; icon: LucideIcon };

/**
 * A tool in the tech-stack grid. `color` is the brand colour; omit it for monochrome logos (Next.js, Cypress).
 * Logos missing from react-icons use `image`: a full-colour SVG in /public.
 */
export type TechTool = { name: string; color?: string } & ({ icon: IconType } | { image: string });

export type TechGroup = { title: string; tagline: string; tools: TechTool[] };

export type ProcessTrack = {
  id: string;
  label: string;
  steps: { title: string; summary: string; deliverables: string[] }[];
};

export type ServicePage = {
  id: ServiceId;
  seo: { title: string; description: string; keywords: string[] };
  hero: { title: string; highlight: string; intro: string; platforms: string[] };
  coverage: { title: string[]; intro: string; items: IconItem[]; helpText: string };
  whyUs: { title: string[]; icon: LucideIcon; points: { title: string; detail: string }[] };
  deliverables: {
    title: string[];
    intro: string;
    cards: { title: string; detail: string; visual: DeliverableVisual; href: string }[];
    ownership: { title: string; detail: string; items: string[] };
  };
  useCases: { title: string[]; intro: string; items: IconItem[] };
  /**
   * Service-specific "How it works" tracks. Pages without them fall back to the shared
   * six-step process stepper (components/home/Process).
   */
  process?: { title: string[]; intro: string; tracks: ProcessTrack[]; ctaDetail: string };
  techStack: {
    eyebrow: string;
    title: string;
    highlight: string;
    intro: string;
    highlights: string[];
    groups: TechGroup[];
  };
  faq: { title: string; items: { question: string; answer: string }[] };
};

const PAGES: ServicePage[] = [
  {
    id: "apps",
    seo: {
      title: "Android and iOS App Development",
      description:
        "Native Android and iOS apps, designed, tested, launched on the Play Store and App Store, and supported by one team. Start a project with Tech Vedha.",
      keywords: [
        "app development company",
        "Android app development",
        "iOS app development",
        "mobile app development India",
        "UI/UX design",
        "app testing and launch",
        "app maintenance and support",
      ],
    },
    hero: {
      title: "Apps your customers",
      highlight: "keep opening.",
      intro:
        "Native Android and iOS apps, designed, tested, launched and supported by one team — so your app keeps getting better after launch.",
      platforms: ["Android", "iOS"],
    },
    coverage: {
      title: ["Everything your app needs,", "under one roof."],
      intro: "Five parts of one build. Hire us for one, or for all of them together.",
      items: [
        {
          title: "iOS Apps",
          detail: "Secure, intuitive iPhone and iPad apps that feel at home on Apple devices.",
          icon: Smartphone,
        },
        {
          title: "UI/UX Design",
          detail: "Screens and flows you review and approve before any code is written.",
          icon: PanelsTopLeft,
        },
        {
          title: "Testing and Launch",
          detail: "QA on real devices, then store listing, submission and release.",
          icon: ListChecks,
        },
        {
          title: "Ongoing Support",
          detail: "Updates, fixes and new features as your business and your users change.",
          icon: MessageCircle,
        },
        {
          title: "Android Apps",
          detail: "Native, high-performance apps for the phones most of your customers carry.",
          icon: Tablet,
        },
      ],
      helpText: "Tell us the idea. We'll suggest the right mix of the five.",
    },
    whyUs: {
      title: ["One team, from first", "screen to every update."],
      icon: Smartphone,
      points: [
        { title: "Native performance", detail: "Built for each platform, so the app feels fast and smooth." },
        { title: "Design-led UI", detail: "Screens designed with you and approved before code." },
        { title: "Tested before launch", detail: "QA on real Android and iOS devices before release." },
        { title: "Support after launch", detail: "Updates and fixes from the team that built it." },
      ],
    },
    deliverables: {
      title: ["Real things you can", "hold, test and ship."],
      intro: "Every project ends with deliverables you own and can review at each step.",
      cards: [
        {
          title: "Android and iOS apps",
          detail: "Native apps for both platforms, built from screens you approved.",
          visual: "app-screens",
          href: "#what-we-cover",
        },
        {
          title: "A release you can trust",
          detail: "Every build is tested on real devices and checked off before it reaches the stores.",
          visual: "release-checklist",
          href: "#how-it-works",
        },
      ],
      ownership: {
        title: "You own everything",
        detail: "Handed over at launch, in your name.",
        items: ["Source code", "Design files", "Store accounts in your name", "Documentation"],
      },
    },
    useCases: {
      title: ["Apps for the way", "your business runs."],
      intro: "From the shop floor to the field team — pick the one that sounds like you.",
      items: [
        { title: "Retail and e-commerce", detail: "Catalogue, cart and payments for your store.", icon: ShoppingBag },
        { title: "Bookings and appointments", detail: "Let customers pick a slot and pay ahead.", icon: Calendar },
        { title: "Field staff", detail: "Orders, visits and photos from the road.", icon: MapPin },
        { title: "Internal tools", detail: "Stock, approvals and reports for your team.", icon: LayoutPanelLeft },
        { title: "Customer loyalty", detail: "Points, offers and reminders that bring people back.", icon: Heart },
        { title: "Showroom catalogues", detail: "Show every product, even what is not on the floor.", icon: LayoutGrid },
      ],
    },
    process: {
      title: ["How your app", "gets built."],
      intro: "Pick where you're starting from. The steps change to match.",
      ctaDetail: "Tell us about your app and we'll start with a discovery call.",
      tracks: [
        {
          id: "new",
          label: "New app",
          steps: [
            {
              title: "Discover",
              summary: "We learn your business, your customers and what the app must do, then agree scope and timeline.",
              deliverables: ["Project brief", "Scope", "Timeline"],
            },
            {
              title: "Design",
              summary: "Wireframes and UI for every key screen. You review and approve them before anything is built.",
              deliverables: ["Wireframes", "UI design", "Clickable prototype"],
            },
            {
              title: "Build",
              summary: "Native development for Android and iOS, with code reviews and a secure setup from day one.",
              deliverables: ["Android", "iOS", "Code review"],
            },
            {
              title: "Test",
              summary: "QA across real devices and real-world use: sign-up, payments, performance and security checks.",
              deliverables: ["Device testing", "Performance", "Security checks"],
            },
            {
              title: "Launch",
              summary: "Store listings, submission and go-live on the Play Store and App Store.",
              deliverables: ["Play Store", "App Store", "Go-live"],
            },
            {
              title: "Support",
              summary: "Ongoing updates, fixes and new features after launch.",
              deliverables: ["Updates", "Monitoring", "Support"],
            },
          ],
        },
        {
          id: "existing",
          label: "Existing app",
          steps: [
            {
              title: "Audit",
              summary: "We review your current app, its code, reviews and analytics to see what is working and what is not.",
              deliverables: ["App review", "Code audit", "Findings"],
            },
            {
              title: "Plan",
              summary: "A prioritised plan of fixes, redesigns and new features, agreed with you.",
              deliverables: ["Priorities", "Scope", "Timeline"],
            },
            {
              title: "Improve",
              summary: "Fixes, UI updates and new features built on top of your existing app.",
              deliverables: ["Bug fixes", "Redesign", "New features"],
            },
            {
              title: "Test",
              summary: "Regression testing so nothing that worked before breaks.",
              deliverables: ["Regression tests", "Device testing"],
            },
            {
              title: "Release",
              summary: "Staged updates to the Play Store and App Store.",
              deliverables: ["Release notes", "Store update"],
            },
            {
              title: "Care",
              summary: "Ongoing monitoring and updates from then on.",
              deliverables: ["Monitoring", "Updates", "Support"],
            },
          ],
        },
      ],
    },
    techStack: {
      eyebrow: "Tech stack",
      title: "Proven tools.",
      highlight: "Zero lock-in.",
      intro:
        "We pick the stack that fits your product — not our habits. Everything we ship is modern, well-documented and yours to own.",
      highlights: [
        "iOS · Android · Web from one team",
        "Open standards, no proprietary lock-in",
        "Full source code handed over",
      ],
      groups: [
        {
          title: "Mobile",
          tagline: "Native & cross-platform apps",
          tools: [
            { name: "Swift", icon: SiSwift, color: "#f05138" },
            { name: "Kotlin", icon: SiKotlin, color: "#7f52ff" },
            { name: "Flutter", icon: SiFlutter, color: "#29b6f6" },
            { name: "React Native", icon: SiReact, color: "#61dafb" },
          ],
        },
        {
          title: "Frontend",
          tagline: "Fast, accessible interfaces",
          tools: [
            { name: "React", icon: SiReact, color: "#61dafb" },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4" },
          ],
        },
        {
          title: "Backend",
          tagline: "APIs that scale with you",
          tools: [
            { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
            { name: "Python", icon: SiPython, color: "#3776ab" },
            { name: "Go", icon: SiGo, color: "#00add8" },
            { name: "GraphQL", icon: SiGraphql, color: "#e10098" },
          ],
        },
        {
          title: "Data",
          tagline: "Storage, sync & real-time",
          tools: [
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
            { name: "Redis", icon: SiRedis, color: "#ff4438" },
            { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
          ],
        },
        {
          title: "Cloud & DevOps",
          tagline: "Ship daily, sleep well",
          tools: [
            { name: "AWS", icon: FaAws, color: "#ff9900" },
            { name: "Google Cloud", icon: SiGooglecloud, color: "#4285f4" },
            { name: "Docker", icon: SiDocker, color: "#2496ed" },
            { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5" },
          ],
        },
        {
          title: "Design & QA",
          tagline: "Pixel-checked, test-covered",
          tools: [
            { name: "Figma", icon: SiFigma, color: "#f24e1e" },
            { name: "Jest", icon: SiJest, color: "#c21325" },
            { name: "Cypress", icon: SiCypress },
            { name: "GH Actions", icon: SiGithubactions, color: "#2088ff" },
          ],
        },
      ],
    },
    faq: {
      title: "App questions, answered.",
      items: [
        {
          question: "How long does an app take to build?",
          answer:
            "It depends on features, platforms and integrations. After a discovery call we share a timeline for your specific app.",
        },
        {
          question: "Do you build for both Android and iOS?",
          answer:
            "Yes. We build native apps for Android, for iOS, or for both together, depending on what your customers use.",
        },
        {
          question: "Can you improve an app we already have?",
          answer: "Yes. We start with an audit of the current app, then plan fixes, redesigns or new features with you.",
        },
        {
          question: "Do I need designs ready before we start?",
          answer: "No. Our UI/UX team designs the screens with you, and you approve them before anything is built.",
        },
        {
          question: "Will you publish the app to the stores?",
          answer:
            "Yes. We prepare the store listings and handle submission and release on the Play Store and App Store.",
        },
        {
          question: "Who owns the app and its code?",
          answer: "Ownership terms are agreed in your project contract before work starts.",
        },
        {
          question: "What happens after launch?",
          answer: "Ongoing support: updates, fixes and improvements as your needs change.",
        },
      ],
    },
  },
  {
    id: "marketing",
    seo: {
      title: "Digital Marketing: SEO, Meta, YouTube, Email and WhatsApp",
      description:
        "SEO, Meta and YouTube ads, email and WhatsApp campaigns, planned, run and reported by one team. Bring more customers through your door with Tech Vedha.",
      keywords: [
        "digital marketing agency",
        "SEO services",
        "Meta ads",
        "Facebook and Instagram ads",
        "YouTube marketing",
        "email marketing",
        "WhatsApp marketing",
        "digital marketing India",
      ],
    },
    hero: {
      title: "Digital marketing",
      highlight: "for more customers.",
      intro:
        "Digital marketing services for businesses in India and abroad — SEO, Google and Meta ads, YouTube, email and WhatsApp marketing, planned, run and reported by one team.",
      platforms: ["Search", "Social"],
    },
    coverage: {
      title: ["Digital marketing services,", "under one roof."],
      intro: "SEO, paid ads, video, email and WhatsApp marketing. Hire us for one channel, or for a full-funnel plan.",
      items: [
        {
          title: "SEO Services",
          detail: "Technical, on-page and local SEO that helps you rank higher on Google and grow organic traffic.",
          icon: Search,
        },
        {
          title: "Meta Ads",
          detail: "Facebook and Instagram ad campaigns that reach buyers by interest, location and intent.",
          icon: Megaphone,
        },
        {
          title: "YouTube Marketing",
          detail: "YouTube video ads and channel SEO that put your brand in front of the right viewers.",
          icon: SquarePlay,
        },
        {
          title: "Email Marketing",
          detail: "Email campaigns and automations that turn past customers into repeat buyers.",
          icon: Mail,
        },
        {
          title: "WhatsApp Marketing",
          detail: "WhatsApp Business broadcasts and messaging that turn enquiries into sales.",
          icon: MessageCircle,
        },
      ],
      helpText: "Tell us the idea. We'll suggest the right mix of the five.",
    },
    whyUs: {
      title: ["One marketing team, from", "first search to every sale."],
      icon: Megaphone,
      points: [
        { title: "Search-first strategy", detail: "Keyword research and SEO planned around what your buyers search for." },
        { title: "Creative that converts", detail: "Ad copy and creatives designed with you and approved before launch." },
        { title: "Tracked from day one", detail: "Conversion tracking on every campaign, so ad spend goes where it works." },
        { title: "Reports you can read", detail: "Clear monthly reports on leads, sales and return on ad spend." },
      ],
    },
    deliverables: {
      title: ["Real results you can", "see, track and own."],
      intro: "Every digital marketing campaign comes with tracking, reports and creative assets you own.",
      cards: [
        {
          title: "Campaigns on every channel",
          detail: "Google Search, Meta, YouTube, email and WhatsApp campaigns, managed from one plan you approved.",
          visual: "campaign-dashboard",
          href: "#what-we-cover",
        },
        {
          title: "A launch you can trust",
          detail: "Tracking, targeting and ad creatives are checked before any budget is spent.",
          visual: "campaign-checklist",
          href: "#how-it-works",
        },
        {
          title: "Rank higher on Google",
          detail: "SEO and keyword tracking that moves your pages up for the searches buyers actually make.",
          visual: "search-rankings",
          href: "#what-we-cover",
        },
        {
          title: "Reports you can read",
          detail: "A monthly report on leads by channel, what worked, and where next month’s budget goes.",
          visual: "monthly-report",
          href: "#how-it-works",
        },
      ],
      ownership: {
        title: "You own everything",
        detail: "Set up in your name from day one.",
        items: ["Ad accounts in your name", "Analytics access", "Creative files", "Monthly reports"],
      },
    },
    useCases: {
      title: ["Digital marketing for the", "way your business runs."],
      intro: "From one store to many cities — lead generation and online growth built for your industry.",
      items: [
        { title: "Retail stores", detail: "Local SEO and offers that bring footfall to your shop or showroom.", icon: Store },
        { title: "E-commerce", detail: "Google Shopping, search and social ads that drive online orders.", icon: ShoppingCart },
        { title: "Local services", detail: "Google Business Profile and local search, so nearby customers find you.", icon: MapPin },
        { title: "Real estate and builders", detail: "Lead generation for new projects and site visits.", icon: House },
        { title: "Education and coaching", detail: "Admission campaigns across search, social and YouTube.", icon: GraduationCap },
        { title: "Restaurants and cafés", detail: "Reviews, offers and WhatsApp reminders that fill tables.", icon: Utensils },
      ],
    },
    process: {
      title: ["How we grow", "your business."],
      intro: "Pick where you're starting from. The steps change to match.",
      ctaDetail: "Tell us about your business and we'll start with a discovery call.",
      tracks: [
        {
          id: "new",
          label: "Starting fresh",
          steps: [
            {
              title: "Discover",
              summary: "We learn your business, your customers and your goals, then agree channels, budget and timeline.",
              deliverables: ["Marketing brief", "Goals and KPIs", "Timeline"],
            },
            {
              title: "Plan",
              summary: "Keyword research, audiences and a channel plan, approved by you before any spend.",
              deliverables: ["Keyword research", "Audiences", "Channel plan"],
            },
            {
              title: "Create",
              summary: "Ad copy, creatives and landing pages written and designed, then approved by you.",
              deliverables: ["Ad creatives", "Landing pages", "Content calendar"],
            },
            {
              title: "Launch",
              summary: "Campaigns go live on Google, Meta, YouTube, email and WhatsApp, with tracking set up first.",
              deliverables: ["Conversion tracking", "Campaign setup", "Go-live"],
            },
            {
              title: "Optimise",
              summary: "Weekly tuning of bids, audiences and keywords, so spend goes where it works.",
              deliverables: ["Bid tuning", "A/B tests", "Audience tuning"],
            },
            {
              title: "Report",
              summary: "Monthly reports on leads and sales, with a clear plan for next month.",
              deliverables: ["Monthly report", "Live dashboards", "Next steps"],
            },
          ],
        },
        {
          id: "existing",
          label: "Already running ads",
          steps: [
            {
              title: "Audit",
              summary: "We review your ad accounts, website, rankings and past campaigns to see what is working and what is not.",
              deliverables: ["Account audit", "SEO audit", "Findings"],
            },
            {
              title: "Plan",
              summary: "A prioritised plan of fixes, new campaigns and budget changes, agreed with you.",
              deliverables: ["Priorities", "Goals and KPIs", "Timeline"],
            },
            {
              title: "Improve",
              summary: "Tracking fixes, new creatives and landing page updates on top of your existing campaigns.",
              deliverables: ["Tracking fixes", "New creatives", "Landing pages"],
            },
            {
              title: "Launch",
              summary: "Campaigns relaunch with fixed tracking, so every change is measured.",
              deliverables: ["Relaunch checks", "Conversion tracking"],
            },
            {
              title: "Scale",
              summary: "Scale the campaigns that work and pause the ones that do not.",
              deliverables: ["Budget shifts", "Scaling"],
            },
            {
              title: "Report",
              summary: "Monthly reports and ongoing optimisation from then on.",
              deliverables: ["Live dashboards", "Monthly report", "Next steps"],
            },
          ],
        },
      ],
    },
    techStack: {
      eyebrow: "Marketing stack",
      title: "Proven tools.",
      highlight: "Zero lock-in.",
      intro:
        "We pick the marketing tools that fit your goals — not our habits. Every ad account, report and creative is yours to own.",
      highlights: ["Search · Social · Email from one team", "Ad accounts set up in your name", "Clear monthly reporting"],
      groups: [
        {
          title: "Search & SEO",
          tagline: "Get found when buyers search",
          tools: [
            { name: "Search Console", icon: SiGooglesearchconsole, color: "#458cf5" },
            { name: "Semrush", icon: SiSemrush, color: "#ff642d" },
            { name: "Business Profile", image: "/tools/google-business-profile.svg", color: "#4285f4" },
            { name: "GA4", icon: SiGoogleanalytics, color: "#e37400" },
          ],
        },
        {
          title: "Paid ads",
          tagline: "Spend that is aimed and tracked",
          tools: [
            { name: "Google Ads", icon: SiGoogleads, color: "#4285f4" },
            { name: "Meta Ads", icon: SiMeta, color: "#0467df" },
            { name: "YouTube Ads", icon: SiYoutube, color: "#ff0000" },
            { name: "LinkedIn Ads", icon: FaLinkedin, color: "#0a66c2" },
          ],
        },
        {
          title: "Social",
          tagline: "Content people stop for",
          tools: [
            { name: "Instagram", icon: SiInstagram, color: "#e4405f" },
            { name: "Facebook", icon: SiFacebook, color: "#0866ff" },
            { name: "Canva", image: "/tools/canva.svg", color: "#00c4cc" },
            { name: "Buffer", icon: SiBuffer },
          ],
        },
        {
          title: "Email",
          tagline: "Campaigns that bring people back",
          tools: [
            { name: "Mailchimp", icon: SiMailchimp, color: "#ffe01b" },
            { name: "Brevo", icon: SiBrevo, color: "#0b996e" },
            { name: "HubSpot", icon: SiHubspot, color: "#ff7a59" },
            { name: "Zapier", icon: SiZapier, color: "#ff4f00" },
          ],
        },
        {
          title: "WhatsApp",
          tagline: "Messages where customers chat",
          tools: [
            { name: "WhatsApp API", icon: SiWhatsapp, color: "#25d366" },
            { name: "Broadcasts", icon: SiWhatsapp, color: "#25d366" },
            { name: "CRM sync", icon: SiHubspot, color: "#ff7a59" },
            { name: "Automations", icon: SiZapier, color: "#ff4f00" },
          ],
        },
        {
          title: "Tracking & reports",
          tagline: "Know what is working",
          tools: [
            { name: "Tag Manager", icon: SiGoogletagmanager, color: "#246fdb" },
            { name: "Looker Studio", icon: SiLooker, color: "#4285f4" },
            { name: "Hotjar", icon: SiHotjar, color: "#ff3c00" },
            { name: "Analytics", icon: SiGoogleanalytics, color: "#e37400" },
          ],
        },
      ],
    },
    faq: {
      title: "Digital marketing questions, answered.",
      items: [
        {
          question: "How soon will I see results from SEO and ads?",
          answer:
            "Paid ads can bring visits within days, while SEO usually builds over a few months. We share expected timelines after a discovery call.",
        },
        {
          question: "Do you manage Google Ads and Meta ads?",
          answer:
            "Yes. We plan and run campaigns on Google Search, YouTube, Facebook and Instagram, depending on where your customers are.",
        },
        {
          question: "Can you work with our existing ad accounts?",
          answer: "Yes. We start with an audit of your current accounts and campaigns, then plan improvements with you.",
        },
        {
          question: "Who creates the ads and posts?",
          answer: "Our team writes and designs the creatives with you, and you approve them before anything goes live.",
        },
        {
          question: "How do you report marketing results?",
          answer: "You get a clear monthly report on spend, reach, leads and sales, plus access to live dashboards.",
        },
        {
          question: "Who owns the ad accounts and data?",
          answer: "Accounts are set up in your name, so your data and campaign history stay with you.",
        },
        {
          question: "Do you offer digital marketing outside India?",
          answer: "Yes. We run digital marketing campaigns for businesses across India and abroad.",
        },
      ],
    },
  },
];

export type ResolvedServicePage = ServicePage & { service: Service };

/** Every service page with its catalogue entry (number, wing, title, slug) attached. */
export const SERVICE_PAGES: ResolvedServicePage[] = PAGES.map((page) => {
  const service = SERVICES.find((item) => item.id === page.id);
  if (!service) throw new Error(`Service page "${page.id}" has no entry in data/services.ts`);
  return { ...page, service };
});

export function getServicePage(slug: string): ResolvedServicePage | undefined {
  return SERVICE_PAGES.find((page) => page.service.slug === slug);
}
