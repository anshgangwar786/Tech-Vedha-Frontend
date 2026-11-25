"use client";

import { useId, useState } from "react";
import { ArrowDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import StoryCard from "@/components/home/testimonials/StoryCard";
import { STORIES as BUNDLED_STORIES, STORY_FILTERS, type Story, type StoryFilter } from "@/data/home";
import { cx } from "@/lib/cx";

const COLUMNS = [0, 1, 2] as const;

type StoryWallProps = {
  /** Live stories from the admin (bundled copy when omitted). */
  STORIES?: Story[];
  /** Filter selected on first render (service pages open on their own stories). */
  initialFilter?: StoryFilter;
  /** Section heading, "show more" button and footnote (admin-edited). */
  copy?: StoryWallCopy;
};

type StoryWallCopy = { eyebrow: string; title: string[]; showMore: string; note: string };

const DEFAULT_COPY: StoryWallCopy = {
  eyebrow: "Client stories",
  title: ["In our clients'", "own words."],
  showMore: "Show more stories",
  note: "",
};

/** Client stories with service filter chips and a "show more" reveal. */
export default function StoryWall({ initialFilter = "All", STORIES = BUNDLED_STORIES, copy = DEFAULT_COPY }: StoryWallProps) {
  const [filter, setFilter] = useState<StoryFilter>(initialFilter);
  const [expanded, setExpanded] = useState(false);
  const listId = useId();

  const stories = filter === "All" ? STORIES : STORIES.filter((story) => story.category === filter);
  const collapsible = stories.length > 3 && !expanded;
  // The full wall follows the designed columns; a filtered subset flows left to right instead.
  const columnOf = (story: Story, index: number) => (filter === "All" ? story.column : index % COLUMNS.length);

  return (
    <>
      <SectionHeader
        id="stories-title"
        eyebrow={copy.eyebrow}
        title={copy.title}
        aside={
          <div
            role="group"
            aria-label="Filter stories by service"
            className="flex flex-wrap gap-2 max-sm:flex-nowrap max-sm:scroll-row md:justify-end"
          >
            {STORY_FILTERS.map((option) => (
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
              {stories
                .filter((story, index) => columnOf(story, index) === column)
                .map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
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
