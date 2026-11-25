import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/home/Contact";
import Testimonials from "@/components/home/Testimonials";
import Coverage from "@/components/service/Coverage";
import Deliverables from "@/components/service/Deliverables";
import HowItWorks from "@/components/service/HowItWorks";
import ServiceHero from "@/components/service/ServiceHero";
import TechStack from "@/components/service/TechStack";
import UseCases from "@/components/service/UseCases";
import WhyUs from "@/components/service/WhyUs";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd, type Crumb } from "@/lib/seo";
import { getServicePage, getServicePageSlugs } from "@/server/content";
import { PageSeo } from "@/components/seo/SeoTags";

type ServicePageProps = { params: Promise<{ slug: string }> };

/** Pages are prerendered at build time and regenerated at most every 10 minutes (ISR). */
export const revalidate = 600;
/**
 * The pages live at build time are prerendered; a page switched on in the admin later (an added service with
 * "Has its own page") renders on first visit. A slug without a page is a 404 (notFound below).
 */
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServicePageSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const page = await getServicePage((await params).slug);
  if (!page) return {};

  return pageMetadata({ ...page.seo, path: `/services/${page.service.slug}` });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const page = await getServicePage((await params).slug);
  if (!page) notFound();

  const { service } = page;
  const path = `/services/${service.slug}`;
  const trail: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: service.title },
  ];
  const structuredData = [
    serviceJsonLd({
      name: service.title,
      description: page.seo.description,
      path,
      offers: page.coverage.items.map((item) => item.title),
    }),
    breadcrumbJsonLd(trail),
    faqJsonLd(page.faq.items),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <PageSeo path={path} />
      <ServiceHero page={page} trail={trail} />
      {/* Sections a page written in the admin hasn't filled in yet are left out. */}
      {page.coverage.items.length > 0 && <Coverage page={page} />}
      {page.whyUs.points.length > 0 && <WhyUs page={page} />}
      {page.deliverables.cards.length > 0 && <Deliverables page={page} />}
      {page.useCases.items.length > 0 && <UseCases page={page} />}
      <HowItWorks page={page} />
      {page.techStack.groups.length > 0 && <TechStack page={page} />}
      <Testimonials />
      {page.faq.items.length > 0 && (
        <Faq
          title={page.faq.title}
          items={page.faq.items}
          group="service-faq"
          className="lg:grid-cols-[483fr_725fr] lg:gap-[72px]"
        />
      )}
      <Contact />
    </>
  );
}
