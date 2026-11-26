"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER as BUNDLED_HEADER, type NavLink } from "@/lib/site";
import { cx } from "@/lib/cx";

/** Desktop header links. The link for the current page gets a small accent dot (Figma "Active dot"). */
export default function NavLinks({ HEADER_LINKS = BUNDLED_HEADER.links }: { HEADER_LINKS?: NavLink[] }) {
  const pathname = usePathname();

  return HEADER_LINKS.map((link, index) => {
    const current = link.href === pathname;
    return (
      <Link
        key={index}
        href={link.href}
        aria-current={current ? "page" : undefined}
        className={cx(
          "relative flex h-10 items-center px-3.5 text-sm font-medium transition-colors hover:text-fg",
          current ? "text-fg" : "text-fg-muted",
        )}
      >
        {link.label}
        {current && <span aria-hidden className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand" />}
      </Link>
    );
  });
}
