// Slugs of the services added in the admin (Service catalogue → Added services).
//
// KEEP IN SYNC: this file is identical in Tech-Vedha-Admin/lib/sitePages/serviceSlugs.ts
// and Tech-Vedha-frontend/lib/content/serviceSlugs.ts, so the admin (sidebar, page
// editors, SEO list) and the website agree on every added service's address and on
// the key of its page ("service-<slug>").

/** "CAD & 3D Rendering!" → "cad-and-3d-rendering". */
export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
}

/**
 * The slug of each added service, in order: its own slug (or its title's) made unique against the built-in
 * services' ids and slugs and the earlier added services ("apps" → "apps-2"). Null for a service that isn't shown
 * (no title yet).
 */
export function addedServiceSlugs(taken: readonly string[], added: readonly { title: string; slug: string }[]): (string | null)[] {
  const used = new Set(taken);
  return added.map((item) => {
    const title = item.title.trim();
    const base = slugify(item.slug.trim() || title);
    if (!title || !base) return null;
    let slug = base;
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
    used.add(slug);
    return slug;
  });
}

/** Key of an added service's page in the admin's site-pages table. */
export const addedServicePageKey = (slug: string) => `service-${slug}`;

/** True for a key that can hold an added service's page (format only; built-in keys are checked by the caller). */
export const isAddedServicePageKey = (key: string) => /^service-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key) && key.length <= 68;
