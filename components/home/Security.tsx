import ThemedImage from "@/components/ui/ThemedImage";
import { CircleCheck } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { AuditChecklist, DataVault, Firewall, ThreatMonitor } from "@/components/home/security/SecurityVisuals";
import { SECURITY_VISUALS } from "@/data/home";
import { getHome } from "@/server/content";
import { hasPicture } from "@/lib/themedImage";

const VISUALS = [DataVault, Firewall, ThreatMonitor, AuditChecklist];

export default async function Security() {
  const { security } = await getHome();
  return (
    <section id="security" aria-labelledby="security-title" className="defer-render bg-bg py-16 sm:py-24 lg:py-[130px]">
      <div className="container-site">
        <SectionHeader
          id="security-title"
          eyebrow={security.eyebrow}
          title={security.title}
          intro={security.intro}
        />

        {/* Phones: a swipeable row (the next card peeks in) instead of four tall cards stacked. */}
        <div data-reveal-stagger className="mt-10 grid gap-4 max-sm:flex max-sm:snap-row sm:mt-14 sm:grid-cols-2 xl:grid-cols-4">
          {security.layers.filter((layer) => layer.title.trim()).map((layer, index) => {
            // An uploaded image replaces the drawing; drawings are fixed by position (extra cards reuse them in turn).
            const Visual = VISUALS[index % VISUALS.length];
            const image = layer.image;
            return (
              <article
                key={index}
                className="flex flex-col gap-5 rounded-[20px] border border-line bg-surface px-3.5 pt-3.5 pb-6 transition duration-300 hover:-translate-y-1 hover:border-brand/60"
              >
                {hasPicture(image) ? (
                  <div className="relative h-[184px] overflow-hidden rounded-[14px] border border-line bg-bg">
                    <ThemedImage
                      image={image}
                      fill
                      sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 85vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div aria-hidden className="h-[184px] overflow-hidden rounded-[14px] border border-line bg-bg bg-grid">
                    <Visual copy={SECURITY_VISUALS} />
                  </div>
                )}
                <div className="px-2.5">
                  <p className="font-display text-[32px] leading-none font-light text-brand">{layer.number}</p>
                  <h3 className="mt-3.5 text-[19px] font-medium text-fg">{layer.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-fg-muted">{layer.summary}</p>
                  <ul className="mt-4">
                    {layer.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-center gap-2.5 border-t border-line py-[9px] text-sm text-fg">
                        <CircleCheck aria-hidden className="size-4 shrink-0 text-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
