import SectionHeader from "@/components/ui/SectionHeader";
import { CARD, CARD_HOVER, ICON_TILE, SECTION } from "@/components/ui/styles";
import type { ResolvedServicePage } from "@/data/service-pages";
import { cx } from "@/lib/cx";

type UseCasesProps = { page: ResolvedServicePage };

/** "Who it's for": the kinds of business the service is built for. */
export default function UseCases({ page }: UseCasesProps) {
  const { useCases } = page;

  return (
    <section aria-labelledby="use-cases-title" className={cx("defer-render bg-bg", SECTION)}>
      <div className="container-site">
        <SectionHeader id="use-cases-title" eyebrow="Who it's for" title={useCases.title} intro={useCases.intro} light />

        <ul data-reveal-stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map(({ title, detail, icon: Icon }) => (
            <li key={title} className={cx("flex gap-[18px] p-6", CARD, CARD_HOVER)}>
              <span className={ICON_TILE}>
                <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[21px] leading-[1.2] text-fg">{title}</h3>
                <p className="text-[15px] leading-[1.55] text-fg-muted">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
