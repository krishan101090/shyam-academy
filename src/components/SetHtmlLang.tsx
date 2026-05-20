"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "hi" ? "hi" : "en-IN";
  }, [locale]);
  return null;
}
