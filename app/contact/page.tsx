import type { Metadata } from "next";
import Channels from "@/components/contact/Channels";
import CompanyDetails from "@/components/contact/CompanyDetails";
import ContactHero from "@/components/contact/ContactHero";
import ExploreBand from "@/components/contact/ExploreBand";
import JsonLd from "@/components/ui/JsonLd";
import { CONTACT_SEO } from "@/data/contact";
import { breadcrumbJsonLd, contactPageJsonLd, pageMetadata, type Crumb } from "@/lib/seo";

const PATH = "/contact";
const TRAIL: Crumb[] = [{ label: "Home", href: "/" }, { label: "Contact" }];

export const metadata: Metadata = pageMetadata({ ...CONTACT_SEO, path: PATH, absoluteTitle: true });

const STRUCTURED_DATA = [
  contactPageJsonLd({ name: CONTACT_SEO.title, description: CONTACT_SEO.description, path: PATH }),
  breadcrumbJsonLd(TRAIL),
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <ContactHero trail={TRAIL} />
      <Channels />
      <CompanyDetails />
      <ExploreBand />
    </>
  );
}
