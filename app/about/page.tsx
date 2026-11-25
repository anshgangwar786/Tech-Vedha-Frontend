import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import HowItConnects from "@/components/about/HowItConnects";
import HowWeWork from "@/components/about/HowWeWork";
import MissionVision from "@/components/about/MissionVision";
import WhoWeWorkWith from "@/components/about/WhoWeWorkWith";
import WhyWeExist from "@/components/about/WhyWeExist";
import Contact from "@/components/home/Contact";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import { aboutPageJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata, type Crumb } from "@/lib/seo";
import { getAbout, getHome } from "@/server/content";
import { PageSeo } from "@/components/seo/SeoTags";

const PATH = "/about";
const TRAIL: Crumb[] = [{ label: "Home", href: "/" }, { label: "About" }];

export async function generateMetadata(): Promise<Metadata> {
  const { ABOUT_SEO } = await getAbout();
  return pageMetadata({ ...ABOUT_SEO, path: PATH, absoluteTitle: true });
}

export default async function AboutPage() {
  const [{ ABOUT_SEO }, { FAQS }] = await Promise.all([getAbout(), getHome()]);
  const STRUCTURED_DATA = [
    aboutPageJsonLd({ name: ABOUT_SEO.title, description: ABOUT_SEO.description, path: PATH }),
    breadcrumbJsonLd(TRAIL),
    faqJsonLd(FAQS),
  ];
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <PageSeo path={PATH} />
      <AboutHero trail={TRAIL} />
      <WhyWeExist />
      <WhoWeWorkWith />
      <HowItConnects />
      <HowWeWork />
      <MissionVision />
      <Faq />
      <Contact />
    </>
  );
}
