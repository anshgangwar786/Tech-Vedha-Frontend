import { AudienceGlyph } from "@/components/about/icons";
import SectionGlow from "@/components/about/SectionGlow";
import SectionHeader from "@/components/ui/SectionHeader";
import { CARD, CARD_HOVER, HIGHLIGHT, ICON_TILE, SECTION } from "@/components/ui/styles";
import { cx } from "@/lib/cx";
import type { AboutContent } from "@/data/about";

/** Small pill tag (24 px) used on the cards. */
const TAG = "inline-flex h-6 items-center rounded-full px-[9px] text-[11px] font-medium whitespace-nowrap";
const TAG_DEFAULT = "bg-surface-raised text-fg-muted";
const TAG_ON_HIGHLIGHT = "bg-white/16 text-white";

/** Audience cards; those marked "featured" in the admin are highlighted. */
export default function WhoWeWorkWith({ content: copy }: { content: AboutContent["whoWeWorkWith"] }) {
  return (
    <section aria-labelledby="audience-title" className={cx("defer-render relative isolate bg-bg", SECTION)}>
      <SectionGlow />
      <div className="container-site">
        <SectionHeader
          id="audience-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
          light
        />

        <ul data-reveal-stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {copy.cards.filter((card) => card.title.trim()).map((audience, index) => {
            const { featured } = audience;
            return (
              <li
                key={index}
                className={cx(
                  "flex flex-col gap-3.5 p-6 sm:min-h-[300px] sm:p-[26px]",
                  featured ? cx(HIGHLIGHT, "rounded-[20px] border border-transparent") : cx(CARD, CARD_HOVER),
                )}
              >
                <span className={featured ? cx(ICON_TILE, "border-white/35 bg-white/16 text-white") : ICON_TILE}>
                  <AudienceGlyph icon={audience.icon} className="size-[22px]" />
                </span>
                <h3 className={cx("mt-2 font-display text-[23px] leading-[1.2] sm:mt-auto", featured ? "text-white" : "text-fg")}>
                  {audience.title}
                </h3>
                <p className={cx("text-[15px] leading-[1.55]", featured ? "text-white/88" : "text-fg-muted")}>
                  {audience.detail}
                </p>
                <ul
                  aria-label={copy.a11y.tagsLabel}
                  className={cx("flex flex-wrap gap-1.5 border-t pt-3", featured ? "border-white/30" : "border-line")}
                >
                  {audience.tags.filter((tag) => tag.trim()).map((tag, tagIndex) => (
                    <li key={tagIndex} className={cx(TAG, featured ? TAG_ON_HIGHLIGHT : TAG_DEFAULT)}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
