import { Sparkle } from "lucide-react";

const RING_TEXT = "TECH VEDHA • BUILD FOR TOMORROW • ";

/** Slowly rotating circular wordmark. Letters are placed with CSS rotation, so no SVG path is needed. */
export default function BadgeRing() {
  const letters = Array.from(RING_TEXT);
  const step = 360 / letters.length;

  return (
    <div aria-hidden className="relative hidden size-24 shrink-0 sm:block">
      <div className="absolute inset-0 animate-spin-slow">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="absolute top-0 left-1/2 h-1/2 origin-bottom -translate-x-1/2 text-[9px] font-medium text-fg dark:text-white"
            style={{ transform: `translateX(-50%) rotate(${index * step}deg)` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <Sparkle className="absolute inset-0 m-auto size-5 fill-current text-fg dark:text-white" />
    </div>
  );
}
