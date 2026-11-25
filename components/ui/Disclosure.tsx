import { Minus, Plus } from "lucide-react";
import { cx } from "@/lib/cx";

type DisclosureProps = {
  /** Items sharing a `group` name form a single-open accordion (native <details name>). */
  group: string;
  summary: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Extra classes for the body (e.g. indentation under a step number). */
  bodyClassName?: string;
};

/**
 * Expandable card built on <details>: works without JavaScript, keeps the answer in the HTML for
 * search engines, and animates open/close where the browser supports `::details-content`.
 */
export default function Disclosure({ group, summary, children, defaultOpen = false, bodyClassName }: DisclosureProps) {
  return (
    <details
      name={group}
      open={defaultOpen}
      className={cx(
        "group rounded-[20px] border border-line bg-surface transition-colors duration-250 [interpolate-size:allow-keywords]",
        "hover:border-brand/45 open:border-brand/50 open:bg-surface-raised",
        // Prototype motion: Smart animate, 450 ms, cubic-bezier(0.32, 0.72, 0, 1).
        "details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-450 details-content:ease-[cubic-bezier(0.32,0.72,0,1)] open:details-content:h-auto",
      )}
    >
      <summary className="flex min-h-[72px] cursor-pointer list-none items-center gap-4 px-5 py-4 sm:gap-5 sm:px-6 [&::-webkit-details-marker]:hidden">
        {summary}
        <span
          aria-hidden
          className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border border-line text-brand transition-colors group-hover:border-brand/45"
        >
          <Plus className="size-4 group-open:hidden" />
          <Minus className="hidden size-4 group-open:block" />
        </span>
      </summary>
      <div className={cx("px-5 pb-5 sm:px-6 sm:pb-6", bodyClassName)}>{children}</div>
    </details>
  );
}
