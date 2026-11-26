import Image from "next/image";
import { Search } from "lucide-react";
import MockWindow from "@/components/home/mock/MockWindow";
import type { ServiceScenesCopy } from "@/data/home";

/** Campaign dashboard with a search result card: search, ads and WhatsApp bringing in enquiries. */
export default function MarketingScene({ copy }: { copy: ServiceScenesCopy["marketing"] }) {
  return (
    <div className="relative w-full max-w-[480px] pt-[58px]">
      <MockWindow title={copy.windowTitle}>
        <div className="px-4 pt-3.5 pb-3">
          <div className="flex justify-between">
            <p className="text-[13px] font-medium text-fg">{copy.chartTitle}</p>
            <p className="text-[11px] text-fg-subtle">{copy.chartPeriod}</p>
          </div>
          <div className="relative mt-2.5 h-[92px]">
            <Image src={copy.chart.dark.src} alt={copy.chart.dark.alt} fill unoptimized className="hidden dark:block" />
            <Image src={copy.chart.light.src} alt={copy.chart.light.alt} fill unoptimized className="dark:hidden" />
          </div>
          <div className="flex justify-between pt-1.5 text-[10.5px] text-fg-subtle">
            {copy.weeks.map((week, index) => (
              <span key={index}>{week}</span>
            ))}
          </div>
          <ul className="mt-2.5 border-t border-line">
            {copy.channels.map((channel, index) => (
              <li key={index} className="grid h-7 grid-cols-[72px_1fr_auto] items-center gap-3">
                <span className="text-[11.5px] font-medium text-fg">{channel.name}</span>
                <span className="h-[5px] overflow-hidden rounded-full bg-surface-raised">
                  <span
                    className="block h-full rounded-full bg-linear-to-r from-[#1e9bf0] to-[#1446e0]"
                    style={{ width: `${Math.max(0, Math.min(100, channel.reach))}%` }}
                  />
                </span>
                <span className="flex items-center gap-1.5 text-[10.5px] font-medium text-fg-muted">
                  <span className="size-[5px] rounded-full bg-accent" />
                  {copy.liveLabel}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </MockWindow>

      <div className="absolute top-0 right-0 w-[252px] rounded-[14px] border border-line bg-surface-raised p-2.5 drop-shadow-[0_28px_30px_rgb(3_10_24/0.5)]">
        <p className="flex h-[30px] items-center gap-2 rounded-full border border-line bg-bg px-2.5 text-[11.5px] text-fg-muted">
          <Search aria-hidden className="size-3" />
          {copy.searchQuery}
        </p>
        <div className="mt-2 flex flex-col gap-[3px] rounded-[10px] border border-brand bg-bg px-2.5 py-2">
          <p className="flex items-center gap-1.5 text-[10.5px] text-fg-muted">
            <span className="size-3 rounded-full bg-linear-135 from-[#1e9bf0] to-[#1446e0]" />
            {copy.resultUrl}
          </p>
          <p className="text-xs leading-[1.3] font-medium text-brand">{copy.resultTitle}</p>
        </div>
        <div className="flex flex-col gap-[5px] px-2.5 pt-2 pb-0.5 opacity-70">
          <span className="h-[5px] w-[71px] rounded-full bg-line" />
          <span className="h-[5px] w-[151px] rounded-full bg-fg-subtle" />
        </div>
      </div>
    </div>
  );
}
