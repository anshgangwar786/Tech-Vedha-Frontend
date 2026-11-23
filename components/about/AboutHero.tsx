import Link from "next/link";
import { Sparkle } from "lucide-react";
import { WingIcon } from "@/components/about/icons";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaButtons from "@/components/ui/CtaButtons";
import Eyebrow from "@/components/ui/Eyebrow";
import { CARD_HOVER, HIGHLIGHT } from "@/components/ui/styles";
import { HERO_FACTS, WING_TAGS } from "@/data/about";
import { SERVICES, serviceHref, type ServiceId } from "@/data/services";
import type { Crumb } from "@/lib/seo";
import { cx } from "@/lib/cx";

/** The wing shown as featured in the "What we do" panel. */
const FEATURED: ServiceId = "apps";

function WingCard({ id }: { id: ServiceId }) {
  const service = SERVICES.find((item) => item.id === id)!;
  const featured = id === FEATURED;

  return (
    <li
      className={cx(
        "relative flex min-h-[207px] flex-col gap-2.5 rounded-[18px] border p-5",
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
          "mt-auto text-[10.5px] font-medium tracking-[0.12em] uppercase",
          featured ? "text-white/85" : "text-fg-subtle",
        )}
      >
        {service.wing}
      </p>
      <p className={cx("font-display text-xl leading-[1.2]", featured ? "text-white" : "text-fg")}>
        {/* The whole card is the hit area. */}
        <Link href={serviceHref(id)} className="after:absolute after:inset-0 after:rounded-[18px]">
          {service.title}
        </Link>
      </p>
      <ul aria-label={`${service.title} includes`} className="flex flex-wrap gap-1.5">
        {WING_TAGS[id].map((tag) => (
          <li
            key={tag}
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
export default function AboutHero({ trail }: { trail: Crumb[] }) {
  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_100%_at_30%_0%,var(--hero-from),var(--hero-to)_85%)] pt-28 pb-16 lg:pt-[175px] lg:pb-[72px]"
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-[31%] -z-10 h-[80%] w-[90%] rounded-[50%] bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_26%,#1446e0_56%,transparent)] opacity-35 blur-[60px] dark:opacity-93"
      />

      <div className="container-site">
        <div className="grid items-center gap-14 lg:grid-cols-[634fr_574fr] lg:gap-[72px]">
          <div className="reveal-load-stagger flex flex-col items-start gap-[26px]">
            <Breadcrumb items={trail} />
            <Eyebrow>About Tech Vedha</Eyebrow>
            <h1
              id="about-title"
              className="font-display text-[clamp(3.25rem,5.8vw,5.22rem)] leading-[1.1] font-light tracking-[-0.035em] text-fg dark:text-white"
            >
              One partner. <span className="text-gradient block pb-[0.08em]">Built for tomorrow.</span>
            </h1>
            <p className="max-w-[481px] text-lg leading-[1.6] text-fg-muted">
              Tech Vedha is an IT company that plans your space, builds its software and apps, secures its data and
              markets it — with one team, for businesses in India and abroad.
            </p>
            <CtaButtons secondary={{ href: "#how-it-connects", label: "How it connects" }} />
          </div>

          <div className="reveal-load rounded-[28px] border border-line bg-glass p-4 backdrop-blur-md [--d:250ms]">
            <div className="flex items-center justify-between px-2 pt-1.5 pb-4">
              <Eyebrow variant="dot">What we do · four wings</Eyebrow>
              <p className="flex h-[26px] items-center gap-1.5 rounded-full border border-line bg-surface-raised px-2.5 text-[11px] font-medium text-fg">
                <span aria-hidden className="size-1.5 rounded-full bg-[#8fd9b6]" />
                One team
              </p>
            </div>
            <div className="relative">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {SERVICES.map((service) => (
                  <WingCard key={service.id} id={service.id} />
                ))}
              </ul>
              <span
                aria-hidden
                className="absolute top-1/2 left-1/2 hidden size-[52px] -translate-1/2 place-items-center rounded-full border border-line bg-bg text-brand shadow-[0_0_0_6px_var(--glass),0_0_30px_var(--glow)] sm:grid"
              >
                <Sparkle className="size-5 fill-current" strokeWidth={1} />
              </span>
            </div>
          </div>
        </div>

        <dl data-reveal-stagger className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 lg:mt-[72px] lg:grid-cols-4">
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
