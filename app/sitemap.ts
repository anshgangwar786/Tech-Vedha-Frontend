import type { MetadataRoute } from "next";
import { MAIN_PAGES, SITE_MAP_PAGE, toServiceSitePages } from "@/lib/pages";
import { SITE } from "@/lib/site";
import { getServicePages } from "@/server/content";

/** Regenerated at most every 10 minutes, so service pages switched on in the admin are listed. */
export const revalidate = 600;

/** Generated from lib/pages.ts and the live service pages — add new pages there, not here. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [...MAIN_PAGES, ...toServiceSitePages(await getServicePages()), SITE_MAP_PAGE];
  return pages.map((page) => ({
    url: page.path === "/" ? SITE.url : `${SITE.url}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
