"use client";

import { useId, useState } from "react";
import { ArrowDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import StoryCard from "@/components/home/testimonials/StoryCard";
import { storiesSection, type StoriesContent, type Story } from "@/data/stories";
import { cx } from "@/lib/cx";

const COLUMNS = [0, 1, 2] as const;

type StoryWallProps = {
  /** The page's own "Client stories" section (bundled copy when omitted). */
  content?: StoriesContent;
  /** Filter selected on first render (a service page can open on its own stories). */
  initialFilter?: string;
};

const BUNDLED = storiesSection();

const FIXED_COLUMNS: Record<string, number> = { left: 0, middle: 1, right: 2 };

/** Rough height of a card, to keep the three columns even. */
function weight(story: Story) {
  const base = story.kind === "photo" && story.photo ? 3.2 : story.kind === "featured" ? 2.2 : story.kind === "stat" && story.stat ? 1.6 : 1.1;
  return base + story.quote.length / 220;
}

/**
 * Column of each card on desktop: its chosen column, or (for "auto") the shortest column so far. Cards keep their
 * order within a column, so adding or removing a card re-balances the wall by itself.
 */
function placeInColumns(stories: Story[]): number[] {
  const heights = [0, 0, 0];
  return stories.map((story) => {
    const fixed = FIXED_COLUMNS[story.column];
    const column = fixed ?? heights.indexOf(Math.min(...heights));
    heights[column] += weight(story);
    return column;
  });
}

/** Client stories with service filter chips and a "show more" reveal. */
export default function StoryWall({ content = BUNDLED, initialFilter }: StoryWallProps) {
  const copy = content;
  const STORIES = content.items;
  const filters = [...new Set(content.filters.map((option) => option.trim()).filter(Boolean))];
  /** The first filter shows every story. */
  const ALL = filters[0] ?? "";
  const [filter, setFilter] = useState<string>(initialFilter && filters.includes(initialFilter) ? initialFilter : ALL);
  const [expanded, setExpanded] = useState(false);
  const listId = useId();

  // A card without a quote is a half-written draft: left out.
  const visible = STORIES.filter((story) => story.quote.trim());
  const stories = filter === ALL ? visible : visible.filter((story) => story.category.trim() === filter);
  const collapsible = stories.length > 3 && !expanded;
  // The full wall follows each card's chosen column ("auto" = the shortest one); a filtered subset flows left to right.
  const columns = filter === ALL ? placeInColumns(stories) : stories.map((_, index) => index % COLUMNS.length);
  const columnOf = (_story: Story, index: number) => columns[index];

  return (
    <>
      <SectionHeader
        id="stories-title"
        eyebrow={copy.eyebrow}
        title={copy.title}
        aside={
          <div
            role="group"
            aria-label={copy.a11y.filtersLabel}
            className="flex flex-wrap gap-2 max-sm:flex-nowrap max-sm:scroll-row md:justify-end"
          >
            {filters.length > 1 && filters.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={filter === option}
                aria-controls={listId}
                onClick={() => setFilter(option)}
                className={cx(
                  "h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                  filter === option
                    ? "border-transparent bg-primary text-white"
                    : "border-line text-fg-muted hover:border-brand hover:text-fg",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        }
      />

      {/* The collapse clip lives on this wrapper, not the grid: ScrollReveal adds `is-inview` to the
          grid's class list, and a changing React className would wipe it and re-hide the cards.
          Threshold 0: on mobile the single-column grid is many times taller than the 560px clip, so
          the default 15% visibility is never reached and the cards would stay hidden. */}
      <div className={cx("relative mt-8 sm:mt-10", collapsible && "max-h-[560px] overflow-hidden")}>
        <div
          id={listId}
          data-reveal-stagger
          data-reveal-threshold="0"
          className="grid items-start gap-5 lg:grid-cols-3"
        >
          {COLUMNS.map((column) => (
            <div key={column} className="flex flex-col gap-5">
              {stories.map((story, index) =>
                columnOf(story, index) === column ? <StoryCard key={index} story={story} /> : null,
              )}
            </div>
          ))}
        </div>

        {collapsible && (
          <div className="absolute inset-x-0 bottom-0 flex h-40 items-end justify-center bg-linear-to-t from-bg to-transparent">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-controls={listId}
              aria-expanded={false}
              className="mb-2 inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-[15px] font-medium text-fg transition-colors hover:border-brand"
            >
              {copy.showMore}
              <ArrowDown aria-hidden className="size-4" />
            </button>
          </div>
        )}
      </div>

      {copy.note && <p className="mt-6 text-center text-xs text-fg-subtle">{copy.note}</p>}
    </>
  );
}
