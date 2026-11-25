import Process from "@/components/home/Process";
import CtaButtons from "@/components/ui/CtaButtons";
import HeadingStack from "@/components/ui/HeadingStack";
import ProcessTabs from "@/components/service/ProcessTabs";
import StepAccordion from "@/components/service/StepAccordion";
import type { ResolvedServicePage } from "@/data/service-pages";
import { getHome } from "@/server/content";

type HowItWorksProps = { page: ResolvedServicePage };

/**
 * "How it works": pick a track (New / Existing app), then open one step at a time.
 * Pages without their own tracks fall back to the shared six-step stepper.
 */
export default async function HowItWorks({ page }: HowItWorksProps) {
  const { process } = page;
  if (!process) return <Process id="how-it-works" />;
  // Same "Ready for step one?" banner as the homepage, with this page's own line under the heading.
  const { banner } = (await getHome()).process;

  return (
    <section
      id="how-it-works"
      aria-labelledby="process-title"
      className="defer-render bg-bg-deep py-16 sm:py-24 lg:pt-32 lg:pb-30"
    >
      <div className="container-site">
        <ProcessTabs
          heading={
            <HeadingStack
              id="process-title"
              eyebrow={page.labels.process}
              title={process.title}
              intro={process.intro}
              introClassName="max-w-[383px]"
            />
          }
          tabs={process.tracks.map(({ id, label }) => ({ id, label }))}
          panels={process.tracks.map((track) => (
            <StepAccordion key={track.id} steps={track.steps} />
          ))}
        />

        {process.ctaDetail.trim() && (
          <div className="reveal mt-6 flex flex-col gap-5 rounded-3xl border border-line bg-[linear-gradient(90deg,var(--surface),var(--surface-raised))] px-5 py-6 sm:mt-10 sm:gap-6 sm:px-8 sm:py-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-[26px] tracking-[-0.01em] text-fg">{banner.heading}</h3>
              <p className="mt-1 text-sm text-fg-muted">{process.ctaDetail}</p>
            </div>
            <CtaButtons href={banner.primaryCta.href} label={banner.primaryCta.label} />
          </div>
        )}
      </div>
    </section>
  );
}
