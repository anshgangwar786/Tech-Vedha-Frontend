import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import EnquiryForm from "@/components/home/contact/EnquiryForm";
import { EMAIL_URL, SITE, WHATSAPP_URL } from "@/lib/site";

const CONTACT_LINKS = [
  { label: "Email", value: SITE.email, href: EMAIL_URL },
  { label: "WhatsApp", value: "Chat with us", href: WHATSAPP_URL },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-bg py-24 lg:py-[130px]">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 h-[330px] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(30_155_240/0.35),rgb(20_70_224/0.2)_45%,transparent)] blur-[60px]"
      />
      <div className="container-site grid items-center gap-16 lg:grid-cols-[575fr_633fr] lg:gap-[72px]">
        <div data-reveal-stagger className="flex flex-col gap-6">
          <Eyebrow variant="pill">Let&apos;s talk</Eyebrow>
          <h2
            id="contact-title"
            className="max-w-[580px] font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.03] tracking-[-0.028em] text-balance text-fg"
          >
            Let&apos;s build your success together.
          </h2>
          <p className="text-[17px] leading-[1.6] text-fg-muted">Tell us what you need. We&apos;ll reply with a plan.</p>
          <ul className="flex max-w-[380px] flex-col gap-2.5">
            {CONTACT_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex h-14 items-center justify-between rounded-[14px] border border-line bg-surface px-[18px] transition-colors hover:border-brand"
                >
                  <span>
                    <span className="block text-xs text-fg-muted">{link.label}</span>
                    <span className="block text-[15px] font-medium text-fg">{link.value}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
