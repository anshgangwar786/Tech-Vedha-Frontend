import type { Metadata } from "next";
import Channels from "@/components/contact/Channels";
import CompanyDetails from "@/components/contact/CompanyDetails";
import ContactHero from "@/components/contact/ContactHero";
import ExploreBand from "@/components/contact/ExploreBand";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, contactPageJsonLd, pageMetadata, type Crumb } from "@/lib/seo";
import { getContact, getSite } from "@/server/content";
import { PageSeo } from "@/components/seo/SeoTags";

const PATH = "/contact";
const TRAIL: Crumb[] = [{ label: "Home", href: "/" }, { label: "Contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const { CONTACT_SEO } = await getContact();
  return pageMetadata({ ...CONTACT_SEO, path: PATH, absoluteTitle: true });
}

export default async function ContactPage() {
  const [{ CONTACT_SEO }, { SITE }] = await Promise.all([getContact(), getSite()]);
  const STRUCTURED_DATA = [
    contactPageJsonLd({ name: CONTACT_SEO.title, description: CONTACT_SEO.description, path: PATH }, SITE),
    breadcrumbJsonLd(TRAIL),
  ];
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <PageSeo path={PATH} />
      <ContactHero trail={TRAIL} />
      <Channels />
      <CompanyDetails />
      <ExploreBand />
    </>
  );
}
