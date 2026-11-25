import ButtonLink from "@/components/ui/ButtonLink";
import { cx } from "@/lib/cx";
import { getSite } from "@/server/content";

type CtaButtonsProps = {
  /** Primary "Start a project" target. */
  href?: string;
  /** Primary button label (default "Start a project"). */
  label?: string;
  /** Secondary button; defaults to "Chat on WhatsApp". */
  secondary?: { href: string; label: string; variant?: "glass" | "outline" };
  className?: string;
};

/** Primary CTAs pointing at the enquiry form open the "Start a project" popup instead. */
const isContactTarget = (href: string) => ["#contact", "/#contact", "/contact"].includes(href);

/** "Start a project" plus one secondary action, as used in heroes and banners. */
export default async function CtaButtons({ href = "#contact", label = "Start a project", secondary, className }: CtaButtonsProps) {
  if (!secondary) {
    const { WHATSAPP_URL, WHATSAPP_BUTTON_LABEL } = await getSite();
    secondary = { href: WHATSAPP_URL, label: WHATSAPP_BUTTON_LABEL || "Chat on WhatsApp" };
  }
  return (
    // Narrow phones: both buttons stack at full width (equal, easy to hit). From 440 px they sit side by side.
    <div className={cx("flex flex-col gap-3 min-[440px]:flex-row min-[440px]:flex-wrap", className)}>
      <ButtonLink href={href || "/#contact"} arrow startProject={isContactTarget(href || "/#contact")} className="max-[439px]:w-full">
        {label || "Start a project"}
      </ButtonLink>
      <ButtonLink href={secondary.href || "/"} variant={secondary.variant ?? "outline"} className="max-[439px]:w-full">
        {secondary.label}
      </ButtonLink>
    </div>
  );
}
