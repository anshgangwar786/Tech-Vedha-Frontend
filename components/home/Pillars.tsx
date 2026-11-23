import { Lock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { BRAND_GRADIENT } from "@/components/ui/styles";
import { QUALITY_GATES } from "@/data/home";
import { cx } from "@/lib/cx";

const card =
  "relative flex flex-col overflow-hidden rounded-3xl border p-7 transition duration-300 hover:-translate-y-1";
const plainCard = "border-line bg-surface hover:border-brand/70";
const number = "font-display text-[30.6px] leading-none font-light";
const title = "font-display text-[25px] leading-[1.15] tracking-[-0.01em]";
const body = "mt-2 text-base leading-[1.5]";

const BRIEF_FEATURES = ["GST billing", "Multi-store setup", "Role-based logins", "Real-time stock sync"];
const SCALE_STEPS = ["1 store", "City", "India", "Abroad"];

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-brand underline decoration-1 underline-offset-4">{children}</span>;
}

export default function Pillars() {
  return (
    <section id="why" aria-labelledby="pillars-title" className="defer-render bg-bg py-24 lg:py-[100px]">
      <div className="container-site">
        <SectionHeader
          id="pillars-title"
          eyebrow="Why Tech Vedha"
          title={["Built on four", "pillars of trust."]}
          intro="Four promises behind every project."
        />

        <div data-reveal-stagger className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className={cx(card, plainCard, "lg:col-span-2")}>
            <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,340px)]">
              <div className="flex flex-col gap-[18px]">
                <p className={cx(number, "text-brand")}>01</p>
                <blockquote className="max-w-[290px] font-display text-[21.6px] leading-[1.35] font-light text-fg">
                  “We need billing for our <Highlight>three stores</Highlight>, with <Highlight>staff logins</Highlight> and{" "}
                  <Highlight>live stock</Highlight>.”
                  <footer className="mt-2 font-sans text-xs text-fg-subtle">— your brief</footer>
                </blockquote>
                <div>
                  <h3 className={cx(title, "text-fg")}>Client-centric</h3>
                  <p className={cx(body, "text-fg-muted")}>Built around how your business works — no templates.</p>
                </div>
              </div>
              <div>
                <p className="text-right text-[11px] text-fg-subtle">Example brief</p>
                <ul aria-label="What the brief becomes" className="mt-6">
                  {BRIEF_FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="relative flex items-center justify-between border-b border-line py-2.5 text-[15px] text-fg last:border-0 md:before:absolute md:before:top-1/2 md:before:-left-14 md:before:w-12 md:before:border-t md:before:border-dashed md:before:border-brand/60"
                    >
                      {feature}
                      <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article className={cx(card, plainCard, "lg:row-span-2")}>
            <p className={cx(number, "text-brand")}>02</p>
            <ol aria-label="Release gates" className="relative mt-5 flex flex-1 flex-col justify-between gap-5 pl-10">
              <span aria-hidden className="absolute top-3 bottom-3 left-[14px] w-px bg-line" />
              {QUALITY_GATES.map((gate, index) => (
                <li
                  key={gate}
                  className={cx("relative text-lg", index === 0 ? "font-medium text-fg" : "text-fg-subtle")}
                >
                  <span
                    aria-hidden
                    className={cx(
                      "absolute top-1/2 -left-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full",
                      index === 0
                        ? "size-5 border-[5px] border-brand/40 bg-white shadow-[0_0_16px_var(--glow)]"
                        : "size-3 border border-line bg-surface",
                    )}
                  />
                  {gate}
                </li>
              ))}
            </ol>
            <p className="mt-4">
              <span className="inline-block rounded-full bg-primary px-3 py-1 text-[12.5px] font-medium text-white">
                Ready to launch
              </span>
            </p>
            <h3 className={cx(title, "mt-6 text-fg")}>Quality and reliability</h3>
            <p className={cx(body, "text-fg-muted")}>Every release passes six gates before it ships.</p>
          </article>

          <article className={cx(card, plainCard, "min-h-[284px]")}>
            <p className={cx(number, "text-brand")}>03</p>
            <ol aria-label="Growth stages" className="mt-auto flex justify-between border-t border-line pt-2.5 text-base">
              {SCALE_STEPS.map((stage, index) => (
                <li key={stage} className={index === SCALE_STEPS.length - 1 ? "text-fg" : "text-fg-subtle"}>
                  {stage}
                </li>
              ))}
            </ol>
            <h3 className={cx(title, "mt-6 text-fg")}>Scalable</h3>
            <p className={cx(body, "text-fg-muted")}>Grows from one store to many countries.</p>
          </article>

          <article
            className={cx(
              card,
              BRAND_GRADIENT,
              "min-h-[284px] border-transparent text-white hover:shadow-[0_24px_60px_-20px_rgb(20_70_224/0.6)]",
            )}
          >
            <p className={number}>04</p>
            <div aria-hidden className="relative mx-auto mt-2 grid size-[116px] place-items-center rounded-full border border-white/25">
              <span className="grid size-[76px] place-items-center rounded-full border border-white/30 bg-white/10">
                <Lock className="size-10" strokeWidth={2.5} />
              </span>
            </div>
            <h3 className={cx(title, "mt-auto pt-4")}>Secure and compliant</h3>
            <p className={cx(body, "text-white/85")}>Your data is protected in every layer.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
