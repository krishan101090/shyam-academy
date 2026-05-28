"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { trackEvent } from "@/lib/analytics";

type TrackedLocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  locale: Locale;
  href: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedLocaleLink({ locale, href, eventName, eventParams, onClick, ...props }: TrackedLocaleLinkProps) {
  return (
    <Link
      {...props}
      href={localePath(locale, href)}
      data-ga-tracked="true"
      onClick={(e) => {
        trackEvent(eventName, eventParams);
        onClick?.(e);
      }}
    />
  );
}
