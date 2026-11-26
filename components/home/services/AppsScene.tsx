import { Check, ChevronLeft, MapPin, Phone, Plus, Search } from "lucide-react";
import Chip from "@/components/ui/Chip";
import type { ServiceScenesCopy } from "@/data/home";
import { cx } from "@/lib/cx";

function PhoneFrame({
  children,
  label,
  clock,
  className,
}: {
  children: React.ReactNode;
  label: string;
  clock: string;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col items-center gap-3", className)}>
      <div className="w-[166px] rounded-[26px] border border-line bg-surface p-1.5 shadow-[0_28px_60px_-28px_rgb(3_10_24/0.75)]">
        <div className="flex h-[336px] flex-col overflow-hidden rounded-[20px] bg-bg px-2.5 pt-2 text-fg">
          <p className="flex justify-between text-[9px] font-semibold">
            <span>{clock}</span>
            <span className="h-2 w-5 rounded-full bg-fg-subtle/50" />
          </p>
          {children}
        </div>
      </div>
      <Chip>{label}</Chip>
    </div>
  );
}

/** Android shopping app and iOS order tracking, plus the delivery pipeline. */
export default function AppsScene({ copy }: { copy: ServiceScenesCopy["apps"] }) {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-6">
      <div className="flex items-start justify-center gap-5">
        <PhoneFrame label={copy.androidLabel} clock={copy.clock}>
          <div className="mt-2 flex items-start justify-between">
            <div>
              <p className="text-[8.5px] text-fg-muted">{copy.greeting}</p>
              <p className="font-display text-[13px]">{copy.heading}</p>
            </div>
            <span className="grid size-5 place-items-center rounded-full bg-primary text-[8px] font-semibold text-white">
              {copy.avatarLetter}
            </span>
          </div>
          <p className="mt-2 flex h-6 items-center gap-1.5 rounded-full border border-line px-2 text-[8px] text-fg-subtle">
            <Search aria-hidden className="size-2.5" />
            {copy.searchPlaceholder}
          </p>
          <div className="mt-2 flex gap-1 text-[7.5px]">
            {copy.tabs.map((tab, index) => (
              <span
                key={index}
                className={cx(
                  "rounded-full border px-2 py-0.5",
                  index === 0 ? "border-transparent bg-white text-[#0b1a3a]" : "border-line text-fg-muted",
                )}
              >
                {tab}
              </span>
            ))}
          </div>
          <div className="mt-2 rounded-lg bg-linear-135 from-[#1e9bf0] to-[#1446e0] p-2 text-white">
            <p className="text-[9px] font-medium">{copy.bannerTitle}</p>
            <span className="mt-1.5 inline-block rounded-full bg-white px-2 py-0.5 text-[7.5px] text-[#0b1a3a]">
              {copy.bannerButton}
            </span>
          </div>
          <p className="mt-2 flex justify-between text-[8.5px] font-medium">
            {copy.popularLabel} <span className="text-brand">{copy.seeAllLabel}</span>
          </p>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {copy.products.map((product, index) => (
              <div key={index} className="relative h-16 rounded-md border border-line p-1.5">
                <Plus aria-hidden className="absolute top-6 right-1.5 size-3 rounded-full bg-primary p-0.5 text-white" />
                <p className="absolute bottom-1.5 text-[7.5px]">{product}</p>
              </div>
            ))}
          </div>
          {/* Bottom navigation. */}
          <div className="mt-auto mb-2 flex items-center justify-between rounded-full bg-surface px-2 py-1.5">
            <span className="flex items-center gap-1 rounded-full bg-surface-raised px-2 py-0.5 text-[7.5px]">
              <span className="size-1.5 rounded-full bg-brand" />
              {copy.navHomeLabel}
            </span>
            <span className="size-2.5 rounded-full border border-fg-subtle" />
            <span className="size-2.5 rounded-[3px] border border-fg-subtle" />
            <span className="size-2.5 rounded-full border border-fg-subtle" />
          </div>
        </PhoneFrame>

        <PhoneFrame label={copy.iosLabel} clock={copy.clock} className="mt-6">
          <p className="mt-2 flex items-center gap-1.5 text-[9px] font-medium">
            <ChevronLeft aria-hidden className="size-3 rounded-full border border-line" />
            {copy.orderTitle}
          </p>
          <div className="relative mt-2 h-14 rounded-md border border-line bg-grid">
            <span className="absolute top-1/2 left-3 h-px w-3/4 bg-brand" />
            <MapPin aria-hidden className="absolute top-1.5 right-3 size-3.5 fill-brand text-brand" />
          </div>
          <p className="mt-2 text-[10px]">{copy.arrivalLabel}</p>
          <p className="text-[7.5px] text-fg-subtle">{copy.orderNumber}</p>
          <ul className="mt-1.5 flex flex-col gap-1.5">
            {copy.orderSteps.map((step, index) => (
              <li
                key={index}
                className={cx("flex items-center gap-1.5 text-[7.5px]", step.state === "todo" && "text-fg-subtle")}
              >
                <span
                  className={cx(
                    "size-2 rounded-full",
                    step.state === "done" && "bg-primary",
                    step.state === "current" && "border border-accent",
                    step.state === "todo" && "border border-line",
                  )}
                />
                {step.label}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center gap-1.5 rounded-md border border-line p-1.5">
            <span className="grid size-4 place-items-center rounded-full bg-surface-raised text-[7px]">{copy.courierInitial}</span>
            <span className="text-[7.5px] leading-tight">
              {copy.courierName} <span className="block text-fg-subtle">{copy.courierRole}</span>
            </span>
            <Phone aria-hidden className="ml-auto size-4 rounded-full bg-primary p-[3px] text-white" />
          </div>
          <span className="mt-2 rounded-full bg-primary py-1 text-center text-[8px] font-medium text-white">
            {copy.trackLabel}
          </span>
          <span aria-hidden className="mx-auto mt-auto mb-1.5 h-1 w-12 rounded-full bg-fg-subtle/60" />
        </PhoneFrame>
      </div>

      <div className="rounded-xl border border-line bg-surface-raised px-4 py-3">
        <p className="flex justify-between text-xs">
          <span className="font-medium text-fg">{copy.pipelineTitle}</span>
          <span className="text-fg-subtle">{copy.pipelinePlatforms}</span>
        </p>
        <ol
          className="mt-3 grid grid-cols-[repeat(var(--steps),minmax(0,1fr))]"
          style={{ "--steps": Math.max(1, copy.pipeline.length) } as React.CSSProperties}
        >
          {copy.pipeline.map((step, index) => (
            <li key={index} className="relative flex flex-col items-center gap-1.5 text-[10.5px]">
              {index > 0 && (
                <span
                  aria-hidden
                  className={cx(
                    "absolute top-[11px] right-1/2 h-0.5 w-full",
                    step.state === "todo" ? "bg-line" : "bg-primary",
                  )}
                />
              )}
              <span
                className={cx(
                  "relative grid size-[22px] place-items-center rounded-full",
                  step.state === "done" && "bg-primary text-white",
                  step.state === "current" && "border-2 border-accent bg-surface-raised",
                  step.state === "todo" && "border border-line bg-surface-raised",
                )}
              >
                {step.state === "done" && <Check aria-hidden className="size-3" />}
                {step.state === "current" && <span className="size-2 rounded-full bg-accent" />}
              </span>
              <span className={step.state === "current" ? "font-medium text-fg" : "text-fg-subtle"}>{step.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
