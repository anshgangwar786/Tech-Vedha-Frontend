import { CircleCheck } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { AuditChecklist, DataVault, Firewall, ThreatMonitor } from "@/components/home/security/SecurityVisuals";
import { SECURITY_LAYERS } from "@/data/home";

const VISUALS = [DataVault, Firewall, ThreatMonitor, AuditChecklist];

export default function Security() {
  return (
    <section id="security" aria-labelledby="security-title" className="defer-render bg-bg py-24 lg:py-[130px]">
      <div className="container-site">
        <SectionHeader
          id="security-title"
          eyebrow="Security"
          title={["Security in", "every layer."]}
          intro="Every build ships with protection designed in, not bolted on — four layers, working together."
        />

        <div data-reveal-stagger className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SECURITY_LAYERS.map((layer, index) => {
            const Visual = VISUALS[index];
            return (
              <article
                key={layer.number}
                className="flex flex-col gap-5 rounded-[20px] border border-line bg-surface px-3.5 pt-3.5 pb-6 transition duration-300 hover:-translate-y-1 hover:border-brand/60"
              >
                <div aria-hidden className="h-[184px] overflow-hidden rounded-[14px] border border-line bg-bg bg-grid">
                  <Visual />
                </div>
                <div className="px-2.5">
                  <p className="font-display text-[32px] leading-none font-light text-brand">{layer.number}</p>
                  <h3 className="mt-3.5 text-[19px] font-medium text-fg">{layer.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-fg-muted">{layer.summary}</p>
                  <ul className="mt-4">
                    {layer.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 border-t border-line py-[9px] text-sm text-fg">
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
