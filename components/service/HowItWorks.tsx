import Process from "@/components/home/Process";
import HeadingStack from "@/components/ui/HeadingStack";
import ProcessTabs from "@/components/service/ProcessTabs";
import StepAccordion from "@/components/service/StepAccordion";
import type { ResolvedServicePage } from "@/data/service-pages";

type HowItWorksProps = { page: ResolvedServicePage };

/**
 * "How it works": pick a track (New / Existing app), then open one step at a time.
 * Pages without their own tracks fall back to the shared six-step stepper.
 */
export default function HowItWorks({ page }: HowItWorksProps) {
  const { process } = page;
  if (!process) return <Process id="how-it-works" />;

  return (
    <section
      id="how-it-works"
      aria-labelledby="process-title"
      className="defer-render bg-bg-deep py-24 lg:pt-32 lg:pb-30"
    >
      <div className="container-site">
        <ProcessTabs
          heading={
            <HeadingStack
              id="process-title"
              eyebrow="How it works"
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
      </div>
    </section>
  );
}
