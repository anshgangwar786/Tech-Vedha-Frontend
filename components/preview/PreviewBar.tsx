"use client";

import { usePathname } from "next/navigation";

/**
 * Shown only to an editor's browser while it is in preview mode (Tech-Vedha-Admin → Preview). Makes it obvious that
 * this is a draft view, and gives a one-click way back to the live site. Visitors never see it.
 */
export default function PreviewBar() {
  const pathname = usePathname() || "/";
  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-[70] flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-[#f59e0b] px-4 py-2 text-center text-sm font-medium text-[#1a1203]"
    >
      <span>Preview mode: you&apos;re seeing unsaved changes from the admin, not the live site.</span>
      {/* A plain link (not next/link): the exit route must run on the server to switch preview off. */}
      <a href={`/api/preview?exit=1&path=${encodeURIComponent(pathname)}`} className="underline underline-offset-2">
        Exit preview
      </a>
    </div>
  );
}
