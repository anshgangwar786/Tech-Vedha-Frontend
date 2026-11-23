import SectionGlow from "@/components/about/SectionGlow";
import HeadingStack from "@/components/ui/HeadingStack";
import { DISPLAY_TITLE, INTRO, NUMBER, SECTION } from "@/components/ui/styles";
import { PRINCIPLES } from "@/data/about";
import { cx } from "@/lib/cx";
import { stepNumber } from "@/lib/utils";

/** "Four things we always do": sticky heading beside a numbered list. */
export default function HowWeWork() {
  return (
    <section aria-labelledby="principles-title" className={cx("defer-render relative isolate bg-bg", SECTION)}>
      <SectionGlow />
      <div className="container-site grid gap-12 lg:grid-cols-[507fr_686fr] lg:gap-[86px]">
        <div className="flex flex-col gap-[22px] lg:sticky lg:top-28 lg:self-start">
          <HeadingStack
            id="principles-title"
            eyebrow="How we work"
            title={["Four things we", "always do."]}
            titleClassName={cx(DISPLAY_TITLE, "text-balance")}
            intro="However big the project, and whichever wing it starts in."
            introClassName="max-w-[362px]"
          />
        </div>

        <ol data-reveal-stagger>
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="grid gap-x-8 gap-y-3 border-t border-line py-9 sm:grid-cols-[88px_1fr]"
            >
              <span aria-hidden className={cx(NUMBER, "text-[56px]")}>
                {stepNumber(index)}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-light tracking-[-0.02em] text-fg">
                  {principle.title}
                </h3>
                <p className={cx(INTRO, "max-w-[510px]")}>{principle.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
