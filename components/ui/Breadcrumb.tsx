import Link from "next/link";

type BreadcrumbProps = {
  /** Trail from the home page down; the last item is the current page and has no `href`. */
  items: { label: string; href?: string }[];
};

/** Visible breadcrumb trail. Pages also publish the same trail as BreadcrumbList structured data. */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-[13px] font-medium text-fg-subtle">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors duration-250 hover:text-fg">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-fg">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
