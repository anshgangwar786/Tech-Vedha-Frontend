import Link from "next/link";
import { Glyph } from "@/components/contact/icons";
import { getContact } from "@/server/content";

/** Thin band above the footer pointing visitors who already know what they want to the services. */
export default async function ExploreBand() {
  const { EXPLORE_BAND: copy } = await getContact();
  return (
    <aside className="border-y border-line bg-bg-deep py-[22px]">
      <p className="container-site flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm font-medium text-fg-muted">
        <Glyph name="layers" className="size-4" />
        {copy.text}
        {copy.linkLabel.trim() && (
          <Link
            href={copy.linkHref || "/#services"}
            className="group relative after:absolute after:-inset-x-1 after:-inset-y-2.5 after:content-[''] flex items-center gap-1.5 text-brand"
          >
            {copy.linkLabel}
            <Glyph name="arrow" className="size-3.5 transition-transform duration-250 group-hover:translate-x-0.5" />
          </Link>
        )}
      </p>
    </aside>
  );
}
