"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, isValidGaMeasurementId } from "@/lib/analytics";

export function AnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isValidGaMeasurementId(GA_MEASUREMENT_ID) || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: pagePath });
  }, [pathname, searchParams]);

  return null;
}
