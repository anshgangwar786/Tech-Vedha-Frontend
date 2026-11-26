import Image from "next/image";
import { Quote } from "lucide-react";
import type { Story } from "@/data/stories";
import { cx } from "@/lib/cx";
import { BRAND_GRADIENT } from "@/components/ui/styles";

function Author({ story, inverted }: { story: Story; inverted?: boolean }) {
  return (
    <footer className={cx("flex items-center gap-3 border-t pt-5", inverted ? "border-white/25" : "border-line")}>
      {story.avatar && (
        <Image
          src={story.avatar}
          alt=""
          width={40}
          height={40}
          className={cx("size-10 rounded-full object-cover ring-[1.5px]", inverted ? "ring-white/40" : "ring-line")}
        />
      )}
      <p className="min-w-0 flex-1">
        <span className={cx("block text-[15px] font-medium", inverted ? "text-white" : "text-fg")}>{story.role}</span>
        <span className={cx("block text-[13px]", inverted ? "text-white/70" : "text-fg-subtle")}>{story.company}</span>
      </p>
      <span
        className={cx(
          "rounded-full px-2.5 py-1 text-[11px] font-medium",
          inverted ? "bg-white/15 text-white" : "bg-surface-raised text-fg",
        )}
      >
        {story.category}
      </span>
    </footer>
  );
}

export default function StoryCard({ story }: { story: Story }) {
  // A photo card without a photo is shown as a plain quote card.
  if (story.kind === "photo" && story.photo) {
    return (
      <figure className="overflow-hidden rounded-[20px] border border-line bg-surface">
        <div className="relative h-[340px] sm:h-[514px]">
          <Image src={story.photo} alt={story.photoAlt} fill sizes="(min-width: 1024px) 413px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
          <span className="absolute bottom-6 left-6 rounded-full bg-black/45 px-2.5 py-1 text-[11.5px] font-medium text-white backdrop-blur">
            {story.category}
          </span>
        </div>
        <blockquote className="flex flex-col gap-[18px] px-5 pt-5 pb-6 sm:px-6">
          <p className="font-display text-[22px] leading-[1.35] font-light text-fg">{story.quote}</p>
          <Author story={story} />
        </blockquote>
      </figure>
    );
  }

  const featured = story.kind === "featured";
  return (
    <blockquote
      className={cx(
        "flex flex-col gap-3.5 rounded-[20px] border p-5 sm:p-6",
        featured ? cx("border-transparent", BRAND_GRADIENT) : "border-line bg-surface",
      )}
    >
      {story.kind === "stat" && story.stat ? (
        <p>
          <span className="block font-display text-[56px] leading-none font-light tracking-[-0.02em] text-brand">
            {story.stat}
          </span>
          <span className="mt-2 block text-[15px] text-fg-muted">{story.statLabel}</span>
        </p>
      ) : (
        <Quote aria-hidden className={featured ? "size-8 text-white/60" : "size-5 text-brand"} />
      )}
      <p
        className={cx(
          featured ? "font-display text-[22px] leading-[1.35] font-light text-pretty text-white sm:text-[26px]" : "text-[17px] leading-[1.6] text-fg",
        )}
      >
        {story.quote}
      </p>
      <Author story={story} inverted={featured} />
    </blockquote>
  );
}
