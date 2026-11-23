import { cx } from "@/lib/cx";

type MockWindowProps = {
  title: string;
  /** Right side of the title bar (badges, toggles). */
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** App-window frame used by the illustrative UI mocks. Purely decorative. */
export default function MockWindow({ title, actions, children, className }: MockWindowProps) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_28px_60px_-28px_rgb(3_10_24/0.75),0_2px_6px_rgb(3_10_24/0.16)]",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-2.5 border-b border-line px-3">
        <span className="flex gap-[5px]">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-2 rounded-full bg-line" />
          ))}
        </span>
        <span className="text-xs font-medium text-fg">{title}</span>
        {actions && <span className="ml-auto flex items-center gap-2">{actions}</span>}
      </div>
      {children}
    </div>
  );
}
