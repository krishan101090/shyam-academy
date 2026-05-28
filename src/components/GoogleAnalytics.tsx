import { Suspense } from "react";
import { AnalyticsPageView } from "./AnalyticsPageView";
import { AnalyticsInteractions } from "./AnalyticsInteractions";
import { GA_MEASUREMENT_ID, isValidGaMeasurementId } from "@/lib/analytics";

export function GoogleAnalyticsHead() {
  const id = GA_MEASUREMENT_ID;
  if (!isValidGaMeasurementId(id)) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`,
        }}
      />
    </>
  );
}

export function GoogleAnalytics() {
  if (!isValidGaMeasurementId(GA_MEASUREMENT_ID)) return null;

  return (
    <Suspense fallback={null}>
      <AnalyticsPageView />
      <AnalyticsInteractions />
    </Suspense>
  );
}
