import { Fragment } from "react";
import { Sparkle } from "lucide-react";
import { cx } from "@/lib/cx";

type MarqueeProps = {
  items: string[];
  /** "outline" = stroked words that fill on hover; "gradient" = cyan-to-blue filled words. */
  tone: "outline" | "gradient";
  /** Seconds per loop. */
  duration?: number;
  /** Scroll left to right instead of the default right to left. */
  reverse?: boolean;
};

/** Infinite horizontal word loop. Items render twice so the -50% CSS translate loops seamlessly. */
export default function Marquee({ items, tone, duration = 60, reverse = false }: MarqueeProps) {
  const word = cx(
    "font-display text-[clamp(3.5rem,10vw,9rem)] leading-none font-light tracking-[-0.027em] whitespace-nowrap",
    tone === "outline" ? "text-outline transition-colors duration-300 hover:text-fg" : "text-gradient pb-[0.08em]",
  );
  const separator = cx("mx-4 size-[0.35em] shrink-0 sm:mx-[22px]", tone === "outline" ? "fill-accent text-accent" : "fill-fg/60 text-transparent");

  return (
    <div className="overflow-hidden py-3 lg:py-5">
      <div
        className="flex w-max animate-marquee items-center"
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : undefined } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center text-[clamp(3.5rem,10vw,9rem)]">
            {items.map((item) => (
              <Fragment key={item}>
                <span className={word}>{item}</span>
                <Sparkle aria-hidden className={separator} />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
