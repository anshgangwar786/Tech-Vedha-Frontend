import Logo from "@/components/layout/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";
import ServicesMenu from "@/components/layout/ServicesMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ButtonLink from "@/components/ui/ButtonLink";
import { getSite } from "@/server/content";

export default async function Header() {
  const { SITE, EMAIL_URL, WHATSAPP_URL, HEADER } = await getSite();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-bg/70 backdrop-blur-md">
      <div className="container-site relative flex h-[72px] items-center gap-3 sm:gap-6">
        <Logo />

        <nav aria-label={HEADER.a11y.mainNav} className="ml-auto hidden items-center gap-1 lg:flex">
          <ServicesMenu SITE={SITE} EMAIL_URL={EMAIL_URL} WHATSAPP_URL={WHATSAPP_URL} HEADER={HEADER} />
          <NavLinks HEADER_LINKS={HEADER.links} />
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle label={HEADER.a11y.themeToggle} />
          <div className="ml-1 hidden sm:block">
            <ButtonLink href={HEADER.ctaHref || "/contact"} size="sm" arrow startProject className="whitespace-nowrap">
              {HEADER.ctaLabel}
            </ButtonLink>
          </div>
          <MobileMenu SITE={SITE} EMAIL_URL={EMAIL_URL} WHATSAPP_URL={WHATSAPP_URL} HEADER={HEADER} />
        </div>
      </div>
    </header>
  );
}
