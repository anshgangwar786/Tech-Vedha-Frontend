import { Glyph } from "@/components/contact/icons";
import SectionHeading from "@/components/contact/SectionHeading";
import { BRAND_GRADIENT, CARD_HOVER, PILL, SECTION_TIGHT } from "@/components/ui/styles";
import { cx } from "@/lib/cx";
import { externalLinkProps, stepNumber } from "@/lib/utils";
import { getContact } from "@/server/content";

/** "Pick the channel that suits you": email, WhatsApp and call cards, then the three next steps. */
export default async function Channels() {
  const { CHANNELS, NEXT_STEPS, CHANNELS_SECTION: copy, NEXT_STEPS_SECTION: next } = await getContact();
  return (
    <section aria-labelledby="channels-title" className={cx("defer-render bg-bg-deep", SECTION_TIGHT)}>
      <div className="container-site">
        <SectionHeading
          id="channels-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          highlight={copy.highlight}
          intro={copy.intro}
          introClassName="max-w-[420px]"
        />

        <ul data-reveal-stagger className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {CHANNELS.map((channel, index) => (
            <li
              key={index}
              className={cx("relative flex flex-col items-start gap-3 rounded-3xl border border-line bg-surface p-6 sm:gap-3.5 sm:p-8", CARD_HOVER)}
            >
              <span className={cx("grid size-12 place-items-center rounded-[14px] text-white sm:size-[52px]", BRAND_GRADIENT)}>
                <Glyph name={channel.icon} className="size-[22px]" />
              </span>
              <h3 className="pt-1 font-display text-[26px] leading-tight text-fg sm:pt-2.5 sm:text-[28px]">{channel.title}</h3>
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
                className="group mt-auto flex items-center gap-2 pt-1 text-sm font-medium text-fg after:absolute after:inset-0 after:rounded-3xl sm:pt-2"
              >
                {channel.cta}
                <Glyph name="arrow" className="size-3.5 transition-transform duration-250 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>

        <div className="reveal mt-6 grid overflow-hidden rounded-3xl border border-line bg-glass sm:mt-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="flex flex-col justify-center gap-2 border-b border-line p-6 sm:p-8 lg:border-r lg:border-b-0">
            <p className="text-[11px] font-medium tracking-[0.16em] text-fg-subtle uppercase">{next.eyebrow}</p>
            <h3 className="font-display text-[28px] leading-tight text-fg lg:whitespace-nowrap">{next.title}</h3>
          </div>
          <ol className="grid md:grid-cols-3">
            {NEXT_STEPS.map((step, index) => (
              <li
                key={index}
                className="flex gap-4 border-b border-line p-5 last:border-b-0 sm:p-7 md:border-r md:border-b-0 md:last:border-r-0"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-[13px] text-white">
                  {stepNumber(index)}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium tracking-[0.14em] text-brand uppercase sm:text-[10px]">
                    {next.stepLabel.replaceAll("{n}", String(index + 1))}
                  </span>
                  <span className="text-base font-medium text-fg">{step.title}</span>
                  <span className="text-sm leading-[1.5] text-fg-muted sm:text-[13px]">{step.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
