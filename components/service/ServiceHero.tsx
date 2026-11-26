import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaButtons from "@/components/ui/CtaButtons";
import Eyebrow from "@/components/ui/Eyebrow";
import type { ResolvedServicePage } from "@/data/service-pages";
import type { Crumb } from "@/lib/seo";
import { getSite } from "@/server/content";

type ServiceHeroProps = { page: ResolvedServicePage; trail: Crumb[] };

/** Breadcrumb trail plus the framed hero panel (grid, crosshair, glow and platform badge). Every word is the page's own. */
export default async function ServiceHero({ page, trail }: ServiceHeroProps) {
  const { hero } = page;
  // An empty second-button link opens WhatsApp (the number is a contact setting in Site & menus).
  const { WHATSAPP_URL } = await getSite();

  return (
    <section
      aria-labelledby="service-title"
      className="bg-[radial-gradient(120%_100%_at_50%_0%,var(--hero-from),var(--hero-to)_80%)] pt-24 pb-10"
    >
      <div className="container-site">
        <Breadcrumb items={trail} label={hero.a11y.breadcrumbLabel} />

        <div className="relative isolate mt-5 overflow-hidden rounded-[28px] border border-fg/15 px-5 pt-12 pb-24 sm:px-10 sm:pt-20 sm:pb-28 lg:py-[95px]">
          {/* Decorative layers: 40 px grid, centre crosshair and the bottom light. */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid bg-size-[40px_40px]" />
          <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 h-px bg-fg/15" />
          <div aria-hidden className="absolute inset-y-0 left-1/2 -z-10 w-px bg-fg/15" />
          <div
            aria-hidden
            className="absolute -inset-x-[12%] top-[61%] -z-10 h-[70%] -rotate-4 rounded-[50%] bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_26%,#1446e0_56%,transparent)] opacity-40 blur-[48px] dark:opacity-100"
          />

          <div className="reveal-load-stagger mx-auto flex max-w-[880px] flex-col items-center gap-5 text-center sm:gap-[26px]">
            {hero.eyebrow.trim() && <Eyebrow variant="badge">{hero.eyebrow}</Eyebrow>}
            <h1
              id="service-title"
              className="font-display text-[clamp(2.625rem,7.2vw,6.48rem)] leading-[1.02] tracking-[-0.035em] sm:leading-none text-balance text-fg dark:text-white"
            >
              {/* Figma: first line Regular and kept on one line on desktop; highlight line Light. */}
              <span className="font-normal lg:whitespace-nowrap">{hero.title}</span>{" "}
              <span className="text-gradient block pb-[0.1em] font-light">{hero.highlight}</span>
            </h1>
            <p className="max-w-[521px] text-base leading-[1.6] text-fg-muted sm:text-lg">{hero.intro}</p>
            <CtaButtons
              href={hero.primaryCta.href}
              label={hero.primaryCta.label}
              secondary={{ label: hero.secondaryCta.label, href: hero.secondaryCta.href || WHATSAPP_URL }}
              className="w-full justify-center"
            />
          </div>

          {hero.platforms.length > 0 && (
            <ul
              aria-label={hero.a11y.platformsLabel}
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-line bg-glass p-1.5 backdrop-blur-md sm:right-10 sm:bottom-10 sm:left-auto sm:translate-x-0 sm:p-2"
            >
              {hero.platforms.map((platform, index) => (
                <li
                  key={`${index}-${platform}`}
                  className="flex h-[30px] items-center rounded-full bg-surface-raised px-3.5 text-xs font-medium text-fg"
                >
                  {platform}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
