import ContactForm from "@/components/contact/ContactForm";
import { Glyph, LayersArt } from "@/components/contact/icons";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import { BRAND_GRADIENT, MICRO, PILL } from "@/components/ui/styles";
import { COMPANY, PROMISES, QUICK_CONTACTS } from "@/data/contact";
import type { Crumb } from "@/lib/seo";
import { cx } from "@/lib/cx";
import { externalLinkProps } from "@/lib/utils";

/** Card shadows: black in dark, brand-tinted in light. */
const SHADOW_SOFT = "shadow-[0_30px_60px_-30px_rgb(20_70_224/0.25)] dark:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]";
const SHADOW_DEEP = "shadow-[0_30px_60px_rgb(20_70_224/0.25)] dark:shadow-[0_30px_60px_rgb(0_0_0/0.6)]";

/** Left column: brand header, direct contact rows, promises and hours. */
function BrandCard() {
  return (
    <aside
      aria-label="Contact details"
      className={cx("flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface", SHADOW_SOFT)}
    >
      <div className={cx("relative isolate flex min-h-[210px] flex-col justify-end overflow-hidden p-7 text-white", BRAND_GRADIENT)}>
        <span aria-hidden className="absolute top-[-90px] left-[288px] -z-10 size-[300px] rounded-full border border-white/25" />
        <span aria-hidden className="absolute top-[-40px] left-[338px] -z-10 size-[200px] rounded-full border border-white/25" />
        <LayersArt className="absolute top-[22px] left-[366px] -z-10 h-[97px] w-[104px] max-sm:left-auto max-sm:right-4" />
        <p className="absolute top-[26px] left-7 font-display text-[15px] font-semibold tracking-[0.28em]">
          TECH <span className="text-[#bfe6ff]">VEDHA</span>
        </p>
        <p className="mt-14 max-w-[300px] font-display text-[26px] leading-[1.15] tracking-[-0.01em]">
          One partner. Built for tomorrow.
        </p>
        <p className="mt-1.5 max-w-[340px] text-[13px] leading-[1.5] opacity-85">
          Space, software, apps, security and marketing — for businesses in India and abroad.
        </p>
      </div>

      <ul className="px-7 py-3">
        {QUICK_CONTACTS.map((item) => {
          const body = (
            <>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-raised text-brand">
                <Glyph name={item.icon} className="size-[18px]" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className={MICRO}>{item.label}</span>
                <span className={cx("truncate text-[15px] font-medium", item.highlight ? "text-brand" : "text-fg")}>
                  {item.value}
                </span>
              </span>
            </>
          );
          return (
            <li key={item.label} className="border-b border-line last:border-b-0">
              {item.href ? (
                <a
                  href={item.href}
                  {...externalLinkProps(item.href)}
                  className="group flex items-center gap-4 py-[22px]"
                >
                  {body}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-colors duration-250 group-hover:border-brand group-hover:text-brand">
                    <Glyph name="arrow" className="size-3.5 transition-transform duration-250 group-hover:translate-x-0.5" />
                  </span>
                </a>
              ) : (
                <div className="flex items-center gap-4 py-[22px]">{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      <ul aria-label="How we work" className="flex flex-wrap gap-2 px-7 pt-1.5 pb-6">
        {PROMISES.map((promise) => (
          <li key={promise} className={PILL}>
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {promise}
          </li>
        ))}
      </ul>

      <div className="mt-auto px-5 pb-5">
        <p className="flex flex-wrap gap-x-6 gap-y-2 rounded-[14px] bg-surface-raised px-4 py-3.5 text-[13px] font-medium text-fg-muted">
          <span className="flex items-center gap-2">
            <Glyph name="clock" className="size-[15px]" />
            {COMPANY.hours}
          </span>
          <span className="flex items-center gap-2">
            <Glyph name="globe" className="size-[15px]" />
            India and abroad
          </span>
        </p>
      </div>
    </aside>
  );
}

/** Page intro, brand card and the enquiry form. */
export default function ContactHero({ trail }: { trail: Crumb[] }) {
  return (
    <section
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_100%_at_15%_10%,var(--hero-from),var(--hero-to)_80%)] pt-28 pb-24 lg:pb-[130px]"
    >
      {/* Soft brand light behind the form: a plain gradient, no blur filter to repaint. */}
      <div
        aria-hidden
        className="absolute top-[520px] left-[calc(50%-200px)] -z-10 h-[700px] w-[1400px] bg-[radial-gradient(closest-side,#fff,#bee2fd_15%,#7cc4fa_30%,#a9cbfa_60%,rgb(169_203_250/0))] opacity-55 dark:bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_30%,#1446e0_60%,rgb(20_70_224/0))]"
      />

      <div className="reveal-load-stagger container-site">
        <Breadcrumb items={trail} />
        <Eyebrow variant="pill" className="mt-7">
          Contact Tech Vedha · For businesses in India and abroad
        </Eyebrow>
        <h1
          id="contact-title"
          className="mt-6 font-display text-[clamp(2.75rem,6.4vw,5rem)] leading-[1.02] font-light tracking-[-0.035em] text-fg"
        >
          Tell us what you’re building. <span className="text-gradient block pb-[0.08em]">We’ll plan it with you.</span>
        </h1>
        <p className="mt-6 max-w-[620px] text-lg leading-[1.6] text-fg-muted">
          Send your project details once. One person from our team replies with next steps, and a written plan follows
          the discovery call.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-[500px_minmax(0,1fr)]">
          <div className={cx("rounded-[28px] border border-line bg-glass p-6 backdrop-blur-xl sm:p-9 lg:order-last", SHADOW_DEEP)}>
            <ContactForm />
          </div>
          <BrandCard />
        </div>
      </div>
    </section>
  );
}
