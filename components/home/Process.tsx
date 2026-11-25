import CtaButtons from "@/components/ui/CtaButtons";
import ProcessStepper from "@/components/home/process/ProcessStepper";
import { PROCESS_VISUALS } from "@/components/home/process/ProcessVisuals";
import { getHome } from "@/server/content";

type ProcessProps = {
  /** Anchor id: "process" on the home page, "how-it-works" on service pages (linked from the hero). */
  id?: string;
};

/** Six-step process stepper plus the "Ready for step one?" banner. Shared by the home and service pages. */
export default async function Process({ id = "process" }: ProcessProps) {
  const { process } = await getHome();
  return (
    <section id={id} aria-labelledby="process-title" className="defer-render bg-bg-deep py-16 sm:py-24 lg:pt-32 lg:pb-30">
      <div className="container-site">
        <ProcessStepper
          visuals={PROCESS_VISUALS}
          PROCESS_STEPS={process.steps}
          header={{
            eyebrow: process.eyebrow,
            title: process.title,
            intro: process.intro,
            exampleLabel: process.exampleLabel,
            nextLabel: process.nextLabel,
            restartLabel: process.restartLabel,
            stepCounter: process.stepCounter,
          }}
        />

        <div className="reveal mt-6 flex flex-col gap-5 rounded-3xl border border-line bg-[linear-gradient(90deg,var(--surface),var(--surface-raised))] px-5 py-6 sm:mt-10 sm:gap-6 sm:px-8 sm:py-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-[26px] tracking-[-0.01em] text-fg">{process.banner.heading}</h3>
            <p className="mt-1 text-sm text-fg-muted">{process.banner.text}</p>
          </div>
          <CtaButtons href={process.banner.primaryCta.href} label={process.banner.primaryCta.label} />
        </div>
      </div>
    </section>
  );
}
