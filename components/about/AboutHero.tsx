import Link from "next/link";
import { Sparkle } from "lucide-react";
import { WingIcon } from "@/components/about/icons";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaButtons from "@/components/ui/CtaButtons";
import Eyebrow from "@/components/ui/Eyebrow";
import { CARD_HOVER, HIGHLIGHT } from "@/components/ui/styles";
import { withCount } from "@/data/home";
import { countWord, isBuiltInService, serviceHref, type Service, type ServiceId } from "@/data/services";
import type { Crumb } from "@/lib/seo";
import { cx } from "@/lib/cx";
import { getAbout, getServices } from "@/server/content";

/** The wing shown as featured in the "What we do" panel. */
const FEATURED: ServiceId = "apps";

async function WingCard({ service, className }: { service: Service; className?: string }) {
  const { WING_TAGS } = await getAbout();
  const { id } = service;
  const featured = id === FEATURED;
  // Built-in services have tags edited on the About page; added services show their first offerings instead.
  const tags = isBuiltInService(id) ? WING_TAGS[id] : service.offerings.slice(0, 3).map((offering) => offering.title);

  return (
    <li
      className={cx(
        "relative flex flex-col gap-2.5 rounded-[18px] border p-5 sm:min-h-[207px]",
        className,
        featured ? cx(HIGHLIGHT, "border-transparent") : cx("border-line bg-surface", CARD_HOVER),
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cx(
            "grid size-11 place-items-center rounded-[13px] border",
            featured ? "border-white/35 bg-white/16 text-white" : "border-line bg-surface-raised text-brand",
          )}
        >
          <WingIcon id={id} className="size-[21px]" />
        </span>
        <span className={cx("font-display text-[26px] leading-none font-light", featured ? "text-white/90" : "text-brand")}>
          {service.number}
        </span>
      </div>
      <p
        className={cx(
          "mt-3 text-[11px] font-medium tracking-[0.12em] uppercase sm:mt-auto sm:text-[10.5px]",
          featured ? "text-white/85" : "text-fg-subtle",
        )}
      >
        {service.wing}
      </p>
      <p className={cx("font-display text-xl leading-[1.2]", featured ? "text-white" : "text-fg")}>
        {/* The whole card is the hit area. */}
        <Link href={serviceHref(service)} className="after:absolute after:inset-0 after:rounded-[18px]">
          {service.title}
        </Link>
      </p>
      <ul aria-label={`${service.title} includes`} className="flex flex-wrap gap-1.5">
        {tags.filter((tag) => tag.trim()).map((tag, index) => (
          <li
            key={index}
            className={cx(
              "flex h-6 items-center rounded-full border px-[9px] text-[11px] font-medium",
              featured ? "border-white/30 bg-white/14 text-white" : "border-line bg-surface-raised text-fg-muted",
            )}
          >
            {tag}
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Intro copy beside the "What we do · four wings" panel, with quick facts underneath. */
export default async function AboutHero({ trail }: { trail: Crumb[] }) {
  const { HERO, HERO_FACTS } = await getAbout();
  const SERVICES = await getServices();
  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_100%_at_30%_0%,var(--hero-from),var(--hero-to)_85%)] pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-[175px] lg:pb-[72px]"
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-[31%] -z-10 h-[80%] w-[90%] rounded-[50%] bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_26%,#1446e0_56%,transparent)] opacity-35 blur-[60px] dark:opacity-93"
      />

      <div className="container-site">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[634fr_574fr] lg:gap-[72px]">
          <div className="reveal-load-stagger flex flex-col items-start gap-5 sm:gap-[26px]">
            <Breadcrumb items={trail} />
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
            <h1
              id="about-title"
              className="font-display text-[clamp(2.75rem,5.8vw,5.22rem)] leading-[1.1] font-light tracking-[-0.035em] text-fg dark:text-white"
            >
              {HERO.titleLead} <span className="text-gradient block pb-[0.08em]">{HERO.titleAccent}</span>
            </h1>
            <p className="max-w-[481px] text-[17px] leading-[1.6] text-fg-muted sm:text-lg">
              {HERO.intro}
            </p>
            <CtaButtons
              href={HERO.primaryCta.href}
              label={HERO.primaryCta.label}
              secondary={HERO.secondaryCta}
              className="w-full sm:w-auto"
            />
          </div>

          <div className="reveal-load rounded-[28px] border border-line bg-glass p-3 backdrop-blur-md [--d:250ms] sm:p-4">
            <div className="flex items-center justify-between gap-3 px-2 pt-1.5 pb-4">
              <Eyebrow variant="dot">{withCount(HERO.panelLabel, countWord(SERVICES.length).toLowerCase())}</Eyebrow>
              {HERO.panelBadge.trim() && (
                <p className="flex h-[26px] shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface-raised px-2.5 text-[11px] font-medium whitespace-nowrap text-fg">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#8fd9b6]" />
                  {HERO.panelBadge}
                </p>
              )}
            </div>
            <div className="relative">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {SERVICES.map((service, index) => (
                  <WingCard
                    key={service.id}
                    service={service}
                    // An odd last card spans both columns instead of leaving a hole.
                    className={index === SERVICES.length - 1 && index % 2 === 0 ? "sm:col-span-2" : undefined}
                  />
                ))}
              </ul>
              {/* The hub mark sits where the four cards meet, so only a 2 × 2 grid has it. */}
              {SERVICES.length === 4 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 hidden size-[52px] -translate-1/2 place-items-center rounded-full border border-line bg-bg text-brand shadow-[0_0_0_6px_var(--glass),0_0_30px_var(--glow)] sm:grid"
                >
                  <Sparkle className="size-5 fill-current" strokeWidth={1} />
                </span>
              )}
            </div>
          </div>
        </div>

        <dl data-reveal-stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:mt-16 sm:gap-x-8 lg:mt-[72px] lg:grid-cols-4">
          {HERO_FACTS.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1">
              <dt className="text-[11px] font-medium tracking-[0.12em] text-fg-subtle uppercase">{fact.label}</dt>
              <dd className="font-display text-lg leading-[1.3] text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
