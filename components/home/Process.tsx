import CtaButtons from "@/components/ui/CtaButtons";
import ProcessStepper from "@/components/home/process/ProcessStepper";
import { PROCESS_VISUALS } from "@/components/home/process/ProcessVisuals";

type ProcessProps = {
  /** Anchor id: "process" on the home page, "how-it-works" on service pages (linked from the hero). */
  id?: string;
};

/** Six-step process stepper plus the "Ready for step one?" banner. Shared by the home and service pages. */
export default function Process({ id = "process" }: ProcessProps) {
  return (
    <section id={id} aria-labelledby="process-title" className="defer-render bg-bg-deep pt-24 pb-24 lg:pt-32 lg:pb-30">
      <div className="container-site">
        <ProcessStepper visuals={PROCESS_VISUALS} />

        <div className="reveal mt-10 flex flex-col gap-6 rounded-3xl border border-line bg-[linear-gradient(90deg,var(--surface),var(--surface-raised))] px-8 py-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-[26px] tracking-[-0.01em] text-fg">Ready for step one?</h3>
            <p className="mt-1 text-sm text-fg-muted">Tell us about your project and we&apos;ll start with a discovery call.</p>
          </div>
          <CtaButtons />
        </div>
      </div>
    </section>
  );
}
