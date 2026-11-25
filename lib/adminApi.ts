// Tech-Vedha-Admin is this site's CMS: page copy is read from its public API
// (server/content.ts) and enquiries are posted to it (app/actions/enquiry.ts).
// Server-only — these values are never sent to the browser.

/** Trims whitespace, surrounding quotes and trailing slashes from an env value. */
const clean = (value: string | null | undefined) =>
  (value ?? "").trim().replace(/^['"]|['"]$/g, "").trim().replace(/\/+$/, "");

/**
 * Hosting dashboards often keep the quotes pasted around env values (dotenv strips them, dashboard UIs don't).
 * Must match normalizeSecret in Tech-Vedha-Admin/app/lib/utils/revalidateFrontend.ts.
 */
export const normalizeSecret = (v: string | null | undefined) => (v ?? "").trim().replace(/^['"]|['"]$/g, "");

/**
 * Origin of Tech-Vedha-Admin. Locally it defaults to http://localhost:3000. On Vercel, set ADMIN_API_URL to
 * the admin's Vercel URL (https://<admin project>.vercel.app): a production build without it never calls
 * localhost and serves the bundled copy in data/ instead.
 */
const ADMIN_API_URL =
  clean(process.env.ADMIN_API_URL) || (process.env.NODE_ENV === "production" ? "" : "http://localhost:3000");

/** True when there is an admin to talk to. */
export const HAS_ADMIN = ADMIN_API_URL !== "";

/** Absolute URL of an admin API path ("/api/..."). */
export function adminUrl(path: string): string {
  return `${ADMIN_API_URL}${path}`;
}

/** Shared secret (same value as REVALIDATE_SECRET in Tech-Vedha-Admin). */
export function sharedSecret(): string {
  return normalizeSecret(process.env.REVALIDATE_SECRET);
}

/** How long to wait for the admin before falling back to the bundled copy. */
export const ADMIN_TIMEOUT_MS = 10_000;

/** Hosts allowed for images set in the admin (same env value as next.config.ts). */
const MEDIA_HOSTNAMES = new Set(
  (process.env.MEDIA_HOSTNAMES ?? "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean),
);

/** A site path ("/home/…") or an https URL on a MEDIA_HOSTNAMES host: safe to hand to next/image. */
export function isAllowedImageSrc(src: string): boolean {
  if (/[\s"'<>\\`]/.test(src)) return false;
  if (src.startsWith("/")) return !src.startsWith("//");
  try {
    const url = new URL(src);
    return url.protocol === "https:" && MEDIA_HOSTNAMES.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

/** Cached reads also expire after this long, in case a revalidate call from the admin was missed. */
export const CONTENT_REVALIDATE_SECONDS = 600;
