import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Disclosure from "@/components/ui/Disclosure";
import HeadingStack from "@/components/ui/HeadingStack";
import { SECTION_TIGHT } from "@/components/ui/styles";
import { cx } from "@/lib/cx";
import { revealDelay } from "@/lib/utils";
import { getHome, getSite } from "@/server/content";

type FaqProps = {
  /** A string array puts each entry on its own line at desktop widths. */
  title?: string | string[];
  items?: readonly { question: string; answer: string }[];
  /** Name shared by the <details> items, making them a single-open accordion. */
  group?: string;
  /** Desktop column template and gap. */
  className?: string;
};

/**
 * Heading and WhatsApp prompt on the left, single-open accordion on the right. Built on native
 * <details>, so it works without JavaScript and answers stay crawlable. Pages also publish the
 * same items as FAQPage structured data.
 */
export default async function Faq({
  title: titleProp,
  items: itemsProp,
  group = "faq",
  className = "lg:grid-cols-[380px_1fr] lg:gap-[176px]",
}: FaqProps) {
  const [{ WHATSAPP_URL }, { faq }] = await Promise.all([getSite(), getHome()]);
  const items = itemsProp ?? faq.items;
  return (
    <section id="faq" aria-labelledby="faq-title" className={cx("defer-render bg-bg-deep", SECTION_TIGHT)}>
      <div className={cx("container-site grid gap-8 sm:gap-12", className)}>
        <div className="flex flex-col gap-5 sm:gap-6 lg:sticky lg:top-28 lg:self-start">
          <HeadingStack
            id="faq-title"
            eyebrow={faq.eyebrow}
            title={titleProp ?? faq.title}
            titleClassName="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.03] tracking-[-0.028em] text-balance text-fg"
          />
          <Link
            href={WHATSAPP_URL}
            style={revealDelay(300)}
            className="reveal mt-2 flex max-w-[380px] items-center gap-3.5 rounded-2xl border border-line bg-surface px-[18px] py-4 transition-colors hover:border-brand"
          >
            <MessageCircle aria-hidden className="size-10 shrink-0 rounded-full bg-primary p-2.5 text-white" />
            <span>
              <span className="block text-[15px] font-medium text-fg">{faq.helpTitle}</span>
              <span className="block text-sm text-fg-muted">{faq.helpText}</span>
            </span>
          </Link>
        </div>

        <ul data-reveal-stagger className="flex flex-col gap-2.5">
          {items.map((item, index) => (
            <li key={item.question}>
              <Disclosure
                group={group}
                defaultOpen={index === 0}
                summary={<h3 className="text-[17px] leading-[1.4] font-medium text-fg">{item.question}</h3>}
              >
                <p className="-mt-1 max-w-[632px] text-base leading-[1.65] text-fg-muted">{item.answer}</p>
              </Disclosure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
