import Eyebrow from "@/components/ui/Eyebrow";
import TitleLines from "@/components/ui/TitleLines";
import { DISPLAY_TITLE, INTRO } from "@/components/ui/styles";
import { cx } from "@/lib/cx";
import { revealDelay as delay } from "@/lib/utils";

type HeadingStackProps = {
  id: string;
  eyebrow: string;
  eyebrowVariant?: React.ComponentProps<typeof Eyebrow>["variant"];
  /** A string array puts each entry on its own line at desktop widths. */
  title: React.ReactNode | string[];
  intro?: React.ReactNode;
  /** Width cap for the intro, e.g. "max-w-[404px]". */
  introClassName?: string;
  /** Replaces the default display title classes. */
  titleClassName?: string;
};

/**
 * Eyebrow, section title and intro stacked vertically, revealed in turn on scroll. Renders a fragment so the caller's
 * wrapper controls the gap and alignment.
 */
export default function HeadingStack({
  id,
  eyebrow,
  eyebrowVariant,
  title,
  intro,
  introClassName,
  titleClassName = DISPLAY_TITLE,
}: HeadingStackProps) {
  return (
    <>
      <Eyebrow variant={eyebrowVariant} className="reveal">
        {eyebrow}
      </Eyebrow>
      <h2 id={id} data-reveal="clip" style={delay(100)} className={cx("reveal", titleClassName)}>
        {Array.isArray(title) ? <TitleLines lines={title} /> : title}
      </h2>
      {intro && (
        <p style={delay(200)} className={cx("reveal", INTRO, introClassName)}>
          {intro}
        </p>
      )}
    </>
  );
}
