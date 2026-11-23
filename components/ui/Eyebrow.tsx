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
  const label = <span className="text-xs font-medium tracking-[0.16em] text-fg-subtle uppercase">{children}</span>;

  if (variant === "pill") {
    return (
      <p
        className={cx(
          "inline-flex h-7 w-fit items-center gap-2 rounded-full border border-line bg-glass px-3.5 text-xs font-medium tracking-[0.12em] text-fg-muted uppercase",
          className,
        )}
      >
        <Sparkle aria-hidden className="size-3 fill-accent text-accent" />
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
      <p className={cx("flex items-center justify-center gap-2.5", className)}>
        <span aria-hidden className="flex w-10 items-center sm:w-14">
          <span className="h-px flex-1 bg-line" />
          {tip}
        </span>
        <span className="inline-flex h-7 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-xs font-medium tracking-[0.12em] text-fg-muted uppercase">
          <Sparkle aria-hidden className="size-3 fill-current" />
          {children}
        </span>
        <span aria-hidden className="flex w-10 items-center sm:w-14">
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
