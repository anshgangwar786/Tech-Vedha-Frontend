import { AudienceGlyph } from "@/components/about/icons";
import SectionGlow from "@/components/about/SectionGlow";
import SectionHeader from "@/components/ui/SectionHeader";
import { CARD, CARD_HOVER, HIGHLIGHT, ICON_TILE, SECTION } from "@/components/ui/styles";
import { AUDIENCES } from "@/data/about";
import { cx } from "@/lib/cx";

/** Small pill tag (24 px) used on the cards. */
const TAG = "inline-flex h-6 items-center rounded-full px-[9px] text-[11px] font-medium whitespace-nowrap";
const TAG_DEFAULT = "bg-surface-raised text-fg-muted";
const TAG_ON_HIGHLIGHT = "bg-white/16 text-white";

/** Four audience cards; the first (retail, which uses every wing) is highlighted. */
export default function WhoWeWorkWith() {
  return (
    <section aria-labelledby="audience-title" className={cx("defer-render relative isolate bg-bg", SECTION)}>
      <SectionGlow />
      <div className="container-site">
        <SectionHeader
          id="audience-title"
          eyebrow="Who we work with"
          title={["Built for businesses", "with a space to run."]}
          intro="From a single home to an industrial site — and the shops, showrooms and teams in between."
          light
        />

        <ul data-reveal-stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((audience, index) => {
            const featured = index === 0;
            return (
              <li
                key={audience.title}
                className={cx(
                  "flex min-h-[300px] flex-col gap-3.5 p-[26px]",
                  featured ? cx(HIGHLIGHT, "rounded-[20px] border border-transparent") : cx(CARD, CARD_HOVER),
                )}
              >
                <span className={featured ? cx(ICON_TILE, "border-white/35 bg-white/16 text-white") : ICON_TILE}>
                  <AudienceGlyph icon={audience.icon} className="size-[22px]" />
                </span>
                <h3 className={cx("mt-auto font-display text-[23px] leading-[1.2]", featured ? "text-white" : "text-fg")}>
                  {audience.title}
                </h3>
                <p className={cx("text-[15px] leading-[1.55]", featured ? "text-white/88" : "text-fg-muted")}>
                  {audience.detail}
                </p>
                <ul
                  aria-label="Wings involved"
                  className={cx("flex flex-wrap gap-1.5 border-t pt-3", featured ? "border-white/30" : "border-line")}
                >
                  {audience.tags.map((tag) => (
                    <li key={tag} className={cx(TAG, featured ? TAG_ON_HIGHLIGHT : TAG_DEFAULT)}>
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
