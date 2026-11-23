import Marquee from "@/components/home/Marquee";
import MarqueePauseButton from "@/components/home/MarqueePauseButton";
import CtaButtons from "@/components/ui/CtaButtons";
import Eyebrow from "@/components/ui/Eyebrow";
import { PROMISES } from "@/data/home";
import { SERVICES } from "@/data/services";

const SECTION_ID = "why-marquee";
const SERVICE_WORDS = SERVICES.flatMap((service) => service.short);

export default function WhyTechVedha() {
  return (
    <section
      id={SECTION_ID}
      aria-labelledby="why-marquee-title"
      className="defer-render relative isolate overflow-hidden bg-bg pt-28 pb-20"
    >
      <div
        aria-hidden
        className="absolute bottom-[60px] left-1/2 -z-10 h-[220px] w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(20_70_224/0.25),transparent)] blur-[40px]"
      />
      <Eyebrow variant="centered">Why Tech Vedha</Eyebrow>

      <div className="mt-12">
        <Marquee items={SERVICE_WORDS} tone="outline" duration={70} />
      </div>

      <div data-reveal-stagger className="container-site mt-12 flex flex-col items-center text-center">
        <h2
          id="why-marquee-title"
          className="font-display text-[clamp(2rem,3.5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-fg"
        >
          All of it, from one partner.
        </h2>
        <p className="mt-3 max-w-[617px] text-[17px] leading-[1.6] text-pretty text-fg-muted">
          We design your space, build its software, launch its app, secure its data and market it — across India and abroad.
        </p>
        <CtaButtons
          href="/#contact"
          secondary={{ href: "/#process", label: "How we work" }}
          className="mt-7 justify-center"
        />
      </div>

      <div className="mt-12">
        <Marquee items={PROMISES} tone="gradient" duration={45} />
      </div>

      <div className="container-site mt-8 flex justify-end">
        <MarqueePauseButton targetId={SECTION_ID} />
      </div>
    </section>
  );
}
