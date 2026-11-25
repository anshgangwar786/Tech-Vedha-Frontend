import { Globe, Lock, Monitor } from "lucide-react";
import StatusIcon from "@/components/home/mock/StatusIcon";
import Chip from "@/components/ui/Chip";
import { cx } from "@/lib/cx";

const VAULT = [
  { name: "Customer records", digits: "4821" },
  { name: "Payment data", digits: "0937" },
  { name: "Staff accounts", digits: "1150" },
];

export function DataVault() {
  return (
    <ul className="@container flex flex-col gap-[7px] p-3.5">
      {VAULT.map((record, index) => (
        <li
          key={record.name}
          className="flex items-center gap-2.5 rounded-[10px] border border-line bg-surface px-2.5 py-2"
        >
          <span
            className={cx(
              "grid size-[26px] shrink-0 place-items-center rounded-lg",
              index === 0 ? "bg-linear-135 from-[#1e9bf0] to-[#1446e0] text-white" : "bg-surface-raised text-brand",
            )}
          >
            <Lock aria-hidden className="size-[13px]" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[11.5px] font-medium text-fg">{record.name}</span>
            <span className="block font-mono text-[10.5px] tracking-[0.04em] whitespace-nowrap text-fg-muted">•••• •••• {record.digits}</span>
          </span>
          <Chip size="xs" className="ml-auto @max-[239px]:hidden">
            Encrypted
          </Chip>
        </li>
      ))}
    </ul>
  );
}

export function Firewall() {
  return (
    <div className="flex h-full items-center justify-between px-4 text-[10.5px] font-medium text-fg-muted">
      <span className="flex flex-col items-center gap-2">
        <Globe aria-hidden className="size-10 rounded-full border border-line bg-surface p-2.5 text-fg" />
        Internet
      </span>
      <span aria-hidden className="h-px flex-1 border-t border-dashed border-fg-subtle" />
      <span className="flex flex-col items-center gap-2 pt-6 text-fg">
        <span className="h-[94px] w-[18px] rounded-full bg-linear-to-b from-[#1e9bf0] to-[#1446e0] shadow-[0_0_24px_var(--glow)]" />
        Firewall
      </span>
      <span aria-hidden className="h-px flex-1 bg-brand" />
      <span className="flex flex-col items-center gap-2">
        <Monitor aria-hidden className="size-[50px] rounded-xl border border-accent bg-surface p-3.5 text-accent" />
        Your systems
      </span>
    </div>
  );
}

const ACTIVITY = [3, 5, 2, 6, 4, 9, 4, 3, 6, 4, 3, 5, 4, 8, 4];
const EVENTS = [
  { label: "Blocked login attempt", time: "2m" },
  { label: "Suspicious IP blocked", time: "14m" },
  { label: "Malware scan clean", time: "1h" },
];

export function ThreatMonitor() {
  return (
    <div className="p-3.5">
      <p className="flex items-center justify-between text-[11.5px] font-medium text-fg">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full border-2 border-brand/40 bg-brand" />
          Monitoring live
        </span>
        <span className="text-[10.5px] font-normal text-fg-subtle">24 h</span>
      </p>
      <div aria-hidden className="mt-3 flex h-[26px] items-end gap-1">
        {ACTIVITY.map((height, index) => (
          <span
            key={index}
            className={cx("flex-1 rounded-sm", height > 7 ? "bg-brand" : "bg-surface-raised")}
            style={{ height: `${height * 10}%` }}
          />
        ))}
      </div>
      <ul className="mt-2">
        {EVENTS.map((event) => (
          <li key={event.label} className="flex items-center gap-2 border-b border-line py-1.5 text-[11px] text-fg">
            <span className="size-1.5 rounded-full bg-brand" />
            {event.label}
            <span className="ml-auto text-fg-subtle">{event.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const AUDIT = [
  { label: "Access policy", done: true },
  { label: "Audit trail", done: true },
  { label: "Data retention", done: true },
  { label: "Risk review", done: false },
];

export function AuditChecklist() {
  return (
    <div className="px-3.5 pt-3">
      <p className="flex items-center gap-4 border-b border-line pb-2.5">
        <span className="grid size-10 place-items-center rounded-full border-2 border-brand border-r-line text-[11px] font-medium text-fg">
          3/4
        </span>
        <span className="text-xs font-medium text-fg">
          Audit-ready
          <span className="block text-[10.5px] font-normal text-fg-muted">One review scheduled</span>
        </span>
      </p>
      <ul>
        {AUDIT.map((item) => (
          <li
            key={item.label}
            className={cx(
              "flex items-center justify-between border-b border-line py-1.5 text-[11px] last:border-0",
              item.done ? "text-fg" : "text-fg-muted",
            )}
          >
            {item.label}
            <StatusIcon done={item.done} />
          </li>
        ))}
      </ul>
    </div>
  );
}
