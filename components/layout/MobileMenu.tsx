"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Mail, Menu, MessageCircle, X } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { SERVICES as BUNDLED_SERVICES, serviceHref, type Service } from "@/data/services";
import { useDismiss } from "@/hooks/useDismiss";
import { cx } from "@/lib/cx";
import {
  EMAIL_URL as BUNDLED_EMAIL_URL,
  HEADER_LINKS as BUNDLED_HEADER_LINKS,
  HEADER as BUNDLED_HEADER,
  SITE as BUNDLED_SITE,
  WHATSAPP_URL as BUNDLED_WHATSAPP_URL,
  type HeaderCopy,
  type NavLink,
} from "@/lib/site";

/**
 * Hamburger menu for phones and tablets: a sheet that fills the screen under the header.
 * The page behind it can't scroll while it is open. Closes on Escape, an outside tap, a link tap,
 * or when the window grows to the desktop layout.
 */
export default function MobileMenu({
  SERVICES = BUNDLED_SERVICES,
  HEADER_LINKS = BUNDLED_HEADER_LINKS,
  SITE = BUNDLED_SITE,
  EMAIL_URL = BUNDLED_EMAIL_URL,
  WHATSAPP_URL = BUNDLED_WHATSAPP_URL,
  HEADER = BUNDLED_HEADER,
}: {
  SERVICES?: Service[];
  HEADER_LINKS?: NavLink[];
  SITE?: { email: string };
  EMAIL_URL?: string;
  WHATSAPP_URL?: string;
  HEADER?: HeaderCopy;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(rootRef, open, close);

  // Lock the page behind the sheet, and close it if the window widens to the desktop header.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => desktop.matches && close();
    desktop.addEventListener("change", onChange);
    return () => {
      root.style.overflow = previous;
      desktop.removeEventListener("change", onChange);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors aria-expanded:border-brand"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <nav
        id={panelId}
        hidden={!open}
        aria-label="Mobile"
        // Any link tapped in the sheet closes it (and releases the scroll lock) as the next page opens.
        onClick={(event) => (event.target as HTMLElement).closest("a") && close()}
        className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-line bg-bg animate-scene-in"
      >
        <div className="mx-auto flex min-h-full w-full max-w-[640px] flex-col px-5 pt-5 pb-8 sm:px-8">
          <p className="text-xs font-medium tracking-[0.16em] text-fg-subtle uppercase">{HEADER.servicesLabel}</p>
          <ul className="mt-2 divide-y divide-line border-y border-line">
            {SERVICES.map((service) => {
              const href = serviceHref(service);
              const current = href === pathname;
              return (
                <li key={service.id}>
                  <Link
                    href={href}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className="group flex min-h-16 items-center gap-3.5 py-3"
                  >
                    <span className="w-6 font-display text-lg leading-none font-light text-brand">{service.number}</span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[11px] font-medium tracking-[0.12em] text-fg-subtle uppercase">
                        {service.wing}
                      </span>
                      <span className={cx("text-base font-medium", current ? "text-brand" : "text-fg")}>
                        {service.title}
                      </span>
                    </span>
                    <ArrowUpRight aria-hidden className="size-4 shrink-0 text-fg-subtle transition-colors group-hover:text-brand" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="mt-4 flex flex-col">
            {HEADER_LINKS.map((link, index) => {
              const current = link.href === pathname;
              return (
                <li key={index}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className={cx(
                      "flex min-h-12 items-center gap-2.5 font-display text-2xl",
                      current ? "text-brand" : "text-fg",
                    )}
                  >
                    {link.label}
                    {current && <span aria-hidden className="size-1.5 rounded-full bg-brand" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <ButtonLink href="/contact" arrow startProject className="w-full">
              {HEADER.ctaLabel}
            </ButtonLink>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line text-[15px] font-medium text-fg transition-colors hover:border-brand"
              >
                <MessageCircle aria-hidden className="size-4 text-brand" />
                {HEADER.whatsappLabel}
              </a>
              <a
                href={EMAIL_URL}
                onClick={close}
                aria-label={`Email ${SITE.email}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line text-[15px] font-medium text-fg transition-colors hover:border-brand"
              >
                <Mail aria-hidden className="size-4 text-brand" />
                {HEADER.emailLabel}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
