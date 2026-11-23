"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import Chip from "@/components/ui/Chip";
import Eyebrow from "@/components/ui/Eyebrow";
import { HIGHLIGHT, SMART_ANIMATE } from "@/components/ui/styles";
import { LOOP_EXAMPLE_DETAIL, LOOP_STEPS } from "@/data/about";
import { SERVICES, serviceHref } from "@/data/services";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/lib/cx";
import { arrowTarget } from "@/lib/utils";

type Mode = "covers" | "example";

/** Prototype timing: each step holds for 4 s, then the loop moves on. */
const AUTO_ADVANCE_MS = 4000;

/** Where each step's tab sits around the ring (centre point, % of the ring box), from the Figma layout. */
const TAB_POSITIONS = [
  { left: "50%", top: "12%" },
  { left: "85%", top: "50%" },
  { left: "50%", top: "88%" },
  { left: "16%", top: "50%" },
];

/** Ring geometry in a 620 × 620 box (Figma "About / Loop" vectors). */
const CENTER = 310;
const RING_R = 235.6;
const QUARTER = (2 * Math.PI * RING_R) / 4;
/** Figma dash pattern per step: [155·n, 620]. Figma fits it as four repeats round the ring, centred on each step. */
const DASH_GAP = 620;
const DASH_STEP = 155;

/** Lit share of each quarter: grows step by step, and the whole ring lights up on the last step. */
function arcDash(step: number) {
  if (step >= LOOP_STEPS.length - 1) return { dasharray: `${QUARTER} 0`, dashoffset: 0 };
  const dash = DASH_STEP * (step + 1);
  const lit = (dash / (dash + DASH_GAP)) * QUARTER;
  return { dasharray: `${lit} ${QUARTER - lit}`, dashoffset: lit / 2 };
}

function Ring({ step, slow }: { step: number; slow: boolean }) {
  const { dasharray, dashoffset } = arcDash(step);
  return (
    <svg aria-hidden viewBox="0 0 620 620" fill="none" className="absolute inset-0 size-full overflow-visible">
      <circle
        cx={CENTER}
        cy={CENTER}
        r={285.2}
        strokeWidth={1.86}
        strokeDasharray="2.48 12.4"
        className="stroke-[#b7ccea] dark:stroke-line"
      />
      <circle cx={CENTER} cy={CENTER} r={RING_R} strokeWidth={2.79} className="stroke-[#b7ccea] dark:stroke-line" />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={173.6}
        strokeWidth={1.86}
        strokeDasharray="4.96 8.68"
        className="stroke-[#b7ccea] dark:stroke-line"
      />
      {/* Progress light: a lit segment centred on every step, widening as the loop advances. */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RING_R}
        strokeWidth={3.72}
        strokeLinecap="round"
        strokeDasharray={dasharray}
        strokeDashoffset={dashoffset}
        className={cx(
          "stroke-brand transition-[stroke-dasharray,stroke-dashoffset]",
          SMART_ANIMATE,
          slow && "duration-600",
        )}
      />
    </svg>
  );
}

type LoopExplorerProps = {
  /** Section heading block shown above the view toggle (server-rendered). */
  heading: React.ReactNode;
};

