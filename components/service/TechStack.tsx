import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { SECTION } from "@/components/ui/styles";
import type { ResolvedServicePage, TechTool } from "@/data/service-pages";
import { cx } from "@/lib/cx";
import { stepNumber } from "@/lib/utils";

function ToolChip({ tool }: { tool: TechTool }) {
  return (
    <li className="flex min-h-14 items-center gap-2.5 rounded-[14px] border border-line bg-bg px-2.5 py-2 sm:h-14 sm:gap-3 sm:px-3 sm:py-0">
      <span
        className={cx(
          "grid size-[34px] shrink-0 place-items-center rounded-[10px] border",
          tool.color
            ? "border-[color-mix(in_srgb,var(--tool)_32%,transparent)] bg-[color-mix(in_srgb,var(--tool)_12%,transparent)] text-(--tool)"
            : "border-line bg-surface text-fg",
        )}
        style={tool.color ? ({ "--tool": tool.color } as React.CSSProperties) : undefined}
      >
        {"icon" in tool ? (
          <tool.icon aria-hidden className="size-[20px]" />
        ) : "image" in tool ? (
          <Image src={tool.image} alt="" width={22} height={22} />
        ) : (
          <span aria-hidden className="text-[13px] font-semibold text-brand">
            {tool.initials}
          </span>
        )}
      </span>
      <span className="min-w-0 text-[13px] font-medium text-fg max-sm:leading-tight sm:text-sm">{tool.name}</span>
    </li>
  );
}

/** "Proven tools. Zero lock-in." — the tools the team works with, grouped by layer or channel. */
export default function TechStack({ page }: { page: ResolvedServicePage }) {
  const { techStack } = page;

  return (
    <section aria-labelledby="tech-stack-title" className={cx("defer-render relative isolate overflow-hidden bg-bg-deep", SECTION)}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden
        className="absolute -top-[420px] left-1/2 -z-10 h-[520px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(30_155_240/0.28),transparent)] blur-[30px]"
      />

      <div className="container-site">
        <SectionHeader
          id="tech-stack-title"
          eyebrow={techStack.eyebrow}
          title={[techStack.title]}
          highlight={techStack.highlight}
          intro={techStack.intro}
          introClassName="max-w-[440px]"
          light
        />

        <ul data-reveal-stagger className="mt-10 grid border-y border-line sm:mt-14 md:grid-cols-3">
          {techStack.highlights.map((highlight, index) => (
            <li
              key={`${index}-${highlight}`}
              className={cx(
                "flex items-center gap-3.5 py-4 text-sm font-medium text-fg-muted sm:py-6",
                index > 0 && "border-t border-line md:border-t-0 md:border-l md:pl-7",
              )}
            >
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_rgb(95_212_240/0.16)]" />
              {highlight}
            </li>
          ))}
        </ul>

        {/* Phones: a swipeable row of groups (the next one peeks in) instead of six tall cards stacked. */}
        <div data-reveal-stagger className="mt-8 grid gap-4 max-sm:flex max-sm:snap-row sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {techStack.groups.map((group, index) => (
            <article
              key={`${index}-${group.title}`}
              className="group flex flex-col gap-5 rounded-3xl border border-line bg-surface p-5 transition duration-250 ease-out hover:border-brand hover:shadow-[0_30px_60px_rgb(30_155_240/0.35)] sm:gap-6 sm:p-7"
            >
              <header className="flex items-start gap-3.5 sm:items-center sm:gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-raised font-display text-lg text-brand transition-colors duration-250 group-hover:bg-brand group-hover:text-white">
                  {stepNumber(index)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[22px] leading-tight tracking-[-0.01em] text-fg sm:text-2xl">{group.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{group.tagline}</p>
                </div>
                <span className="hidden h-[26px] shrink-0 items-center rounded-full border border-line px-2.5 text-[11px] font-medium tracking-[0.06em] text-fg-subtle sm:flex">
                  {group.tools.length} {techStack.toolsWord}
                </span>
              </header>
              <ul className="grid grid-cols-2 gap-2.5">
                {group.tools.map((tool, toolIndex) => (
                  <ToolChip key={`${toolIndex}-${tool.name}`} tool={tool} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
