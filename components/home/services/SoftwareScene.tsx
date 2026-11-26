import { ShieldCheck } from "lucide-react";
import MockWindow from "@/components/home/mock/MockWindow";
import StatusIcon from "@/components/home/mock/StatusIcon";
import type { ServiceScenesCopy } from "@/data/home";
import { cx } from "@/lib/cx";

/** Operations software (inventory) with the security layers that protect it. */
export default function SoftwareScene({ copy }: { copy: ServiceScenesCopy["software"] }) {
  return (
    <div className="relative w-full max-w-[500px] pb-28">
      <MockWindow
        title={copy.windowTitle}
        actions={
          <span className="flex rounded-full border border-line p-0.5 text-[10.5px]">
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-white">{copy.planActive}</span>
            <span className="px-2.5 py-0.5 text-fg-muted">{copy.planOther}</span>
          </span>
        }
      >
        <div className="flex">
          <ul className="flex w-[108px] shrink-0 flex-col gap-1 border-r border-line p-2 text-[11px]">
            {copy.modules.map((module, index) => (
              <li
                key={index}
                className={cx(
                  "flex items-center gap-2 rounded-md px-2 py-1.5",
                  module === copy.activeModule ? "bg-surface-raised text-fg" : "text-fg-muted",
                )}
              >
                <span className={cx("size-1.5 rounded-sm", module === copy.activeModule ? "bg-brand" : "bg-line")} />
                {module}
              </li>
            ))}
          </ul>
          <div className="flex-1 px-3.5 py-3">
            <p className="flex items-center justify-between text-[13px] text-fg">
              {copy.listTitle}
              <span className="rounded-full bg-primary px-2.5 py-1 text-[10.5px] text-white">{copy.addLabel}</span>
            </p>
            <table className="mt-2 w-full text-[11px]">
              <thead>
                <tr className="text-left text-[10px] tracking-[0.08em] text-fg-subtle">
                  <th className="pb-1.5 font-medium">{copy.itemHeader}</th>
                  <th className="pb-1.5 font-medium">{copy.statusHeader}</th>
                </tr>
              </thead>
              <tbody>
                {copy.inventory.map((row, index) => (
                  <tr key={index} className="border-t border-line">
                    <td className="py-2 text-fg">{row.item}</td>
                    <td className="py-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[9.5px] text-fg-muted">
                        <span
                          className={cx(
                            "size-1.5 rounded-full",
                            row.inStock ? "bg-brand" : "border border-brand",
                          )}
                        />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MockWindow>

      <div className="absolute right-0 bottom-0 w-[244px] rounded-[14px] border border-line bg-surface-raised p-3.5 shadow-[0_28px_60px_-28px_rgb(3_10_24/0.75)]">
        <p className="flex items-center gap-2.5 border-b border-line pb-2.5">
          <ShieldCheck aria-hidden className="size-8 rounded-full bg-primary p-1.5 text-white" />
          <span className="text-xs font-medium text-fg">
            {copy.protectedTitle}
            <span className="block text-[10.5px] font-normal text-fg-muted">{copy.protectedText}</span>
          </span>
        </p>
        <ul className="mt-1">
          {copy.layers.map((layer, index) => (
            <li key={index} className="flex items-center justify-between py-1.5 text-[11px] text-fg">
              {layer}
              <StatusIcon done />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
