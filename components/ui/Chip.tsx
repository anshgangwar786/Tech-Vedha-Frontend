import { cx } from "@/lib/cx";

type ChipProps = {
  children: React.ReactNode;
  /** Shows the small accent dot before the label. */
  dot?: boolean;
  size?: "xs" | "sm";
  className?: string;
};

/** Small rounded label used for tags, statuses and deliverables. */
export default function Chip({ children, dot = true, size = "sm", className }: ChipProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full bg-surface-raised font-medium whitespace-nowrap text-fg",
        size === "sm" ? "h-[26px] gap-2 px-3 text-xs" : "h-5 gap-1.5 px-2 text-[10px]",
        className,
      )}
    >
      {dot && <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />}
      {children}
    </span>
  );
}
