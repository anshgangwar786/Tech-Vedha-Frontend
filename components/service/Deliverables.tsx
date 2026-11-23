import Link from "next/link";
import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { DELIVERABLE_VISUALS } from "@/components/service/visuals";
import { CARD, CARD_HOVER, SECTION } from "@/components/ui/styles";
import type { ResolvedServicePage } from "@/data/service-pages";
import { cx } from "@/lib/cx";

type DeliverablesProps = { page: ResolvedServicePage };

/** "What you get": two illustrated deliverable cards and the ownership hand-over strip. */
export default function Deliverables({ page }: DeliverablesProps) {
  const { deliverables } = page;

  return (
    <section aria-labelledby="deliverables-title" className={cx("defer-render bg-bg-deep", SECTION)}>
      <div className="container-site">
        <SectionHeader
          id="deliverables-title"
          eyebrow="What you get"
          title={deliverables.title}
          intro={deliverables.intro}
          light
        />

        <div data-reveal-stagger className="mt-14 grid gap-5 lg:grid-cols-2">
          {deliverables.cards.map((card) => (
            <article key={card.title} className={cx("flex min-w-0 flex-col gap-[22px] rounded-3xl p-4 pb-7", CARD, CARD_HOVER)}>
              <div
                aria-hidden
                className="relative isolate grid h-[300px] place-items-center overflow-hidden rounded-2xl border border-line bg-bg px-4 sm:h-[360px]"
              >
                <div className="absolute inset-0 -z-10 bg-grid bg-size-[28px_28px]" />
                <div className="absolute inset-x-0 -bottom-1/2 -z-10 h-full bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_26%,#1446e0_57%,transparent)] opacity-40 dark:opacity-100" />
                {DELIVERABLE_VISUALS[card.visual]}
              </div>
              <div className="flex flex-col gap-4 px-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex max-w-[400px] flex-col gap-2">
                  <h3 className="font-display text-[26px] text-fg">{card.title}</h3>
                  <p className="text-base leading-[1.55] text-fg-muted">{card.detail}</p>
                </div>
                <Link
                  href={card.href}
                  className="inline-flex h-9 w-fit shrink-0 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-transform duration-250 ease-out hover:-translate-y-0.5"
                >
                  Explore →<span className="sr-only"> {card.title}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={cx("reveal mt-5 grid gap-5 px-7 py-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-8", CARD)}>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-[22px] text-fg">{deliverables.ownership.title}</h3>
            <p className="text-[15px] text-fg-muted">{deliverables.ownership.detail}</p>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {deliverables.ownership.items.map((item) => (
              <li
                key={item}
                className="flex min-h-12 items-center gap-2.5 rounded-[14px] bg-surface-raised px-3.5 py-2 text-sm font-medium text-fg"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <Check aria-hidden className="size-2.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
