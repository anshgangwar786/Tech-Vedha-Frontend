import Image from "next/image";
import { ArrowUp, Check, Search } from "lucide-react";
import { SiGoogle, SiGoogleads, SiMailchimp, SiMeta, SiWhatsapp, SiYoutube } from "react-icons/si";
import type { DeliverableVisual } from "@/data/service-pages";
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

function AppScreens() {
  return (
    <div className="flex items-center justify-center gap-[22px]">
      <Phone>
        <p className="flex items-center justify-between text-[10px] font-medium text-fg">
          Your Showroom
          <span className="size-4 rounded-full bg-surface-raised" />
        </p>
        <p className="rounded-full bg-surface-raised px-2.5 py-1 text-[8.5px] text-fg-subtle">Search sofas, lamps…</p>
        <div className="grid flex-1 grid-cols-2 grid-rows-[3fr_2fr] gap-[7px]">
          <p className="flex items-end rounded-[10px] bg-linear-115 from-[#1e9bf0] to-[#1446e0] p-[7px] text-[8.5px] font-medium text-white">
            Festive sale
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
        <p className="text-[10px] font-medium text-fg">Oak lounge chair</p>
        <p className="text-[9px] text-fg-subtle">In stock · 3 stores</p>
        <p className="flex gap-[5px]">
          <span className="h-3.5 w-[35px] rounded bg-surface-raised" />
          <span className="h-3.5 w-[22px] rounded bg-surface-raised" />
        </p>
        <p className="rounded-full bg-primary py-1.5 text-center text-[9px] font-medium text-white">Add to cart</p>
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

const CHANNELS = [
  { name: "Google Search", icon: SiGoogleads, color: "#4285f4", width: "86%" },
  { name: "Meta Ads", icon: SiMeta, color: "#0467df", width: "68%" },
  { name: "YouTube", icon: SiYoutube, color: "#ff0000", width: "44%" },
  { name: "Email", icon: SiMailchimp, color: "#e0a800", width: "56%" },
  { name: "WhatsApp", icon: SiWhatsapp, color: "#25d366", width: "74%" },
];

/** Last-30-days campaign overview with a lead notification. */
function CampaignDashboard() {
  return (
    <div className="relative w-full max-w-[400px]">
      <div className={cx(PANEL, "gap-3")}>
        <PanelHeader title="CAMPAIGNS · LAST 30 DAYS" badge={<>{LIVE_DOT}Live</>} />
        <dl className="grid grid-cols-3 gap-2">
          {[
            ["Leads", "↑ Growing"],
            ["Top channel", "Google Search"],
            ["Report", "Monthly"],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5 rounded-[10px] bg-surface-raised px-2.5 py-2">
              <dt className="text-[9px] font-medium tracking-[0.04em] text-fg-subtle">{label}</dt>
              <dd className="text-xs font-medium text-fg">{value}</dd>
            </div>
          ))}
        </dl>
        <Image src="/services/campaign-chart.svg" alt="" width={364} height={64} className="h-16 w-full" />
        <ul className="flex flex-col gap-[7px]">
          {CHANNELS.map(({ name, icon: Icon, color, width }) => (
            <li key={name} className="flex items-center gap-2 text-[11px] font-medium text-fg">
              <Icon className="size-3 shrink-0" style={{ color }} />
              <span className="w-[92px] shrink-0">{name}</span>
              <Bar width={width} />
              <span className="w-[30px] text-right text-[10px] text-fg-subtle">Live</span>
            </li>
          ))}
        </ul>
      </div>
      <p className={cx(TOAST, "-right-4 bottom-12 w-[202px] sm:-right-24")}>
        <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-[#25d366] text-white">
          <SiWhatsapp className="size-3.5" />
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold text-fg">New enquiry</span>
          <span className="text-[10px] text-fg-subtle">From a Meta ad · just now</span>
        </span>
      </p>
    </div>
  );
}

const KEYWORDS = [
  { keyword: "sofa store near me", width: "92%", rank: "Top 3" },
  { keyword: "buy sofa online", width: "74%", rank: "Page 1" },
  { keyword: "oak lounge chair", width: "86%", rank: "Top 3" },
  { keyword: "home décor store", width: "64%", rank: "Page 1" },
  { keyword: "living room furniture", width: "46%", rank: "Rising" },
];

/** A Google result for the business plus keyword positions. */
function SearchRankings() {
  return (
    <div className="relative w-full max-w-[420px]">
      <div className={cx(PANEL, "gap-3")}>
        <PanelHeader
          title="SEARCH RANKINGS · KEYWORDS"
          badge={
            <>
              <SiGoogle className="size-[11px] text-[#4285f4]" />
              Google
            </>
          }
        />
        <div className="flex flex-col gap-2 rounded-xl bg-surface-raised px-3 py-2.5">
          <p className="flex h-[26px] items-center gap-2 rounded-full border border-line bg-surface px-2.5 text-[11px] text-fg">
            <Search aria-hidden className="size-3 text-fg-subtle" />
            sofa store near me
          </p>
          <p className="flex flex-col gap-0.5">
            <span className="text-[9px] text-fg-subtle">yourstore.in › sofas</span>
            <span className="text-xs font-medium text-brand">Sofas and lounge chairs — Your Store</span>
            <span className="text-[10px] text-fg-subtle">Visit our showroom or order online.</span>
          </p>
        </div>
        <ul className="flex flex-col gap-[7px]">
          {KEYWORDS.map(({ keyword, width, rank }) => (
            <li key={keyword} className="flex h-4 items-center gap-2 text-[11px] font-medium text-fg">
              <span className="w-[140px] shrink-0">{keyword}</span>
              <Bar width={width} />
              <span className="flex w-[58px] items-center justify-end gap-1 text-[10px]">
                <ArrowUp aria-hidden className="size-2.5 text-[#22c55e]" strokeWidth={2.5} />
                {rank}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className={cx(TOAST, "-right-4 -bottom-6 w-[190px] sm:-right-20")}>
        <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-[#22c55e] text-white">
          <ArrowUp aria-hidden className="size-3" strokeWidth={2.5} />
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold text-fg">Page 1 on Google</span>
          <span className="text-[10px] text-fg-subtle">&quot;sofa store near me&quot;</span>
        </span>
      </p>
    </div>
  );
}

const REPORT_CHANNELS = [
  { name: "Search", color: "#4285f4", share: 34 },
  { name: "Meta", color: "#0467df", share: 24 },
  { name: "YouTube", color: "#ff0000", share: 10 },
  { name: "Email", color: "#e0a800", share: 12 },
  { name: "WhatsApp", color: "#25d366", share: 20 },
];

/** Donut slices as a conic gradient, with a small gap between channels. */
const DONUT = (() => {
  let start = 0;
  const stops = REPORT_CHANNELS.map(({ color, share }) => {
    const end = start + share;
    const stop = `${color} ${start}% ${end - 1}%, transparent ${end - 1}% ${end}%`;
    start = end;
    return stop;
  });
  return `conic-gradient(${stops.join(", ")})`;
})();

/** October report: leads by channel, takeaways and the PDF sent to the client. */
function MonthlyReport() {
  return (
    <div className="relative w-full max-w-[380px] sm:-translate-x-12">
      <div className={cx(PANEL, "gap-2.5")}>
        <PanelHeader title="MONTHLY REPORT · OCTOBER" badge={<>{LIVE_DOT}Shared</>} />
        <div className="flex items-center gap-5">
          <span
            className="relative grid size-[84px] shrink-0 place-items-center rounded-full"
            style={{ background: DONUT }}
          >
            <span className="absolute inset-[11px] rounded-full bg-surface" />
            <span className="relative text-center leading-tight text-fg">
              <span className="block text-[7.5px]">Leads by</span>
              <span className="block text-[9px] font-bold">channel</span>
            </span>
          </span>
          <ul className="grid grid-cols-2 gap-x-[18px] gap-y-2">
            {REPORT_CHANNELS.map(({ name, color }) => (
              <li key={name} className="flex items-center gap-1.5 text-[11px] font-medium text-fg">
                <span className="size-2 rounded-[2px]" style={{ background: color }} />
                {name}
              </li>
            ))}
          </ul>
        </div>
        {[
          ["What worked", "Search and WhatsApp brought the most enquiries."],
          ["Next month", "Shift budget from YouTube to Search and Meta retargeting."],
        ].map(([title, detail]) => (
          <p key={title} className="flex flex-col gap-0.5 rounded-[10px] bg-surface-raised px-3 py-2 text-[11px]">
            <span className="font-semibold text-fg">{title}</span>
            <span className="text-fg-subtle">{detail}</span>
          </p>
        ))}
      </div>
      <p className={cx(TOAST, "-right-4 top-[72px] px-3.5 sm:-right-[116px]")}>
        <span className="grid h-9 w-[30px] shrink-0 place-items-center rounded-md bg-linear-130 from-[#1e9bf0] to-[#1446e0] text-[9px] font-semibold text-white">
          PDF
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold text-fg">October report</span>
          <span className="text-[10px] text-fg-subtle">Sent to your inbox</span>
        </span>
      </p>
    </div>
  );
}

type ChecklistItem = { label: string; done: boolean };

const RELEASE_CHECKLIST: ChecklistItem[] = [
  { label: "Login and sign-up", done: true },
  { label: "Payments", done: true },
  { label: "Android devices", done: true },
  { label: "iPhone and iPad", done: true },
  { label: "Store listing", done: false },
];

const CAMPAIGN_CHECKLIST: ChecklistItem[] = [
  { label: "Tracking and analytics", done: true },
  { label: "Keyword research", done: true },
  { label: "Ad creatives", done: true },
  { label: "Audience targeting", done: true },
  { label: "Budget and bids", done: false },
];

/** Glass checklist card with a progress bar: items are "Passed" or "In review". */
function Checklist({ title, items }: { title: string; items: ChecklistItem[] }) {
  const passed = items.filter((item) => item.done).length;

  return (
    <div className="w-full max-w-[360px] rounded-2xl border border-line bg-glass px-[18px] py-4 shadow-[0_30px_60px_rgb(3_10_24/0.35)] backdrop-blur-md">
      <p className="flex justify-between text-[11px] font-medium tracking-[0.08em] text-fg-subtle">
        {title}
        <span className="text-fg">
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
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-[13.5px] text-fg">
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
              {item.done ? "Passed" : "In review"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Decorative illustrations for the "What you get" cards, keyed from the page data. */
export const DELIVERABLE_VISUALS: Record<DeliverableVisual, React.ReactNode> = {
  "app-screens": <AppScreens />,
  "release-checklist": <Checklist title="RELEASE 1.0 · CHECKLIST" items={RELEASE_CHECKLIST} />,
  "campaign-dashboard": <CampaignDashboard />,
  "campaign-checklist": <Checklist title="CAMPAIGN LAUNCH · CHECKLIST" items={CAMPAIGN_CHECKLIST} />,
  "search-rankings": <SearchRankings />,
  "monthly-report": <MonthlyReport />,
};
