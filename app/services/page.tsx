import { notFound, redirect } from "next/navigation";
import { getServicePages } from "@/server/content";

/**
 * There is no services overview page yet: /services sends visitors to the first live service page.
 * Temporary (307) redirect, so it can be replaced by a real index page later without SEO side effects.
 */
export default async function ServicesIndex() {
  const [first] = await getServicePages();
  if (!first) notFound();
  redirect(`/services/${first.service.slug}`);
}
