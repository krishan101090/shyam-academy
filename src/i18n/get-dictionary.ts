import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { hi } from "./dictionaries/hi";

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return (locale === "hi" ? hi : en) as Dictionary;
}
