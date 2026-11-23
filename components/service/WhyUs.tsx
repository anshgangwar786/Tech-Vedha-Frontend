import HeadingStack from "@/components/ui/HeadingStack";
import { BRAND_GRADIENT, CARD, DISPLAY_TITLE, NUMBER, SECTION } from "@/components/ui/styles";
import type { ResolvedServicePage } from "@/data/service-pages";
import { cx } from "@/lib/cx";
import { stepNumber } from "@/lib/utils";

type WhyUsProps = { page: ResolvedServicePage };

/** Where each point sits around the hub on desktop, and how its connector is mirrored. */
const QUADRANTS = [
  { card: "lg:top-0 lg:left-0", line: "top-[18%] left-[29%]", flip: "" },
  { card: "lg:top-0 lg:right-0 lg:items-end lg:text-right", line: "top-[18%] right-[29%]", flip: "-scale-x-100" },
  { card: "lg:top-[64%] lg:left-0", line: "bottom-[18%] left-[29%]", flip: "-scale-y-100" },
  { card: "lg:top-[64%] lg:right-0 lg:items-end lg:text-right", line: "right-[29%] bottom-[18%]", flip: "-scale-100" },
];

/** Curved line from a card to the hub (path from the Figma "Why us" connectors), with a glowing tip. */
function Connector({ position, flip }: { position: string; flip: string }) {
  return (
    <div aria-hidden className={cx("absolute h-[32%] w-[21%] text-fg-subtle/60", position, flip)}>
      <svg viewBox="0 0 235.2 161" preserveAspectRatio="none" className="size-full overflow-visible" fill="none">
        <path
          d="M235.2 160.5C145.6 160.5 123.2 0.5 0 0.5"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="absolute -top-1 -left-1 size-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
    </div>
  );
}

/** Four reasons arranged around the service icon, joined by connectors on desktop. */
export default function WhyUs({ page }: WhyUsProps) {
  const { whyUs } = page;
  const Icon = whyUs.icon;

  return (
    <section aria-labelledby="why-title" className={cx("defer-render bg-bg", SECTION)}>
      <div className="container-site">
        <div className="flex flex-col items-center gap-[22px] text-center">
          <HeadingStack
            id="why-title"
            eyebrow="Why Tech Vedha"
            eyebrowVariant="badge"
            title={whyUs.title}
            titleClassName={cx(DISPLAY_TITLE, "text-balance")}
          />
        </div>

        <div className="relative mx-auto mt-16 max-w-[1120px] lg:h-[500px]">
          <div aria-hidden className="hidden lg:block">
            {QUADRANTS.map((quadrant) => (
              <Connector key={quadrant.line} position={quadrant.line} flip={quadrant.flip} />
            ))}
            <div className="absolute top-1/2 left-1/2 h-[260px] w-[420px] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,#1e9bf0,#1446e0_50%,transparent)] opacity-45 blur-[40px]" />
            <div className="absolute top-1/2 left-1/2 grid size-44 -translate-1/2 place-items-center rounded-full border border-line bg-glass backdrop-blur-md">
              <span className={cx("grid size-28 place-items-center rounded-full text-white drop-shadow-[0_0_25px_rgb(30_155_240/0.5)]", BRAND_GRADIENT)}>
                <Icon className="size-10" strokeWidth={1.5} />
              </span>
            </div>
          </div>

          <ol data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:block">
            {whyUs.points.map((point, index) => (
              <li
                key={point.title}
                className={cx(
                  "flex flex-col gap-2.5 p-6 lg:absolute lg:min-h-[180px] lg:w-[29%]",
                  CARD,
                  QUADRANTS[index].card,
                )}
              >
                <span className={cx(NUMBER, "text-[32px]")}>{stepNumber(index)}</span>
                <h3 className="font-display text-[22px] text-fg">{point.title}</h3>
                <p className="text-[15px] leading-[1.55] text-fg-muted lg:max-w-[275px]">
                  {point.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
