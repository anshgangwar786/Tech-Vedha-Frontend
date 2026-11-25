"use client";

import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SERVICES as BUNDLED_SERVICES, countWord, serviceHref, type Service } from "@/data/services";
import { useDismiss } from "@/hooks/useDismiss";
import { withCount } from "@/data/home";
import {
  EMAIL_URL as BUNDLED_EMAIL_URL,
  HEADER as BUNDLED_HEADER,
  SITE as BUNDLED_SITE,
  WHATSAPP_URL as BUNDLED_WHATSAPP_URL,
  type HeaderCopy,
} from "@/lib/site";
import { cx } from "@/lib/cx";

/** Desktop "Services" trigger with the mega menu (one column per service). */
export default function ServicesMenu({
  SERVICES = BUNDLED_SERVICES,
  SITE = BUNDLED_SITE,
  EMAIL_URL = BUNDLED_EMAIL_URL,
  WHATSAPP_URL = BUNDLED_WHATSAPP_URL,
  HEADER = BUNDLED_HEADER,
}: {
  SERVICES?: Service[];
  SITE?: { email: string };
  EMAIL_URL?: string;
  WHATSAPP_URL?: string;
  HEADER?: HeaderCopy;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(rootRef, open, close);

  return (
    <div ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-1.5 px-3.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg aria-expanded:text-fg"
      >
        {HEADER.servicesLabel}
        <ChevronDown aria-hidden className={cx("size-3 transition-transform", open && "rotate-180")} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full mx-auto mt-2 w-full max-w-[1120px] overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_40px_80px_-40px_rgb(3_10_24/0.7)]"
      >
        {/* One column per service up to five; more wrap onto a second row. */}
        <div
          style={{ "--cols": SERVICES.length <= 5 ? SERVICES.length : Math.ceil(SERVICES.length / 2) } as React.CSSProperties}
          className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-8 px-8 pt-9 pb-8"
        >
          {SERVICES.map((service) => (
            <div key={service.id}>
              <p className="text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
                {service.number} · {service.wing}
              </p>
              <Link
                href={serviceHref(service)}
                onClick={close}
                className="mt-3 flex items-center gap-1 font-display text-xl text-fg hover:text-brand"
              >
                {service.title}
                <ArrowRight aria-hidden className="size-4 shrink-0" />
              </Link>
              <ul className="mt-6 flex flex-col gap-4">
                {service.offerings.map((offering, index) => (
                  <li key={index}>
                    <p className="text-sm font-medium text-fg">{offering.title}</p>
                    <p className="text-[13px] text-fg-subtle">{offering.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-line px-8 py-4 text-sm">
          <p className="text-fg-muted">
            {withCount(HEADER.servicesNote, countWord(SERVICES.length).toLowerCase())}{" "}
            {HEADER.servicesLinkLabel.trim() && (
              <Link href={HEADER.servicesLinkHref || "/#why"} onClick={close} className="text-brand hover:underline">
                {HEADER.servicesLinkLabel} →
              </Link>
            )}
          </p>
          <div className="flex gap-4 text-brand">
            <a href={EMAIL_URL} className="hover:underline">
              {SITE.email}
            </a>
            <Link href={WHATSAPP_URL} onClick={close} className="hover:underline">
              {HEADER.whatsappLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
