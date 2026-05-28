import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { pageAlternates } from "@/lib/seo";
import { allSubjectSlugs, getSubject } from "@/lib/subjects-data";
import { AccountsSubjectPage } from "@/components/subjects/AccountsSubjectPage";
import { EconomicsSubjectPage } from "@/components/subjects/EconomicsSubjectPage";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return allSubjectSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const subject = getSubject(slug);
  if (!subject) return {};
  return {
    title: subject.metaTitle,
    description: subject.metaDescription,
    alternates: pageAlternates(locale, `/subjects/${slug}`),
    robots: { index: true, follow: true },
  };
}

export default async function SubjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const subject = getSubject(slug);
  if (!subject) notFound();

  const activeLocale: Locale = locale;

  if (subject.slug === "accounts") {
    return <AccountsSubjectPage locale={activeLocale} />;
  }
  if (subject.slug === "economics") {
    return <EconomicsSubjectPage locale={activeLocale} />;
  }

  notFound();
}
