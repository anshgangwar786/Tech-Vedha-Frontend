"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Chip from "@/components/ui/Chip";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import { SMART_ANIMATE } from "@/components/ui/styles";
import { PROCESS_STEPS as BUNDLED_PROCESS_STEPS, type ProcessStep, type ProcessStepId } from "@/data/home";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/lib/cx";

const AUTO_ADVANCE_MS = 5000;
/** Hovering must rest this long before a step opens, so sweeping across the row doesn't flicker. */
const HOVER_INTENT_MS = 80;
/** Fixed: steps are keyed by id in the admin, so their number never changes. */
const STEP_COUNT = BUNDLED_PROCESS_STEPS.length;


type ProcessStepperProps = {
  /** Live steps from the admin (bundled copy when omitted). */
  PROCESS_STEPS?: ProcessStep[];
  /** Server-rendered example per step. */
  visuals: Record<ProcessStepId, React.ReactNode>;
  /** Section heading and the label above each example (admin-edited). */
  header?: ProcessHeader;
};

type ProcessHeader = {
  eyebrow: string;
  title: string[];
  intro: string;
  exampleLabel: string;
  nextLabel: string;
  restartLabel: string;
  stepCounter: string;
};

const DEFAULT_HEADER: ProcessHeader = {
  eyebrow: "Process",
  title: ["From idea to launch,", "and beyond."],
  intro: "Six clear steps, with something you can review at every one.",
  exampleLabel: "Example project · Showroom app",
  nextLabel: "Next",
  restartLabel: "Start over",
  stepCounter: "Step {n} of {total}",
};

/** "Step {n} of {total}" with the numbers filled in. */
const stepLabel = (pattern: string, n: number, total: number) =>
  pattern.replaceAll("{n}", String(n)).replaceAll("{total}", String(total));

/** Horizontal swipe distance (px) that counts as "next / previous step" on touch screens. */
const SWIPE_MIN_PX = 50;

/**
 * Six-step process.
 * - Desktop (lg): an accordion row; the open step grows while the others shrink to 86 px columns. Steps open
 *   on hover, focus or click, and it advances every 5 s until the visitor takes over.
 * - Phones and tablets: a step rail to jump anywhere, one card at a time (swipe to move), and Prev / Next
 *   controls under the card. Every step shares one grid cell, so the card never changes height between steps.
 */
