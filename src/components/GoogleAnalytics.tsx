import Script from "next/script";
import { Suspense } from "react";
import { AnalyticsPageView } from "./AnalyticsPageView";
import { isValidGaMeasurementId } from "@/lib/analytics";

type Props = { measurementId: string };

export function GoogleAnalytics({ measurementId }: Props) {
  const id = measurementId.trim();
  if (!isValidGaMeasurementId(id)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true,send_page_view:true});`,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsPageView />
      </Suspense>
    </>
  );
}
