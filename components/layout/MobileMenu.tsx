"use client";

import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { SERVICES, serviceHref } from "@/data/services";
import { useDismiss } from "@/hooks/useDismiss";
import { HEADER_LINKS } from "@/lib/site";

/** Hamburger menu for small screens. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(rootRef, open, close);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-full border border-line text-fg"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <nav
        id={panelId}
        hidden={!open}
        aria-label="Mobile"
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-line bg-bg px-5 pt-4 pb-8"
      >
        <p className="text-xs font-medium tracking-[0.16em] text-fg-subtle uppercase">Services</p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <Link href={serviceHref(service.id)} onClick={close} className="flex items-baseline gap-3 py-3.5">
                <span className="font-display text-brand">{service.number}</span>
                <span className="font-medium text-fg">{service.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-col gap-4">
          {HEADER_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={close} className="text-lg text-fg">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/contact" arrow className="mt-8 w-full">
          Start a project
        </ButtonLink>
      </nav>
    </div>
  );
}
