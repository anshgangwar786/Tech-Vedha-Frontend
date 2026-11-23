import SectionHeader from "@/components/ui/SectionHeader";
import AppsScene from "@/components/home/services/AppsScene";
import CadScene from "@/components/home/services/CadScene";
import MarketingScene from "@/components/home/services/MarketingScene";
import ServicesShowcase from "@/components/home/services/ServicesShowcase";
import SoftwareScene from "@/components/home/services/SoftwareScene";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="defer-render bg-bg-deep py-24 lg:py-[130px]">
      <div className="container-site">
        <SectionHeader
          id="services-title"
          title={["Four wings.", "One blueprint."]}
          intro="Four services engineered as a single, connected system — so nothing gets lost between vendors."
        />
        <ServicesShowcase
          scenes={{
            marketing: <MarketingScene />,
            apps: <AppsScene />,
            cad: <CadScene />,
            software: <SoftwareScene />,
          }}
        />
      </div>
    </section>
  );
}
