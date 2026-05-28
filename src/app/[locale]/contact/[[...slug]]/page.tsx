import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getContactContent } from "@/i18n/pages/contact";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import {
  allContactSlugParams,
  getContactFaqs,
  legacyQueryToContactPath,
  parseContactSlug,
  resolveContactContext,
} from "@/lib/contact-context";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";
import { ContactForm } from "@/components/ContactForm";

type PageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<{ need?: string; source?: string }>;
};

export function generateStaticParams() {
  const slugs = allContactSlugParams();
  return (["en", "hi"] as const).flatMap((locale) =>
    slugs.map((entry) => ({
      locale,
      slug: entry.slug,
    }))
  );
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const query = await searchParams;
  const parsed = parseContactSlug(slug);
  if (!parsed) return {};
  const canonicalPath = parsed.path;
  const c = getContactContent(raw);
  const ctx = resolveContactContext(raw, { source: parsed.source, need: query.need });
  return {
    title: ctx.metaTitle ?? c.metaTitle,
    description: ctx.metaDescription ?? c.metaDescription,
    alternates: pageAlternates(raw, canonicalPath),
    robots: { index: true, follow: true },
  };
}

function AccordionItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-900 marker:content-none dark:text-white [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          {title}
          <span className="text-brand-600 transition group-open:rotate-180 dark:text-brand-400" aria-hidden="true">
            ▾
          </span>
        </span>
      </summary>
      <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">{children}</div>
    </details>
  );
}

const quickLinks = [
  { href: "/subjects/accounts", labelKey: "linkAccounts" as const },
  { href: "/subjects", labelKey: "linkSubjects" as const },
  { href: "/home-tuition/west-delhi", labelKey: "linkHomeTuition" as const },
  { href: "/nios-admission-delhi", labelKey: "linkAdmission" as const },
  { href: "/entrance-after-12th", labelKey: "linkEntrance" as const },
];

