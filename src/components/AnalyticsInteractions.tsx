"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function getCleanText(el: Element | null): string {
  if (!el) return "";
  return (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
}

export function AnalyticsInteractions() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      const trackedParent = target.closest("[data-ga-tracked='true']");
      if (trackedParent) return;

      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        const label = getCleanText(anchor);

        if (href.startsWith("tel:")) {
          trackEvent("contact_click", { contact_type: "phone", link_text: label });
          return;
        }
        if (href.startsWith("mailto:")) {
          trackEvent("contact_click", { contact_type: "email", link_text: label });
          return;
        }
        if (href.includes("wa.me") || href.includes("whatsapp")) {
          trackEvent("contact_click", { contact_type: "whatsapp", link_text: label });
          return;
        }

        const isHashOnly = href.startsWith("#");
        if (!isHashOnly) {
          trackEvent("cta_click", {
            cta_name: label || "link_click",
            destination: href,
          });
        }
        return;
      }

      const button = target.closest("button") as HTMLButtonElement | null;
      if (button) {
        const label = getCleanText(button);
        trackEvent("cta_click", { cta_name: label || "button_click" });
      }
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;
      const formName = form.getAttribute("name") || form.getAttribute("id") || "form_submit";
      trackEvent("form_submit", { form_name: formName });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return null;
}
