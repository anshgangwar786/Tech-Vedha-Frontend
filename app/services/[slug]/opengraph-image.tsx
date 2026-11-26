import { ImageResponse } from "next/og";
import { getServicePage, getServicePageSlugs, getSite } from "@/server/content";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} service`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getServicePageSlugs()).map((slug) => ({ slug }));
}

/** Per-service social share card, generated at build time in the same style as the homepage card. */
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const [page, { SITE: site, WORDMARK }] = await Promise.all([getServicePage((await params).slug), getSite()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#eaf2fc",
          background:
            "radial-gradient(70% 90% at 50% 110%, rgba(30,155,240,0.75), rgba(20,70,224,0.35) 45%, rgba(3,10,24,0) 75%), #030a18",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 6 }}>
          {WORDMARK[0]}&nbsp;<span style={{ color: "#4db2ff" }}>{WORDMARK[1]}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 4, color: "#5fd4f0" }}>
            {page ? page.hero.eyebrow.toUpperCase() : site.tagline}
          </div>
          <div style={{ marginTop: 20, fontSize: 96, lineHeight: 1, letterSpacing: -3 }}>
            {page?.hero.breadcrumb.currentLabel || page?.hero.title || site.name}
          </div>
          {page && (
            <div style={{ marginTop: 28, fontSize: 32, color: "#a3b8d6" }}>
              {[page.hero.title, page.hero.highlight].filter((part) => part.trim()).join(" ")}
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
