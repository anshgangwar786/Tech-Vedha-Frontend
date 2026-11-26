"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/** Pauses every marquee inside the element with id `targetId` (WCAG 2.2.2: moving content can be stopped). */
export default function MarqueePauseButton({
  targetId,
  pauseLabel,
  playLabel,
}: {
  targetId: string;
  /** Screen-reader names of the button (Homepage → Why Tech Vedha). */
  pauseLabel: string;
  playLabel: string;
}) {
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const next = !paused;
    document.getElementById(targetId)?.classList.toggle("marquee-paused", next);
    setPaused(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? playLabel : pauseLabel}
      className="grid size-10 place-items-center rounded-full border border-line bg-surface-raised text-fg transition-colors hover:border-brand sm:size-8"
    >
      {paused ? <Play aria-hidden className="size-3 fill-current" /> : <Pause aria-hidden className="size-3 fill-current" />}
    </button>
  );
}
