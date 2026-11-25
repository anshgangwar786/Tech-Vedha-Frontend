import type { MetadataRoute } from "next";
import { getSite } from "@/server/content";

/** Install name and description come from Site & menus in the admin. */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { SITE } = await getSite();
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#06142e",
    theme_color: "#06142e",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
