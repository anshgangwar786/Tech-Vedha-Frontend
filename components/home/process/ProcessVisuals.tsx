import { Check } from "lucide-react";
import MockWindow from "@/components/home/mock/MockWindow";
import StatusIcon from "@/components/home/mock/StatusIcon";
import Chip from "@/components/ui/Chip";
import type { ProcessVisualsCopy } from "@/data/home";
import { cx } from "@/lib/cx";

/**
 * Illustrations for each process step, matching the Figma state frames (Process · Step 1–6). Every word in them is
 * the homepage's own copy (Homepage → How we work → Visuals).
 */

function Checklist({ items }: { items: { label: string; done: boolean }[] }) {
  return (
    <ul className="px-3 pb-1">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-between border-b border-line py-1.5 text-[11px] text-fg last:border-0"
        >
          {item.label}
          <StatusIcon done={item.done} className="size-3.5" />
        </li>
      ))}
    </ul>
  );
}

function Discover({ copy }: { copy: ProcessVisualsCopy["discover"] }) {
  return (
    <MockWindow title={copy.windowTitle}>
      <div className="px-3 pt-3">
        <p className="font-display text-[13px] text-fg">{copy.projectName}</p>
        <p className="mt-1.5 flex gap-1.5">
          {copy.tags.map((tag, index) => (
            <Chip key={index} size="xs">
              {tag}
            </Chip>
          ))}
        </p>
      </div>
      <div className="mt-2">
        <Checklist items={copy.checklist} />
      </div>
    </MockWindow>
  );
}

const SWATCHES = ["bg-[#1e6ff0]", "bg-[#4db2ff]", "bg-line", "bg-white"];

