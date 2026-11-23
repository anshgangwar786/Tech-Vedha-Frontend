import SectionGlow from "@/components/about/SectionGlow";
import SectionHeader from "@/components/ui/SectionHeader";
import { HIGHLIGHT, SECTION } from "@/components/ui/styles";
import { MISSION, VISION } from "@/data/about";
import { cx } from "@/lib/cx";

const card = "relative isolate flex min-h-[400px] flex-col justify-between gap-10 overflow-hidden rounded-3xl p-8 sm:p-12";
const statement =
  "font-display text-[clamp(2.25rem,3.6vw,3.24rem)] leading-[1.1] font-light tracking-[-0.02em]";
const label = "flex items-center gap-2.5 text-xs font-medium tracking-[0.16em] uppercase";
const labelNumber = "font-display text-[28px] leading-none font-light tracking-[0.07em]";

/** Mission (plain card) beside vision (brand card with concentric rings). */
export default function MissionVision() {
  return (
    <section aria-labelledby="mission-title" className={cx("defer-render relative isolate bg-bg-deep", SECTION)}>
      <SectionGlow />
      <div className="container-site">
        <SectionHeader
          id="mission-title"
          eyebrow="Mission and vision"
          title={["What we’re here", "to do."]}
          intro="One purpose and one direction behind every project, in every wing."
          light
        />

        <div data-reveal-stagger className="mt-14 grid gap-5 lg:grid-cols-2">
          <article
            className={cx(
              card,
              "border border-line bg-[linear-gradient(rgb(120_180_255/0.07),transparent_45%)] bg-surface shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_30px_60px_-30px_rgb(0_0_0/0.25)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_30px_60px_-30px_rgb(0_0_0/0.7)]",
            )}
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-70" />
            <h3 className={cx(label, "text-brand")}>
              <span className={labelNumber}>01</span>
              Mission
            </h3>
            <div className="flex flex-col gap-[18px]">
              <p className={cx(statement, "text-fg")}>{MISSION.statement}</p>
              <p className="max-w-[440px] text-base leading-[1.6] text-fg-muted">{MISSION.detail}</p>
            </div>
          </article>

          <article className={cx(card, HIGHLIGHT)}>
            <svg
              aria-hidden
              viewBox="0 0 340 340"
              fill="none"
              stroke="white"
              strokeWidth={1.02}
              className="absolute -top-[70px] -right-[70px] -z-10 size-[340px] opacity-28"
            >
              <circle cx="170" cy="170" r="163.2" />
              <circle cx="170" cy="170" r="119" />
              <circle cx="170" cy="170" r="74.8" />
            </svg>
            <h3 className={cx(label, "text-white/90")}>
              <span className={labelNumber}>02</span>
              Vision
            </h3>
            <div className="flex flex-col gap-[18px]">
              <p className={statement}>{VISION.statement}</p>
              <ul aria-label="Where we work" className="flex gap-2">
                {VISION.regions.map((region) => (
                  <li
                    key={region}
                    className="flex h-[30px] items-center rounded-full border border-white/55 px-3 text-[12.5px] font-medium"
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
