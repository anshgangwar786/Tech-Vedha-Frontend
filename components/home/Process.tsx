import { Fragment } from "react";
import ThemedImage from "@/components/ui/ThemedImage";
import CtaButtons from "@/components/ui/CtaButtons";
import ProcessStepper from "@/components/home/process/ProcessStepper";
import { processVisuals } from "@/components/home/process/ProcessVisuals";
import { PROCESS_VISUALS } from "@/data/home";
import { getHome, getSite } from "@/server/content";
import { hasPicture } from "@/lib/themedImage";

/** Six-step process stepper plus the "Ready for step one?" banner (Homepage → How we work). */
export default async function Process() {
  const [{ process }, { WHATSAPP_URL }] = await Promise.all([getHome(), getSite()]);
  const { banner } = process;
  const drawings = processVisuals(PROCESS_VISUALS);
  // Each step shows its uploaded image, or else a drawing by position (added steps reuse them in turn).
  // A step without a title is a half-filled draft: left out.
  const steps = process.steps.filter((step) => step.title.trim());
  const visuals = steps.map((step, index) => (
    <Fragment key={index}>
      {hasPicture(step.image) ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
          <ThemedImage image={step.image} fill sizes="460px" className="object-cover" />
        </div>
      ) : (
        drawings[index % drawings.length]
      )}
    </Fragment>
  ));
  return (
    <section id="process" aria-labelledby="process-title" className="defer-render bg-bg-deep py-16 sm:py-24 lg:pt-32 lg:pb-30">
      <div className="container-site">
        <ProcessStepper
          visuals={visuals}
          PROCESS_STEPS={steps}
          header={{
            eyebrow: process.eyebrow,
            title: process.title,
            intro: process.intro,
            exampleLabel: process.exampleLabel,
            nextLabel: process.nextLabel,
            restartLabel: process.restartLabel,
            stepCounter: process.stepCounter,
          }}
          a11y={process.a11y}
        />

        <div className="reveal mt-6 flex flex-col gap-5 rounded-3xl border border-line bg-[linear-gradient(90deg,var(--surface),var(--surface-raised))] px-5 py-6 sm:mt-10 sm:gap-6 sm:px-8 sm:py-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-[26px] tracking-[-0.01em] text-fg">{banner.heading}</h3>
            <p className="mt-1 text-sm text-fg-muted">{banner.text}</p>
          </div>
          <CtaButtons
            href={banner.primaryCta.href}
            label={banner.primaryCta.label}
            // An empty link means the WhatsApp number from Site & menus (a contact setting).
            secondary={{ label: banner.secondaryCta.label, href: banner.secondaryCta.href.trim() || WHATSAPP_URL }}
          />
        </div>
      </div>
    </section>
  );
}
