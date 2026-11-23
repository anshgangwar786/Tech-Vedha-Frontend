"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Chip from "@/components/ui/Chip";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import { SMART_ANIMATE } from "@/components/ui/styles";
import { PROCESS_STEPS, type ProcessStep, type ProcessStepId } from "@/data/home";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/lib/cx";

const AUTO_ADVANCE_MS = 5000;
/** Hovering must rest this long before a step opens, so sweeping across the row doesn't flicker. */
const HOVER_INTENT_MS = 80;
const STEP_COUNT = PROCESS_STEPS.length;


type ProcessStepperProps = {
  /** Server-rendered example per step. */
  visuals: Record<ProcessStepId, React.ReactNode>;
};

/**
 * Six-step process as an accordion row: the open step grows while the others shrink to 86 px columns.
 * Steps open on hover, focus or click; it also advances every 5 s until the visitor takes over.
 */
export default function ProcessStepper({ visuals }: ProcessStepperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const inView = useInView(rootRef);

  useEffect(() => {
    if (!autoplay || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % STEP_COUNT), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoplay, paused, inView]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const goTo = (index: number) => {
    setAutoplay(false);
    setActiveIndex((index + STEP_COUNT) % STEP_COUNT);
  };

  const hoverStep = (index: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => goTo(index), HOVER_INTENT_MS);
  };

  const cancelHover = () => window.clearTimeout(hoverTimer.current);

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <SectionHeader
        id="process-title"
        eyebrow="Process"
        title={["From idea to launch,", "and beyond."]}
        intro="Six clear steps, with something you can review at every one."
        aside={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous step"
              className="grid size-11 place-items-center rounded-full border border-line text-fg transition-colors hover:border-brand"
            >
              <ChevronLeft aria-hidden className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next step"
              className="grid size-11 place-items-center rounded-full border border-line text-fg transition-colors hover:border-brand"
            >
              <ChevronRight aria-hidden className="size-4" />
            </button>
          </div>
        }
      />

      {/* Container units let each open panel keep its final width while its column animates. */}
      <ol data-reveal-stagger className="mt-14 flex gap-3 [container-type:inline-size] lg:h-[520px]">
        {PROCESS_STEPS.map((step, index) => {
          const open = index === activeIndex;
          return (
            <li
              key={step.id}
              onPointerEnter={open ? undefined : () => hoverStep(index)}
              onPointerLeave={cancelHover}
              className={cx(
                "relative min-w-0 overflow-hidden rounded-3xl border transition-[flex-grow,border-color] lg:basis-[86px]",
                SMART_ANIMATE,
                open ? "grow border-brand/70 bg-surface" : "grow-0 border-line bg-surface hover:border-brand max-lg:hidden",
              )}
            >
              <StepPanel step={step} index={index} open={open} activeIndex={activeIndex} visual={visuals[step.id]} />
              <StepColumn step={step} open={open} done={index < activeIndex} onSelect={() => goTo(index)} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

type StepPanelProps = {
  step: ProcessStep;
  index: number;
  open: boolean;
  activeIndex: number;
  visual: React.ReactNode;
};

/** Expanded content. Fixed to the open width so the column reveals it instead of squashing it. */
function StepPanel({ step, index, open, activeIndex, visual }: StepPanelProps) {
  return (
    <article
      aria-hidden={!open}
      inert={!open}
      className={cx(
        "relative isolate flex h-full w-full flex-col transition-opacity lg:absolute lg:inset-y-0 lg:left-0 lg:w-[calc(100cqw-490px)]",
        SMART_ANIMATE,
        open ? "opacity-100 delay-100" : "pointer-events-none opacity-0",
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_40%_95%,rgb(30_155_240/0.18),transparent)]"
      />
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <Eyebrow variant="dot">
          {step.number} · {step.title}
        </Eyebrow>
        <span aria-hidden className="hidden gap-1.5 sm:flex">
          {PROCESS_STEPS.map((dot, dotIndex) => (
            <span
              key={dot.id}
              className={cx(
                "h-0.5 w-6 rounded-full transition-colors",
                SMART_ANIMATE,
                dotIndex === activeIndex ? "bg-primary" : dotIndex < activeIndex ? "bg-brand" : "bg-line",
              )}
            />
          ))}
        </span>
      </div>

      <div
        aria-hidden
        className={cx(
          "flex min-h-0 flex-1 flex-col items-center justify-center px-6 pt-4 transition-transform",
          SMART_ANIMATE,
          open ? "translate-y-0 delay-100" : "translate-y-3",
        )}
      >
        <p className="w-full max-w-[460px] pb-2 text-[11px] font-medium text-fg-subtle">Example project · Showroom app</p>
        <div className="w-full max-w-[460px] rounded-[18px] border border-line bg-bg-deep p-3 shadow-[0_28px_60px_-28px_rgb(3_10_24/0.75)]">
          {visual}
        </div>
      </div>

      <div className="px-6 pt-4 pb-5 sm:px-8">
        <h3 className="flex items-baseline gap-4">
          <span className="font-display text-5xl leading-none font-light text-brand">{step.number}</span>
          <span className="font-display text-[32px] tracking-[-0.01em] text-fg">{step.title}</span>
        </h3>
        <p className="mt-2 max-w-[470px] text-[17px] leading-[1.6] text-fg-muted">{step.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {step.deliverables.map((deliverable) => (
            <Chip key={deliverable} className="border border-line">
              {deliverable}
            </Chip>
          ))}
          <span className="ml-auto text-xs text-fg-subtle">
            Step {index + 1} of {STEP_COUNT}
          </span>
        </div>
      </div>
    </article>
  );
}

type StepColumnProps = { step: ProcessStep; open: boolean; done: boolean; onSelect: () => void };

/** Collapsed 86 px column: number, centre dot and vertical label. Fades out as its step opens. */
function StepColumn({ step, open, done, onSelect }: StepColumnProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      tabIndex={open ? -1 : 0}
      aria-hidden={open}
      aria-label={`Step ${step.number}: ${step.title}`}
      className={cx(
        "absolute inset-y-0 left-0 hidden w-[86px] flex-col items-center justify-between py-5 transition-opacity lg:flex",
        SMART_ANIMATE,
        open ? "pointer-events-none opacity-0" : "opacity-100 delay-150",
      )}
    >
      <span className="font-display text-[28px] leading-none font-light text-fg-subtle">{step.number}</span>
      {/* Centred on the column (not between number and label) so dots line up across steps. */}
      <span
        aria-hidden
        className={cx("absolute top-1/2 left-1/2 size-1.5 -translate-1/2 rounded-full", done ? "bg-accent" : "bg-accent/45")}
      />
      <span className="rotate-180 text-[15px] font-medium tracking-[0.02em] text-fg-muted [writing-mode:vertical-rl]">
        {step.title}
      </span>
    </button>
  );
}
