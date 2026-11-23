import type { MetadataRoute } from "next";
import { ALL_PAGES } from "@/lib/pages";
import { SITE } from "@/lib/site";

/** Generated from lib/pages.ts — add new pages there, not here. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_PAGES.map((page) => ({
    url: page.path === "/" ? SITE.url : `${SITE.url}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
