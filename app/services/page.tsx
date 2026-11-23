import { redirect } from "next/navigation";
import { SERVICE_PAGES } from "@/data/service-pages";

/**
 * There is no services overview page yet: /services sends visitors to the first live service page.
 * Temporary (307) redirect, so it can be replaced by a real index page later without SEO side effects.
 */
export default function ServicesIndex() {
  redirect(`/services/${SERVICE_PAGES[0].service.slug}`);
}
