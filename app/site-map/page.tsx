import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import JsonLd from "@/components/ui/JsonLd";
import { CARD, CARD_HOVER, DISPLAY_TITLE } from "@/components/ui/styles";
import { MAIN_PAGES, SITE_MAP_PAGE } from "@/lib/pages";
import { breadcrumbJsonLd, pageMetadata, type Crumb } from "@/lib/seo";
import { cx } from "@/lib/cx";
import { getSite } from "@/server/content";
import { PageSeo } from "@/components/seo/SeoTags";

/** Everything on this page is its own content (Site & menus → Sitemap page). Page addresses are fixed. */
export async function generateMetadata(): Promise<Metadata> {
  const { SITEMAP_PAGE: copy } = await getSite();
  return pageMetadata({
    title: copy.seo.title,
    description: copy.seo.description,
    path: SITE_MAP_PAGE.path,
    absoluteTitle: true,
  });
}

type Card = { title: string; description: string; href: string; address?: string };

const groupTitle = "text-xs font-medium tracking-[0.16em] text-fg-subtle uppercase";

function PageCard({ page }: { page: Card }) {
  return (
    <li>
      <Link href={page.href} className={cx(CARD, CARD_HOVER, "group flex h-full flex-col gap-2 p-5 sm:p-6")}>
        <span className="flex items-center justify-between gap-3 font-display text-[22px] text-fg">
          {page.title}
          <ArrowRight aria-hidden className="size-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="text-[15px] leading-[1.55] text-fg-muted">{page.description}</span>
        <span className="mt-auto pt-2 text-[13px] text-fg-subtle">{page.address ?? page.href}</span>
      </Link>
    </li>
  );
}

export default async function SiteMapPage() {
  const { SITEMAP_PAGE: copy } = await getSite();
  const TRAIL: Crumb[] = [{ label: copy.breadcrumb.home, href: "/" }, { label: copy.breadcrumb.current }];
  // Titles and descriptions from the admin; the addresses (and search-engine settings) stay fixed.
  const PAGES: Card[] = MAIN_PAGES.map((page) => {
    const edited = copy.pages.find((item) => item.path === page.path);
    return { href: page.path, title: edited?.title.trim() || page.title, description: edited?.description.trim() ?? page.description };
  });
  const SERVICE_CARDS: Card[] = copy.services
    .filter((service) => service.title.trim() && service.href.trim())
    .map((service) => ({ title: service.title, description: service.description, href: service.href }));
  const HOME_SECTIONS = copy.homeSections.filter((section) => section.title.trim() && section.href.trim());
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(TRAIL)]} />
      <PageSeo path={SITE_MAP_PAGE.path} />
      <section aria-labelledby="sitemap-title" className="bg-bg pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pb-[136px]">
        <div className="container-site flex flex-col gap-12 sm:gap-16">
          <header className="reveal-load-stagger flex flex-col gap-5 sm:gap-6">
            <Breadcrumb items={TRAIL} label={copy.breadcrumb.label} />
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
                <PageCard key={page.href} page={page} />
              ))}
            </ul>
          </nav>

          {/* A group whose cards or links were all removed in the admin is left out. */}
          {SERVICE_CARDS.length > 0 && (
            <nav aria-labelledby="sitemap-services" className="flex flex-col gap-5">
              <h2 id="sitemap-services" className={groupTitle}>
                {copy.servicesTitle}
              </h2>
              <ul data-reveal-stagger className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {SERVICE_CARDS.map((page, index) => (
                  <PageCard key={index} page={page} />
                ))}
              </ul>
            </nav>
          )}

          {HOME_SECTIONS.length > 0 && (
            <nav aria-labelledby="sitemap-home" className="flex flex-col gap-5">
              <h2 id="sitemap-home" className={groupTitle}>
                {copy.homeTitle}
              </h2>
              <ul data-reveal-stagger className="flex flex-wrap gap-2.5">
                {HOME_SECTIONS.map((section, index) => (
                  <li key={index}>
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
          )}
        </div>
      </section>
    </>
  );
}
