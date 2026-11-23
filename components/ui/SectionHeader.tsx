import Eyebrow from "@/components/ui/Eyebrow";
import TitleLines from "@/components/ui/TitleLines";
import { INTRO } from "@/components/ui/styles";
import { cx } from "@/lib/cx";

type SectionHeaderProps = {
  id: string;
  eyebrow?: string;
  /** Each entry renders on its own line at desktop widths. */
  title: string[];
  /** Gradient line after the title. */
  highlight?: string;
  intro?: string;
  /** Replaces the intro column's default 380 px width cap. */
  introClassName?: string;
  /** Extra content under the intro (e.g. carousel controls). */
  aside?: React.ReactNode;
  /** Urbanist Light titles, as used on the service pages. */
  light?: boolean;
  className?: string;
};

/** Section heading row: eyebrow + large title on the left, intro copy on the right. */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  highlight,
  intro,
  introClassName,
  aside,
  light,
  className,
}: SectionHeaderProps) {
  return (
    <header data-reveal-stagger className={cx("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <div className="flex flex-col gap-6">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2
          id={id}
          className={cx(
            "font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.03] tracking-[-0.027em] text-balance text-fg",
            light ? "font-light" : "font-normal",
          )}
        >
          <TitleLines lines={title} />
          {highlight && <span className="text-gradient block">{highlight}</span>}
        </h2>
      </div>
      {(intro || aside) && (
        <div className={cx("flex flex-col gap-5", introClassName ?? (intro && "max-w-[380px]"))}>
          {intro && <p className={INTRO}>{intro}</p>}
          {aside}
        </div>
      )}
    </header>
  );
}
