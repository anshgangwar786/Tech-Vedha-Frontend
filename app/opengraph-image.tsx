import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated at build time. */
export default function OpenGraphImage() {
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
            "radial-gradient(70% 90% at 95% 85%, rgba(30,155,240,0.75), rgba(20,70,224,0.35) 45%, rgba(3,10,24,0) 75%), #030a18",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 6 }}>
          TECH&nbsp;<span style={{ color: "#4db2ff" }}>VEDHA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -4 }}>Build for Tomorrow.</div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#a3b8d6" }}>
            Digital Marketing · App Development · CAD Design · Software and Security
          </div>
        </div>
      </div>
    ),
    size,
  );
}
