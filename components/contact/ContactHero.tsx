import ContactForm from "@/components/contact/ContactForm";
import { Glyph, LayersArt } from "@/components/contact/icons";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import { BRAND_GRADIENT, MICRO, PILL } from "@/components/ui/styles";
import type { Crumb } from "@/lib/seo";
import { cx } from "@/lib/cx";
import { externalLinkProps } from "@/lib/utils";
import { getContact, getServices, getSite } from "@/server/content";

/** Card shadows: black in dark, brand-tinted in light. */
const SHADOW_SOFT = "shadow-[0_30px_60px_-30px_rgb(20_70_224/0.25)] dark:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]";
const SHADOW_DEEP = "shadow-[0_30px_60px_rgb(20_70_224/0.25)] dark:shadow-[0_30px_60px_rgb(0_0_0/0.6)]";

/** Left column: brand header, direct contact rows, promises and hours. */
async function BrandCard() {
  const [{ COMPANY, PROMISES, QUICK_CONTACTS, BRAND_CARD }, { WORDMARK }] = await Promise.all([getContact(), getSite()]);
  return (
    <aside
      aria-label="Contact details"
      className={cx("flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface", SHADOW_SOFT)}
    >
      <div className={cx("relative isolate flex min-h-[210px] flex-col justify-end overflow-hidden p-5 text-white sm:p-7", BRAND_GRADIENT)}>
        <span aria-hidden className="absolute top-[-90px] right-[-88px] -z-10 size-[300px] max-sm:right-auto max-sm:left-[288px] rounded-full border border-white/25" />
        <span aria-hidden className="absolute top-[-40px] right-[-38px] -z-10 size-[200px] max-sm:right-auto max-sm:left-[338px] rounded-full border border-white/25" />
        <LayersArt className="absolute top-[22px] right-[30px] -z-10 h-[97px] w-[104px] max-sm:top-4 max-sm:right-4 max-sm:h-[56px] max-sm:w-[60px]" />
        <p className="absolute top-[22px] left-5 font-display text-[15px] font-semibold tracking-[0.28em] sm:top-[26px] sm:left-7">
          {WORDMARK[0]} <span className="text-[#bfe6ff]">{WORDMARK[1]}</span>
        </p>
        <p className="mt-16 max-w-[300px] font-display text-2xl leading-[1.15] tracking-[-0.01em] sm:mt-14 sm:text-[26px]">
          {BRAND_CARD.title}
        </p>
        <p className="mt-1.5 max-w-[340px] text-[13px] leading-[1.5] opacity-85">
          {BRAND_CARD.text}
        </p>
      </div>

      <ul className="px-5 py-2 sm:px-7 sm:py-3">
        {QUICK_CONTACTS.map((item) => {
          const body = (
            <>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-raised text-brand">
                <Glyph name={item.icon} className="size-[18px]" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className={MICRO}>{item.label}</span>
                <span className={cx("text-[15px] font-medium break-words sm:truncate", item.highlight ? "text-brand" : "text-fg")}>
                  {item.value}
                </span>
              </span>
            </>
          );
          return (
            <li key={item.label + item.icon} className="border-b border-line last:border-b-0">
              {item.href ? (
                <a
                  href={item.href}
                  {...externalLinkProps(item.href)}
                  className="group flex items-center gap-4 py-[18px] sm:py-[22px]"
                >
                  {body}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-colors duration-250 group-hover:border-brand group-hover:text-brand">
                    <Glyph name="arrow" className="size-3.5 transition-transform duration-250 group-hover:translate-x-0.5" />
                  </span>
                </a>
              ) : (
                <div className="flex items-center gap-4 py-[18px] sm:py-[22px]">{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      <ul aria-label="How we work" className="flex flex-wrap gap-2 px-5 pt-1.5 pb-5 sm:px-7 sm:pb-6">
        {PROMISES.filter((promise) => promise.trim()).map((promise, index) => (
          <li key={index} className={PILL}>
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {promise}
          </li>
        ))}
      </ul>

      <div className="mt-auto px-4 pb-4 sm:px-5 sm:pb-5">
        <p className="flex flex-wrap gap-x-6 gap-y-2 rounded-[14px] bg-surface-raised px-4 py-3.5 text-[13px] font-medium text-fg-muted">
          <span className="flex items-center gap-2">
            <Glyph name="clock" className="size-[15px]" />
            {COMPANY.hours}
          </span>
          <span className="flex items-center gap-2">
            <Glyph name="globe" className="size-[15px]" />
            {BRAND_CARD.regionLabel}
          </span>
        </p>
      </div>
    </aside>
  );
}

/** Page intro, brand card and the enquiry form. */
export default async function ContactHero({ trail }: { trail: Crumb[] }) {
  const [{ TIMEFRAMES, HERO, FORM }, { SITE, WHATSAPP_URL, ENQUIRY_SENT }, SERVICES] = await Promise.all([
    getContact(),
    getSite(),
    getServices(),
  ]);
  return (
    <section
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_100%_at_15%_10%,var(--hero-from),var(--hero-to)_80%)] pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pb-[130px]"
    >
      {/* Soft brand light behind the form: a plain gradient, no blur filter to repaint. */}
      <div
        aria-hidden
        className="absolute top-[520px] left-[calc(50%-200px)] -z-10 h-[700px] w-[1400px] bg-[radial-gradient(closest-side,#fff,#bee2fd_15%,#7cc4fa_30%,#a9cbfa_60%,rgb(169_203_250/0))] opacity-55 dark:bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_30%,#1446e0_60%,rgb(20_70_224/0))]"
      />

      <div className="reveal-load-stagger container-site">
        <Breadcrumb items={trail} />
        <Eyebrow variant="pill" className="mt-6 sm:mt-7">
          {HERO.eyebrow}
        </Eyebrow>
        <h1
          id="contact-title"
          className="mt-5 font-display text-[clamp(2.5rem,6.4vw,5rem)] leading-[1.02] font-light tracking-[-0.035em] text-fg sm:mt-6"
        >
          {HERO.titleLead} <span className="text-gradient block pb-[0.08em]">{HERO.titleAccent}</span>
        </h1>
        <p className="mt-5 max-w-[620px] text-[17px] leading-[1.6] text-fg-muted sm:mt-6 sm:text-lg">
          {HERO.intro}
        </p>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 xl:grid-cols-[500px_minmax(0,1fr)]">
          <div className={cx("rounded-[28px] border border-line bg-glass p-5 backdrop-blur-xl sm:p-9 xl:order-last", SHADOW_DEEP)}>
            <ContactForm
              SERVICES={SERVICES}
              TIMEFRAMES={TIMEFRAMES}
              SITE={SITE}
              WHATSAPP_URL={WHATSAPP_URL}
              copy={FORM}
              sentCopy={ENQUIRY_SENT}
            />
          </div>
          <BrandCard />
        </div>
      </div>
    </section>
  );
}
