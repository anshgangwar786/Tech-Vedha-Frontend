import Marquee from "@/components/home/Marquee";
import MarqueePauseButton from "@/components/home/MarqueePauseButton";
import CtaButtons from "@/components/ui/CtaButtons";
import Eyebrow from "@/components/ui/Eyebrow";
import { getHome, getServices } from "@/server/content";

const SECTION_ID = "why-marquee";

export default async function WhyTechVedha() {
  const { why } = await getHome();
  const SERVICE_WORDS = (await getServices()).flatMap((service) => service.short);
  return (
    <section
      id={SECTION_ID}
      aria-labelledby="why-marquee-title"
      className="defer-render relative isolate overflow-hidden bg-bg pt-20 pb-14 sm:pt-28 sm:pb-20"
    >
      <div
        aria-hidden
        className="absolute bottom-[60px] left-1/2 -z-10 h-[220px] w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(20_70_224/0.25),transparent)] blur-[40px]"
      />
      <Eyebrow variant="centered">{why.eyebrow}</Eyebrow>

      <div className="mt-8 sm:mt-12">
        <Marquee items={SERVICE_WORDS} tone="outline" duration={70} />
      </div>

      <div data-reveal-stagger className="container-site mt-8 flex flex-col items-center text-center sm:mt-12">
        <h2
          id="why-marquee-title"
          className="font-display text-[clamp(2rem,3.5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-fg"
        >
          {why.heading}
        </h2>
        <p className="mt-3 max-w-[617px] text-[17px] leading-[1.6] text-pretty text-fg-muted">
          {why.text}
        </p>
        <CtaButtons
          href={why.primaryCta.href}
          label={why.primaryCta.label}
          secondary={why.secondaryCta}
          className="mt-7 w-full justify-center"
        />
      </div>

      <div className="mt-8 sm:mt-12">
        <Marquee items={why.promises} tone="gradient" duration={45} reverse />
      </div>

      <div className="container-site mt-6 flex justify-end sm:mt-8">
        <MarqueePauseButton targetId={SECTION_ID} />
      </div>
    </section>
  );
}
