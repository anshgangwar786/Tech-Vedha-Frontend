import { Sparkle } from "lucide-react";
import { cx } from "@/lib/cx";

type EyebrowProps = {
  children: React.ReactNode;
  /**
   * "line" = accent rule before the label; "pill" = rounded badge with a sparkle;
   * "centered" = rules on both sides; "badge" = centered pill between dot-tipped rules;
   * "dot" = small panel label with an accent dot.
   */
  variant?: "line" | "pill" | "centered" | "badge" | "dot";
  className?: string;
};

export default function Eyebrow({ children, variant = "line", className }: EyebrowProps) {
  // A label cleared in the admin renders nothing, rather than an empty pill or a lone rule.
  if (children == null || children === false || (typeof children === "string" && !children.trim())) return null;
  const label = <span className="text-xs font-medium tracking-[0.16em] text-fg-subtle uppercase">{children}</span>;

  if (variant === "pill") {
    return (
      <p
        className={cx(
          // min-h (not h) so long labels can wrap on phones without spilling out of the pill.
          "inline-flex min-h-7 w-fit items-center gap-2 rounded-[14px] border border-line bg-glass px-3.5 text-xs font-medium tracking-[0.12em] text-fg-muted uppercase max-sm:py-1 max-sm:leading-[1.35] sm:h-7 sm:rounded-full",
          className,
        )}
      >
        <Sparkle aria-hidden className="size-3 shrink-0 fill-accent text-accent" />
        {children}
      </p>
    );
  }

  if (variant === "dot") {
    return (
      <p className={cx("flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-fg-subtle uppercase", className)}>
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
        {children}
      </p>
    );
  }

  if (variant === "badge") {
    const tip = <span className="size-1 shrink-0 rounded-full bg-accent" />;
    return (
      // Long labels (e.g. a service label typed in the admin) stay on one line: the side rules give way first, and only
      // a label wider than the screen is cut short.
      <p className={cx("flex max-w-full items-center justify-center gap-2.5", className)}>
        <span aria-hidden className="flex w-10 min-w-0 items-center sm:w-14">
          <span className="h-px flex-1 bg-line" />
          {tip}
        </span>
        <span className="inline-flex h-7 max-w-full shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-xs font-medium tracking-[0.12em] whitespace-nowrap text-fg-muted uppercase">
          <Sparkle aria-hidden className="size-3 shrink-0 fill-current" />
          <span className="truncate">{children}</span>
        </span>
        <span aria-hidden className="flex w-10 min-w-0 items-center sm:w-14">
          {tip}
          <span className="h-px flex-1 bg-line" />
        </span>
      </p>
    );
  }

  const rule = <span aria-hidden className="h-px w-8 bg-accent" />;
  return (
    <p className={cx("flex items-center gap-3", variant === "centered" && "justify-center", className)}>
      {rule}
      {label}
      {variant === "centered" && rule}
    </p>
  );
}
