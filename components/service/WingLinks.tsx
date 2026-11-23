import Link from "next/link";
import HeadingStack from "@/components/ui/HeadingStack";
import { CARD_HOVER, SECTION } from "@/components/ui/styles";
import type { ResolvedServicePage } from "@/data/service-pages";
import { SERVICES, serviceHref } from "@/data/services";
import { cx } from "@/lib/cx";

type WingLinksProps = { page: ResolvedServicePage };

/** Each wing steps in a little further, like the stacked slabs of the homepage blueprint. */
const INDENT = ["", "sm:ml-4", "sm:ml-8", "sm:ml-12"];

/** "Part of one blueprint": the four services, with this one highlighted and the others cross-linked. */
export default function WingLinks({ page }: WingLinksProps) {
  return (
    <section aria-labelledby="blueprint-title" className={cx("defer-render bg-bg", SECTION)}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-[513fr_695fr] lg:gap-[72px]">
        <div className="flex flex-col gap-[22px]">
          <HeadingStack
            id="blueprint-title"
            eyebrow="Part of one blueprint"
            title={page.blueprint.title}
            intro={page.blueprint.intro}
            introClassName="max-w-[404px]"
          />
        </div>

        <ul data-reveal-stagger className="flex flex-col gap-2.5">
          {SERVICES.map((service, index) => {
            const current = service.id === page.id;
            return (
              <li key={service.id} className={INDENT[index]}>
                <Link
                  href={serviceHref(service.id)}
                  aria-current={current ? "page" : undefined}
                  className={cx(
                    "grid min-h-24 grid-cols-[56px_1fr] items-center gap-x-6 gap-y-3 rounded-[20px] border px-6 py-5 sm:grid-cols-[56px_1fr_auto]",
                    current
                      ? "border-transparent bg-linear-170 from-[#1e9bf0] to-[#1446e0] text-white transition-shadow duration-250 hover:shadow-[0_14px_36px_rgb(20_70_224/0.35)]"
                      : cx("border-line bg-surface", CARD_HOVER),
                  )}
                >
                  <span className={cx("font-display text-[32px] leading-none font-light", current ? "text-white" : "text-brand")}>
                    {service.number}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span
                      className={cx(
                        "text-[11px] font-medium tracking-[0.12em] uppercase",
                        current ? "text-white/85" : "text-fg-subtle",
                      )}
                    >
                      {service.wing}
                    </span>
                    <span className={cx("font-display text-[22px]", current ? "text-white" : "text-fg")}>{service.title}</span>
                  </span>
                  <span
                    className={cx(
                      "col-start-2 flex h-8 w-fit items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium sm:col-start-auto",
                      current ? "border-white/55 text-white" : "border-line text-fg-muted",
                    )}
                  >
                    {current ? (
                      <>
                        <span aria-hidden className="size-1.5 rounded-full bg-white" />
                        You are here
                      </>
                    ) : (
                      "Pair it with →"
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
