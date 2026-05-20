import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { ComponentProps } from "react";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  locale: Locale;
  href: string;
};

export function LocaleLink({ locale, href, ...props }: LocaleLinkProps) {
  return <Link href={localePath(locale, href)} {...props} />;
}
