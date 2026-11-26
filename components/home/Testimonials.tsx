import StoryWall from "@/components/home/testimonials/StoryWall";
import type { StoriesContent } from "@/data/stories";

type TestimonialsProps = {
  /** The page's own "Client stories" section (home.stories, or a service page's stories). */
  content: StoriesContent;
  initialFilter?: string;
};

export default function Testimonials({ content, initialFilter }: TestimonialsProps) {
  return (
    <section id="work" aria-labelledby="stories-title" className="defer-render bg-bg py-16 sm:py-24 lg:py-[64px]">
      <div className="container-site">
        <StoryWall initialFilter={initialFilter} content={content} />
      </div>
    </section>
  );
}
