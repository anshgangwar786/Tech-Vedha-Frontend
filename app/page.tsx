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
import { FAQS } from "@/data/home";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(FAQS)]} />
      <Hero />
      <Blueprint />
      <Services />
      <WhyTechVedha />
      <Security />
      <Process />
      <Pillars />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
