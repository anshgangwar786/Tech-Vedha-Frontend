import type { Metadata } from "next";
import { media } from "@/data/media";
import { SERVICES as BUNDLED_SERVICES, type Service } from "@/data/services";
import { SITE, type SiteData } from "@/lib/site";

/** Live brand and contact details (getSite()); the bundled ones when omitted. */
type SiteInfo = SiteData["SITE"];

export type JsonLdData = Record<string, unknown>;
type JsonLd = JsonLdData;

/** One step in a breadcrumb trail; the current page (last item) has no `href`. */
export type Crumb = { label: string; href?: string };

/** Standard page metadata: canonical URL plus matching Open Graph and Twitter cards. */
export function pageMetadata(page: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Use the title as-is, without the site-wide "%s | Tech Vedha" template. */
  absoluteTitle?: boolean;
}): Metadata {
  const { title, description, path, keywords } = page;
  return {
    title: page.absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

const ORGANIZATION_ID = `${SITE.url}/#organization`;

/** `logo`: the light logo from Site & menus (a site path or a Media Library URL). */
export function organizationJsonLd(
  site: SiteInfo = SITE,
  SERVICES: Service[] = BUNDLED_SERVICES,
  logo = media("/brand/logo-light.png"),
): JsonLd {
  const SITE = site;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORGANIZATION_ID,
        name: SITE.name,
        slogan: SITE.tagline,
        description: SITE.description,
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phone,
        logo: logo.startsWith("/") ? `${SITE.url}${logo}` : logo,
        areaServed: ["IN", "Worldwide"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IT services",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.title, description: service.summary },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function faqJsonLd(faqs: readonly { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** A single service offered by the organisation, with its sub-services as an offer catalogue. */
export function serviceJsonLd(service: {
  name: string;
  description: string;
  path: string;
  offers: readonly string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${SITE.url}${service.path}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: ["IN", "Worldwide"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: service.offers.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };
}

/** An "about us" page describing the organisation. */
export function aboutPageJsonLd(page: { name: string; description: string; path: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: page.name,
    description: page.description,
    url: `${SITE.url}${page.path}`,
    about: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: "en-IN",
  };
}

/** A contact page, with the organisation's sales contact point. */
export function contactPageJsonLd(
  page: { name: string; description: string; path: string },
  site: SiteInfo = SITE,
): JsonLd {
  const SITE = site;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: page.name,
    description: page.description,
    url: `${SITE.url}${page.path}`,
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: "en-IN",
    mainEntity: {
      "@id": ORGANIZATION_ID,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phone,
        areaServed: ["IN", "Worldwide"],
        availableLanguage: ["en"],
      },
    },
  };
}

/** Breadcrumb trail, from the same items the visible <Breadcrumb> renders. */
export function breadcrumbJsonLd(items: readonly Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${SITE.url}${item.href}` }),
    })),
  };
}

/** Serialises JSON-LD for a <script> tag, escaping "<" so content can never close the tag early. */
export function jsonLdScript(data: JsonLd): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
