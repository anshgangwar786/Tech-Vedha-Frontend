import type { NextConfig } from "next";

// Production build/start: warn (never fail) when the settings that link this site to Tech-Vedha-Admin are missing.
// Without them the site still works, but silently: bundled copy only, no leads/previews, example.com canonicals.
if (process.env.NODE_ENV === "production") {
  const value = (name: string) => (process.env[name] ?? "").trim().replace(/^['"]|['"]$/g, "");
  const isLocal = (url: string) => /localhost|127\.0\.0\.1/.test(url);
  const problems = [
    !value("ADMIN_API_URL") && "ADMIN_API_URL is not set: the site serves only its bundled copy and enquiries fall back to email",
    !value("REVALIDATE_SECRET") && "REVALIDATE_SECRET is not set: admin saves, previews and enquiry forms will be refused",
    (!value("SITE_URL") || value("SITE_URL").includes("example.com")) &&
      "SITE_URL is not set: canonical URLs, sitemap.xml and robots.txt point at https://www.example.com",
    process.env.VERCEL_ENV === "production" &&
      ["ADMIN_API_URL", "SITE_URL"].some((name) => isLocal(value(name))) &&
      "ADMIN_API_URL or SITE_URL points at localhost on a production deployment",
  ].filter(Boolean);
  for (const problem of problems) console.warn(`[next.config] WARNING: ${problem}.`);
}

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'" },
];

/**
 * Hosts of images uploaded through Tech-Vedha-Admin's Media Library (comma-separated, e.g. "media.techvedha.tech").
 * Must match MEDIA_HOSTNAMES used by server/content.ts, which drops image URLs on any other host.
 */
const MEDIA_HOSTNAMES = (process.env.MEDIA_HOSTNAMES ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

/** Files in public/ are not content-hashed: cache for a day, serve stale for a week while revalidating. */
const STATIC_ASSET_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    remotePatterns: MEDIA_HOSTNAMES.map((hostname) => ({ protocol: "https" as const, hostname })),
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        source: "/:dir(brand|home)/:file*",
        headers: [{ key: "Cache-Control", value: STATIC_ASSET_CACHE }],
      },
    ];
  },
};

export default nextConfig;
