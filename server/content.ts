// Server-side content layer. Every getter:
//
//   • is cached   — the admin API read is cached under the page's tag; Tech-Vedha-Admin expires it on every save
//                   via POST /api/revalidate, and it also expires after CONTENT_REVALIDATE_SECONDS;
//   • is resilient — the saved document is merged over the bundled copy (lib/content/mergeContent.ts), and when
//                   the admin is down or has nothing saved the bundled copy is served as-is;
//   • is deduped per request with React cache(), so the layout, the page and generateMetadata share one read.

import { cache } from "react";
import { ADMIN_TIMEOUT_MS, CONTENT_REVALIDATE_SECONDS, HAS_ADMIN, adminUrl, isAllowedImageSrc } from "@/lib/adminApi";
import { isImageValue, isPlainObject, mergeContent, patternOf, upgradeLegacyHome, type ListTemplates } from "@/lib/content/mergeContent";
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
  CUSTOM_SERVICE_PAGE_LOCKED,
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

/** A file path or URL that points at an image (string image fields: story avatars and photos…). */
const IMAGE_PATH = /^(\/(?!\/)|https?:\/\/)\S*\.(jpe?g|png|webp|gif|avif|svg)(\?\S*)?$/i;

/**
 * Every image of a page goes to next/image, which throws on hosts it isn't configured for. An image whose address
 * isn't a site path or a Media Library URL (MEDIA_HOSTNAMES) keeps its bundled image instead. Works for any page and
 * any image field: image objects ({ src, alt, width, height }) and string fields whose default is an image path.
 */
/** String fields that always hold an image, even when their default is empty (a new story's avatar or photo). */
const IMAGE_FIELD_KEYS = new Set(["avatar", "photo"]);

function guardImages(value: unknown, def: unknown, templates: ListTemplates = {}, path: (string | number)[] = []): unknown {
  if (isImageValue(def)) {
    return isPlainObject(value) && typeof value.src === "string" && (value.src === "" || isAllowedImageSrc(value.src))
      ? value
      : def;
  }
  const key = path[path.length - 1];
  if (typeof def === "string" && (IMAGE_PATH.test(def) || (typeof key === "string" && IMAGE_FIELD_KEYS.has(key)))) {
    // Empty = no image (the card leaves it out).
    return typeof value === "string" && (value === "" || isAllowedImageSrc(value)) ? value : def;
  }
  if (Array.isArray(def) && Array.isArray(value)) {
    const template = def.length ? def[0] : templates[patternOf(path)];
    return value.map((item, i) => guardImages(item, def[i] ?? template, templates, [...path, i]));
  }
  if (isPlainObject(def) && isPlainObject(value)) {
    const out: Record<string, unknown> = { ...value };
    for (const key of Object.keys(def)) out[key] = guardImages(value[key], def[key], templates, [...path, key]);
    return out;
  }
  return value;
}

/** A page's live content: the saved document merged over the bundled copy, with every image checked. */
const getContent = cache(async <K extends ContentKey>(key: K): Promise<Content<K>> => {
  const fetched = await fetchContent(key);
  const raw = key === "home" ? upgradeLegacyHome(fetched) : fetched;
  const defaults = CONTENT_DEFAULTS[key];
  if (raw == null) return defaults;
  const merged = mergeContent(raw, defaults, CONTENT_LOCKED[key], CONTENT_TEMPLATES[key]);
  return guardImages(merged, defaults, CONTENT_TEMPLATES[key]) as Content<K>;
});

/** Brand, contact details, header, footer and the other site-wide parts (lib/site.ts shape). */
export const getSite = cache(async () => buildSite(await getContent("site")));

/** Homepage content, grouped by page section in page order (data/home.ts HOME_CONTENT). */
export const getHome = cache(async () => getContent("home"));

/** About page content, grouped by page section in page order (data/about.ts ABOUT_CONTENT). */
export const getAbout = cache(async () => getContent("about"));

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
  const merged = mergeContent(raw ?? {}, CUSTOM_SERVICE_PAGE_DEFAULTS, CUSTOM_SERVICE_PAGE_LOCKED, CUSTOM_SERVICE_PAGE_TEMPLATES);
  const content = guardImages(merged, CUSTOM_SERVICE_PAGE_DEFAULTS, CUSTOM_SERVICE_PAGE_TEMPLATES);
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
