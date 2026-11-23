"use client";

import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SERVICES, serviceHref } from "@/data/services";
import { useDismiss } from "@/hooks/useDismiss";
import { EMAIL_URL, SITE, WHATSAPP_URL } from "@/lib/site";
import { cx } from "@/lib/cx";

/** Desktop "Services" trigger with the four-column mega menu. */
export default function ServicesMenu() {
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
        Services
        <ChevronDown aria-hidden className={cx("size-3 transition-transform", open && "rotate-180")} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full mx-auto mt-2 w-full max-w-[1120px] overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_40px_80px_-40px_rgb(3_10_24/0.7)]"
      >
        <div className="grid grid-cols-4 gap-8 px-8 pt-9 pb-8">
          {SERVICES.map((service) => (
            <div key={service.id}>
              <p className="text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
                {service.number} · {service.wing}
              </p>
              <Link
                href={serviceHref(service.id)}
                onClick={close}
                className="mt-3 flex items-center gap-1 font-display text-xl text-fg hover:text-brand"
              >
                {service.title}
                <ArrowRight aria-hidden className="size-4 shrink-0" />
              </Link>
              <ul className="mt-6 flex flex-col gap-4">
                {service.offerings.map((offering) => (
                  <li key={offering.title}>
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
            Why manage four vendors? One partner designs, builds, secures and markets it.{" "}
            <Link href="/#why" onClick={close} className="text-brand hover:underline">
              See how it fits together →
            </Link>
          </p>
          <div className="flex gap-4 text-brand">
            <a href={EMAIL_URL} className="hover:underline">
              {SITE.email}
            </a>
            <Link href={WHATSAPP_URL} onClick={close} className="hover:underline">
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
