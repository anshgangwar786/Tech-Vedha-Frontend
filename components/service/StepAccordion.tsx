"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import Chip from "@/components/ui/Chip";
import { NUMBER, SMART_ANIMATE } from "@/components/ui/styles";
import type { ProcessTrack } from "@/data/service-pages";
import { cx } from "@/lib/cx";
import { stepNumber } from "@/lib/utils";

type StepAccordionProps = { steps: ProcessTrack["steps"] };

/**
 * Single-open step list where one step is always open (the first by default). Every open body
 * gets the height of the tallest one, so switching steps never changes the list's total height
 * and the page below doesn't shift. Closed bodies stay in the HTML (inert) for search engines.
 */
export default function StepAccordion({ steps }: StepAccordionProps) {
  const [open, setOpen] = useState(0);
  const [bodyHeight, setBodyHeight] = useState<number | null>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const baseId = useId();

  useLayoutEffect(() => {
    const nodes = bodyRefs.current.filter((node): node is HTMLDivElement => node !== null);
    const measure = () => setBodyHeight(Math.max(0, ...nodes.map((node) => node.offsetHeight)));
    measure();
    const observer = new ResizeObserver(measure);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, index) => {
        const isOpen = index === open;
        const buttonId = `${baseId}-step-${index}`;
        const bodyId = `${baseId}-body-${index}`;
        return (
          <li
            key={step.title}
            className={cx(
              "group rounded-[20px] border transition-colors duration-250",
              isOpen ? "border-brand/50 bg-surface-raised" : "border-line bg-surface hover:border-brand/45",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => setOpen(index)}
                className={cx(
                  "flex min-h-16 w-full items-center gap-4 px-5 py-4 text-left sm:min-h-[72px] sm:gap-5 sm:px-6",
                  isOpen ? "cursor-default" : "cursor-pointer",
                )}
              >
                <span className={cx(NUMBER, "w-9 shrink-0 text-[26px] sm:w-10 sm:text-[28px]")}>{stepNumber(index)}</span>
                <span className="font-display text-[22px] text-fg max-sm:text-xl">{step.title}</span>
                <span
                  aria-hidden
                  className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-colors group-hover:text-fg"
                >
                  {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
            </h3>
            <div
              id={bodyId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              style={{ height: isOpen ? (bodyHeight ?? "auto") : 0 }}
              className={cx("overflow-hidden transition-[height]", SMART_ANIMATE)}
            >
              <div
                ref={(node) => {
                  bodyRefs.current[index] = node;
                }}
                className="px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-[84px]"
              >
                <p className="max-w-[520px] text-base leading-[1.6] text-fg-muted">{step.summary}</p>
                <ul aria-label="Deliverables" className="mt-3.5 flex flex-wrap gap-2">
                  {step.deliverables.map((deliverable) => (
                    <li key={deliverable}>
                      <Chip className="border border-line">{deliverable}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
