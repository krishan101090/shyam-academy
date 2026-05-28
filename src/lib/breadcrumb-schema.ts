import { localePath, type Locale } from "@/i18n/config";
import type { BreadcrumbItem } from "@/components/Breadcrumbs";

export function breadcrumbListSchema(
  locale: Locale,
  siteUrl: string,
  items: BreadcrumbItem[],
  currentPath?: string
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const href = item.href ?? (isLast && currentPath ? currentPath : undefined);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(href ? { item: `${siteUrl}${localePath(locale, href)}` } : {}),
      };
    }),
  };
}
