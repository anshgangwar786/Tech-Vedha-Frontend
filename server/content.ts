// Server-side content layer. Every getter:
//
//   • is cached   — the admin API read is cached under the page's tag; Tech-Vedha-Admin expires it on every save
//                   via POST /api/revalidate, and it also expires after CONTENT_REVALIDATE_SECONDS;
//   • is resilient — the saved document is merged over the bundled copy (lib/content/mergeContent.ts), and when
//                   the admin is down or has nothing saved the bundled copy is served as-is;
//   • is deduped per request with React cache(), so the layout, the page and generateMetadata share one read.

import { cache } from "react";
import { ADMIN_TIMEOUT_MS, CONTENT_REVALIDATE_SECONDS, HAS_ADMIN, adminUrl, isAllowedImageSrc } from "@/lib/adminApi";
import { isPlainObject, mergeContent, upgradeLegacyHome } from "@/lib/content/mergeContent";
import {
  CONTENT_DEFAULTS,
  CONTENT_LOCKED,
  CONTENT_TEMPLATES,
  contentTag,
  servicePageKey,
  type Content,
  type ContentKey,
} from "@/lib/content/registry";
import { getPreviewDraft } from "@/lib/preview";
import { buildContact } from "@/data/contact";
import { resolveServicePages, type ResolvedServicePage, type ServicePage } from "@/data/service-pages";
import {
  CUSTOM_SERVICE_PAGE_DEFAULTS,
  CUSTOM_SERVICE_PAGE_TEMPLATES,
  toServicePage,
  type CustomServicePageContent,
} from "@/data/custom-service-pages";
import { addedServicePageKey } from "@/lib/content/serviceSlugs";
import { withAddedServices, type Service } from "@/data/services";
import { buildSite } from "@/lib/site";

/**
 * The saved document of a page, or null (nothing saved, or the admin unreachable). `key` is a ContentKey, or
 * "service-<slug>" for the page of a service added in the admin.
 */
const fetchContent = cache(async (key: string): Promise<unknown> => {
  if (!HAS_ADMIN) return null;
  // Previewing unsaved edits from the admin (lib/preview.ts): only in that browser, never cached.
  const preview = await getPreviewDraft();
  if (preview?.kind === "site-page" && preview.key === key) return preview.content;
  return fetchSaved(key);
});

