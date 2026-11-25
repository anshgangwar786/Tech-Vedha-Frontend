import type { Metadata, Viewport } from "next";
import { Cousine, Inter, Urbanist } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollReveal from "@/components/layout/ScrollReveal";
import StartProjectModal from "@/components/contact/StartProjectModal";
import { jsonLdScript, organizationJsonLd } from "@/lib/seo";
import { SITE as BUNDLED_SITE } from "@/lib/site";
import { REVEAL_BOOT_SCRIPT, THEME_BOOT_SCRIPT } from "@/lib/theme";
import { CustomScripts, Gtm, GtmNoscript, JsonLd, trackingEnabled } from "@/components/seo/SeoTags";
import { getContact, getServices, getSite } from "@/server/content";
import { getSeoConfig } from "@/server/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-urbanist",
  display: "swap",
});
// Only used in small decorative mock-ups: don't let it compete with the hero for bandwidth.
const cousine = Cousine({ subsets: ["latin"], weight: "400", variable: "--font-cousine", display: "swap", preload: false });

/**
 * Pages re-read the admin at most every 10 minutes (ISR), even if they were built while it was unreachable.
 * Saves in the admin refresh them immediately through /api/revalidate. Matches CONTENT_REVALIDATE_SECONDS (must be a literal).
 */
export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const { SITE } = await getSite();
  return {
    metadataBase: new URL(BUNDLED_SITE.url),
    title: {
      default: `${SITE.name} — IT Solutions for Marketing, Apps, CAD and Software`,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    applicationName: SITE.name,
    keywords: [
      "IT solutions",
      "digital marketing agency",
      "app development company",
      "Android and iOS app development",
      "CAD design and planning",
      "BOQ",
      "custom software",
      "cybersecurity",
      "India",
    ],
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: "/",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06142e" },
    { media: "(prefers-color-scheme: light)", color: "#f4f8fd" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ SITE, WHATSAPP_URL, ENQUIRY_SENT }, SERVICES, { TIMEFRAMES, FORM }, seo, tracking] = await Promise.all([
    getSite(),
    getServices(),
    getContact(),
    getSeoConfig(),
    trackingEnabled(),
  ]);
  return (
    // data-theme is replaced before paint by THEME_BOOT_SCRIPT, hence suppressHydrationWarning.
    // data-scroll-behavior="smooth": globals.css scrolls smoothly for in-page anchors; this tells Next.js 16 to
    // switch that off during page navigations, so a new page opens instantly at the top instead of animating
    // up from the old scroll position (which a touch on a phone could stop halfway).
    <html
      lang="en-IN"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${urbanist.variable} ${cousine.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT + REVEAL_BOOT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd(SITE, SERVICES))} />
        {/* Site-wide schema from Tech-Vedha-Admin → SEO & Scripts (server/seo.ts). */}
        <JsonLd data={seo.global.schemas} />
      </head>
      <body>
        {/* Google Tag Manager for visitors without JavaScript (Tech-Vedha-Admin → SEO & Scripts). */}
        {tracking && <GtmNoscript gtmId={seo.gtmId} />}
        {tracking && (
          <>
            <Gtm gtmId={seo.gtmId} />
            <CustomScripts scripts={seo.global.scripts} />
          </>
        )}
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-[200%] rounded-full bg-primary px-4 py-2.5 font-medium text-white transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        {/* Reading-progress line (CSS scroll timeline). */}
        <div
          aria-hidden
          className="scroll-progress fixed top-0 left-[23px] z-40 hidden h-screen w-0.5 origin-top rounded-full bg-linear-to-b from-transparent via-[#1e9bf0] via-[8%] to-brand shadow-[0_0_12px_rgb(30_155_240/0.6)] supports-[animation-timeline:scroll()]:2xl:block"
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
        {/* "Start a project" popup, opened by any link marked data-start-project. */}
        <StartProjectModal
          SERVICES={SERVICES}
          TIMEFRAMES={TIMEFRAMES}
          SITE={SITE}
          WHATSAPP_URL={WHATSAPP_URL}
          copy={FORM}
          sentCopy={ENQUIRY_SENT}
        />
      </body>
    </html>
  );
}
