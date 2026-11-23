import { Glyph } from "@/components/contact/icons";
import SectionHeading from "@/components/contact/SectionHeading";
import { BRAND_GRADIENT, CARD_HOVER, PILL, SECTION_TIGHT } from "@/components/ui/styles";
import { CHANNELS, NEXT_STEPS } from "@/data/contact";
import { cx } from "@/lib/cx";
import { externalLinkProps, stepNumber } from "@/lib/utils";

/** "Pick the channel that suits you": email, WhatsApp and call cards, then the three next steps. */
export default function Channels() {
  return (
    <section aria-labelledby="channels-title" className={cx("defer-render bg-bg-deep", SECTION_TIGHT)}>
      <div className="container-site">
        <SectionHeading
          id="channels-title"
          eyebrow="Other ways to reach us"
          title="Pick the channel"
          highlight="that suits you."
          intro="Every channel reaches the same Tech Vedha team — and the same person who will run your project."
          introClassName="max-w-[420px]"
        />

        <ul data-reveal-stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li
              key={channel.title}
              className={cx("relative flex flex-col items-start gap-3.5 rounded-3xl border border-line bg-surface p-8", CARD_HOVER)}
            >
              <span className={cx("grid size-[52px] place-items-center rounded-[14px] text-white", BRAND_GRADIENT)}>
                <Glyph name={channel.icon} className="size-[22px]" />
              </span>
              <h3 className="pt-2.5 font-display text-[28px] leading-tight text-fg">{channel.title}</h3>
              <p className="text-[15px] leading-[1.55] text-fg-muted">{channel.description}</p>
              <p className="text-[15px] font-medium break-all text-brand">{channel.value}</p>
              <p className={PILL}>
                <Glyph name={channel.tag.icon} className="size-[13px]" />
                {channel.tag.label}
              </p>
              {/* The whole card is the hit area. */}
              <a
                href={channel.href}
                {...externalLinkProps(channel.href)}
                className="group mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-fg after:absolute after:inset-0 after:rounded-3xl"
              >
                {channel.cta}
                <Glyph name="arrow" className="size-3.5 transition-transform duration-250 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>

        <div className="reveal mt-8 grid overflow-hidden rounded-3xl border border-line bg-glass lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="flex flex-col justify-center gap-2 border-b border-line p-8 lg:border-r lg:border-b-0">
            <p className="text-[11px] font-medium tracking-[0.16em] text-fg-subtle uppercase">After you enquire</p>
            <h3 className="font-display text-[28px] leading-tight text-fg lg:whitespace-nowrap">What happens next</h3>
          </div>
          <ol className="grid md:grid-cols-3">
            {NEXT_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 border-b border-line p-7 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-[13px] text-white">
                  {stepNumber(index)}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[10px] font-medium tracking-[0.14em] text-brand uppercase">Step {index + 1}</span>
                  <span className="text-base font-medium text-fg">{step.title}</span>
                  <span className="text-[13px] leading-[1.5] text-fg-muted">{step.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
