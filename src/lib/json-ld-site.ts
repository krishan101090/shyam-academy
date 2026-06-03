import { type Locale } from "@/i18n/config";
import { absoluteLocaleUrl, siteUrl } from "@/lib/seo";

export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

const postalAddress = {
  "@type": "PostalAddress" as const,
  streetAddress: "RZ 41 A, Shanker Park, Near Allahabad Dairy, West Sagar Pur Gandhi Market",
  addressLocality: "New Delhi",
  postalCode: "110046",
  addressCountry: "IN",
};

/** Root + layout structured data for Google rich results and local relevance. */
export function siteJsonLdGraph(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": ORG_ID,
        name: "Shri Shyam Academy",
        url: absoluteLocaleUrl(locale),
        telephone: "+91-8448537313",
        email: "contact@shrishyamacademy.com",
        priceRange: "₹₹",
        address: postalAddress,
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.6092,
          longitude: 77.0974,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Delhi NCR" },
          { "@type": "AdministrativeArea", name: "West Delhi" },
        ],
        logo: `${siteUrl}/images/logo-site.png`,
        image: [`${siteUrl}/images/hero-coaching.webp`, `${siteUrl}/images/logo-site.png`],
        description:
          "NIOS tuition and admissions for class 10th and 12th, Accounts and Economics coaching, home tuition, and entrance exam preparation in West Sagarpur, New Delhi.",
        knowsAbout: [
          "NIOS Secondary and Senior Secondary",
          "NIOS SDMIS admission",
          "Accounts tuition Class 11 and 12",
          "Economics home tuition",
          "KVS CUET CTET coaching",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "20:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteUrl,
        name: "Shri Shyam Academy",
        inLanguage: ["en-IN", "hi-IN"],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}
