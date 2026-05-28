"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedAnchor({ eventName, eventParams, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      data-ga-tracked="true"
      onClick={(e) => {
        trackEvent(eventName, eventParams);
        onClick?.(e);
      }}
    />
  );
}
