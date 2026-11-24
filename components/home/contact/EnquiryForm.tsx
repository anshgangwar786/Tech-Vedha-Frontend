"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";
import { mailtoHref } from "@/lib/utils";
import EnquirySent, { useEnquirySent } from "@/components/ui/EnquirySent";

const label = "text-[13px] font-medium text-fg-muted";
const field =
  "w-full rounded-xl border border-line bg-surface-raised/70 px-4 text-base text-fg transition-colors placeholder:text-fg-subtle hover:border-brand/60 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none";

/**
 * Enquiry form. Until an enquiry API exists, submitting opens the visitor's email app
 * with the details filled in (to SITE.email). Browser validation covers required fields.
 */
export default function EnquiryForm() {
  const sent = useEnquirySent();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `Project enquiry${value("service") ? ` — ${value("service")}` : ""}`;
    const body = [
      `Name: ${value("name")}`,
      `Phone / WhatsApp: ${value("phone")}`,
      `Email: ${value("email")}`,
      `Service: ${value("service") || "Not sure yet"}`,
      "",
      value("message"),
    ].join("\n");

    window.location.href = mailtoHref(SITE.email, subject, body);
    sent.show(event.currentTarget);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        aria-label="Project enquiry"
        data-reveal="right"
        className="reveal grid gap-4 rounded-3xl border border-line bg-glass p-6 backdrop-blur-xl sm:grid-cols-2 sm:p-9"
      >
        <label className="flex flex-col gap-2">
          <span className={label}>Name</span>
          <input name="name" required autoComplete="name" className={`${field} h-12`} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={label}>Phone / WhatsApp</span>
          <input name="phone" type="tel" required autoComplete="tel" defaultValue="+91 " className={`${field} h-12`} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={label}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={`${field} h-12`} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={label}>Service</span>
          <span className="relative">
            <select name="service" defaultValue="" className={`${field} h-12 appearance-none pr-10`}>
              <option value="">Select a service</option>
              {SERVICES.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-muted" />
          </span>
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className={label}>Message</span>
          <textarea
            name="message"
            rows={4}
            placeholder="A few lines about your project"
            className={`${field} min-h-[122px] resize-y py-3 leading-6`}
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-white transition hover:brightness-110 sm:col-span-2"
        >
          Send enquiry
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </form>
      <EnquirySent open={sent.open} onClose={sent.close} />
    </>
  );
}
