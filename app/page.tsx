import type { Metadata } from "next";
import Blueprint from "@/components/home/Blueprint";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import Process from "@/components/home/Process";
import Security from "@/components/home/Security";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import WhyTechVedha from "@/components/home/WhyTechVedha";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { getHome } from "@/server/content";
import { PageSeo } from "@/components/seo/SeoTags";

/** Title, description and keywords from Homepage → SEO in the admin. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHome();
  return pageMetadata({ ...seo, path: "/", absoluteTitle: true });
}

/** Every section reads the homepage's own content (Homepage in the admin), top to bottom. */
export default async function HomePage() {
  const { faq, stories, contact } = await getHome();
  return (
    <>
      <JsonLd data={[faqJsonLd(faq.items.filter((item) => item.question.trim()))]} />
      <PageSeo path={"/"} />
      <Hero />
      <Blueprint />
      <Services />
      <WhyTechVedha />
      <Security />
      <Process />
      <Pillars />
      <Testimonials content={stories} />
      <Faq content={faq} />
      <Contact content={contact} />
    </>
  );
}
