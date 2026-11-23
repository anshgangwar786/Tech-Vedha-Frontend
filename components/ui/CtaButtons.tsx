import ButtonLink from "@/components/ui/ButtonLink";
import { WHATSAPP_URL } from "@/lib/site";
import { cx } from "@/lib/cx";

type CtaButtonsProps = {
  /** Primary "Start a project" target. */
  href?: string;
  /** Secondary button; defaults to "Chat on WhatsApp". */
  secondary?: { href: string; label: string; variant?: "glass" | "outline" };
  className?: string;
};

/** "Start a project" plus one secondary action, as used in heroes and banners. */
export default function CtaButtons({
  href = "#contact",
  secondary = { href: WHATSAPP_URL, label: "Chat on WhatsApp" },
  className,
}: CtaButtonsProps) {
  return (
    <div className={cx("flex flex-wrap gap-3", className)}>
      <ButtonLink href={href} arrow>
        Start a project
      </ButtonLink>
      <ButtonLink href={secondary.href} variant={secondary.variant ?? "outline"}>
        {secondary.label}
      </ButtonLink>
    </div>
  );
}
