import Image from "next/image";
import { ArrowUp, Check, Search } from "lucide-react";
import { SiGoogle, SiGoogleads, SiMailchimp, SiMeta, SiWhatsapp, SiYoutube } from "react-icons/si";
import type { ChecklistLabels, DeliverableVisual, DeliverableVisualsCopy } from "@/data/service-pages";
import { cx } from "@/lib/cx";

/** Device shell: the bezel stays dark navy in both themes, as in the design. */
function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "w-[140px] rounded-[26px] border border-white/15 bg-[#0b1a3a] p-[7px] drop-shadow-[0_30px_30px_rgb(3_10_24/0.5)]",
        className,
      )}
    >
      <div className="flex h-[272px] flex-col gap-2 overflow-hidden rounded-[20px] bg-surface px-[11px] py-3.5">
        {children}
      </div>
    </div>
  );
}

function AppScreens({ copy }: { copy: DeliverableVisualsCopy["appScreens"] }) {
  return (
    <div className="flex items-center justify-center gap-[22px]">
      <Phone>
        <p className="flex items-center justify-between text-[10px] font-medium text-fg">
          {copy.storeName}
          <span className="size-4 rounded-full bg-surface-raised" />
        </p>
        <p className="rounded-full bg-surface-raised px-2.5 py-1 text-[8.5px] text-fg-subtle">{copy.searchPlaceholder}</p>
        <div className="grid flex-1 grid-cols-2 grid-rows-[3fr_2fr] gap-[7px]">
          <p className="flex items-end rounded-[10px] bg-linear-115 from-[#1e9bf0] to-[#1446e0] p-[7px] text-[8.5px] font-medium text-white">
            {copy.bannerLabel}
          </p>
          <span className="rounded-[10px] bg-surface-raised" />
          <span className="rounded-[10px] bg-surface-raised" />
          <span className="rounded-[10px] bg-surface-raised" />
        </div>
        <p className="flex justify-around border-t border-line pt-1.5">
          {[0, 1, 2, 3].map((dot) => (
            <span key={dot} className={cx("size-1.5 rounded-full", dot === 0 ? "bg-brand" : "bg-line")} />
          ))}
        </p>
      </Phone>

      <Phone className="translate-y-[22px]">
        <span className="flex-1 rounded-xl bg-linear-150 from-surface-raised to-bg" />
        <p className="text-[10px] font-medium text-fg">{copy.productName}</p>
        <p className="text-[9px] text-fg-subtle">{copy.productStock}</p>
        <p className="flex gap-[5px]">
          <span className="h-3.5 w-[35px] rounded bg-surface-raised" />
          <span className="h-3.5 w-[22px] rounded bg-surface-raised" />
        </p>
        <p className="rounded-full bg-primary py-1.5 text-center text-[9px] font-medium text-white">{copy.addToCart}</p>
      </Phone>
    </div>
  );
}

/** Frosted panel shared by the marketing mock-ups. */
const PANEL =
  "flex w-full flex-col rounded-2xl border border-line bg-glass p-[18px] shadow-[0_30px_60px_rgb(3_10_24/0.35)] backdrop-blur-xl";
/** Small floating notification card that overlaps a panel corner. */
const TOAST =
  "absolute flex items-center gap-2.5 rounded-[14px] border border-line bg-surface px-3 py-2.5 drop-shadow-[0_30px_30px_rgb(3_10_24/0.5)]";

function PanelHeader({ title, badge }: { title: string; badge: React.ReactNode }) {
  return (
    <p className="flex items-center justify-between text-[11px] font-medium tracking-[0.08em] text-fg-subtle">
      {title}
      <span className="flex h-5 items-center gap-1.5 rounded-full bg-surface-raised px-[9px] text-[10px] tracking-normal text-fg">
        {badge}
      </span>
    </p>
  );
}

function Bar({ width }: { width: string }) {
  return (
    <span className="block h-[5px] flex-1 overflow-hidden rounded-[5px] bg-line">
      <span className="block h-full rounded-[5px] bg-linear-to-r from-[#1e9bf0] to-[#1446e0]" style={{ width }} />
    </span>
  );
}

const LIVE_DOT = <span className="size-1.5 rounded-full bg-[#25d366]" />;

/** Logos and colours of the channel rows, in row order (extra rows reuse them in turn). */
const CHANNEL_LOGOS = [
  { icon: SiGoogleads, color: "#4285f4" },
  { icon: SiMeta, color: "#0467df" },
  { icon: SiYoutube, color: "#ff0000" },
  { icon: SiMailchimp, color: "#e0a800" },
  { icon: SiWhatsapp, color: "#25d366" },
];

