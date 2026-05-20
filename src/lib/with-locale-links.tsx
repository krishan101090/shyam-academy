import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { ComponentProps } from "react";

export function localeLink(locale: Locale, href: string, className?: string, children?: React.ReactNode) {
  return (
    <Link href={localePath(locale, href)} className={className}>
      {children}
    </Link>
  );
}

export function L({
  locale,
  href,
  ...props
}: { locale: Locale; href: string } & Omit<ComponentProps<typeof Link>, "href">) {
  return <Link href={localePath(locale, href)} {...props} />;
}
