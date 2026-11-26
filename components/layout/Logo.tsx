import Image from "next/image";
import Link from "next/link";
import { fillText } from "@/lib/site";
import { getSite } from "@/server/content";

/** Logo linking home (Site & menus → Logo). Both theme variants are rendered; CSS shows the matching one. */
export default async function Logo() {
  const { SITE, LOGO } = await getSite();
  return (
    // Narrower on small phones so logo + theme toggle + menu button fit a 320 px screen. The padding makes a
    // 44 px tall tap area; the negative margin keeps the header layout unchanged.
    <Link href="/" aria-label={fillText(LOGO.a11y.linkLabel, { name: SITE.name })} className="-my-3 block shrink-0 py-3">
      <span className="relative block h-5 w-[164px] min-[380px]:w-[198px]">
        <Image
          src={LOGO.dark.src}
          alt={LOGO.dark.alt}
          fill
          sizes="198px"
          loading="eager"
          className="hidden object-contain object-left dark:block"
        />
        <Image
          src={LOGO.light.src}
          alt={LOGO.light.alt}
          fill
          sizes="198px"
          loading="eager"
          className="object-contain object-left dark:hidden"
        />
      </span>
    </Link>
  );
}
