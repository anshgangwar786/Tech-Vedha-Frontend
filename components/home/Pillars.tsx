import ThemedImage from "@/components/ui/ThemedImage";
import { Lock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { BRAND_GRADIENT } from "@/components/ui/styles";
import { cx } from "@/lib/cx";
import { getHome } from "@/server/content";

const card =
  "relative flex flex-col overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-7";
const plainCard = "border-line bg-surface hover:border-brand/70";
const number = "font-display text-[30.6px] leading-none font-light";
const title = "font-display text-[25px] leading-[1.15] tracking-[-0.01em]";
const body = "mt-2 text-base leading-[1.5]";

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-brand underline decoration-1 underline-offset-4">{children}</span>;
}

/** Admin copy with [square-bracketed] words underlined. */
function Highlighted({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\])/).map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? <Highlight key={i}>{part.slice(1, -1)}</Highlight> : part,
  );
}

export default async function Pillars() {
  const { pillars } = await getHome();
  const { clientCentric, quality, scalable, secure } = pillars;
  // Empty lines (just added in the admin, not filled in yet) are left out.
  const features = clientCentric.features.filter((line) => line.trim());
  const gates = quality.gates.filter((line) => line.trim());
  const stages = scalable.stages.filter((line) => line.trim());
  return (
    <section id="why" aria-labelledby="pillars-title" className="defer-render bg-bg py-16 sm:py-24 lg:py-[100px]">
      <div className="container-site">
        <SectionHeader
          id="pillars-title"
          eyebrow={pillars.eyebrow}
          title={pillars.title}
          intro={pillars.intro}
        />

        <div data-reveal-stagger className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className={cx(card, plainCard, "lg:col-span-2")}>
            <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,340px)]">
              <div className="flex flex-col gap-[18px]">
                <p className={cx(number, "text-brand")}>{clientCentric.number}</p>
                <blockquote className="max-w-[290px] font-display text-[21.6px] leading-[1.35] font-light text-fg">
                  “<Highlighted text={clientCentric.brief} />”
                  <footer className="mt-2 font-sans text-xs text-fg-subtle">{clientCentric.briefCredit}</footer>
                </blockquote>
                <div>
                  <h3 className={cx(title, "text-fg")}>{clientCentric.title}</h3>
                  <p className={cx(body, "text-fg-muted")}>{clientCentric.text}</p>
                </div>
              </div>
              <div>
                <p className="text-right text-[11px] text-fg-subtle">{clientCentric.exampleLabel}</p>
                <ul aria-label={pillars.a11y.featuresLabel} className="mt-6">
                  {features.map((feature, index) => (
                    <li
                      key={index}
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
            <p className={cx(number, "text-brand")}>{quality.number}</p>
            <ol aria-label={pillars.a11y.gatesLabel} className="relative mt-5 flex flex-1 flex-col justify-between gap-5 pl-10">
              <span aria-hidden className="absolute top-3 bottom-3 left-[14px] w-px bg-line" />
              {gates.map((gate, index) => (
                <li
                  key={index}
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
                {quality.badge}
              </span>
            </p>
            <h3 className={cx(title, "mt-6 text-fg")}>{quality.title}</h3>
            <p className={cx(body, "text-fg-muted")}>{quality.text}</p>
          </article>

          <article className={cx(card, plainCard, "min-h-[220px] sm:min-h-[284px]")}>
            <p className={cx(number, "text-brand")}>{scalable.number}</p>
            <ol aria-label={pillars.a11y.stagesLabel} className="mt-auto flex justify-between border-t border-line pt-2.5 text-base">
              {stages.map((stage, index) => (
                <li key={index} className={index === stages.length - 1 ? "text-fg" : "text-fg-subtle"}>
                  {stage}
                </li>
              ))}
            </ol>
            <h3 className={cx(title, "mt-6 text-fg")}>{scalable.title}</h3>
            <p className={cx(body, "text-fg-muted")}>{scalable.text}</p>
          </article>

          <article
            className={cx(
              card,
              BRAND_GRADIENT,
              "min-h-[260px] border-transparent text-white hover:shadow-[0_24px_60px_-20px_rgb(20_70_224/0.6)] sm:min-h-[284px]",
            )}
          >
            <p className={number}>{secure.number}</p>
            {secure.image.src ? (
              // Uploaded picture in place of the lock drawing (Homepage → Four pillars → Card 04).
              <div className="relative mx-auto mt-2 size-[116px] overflow-hidden rounded-full border border-white/25">
                <ThemedImage image={secure.image} fill sizes="116px" className="object-cover" />
              </div>
            ) : (
              <div aria-hidden className="relative mx-auto mt-2 grid size-[116px] place-items-center rounded-full border border-white/25">
                <span className="grid size-[76px] place-items-center rounded-full border border-white/30 bg-white/10">
                  <Lock className="size-10" strokeWidth={2.5} />
                </span>
              </div>
            )}
            <h3 className={cx(title, "mt-auto pt-4")}>{secure.title}</h3>
            <p className={cx(body, "text-white/85")}>{secure.text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
