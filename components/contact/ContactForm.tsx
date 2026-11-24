"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Glyph, type ContactGlyphName } from "@/components/contact/icons";
import { TIMEFRAMES } from "@/data/contact";
import { SERVICES } from "@/data/services";
import { SITE, WHATSAPP_URL } from "@/lib/site";
import { cx } from "@/lib/cx";
import { mailtoHref } from "@/lib/utils";
import EnquirySent, { useEnquirySent } from "@/components/ui/EnquirySent";

const LABEL = "text-[13px] font-medium text-fg";
const CHIP =
  "flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface pr-4 pl-3 text-[13px] font-medium text-fg transition-colors duration-200 hover:border-brand/60 has-checked:border-brand has-checked:bg-surface-raised has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand";
const CHECKBOX =
  "flex size-4 items-center justify-center rounded-[5px] border border-line text-white transition-colors duration-200 peer-checked:border-brand peer-checked:bg-brand [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100";
const OTHER = "Others";
const FIELD =
  "w-full rounded-[14px] border border-line bg-surface pr-4 pl-[42px] text-sm text-fg transition-colors duration-200 placeholder:text-fg-subtle hover:border-brand/60 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none";

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
};

function Field({ name, label, icon, placeholder, type = "text", autoComplete, defaultValue }: FieldProps) {
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
          className={cx(FIELD, "h-[50px]")}
        />
      </span>
    </label>
  );
}

/** Reads the form into a plain-text summary shared by the email and WhatsApp routes. */
function summarise(form: HTMLFormElement) {
  const data = new FormData(form);
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const picked = data.getAll("service").map((entry) => String(entry));
  const other = value("otherService");
  const services = picked.map((name) => (name === OTHER && other ? `Other: ${other}` : name));
  const service = services.join(", ");
  const lines = [
    `${services.length > 1 ? "Services" : "Service"}: ${service}`,
    `Name: ${value("name")}`,
    `Company: ${value("company")}`,
    `Phone / WhatsApp: ${value("phone")}`,
    `Email: ${value("email")}`,
    `City / country: ${value("city")}`,
    `Start: ${value("timeframe")}`,
  ];
  const message = value("message");
  if (message) lines.push("", message);
  return { service, body: lines.join("\n") };
}

/**
 * Enquiry form. Until an enquiry API exists, sending opens the visitor's email app (to SITE.email)
 * or WhatsApp with the details filled in. Browser validation covers required fields.
 */
export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const firstServiceRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const otherOpen = selected.includes(OTHER);
  const sent = useEnquirySent(
    useCallback(() => {
      setSelected([]);
      setStatus("");
    }, []),
  );

  // Checkboxes have no built-in "pick at least one", so the first one carries the error.
  useEffect(() => {
    firstServiceRef.current?.setCustomValidity(selected.length ? "" : "Select at least one service.");
  }, [selected]);

  const toggle = (name: string, checked: boolean) =>
    setSelected((current) => (checked ? [...current, name] : current.filter((entry) => entry !== name)));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { service, body } = summarise(event.currentTarget);
    window.location.href = mailtoHref(SITE.email, `Project enquiry — ${service}`, body);
    setStatus("Your email app should open with the details filled in. Send it and we’ll reply with next steps.");
    sent.show(event.currentTarget);
  };

  const sendOnWhatsApp = () => {
    const form = formRef.current;
    if (!form?.reportValidity()) return;
    const { body } = summarise(form);
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(`Project enquiry\n\n${body}`)}`, "_blank", "noopener,noreferrer");
    setStatus("WhatsApp opened in a new tab with your details filled in.");
    sent.show(form);
  };

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit} aria-labelledby="enquiry-title" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 id="enquiry-title" className="font-display text-[30px] leading-tight tracking-[-0.01em] text-fg">
            Send an enquiry
          </h2>
          <p className="text-[13px] text-fg-subtle">Fields marked * are required.</p>
        </div>

        <fieldset className="flex flex-col gap-2.5">
          <legend className={cx(LABEL, "mb-2.5")}>
            What do you need?
            <Required />
          </legend>
          <div className="flex flex-wrap gap-2">
            {[...SERVICES.map((service) => service.title), OTHER].map((name, index) => (
              <label key={name} className={CHIP}>
                <input
                  ref={index === 0 ? firstServiceRef : undefined}
                  type="checkbox"
                  name="service"
                  value={name}
                  checked={selected.includes(name)}
                  onChange={(event) => toggle(name, event.target.checked)}
                  aria-controls={name === OTHER ? "other-service" : undefined}
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
                id="other-service"
                name="otherService"
                required
                autoFocus
                aria-label="Which other service do you need?"
                placeholder="Tell us the service you need"
                className="h-10 min-w-[220px] flex-1 rounded-full border border-line bg-surface px-4 text-[13px] text-fg transition-colors duration-200 placeholder:text-fg-subtle hover:border-brand/60 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none"
              />
            )}
          </div>
        </fieldset>

        <div className="grid gap-[18px] sm:grid-cols-2">
          <Field name="name" label="Your name" icon="user" placeholder="Full name" autoComplete="name" />
          <Field name="company" label="Company" icon="building" placeholder="Business or brand name" autoComplete="organization" />
          <Field name="phone" label="Phone / WhatsApp" icon="phone" placeholder="+91" type="tel" autoComplete="tel" />
          <Field name="email" label="Email" icon="mail" placeholder="you@company.com" type="email" autoComplete="email" />
          <Field name="city" label="City / country" icon="pin" placeholder="Where is the business?" autoComplete="address-level2" />
          <label className="flex flex-col gap-2.5">
            <span className={LABEL}>
              When do you want to start?
              <Required />
            </span>
            <span className="relative">
              <Glyph name="calendar" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-subtle" />
              <select
                name="timeframe"
                required
                defaultValue=""
                className={cx(FIELD, "h-[50px] appearance-none pr-10 invalid:text-fg-subtle")}
              >
                <option value="" disabled>
                  Select a timeframe
                </option>
                {TIMEFRAMES.map((timeframe) => (
                  <option key={timeframe} value={timeframe}>
                    {timeframe}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-subtle" />
            </span>
          </label>
        </div>

        <label className="flex flex-col gap-2.5">
          <span className={LABEL}>Tell us about the project (optional)</span>
          <span className="relative">
            <Glyph name="file" className="pointer-events-none absolute top-[15px] left-4 size-4 text-fg-subtle" />
            <textarea
              name="message"
              rows={3}
              placeholder="Goals, current setup, anything we should know…"
              className={cx(FIELD, "block min-h-24 resize-y pt-[13px] pb-3 leading-6")}
            />
          </span>
        </label>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-6 text-[15px] font-medium text-white shadow-[0_8px_24px_-12px_var(--glow)] transition duration-200 hover:brightness-110"
          >
            Send enquiry
            <Glyph name="arrow" className="size-4" />
          </button>
          <button
            type="button"
            onClick={sendOnWhatsApp}
            className="inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors duration-200 hover:text-brand"
          >
            <Glyph name="chat" className="size-4" />
            Prefer WhatsApp? Send these details there
          </button>
        </div>

        <p className="flex items-center gap-2.5 rounded-xl bg-surface-raised px-4 py-3 text-[13px] text-fg-muted">
          <Glyph name="shield" className="size-4 text-brand" />
          One person from our team replies with next steps. No spam, no sales calls.
        </p>
        <p role="status" className={status ? "-mt-1 text-[13px] text-fg-muted" : "sr-only"}>
          {status}
        </p>
      </form>
      <EnquirySent open={sent.open} onClose={sent.close} />
    </>
  );
}
