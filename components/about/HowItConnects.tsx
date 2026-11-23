import LoopExplorer from "@/components/about/LoopExplorer";
import SectionGlow from "@/components/about/SectionGlow";
import HeadingStack from "@/components/ui/HeadingStack";
import { DISPLAY_TITLE, SECTION } from "@/components/ui/styles";
import { cx } from "@/lib/cx";

/** "One loop. Every wing.": how the four services feed each other around the client. */
export default function HowItConnects() {
  return (
    <section
      id="how-it-connects"
      aria-labelledby="loop-title"
      className={cx("defer-render relative isolate overflow-hidden bg-bg-deep", SECTION)}
    >
      <SectionGlow />
      <div className="container-site">
        <LoopExplorer
          heading={
            <HeadingStack
              id="loop-title"
              eyebrow="How everything connects"
              title={["One loop.", "Every wing."]}
              titleClassName={cx(DISPLAY_TITLE, "text-balance")}
              intro="Each service feeds the next. Pick a step to see what it covers."
              introClassName="max-w-[425px]"
            />
          }
        />
      </div>
    </section>
  );
}