/** Last-30-days campaign overview with a lead notification. */
function CampaignDashboard({ copy }: { copy: DeliverableVisualsCopy["campaignDashboard"] }) {
  return (
    <div className="relative w-full max-w-[400px]">
      <div className={cx(PANEL, "gap-3")}>
        <PanelHeader title={copy.title} badge={<>{LIVE_DOT}{copy.badge}</>} />
        <dl className="grid grid-cols-3 gap-2">
          {copy.stats.map(({ label, value }, index) => (
            <div key={index} className="flex flex-col gap-0.5 rounded-[10px] bg-surface-raised px-2.5 py-2">
              <dt className="text-[9px] font-medium tracking-[0.04em] text-fg-subtle">{label}</dt>
              <dd className="text-xs font-medium text-fg">{value}</dd>
            </div>
          ))}
        </dl>
        <Image src={copy.chart.src} alt={copy.chart.alt} width={copy.chart.width || 364} height={copy.chart.height || 64} unoptimized className="h-16 w-full" />
        <ul className="flex flex-col gap-[7px]">
          {copy.channels.map(({ name, width }, index) => {
            const { icon: Icon, color } = CHANNEL_LOGOS[index % CHANNEL_LOGOS.length];
            return (
            <li key={index} className="flex items-center gap-2 text-[11px] font-medium text-fg">
              <Icon className="size-3 shrink-0" style={{ color }} />
              <span className="w-[84px] shrink-0 truncate sm:w-[92px]">{name}</span>
              <Bar width={width} />
              <span className="w-[30px] text-right text-[10px] text-fg-subtle">{copy.channelStatus}</span>
            </li>
            );
          })}
        </ul>
      </div>
      <p className={cx(TOAST, "-right-1 -bottom-9 w-[202px] sm:-right-24 sm:bottom-12")}>
        <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-[#25d366] text-white">
          <SiWhatsapp className="size-3.5" />
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold text-fg">{copy.toastTitle}</span>
          <span className="text-[10px] text-fg-subtle">{copy.toastDetail}</span>
        </span>
      </p>
    </div>
  );
}

/** A Google result for the business plus keyword positions. */
function SearchRankings({ copy }: { copy: DeliverableVisualsCopy["searchRankings"] }) {
  return (
    <div className="relative w-full max-w-[420px]">
      <div className={cx(PANEL, "gap-3")}>
        <PanelHeader
          title={copy.title}
          badge={
            <>
              <SiGoogle className="size-[11px] text-[#4285f4]" />
              {copy.badge}
            </>
          }
        />
        <div className="flex flex-col gap-2 rounded-xl bg-surface-raised px-3 py-2.5">
          <p className="flex h-[26px] items-center gap-2 rounded-full border border-line bg-surface px-2.5 text-[11px] text-fg">
            <Search aria-hidden className="size-3 text-fg-subtle" />
            {copy.query}
          </p>
          <p className="flex flex-col gap-0.5">
            <span className="text-[9px] text-fg-subtle">{copy.resultUrl}</span>
            <span className="text-xs font-medium text-brand">{copy.resultTitle}</span>
            <span className="text-[10px] text-fg-subtle">{copy.resultText}</span>
          </p>
        </div>
        <ul className="flex flex-col gap-[7px]">
          {copy.keywords.map(({ keyword, width, rank }, index) => (
            <li key={index} className="flex h-4 items-center gap-2 text-[11px] font-medium text-fg">
              <span className="w-[118px] shrink-0 truncate sm:w-[140px]">{keyword}</span>
              <Bar width={width} />
              <span className="flex w-[58px] items-center justify-end gap-1 text-[10px]">
                <ArrowUp aria-hidden className="size-2.5 text-[#22c55e]" strokeWidth={2.5} />
                {rank}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className={cx(TOAST, "-right-1 -bottom-9 w-[190px] sm:-right-20 sm:-bottom-6")}>
        <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-[#22c55e] text-white">
          <ArrowUp aria-hidden className="size-3" strokeWidth={2.5} />
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold text-fg">{copy.toastTitle}</span>
          <span className="text-[10px] text-fg-subtle">{copy.toastDetail}</span>
        </span>
      </p>
    </div>
  );
}

/** Donut colours, in row order (extra rows reuse them in turn). */
const REPORT_COLORS = ["#4285f4", "#0467df", "#ff0000", "#e0a800", "#25d366"];
const reportColor = (index: number) => REPORT_COLORS[index % REPORT_COLORS.length];

/** Donut slices as a conic gradient, with a small gap between channels. Shares are scaled to fill the ring. */
function donut(channels: { share: number }[]) {
  const total = channels.reduce((sum, { share }) => sum + Math.max(0, share), 0) || 1;
  let start = 0;
  const stops = channels.map(({ share }, index) => {
    const end = start + (Math.max(0, share) / total) * 100;
    const stop = `${reportColor(index)} ${start}% ${Math.max(start, end - 1)}%, transparent ${Math.max(start, end - 1)}% ${end}%`;
    start = end;
    return stop;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

/** October report: leads by channel, takeaways and the PDF sent to the client. */
function MonthlyReport({ copy }: { copy: DeliverableVisualsCopy["monthlyReport"] }) {
  return (
    <div className="relative w-full max-w-[380px] sm:-translate-x-12">
      <div className={cx(PANEL, "gap-2.5")}>
        <PanelHeader title={copy.title} badge={<>{LIVE_DOT}{copy.badge}</>} />
        <div className="flex items-center gap-5">
          <span
            className="relative grid size-[84px] shrink-0 place-items-center rounded-full"
            style={{ background: donut(copy.channels) }}
          >
            <span className="absolute inset-[11px] rounded-full bg-surface" />
            <span className="relative text-center leading-tight text-fg">
              <span className="block text-[7.5px]">{copy.donutTop}</span>
              <span className="block text-[9px] font-bold">{copy.donutBottom}</span>
            </span>
          </span>
          <ul className="grid grid-cols-2 gap-x-[18px] gap-y-2">
            {copy.channels.map(({ name }, index) => (
              <li key={index} className="flex items-center gap-1.5 text-[11px] font-medium text-fg">
                <span className="size-2 rounded-[2px]" style={{ background: reportColor(index) }} />
                {name}
              </li>
            ))}
          </ul>
        </div>
        {copy.notes.map(({ title, detail }, index) => (
          <p key={index} className="flex flex-col gap-0.5 rounded-[10px] bg-surface-raised px-3 py-2 text-[11px]">
            <span className="font-semibold text-fg">{title}</span>
            <span className="text-fg-subtle">{detail}</span>
          </p>
        ))}
      </div>
      <p className={cx(TOAST, "-right-1 -top-9 px-3.5 sm:top-[72px] sm:-right-[116px]")}>
        <span className="grid h-9 w-[30px] shrink-0 place-items-center rounded-md bg-linear-130 from-[#1e9bf0] to-[#1446e0] text-[9px] font-semibold text-white">
          {copy.toastBadge}
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold text-fg">{copy.toastTitle}</span>
          <span className="text-[10px] text-fg-subtle">{copy.toastDetail}</span>
        </span>
      </p>
    </div>
  );
}

type ChecklistItem = { label: string; done: boolean };

/** Glass checklist card with a progress bar: items are "Passed" or "In review". */
function Checklist({ title, items, labels }: { title: string; items: ChecklistItem[]; labels: ChecklistLabels }) {
  const passed = items.filter((item) => item.done).length;
  if (!items.length) return null;

  return (
    <div className="w-full max-w-[360px] rounded-2xl border border-line bg-glass px-[18px] py-4 shadow-[0_30px_60px_rgb(3_10_24/0.35)] backdrop-blur-md">
      <p className="flex justify-between gap-3 text-[11px] font-medium tracking-[0.08em] text-fg-subtle">
        {title}
        <span className="shrink-0 whitespace-nowrap text-fg">
          {passed} / {items.length}
        </span>
      </p>
      <span className="mt-3 block h-1 overflow-hidden rounded bg-line">
        <span
          className="block h-full bg-linear-to-r from-[#1e9bf0] to-[#1446e0]"
          style={{ width: `${(passed / items.length) * 100}%` }}
        />
      </span>
      <ul className="mt-3 flex flex-col gap-3">
        {items.map((item, index) => (
          <li key={`${index}-${item.label}`} className="flex items-center gap-2.5 text-[13.5px] text-fg">
            <span
              className={cx(
                "grid size-[18px] place-items-center rounded-full",
                item.done ? "bg-primary text-white" : "border border-brand text-brand",
              )}
            >
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            {item.label}
            <span className={cx("ml-auto text-[11px] font-medium", item.done ? "text-fg-subtle" : "text-brand")}>
              {item.done ? labels.passed : labels.inReview}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Checklist illustration from a card's own items (pages written in the admin, which have no drawn illustrations):
 * every item ticked but the last, which is still to do — like the release and campaign checklists.
 */
export function CardChecklist({ title, items, labels }: { title: string; items: string[]; labels: ChecklistLabels }) {
  const rows = items.map((label) => label.trim()).filter(Boolean).slice(0, 6);
  if (!rows.length) return null;
  return (
    <Checklist
      title={[title.toUpperCase(), labels.titleSuffix].filter((part) => part.trim()).join(" · ")}
      items={rows.map((label, index) => ({ label, done: rows.length === 1 || index < rows.length - 1 }))}
      labels={labels}
    />
  );
}

/** The drawn illustration of a "What you get" card, with the page's own texts (nothing when the page has none). */
export function DeliverableVisualArt({
  visual,
  copy,
  labels,
}: {
  visual: DeliverableVisual;
  copy: Partial<DeliverableVisualsCopy>;
  labels: ChecklistLabels;
}) {
  switch (visual) {
    case "app-screens":
      return copy.appScreens ? <AppScreens copy={copy.appScreens} /> : null;
    case "release-checklist":
      return copy.releaseChecklist ? <Checklist {...copy.releaseChecklist} labels={labels} /> : null;
    case "campaign-dashboard":
      return copy.campaignDashboard ? <CampaignDashboard copy={copy.campaignDashboard} /> : null;
    case "campaign-checklist":
      return copy.campaignChecklist ? <Checklist {...copy.campaignChecklist} labels={labels} /> : null;
    case "search-rankings":
      return copy.searchRankings ? <SearchRankings copy={copy.searchRankings} /> : null;
    case "monthly-report":
      return copy.monthlyReport ? <MonthlyReport copy={copy.monthlyReport} /> : null;
  }
}
