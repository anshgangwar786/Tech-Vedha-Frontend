import { Sparkles } from "lucide-react";
import MockWindow from "@/components/home/mock/MockWindow";
import StatusIcon from "@/components/home/mock/StatusIcon";
import type { Service } from "@/data/services";

const STEPS = [
  { title: "Plan", done: true },
  { title: "Build", done: true },
  { title: "Launch", done: false },
  { title: "Support", done: false },
];

/**
 * Scene for a service added in the admin (the built-in four have hand-drawn ones): its offerings as a project board,
 * with the one-team delivery steps beside it. Built only from the service's own copy, so it fits any service.
 */
export default function AddedServiceScene({ service }: { service: Service }) {
  const offerings = service.offerings.slice(0, 5);
  return (
    <div className="relative w-full max-w-[480px] pb-24">
      <MockWindow
        title={service.title}
        actions={
          <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-[10.5px] text-fg-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            One team
          </span>
        }
      >
        <div className="px-4 pt-3.5 pb-4">
          <p className="flex items-center justify-between text-[13px] font-medium text-fg">
            What&apos;s included
            <span className="text-[11px] font-normal text-fg-subtle">{service.number}</span>
          </p>
          {offerings.length ? (
            <ul className="mt-2.5 border-t border-line">
              {offerings.map((offering, index) => (
                <li key={`${offering.title}-${index}`} className="flex items-center gap-3 border-b border-line py-2.5 last:border-b-0">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-raised text-[10.5px] font-medium text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[12px] font-medium text-fg">{offering.title}</span>
                    {offering.detail && <span className="truncate text-[10.5px] text-fg-muted">{offering.detail}</span>}
                  </span>
                  <StatusIcon done={index < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2.5 border-t border-line pt-3 text-[12px] leading-[1.55] text-fg-muted">
              {service.summary || "Planned, built and supported by one team."}
            </p>
          )}
        </div>
      </MockWindow>

      <div className="absolute right-0 bottom-0 w-[224px] rounded-[14px] border border-line bg-surface-raised p-3.5 shadow-[0_28px_60px_-28px_rgb(3_10_24/0.75)]">
        <p className="flex items-center gap-2.5 border-b border-line pb-2.5">
          <Sparkles aria-hidden className="size-8 rounded-full bg-primary p-1.5 text-white" />
          <span className="text-xs font-medium text-fg">
            One partner
            <span className="block text-[10.5px] font-normal text-fg-muted">Plan to support</span>
          </span>
        </p>
        <ul className="mt-1">
          {STEPS.map((step) => (
            <li key={step.title} className="flex items-center justify-between py-1.5 text-[11px] text-fg">
              {step.title}
              <StatusIcon done={step.done} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
