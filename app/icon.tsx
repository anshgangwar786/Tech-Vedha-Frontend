import { ImageResponse } from "next/og";
import { getSite } from "@/server/content";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the brand's initials ("Tech Vedha" → "TV") on the brand gradient. */
export default async function Icon() {
  const { WORDMARK } = await getSite();
  const monogram = WORDMARK.map((word) => word.charAt(0)).join("") || "TV";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "linear-gradient(135deg, #1e9bf0, #1446e0)",
          color: "white",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {monogram}
      </div>
    ),
    size,
  );
}
