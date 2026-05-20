import { notFound } from "next/navigation";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <SiteHeader locale={locale} dict={dict} />
      <main>{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  return {
    openGraph: {
      locale: locale === "hi" ? "hi_IN" : "en_IN",
    },
  };
}
