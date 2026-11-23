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
import { ABOUT_SEO } from "@/data/about";
import { FAQS } from "@/data/home";
import { aboutPageJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata, type Crumb } from "@/lib/seo";

const PATH = "/about";
const TRAIL: Crumb[] = [{ label: "Home", href: "/" }, { label: "About" }];

export const metadata: Metadata = pageMetadata({ ...ABOUT_SEO, path: PATH, absoluteTitle: true });

const STRUCTURED_DATA = [
  aboutPageJsonLd({ name: ABOUT_SEO.title, description: ABOUT_SEO.description, path: PATH }),
  breadcrumbJsonLd(TRAIL),
  faqJsonLd(FAQS),
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
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
