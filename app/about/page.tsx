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
import { getAbout } from "@/server/content";
import { PageSeo } from "@/components/seo/SeoTags";

const PATH = "/about";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAbout();
  return pageMetadata({ ...seo, path: PATH, absoluteTitle: true });
}

/** Every section reads the About page's own content (admin: About Us), in page order. */
export default async function AboutPage() {
  const about = await getAbout();
  const { breadcrumb } = about.hero;
  const trail: Crumb[] = [
    { label: breadcrumb.homeLabel, href: breadcrumb.homeHref || "/" },
    { label: breadcrumb.currentLabel },
  ];
  const faqItems = about.faq.items.filter((item) => item.question.trim() && item.answer.trim());
  const STRUCTURED_DATA = [
    aboutPageJsonLd({ name: about.seo.title, description: about.seo.description, path: PATH }),
    breadcrumbJsonLd(trail),
    ...(faqItems.length ? [faqJsonLd(faqItems)] : []),
  ];
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <PageSeo path={PATH} />
      <AboutHero hero={about.hero} trail={trail} />
      <WhyWeExist content={about.whyWeExist} />
      <WhoWeWorkWith content={about.whoWeWorkWith} />
      <HowItConnects content={about.howItConnects} />
      <HowWeWork content={about.howWeWork} />
      <MissionVision content={about.missionVision} />
      {faqItems.length > 0 && <Faq content={about.faq} />}
      <Contact content={about.contact} />
    </>
  );
}
