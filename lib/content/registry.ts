// The pages whose copy is edited in Tech-Vedha-Admin (Dashboard → Site content) and stored in its
// site-pages table, one JSON document per key. The bundled copy in data/ and lib/site.ts is each page's
// fallback and schema: the admin's document is merged over it value by value (lib/content/mergeContent.ts),
// so a partial or bad save never breaks a page, and the site renders as before when the admin is down.
//
// KEEP IN SYNC with Tech-Vedha-Admin/app/lib/content/site-pages.ts: same keys and `locked` paths.
// After changing any bundled copy, run `npm run sync:defaults` in Tech-Vedha-Admin.

import {
  ABOUT_HERO,
  ABOUT_SEO,
  AUDIENCES,
  HERO_FACTS,
  HOW_IT_CONNECTS,
  HOW_WE_WORK,
  LOOP_EXAMPLE_DETAIL,
  LOOP_STEPS,
  MISSION,
  MISSION_VISION,
  PRINCIPLES,
  VENDOR_COMPARISON,
  VISION,
  WHO_WE_WORK_WITH,
  WHY_WE_EXIST,
  WING_TAGS,
} from "@/data/about";
import { CONTACT_CONTENT } from "@/data/contact";
import { HOME_CONTENT } from "@/data/home";
import { SERVICE_PAGE_CONTENT, type ServicePage } from "@/data/service-pages";
import { ADDED_SERVICE_TEMPLATE, SERVICE_CATALOGUE, type AddedService } from "@/data/services";
import { SITE_CONTENT } from "@/lib/site";
import type { ListTemplates } from "@/lib/content/mergeContent";

/** In page order, top to bottom (the admin shows one card per key). */
const ABOUT_CONTENT = {
  seo: ABOUT_SEO,
  hero: ABOUT_HERO,
  wingTags: WING_TAGS,
  heroFacts: HERO_FACTS,
  whyWeExist: WHY_WE_EXIST,
  vendorComparison: VENDOR_COMPARISON,
  whoWeWorkWith: WHO_WE_WORK_WITH,
  audiences: AUDIENCES,
  howItConnects: HOW_IT_CONNECTS,
  loopSteps: LOOP_STEPS,
  loopExampleDetail: LOOP_EXAMPLE_DETAIL,
  howWeWork: HOW_WE_WORK,
  principles: PRINCIPLES,
  missionVision: MISSION_VISION,
  mission: MISSION,
  vision: VISION,
};

/** The four built-in services (fixed order and links) and the ones added in the admin (empty until then). */
const SERVICES_CONTENT = { items: SERVICE_CATALOGUE, added: [] as AddedService[] };

const servicePage = (id: ServicePage["id"]) => {
  const page = SERVICE_PAGE_CONTENT.find((item) => item.id === id);
  if (!page) throw new Error(`No bundled service page "${id}"`);
  return page;
};

export const CONTENT_DEFAULTS = {
  site: SITE_CONTENT,
  home: HOME_CONTENT,
  about: ABOUT_CONTENT,
  contact: CONTACT_CONTENT,
  services: SERVICES_CONTENT,
  "service-apps": servicePage("apps"),
  "service-marketing": servicePage("marketing"),
};

export type ContentKey = keyof typeof CONTENT_DEFAULTS;
export type Content<K extends ContentKey> = (typeof CONTENT_DEFAULTS)[K];

/** Service page key in the admin for a service id. */
export const servicePageKey = (id: string) => `service-${id}` as ContentKey;

/**
 * Values tied to code (ids the components switch on, icons, illustrations, links between records): they always
 * keep the bundled value, and lists containing them keep their length. Must match the admin's registry.
 */
const SERVICE_PAGE_LOCKED = [
  "id",
  "coverage.items[].icon",
  "whyUs.icon",
  "deliverables.cards[].visual",
  "deliverables.cards[].href",
  "useCases.items[].icon",
  "process.tracks[].id",
  "techStack.groups[].tools",
] as const;

export const CONTENT_LOCKED: Record<ContentKey, readonly string[]> = {
  // Page addresses on the sitemap are tied to real pages: only their titles and descriptions are editable.
  site: ["sitemapPage.pages[].path", "sitemapPage.homeSections[].href"],
  home: ["process.steps[].id", "stories.items[].id", "stories.items[].kind"],
  about: ["audiences[].icon", "loopSteps[].service"],
  contact: ["quickContacts[].icon", "channels[].icon"],
  services: ["items[].id", "items[].slug"],
  "service-apps": SERVICE_PAGE_LOCKED,
  "service-marketing": SERVICE_PAGE_LOCKED,
};

/**
 * Item shape of lists that are empty by default, so saved items can be read and the admin can add the first one.
 * Exported to Tech-Vedha-Admin/data/siteContentTemplates.json by `npm run sync:defaults` there.
 */
export const CONTENT_TEMPLATES: Partial<Record<ContentKey, ListTemplates>> = {
  services: { added: ADDED_SERVICE_TEMPLATE },
};

/** Cache tag of a page. Must match jmtSitePageTags in Tech-Vedha-Admin/app/lib/utils/revalidateFrontend.ts. */
export const contentTag = (key: string) => `jmt-page-${key}`;
