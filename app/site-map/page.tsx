import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import JsonLd from "@/components/ui/JsonLd";
import { CARD, CARD_HOVER, DISPLAY_TITLE } from "@/components/ui/styles";
import { hasServicePage, serviceHref } from "@/data/services";
import { MAIN_PAGES, SITE_MAP_PAGE, toServiceSitePages, type SitePage } from "@/lib/pages";
import { breadcrumbJsonLd, pageMetadata, type Crumb } from "@/lib/seo";
import { cx } from "@/lib/cx";
import { getServicePages, getServices, getSite } from "@/server/content";
import { PageSeo } from "@/components/seo/SeoTags";

const TRAIL: Crumb[] = [{ label: "Home", href: "/" }, { label: "Sitemap" }];

export const metadata: Metadata = pageMetadata({
  title: "Sitemap — Tech Vedha",
  description: SITE_MAP_PAGE.description,
  path: SITE_MAP_PAGE.path,
  absoluteTitle: true,
});

const groupTitle = "text-xs font-medium tracking-[0.16em] text-fg-subtle uppercase";

function PageCard({ page }: { page: SitePage }) {
  return (
    <li>
      <Link href={page.path} className={cx(CARD, CARD_HOVER, "group flex h-full flex-col gap-2 p-5 sm:p-6")}>
        <span className="flex items-center justify-between gap-3 font-display text-[22px] text-fg">
          {page.title}
          <ArrowRight aria-hidden className="size-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="text-[15px] leading-[1.55] text-fg-muted">{page.description}</span>
        <span className="mt-auto pt-2 text-[13px] text-fg-subtle">{page.path}</span>
      </Link>
    </li>
  );
}

export default async function SiteMapPage() {
  const [SERVICES, servicePages, { SITEMAP_PAGE: copy }] = await Promise.all([getServices(), getServicePages(), getSite()]);
  // Titles and descriptions from the admin; the addresses (and search-engine settings) stay fixed.
  const PAGES = MAIN_PAGES.map((page) => {
    const edited = copy.pages.find((item) => item.path === page.path);
    return { ...page, title: edited?.title.trim() || page.title, description: edited?.description.trim() ?? page.description };
  });
  const SERVICE_SITE_PAGES = toServiceSitePages(servicePages);
  /** Services that don't have their own page yet still appear, pointing at their homepage card. */
  const UPCOMING_SERVICES = SERVICES.filter((service) => !hasServicePage(service));
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(TRAIL)]} />
      <PageSeo path={SITE_MAP_PAGE.path} />
      <section aria-labelledby="sitemap-title" className="bg-bg pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pb-[136px]">
        <div className="container-site flex flex-col gap-12 sm:gap-16">
          <header className="reveal-load-stagger flex flex-col gap-5 sm:gap-6">
            <Breadcrumb items={TRAIL} />
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h1 id="sitemap-title" className={DISPLAY_TITLE}>
              {copy.title}
            </h1>
          </header>

          <nav aria-labelledby="sitemap-pages" className="flex flex-col gap-5">
            <h2 id="sitemap-pages" className={groupTitle}>
              {copy.pagesTitle}
            </h2>
            <ul data-reveal-stagger className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {PAGES.map((page) => (
                <PageCard key={page.path} page={page} />
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="sitemap-services" className="flex flex-col gap-5">
            <h2 id="sitemap-services" className={groupTitle}>
              {copy.servicesTitle}
            </h2>
            <ul data-reveal-stagger className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {SERVICE_SITE_PAGES.map((page) => (
                <PageCard key={page.path} page={page} />
              ))}
              {UPCOMING_SERVICES.map((service) => (
                <PageCard
                  key={service.id}
                  page={{
                    title: service.title,
                    path: serviceHref(service),
                    description: [service.summary, copy.comingSoon].filter(Boolean).join(" "),
                    changeFrequency: "monthly",
                    priority: 0,
                  }}
                />
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="sitemap-home" className="flex flex-col gap-5">
            <h2 id="sitemap-home" className={groupTitle}>
              {copy.homeTitle}
            </h2>
            <ul data-reveal-stagger className="flex flex-wrap gap-2.5">
              {copy.homeSections.filter((section) => section.title.trim()).map((section) => (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    className="inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-medium text-fg-muted transition-colors hover:border-brand hover:text-fg"
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
