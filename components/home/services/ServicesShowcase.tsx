"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { SMART_ANIMATE } from "@/components/ui/styles";
import type { HomeServiceItem } from "@/data/home";
import { cx } from "@/lib/cx";
import { arrowTarget } from "@/lib/utils";

/** Width the scenes are drawn at. Narrower panels (phones, tablets) shrink the whole scene to fit. */
const SCENE_WIDTH = 480;

/**
 * Shrinks its content uniformly when the available width is under `width`, like a screenshot thumbnail.
 * `zoom` (not `transform: scale`) so the scene's layout height shrinks with it. Wider panels leave it untouched.
 */
function FitToWidth({
  width,
  children,
}: {
  width: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Only below the desktop layout: from lg up the scenes are drawn for the panel as it is.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const observer = new ResizeObserver(([entry]) =>
      setScale(
        desktop.matches ? 1 : Math.min(1, entry.contentRect.width / width),
      ),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  // grid-cols-1 = minmax(0, 1fr): the track must not grow to the scene's min-content, or we'd measure that instead.
  return (
    <div ref={ref} className="grid w-full grid-cols-1 place-items-center">
      {scale < 1 ? (
        <div className="grid place-items-center" style={{ width, zoom: scale }}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

type ServicesShowcaseProps = {
  /** The homepage's own service cards (Homepage → Services). */
  items: HomeServiceItem[];
  /** Server-rendered illustration per card, same order; only the active one is shown. */
  scenes: React.ReactNode[];
  /** Word before the service name on the service-page button ("Explore App Development"). */
  exploreLabel: string;
  /** Screen-reader name of the card list. */
  listLabel: string;
};

/** Element id of a card: links like /#service-<anchor> open it. */
const cardId = (item: HomeServiceItem, index: number) => `service-${item.anchor.trim() || index + 1}`;

/**
 * Service switcher: hovering, focusing or selecting a card swaps the scene.
 * Desktop: cards on the right, scene on the left (the scene panel grows with the list when admins add services).
 * Below `lg`: compact tiles (two across, up to four across on tablets; an odd last tile spans the row)
 * with the scene directly underneath, so the change is visible right where the visitor tapped.
 */
export default function ServicesShowcase({ scenes, items: SERVICES, exploreLabel, listLabel }: ServicesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const active = SERVICES[activeIndex];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = arrowTarget(event, activeIndex, SERVICES.length);
    if (next === null) return;
    setActiveIndex(next);
    document.getElementById(cardId(SERVICES[next], next))?.focus();
  };

  return (
    <div className="reveal grid gap-3 pt-10 sm:gap-4 sm:pt-14 lg:grid-cols-[641fr_583fr] lg:gap-14">
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={cardId(active, activeIndex)}
        className="relative order-2 overflow-hidden rounded-3xl border border-line bg-[radial-gradient(60%_50%_at_50%_55%,var(--surface-raised),var(--bg)_80%)] lg:order-1 lg:flex lg:min-h-[640px] lg:flex-col"
      >
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div
          aria-hidden
          className="absolute bottom-[-130px] left-1/2 h-[260px] w-[80%] -translate-x-1/2 rounded-full bg-[#1446e0] opacity-45 blur-[60px]"
        />
        <div className="relative flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6 sm:py-5">
          <p className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.12em] text-fg-muted uppercase">
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full bg-accent"
            />
            {active.number} · {active.wing}
          </p>
          <span aria-hidden className="flex shrink-0 gap-1.5">
            {SERVICES.map((service, index) => (
              <span
                key={index}
                className={cx(
                  "h-1 w-4 rounded-full sm:w-[22px]",
                  index === activeIndex ? "bg-accent" : "bg-line",
                )}
              />
            ))}
          </span>
        </div>
        {/* Below lg the tiles drop the summary, so it is shown here instead. */}
        <p
          key={`summary-${activeIndex}`}
          className="relative animate-scene-in px-5 pt-4 text-[15px] leading-[1.55] text-fg-muted sm:px-6 lg:hidden"
        >
          {active.summary}
        </p>
        {active.image ? (
          // An uploaded card image fills the panel under the top bar (Homepage → Services → card → Card image).
          <div key={activeIndex} className="relative aspect-[4/3] w-full animate-scene-in lg:aspect-auto lg:flex-1">
            <Image
              src={active.image.src}
              alt={active.image.alt}
              fill
              sizes="(min-width: 1024px) 641px, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative grid grid-cols-1 place-items-center px-4 py-6 sm:p-9 lg:flex-1">
            {/* Keyed so each newly selected scene replays the entrance animation. */}
            <div
              key={activeIndex}
              className="grid w-full animate-scene-in grid-cols-1 place-items-center"
            >
              <FitToWidth width={SCENE_WIDTH}>{scenes[activeIndex]}</FitToWidth>
            </div>
          </div>
        )}
        {active.href.trim() && (
          <div className="relative px-4 pb-4 sm:px-6 sm:pb-6 lg:absolute lg:right-6 lg:bottom-6 lg:p-0">
            <ButtonLink
              href={active.href}
              variant="glass"
              size="sm"
              arrow
              className="max-lg:h-11 max-lg:w-full"
            >
              {exploreLabel} {active.title}
            </ButtonLink>
          </div>
        )}
      </div>

      <div
        role="tablist"
        aria-label={listLabel}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        // Tablets: one row when it fits (up to four), otherwise three across.
        style={
          {
            "--tiles": SERVICES.length <= 4 ? SERVICES.length : 3,
          } as React.CSSProperties
        }
        className="order-1 grid grid-cols-2 gap-2.5 md:grid-cols-[repeat(var(--tiles),minmax(0,1fr))] lg:order-2 lg:flex lg:flex-col lg:gap-3"
      >
        {SERVICES.map((service, index) => {
          const selected = index === activeIndex;
          const linked = Boolean(service.href.trim());
          return (
            // Wrapper so the arrow can be a real link: links can't sit inside the tab <button>.
            <div
              key={index}
              role="presentation"
              className={cx(
                "relative flex",
                // An odd tile left alone on the last row spans it instead of leaving a gap (2-up and 3-up grids).
                "max-md:last:odd:col-span-full",
                SERVICES.length > 4 &&
                  SERVICES.length % 3 === 1 &&
                  "md:max-lg:last:col-span-full",
                "transition-transform lg:flex-1",
                SMART_ANIMATE,
                selected && "lg:-translate-x-1",
              )}
            >
              <button
                id={cardId(service, index)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={cx(
                  "flex min-h-[104px] w-full scroll-mt-28 flex-col items-start gap-2 rounded-[18px] border p-4 text-left transition",
                  "lg:grid lg:min-h-auto lg:grid-cols-[48px_1fr_40px] lg:items-center lg:gap-5 lg:rounded-[20px] lg:py-[22px] lg:pr-[22px] lg:pl-[26px]",
                  SMART_ANIMATE,
                  selected
                    ? "border-brand bg-surface-raised"
                    : "border-line bg-surface hover:border-brand/60",
                )}
              >
                <span
                  className={cx(
                    "font-display text-[28px] leading-none font-light lg:text-4xl",
                    selected ? "text-fg" : "text-brand",
                  )}
                >
                  {service.number}
                </span>
                <span className="flex flex-col gap-1 lg:gap-1.5">
                  <span className="text-[11px] font-medium tracking-[0.12em] text-fg-subtle uppercase">
                    {service.wing}
                  </span>
                  <span className="text-[15px] leading-[1.3] font-medium text-fg lg:text-[19px]">
                    {service.title}
                  </span>
                  <span className="hidden text-[15px] leading-[1.55] text-fg-muted lg:block">
                    {service.summary}
                  </span>
                </span>
                {/* With a page, the arrow is the link drawn over this column (below); without one it stays decorative. */}
                <span
                  aria-hidden
                  className={cx(
                    "hidden size-10 place-items-center rounded-full border transition-colors lg:grid",
                    linked && "invisible",
                    selected
                      ? "border-transparent bg-primary text-white"
                      : "border-line text-fg-muted",
                  )}
                >
                  {selected ? (
                    <ArrowRight className="size-4" />
                  ) : (
                    <ArrowUpRight className="size-4" />
                  )}
                </span>
              </button>
              {linked && (
                <Link
                  href={service.href}
                  aria-label={`${exploreLabel} ${service.title}`}
                  // The panel's "Explore …" button is the keyboard route; this one is for pointer users.
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cx(
                    "absolute top-1/2 right-[22px] hidden size-10 -translate-y-1/2 place-items-center rounded-full border transition-colors lg:grid",
                    selected
                      ? "border-transparent bg-primary text-white hover:brightness-110"
                      : "border-line text-fg-muted hover:border-brand hover:text-brand",
                  )}
                >
                  {selected ? (
                    <ArrowRight className="size-4" />
                  ) : (
                    <ArrowUpRight className="size-4" />
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
