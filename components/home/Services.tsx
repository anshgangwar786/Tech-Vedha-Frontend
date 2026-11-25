import SectionHeader from "@/components/ui/SectionHeader";
import AddedServiceScene from "@/components/home/services/AddedServiceScene";
import AppsScene from "@/components/home/services/AppsScene";
import CadScene from "@/components/home/services/CadScene";
import MarketingScene from "@/components/home/services/MarketingScene";
import ServicesShowcase from "@/components/home/services/ServicesShowcase";
import SoftwareScene from "@/components/home/services/SoftwareScene";
import { withCount } from "@/data/home";
import { countWord } from "@/data/services";
import { getHome, getServices } from "@/server/content";

/** Hand-drawn scenes of the built-in services; services added in the admin get AddedServiceScene. */
const BUILT_IN_SCENES: Record<string, React.ReactNode> = {
  marketing: <MarketingScene />,
  apps: <AppsScene />,
  cad: <CadScene />,
  software: <SoftwareScene />,
};

export default async function Services() {
  const [SERVICES, { services }] = await Promise.all([getServices(), getHome()]);
  const count = countWord(SERVICES.length);
  return (
    <section id="services" aria-labelledby="services-title" className="defer-render bg-bg-deep py-16 sm:py-24 lg:py-[130px]">
      <div className="container-site">
        <SectionHeader
          id="services-title"
          title={services.title.map((line) => withCount(line, count))}
          intro={withCount(services.intro, count)}
        />
        <ServicesShowcase
          SERVICES={SERVICES}
          exploreLabel={services.exploreLabel}
          scenes={Object.fromEntries(
            SERVICES.map((service) => [service.id, BUILT_IN_SCENES[service.id] ?? <AddedServiceScene service={service} />]),
          )}
        />
      </div>
    </section>
  );
}
