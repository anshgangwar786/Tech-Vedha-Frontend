"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, CircleAlert } from "lucide-react";
import { Glyph, type ContactGlyphName } from "@/components/contact/icons";
import { sendEnquiry, type EnquiryResult } from "@/app/actions/enquiry";
import { FORM as BUNDLED_FORM, TIMEFRAMES as BUNDLED_TIMEFRAMES, type ContactFormCopy } from "@/data/contact";
import { SERVICES as BUNDLED_SERVICES, type Service } from "@/data/services";
import { SITE as BUNDLED_SITE, WHATSAPP_URL as BUNDLED_WHATSAPP_URL, type EnquirySentCopy } from "@/lib/site";
import { cx } from "@/lib/cx";
import { mailtoHref } from "@/lib/utils";
import EnquirySent, { useEnquirySent } from "@/components/ui/EnquirySent";
import { Honeypot } from "@/components/ui/Honeypot";
import { ErrorSlot, FieldError, INVALID_FIELD, useFieldErrors } from "@/components/ui/FieldError";
import { cleanPhoneInput, focusFirstError, validateContactEnquiry } from "@/lib/formValidation";

const LABEL = "text-[13px] font-medium text-fg";
/** Service option: a 2-up tile on phones, a pill from `sm` up. */
const CHIP =
  "flex cursor-pointer items-center gap-2.5 border border-line bg-surface text-[13px] font-medium text-fg max-sm:min-h-14 max-sm:rounded-2xl max-sm:px-3 max-sm:py-2.5 max-sm:text-sm max-sm:leading-tight max-sm:has-checked:ring-1 max-sm:has-checked:ring-brand/40 sm:h-10 sm:gap-2 sm:rounded-full sm:pr-4 sm:pl-3 transition-colors duration-200 hover:border-brand/60 has-checked:border-brand has-checked:bg-surface-raised has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand";
const CHECKBOX =
  "flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-line text-white transition-colors duration-200 peer-checked:border-brand peer-checked:bg-brand [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100";
const FIELD =
  "w-full rounded-[14px] border border-line bg-surface pr-4 pl-[42px] text-base text-fg transition-colors sm:text-sm duration-200 placeholder:text-fg-subtle hover:border-brand/60 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none " +
  INVALID_FIELD;

/** Numbered group label for the single-column layout: splits the long form into three short parts. */
function PhoneStep({ number, children, className }: { number: string; children: React.ReactNode; className?: string }) {
  return (
    <p aria-hidden className={cx("flex items-center gap-2.5 @md:hidden", className)}>
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-semibold text-white">
        {number}
      </span>
      <span className="text-[11px] font-medium tracking-[0.14em] text-fg-subtle uppercase">{children}</span>
      <span className="h-px flex-1 bg-line" />
    </p>
  );
}

function Required() {
  return (
    <span aria-hidden className="text-brand">
      {" "}
      *
    </span>
  );
}

type FieldProps = {
  name: string;
  label: string;
  icon: ContactGlyphName;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onInput?: React.FormEventHandler<HTMLInputElement>;
  error?: string;
  errorId: string;
};

function Field({
  name,
  label,
  icon,
  placeholder,
  type = "text",
  autoComplete,
  defaultValue,
  maxLength,
  inputMode,
  onInput,
  error,
  errorId,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className={LABEL}>
        {label}
        <Required />
      </span>
      <span className="relative">
        <Glyph name={icon} className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-subtle" />
        <input
          name={name}
          type={type}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={maxLength}
          inputMode={inputMode}
          onInput={onInput}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cx(FIELD, "h-[50px]")}
        />
      </span>
      <ErrorSlot className="-mt-1.5">
        <FieldError id={errorId} message={error} />
      </ErrorSlot>
    </label>
  );
}

/** Reads the form into the fields shared by the email and WhatsApp summaries. */
function readEnquiry(form: HTMLFormElement, OTHER: string) {
  const data = new FormData(form);
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const picked = data.getAll("service").map((entry) => String(entry));
  const other = value("otherService");
  return {
    services: picked.map((name) => (name === OTHER && other ? `Other: ${other}` : name)),
    name: value("name"),
    company: value("company"),
    phone: value("phone").replace(/\s+/g, " "),
    email: value("email"),
    city: value("city"),
    timeframe: value("timeframe"),
    message: value("message"),
  };
}

