import CtaButtons from "@/components/ui/CtaButtons";
import HeadingStack from "@/components/ui/HeadingStack";
import ProcessTabs from "@/components/service/ProcessTabs";
import StepAccordion from "@/components/service/StepAccordion";
import type { ResolvedServicePage } from "@/data/service-pages";
import { getSite } from "@/server/content";

type HowItWorksProps = { page: ResolvedServicePage };

/**
 * "How it works": pick a track (New / Existing app), then open one step at a time, then the page's own
 * "Ready for step one?" banner. Pages without tracks have no such section (app/services/[slug]/page.tsx).
 */
export default async function HowItWorks({ page }: HowItWorksProps) {
  const { process } = page;
  if (!process) return null;
  const { banner, a11y } = process;
  // An empty second-button link opens WhatsApp (the number is a contact setting in Site & menus).
  const { WHATSAPP_URL } = await getSite();

  return (
    <section
      id="how-it-works"
      aria-labelledby="process-title"
      className="defer-render bg-bg-deep py-16 sm:py-24 lg:pt-32 lg:pb-30"
    >
      <div className="container-site">
        <ProcessTabs
          label={a11y.tabsLabel}
          heading={
            <HeadingStack
              id="process-title"
              eyebrow={process.eyebrow}
              title={process.title}
              intro={process.intro}
              introClassName="max-w-[383px]"
            />
          }
          tabs={process.tracks.map(({ id, label }) => ({ id, label }))}
          panels={process.tracks.map((track) => (
            <StepAccordion key={track.id} steps={track.steps} deliverablesLabel={a11y.deliverablesLabel} />
          ))}
        />

        {banner.text.trim() && (
          <div className="reveal mt-6 flex flex-col gap-5 rounded-3xl border border-line bg-[linear-gradient(90deg,var(--surface),var(--surface-raised))] px-5 py-6 sm:mt-10 sm:gap-6 sm:px-8 sm:py-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-[26px] tracking-[-0.01em] text-fg">{banner.heading}</h3>
              <p className="mt-1 text-sm text-fg-muted">{banner.text}</p>
            </div>
            <CtaButtons
              href={banner.primaryCta.href}
              label={banner.primaryCta.label}
              secondary={{ label: banner.secondaryCta.label, href: banner.secondaryCta.href || WHATSAPP_URL }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
