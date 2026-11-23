import { jsonLdScript, type JsonLdData } from "@/lib/seo";

/** One <script type="application/ld+json"> per structured-data object. */
export default function JsonLd({ data }: { data: JsonLdData[] }) {
  return data.map((item) => (
    <script key={String(item["@type"])} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(item)} />
  ));
}