/** Plain-text summary for the email fallback. */
function summarise(form: HTMLFormElement, OTHER: string) {
  const e = readEnquiry(form, OTHER);
  const service = e.services.join(", ");
  const lines = [
    `${e.services.length > 1 ? "Services" : "Service"}: ${service}`,
    `Name: ${e.name}`,
    `Company: ${e.company}`,
    `Phone / WhatsApp: ${e.phone}`,
    `Email: ${e.email}`,
    `City / country: ${e.city}`,
    `Start: ${e.timeframe}`,
  ];
  if (e.message) lines.push("", e.message);
  return { service, body: lines.join("\n") };
}

/**
 * WhatsApp-formatted summary: *bold* section headings, one service per bullet, one field per line, so the lead reads
 * the same way every time. Formatting markers typed by the visitor are neutralised so they can't break the layout.
 */
function summariseForWhatsApp(form: HTMLFormElement, OTHER: string) {
  const e = readEnquiry(form, OTHER);
  const clean = (text: string) => text.replace(/[*_~`]/g, (char) => `${char}​`);
  /** `raw` skips cleaning for values the team copies out (email, phone), so they paste back exactly as typed. */
  const row = (label: string, text: string, raw = false) => `${label}: ${(raw ? text : clean(text)) || "—"}`;
  const sections = [
    "*NEW PROJECT ENQUIRY*\n_Sent from the website contact form_",
    ["*Services needed*", ...e.services.map((service) => `• ${clean(service)}`)].join("\n"),
    [
      "*Contact details*",
      row("Name", e.name),
      row("Company", e.company),
      row("Phone", e.phone, true),
      row("Email", e.email, true),
      row("Location", e.city),
    ].join("\n"),
    ["*Timeline*", row("Start", e.timeframe)].join("\n"),
  ];
  if (e.message) sections.push(`*Project details*\n${clean(e.message)}`);
  return sections.join("\n\n");
}

type ContactFormProps = {
  /** Live content from the admin (bundled copy when omitted). */
  SERVICES?: Service[];
  TIMEFRAMES?: string[];
  SITE?: { email: string };
  WHATSAPP_URL?: string;
  /** Labels, placeholders and buttons (admin: Contact → Form). */
  copy?: ContactFormCopy;
  /** "Enquiry sent" pop-up text (admin: Site & menus). */
  sentCopy?: EnquirySentCopy;
};

/**
 * Enquiry form. Sending saves the enquiry in Tech-Vedha-Admin (Leads) through a Server Action; if the admin can't be
 * reached it opens the visitor's email app (to SITE.email) with the details filled in instead. "Prefer WhatsApp?"
 * opens WhatsApp with the same details. Every field is checked first (lib/formValidation.ts), with the message
 * shown under the field.
 */
export default function ContactForm({
  SERVICES = BUNDLED_SERVICES,
  TIMEFRAMES = BUNDLED_TIMEFRAMES,
  SITE = BUNDLED_SITE,
  WHATSAPP_URL = BUNDLED_WHATSAPP_URL,
  copy = BUNDLED_FORM,
  sentCopy,
}: ContactFormProps) {
  /** The "something else" option; its text box opens when it is ticked. */
  const otherLabel = copy.otherServiceLabel;
  const OTHER = useMemo(() => otherLabel.trim() || "Others", [otherLabel]);
  const formRef = useRef<HTMLFormElement>(null);
  /** Unique ids: the form can appear twice on a page (inline on /contact and in the "Start a project" popup). */
  const uid = useId();
  const titleId = `${uid}-enquiry-title`;
  const otherId = `${uid}-other-service`;
  /** Form-level message, shown in place of the reassurance note so the form never changes height. */
  const [status, setStatusState] = useState({ text: "", error: false });
  const setStatus = (text: string, error = false) => setStatusState({ text, error });
  const [sending, setSending] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const otherOpen = selected.includes(OTHER);
  const validate = useCallback((data: FormData) => validateContactEnquiry(data, OTHER), [OTHER]);
  const { errors, validateForm, formHandlers, fieldProps, errorId, clear, show } = useFieldErrors(validate);
  const sent = useEnquirySent(
    useCallback(() => {
      setSelected([]);
      setStatusState({ text: "", error: false });
      clear();
    }, [clear]),
  );


  const toggle = (name: string, checked: boolean) =>
    setSelected((current) => (checked ? [...current, name] : current.filter((entry) => entry !== name)));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (sending) return;
    const invalid = validateForm(form);
    if (Object.keys(invalid).length) {
      setStatus("Please fix the highlighted fields.", true);
      focusFirstError(form, invalid);
      return;
    }
    setSending(true);
    setStatus("Sending your enquiry…");
    const result: EnquiryResult = await sendEnquiry("contact", new FormData(form)).catch(() => ({
      ok: false,
      message: "",
      fallback: true,
    }));
    setSending(false);
    if (result.ok) {
      setStatus("Your enquiry is in. We’ll reply with next steps.");
      sent.show(form);
      return;
    }
    if (!result.fallback) {
      if (result.fieldErrors && Object.keys(result.fieldErrors).length) {
        show(result.fieldErrors);
        focusFirstError(form, result.fieldErrors);
      }
      setStatus(result.message || "Please check your details and try again.", true);
      return;
    }
    const { service, body } = summarise(form, OTHER);
    window.location.href = mailtoHref(SITE.email, `Project enquiry — ${service}`, body);
    setStatus("Your email app should open with your details. Send it and we’ll reply.");
    sent.show(form);
  };

  const sendOnWhatsApp = () => {
    const form = formRef.current;
    if (!form) return;
    const invalid = validateForm(form);
    if (Object.keys(invalid).length) {
      setStatus("Please fix the highlighted fields.", true);
      focusFirstError(form, invalid);
      return;
    }
    const text = summariseForWhatsApp(form, OTHER);
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setStatus("WhatsApp opened in a new tab with your details filled in.");
    sent.show(form);
  };

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit} {...formHandlers} aria-labelledby={titleId} className="@container flex flex-col gap-5">
        <Honeypot />
        <div className="flex flex-col gap-1.5">
          <h2 id={titleId} className="font-display text-[28px] leading-tight tracking-[-0.01em] text-fg sm:text-[30px]">
            {copy.title}
          </h2>
          {copy.requiredNote.trim() && <p className="text-[13px] text-fg-subtle">{copy.requiredNote}</p>}
        </div>

        <PhoneStep number="1" className="-mb-1">{copy.step1}</PhoneStep>
        <fieldset className="-mb-3 flex flex-col gap-2.5" {...fieldProps("service")}>
          <legend className={cx(LABEL, "mb-2.5")}>
            {copy.servicesLabel}
            <Required />
          </legend>
          {/* One column on the smallest phones (< 360 px), where long words would not fit two-up. */}
          <div className="grid grid-cols-2 gap-2 max-[359px]:grid-cols-1 sm:flex sm:flex-wrap">
            {[...new Set([...SERVICES.map((service) => service.title), OTHER])].map((name) => (
              <label key={name} className={cx(CHIP, name === OTHER && "max-sm:col-span-full")}>
                <input
                  type="checkbox"
                  name="service"
                  value={name}
                  checked={selected.includes(name)}
                  onChange={(event) => toggle(name, event.target.checked)}
                  aria-controls={name === OTHER ? otherId : undefined}
                  aria-expanded={name === OTHER ? otherOpen : undefined}
                  className="peer sr-only"
                />
                <span aria-hidden className={CHECKBOX}>
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {name}
              </label>
            ))}
            {otherOpen && (
              <input
                id={otherId}
                name="otherService"
                required
                autoFocus
                maxLength={200}
                aria-label={copy.otherServicePlaceholder || OTHER}
                {...fieldProps("otherService")}
                placeholder={copy.otherServicePlaceholder}
                className={"h-[50px] w-full min-w-0 flex-1 rounded-[14px] border border-line bg-surface px-4 text-base text-fg transition-colors max-sm:col-span-full sm:h-10 sm:rounded-full sm:w-auto sm:min-w-[220px] sm:text-[13px] duration-200 placeholder:text-fg-subtle hover:border-brand/60 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none " + INVALID_FIELD}
              />
            )}
          </div>
          <ErrorSlot className="-mt-1.5">
            <FieldError id={errorId("service")} message={errors.service} />
            <FieldError id={errorId("otherService")} message={errors.otherService} />
          </ErrorSlot>
        </fieldset>

        <PhoneStep number="2" className="mt-2 -mb-1">{copy.step2}</PhoneStep>
        {/* Two-up only when the form itself is wide enough (not by screen width: the form sits in a column). */}
        <div className="-mb-3 grid gap-x-[18px] gap-y-2 @md:grid-cols-2">
          <Field
            name="name"
            label={copy.nameLabel}
            icon="user"
            placeholder={copy.namePlaceholder}
            autoComplete="name"
            maxLength={100}
            error={errors.name}
            errorId={errorId("name")}
          />
          <Field
            name="company"
            label={copy.companyLabel}
            icon="building"
            placeholder={copy.companyPlaceholder}
            autoComplete="organization"
            maxLength={150}
            error={errors.company}
            errorId={errorId("company")}
          />
          <Field
            name="phone"
            label={copy.phoneLabel}
            icon="phone"
            placeholder={copy.phonePlaceholder}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue="+91 "
            maxLength={16}
            onInput={(e) => {
              const clean = cleanPhoneInput(e.currentTarget.value);
              if (clean !== e.currentTarget.value) e.currentTarget.value = clean;
            }}
            error={errors.phone}
            errorId={errorId("phone")}
          />
          <Field
            name="email"
            label={copy.emailLabel}
            icon="mail"
            placeholder={copy.emailPlaceholder}
            type="email"
            autoComplete="email"
            maxLength={191}
            error={errors.email}
            errorId={errorId("email")}
          />
          <Field
            name="city"
            label={copy.cityLabel}
            icon="pin"
            placeholder={copy.cityPlaceholder}
            autoComplete="address-level2"
            maxLength={150}
            error={errors.city}
            errorId={errorId("city")}
          />
          <PhoneStep number="3" className="mt-2 mb-2">{copy.step3}</PhoneStep>
          <label className="flex flex-col gap-2.5">
            <span className={LABEL}>
              {copy.timeframeLabel}
              <Required />
            </span>
            <span className="relative">
              <Glyph name="calendar" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-subtle" />
              <select
                name="timeframe"
                required
                defaultValue=""
                className={cx(FIELD, "h-[50px] appearance-none pr-10 invalid:text-fg-subtle")}
                {...fieldProps("timeframe")}
              >
                <option value="" disabled>
                  {copy.timeframePlaceholder}
                </option>
                {[...new Set(TIMEFRAMES.filter((timeframe) => timeframe.trim()))].map((timeframe) => (
                  <option key={timeframe} value={timeframe}>
                    {timeframe}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-subtle" />
            </span>
            <ErrorSlot className="-mt-1.5">
              <FieldError id={errorId("timeframe")} message={errors.timeframe} />
            </ErrorSlot>
          </label>
        </div>

        <label className="flex flex-col gap-2.5">
          <span className={LABEL}>{copy.messageLabel}</span>
          <span className="relative">
            <Glyph name="file" className="pointer-events-none absolute top-[15px] left-4 size-4 text-fg-subtle" />
            <textarea
              name="message"
              rows={3}
              maxLength={2000}
              placeholder={copy.messagePlaceholder}
              className={cx(FIELD, "block min-h-24 resize-y pt-[13px] pb-3 leading-6")}
            />
          </span>
        </label>

        <div className="flex flex-col gap-3 @max-lg:mt-1 @lg:flex-row @lg:flex-wrap @lg:items-center @lg:justify-between @lg:gap-4">
          <button
            type="submit"
            aria-disabled={sending}
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-primary px-6 text-[15px] font-medium text-white shadow-[0_8px_24px_-12px_var(--glow)] transition duration-200 hover:brightness-110"
          >
            {copy.submitLabel || "Send enquiry"}
            <Glyph name="arrow" className="size-4" />
          </button>
          <button
            type="button"
            onClick={sendOnWhatsApp}
            className="inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors duration-200 hover:text-brand @max-lg:h-12 @max-lg:justify-center @max-lg:rounded-full @max-lg:border @max-lg:border-line @max-lg:bg-surface @max-lg:text-[15px] @max-lg:hover:border-brand"
          >
            <Glyph name="chat" className="size-4 @max-lg:text-[#25d366]" />
            <span className="@lg:hidden">{copy.whatsappShortLabel || copy.whatsappLabel}</span>
            <span className="@max-lg:hidden">{copy.whatsappLabel}</span>
          </button>
        </div>

        {/* Status messages replace the note in place. Both share one grid cell (the hidden one keeps its space), so the
            box is always as tall as the longer of the two and the form never jumps. */}
        <div className="flex items-start gap-2.5 rounded-xl bg-surface-raised px-4 py-3 text-[13px] leading-[1.5] @lg:items-center">
          {status.error ? (
            <CircleAlert aria-hidden strokeWidth={1.75} className="mt-px size-4 shrink-0 text-danger @lg:mt-0" />
          ) : (
            <Glyph name="shield" className="mt-px size-4 shrink-0 text-brand @lg:mt-0" />
          )}
          <div className="grid min-w-0 flex-1">
            <p className={cx("[grid-area:1/1] text-fg-muted", status.text && "invisible")}>
              {copy.note}
            </p>
            <p role="status" className={cx("[grid-area:1/1]", status.error ? "text-danger" : "text-fg")}>
              {status.text}
            </p>
          </div>
        </div>
      </form>
      <EnquirySent open={sent.open} onClose={sent.close} copy={sentCopy} />
    </>
  );
}
