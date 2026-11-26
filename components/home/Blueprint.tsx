import type { CSSProperties } from "react";
import HeadingStack from "@/components/ui/HeadingStack";
import { withCount } from "@/data/home";
import { countWord } from "@/data/services";
import { cx } from "@/lib/cx";
import { getHome } from "@/server/content";

/** Isometric slab transform taken from the Figma "Blueprint / Scene" component. */
const ISOMETRIC = "rotate(-27.92deg) scaleY(0.83) skewX(34.16deg)";

/** Slabs stack bottom-up: the last service sits lowest, the first (01) on top. */
const SLAB_GAP_PERCENT = 11.6;
/** Furthest the top slab may sit above the bottom one (more services pack closer instead of leaving the frame). */
const MAX_STACK_SPAN_PERCENT = 46;

export default async function Blueprint() {
  const { blueprint } = await getHome();
  /** The page's own slabs (Homepage → Digital blueprint), top to bottom. */
  // A slab without a title is a half-filled draft: left out.
  const SERVICES = blueprint.slabs.filter((slab) => slab.title.trim());
  const count = countWord(SERVICES.length);
  const gap = Math.min(SLAB_GAP_PERCENT, MAX_STACK_SPAN_PERCENT / Math.max(1, SERVICES.length - 1));
  const span = gap * (SERVICES.length - 1);
  return (
    <section
      aria-labelledby="blueprint-title"
      className="defer-render relative isolate overflow-hidden bg-bg-deep bg-grid py-16 sm:py-24 lg:h-[900px] lg:py-0"
    >
      <div aria-hidden className="absolute inset-x-[-21.5%] top-[55.5%] -z-10 h-[90px] -translate-y-1/2">
        {/* Blurred elliptical light band, drawn with CSS instead of an image. */}
        <div className="absolute inset-x-[1.1%] inset-y-[25.8%] bg-[radial-gradient(closest-side,#fff,#7cc4fa_30%,#b9d5ff_60%,rgb(185_213_255/0))] opacity-[0.481] blur-[12px] dark:bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_30%,#1446e0_60%,rgb(20_70_224/0))] dark:opacity-[0.74]" />
      </div>

      <div className="container-site grid h-full items-center gap-10 sm:gap-12 lg:grid-cols-[420px_1fr] lg:gap-24">
        <div className="flex flex-col gap-[22px]">
          <HeadingStack
            id="blueprint-title"
            eyebrow={blueprint.eyebrow}
            title={blueprint.title.map((line) => withCount(line, count))}
            intro={withCount(blueprint.intro, count)}
            introClassName="max-w-[410px]"
          />
          <p className="text-xs font-medium tracking-[0.12em] text-brand">{blueprint.tagline}</p>
        </div>

        <div
          data-reveal="stack"
          data-reveal-threshold="0.35"
          className="reveal relative mx-auto aspect-[640/620] w-full max-w-[360px] [container-type:inline-size] sm:max-w-[480px] md:max-w-[640px]">
          {[...SERVICES].reverse().map((service, index) => {
            // The four built-in slabs keep their original spots (top at 17.5 %); more services start higher and pack closer.
            const top = `${Math.max(6, 52.3 - span) + (SERVICES.length - 1 - index) * gap}%`;
            const isTop = index === SERVICES.length - 1;
            /* `--s` orders the stack-up entrance: foundation lands first, marketing last. */
            const style = { top, "--s": index } as CSSProperties;
            return (
              <div key={`${index}-${service.title}`}>
                <div
                  aria-hidden
                  className="stack-slab absolute left-[22.4%] flex h-[30.2%] w-[55.2%] items-center justify-center md:left-[8.4%]"
                  style={style}
                >
                  <div
                    className={cx(
                      "stack-plate size-[31.26cqw] overflow-hidden rounded-[2.25cqw] border-[1.5px] border-accent/70 backdrop-blur-[6px] shadow-[0_0_50px_4px_var(--glow)]",
                      isTop
                        ? "bg-[linear-gradient(135deg,rgb(30_155_240/0.9),rgb(20_70_224/0.9))]"
                        : "bg-[linear-gradient(135deg,rgb(30_155_240/0.35),rgb(20_70_224/0.22))]",
                    )}
                    style={{ transform: ISOMETRIC }}
                  >
                    <div className="size-full bg-[linear-gradient(rgb(255_255_255/0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.14)_1px,transparent_1px)] bg-size-[12.5%_12.5%]" />
                  </div>
                </div>
                <div
                  className="stack-label absolute left-[67.25%] hidden translate-y-[11.75cqw] items-center gap-3 md:flex"
                  style={style}
                >
                  <span aria-hidden className="relative h-px w-11 bg-accent/70">
                    <span className="absolute top-1/2 left-0 size-[5px] -translate-y-1/2 rounded-full bg-accent" />
                  </span>
                  <span className="flex flex-col gap-0.5 whitespace-nowrap">
                    <span className="text-[11px] font-medium tracking-[0.12em] text-fg-subtle uppercase">
                      {service.number} · {service.wing}
                    </span>
                    <span className="font-display text-lg text-fg">{service.title}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <ol data-reveal-stagger className="grid gap-4 sm:grid-cols-2 md:hidden">
          {SERVICES.map((service, index) => (
            <li key={`${index}-${service.title}`} className="border-l border-accent pl-3">
              <span className="block text-[11px] font-medium tracking-[0.12em] text-fg-subtle uppercase">
                {service.number} · {service.wing}
              </span>
              <span className="font-display text-lg text-fg">{service.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
