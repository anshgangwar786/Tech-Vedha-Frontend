import { ShieldCheck } from "lucide-react";
import MockWindow from "@/components/home/mock/MockWindow";
import StatusIcon from "@/components/home/mock/StatusIcon";
import { cx } from "@/lib/cx";

const MODULES = ["Dashboard", "Inventory", "Orders", "Billing", "Staff"];

const INVENTORY = [
  { item: "Oak dining chair", status: "In stock" },
  { item: "Floor lamp, brass", status: "In stock" },
  { item: "Wall shelf, 90 cm", status: "Low stock" },
  { item: "Linen sofa, 3-seat", status: "In stock" },
  { item: "Ceramic vase", status: "Reorder" },
];

const LAYERS = ["Threat detection", "Network security", "Data protection", "Compliance and risk"];

/** Operations software (inventory) with the security layers that protect it. */
export default function SoftwareScene() {
  return (
    <div className="relative w-full max-w-[500px] pb-28">
      <MockWindow
        title="Operations"
        actions={
          <span className="flex rounded-full border border-line p-0.5 text-[10.5px]">
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-white">Subscription</span>
            <span className="px-2.5 py-0.5 text-fg-muted">One-time</span>
          </span>
        }
      >
        <div className="flex">
          <ul className="flex w-[108px] shrink-0 flex-col gap-1 border-r border-line p-2 text-[11px]">
            {MODULES.map((module) => (
              <li
                key={module}
                className={cx(
                  "flex items-center gap-2 rounded-md px-2 py-1.5",
                  module === "Inventory" ? "bg-surface-raised text-fg" : "text-fg-muted",
                )}
              >
                <span className={cx("size-1.5 rounded-sm", module === "Inventory" ? "bg-brand" : "bg-line")} />
                {module}
              </li>
            ))}
          </ul>
          <div className="flex-1 px-3.5 py-3">
            <p className="flex items-center justify-between text-[13px] text-fg">
              Inventory
              <span className="rounded-full bg-primary px-2.5 py-1 text-[10.5px] text-white">Add item</span>
            </p>
            <table className="mt-2 w-full text-[11px]">
              <thead>
                <tr className="text-left text-[10px] tracking-[0.08em] text-fg-subtle">
                  <th className="pb-1.5 font-medium">ITEM</th>
                  <th className="pb-1.5 font-medium">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY.map((row) => (
                  <tr key={row.item} className="border-t border-line">
                    <td className="py-2 text-fg">{row.item}</td>
                    <td className="py-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[9.5px] text-fg-muted">
                        <span
                          className={cx(
                            "size-1.5 rounded-full",
                            row.status === "In stock" ? "bg-brand" : "border border-brand",
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
            Protected
            <span className="block text-[10.5px] font-normal text-fg-muted">All layers active</span>
          </span>
        </p>
        <ul className="mt-1">
          {LAYERS.map((layer) => (
            <li key={layer} className="flex items-center justify-between py-1.5 text-[11px] text-fg">
              {layer}
              <StatusIcon done />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
