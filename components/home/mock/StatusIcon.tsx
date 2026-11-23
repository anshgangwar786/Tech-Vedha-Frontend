import { CircleCheck, CircleDashed } from "lucide-react";
import { cx } from "@/lib/cx";

/** Done (check) or pending (dashed) marker used in mock checklists. */
export default function StatusIcon({ done, className }: { done: boolean; className?: string }) {
  const Icon = done ? CircleCheck : CircleDashed;
  return <Icon aria-hidden className={cx("size-4 shrink-0", done ? "text-accent" : "text-fg-subtle", className)} />;
}
