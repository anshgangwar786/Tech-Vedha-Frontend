import { Fragment } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AddedServiceScene from "@/components/home/services/AddedServiceScene";
import AppsScene from "@/components/home/services/AppsScene";
import CadScene from "@/components/home/services/CadScene";
import MarketingScene from "@/components/home/services/MarketingScene";
import ServicesShowcase from "@/components/home/services/ServicesShowcase";
import SoftwareScene from "@/components/home/services/SoftwareScene";
import { SERVICE_SCENES, withCount, type HomeServiceItem } from "@/data/home";
import { countWord } from "@/data/services";
import { slugify } from "@/lib/content/serviceSlugs";
import { getHome } from "@/server/content";

type CardImage = { src: string; alt: string; width: number; height: number };
type Card = {
  show: boolean;
  number: string;
  label: string;
  title: string;
  summary: string;
  buttonLink: string;
  image: CardImage;
};

/** The card's drawing; a card with an uploaded image shows the image instead (ServicesShowcase). */
const sceneOf = (card: Card, drawing: React.ReactNode) => (card.image.src ? null : drawing);

/** What the switcher needs from a card. `anchor` makes links like /#service-<anchor> open it. */
const toItem = (card: Card, anchor: string): HomeServiceItem => ({
  anchor,
  number: card.number,
  wing: card.label,
  title: card.title,
  summary: card.summary,
  href: card.buttonLink.trim(),
  image: card.image.src ? card.image : null,
});

export default async function Services() {
  const { services } = await getHome();
  const { marketing, apps, cad, software } = services;
  // The four designed cards (each with its own illustration), then the cards added on the homepage.
  // A card switched off, or without a title, is left out.
  const cards = [
    { card: marketing, anchor: "marketing", scene: sceneOf(marketing, <MarketingScene copy={SERVICE_SCENES.marketing} />) },
    { card: apps, anchor: "apps", scene: sceneOf(apps, <AppsScene copy={SERVICE_SCENES.apps} />) },
    { card: cad, anchor: "cad", scene: sceneOf(cad, <CadScene copy={SERVICE_SCENES.cad} />) },
    { card: software, anchor: "software", scene: sceneOf(software, <SoftwareScene copy={SERVICE_SCENES.software} />) },
    ...services.extraCards.map((card, index) => ({
      card,
      anchor: slugify(card.title) || `extra-${index + 1}`,
      scene: sceneOf(card, <AddedServiceScene card={card} />),
    })),
  ].filter(({ card }) => card.show && card.title.trim());
  const count = countWord(cards.length);
  return (
    <section id="services" aria-labelledby="services-title" className="defer-render bg-bg-deep py-16 sm:py-24 lg:py-[130px]">
      <div className="container-site">
        <SectionHeader
          id="services-title"
          title={services.title.map((line) => withCount(line, count))}
          intro={withCount(services.intro, count)}
        />
        {cards.length > 0 && (
          <ServicesShowcase
            items={cards.map(({ card, anchor }) => toItem(card, anchor))}
            exploreLabel={services.exploreLabel}
            listLabel={services.a11y.listLabel}
            // Keyed: the scenes travel to the client component as a list.
            scenes={cards.map(({ anchor, scene }, index) => (
              <Fragment key={`${index}-${anchor}`}>{scene}</Fragment>
            ))}
          />
        )}
      </div>
    </section>
  );
}
