import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaButtons from "@/components/ui/CtaButtons";
import Eyebrow from "@/components/ui/Eyebrow";
import type { ResolvedServicePage } from "@/data/service-pages";
import type { Crumb } from "@/lib/seo";

type ServiceHeroProps = { page: ResolvedServicePage; trail: Crumb[] };

/** Breadcrumb trail plus the framed hero panel (grid, crosshair, glow and platform badge). */
export default function ServiceHero({ page, trail }: ServiceHeroProps) {
  const { service, hero } = page;

  return (
    <section
      aria-labelledby="service-title"
      className="bg-[radial-gradient(120%_100%_at_50%_0%,var(--hero-from),var(--hero-to)_80%)] pt-24 pb-10"
    >
      <div className="container-site">
        <Breadcrumb items={trail} />

        <div className="relative isolate mt-5 overflow-hidden rounded-[28px] border border-fg/15 px-5 pt-20 pb-28 sm:px-10 lg:py-[95px]">
          {/* Decorative layers: 40 px grid, centre crosshair and the bottom light. */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid bg-size-[40px_40px]" />
          <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 h-px bg-fg/15" />
          <div aria-hidden className="absolute inset-y-0 left-1/2 -z-10 w-px bg-fg/15" />
          <div
            aria-hidden
            className="absolute -inset-x-[12%] top-[61%] -z-10 h-[70%] -rotate-4 rounded-[50%] bg-[radial-gradient(closest-side,#e6f4ff,#1e9bf0_26%,#1446e0_56%,transparent)] opacity-40 blur-[48px] dark:opacity-100"
          />

          <div className="reveal-load-stagger mx-auto flex max-w-[880px] flex-col items-center gap-[26px] text-center">
            <Eyebrow variant="badge">
              {service.number} · {service.wing}
            </Eyebrow>
            <h1
              id="service-title"
              className="font-display text-[clamp(3.25rem,7.2vw,6.48rem)] leading-none tracking-[-0.035em] text-balance text-fg dark:text-white"
            >
              {/* Figma: first line Regular and kept on one line on desktop; highlight line Light. */}
              <span className="font-normal lg:whitespace-nowrap">{hero.title}</span>{" "}
              <span className="text-gradient block pb-[0.1em] font-light">{hero.highlight}</span>
            </h1>
            <p className="max-w-[521px] text-lg leading-[1.6] text-fg-muted">{hero.intro}</p>
            <CtaButtons className="justify-center" />
          </div>

          <ul
            aria-label="Platforms"
            className="absolute right-6 bottom-6 flex gap-1.5 rounded-full border border-line bg-glass p-2 backdrop-blur-md sm:right-10 sm:bottom-10"
          >
            {hero.platforms.map((platform) => (
              <li
                key={platform}
                className="flex h-[30px] items-center rounded-full bg-surface-raised px-3.5 text-xs font-medium text-fg"
              >
                {platform}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
