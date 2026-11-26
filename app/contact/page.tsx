import type { Metadata } from "next";
import Channels from "@/components/contact/Channels";
import CompanyDetails from "@/components/contact/CompanyDetails";
import ContactHero from "@/components/contact/ContactHero";
import ExploreBand from "@/components/contact/ExploreBand";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, contactPageJsonLd, pageMetadata } from "@/lib/seo";
import { getContact, getSite } from "@/server/content";
import { PageSeo } from "@/components/seo/SeoTags";

const PATH = "/contact";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContact();
  return pageMetadata({ ...seo, path: PATH, absoluteTitle: true });
}

export default async function ContactPage() {
  const [{ seo, TRAIL }, { SITE }] = await Promise.all([getContact(), getSite()]);
  const STRUCTURED_DATA = [
    contactPageJsonLd({ name: seo.title, description: seo.description, path: PATH }, SITE),
    breadcrumbJsonLd(TRAIL),
  ];
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <PageSeo path={PATH} />
      <ContactHero />
      <Channels />
      <CompanyDetails />
      <ExploreBand />
    </>
  );
}
