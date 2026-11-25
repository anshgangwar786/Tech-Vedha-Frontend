import Eyebrow from "@/components/ui/Eyebrow";
import { cx } from "@/lib/cx";

/** Urbanist Light title, 64 px at desktop. */
const TITLE =
  "font-display text-[clamp(2.5rem,4.6vw,4rem)] leading-[1.04] font-light tracking-[-0.03em] text-balance text-fg";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  /** Gradient part of the title. */
  highlight: string;
  /** Put the highlight on its own line at desktop widths. */
  breakBeforeHighlight?: boolean;
  intro: string;
  introClassName?: string;
};

/** Eyebrow + Urbanist Light title with a gradient tail on the left, intro copy on the right. */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  highlight,
  breakBeforeHighlight,
  intro,
  introClassName,
}: SectionHeadingProps) {
  return (
    <header data-reveal-stagger className="flex flex-col gap-5 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-5 sm:gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className={TITLE}>
          {title}{" "}
          <span className={cx("text-gradient pb-[0.08em]", breakBeforeHighlight && "lg:block")}>{highlight}</span>
        </h2>
      </div>
      <p className={cx("text-[17px] leading-[1.6] text-fg-muted sm:text-lg", introClassName)}>{intro}</p>
    </header>
  );
}
