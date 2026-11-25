import Link from "next/link";
import { Sparkle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { CARD, CARD_HOVER, ICON_TILE, SECTION } from "@/components/ui/styles";
import type { ResolvedServicePage } from "@/data/service-pages";
import { cx } from "@/lib/cx";

type CoverageProps = { page: ResolvedServicePage };

/** "What we cover": one card per sub-service, plus a "Not sure where to start?" card. */
export default function Coverage({ page }: CoverageProps) {
  const { coverage, labels } = page;

  return (
    <section id="what-we-cover" aria-labelledby="coverage-title" className={cx("defer-render bg-bg-deep", SECTION)}>
      <div className="container-site">
        <SectionHeader id="coverage-title" eyebrow={labels.coverage} title={coverage.title} intro={coverage.intro} light />

        <ul data-reveal-stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {coverage.items.map(({ title, detail, icon: Icon }, index) => (
            <li key={index} className={cx("group relative flex flex-col gap-3 p-6 sm:min-h-[248px] sm:gap-3.5 sm:p-7", CARD, CARD_HOVER)}>
              <span className={ICON_TILE}>
                <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
              </span>
              <h3 className="mt-2 font-display text-2xl tracking-[-0.01em] text-fg sm:mt-auto">{title}</h3>
              <p className="max-w-[330px] text-[15.5px] leading-[1.55] text-fg-muted">{detail}</p>
              {/* The whole card is the hit area; the visible label stays short. */}
              <Link
                href="#contact"
                className="text-sm font-medium text-brand after:absolute after:inset-0 after:rounded-[20px]"
              >
                {labels.coverageItemCta} <span aria-hidden>→</span>
                <span className="sr-only"> about {title}</span>
              </Link>
            </li>
          ))}

          <li className="relative flex flex-col gap-3 overflow-hidden rounded-[20px] bg-linear-110 from-[#1e9bf0] to-[#1446e0] p-6 text-white transition duration-250 ease-out hover:shadow-[0_14px_36px_rgb(20_70_224/0.35)] sm:min-h-[248px] sm:gap-3.5 sm:p-7">
            <Sparkle aria-hidden className="size-10 fill-current text-white/90" strokeWidth={1} />
            <h3 className="mt-2 font-display text-[26px] tracking-[-0.01em] sm:mt-auto">{labels.coverageHelpTitle}</h3>
            <p className="max-w-[310px] text-[15.5px] leading-[1.55] text-white/90">{coverage.helpText}</p>
            <Link
              href="/contact"
              className="mt-1 inline-flex h-10 w-fit items-center rounded-full bg-white px-4 text-sm font-medium text-[#0b1a3a] transition-transform duration-250 ease-out hover:-translate-y-0.5 sm:h-9"
            >
              {labels.coverageHelpCta} →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
