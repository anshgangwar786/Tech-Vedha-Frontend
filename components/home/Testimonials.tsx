import StoryWall from "@/components/home/testimonials/StoryWall";
import type { StoryFilter } from "@/data/home";
import { getHome } from "@/server/content";

type TestimonialsProps = { initialFilter?: StoryFilter };

export default async function Testimonials({ initialFilter }: TestimonialsProps) {
  const { stories } = await getHome();
  return (
    <section id="work" aria-labelledby="stories-title" className="defer-render bg-bg py-16 sm:py-24 lg:py-[64px]">
      <div className="container-site">
        <StoryWall
          initialFilter={initialFilter}
          STORIES={stories.items}
          copy={{ eyebrow: stories.eyebrow, title: stories.title, showMore: stories.showMore, note: stories.note }}
        />
      </div>
    </section>
  );
}
