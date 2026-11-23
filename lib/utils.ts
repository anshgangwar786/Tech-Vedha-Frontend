/** Two-digit step number: 0 → "01". */
export const stepNumber = (index: number) => String(index + 1).padStart(2, "0");

/** Opens absolute (http) links in a new tab; internal and mailto/tel links stay in place. */
export const externalLinkProps = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

const ARROW_STEPS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/**
 * Arrow-key navigation for tab lists: returns the index to move to (wrapping round),
 * or `null` when the key isn't an arrow. Prevents the page from scrolling on a match.
 */
export function arrowTarget(event: React.KeyboardEvent, current: number, count: number): number | null {
  const step = ARROW_STEPS[event.key];
  if (!step) return null;
  event.preventDefault();
  return (current + step + count) % count;
}

/** `mailto:` link with the subject and body encoded. */
export const mailtoHref = (to: string, subject: string, body: string) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** Extra scroll-reveal delay for one `.reveal` element or stagger group (see app/globals.css). */
export const revealDelay = (ms: number) => ({ "--rd": `${ms}ms` }) as React.CSSProperties;