function Design({ copy }: { copy: ProcessVisualsCopy["design"] }) {
  return (
    <div className="grid grid-cols-[1.4fr_1fr] gap-3">
      {/* Wireframe of the home screen, hero block highlighted. */}
      <div className="flex flex-col gap-2 rounded-xl border border-dashed border-accent/70 bg-surface p-2">
        <div className="flex items-center justify-between">
          <span className="h-1 w-1/3 rounded-full bg-fg-subtle/60" />
          <span className="flex gap-1">
            {[0, 1, 2].map((pill) => (
              <span key={pill} className="h-1 w-3 rounded-full bg-line" />
            ))}
          </span>
        </div>
        <div className="relative h-14 rounded-lg border border-accent bg-surface-raised">
          {copy.heroLabel.trim() && (
            <span className="absolute -right-1.5 -bottom-2 rounded-md bg-primary px-1.5 py-0.5 text-[8px] font-medium text-white">
              {copy.heroLabel}
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((card) => (
            <span key={card} className="h-8 rounded-md border border-line" />
          ))}
        </div>
        <span className="h-3 w-2/5 rounded-full border border-accent/70" />
        <span className="h-6" />
      </div>
      <div className="flex flex-col gap-1.5 pt-1">
        <p className="text-[10px] font-medium tracking-[0.08em] text-fg-muted">{copy.stylesLabel}</p>
        <p className="flex gap-1">
          {SWATCHES.map((swatch) => (
            <span key={swatch} className={cx("size-3.5 rounded-[3px] border border-white/10", swatch)} />
          ))}
        </p>
        <p className="font-display text-lg leading-none font-light text-fg">{copy.typeSample}</p>
        <p className="mt-1 text-[10px] font-medium tracking-[0.08em] text-fg-muted">{copy.screensLabel}</p>
        <ul className="flex flex-col gap-1 text-[10.5px]">
          {copy.screens.map((screen, index) => (
            <li key={index} className={cx("flex items-center gap-1.5", index === 0 ? "text-fg" : "text-fg-muted")}>
              <span className={cx("size-2 rounded-[2px]", index === 0 ? "bg-brand" : "border border-line")} />
              {screen}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Words coloured like an editor theme: keywords, then names followed by "(" (function calls), the rest plain. */
const KEYWORDS = /^(?:export|async|function|const|let|var|await|return|import|from|if|else|new|class|default)$/;
const TOKEN_COLOR = { kw: "text-brand", fn: "text-accent", tx: "text-fg" };

function highlight(line: string): [string, keyof typeof TOKEN_COLOR][] {
  const parts: [string, keyof typeof TOKEN_COLOR][] = [];
  const re = /[A-Za-z_$][\w$]*/g;
  let last = 0;
  for (let match = re.exec(line); match; match = re.exec(line)) {
    const word = match[0];
    const end = match.index + word.length;
    const type = KEYWORDS.test(word) ? "kw" : line[end] === "(" ? "fn" : "tx";
    if (type === "tx") continue;
    if (match.index > last) parts.push([line.slice(last, match.index), "tx"]);
    parts.push([word, type]);
    last = end;
  }
  if (last < line.length) parts.push([line.slice(last), "tx"]);
  return parts;
}

function Build({ copy }: { copy: ProcessVisualsCopy["build"] }) {
  return (
    <MockWindow
      title={copy.fileName}
      actions={
        copy.status.trim() ? (
          <span className="flex items-center gap-1 text-[9.5px] font-medium text-fg-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            {copy.status}
          </span>
        ) : undefined
      }
    >
      <pre className="overflow-x-auto px-3 py-2.5 font-mono text-[10.5px] leading-[20px]">
        {copy.code.map((line, index) => (
          <code key={index} className="block whitespace-pre">
            <span className="mr-3 inline-block w-2 text-right text-fg-subtle select-none">{index + 1}</span>
            {highlight(line).map(([text, type], part) => (
              <span key={part} className={TOKEN_COLOR[type]}>
                {text}
              </span>
            ))}
          </code>
        ))}
      </pre>
      <p className="flex gap-1.5 px-3 pb-3">
        {copy.chips.map((chip, index) => (
          <Chip key={index} size="xs">
            {chip}
          </Chip>
        ))}
      </p>
    </MockWindow>
  );
}

function Test({ copy }: { copy: ProcessVisualsCopy["test"] }) {
  return (
    <MockWindow title={copy.windowTitle} actions={<span className="text-[9.5px] font-medium text-fg-muted">{copy.progress}</span>}>
      <div className="px-3 pt-3">
        <div className="h-1 overflow-hidden rounded-full bg-surface-raised">
          <span className="block h-full w-5/6 rounded-full bg-linear-to-r from-[#1e9bf0] to-[#1446e0]" />
        </div>
      </div>
      <Checklist items={copy.checklist} />
      <p className="flex items-center justify-between border-t border-line px-3 py-1.5 text-[11px] text-fg">
        {copy.runningCheck}
        <span className="flex items-center gap-1 text-[9.5px] font-medium text-brand">
          <span className="grid size-3 place-items-center rounded-full border border-brand">
            <span className="size-1.5 rounded-full bg-brand" />
          </span>
          {copy.runningLabel}
        </span>
      </p>
    </MockWindow>
  );
}

function Launch({ copy }: { copy: ProcessVisualsCopy["launch"] }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-linear-135 from-[#1e9bf0] to-[#1446e0] font-display text-[10px] font-bold tracking-[0.06em] text-white">
          {copy.appInitials}
        </span>
        <span>
          <span className="block text-[12.5px] font-medium text-fg">{copy.appName}</span>
          <span className="block text-[10.5px] text-fg-muted">{copy.appCategory}</span>
        </span>
        <span className="ml-auto rounded-full bg-primary px-3.5 py-1 text-[11px] font-medium text-white">{copy.getLabel}</span>
      </div>
      {/* Store screenshots. */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        <span className="h-[72px] rounded-lg bg-linear-135 from-[#1e9bf0] to-[#1446e0]" />
        <span className="h-[72px] rounded-lg border border-line" />
        <span className="h-[72px] rounded-lg border border-line" />
      </div>
      <p className="mt-2.5 flex gap-1.5">
        {copy.stores.map((store, index) => (
          <Chip key={index} size="xs">
            {store}
          </Chip>
        ))}
        {copy.liveLabel.trim() && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-white">{copy.liveLabel}</span>
        )}
      </p>
    </div>
  );
}

function Support({ copy }: { copy: ProcessVisualsCopy["support"] }) {
  return (
    <div className="flex flex-col gap-2.5 px-1 py-6">
      <p className="max-w-[78%] self-start rounded-xl rounded-bl-sm border border-line bg-surface-raised px-3 py-2 text-[11.5px] text-fg">
        {copy.question}
      </p>
      <p className="max-w-[78%] self-end rounded-xl rounded-br-sm bg-primary px-3 py-2 text-[11.5px] text-white">
        {copy.answer}
      </p>
      <p className="flex items-center gap-2.5 self-start rounded-xl border border-line bg-surface px-2.5 py-2">
        <Check aria-hidden className="size-5 rounded-full bg-primary p-1 text-white" />
        <span className="text-[10.5px] font-medium text-fg">
          {copy.doneTitle}
          <span className="block text-[9.5px] font-normal text-fg-muted">{copy.doneText}</span>
        </span>
      </p>
    </div>
  );
}

/** The six illustrations drawn with the page's copy, keyed by step id. */
/** The six drawings, in step order (steps 1–6; added steps reuse them in turn). */
export function processVisuals(copy: ProcessVisualsCopy): React.ReactNode[] {
  return [
    <Discover key="discover" copy={copy.discover} />,
    <Design key="design" copy={copy.design} />,
    <Build key="build" copy={copy.build} />,
    <Test key="test" copy={copy.test} />,
    <Launch key="launch" copy={copy.launch} />,
    <Support key="support" copy={copy.support} />,
  ];
}
