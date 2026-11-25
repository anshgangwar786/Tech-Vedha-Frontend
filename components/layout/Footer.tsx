import Link from "next/link";
import { serviceHref } from "@/data/services";
import { cx } from "@/lib/cx";
import { getServices, getSite } from "@/server/content";

const columnTitle = "mb-1 text-xs font-medium tracking-[0.12em] text-fg-subtle uppercase sm:mb-0";
/** ~40 px tall rows on phones (comfortable taps); the plain text line from `sm` up. */
const footerLink = "block py-2.5 text-[15px] leading-snug text-fg-muted transition-colors hover:text-fg sm:py-0 sm:leading-normal";

export default async function Footer() {
  const SERVICES = await getServices();
  const { EMAIL_URL, LEGAL_LINKS, NAV_LINKS, SITE, FOOTER, WORDMARK } = await getSite();
  return (
    <footer className="overflow-hidden border-t border-line bg-surface pt-14 sm:pt-[72px] dark:bg-bg-deep">
      <div className="container-site">
        <div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-[340px] flex-col gap-3.5">
            <p className="font-display text-[22px] font-bold tracking-[0.18em]">
              <span className="text-fg">{WORDMARK[0]} </span>
              <span className="bg-linear-160 from-[#1e9bf0] to-[#1446e0] bg-clip-text text-transparent">{WORDMARK[1]}</span>
            </p>
            <p className="text-[11px] font-medium tracking-[0.24em] text-accent uppercase">{SITE.tagline}</p>
            {FOOTER.text.trim() && <p className="text-[15px] leading-6 text-fg-muted">{FOOTER.text}</p>}
          </div>

          {/* Phones: Services and Company side by side, Contact below across both columns. */}
          <div className="grid w-full max-w-[720px] grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-14">
            <nav aria-label="Services" className="flex flex-col sm:gap-2.5">
              <p className={columnTitle}>{FOOTER.servicesTitle}</p>
              {SERVICES.map((service) => (
                <Link key={service.id} href={serviceHref(service)} className={footerLink}>
                  {service.title}
                </Link>
              ))}
            </nav>
            <nav aria-label="Company" className="flex flex-col sm:gap-2.5">
              <p className={columnTitle}>{FOOTER.companyTitle}</p>
              {NAV_LINKS.map((link, index) => (
                <Link key={index} href={link.href} className={footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="col-span-2 flex flex-col sm:col-span-1 sm:gap-2.5">
              <p className={columnTitle}>{FOOTER.contactTitle}</p>
              <a href={EMAIL_URL} className={cx(footerLink, "break-all")}>
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-5 text-[13px] text-fg-subtle sm:mt-14">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          {LEGAL_LINKS.length > 0 && (
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="relative after:absolute after:-inset-x-1 after:-inset-y-2.5 after:content-[''] transition-colors hover:text-fg">
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
