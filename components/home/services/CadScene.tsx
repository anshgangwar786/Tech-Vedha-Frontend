import { Circle, Pencil, RectangleHorizontal, Square, Type } from "lucide-react";
import MockWindow from "@/components/home/mock/MockWindow";
import type { ServiceScenesCopy } from "@/data/home";
import { cx } from "@/lib/cx";

const TOOLS = [Pencil, Square, Circle, RectangleHorizontal, Type];

/** Plan fixtures, positioned as % of the outer walls: windows, display tables, counter, doors, desk, shelving. */
const FURNITURE = [
  // Windows in the top wall.
  "-top-[3px] left-[7%] h-[3px] w-[17%] border-0 bg-surface-raised",
  "-top-[3px] left-[34%] h-[3px] w-[17%] border-0 bg-surface-raised",
  // Showroom display tables (2 × 2) and the counter.
  "top-[14%] left-[5%] h-[13%] w-[21%] rounded-sm",
  "top-[14%] left-[34%] h-[13%] w-[21%] rounded-sm",
  "top-[40%] left-[5%] h-[13%] w-[21%] rounded-sm",
  "top-[40%] left-[34%] h-[13%] w-[21%] rounded-sm",
  "bottom-[9%] left-[33%] h-[8%] w-[24%] rounded-sm",
  // Entrance door swing in the bottom wall.
  "-bottom-px left-[18%] size-[18%] max-h-[38px] rounded-tr-full border-0 border-t border-r",
  // Door swings from the showroom into the office and storage.
  "top-[18%] left-[60%] h-[16%] w-[6%] rounded-l-full border-r-0",
  "top-[62%] left-[60%] h-[16%] w-[6%] rounded-l-full border-r-0",
  // Office desk and chair.
  "top-[9%] right-[5%] h-[10%] w-[18%] rounded-sm",
  "top-[24%] right-[11%] size-[9px] rounded-full",
  // Storage shelving.
  "top-[58%] right-[3%] h-[32%] w-[4%] rounded-sm",
  "bottom-[5%] right-[10%] h-[5%] w-[18%] rounded-sm",
];

function Room({ name, area, className }: { name: string; area: string; className: string }) {
  return (
    <div className={cx("absolute grid place-items-center border-accent text-center", className)}>
      <p className="text-[9.5px] leading-tight text-fg">
        {name}
        <span className="block text-fg-muted">{area}</span>
      </p>
    </div>
  );
}

/** Ground-floor plan in a CAD window, with the bill of quantities alongside. */
export default function CadScene({ copy }: { copy: ServiceScenesCopy["cad"] }) {
  return (
    <div className="relative w-full max-w-[500px] pb-24">
      <MockWindow
        title={copy.windowTitle}
        actions={
          <>
            <span className="rounded-md border border-line px-2 py-0.5 text-[10px] text-fg-muted">{copy.sheet}</span>
            <span className="flex rounded-full border border-line p-0.5 text-[10px]">
              {copy.views.map((view, index) => (
                <span key={index} className={index === 0 ? "rounded-full bg-primary px-2 py-0.5 text-white" : "px-2 py-0.5 text-fg-muted"}>
                  {view}
                </span>
              ))}
            </span>
          </>
        }
      >
        <div className="flex">
          <ul className="flex flex-col gap-3 border-r border-line px-2 py-3 text-fg-muted">
            {TOOLS.map((Tool, index) => (
              <li key={index} className={cx("rounded p-1", index === 0 && "bg-surface-raised text-brand")}>
                <Tool aria-hidden className="size-3" />
              </li>
            ))}
          </ul>
          <div className="relative h-[284px] flex-1 bg-grid">
            <p className="absolute top-3 left-[13%] w-[54%] border-b border-brand/60 text-center text-[10px] text-fg-muted">
              {copy.widthLabel}
            </p>
            <p className="absolute top-3 left-[67%] w-[22%] border-b border-brand/60 text-center text-[10px] text-fg-muted">
              {copy.sideWidthLabel}
            </p>
            <p className="absolute top-[17%] left-[4%] h-[73%] [writing-mode:vertical-rl] rotate-180 border-r border-brand/60 text-center text-[10px] text-fg-muted">
              {copy.depthLabel}
            </p>
            <div className="absolute top-[17%] left-[13%] h-[73%] w-[76%] border-[3px] border-accent">
              <Room name={copy.rooms.showroom.name} area={copy.rooms.showroom.area} className="inset-y-0 left-0 w-[66%] border-r-2 pt-[22%]" />
              <Room name={copy.rooms.office.name} area={copy.rooms.office.area} className="top-0 right-0 h-1/2 w-[34%] border-b-2 pt-[22%]" />
              <Room name={copy.rooms.storage.name} area={copy.rooms.storage.area} className="right-0 bottom-0 h-1/2 w-[34%]" />
              {FURNITURE.map((item) => (
                <span key={item} aria-hidden className={cx("absolute border border-accent/60", item)} />
              ))}
            </div>
          </div>
        </div>
        <p className="flex gap-4 border-t border-line px-3 py-1.5 text-[10px] text-fg-muted">
          {copy.statusBar.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </p>
      </MockWindow>

      <div className="absolute right-0 bottom-0 w-[268px] rounded-[14px] border border-line bg-surface-raised p-3.5 shadow-[0_28px_60px_-28px_rgb(3_10_24/0.75)]">
        <p className="flex items-center justify-between text-xs font-medium text-fg">
          {copy.boqTitle}
          <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] text-white">{copy.boqBadge}</span>
        </p>
        <table className="mt-2 w-full text-[11px]">
          <thead>
            <tr className="border-b border-line text-left text-[10px] tracking-[0.08em] text-fg-subtle">
              <th className="py-1.5 font-medium">{copy.itemHeader}</th>
              <th className="py-1.5 text-right font-medium">{copy.qtyHeader}</th>
              <th className="py-1.5 pl-3 font-medium">{copy.unitHeader}</th>
            </tr>
          </thead>
          <tbody>
            {copy.boq.map((row, index) => (
              <tr key={index} className="text-fg">
                <td className="pt-2">{row.item}</td>
                <td className="pt-2 text-right">{row.qty}</td>
                <td className="pt-2 pl-3 text-fg-muted">{row.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