/** The published document of a page (never a preview draft), so it can be read outside a request too. */
const fetchSaved = cache(async (key: string): Promise<unknown> => {
  if (!HAS_ADMIN) return null;
  try {
    const res = await fetch(adminUrl(`/api/site-pages/client/${key}`), {
      cache: "force-cache",
      next: { tags: [contentTag(key)], revalidate: CONTENT_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(ADMIN_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body: unknown = await res.json();
    if (!isPlainObject(body) || !("page" in body)) throw new Error("unexpected response shape");
    return isPlainObject(body.page) ? body.page.content : null;
  } catch (error) {
    const reason = error instanceof Error ? error.message.split("\n")[0] : String(error);
    console.error(`[content] admin API unavailable for "${key}", using bundled content: ${reason}`);
    return null;
  }
});

/** A page's live content: the saved document merged over the bundled copy. */
const getContent = cache(async <K extends ContentKey>(key: K): Promise<Content<K>> => {
  const fetched = await fetchContent(key);
  const raw = key === "home" ? upgradeLegacyHome(fetched) : fetched;
  const defaults = CONTENT_DEFAULTS[key];
  return raw == null ? defaults : mergeContent(raw, defaults, CONTENT_LOCKED[key], CONTENT_TEMPLATES[key]);
});

/** Brand, contact details and menus (lib/site.ts shape). */
export const getSite = cache(async () => buildSite(await getContent("site")));

/** Homepage copy, grouped by page section (data/home.ts HOME_CONTENT). */
export const getHome = cache(async () => {
  const c = await getContent("home");
  // Avatars and photos go to next/image, which throws on hosts it isn't configured for: keep the bundled image then.
  const bundledStories = CONTENT_DEFAULTS.home.stories.items;
  const stories = c.stories.items.map((story, i) => {
    const bundled = bundledStories[i] as Record<string, unknown> | undefined;
    const fixed: Record<string, unknown> = { ...story };
    for (const key of ["avatar", "photo"]) {
      const src = fixed[key];
      if (typeof src === "string" && !isAllowedImageSrc(src)) fixed[key] = bundled?.[key];
    }
    return fixed as typeof story;
  });
  return {
    ...c,
    stories: { ...c.stories, items: stories },
    // Shorthands used by other pages (About FAQ, service pages' fallback process).
    PROCESS_STEPS: c.process.steps,
    STORIES: stories,
    FAQS: c.faq.items,
  };
});

/** About page copy (data/about.ts shape). */
export const getAbout = cache(async () => {
  const c = await getContent("about");
  return {
    ABOUT_SEO: c.seo,
    HERO: c.hero,
    WHY_WE_EXIST: c.whyWeExist,
    WHO_WE_WORK_WITH: c.whoWeWorkWith,
    HOW_IT_CONNECTS: c.howItConnects,
    HOW_WE_WORK: c.howWeWork,
    MISSION_VISION: c.missionVision,
    WING_TAGS: c.wingTags,
    HERO_FACTS: c.heroFacts,
    VENDOR_COMPARISON: c.vendorComparison,
    AUDIENCES: c.audiences,
    LOOP_STEPS: c.loopSteps,
    LOOP_EXAMPLE_DETAIL: c.loopExampleDetail,
    PRINCIPLES: c.principles,
    MISSION: c.mission,
    VISION: c.vision,
  };
});

/** Contact page copy (data/contact.ts shape), with contact links from the site settings. */
export const getContact = cache(async () => buildContact(await getContent("contact"), await getSite()));

/**
 * The service catalogue: the four built-in services (ids and slugs fixed, so hasServicePage/serviceHref stay static),
 * then the services added in the admin, which link to their card on the homepage.
 */
export const getServices = cache(async (): Promise<Service[]> => {
  const { items, added } = await getContent("services");
  return withAddedServices(items, added);
});

/**
 * Slugs of the live service pages, for generateStaticParams. That runs at build time without a request, where
 * preview (draftMode) can't be read, so this reads the published catalogue only.
 */
export async function getServicePageSlugs(): Promise<string[]> {
  const raw = await fetchSaved("services");
  const { items, added } =
    raw == null
      ? CONTENT_DEFAULTS.services
      : mergeContent(raw, CONTENT_DEFAULTS.services, CONTENT_LOCKED.services, CONTENT_TEMPLATES.services);
  return withAddedServices(items, added)
    .filter((service) => service.page)
    .map((service) => service.slug);
}

/** The page of a service added in the admin: its saved document merged over the starter copy. */
const getCustomServicePage = cache(async (service: Service): Promise<ResolvedServicePage> => {
  const raw = await fetchContent(addedServicePageKey(service.slug));
  const content = mergeContent(raw ?? {}, CUSTOM_SERVICE_PAGE_DEFAULTS, [], CUSTOM_SERVICE_PAGE_TEMPLATES);
  return toServicePage(content as CustomServicePageContent, service);
});

/**
 * Every service page with its catalogue entry attached: the built-in pages, then the pages of services added in the
 * admin that have "Has its own page" switched on — in catalogue order.
 */
export const getServicePages = cache(async () => {
  const services = await getServices();
  const keys = CONTENT_DEFAULTS.services.items
    .map((service) => servicePageKey(service.id))
    .filter((key) => key in CONTENT_DEFAULTS);
  const builtIn = resolveServicePages((await Promise.all(keys.map((key) => getContent(key)))) as ServicePage[], services);
  const builtInIds = new Set(builtIn.map((page) => page.service.id));
  // Previewing a page from the admin shows it even before "Has its own page" is switched on (that browser only).
  const preview = await getPreviewDraft();
  const previewKey = preview?.kind === "site-page" ? preview.key : null;
  const custom = await Promise.all(
    services
      .filter((service) => !builtInIds.has(service.id))
      .filter((service) => service.page || addedServicePageKey(service.slug) === previewKey)
      .map((service) => getCustomServicePage(service)),
  );
  return [...builtIn, ...custom];
});

export const getServicePage = cache(async (slug: string) =>
  (await getServicePages()).find((page) => page.service.slug === slug),
);
