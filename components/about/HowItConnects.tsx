import LoopExplorer from "@/components/about/LoopExplorer";
import SectionGlow from "@/components/about/SectionGlow";
import HeadingStack from "@/components/ui/HeadingStack";
import { DISPLAY_TITLE, SECTION } from "@/components/ui/styles";
import { cx } from "@/lib/cx";
import type { AboutContent } from "@/data/about";

/** "One loop. Every wing.": how the four services feed each other around the client. */
export default function HowItConnects({ content: copy }: { content: AboutContent["howItConnects"] }) {
  return (
    <section
      id="how-it-connects"
      aria-labelledby="loop-title"
      className={cx("defer-render relative isolate overflow-hidden bg-bg-deep", SECTION)}
    >
      <SectionGlow />
      <div className="container-site">
        <LoopExplorer
          content={copy}
          heading={
            <HeadingStack
              id="loop-title"
              eyebrow={copy.eyebrow}
              title={copy.title}
              titleClassName={cx(DISPLAY_TITLE, "text-balance")}
              intro={copy.intro}
              introClassName="max-w-[425px]"
            />
          }
        />
      </div>
    </section>
  );
}
