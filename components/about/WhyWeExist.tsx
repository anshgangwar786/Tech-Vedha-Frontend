import { Tick } from "@/components/about/icons";
import SectionGlow from "@/components/about/SectionGlow";
import SectionHeader from "@/components/ui/SectionHeader";
import { HIGHLIGHT, SECTION } from "@/components/ui/styles";
import { VENDOR_COMPARISON } from "@/data/about";
import { cx } from "@/lib/cx";
import { stepNumber } from "@/lib/utils";

const headCell = "px-7 py-[22px] text-left text-[11px] font-medium tracking-[0.14em] uppercase";
const dot = "size-1.5 shrink-0 rounded-full";

/**
 * "Four vendors vs one team" comparison. A real table on wide screens; below `md` each row
 * stacks into a card, with small inline labels standing in for the hidden column headers.
 */
export default function WhyWeExist() {
  return (
    <section aria-labelledby="exist-title" className={cx("defer-render relative isolate bg-bg-deep", SECTION)}>
      <SectionGlow />
      <div className="container-site">
        <SectionHeader
          id="exist-title"
          eyebrow="Why we exist"
          title={["Four vendors. Four timelines.", "One headache."]}
          intro="Most businesses juggle a designer, a developer, an app agency and a marketer. We started Tech Vedha to replace all four with one team."
          light
        />

        <div className="reveal relative isolate mt-14 overflow-hidden rounded-3xl border border-line bg-surface">
          <div
            aria-hidden
            className="absolute top-[60%] left-1/2 -z-10 h-[90%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,#1e9bf0,#1446e0_55%,transparent)] opacity-20 blur-[60px] dark:opacity-35"
          />
          <table className="w-full border-collapse max-md:block">
            <caption className="sr-only">What it takes with four separate vendors, compared with Tech Vedha</caption>
            <colgroup>
              <col className="w-[22%]" />
              <col className="w-[47%]" />
              <col className="w-[31%]" />
            </colgroup>
            <thead className="max-md:hidden">
              <tr className="border-b border-line">
                <th scope="col" className={cx(headCell, "text-fg-subtle")}>
                  What it takes
                </th>
                <th scope="col" className={cx(headCell, "border-l border-line text-fg-subtle")}>
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden className={cx(dot, "bg-fg-subtle")} />
                    Four separate vendors
                  </span>
                </th>
                <th scope="col" className={cx(headCell, HIGHLIGHT)}>
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden className={cx(dot, "bg-white")} />
                    Tech Vedha
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {VENDOR_COMPARISON.map((row, index) => (
                <tr key={row.topic} className="border-line not-last:border-b max-md:block">
                  <th scope="row" className="px-7 py-[22px] text-left align-middle font-normal max-md:block max-md:pb-2">
                    <span className="block font-display text-[15px] leading-none font-light text-brand">
                      {stepNumber(index)}
                    </span>
                    <span className="mt-1 block font-display text-[22px] leading-[1.2] text-fg">{row.topic}</span>
                  </th>
                  <td className="border-line px-7 py-[22px] align-middle max-md:block max-md:py-3 md:border-l">
                    <span className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-fg-subtle uppercase md:hidden">
                      Four separate vendors
                    </span>
                    <ul className="flex flex-wrap gap-2">
                      {row.vendors.map((vendor) => (
                        <li
                          key={vendor}
                          className="flex h-8 items-center gap-[7px] rounded-[10px] border border-dashed border-line bg-surface-raised px-3 text-[13px] font-medium text-fg-muted"
                        >
                          <span aria-hidden className="size-[5px] rounded-full bg-fg-subtle" />
                          {vendor}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-line bg-brand/7 px-7 py-[22px] align-middle max-md:block max-md:pt-3 md:border-l">
                    <span className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-brand uppercase md:hidden">
                      Tech Vedha
                    </span>
                    <span className="flex items-center gap-3 text-[15.5px] leading-[1.35] font-medium text-fg">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white">
                        <Tick className="size-[13px]" />
                      </span>
                      {row.us}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
