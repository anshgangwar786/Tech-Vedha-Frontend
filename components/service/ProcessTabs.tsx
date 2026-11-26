"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { arrowTarget } from "@/lib/utils";
import { SMART_ANIMATE } from "@/components/ui/styles";

type ProcessTabsProps = {
  /** Screen-reader name of the track picker (the page's own copy). */
  label: string;
  /** Section heading block shown above the tabs (server-rendered). */
  heading: React.ReactNode;
  tabs: { id: string; label: string }[];
  /** One server-rendered panel per tab, in the same order. Inactive panels stay in the HTML. */
  panels: React.ReactNode[];
};

/** Vertical track picker ("New app" / "Existing app") that swaps the step list beside it. */
export default function ProcessTabs({ label, heading, tabs, panels }: ProcessTabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const onKeyDown = (event: React.KeyboardEvent) => {
    const next = arrowTarget(event, active, tabs.length);
    if (next === null) return;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 sm:gap-12 lg:grid-cols-[513fr_695fr] lg:gap-[72px]">
      <div className="flex flex-col gap-5 sm:gap-[22px] lg:sticky lg:top-28 lg:self-start">
        {heading}
        <div role="tablist" aria-orientation="vertical" aria-label={label} className="flex flex-col gap-2 pt-2">
          {tabs.map((tab, index) => {
            const selected = index === active;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
                className={cx(
                  "flex min-h-[52px] items-center justify-between rounded-full border px-5 text-left text-[15px] font-medium transition-colors",
                  SMART_ANIMATE,
                  selected
                    ? "border-transparent bg-linear-175 from-[#1e9bf0] to-[#1446e0] text-white"
                    : "border-line text-fg-muted hover:border-brand/45 hover:text-fg",
                )}
              >
                {tab.label}
                {selected && <ArrowRight aria-hidden className="size-4" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panels share one grid cell so the column is always as tall as the tallest track:
          switching tracks never changes the section height. */}
      <div className="reveal grid">
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`${baseId}-panel-${tab.id}`}
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              aria-hidden={!selected}
              inert={!selected}
              className={cx(
                "[grid-area:1/1] transition-[opacity,translate,visibility]",
                SMART_ANIMATE,
                selected ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0",
              )}
            >
              {panels[index]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