export default function ProcessStepper({ visuals, PROCESS_STEPS = BUNDLED_PROCESS_STEPS, header = DEFAULT_HEADER }: ProcessStepperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const railRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const inView = useInView(rootRef);
  const isLast = activeIndex === STEP_COUNT - 1;

  useEffect(() => {
    if (!autoplay || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Below lg only the open step is shown and steps differ in height, so advancing on its own would
    // shift the page under a reader's thumb. Phones and tablets step with the arrows instead.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % STEP_COUNT), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoplay, paused, inView]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // Keep the active rail chip in view. Scrolls the rail sideways only, never the page.
  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.children[activeIndex] as HTMLElement | undefined;
    if (!rail || !chip || rail.scrollWidth <= rail.clientWidth) return;
    const left = chip.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2;
    rail.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [activeIndex]);

  const goTo = (index: number) => {
    setAutoplay(false);
    setActiveIndex((index + STEP_COUNT) % STEP_COUNT);
  };

  const hoverStep = (index: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => goTo(index), HOVER_INTENT_MS);
  };

  const cancelHover = () => window.clearTimeout(hoverTimer.current);

  /** Swipe left / right on the card (phones and tablets). Stops at the first and last step. */
  const onTouchStart = (event: React.TouchEvent) => {
    // Let the code sample in the Build step scroll sideways on its own.
    if ((event.target as HTMLElement).closest("pre")) return;
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || window.matchMedia("(min-width: 1024px)").matches) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const next = activeIndex + (dx < 0 ? 1 : -1);
    if (next >= 0 && next < STEP_COUNT) goTo(next);
  };

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
        eyebrow={header.eyebrow}
        title={header.title}
        intro={header.intro}
        aside={
          <div className="hidden gap-2 lg:flex">
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

      {/* Phones and tablets: every step at a glance, tap to jump. */}
      <div
        ref={railRef}
        role="group"
        aria-label="Process steps"
        className="mt-8 flex gap-2 overflow-x-auto [scrollbar-width:none] max-sm:scroll-row sm:mt-10 lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {PROCESS_STEPS.map((step, index) => {
          const current = index === activeIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => goTo(index)}
              aria-current={current ? "step" : undefined}
              className={cx(
                "flex h-11 shrink-0 items-center gap-2 rounded-full border pr-4 pl-3 text-sm font-medium whitespace-nowrap transition-colors",
                SMART_ANIMATE,
                current
                  ? "border-transparent bg-primary text-white"
                  : index < activeIndex
                    ? "border-brand/40 bg-surface-raised text-fg"
                    : "border-line bg-surface text-fg-muted",
              )}
            >
              <span className={cx("font-display text-base font-light", current ? "text-white/80" : "text-brand")}>
                {step.number}
              </span>
              {step.title}
            </button>
          );
        })}
      </div>

      {/* Container units let each open panel keep its final width while its column animates.
          Below lg every step sits in the same grid cell: the card is as tall as the tallest step, so it never jumps. */}
      <ol
        data-reveal-stagger
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="mt-4 flex gap-3 [container-type:inline-size] max-lg:grid lg:mt-14 lg:h-[520px]"
      >
        {PROCESS_STEPS.map((step, index) => {
          const open = index === activeIndex;
          return (
            <li
              key={step.id}
              onPointerEnter={open ? undefined : (event) => event.pointerType !== "touch" && hoverStep(index)}
              onPointerLeave={cancelHover}
              className={cx(
                "relative min-w-0 overflow-hidden rounded-3xl border transition-[flex-grow,border-color] max-lg:[grid-area:1/1] lg:basis-[86px]",
                SMART_ANIMATE,
                open
                  ? "grow border-brand/70 bg-surface"
                  : "grow-0 border-line bg-surface hover:border-brand max-lg:pointer-events-none max-lg:invisible",
              )}
            >
              <StepPanel step={step} index={index} open={open} activeIndex={activeIndex} visual={visuals[step.id]} exampleLabel={header.exampleLabel} stepCounter={header.stepCounter} />
              <StepColumn step={step} open={open} done={index < activeIndex} onSelect={() => goTo(index)} />
            </li>
          );
        })}
      </ol>

      {/* Phones and tablets: controls in thumb reach, right under the card. */}
      <div className="mt-3 flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous step"
          className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-brand disabled:opacity-40"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <span aria-hidden className="flex w-full max-w-[160px] gap-1">
            {PROCESS_STEPS.map((step, index) => (
              <span
                key={step.id}
                className={cx(
                  "h-1 flex-1 rounded-full transition-colors",
                  SMART_ANIMATE,
                  index <= activeIndex ? "bg-brand" : "bg-line",
                )}
              />
            ))}
          </span>
          <span aria-live="polite" className="text-xs font-medium tracking-[0.12em] text-fg-subtle">
            <span className="text-fg">{PROCESS_STEPS[activeIndex].number}</span> / {String(STEP_COUNT).padStart(2, "0")}
            <span className="sr-only">: {PROCESS_STEPS[activeIndex].title}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => goTo(isLast ? 0 : activeIndex + 1)}
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary pr-4 pl-5 text-[15px] font-medium text-white shadow-[0_8px_24px_-12px_var(--glow)] transition hover:brightness-110"
        >
          {isLast ? (
            <>
              {header.restartLabel || "Start over"}
              <RotateCcw aria-hidden className="size-4" />
            </>
          ) : (
            <>
              {header.nextLabel || "Next"}
              <ChevronRight aria-hidden className="size-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

type StepPanelProps = {
  step: ProcessStep;
  index: number;
  open: boolean;
  activeIndex: number;
  visual: React.ReactNode;
  exampleLabel: string;
  stepCounter: string;
};

/** Expanded content. Fixed to the open width so the column reveals it instead of squashing it. */
function StepPanel({ step, index, open, activeIndex, visual, exampleLabel, stepCounter }: StepPanelProps) {
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
      <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
        <Eyebrow variant="dot">
          {step.number} · {step.title}
        </Eyebrow>
        <span aria-hidden className="hidden gap-1.5 sm:flex">
          {BUNDLED_PROCESS_STEPS.map((dot, dotIndex) => (
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
          "flex min-h-0 flex-1 flex-col items-center justify-center px-4 pt-4 transition-transform sm:px-6",
          SMART_ANIMATE,
          open ? "translate-y-0 delay-100" : "translate-y-3",
        )}
      >
        <p className="w-full max-w-[460px] pb-2 text-[11px] font-medium text-fg-subtle">{exampleLabel}</p>
        <div className="w-full max-w-[460px] rounded-[18px] border border-line bg-bg-deep p-3 shadow-[0_28px_60px_-28px_rgb(3_10_24/0.75)]">
          {visual}
        </div>
      </div>

      <div className="px-5 pt-4 pb-5 sm:px-8">
        <h3 className="flex items-baseline gap-4">
          <span className="font-display text-[40px] leading-none font-light text-brand sm:text-5xl">{step.number}</span>
          <span className="font-display text-[28px] tracking-[-0.01em] text-fg sm:text-[32px]">{step.title}</span>
        </h3>
        <p className="mt-2 max-w-[470px] text-base leading-[1.6] text-fg-muted sm:text-[17px]">{step.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {step.deliverables.map((deliverable, chipIndex) => (
            <Chip key={chipIndex} className="border border-line">
              {deliverable}
            </Chip>
          ))}
          <span className="ml-auto text-xs text-fg-subtle max-lg:hidden">
            {stepLabel(stepCounter, index + 1, STEP_COUNT)}
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
