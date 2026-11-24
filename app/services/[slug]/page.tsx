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
import { SERVICE_PAGES, getServicePage } from "@/data/service-pages";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd, type Crumb } from "@/lib/seo";

type ServicePageProps = { params: Promise<{ slug: string }> };

/** Pages are prerendered at build time and regenerated at most every 10 minutes (ISR). */
export const revalidate = 600;
/** Only slugs listed in data/service-pages.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const page = getServicePage((await params).slug);
  if (!page) return {};

  return pageMetadata({ ...page.seo, path: `/services/${page.service.slug}` });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const page = getServicePage((await params).slug);
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
      <ServiceHero page={page} trail={trail} />
      <Coverage page={page} />
      <WhyUs page={page} />
      <Deliverables page={page} />
      <UseCases page={page} />
      <HowItWorks page={page} />
      <TechStack page={page} />
      <Testimonials />
      <Faq
        title={page.faq.title}
        items={page.faq.items}
        group="service-faq"
        className="lg:grid-cols-[483fr_725fr] lg:gap-[72px]"
      />
      <Contact />
    </>
  );
}
