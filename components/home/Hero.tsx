import Image from "next/image";
import CtaButtons from "@/components/ui/CtaButtons";
import Eyebrow from "@/components/ui/Eyebrow";
import BadgeRing from "@/components/home/BadgeRing";
import { getHome } from "@/server/content";

export default async function Hero() {
  const { hero } = await getHome();
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_100%_at_15%_10%,var(--hero-from),var(--hero-to)_75%)]"
    >
      {/* Decorative light wave; the theme decides which variant is visible. */}
      <div aria-hidden className="absolute -inset-x-[13.6%] -top-[12%] -bottom-[19%] -z-10">
        <Image src={hero.background.dark.src} alt={hero.background.dark.alt} fill unoptimized loading="eager" className="hidden dark:block" />
        <Image src={hero.background.light.src} alt={hero.background.light.alt} fill unoptimized loading="eager" className="dark:hidden" />
      </div>

      <div className="container-site flex min-h-[max(640px,100svh)] flex-col pt-[117px] lg:min-h-[900px]">
        <div className="reveal-load-stagger flex flex-1 flex-col justify-center gap-[27px] py-9">
          <Eyebrow variant="pill">{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.5rem,8.2vw,7.38rem)] leading-[0.98] font-normal tracking-[-0.035em] text-fg dark:text-white"
          >
            {hero.titleLead} <span className="block text-brand dark:text-white">{hero.titleAccent}</span>
          </h1>
          <p className="max-w-[432px] text-lg leading-[1.6] text-fg-muted">
            {hero.intro}
          </p>
          <CtaButtons
            href={hero.primaryCta.href}
            label={hero.primaryCta.label}
            secondary={{ ...hero.secondaryCta, variant: "glass" }}
            className="pt-1"
          />
        </div>

        <div className="reveal-load flex items-center justify-between gap-6 border-t border-fg/15 pt-5 pb-9 [--d:500ms]">
          <p className="text-sm leading-[1.6] text-fg-muted">{hero.strip}</p>
          <BadgeRing text={hero.ringText} />
        </div>
      </div>
    </section>
  );
}
