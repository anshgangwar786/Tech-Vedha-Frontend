"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/** Flips <html data-theme> and remembers the choice. Icons swap via CSS, so server and client markup match. */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-brand"
    >
      <Sun aria-hidden className="hidden size-[17px] dark:block" />
      <Moon aria-hidden className="size-[17px] dark:hidden" />
    </button>
  );
}
