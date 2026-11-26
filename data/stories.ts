/**
 * Client stories (the testimonial wall). The homepage and each service page keep their OWN copy of the section in
 * their content (storiesSection() makes a fresh copy), so stories can differ from page to page.
 */

/** How a story card looks. The editor only shows the fields the chosen type uses. */
export type StoryKind = "quote" | "stat" | "photo" | "featured";
export const STORY_KINDS: StoryKind[] = ["quote", "stat", "photo", "featured"];

/** Where a card sits on desktop: "auto" puts it in the shortest of the three columns. */
export type StoryColumn = "auto" | "left" | "middle" | "right";
export const STORY_COLUMNS: StoryColumn[] = ["auto", "left", "middle", "right"];

/**
 * One story card. Every card has every field (in the order the card shows them); its `kind` decides which are used:
 * quote = quote + avatar, stat = big number + label + quote + avatar, photo = photo + description + quote,
 * featured = large quote on the brand colour + avatar. Role, company and category are on every card.
 */
export type Story = {
  kind: string;
  column: string;
  photo: string;
  photoAlt: string;
  stat: string;
  statLabel: string;
  quote: string;
  avatar: string;
  role: string;
  company: string;
  category: string;
};

/** A new, empty story card (the admin's "Add story"). */
export const STORY_TEMPLATE: Story = {
  kind: "quote",
  column: "auto",
  photo: "",
  photoAlt: "",
  stat: "",
  statLabel: "",
  quote: "",
  avatar: "",
  role: "",
  company: "",
  category: "",
};

/** Sample copy for review — replace with approved client stories, names and photos before launch. */
export const STORIES: Story[] = [
  {
    kind: "quote",
    column: "left",
    photo: "",
    photoAlt: "",
    stat: "",
    statLabel: "",
    quote: "Our Instagram ads finally reach people near the store, and enquiries now come straight into WhatsApp. We reply from one place instead of juggling DMs, calls and forms.",
    avatar: "/home/avatars/homedecor.jpg",
    role: "Owner",
    company: "Home décor store",
    category: "Marketing",
  },
  {
    kind: "photo",
    column: "left",
    photo: "/home/stories/app-launch.jpg",
    photoAlt: "Founder of a grocery delivery startup in their warehouse",
    stat: "",
    statLabel: "",
    quote: "Our Android and iOS apps went live together, and updates still keep coming.",
    avatar: "",
    role: "Founder",
    company: "Grocery delivery startup",
    category: "Apps",
  },
  {
    kind: "stat",
    column: "left",
    photo: "",
    photoAlt: "",
    stat: "4 → 1",
    statLabel: "vendors to manage",
    quote: "Design, app, software and marketing — all handled by one team with one invoice.",
    avatar: "/home/avatars/showroom.jpg",
    role: "Owner",
    company: "Multi-brand showroom",
    category: "Apps",
  },
  {
    kind: "photo",
    column: "middle",
    photo: "/home/stories/3d-showroom.jpg",
    photoAlt: "Furniture showroom owner holding a tablet with a 3D floor plan",
    stat: "",
    statLabel: "",
    quote: "The 3D views let us walk the showroom before a single partition went up.",
    avatar: "",
    role: "Proprietor",
    company: "Furniture showroom",
    category: "CAD",
  },
  {
    kind: "featured",
    column: "middle",
    photo: "",
    photoAlt: "",
    stat: "",
    statLabel: "",
    quote: "We came for floor plans and stayed for everything else. The same team drew our villas in 2D and 3D, prepared the BOQ, built the booking app and ran the launch campaign. One WhatsApp group replaced four vendors and endless follow-ups.",
    avatar: "/home/avatars/builder.jpg",
    role: "Director",
    company: "Residential builder",
    category: "CAD",
  },
  {
    kind: "quote",
    column: "middle",
    photo: "",
    photoAlt: "",
    stat: "",
    statLabel: "",
    quote: "Patients book appointments in the app and get WhatsApp reminders. The team tested it on every phone our patients use before launch.",
    avatar: "/home/avatars/clinic.jpg",
    role: "Clinic administrator",
    company: "Healthcare clinic",
    category: "Apps",
  },
  {
    kind: "stat",
    column: "right",
    photo: "",
    photoAlt: "",
    stat: "3 stores",
    statLabel: "on one billing system",
    quote: "Billing, stock and staff logins run on one system now — no more end-of-day spreadsheets.",
    avatar: "/home/avatars/retail.jpg",
    role: "Managing partner",
    company: "Electronics retail chain",
    category: "Software",
  },
  {
    kind: "quote",
    column: "right",
    photo: "",
    photoAlt: "",
    stat: "",
    statLabel: "",
    quote: "We chose the subscription model because our processes keep changing. Every new requirement gets added without a new contract, and the security checks run in the background.",
    avatar: "/home/avatars/manufacturing.jpg",
    role: "Operations head",
    company: "Manufacturing unit",
    category: "Software",
  },
  {
    kind: "quote",
    column: "right",
    photo: "",
    photoAlt: "",
    stat: "",
    statLabel: "",
    quote: "They turn our sketches into accurate CAD drawings quickly, and the bill of quantities matches the drawings line for line, which makes contractor quotes far easier.",
    avatar: "/home/avatars/studio.jpg",
    role: "Architect",
    company: "Interior design studio",
    category: "CAD",
  },
  {
    kind: "photo",
    column: "right",
    photo: "/home/stories/youtube-seo.jpg",
    photoAlt: "Clothing boutique owner smiling in their store",
    stat: "",
    statLabel: "",
    quote: "Our YouTube shorts and Google ranking now bring new customers in every week.",
    avatar: "",
    role: "Owner",
    company: "Clothing boutique",
    category: "Marketing",
  },
];

/** Starter copy of the whole "Client stories" section. */
export const storiesSection = () =>
  structuredClone({
    eyebrow: "Client stories",
    title: ["In our clients'", "own words."],
    /** Filter buttons. The first one shows every story; the others show the stories whose category matches. */
    filters: ["All", "Marketing", "Apps", "CAD", "Software"],
    a11y: { filtersLabel: "Filter stories by service" },
    showMore: "Show more stories",
    note: "Sample copy for review — replace with approved client stories, names and photos before launch.",
    items: STORIES,
  });

export type StoriesContent = ReturnType<typeof storiesSection>;
