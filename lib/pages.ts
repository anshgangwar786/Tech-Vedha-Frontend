import type { MetadataRoute } from "next";
import type { ResolvedServicePage } from "@/data/service-pages";

/**
 * Every public page of the site, in one place. Drives both /sitemap.xml (for search engines)
 * and the /site-map page (for people). Add each new page here as it is built; service pages
 * are picked up automatically from data/service-pages.ts.
 */
export type SitePage = {
  title: string;
  path: string;
  description: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export const MAIN_PAGES: SitePage[] = [
  {
    title: "Home",
    path: "/",
    description: "One IT partner for marketing, apps, CAD and software — how the four services fit together.",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    title: "About",
    path: "/about",
    description: "Why Tech Vedha exists, who we work with and how we work.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    title: "Contact",
    path: "/contact",
    description: "Send an enquiry, email us or chat on WhatsApp.",
    changeFrequency: "yearly",
    priority: 0.6,
  },
];

/** Sitemap entries for the service pages (live titles via getServicePages(), or the bundled ones). */
export const toServiceSitePages = (pages: ResolvedServicePage[]): SitePage[] =>
  pages.map((page) => ({
    title: page.service.title,
    path: `/services/${page.service.slug}`,
    description: page.service.summary,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

export const SITE_MAP_PAGE: SitePage = {
  title: "Sitemap",
  path: "/site-map",
  description: "Every page on the Tech Vedha website.",
  changeFrequency: "monthly",
  priority: 0.3,
};

/** Homepage sections worth jumping to directly (ids live in components/home). */
export const HOME_SECTIONS: { title: string; href: string }[] = [
  { title: "Services", href: "/#services" },
  { title: "Why Tech Vedha", href: "/#why" },
  { title: "Security", href: "/#security" },
  { title: "How we work", href: "/#process" },
  { title: "Client stories", href: "/#work" },
  { title: "FAQ", href: "/#faq" },
  { title: "Start a project", href: "/#contact" },
];
