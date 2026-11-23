import Link from "next/link";
import { SERVICES, serviceHref } from "@/data/services";
import { EMAIL_URL, LEGAL_LINKS, NAV_LINKS, SITE } from "@/lib/site";

const columnTitle = "text-xs font-medium tracking-[0.12em] text-fg-subtle uppercase";
const footerLink = "text-[15px] text-fg-muted transition-colors hover:text-fg";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-surface pt-[72px] dark:bg-bg-deep">
      <div className="container-site">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-[340px] flex-col gap-3.5">
            <p className="font-display text-[22px] font-bold tracking-[0.18em]">
              <span className="text-fg">TECH </span>
              <span className="bg-linear-160 from-[#1e9bf0] to-[#1446e0] bg-clip-text text-transparent">VEDHA</span>
            </p>
            <p className="text-[11px] font-medium tracking-[0.24em] text-accent uppercase">{SITE.tagline}</p>
            <p className="text-[15px] leading-6 text-fg-muted">Your trusted partner for complete IT solutions.</p>
          </div>

          <div className="grid w-full max-w-[720px] gap-10 sm:grid-cols-3 sm:gap-14">
            <nav aria-label="Services" className="flex flex-col gap-2.5">
              <p className={columnTitle}>Services</p>
              {SERVICES.map((service) => (
                <Link key={service.id} href={serviceHref(service.id)} className={footerLink}>
                  {service.title}
                </Link>
              ))}
            </nav>
            <nav aria-label="Company" className="flex flex-col gap-2.5">
              <p className={columnTitle}>Company</p>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5">
              <p className={columnTitle}>Contact</p>
              <a href={EMAIL_URL} className={footerLink}>
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-line py-5 text-[13px] text-fg-subtle">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-fg">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Oversized wordmark (Figma: Inter Regular 204 px). Dark: solid grey with a line-colour edge; light: outline only. */}
      <div className="container-site">
        <p
          aria-hidden
          className="text-center font-sans text-[clamp(3.5rem,14.2vw,12.75rem)] leading-[1.2] font-normal whitespace-nowrap text-transparent select-none [-webkit-text-stroke:2px_var(--line)] dark:text-[#d9d9d9] dark:[-webkit-text-stroke:1px_var(--line)]"
        >
          TECH VEDHA
        </p>
      </div>
    </footer>
  );
}
