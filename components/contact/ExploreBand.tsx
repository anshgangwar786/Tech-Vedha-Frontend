import Link from "next/link";
import { Glyph } from "@/components/contact/icons";

/** Thin band above the footer pointing visitors who already know what they want to the services. */
export default function ExploreBand() {
  return (
    <aside className="border-y border-line bg-bg-deep py-[22px]">
      <p className="container-site flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm font-medium text-fg-muted">
        <Glyph name="layers" className="size-4" />
        Already know which service you need?
        <Link href="/#services"className="group flex items-center gap-1.5 text-brand">
          Explore services
          <Glyph name="arrow" className="size-3.5 transition-transform duration-250 group-hover:translate-x-0.5" />
        </Link>
      </p>
    </aside>
  );
}