export default async function ContactPage({ params, searchParams }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const query = await searchParams;

  if (!slug?.length && (query.source || query.need)) {
    const legacyPath = legacyQueryToContactPath(query);
    if (legacyPath) permanentRedirect(localePath(locale, legacyPath));
  }

  const parsed = parseContactSlug(slug);
  if (!parsed) notFound();

  const canonicalPath = parsed.path;
  const c = getContactContent(locale);
  const dict = getDictionary(locale);
  const ctx = resolveContactContext(locale, { source: parsed.source, need: query.need });
  const pageUrl = `${siteUrl}${localePath(locale, canonicalPath)}`;

  const breadcrumbItems = [{ label: c.home, href: "/" }, { label: c.breadcrumb }];
  const contextualFaqs = getContactFaqs(locale).filter((faq) => ctx.faqIds.includes(faq.id));

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(locale, siteUrl, breadcrumbItems, canonicalPath),
      {
        "@type": "ContactPage",
        url: pageUrl,
        name: ctx.metaTitle ?? c.metaTitle,
        description: ctx.metaDescription ?? c.metaDescription,
        inLanguage: locale === "hi" ? "hi" : "en-IN",
      },
      {
        "@type": "FAQPage",
        mainEntity: contextualFaqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }} />
      <Breadcrumbs locale={locale} items={breadcrumbItems} />
      <article>
        <section className="scroll-mt-20 border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-10 lg:py-8 lg:px-8">
            <header className="order-2 lg:order-1">
              {ctx.backLink ? (
                <TrackedLocaleLink
                  locale={locale}
                  href={ctx.backLink.href}
                  eventName="cta_click"
                  eventParams={{ cta_name: "contact_back_link", context: ctx.id }}
                  className="mb-3 inline-flex text-sm font-medium text-brand-700 hover:text-brand-800 dark:text-brand-300"
                >
                  {ctx.backLink.label}
                </TrackedLocaleLink>
              ) : null}
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">{ctx.eyebrow}</p>
              <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 text-balance dark:text-white sm:text-3xl lg:text-4xl">
                {ctx.title}
              </h1>
              <p className="lead-summary mt-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">{ctx.lead}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>{ctx.bullet1}</li>
                <li>{ctx.bullet2}</li>
              </ul>
              <TrackedAnchor
                href="tel:+918448537313"
                eventName="contact_click"
                eventParams={{ contact_type: "phone", ui_section: "contact_hero", context: ctx.id }}
                className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300"
              >
                {c.callOr}
              </TrackedAnchor>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{c.quickLinksTitle}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quickLinks.map((link) => {
                    const isHighlight = ctx.highlightPath === link.href;
                    return (
                      <TrackedLocaleLink
                        key={link.href}
                        locale={locale}
                        href={link.href}
                        eventName="cta_click"
                        eventParams={{ cta_name: "contact_quick_link", destination: link.href }}
                        className={
                          isHighlight
                            ? "rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 hover:bg-brand-100 dark:border-brand-700 dark:bg-brand-950/50 dark:text-brand-200"
                            : "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                        }
                      >
                        {c[link.labelKey]}
                      </TrackedLocaleLink>
                    );
                  })}
                </div>
              </div>
            </header>

            <aside className="order-1 scroll-mt-24 lg:order-2 lg:sticky lg:top-20" aria-label="Callback enquiry form">
              <div className="rounded-2xl border-2 border-brand-300 bg-white p-4 shadow-lg ring-4 ring-brand-100/80 dark:border-brand-800 dark:bg-slate-900 dark:ring-brand-950/50 sm:p-5">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{ctx.formTitle}</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{ctx.formHint}</p>
                <div className="mt-4">
                  <ContactForm
                    compact
                    labels={dict.form}
                    initialInterest={ctx.interest}
                    source={parsed.source ?? ctx.id}
                  />
                </div>
              </div>
            </aside>
          </div>
        </section>

        <div className="mx-auto max-w-3xl space-y-3 px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{c.moreInfo}</p>

          <AccordionItem title={c.accordionEnquire}>
            <div className="grid gap-3 sm:grid-cols-2">
              <p>
                <strong className="text-slate-800 dark:text-slate-100">{c.enquireAccounts}</strong> {c.enquireAccountsDesc}
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-100">{c.enquireHomeTuition}</strong> {c.enquireHomeTuitionDesc}
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-100">{c.enquireAdmission}</strong> {c.enquireAdmissionDesc}
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-100">{c.enquireTuition}</strong> {c.enquireTuitionDesc}
              </p>
            </div>
            <p className="mt-3 flex flex-wrap gap-x-1 gap-y-1 text-sm">
              <TrackedLocaleLink locale={locale} href="/subjects/accounts" eventName="cta_click" eventParams={{ cta_name: "contact_link_accounts" }} className="font-semibold text-brand-700 dark:text-brand-300">
                {c.linkAccounts}
              </TrackedLocaleLink>
              <span className="text-slate-400">·</span>
              <TrackedLocaleLink locale={locale} href="/subjects" eventName="cta_click" eventParams={{ cta_name: "contact_link_subjects" }} className="font-semibold text-brand-700 dark:text-brand-300">
                {c.linkSubjects}
              </TrackedLocaleLink>
              <span className="text-slate-400">·</span>
              <TrackedLocaleLink locale={locale} href="/home-tuition/west-delhi" eventName="cta_click" eventParams={{ cta_name: "contact_link_home_tuition" }} className="font-semibold text-brand-700 dark:text-brand-300">
                {c.linkHomeTuition}
              </TrackedLocaleLink>
            </p>
          </AccordionItem>

          <AccordionItem title={c.accordionAfter}>
            <ol className="list-decimal space-y-2 pl-4">
              {c.steps.map((step) => (
                <li key={step.title}>
                  <strong className="text-slate-800 dark:text-slate-100">{step.title}</strong> — {step.body}
                </li>
              ))}
            </ol>
          </AccordionItem>

          <AccordionItem title={c.accordionVisit}>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Image src="/images/wp/location_icon.png" width={18} height={18} className="mt-0.5 h-4 w-4 shrink-0" alt="" />
                <p>{dict.footer.address}</p>
              </div>
              <div className="flex gap-3">
                <Image src="/images/wp/phone_icon.png" width={16} height={16} className="mt-0.5 h-4 w-4 shrink-0" alt="" />
                <TrackedAnchor
                  href="tel:+918448537313"
                  eventName="contact_click"
                  eventParams={{ contact_type: "phone", ui_section: "contact_visit" }}
                  className="font-semibold text-brand-700 dark:text-brand-300"
                >
                  +91 84485 37313
                </TrackedAnchor>
              </div>
              <div className="flex gap-3">
                <Image src="/images/wp/envelop_icon.png" width={16} height={16} className="mt-0.5 h-4 w-4 shrink-0" alt="" />
                <TrackedAnchor
                  href="mailto:contact@shrishyamacademy.com"
                  eventName="contact_click"
                  eventParams={{ contact_type: "email", ui_section: "contact_visit" }}
                  className="text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-800 dark:text-brand-300"
                >
                  contact@shrishyamacademy.com
                </TrackedAnchor>
              </div>
            </div>
          </AccordionItem>

          {contextualFaqs.map((item) => (
            <AccordionItem key={item.id} title={item.q}>
              <p>{item.a}</p>
            </AccordionItem>
          ))}
        </div>
      </article>
    </>
  );
}
