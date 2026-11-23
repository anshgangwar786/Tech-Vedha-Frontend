import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

/** Wordmark linking home. Both theme variants are rendered; CSS shows the matching one. */
export default function Logo() {
  return (
    <Link href="/" aria-label={`${SITE.name} home`} className="relative block h-5 w-[198px] shrink-0">
      <Image
        src="/brand/logo-dark.png"
        alt=""
        fill
        sizes="198px"
        loading="eager"
        className="hidden object-contain object-left dark:block"
      />
      <Image
        src="/brand/logo-light.png"
        alt=""
        fill
        sizes="198px"
        loading="eager"
        className="object-contain object-left dark:hidden"
      />
    </Link>
  );
}
