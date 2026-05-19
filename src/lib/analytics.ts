export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-SMFQVYZTZ8";

export function isValidGaMeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]+$/i.test(id.trim());
}

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, targetId: string | Date, config?: GtagParams) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, params?: GtagParams) {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag("event", eventName, params);
}

export function trackLead(params: { form: string; level?: string }) {
  trackEvent("generate_lead", {
    form_name: params.form,
    ...(params.level ? { nios_level: params.level } : {}),
  });
}
