"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import type { ContactFormCopy } from "@/data/forms";

/** Attribute that turns any link into a "Start a project" trigger (see ButtonLink's `startProject`). */
export const START_PROJECT_ATTR = "data-start-project";

type StartProjectModalProps = {
  SITE: { email: string };
  WHATSAPP_URL: string;
  /** The pop-up's own form copy (Site & menus → "Start a project" pop-up), with its close-button label. */
  copy: ContactFormCopy & { a11y: { closeLabel: string } };
};

/**
 * Site-wide "Start a project" popup with the enquiry form. Mounted once in the root layout. Any link carrying
 * `data-start-project` opens it instead of navigating (the link's href stays as the no-JS fallback; Ctrl/Cmd-click
 * still opens the page in a new tab). Closes with the ✕ button, Escape, or a click on the backdrop.
 */
export default function StartProjectModal({ SITE, WHATSAPP_URL, copy }: StartProjectModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const trigger = (event.target as HTMLElement | null)?.closest(`[${START_PROJECT_ATTR}]`);
      if (!trigger) return;
      // Capture phase: runs before Next's <Link> handler, which then skips navigation.
      event.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    // Keep the page behind still while the popup is open.
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={copy.title}
      onCancel={(event) => {
        event.preventDefault();
        setOpen(false);
      }}
      onClose={() => setOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
      className="m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-[760px] overflow-visible bg-transparent p-0 text-fg backdrop:bg-bg-deep/70 backdrop:backdrop-blur-sm open:animate-scene-in"
    >
      <div className="relative max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-[28px] border border-line bg-surface p-5 shadow-[0_40px_80px_-20px_rgb(3_10_23/0.25)] sm:p-9 dark:shadow-[0_40px_80px_-20px_rgb(3_10_23/0.6)]">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={copy.a11y.closeLabel}
          className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full border border-line bg-surface text-fg transition-colors duration-200 hover:border-brand hover:text-brand sm:top-6 sm:right-6"
        >
          <X aria-hidden className="size-5" />
        </button>
        {/* Stays mounted, so anything typed survives an accidental close. pr-12 keeps the title clear of the ✕. */}
        <div className="[&_form_h2]:pr-12">
          <ContactForm SITE={SITE} WHATSAPP_URL={WHATSAPP_URL} copy={copy} />
        </div>
      </div>
    </dialog>
  );
}
