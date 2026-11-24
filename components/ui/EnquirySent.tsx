"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";

/** How long the confirmation stays up before the form is cleared for a new enquiry. */
const RESET_AFTER_MS = 30_000;

/**
 * Confirmation flow shared by the enquiry forms. Call `show(form)` after a submit: the overlay
 * opens, and after 30 seconds (or when the visitor closes it) the form is cleared and `onReset` runs
 * so callers can clear their own state too.
 */
export function useEnquirySent(onReset?: () => void) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const onResetRef = useRef(onReset);
  useEffect(() => {
    onResetRef.current = onReset;
  }, [onReset]);

  const finish = useCallback(() => {
    window.clearTimeout(timer.current);
    formRef.current?.reset();
    onResetRef.current?.();
    setOpen(false);
  }, []);

  const show = useCallback(
    (form: HTMLFormElement | null) => {
      formRef.current = form;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(finish, RESET_AFTER_MS);
      setOpen(true);
    },
    [finish],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { open, show, close: finish };
}

/** "Enquiry sent" overlay (Figma: Overlay · Enquiry sent · Dark / Light). */
export default function EnquirySent({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="enquiry-sent-title"
      aria-describedby="enquiry-sent-body"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Backdrop click, or "Back to home" (which may already be the current page).
        const target = event.target as HTMLElement;
        if (target === event.currentTarget || target.closest("a")) onClose();
      }}
      className="m-auto w-[calc(100%-2.5rem)] max-w-[520px] overflow-visible bg-transparent p-0 text-fg backdrop:bg-bg-deep/70 backdrop:backdrop-blur-sm open:animate-scene-in"
    >
      <div className="flex flex-col items-center gap-5 rounded-[28px] border border-line bg-surface px-6 pt-10 pb-9 text-center shadow-[0_40px_80px_-20px_rgb(3_10_23/0.25)] sm:px-10 dark:shadow-[0_40px_80px_-20px_rgb(3_10_23/0.6)]">
        <Image src="/icons/success.svg" alt="" width={64} height={64} className="size-16" />
        <h2 id="enquiry-sent-title" className="font-display text-[40px] leading-tight font-light text-fg">
          Enquiry sent
        </h2>
        <p id="enquiry-sent-body" className="text-base leading-[1.55] text-fg-muted">
          Thank you. One person from our team will reply with next steps, and a written plan follows the discovery
          call.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" className="shadow-none">
            Back to home
          </ButtonLink>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-[15px] font-medium text-fg transition duration-200 hover:border-brand hover:bg-glass"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
