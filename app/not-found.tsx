import type { Metadata } from "next";
import Link from "next/link";
import CtaButtons from "@/components/ui/CtaButtons";
import Eyebrow from "@/components/ui/Eyebrow";
import { DISPLAY_TITLE } from "@/components/ui/styles";
import { getSite } from "@/server/content";

export const metadata: Metadata = { title: "Page not found" };

/** Branded 404 for unknown URLs and pages that call notFound() (e.g. a service without its own page yet). */
export default async function NotFound() {
  const { NOT_FOUND: copy, SITEMAP_PAGE } = await getSite();
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_100%_at_15%_10%,var(--hero-from),var(--hero-to)_80%)]"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <div className="container-site flex min-h-[max(560px,80svh)] flex-col justify-center gap-5 pt-28 pb-16 sm:gap-6 sm:pb-24">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h1 id="not-found-title" className={DISPLAY_TITLE}>
          {copy.titleLead} <span className="text-gradient block pb-[0.08em]">{copy.titleAccent}</span>
        </h1>
        <p className="max-w-[480px] text-[17px] leading-[1.6] text-fg-muted sm:text-lg">{copy.intro}</p>
        <CtaButtons href={copy.primaryCta.href} label={copy.primaryCta.label} secondary={copy.secondaryCta} className="pt-1" />
        <nav aria-label="Popular sections" className="mt-6 flex flex-wrap gap-2.5">
          {/* "Start a project" is already the main button above. */}
          {SITEMAP_PAGE.homeSections
            .filter((section) => section.href !== "/#contact" && section.title.trim())
            .map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-medium text-fg-muted transition-colors hover:border-brand hover:text-fg"
              >
                {section.title}
              </Link>
            ))}
        </nav>
      </div>
    </section>
  );
}
