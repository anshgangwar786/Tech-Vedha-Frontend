import { Sparkles } from "lucide-react";
import MockWindow from "@/components/home/mock/MockWindow";
import StatusIcon from "@/components/home/mock/StatusIcon";
import { GENERIC_SCENE, type ExtraServiceCard } from "@/data/home";

/**
 * Drawing of a card added on the homepage when it has no uploaded image: the card's title and summary in an app window,
 * with the one-team delivery steps beside it. Fixed design (GENERIC_SCENE); upload a card image to replace it.
 */
export default function AddedServiceScene({ card }: { card: Pick<ExtraServiceCard, "title" | "label" | "number" | "summary"> }) {
  const copy = GENERIC_SCENE;
  const item = card;
  return (
    <div className="relative w-full max-w-[480px] pb-24">
      <MockWindow
        title={item.title}
        actions={
          copy.badge.trim() ? (
            <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-[10.5px] text-fg-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              {copy.badge}
            </span>
          ) : undefined
        }
      >
        <div className="px-4 pt-3.5 pb-4">
          <p className="flex items-center justify-between text-[13px] font-medium text-fg">
            {item.label}
            <span className="text-[11px] font-normal text-fg-subtle">{item.number}</span>
          </p>
          {item.summary.trim() && (
            <p className="mt-2.5 border-t border-line pt-3 text-[12px] leading-[1.55] text-fg-muted">{item.summary}</p>
          )}
        </div>
      </MockWindow>

      <div className="absolute right-0 bottom-0 w-[224px] rounded-[14px] border border-line bg-surface-raised p-3.5 shadow-[0_28px_60px_-28px_rgb(3_10_24/0.75)]">
        <p className="flex items-center gap-2.5 border-b border-line pb-2.5">
          <Sparkles aria-hidden className="size-8 rounded-full bg-primary p-1.5 text-white" />
          <span className="text-xs font-medium text-fg">
            {copy.partnerTitle}
            <span className="block text-[10.5px] font-normal text-fg-muted">{copy.partnerText}</span>
          </span>
        </p>
        <ul className="mt-1">
          {copy.steps.map((step, index) => (
            <li key={index} className="flex items-center justify-between py-1.5 text-[11px] text-fg">
              {step.title}
              <StatusIcon done={step.done} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
