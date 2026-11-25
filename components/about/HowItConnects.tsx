import LoopExplorer from "@/components/about/LoopExplorer";
import SectionGlow from "@/components/about/SectionGlow";
import HeadingStack from "@/components/ui/HeadingStack";
import { DISPLAY_TITLE, SECTION } from "@/components/ui/styles";
import { cx } from "@/lib/cx";
import { getAbout, getServices } from "@/server/content";

/** "One loop. Every wing.": how the four services feed each other around the client. */
export default async function HowItConnects() {
  const [{ LOOP_STEPS, LOOP_EXAMPLE_DETAIL, HOW_IT_CONNECTS: copy }, SERVICES] = await Promise.all([getAbout(), getServices()]);
  return (
    <section
      id="how-it-connects"
      aria-labelledby="loop-title"
      className={cx("defer-render relative isolate overflow-hidden bg-bg-deep", SECTION)}
    >
      <SectionGlow />
      <div className="container-site">
        <LoopExplorer
          LOOP_STEPS={LOOP_STEPS}
          LOOP_EXAMPLE_DETAIL={LOOP_EXAMPLE_DETAIL}
          SERVICES={SERVICES}
          labels={copy}
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