/** "One loop. Every wing.": view toggle, step panel and the step ring. */
export default function LoopExplorer({ heading }: LoopExplorerProps) {
  const [mode, setMode] = useState<Mode>("covers");
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, 0.4);
  const baseId = useId();

  const goTo = (next: number) => {
    setStep((next + LOOP_STEPS.length) % LOOP_STEPS.length);
  };

  /** Any visitor input takes over from the auto-advance for good (prototype: Auto=On → Off). */
  const select = (next: number) => {
    setAuto(false);
    goTo(next);
  };

  useEffect(() => {
    if (!auto || !inView || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => goTo(step + 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [auto, inView, step]);

  const onTabKeyDown = (event: React.KeyboardEvent) => {
    const next = arrowTarget(event, step, LOOP_STEPS.length);
    if (next === null) return;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const current = LOOP_STEPS[step];
  const service = SERVICES.find((item) => item.id === current.service)!;
  const content =
    mode === "covers"
      ? current.covers
      : { title: current.example.title, detail: LOOP_EXAMPLE_DETAIL, tags: current.example.tags };
  const label =
    mode === "covers"
      ? `Step ${step + 1} of ${LOOP_STEPS.length}`
      : `Example · New showroom · Step ${step + 1} of ${LOOP_STEPS.length}`;

  return (
    <div ref={rootRef} className="grid items-center gap-16 lg:grid-cols-[544fr_664fr] lg:gap-[72px]">
      {/* Left column: heading, view toggle and the step panel. */}
      <div className="flex flex-col items-start gap-[22px]">
        {heading}
        <div
          role="group"
          aria-label="Loop view"
          className="flex gap-1 rounded-full border border-line bg-[linear-gradient(rgb(120_180_255/0.07),transparent_45%)] bg-surface p-1 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] dark:drop-shadow-[0_30px_30px_rgb(0_0_0/0.7)]"
        >
          {(
            [
              ["covers", "What it covers"],
              ["example", "Example: a new showroom"],
            ] as const
          ).map(([value, text]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => {
                setAuto(false);
                setMode(value);
              }}
              className={cx(
                "h-10 rounded-full px-4 text-sm font-medium transition-colors",
                SMART_ANIMATE,
                mode === value ? "bg-primary text-white" : "text-fg-muted hover:text-fg",
              )}
            >
              {text}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${step}`}
          className="mt-3 w-full overflow-hidden rounded-3xl border border-line bg-glass bg-grid p-7 backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-4 border-b border-line pb-[18px]">
            <Eyebrow variant="dot">{label}</Eyebrow>
            <span aria-hidden className="flex gap-[5px]">
              {LOOP_STEPS.map((item, index) => (
                <span
                  key={item.service}
                  className={cx(
                    "h-[3px] w-[22px] rounded-sm transition-colors",
                    SMART_ANIMATE,
                    index === step ? "bg-brand" : "bg-line",
                  )}
                />
              ))}
            </span>
          </div>

          <div key={`${mode}-${step}`} className="mt-[18px] flex animate-scene-in flex-col gap-3.5">
            <h3 className="flex items-baseline gap-2.5 font-display text-[28px] leading-[1.15] text-fg">
              <span className="text-[44px] leading-none font-light text-brand">{step + 1}</span>
              {content.title}
            </h3>
            <p className="max-w-[440px] text-base leading-[1.6] text-fg-muted">{content.detail}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ul aria-label="Includes" className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <li key={tag}>
                    <Chip className="h-7 border border-line text-fg-muted">{tag}</Chip>
                  </li>
                ))}
              </ul>
              <Link
                href={serviceHref(service.id)}
                className="inline-flex h-9 items-center rounded-full bg-[#0b1a3a] px-4 text-sm font-medium text-white transition-transform duration-250 ease-out hover:-translate-y-0.5 dark:bg-white dark:text-[#0b1a3a]"
              >
                {service.short[0]} <span aria-hidden>&nbsp;→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: the ring, with one tab per step placed around it (a 2 × 2 grid below it on phones). */}
      <div data-reveal="zoom" className="reveal relative mx-auto w-full max-w-[620px]">
        <div className="relative aspect-square">
          <div
            aria-hidden
            className="absolute inset-[20%] rounded-full bg-[radial-gradient(closest-side,#1e9bf0,#1971e8_27%,#1446e0_55%,transparent)] opacity-30 blur-[40px] dark:opacity-50"
          />
          <Ring step={step} slow={auto} />
          <div className="absolute inset-[32%] grid place-items-center rounded-full border border-line bg-glass text-center backdrop-blur-md">
            <p className="flex flex-col items-center gap-1.5 font-display text-[clamp(1rem,3.5vw,1.375rem)] leading-[1.15] text-fg">
              <span
                aria-hidden
                className="bg-linear-[132deg] from-[#1e9bf0] to-[#1446e0] bg-clip-text text-[28px] leading-none font-light text-transparent"
              >
                ✦
              </span>
              <span>
                Client <br />
                success
              </span>
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Steps in the loop"
          className="mt-6 grid grid-cols-2 gap-2 md:absolute md:inset-0 md:mt-0 md:block"
        >
          {LOOP_STEPS.map((item, index) => {
            const selected = index === step;
            return (
              <button
                key={item.service}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onPointerEnter={(event) => event.pointerType === "mouse" && index !== step && select(index)}
                onKeyDown={onTabKeyDown}
                style={{ left: TAB_POSITIONS[index].left, top: TAB_POSITIONS[index].top }}
                className={cx(
                  "flex flex-col items-center gap-1 rounded-2xl border px-4 py-3 text-center transition-[background-color,border-color,box-shadow,color] md:absolute md:min-w-[168px] md:-translate-1/2 md:whitespace-nowrap",
                  SMART_ANIMATE,
                  selected
                    ? cx(HIGHLIGHT, "border-transparent shadow-[0_0_18px_rgb(30_155_240/0.45)]")
                    : "border-line bg-surface shadow-[0_14px_28px_rgb(3_10_24/0.12)] hover:border-brand/45 dark:shadow-[0_14px_28px_rgb(3_10_24/0.5)]",
                )}
              >
                <span
                  className={cx(
                    "text-[10.5px] font-medium tracking-[0.12em] uppercase",
                    selected ? "text-white/85" : "text-brand",
                  )}
                >
                  Step {index + 1} · {item.wing}
                </span>
                <span className={cx("font-display text-[17px] leading-[1.2]", selected ? "text-white" : "text-fg")}>
                  {item.covers.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
