import StoryWall from "@/components/home/testimonials/StoryWall";
import type { StoryFilter } from "@/data/home";

type TestimonialsProps = { initialFilter?: StoryFilter };

export default function Testimonials({ initialFilter }: TestimonialsProps) {
  return (
    <section id="work" aria-labelledby="stories-title" className="defer-render bg-bg py-24 lg:py-[64px]">
      <div className="container-site">
        <StoryWall initialFilter={initialFilter} />
      </div>
    </section>
  );
}
