import Logo from "@/components/layout/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";
import ServicesMenu from "@/components/layout/ServicesMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ButtonLink from "@/components/ui/ButtonLink";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-bg/70 backdrop-blur-md">
      <div className="container-site relative flex h-[72px] items-center gap-6">
        <Logo />

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          <ServicesMenu />
          <NavLinks />
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <div className="ml-1 hidden sm:block">
            <ButtonLink href="/contact" size="sm" arrow>
              Start a project
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
