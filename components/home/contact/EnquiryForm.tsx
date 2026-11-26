"use client";

import { useCallback, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { sendEnquiry, type EnquiryResult } from "@/app/actions/enquiry";
import { ENQUIRY_FORM_COPY, type EnquiryFormCopy } from "@/data/forms";
import { SITE as BUNDLED_SITE } from "@/lib/site";
import { mailtoHref } from "@/lib/utils";
import EnquirySent, { useEnquirySent } from "@/components/ui/EnquirySent";
import { Honeypot } from "@/components/ui/Honeypot";
import { ErrorSlot, FieldError, INVALID_FIELD, useFieldErrors } from "@/components/ui/FieldError";
import { cleanPhoneInput, focusFirstError, validateHomepageEnquiry } from "@/lib/formValidation";

const label = "text-[13px] font-medium text-fg-muted";
const field =
  "w-full rounded-xl border border-line bg-surface-raised/70 px-4 text-base text-fg transition-colors placeholder:text-fg-subtle hover:border-brand/60 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none " +
  INVALID_FIELD;

/**
 * Enquiry form. Submitting saves the enquiry in Tech-Vedha-Admin (Leads) through a Server Action; if the admin can't
 * be reached it opens the visitor's email app with the details filled in (to SITE.email) instead.
 * Every field is checked before sending (lib/formValidation.ts), with the message shown under the field.
 */
export default function EnquiryForm({
  SITE = BUNDLED_SITE,
  copy = ENQUIRY_FORM_COPY,
}: {
  SITE?: { email: string };
  /** Labels, service choices, messages and the "Enquiry sent" pop-up: the page's own copy (admin: that page → Contact). */
  copy?: EnquiryFormCopy;
}) {
  const sent = useEnquirySent();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const messages = copy.validation;
  const validate = useCallback((data: FormData) => validateHomepageEnquiry(data, messages), [messages]);
  const { errors, validateForm, formHandlers, fieldProps, errorId, clear, show } = useFieldErrors(validate);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (sending) return;
    const invalid = validateForm(form);
    if (Object.keys(invalid).length) {
      setError("");
      focusFirstError(form, invalid);
      return;
    }
    const data = new FormData(form);
    setSending(true);
    setError("");
    const result: EnquiryResult = await sendEnquiry("homepage", data).catch(() => ({
      ok: false,
      message: "",
      fallback: true,
    }));
    setSending(false);
    if (result.ok) {
      clear();
      sent.show(form);
      return;
    }
    if (!result.fallback) {
      if (result.fieldErrors && Object.keys(result.fieldErrors).length) {
        show(result.fieldErrors);
        focusFirstError(form, result.fieldErrors);
      }
      setError(result.message || copy.errorMessage);
      return;
    }
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `${copy.emailSubject}${value("service") ? ` — ${value("service")}` : ""}`;
    const body = [
      `${copy.nameLabel}: ${value("name")}`,
      `${copy.phoneLabel}: ${value("phone")}`,
      `${copy.emailLabel}: ${value("email")}`,
      `${copy.serviceLabel}: ${value("service") || copy.emailNoService}`,
      "",
      value("message"),
    ].join("\n");

    window.location.href = mailtoHref(SITE.email, subject, body);
    sent.show(form);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        {...formHandlers}
        aria-label={copy.formLabel}
        data-reveal="right"
        className="reveal @container rounded-3xl border border-line bg-glass p-5 backdrop-blur-xl sm:p-9"
      >
        <Honeypot />
        {/* Every field keeps a fixed slot for its message, so errors never change the form's height.
            Two-up only when the form itself is wide enough (it sits in a column on desktop). */}
        <div className="grid gap-x-4 gap-y-3 @md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={label}>{copy.nameLabel}</span>
            <input name="name" required maxLength={100} autoComplete="name" className={`${field} h-12`} {...fieldProps("name")} />
            <ErrorSlot className="-mt-1">
              <FieldError id={errorId("name")} message={errors.name} />
            </ErrorSlot>
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>{copy.phoneLabel}</span>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              required
              maxLength={16}
              autoComplete="tel"
              defaultValue={copy.phonePrefill}
              placeholder={copy.phonePlaceholder}
              onInput={(e) => {
                const clean = cleanPhoneInput(e.currentTarget.value);
                if (clean !== e.currentTarget.value) e.currentTarget.value = clean;
              }}
              className={`${field} h-12`}
              {...fieldProps("phone")}
            />
            <ErrorSlot className="-mt-1">
              <FieldError id={errorId("phone")} message={errors.phone} />
            </ErrorSlot>
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>{copy.emailLabel}</span>
            <input name="email" type="email" required maxLength={191} autoComplete="email" className={`${field} h-12`} {...fieldProps("email")} />
            <ErrorSlot className="-mt-1">
              <FieldError id={errorId("email")} message={errors.email} />
            </ErrorSlot>
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>{copy.serviceLabel}</span>
            <span className="relative">
              <select name="service" defaultValue="" className={`${field} h-12 appearance-none pr-10`}>
                <option value="">{copy.servicePlaceholder}</option>
                {[...new Set(copy.serviceOptions.map((option) => option.trim()).filter(Boolean))].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-muted" />
            </span>
            {/* Optional, never shows an error: the empty slot keeps the rows even. */}
            <ErrorSlot className="-mt-1" />
          </label>
          <label className="flex flex-col gap-2 @md:col-span-2">
            <span className={label}>{copy.messageLabel}</span>
            <textarea
              name="message"
              rows={4}
              maxLength={2000}
              placeholder={copy.messagePlaceholder}
              className={`${field} min-h-[122px] resize-y py-3 leading-6`}
              {...fieldProps("message")}
            />
            {/* The message's own error, or else a server message for the whole form, in the same reserved line. */}
            <ErrorSlot className="-mt-1">
              {errors.message ? (
                <FieldError id={errorId("message")} message={errors.message} />
              ) : (
                <span role="status" className={error ? "text-[12.5px] font-medium text-danger" : "sr-only"}>
                  {error}
                </span>
              )}
            </ErrorSlot>
          </label>
          <button
            type="submit"
            aria-disabled={sending}
            className="mt-1 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-white transition hover:brightness-110 @md:col-span-2"
          >
            {copy.submitLabel}
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
      </form>
      <EnquirySent open={sent.open} onClose={sent.close} copy={copy.sent} />
    </>
  );
}
