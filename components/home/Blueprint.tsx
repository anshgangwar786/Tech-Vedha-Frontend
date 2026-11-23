import HeadingStack from "@/components/ui/HeadingStack";
import { SERVICES } from "@/data/services";
import { cx } from "@/lib/cx";

/** Isometric slab transform taken from the Figma "Blueprint / Scene" component. */
const ISOMETRIC = "rotate(-27.92deg) scaleY(0.83) skewX(34.16deg)";

/** Slabs stack bottom-up: the foundation (04) sits lowest, marketing (01) on top. */
const SLAB_GAP_PERCENT = 11.6;

export default function Blueprint() {
  return (
    <section
      aria-labelledby="blueprint-title"
      className="defer-render relative isolate overflow-hidden bg-bg-deep bg-grid py-24 lg:h-[900px] lg:py-0"
    >
      <div aria-hidden className="absolute inset-x-[-21.5%] top-[55.5%] -z-10 h-[90px] -translate-y-1/2">
        {/* Blurred elliptical light band, drawn with CSS instead of an image. */}
        <div className="absolute inset-x-[1.1%] inset-y-[25.8%] bg-[radial-gradient(closest-side,#fff,#7cc4fa_30%,#b9d5ff_60%,rgb(185_213_255/0))] opacity-[0.481] blur-[12px] dark:bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_30%,#1446e0_60%,rgb(20_70_224/0))] dark:opacity-[0.74]" />
      </div>

      <div className="container-site grid h-full items-center gap-12 lg:grid-cols-[420px_1fr] lg:gap-24">
        <div className="flex flex-col gap-[22px]">
          <HeadingStack
            id="blueprint-title"
            eyebrow="The digital blueprint"
            title={
              <>
                Drawn as a blueprint. <span className="block">Built as one.</span>
              </>
            }
            intro="Four wings, assembled from the foundation up, so every part fits the next."
            introClassName="max-w-[410px]"
          />
          <p className="text-xs font-medium tracking-[0.12em] text-brand">ONE STRUCTURE · ONE TEAM</p>
        </div>

        <div data-reveal="zoom" className="reveal relative mx-auto aspect-[640/620] w-full max-w-[640px] [container-type:inline-size]">
          {[...SERVICES].reverse().map((service, index) => {
            const top = `${17.5 + (3 - index) * SLAB_GAP_PERCENT}%`;
            const isTop = index === SERVICES.length - 1;
            return (
              <div key={service.id}>
                <div
                  aria-hidden
                  className="absolute left-[8.4%] flex h-[30.2%] w-[55.2%] items-center justify-center"
                  style={{ top }}
                >
                  <div
                    className={cx(
                      "size-[31.26cqw] overflow-hidden rounded-[2.25cqw] border-[1.5px] border-accent/70 backdrop-blur-[6px] shadow-[0_0_50px_4px_var(--glow)]",
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
                  className="absolute left-[67.25%] hidden translate-y-[11.75cqw] items-center gap-3 md:flex"
                  style={{ top }}
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
          {SERVICES.map((service) => (
            <li key={service.id} className="border-l border-accent pl-3">
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
