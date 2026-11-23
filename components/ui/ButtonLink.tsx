import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { externalLinkProps } from "@/lib/utils";

type Variant = "primary" | "glass" | "outline";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white hover:brightness-110 shadow-[0_8px_24px_-12px_var(--glow)]",
  glass: "border border-line bg-glass text-fg backdrop-blur hover:border-brand",
  outline: "border border-line text-fg hover:border-brand hover:bg-glass",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 gap-2 px-[18px] text-sm",
  md: "h-12 gap-2.5 px-6 text-[15px]",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      {...externalLinkProps(href)}
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap transition duration-200",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" />}
    </Link>
  );
}
