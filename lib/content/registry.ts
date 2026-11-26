// The pages whose copy is edited in Tech-Vedha-Admin (Dashboard → Content) and stored in its site-pages table, one
// JSON document per key. Every page owns ALL of its content: nothing a visitor reads on one page comes from another
// page's document, so each page can be edited on its own.
//
// The bundled copy (data/*.ts, lib/site.ts) is each page's fallback and schema: the admin's document is merged over
// it value by value (lib/content/mergeContent.ts), so a partial or bad save never breaks a page, and the site renders
// as before when the admin is down. Each data file also exports its page's locked paths and list templates.
//
// KEEP IN SYNC with Tech-Vedha-Admin/app/lib/content/site-pages: same keys and `locked` paths.
// After changing any bundled copy, run `npm run sync:defaults` in Tech-Vedha-Admin.

import { ABOUT_CONTENT, ABOUT_LOCKED, ABOUT_TEMPLATES } from "@/data/about";
import { CONTACT_CONTENT, CONTACT_LOCKED, CONTACT_TEMPLATES } from "@/data/contact";
import { HOME_CONTENT, HOME_LOCKED, HOME_TEMPLATES } from "@/data/home";
import {
  SERVICE_PAGE_CONTENT,
  SERVICE_PAGE_LOCKED,
  SERVICE_PAGE_TEMPLATES,
  type ServicePage,
} from "@/data/service-pages";
import { SERVICES_CONTENT, SERVICES_LOCKED, SERVICES_TEMPLATES } from "@/data/services";
import { SITE_CONTENT, SITE_LOCKED, SITE_TEMPLATES } from "@/lib/site";
import type { ListTemplates } from "@/lib/content/mergeContent";

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
export const CONTENT_LOCKED: Record<ContentKey, readonly string[]> = {
  site: SITE_LOCKED,
  home: HOME_LOCKED,
  about: ABOUT_LOCKED,
  contact: CONTACT_LOCKED,
  services: SERVICES_LOCKED,
  "service-apps": SERVICE_PAGE_LOCKED,
  "service-marketing": SERVICE_PAGE_LOCKED,
};

/**
 * Item shape of lists that are empty by default, so saved items can be read and the admin can add the first one.
 * Exported to Tech-Vedha-Admin/data/siteContentTemplates.json by `npm run sync:defaults` there.
 */
export const CONTENT_TEMPLATES: Partial<Record<ContentKey, ListTemplates>> = {
  site: SITE_TEMPLATES,
  home: HOME_TEMPLATES,
  about: ABOUT_TEMPLATES,
  contact: CONTACT_TEMPLATES,
  services: SERVICES_TEMPLATES,
  "service-apps": SERVICE_PAGE_TEMPLATES,
  "service-marketing": SERVICE_PAGE_TEMPLATES,
};

/** Cache tag of a page. Must match jmtSitePageTags in Tech-Vedha-Admin/app/lib/utils/cacheTags.ts. */
export const contentTag = (key: string) => `jmt-page-${key}`;
