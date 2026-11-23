"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { SMART_ANIMATE } from "@/components/ui/styles";
import { SERVICES, hasServicePage, serviceHref, type ServiceId } from "@/data/services";
import { cx } from "@/lib/cx";
import { arrowTarget } from "@/lib/utils";

type ServicesShowcaseProps = {
  /** Server-rendered illustration per service; only the active one is shown. */
  scenes: Record<ServiceId, React.ReactNode>;
};

/** Four-service switcher: hovering, focusing or selecting a card swaps the scene. */
export default function ServicesShowcase({ scenes }: ServicesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const active = SERVICES[activeIndex];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = arrowTarget(event, activeIndex, SERVICES.length);
    if (next === null) return;
    setActiveIndex(next);
    document.getElementById(`service-${SERVICES[next].id}`)?.focus();
  };

  return (
    <div className="reveal grid gap-6 pt-14 lg:grid-cols-[641fr_583fr] lg:gap-14">
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`service-${active.id}`}
        className="relative order-2 overflow-hidden rounded-3xl border border-line bg-[radial-gradient(60%_50%_at_50%_55%,var(--surface-raised),var(--bg)_80%)] lg:order-1 lg:h-[640px]"
      >
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div
          aria-hidden
          className="absolute bottom-[-130px] left-1/2 h-[260px] w-[80%] -translate-x-1/2 rounded-full bg-[#1446e0] opacity-45 blur-[60px]"
        />
        <div className="relative flex items-center justify-between border-b border-line px-6 py-5">
          <p className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.12em] text-fg-muted uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {active.number} · {active.wing}
          </p>
          <span aria-hidden className="flex gap-1.5">
            {SERVICES.map((service, index) => (
              <span
                key={service.id}
                className={cx("h-1 w-[22px] rounded-full", index === activeIndex ? "bg-accent" : "bg-line")}
              />
            ))}
          </span>
        </div>
        <div className="relative grid min-h-[480px] place-items-center p-6 sm:p-9 lg:h-[calc(100%-61px)]">
          {/* Keyed so each newly selected scene replays the entrance animation. */}
          <div key={active.id} className="grid w-full animate-scene-in place-items-center">
            {scenes[active.id]}
          </div>
        </div>
        {hasServicePage(active.id) && (
          <ButtonLink
            href={serviceHref(active.id)}
            variant="glass"
            size="sm"
            arrow
            className="absolute right-5 bottom-5 sm:right-6 sm:bottom-6"
          >
            Explore {active.title}
          </ButtonLink>
        )}
      </div>

      <div role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKeyDown} className="order-1 flex flex-col gap-3 lg:order-2">
        {SERVICES.map((service, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={service.id}
              id={`service-${service.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className={cx(
                "grid flex-1 scroll-mt-28 grid-cols-[48px_1fr_40px] items-center gap-5 rounded-[20px] border py-[22px] pr-[22px] pl-[26px] text-left transition",
                SMART_ANIMATE,
                selected ? "-translate-x-1 border-brand bg-surface-raised" : "border-line bg-surface hover:border-brand/60",
              )}
            >
              <span
                className={cx(
                  "font-display text-4xl leading-none font-light",
                  selected ? "text-fg" : "text-brand",
                )}
              >
                {service.number}
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium tracking-[0.12em] text-fg-subtle uppercase">{service.wing}</span>
                <span className="text-[19px] leading-[1.3] font-medium text-fg">{service.title}</span>
                <span className="text-[15px] leading-[1.55] text-fg-muted">{service.summary}</span>
              </span>
              <span
                aria-hidden
                className={cx(
                  "grid size-10 place-items-center rounded-full border transition-colors",
                  selected ? "border-transparent bg-primary text-white" : "border-line text-fg-muted",
                )}
              >
                {selected ? <ArrowRight className="size-4" /> : <ArrowUpRight className="size-4" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
