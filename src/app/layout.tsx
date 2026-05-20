import type { Metadata } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import { hindiSeoKeywords } from "@/lib/seo-keywords";
import "./globals.css";
import { GoogleAnalytics, GoogleAnalyticsHead } from "@/components/GoogleAnalytics";
import { Providers } from "@/components/Providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const siteUrl = "https://shrishyamacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shri Shyam Academy | NIOS Tuition & 10th/12th Admission Delhi",
    template: "%s | Shri Shyam Academy",
  },
  description:
    "NIOS tuition and admissions for class 10th & 12th in Delhi. Shri Shyam Academy, West Sagarpur — SDMIS guidance, subject coaching, TMA support, and exam preparation for Secondary and Senior Secondary.",
  keywords: [
    "Shri Shyam Academy",
    "NIOS tuition Delhi",
    "NIOS coaching Delhi",
    "NIOS admission Delhi",
    "NIOS 10th admission Delhi",
    "NIOS 12th admission Delhi",
    "NIOS 10th tuition",
    "NIOS 12th tuition",
    "NIOS SDMIS help",
    "NIOS open school Delhi",
    "NIOS Sagarpur",
    "NIOS West Delhi",
    ...hindiSeoKeywords,
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Shri Shyam Academy",
    title: "Shri Shyam Academy — NIOS tuition & admissions Delhi",
    description:
      "NIOS tuition and 10th/12th admission guidance in West Sagarpur, New Delhi. SDMIS support, subject coaching, and exam preparation.",
    images: [
      {
        url: "/images/hero-coaching.webp",
        width: 1792,
        height: 1024,
        alt: "NIOS tuition at Shri Shyam Academy, Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Shyam Academy",
    description: "NIOS tuition and admissions for 10th & 12th in New Delhi.",
    images: ["/images/hero-coaching.webp"],
  },
  alternates: { canonical: "/en" },
  verification: {
    google: "xQFNkckm29t0f8d3FzUcUCaC2b_F5KrU1C_K5szdgXM",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Shri Shyam Academy",
  url: siteUrl,
  telephone: "+91-8448537313",
  email: "contact@shrishyamacademy.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "RZ 41 A, Shanker Park, Near Allahabad Dairy, West Sagar Pur Gandhi Market",
    addressLocality: "New Delhi",
    postalCode: "110046",
    addressCountry: "IN",
  },
  areaServed: "Delhi NCR",
  logo: `${siteUrl}/images/logo-site.png`,
  image: [`${siteUrl}/images/hero-coaching.webp`, `${siteUrl}/images/logo-site.png`],
  description:
    "NIOS tuition and admissions guidance for Secondary (10th) and Senior Secondary (12th) in Delhi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <GoogleAnalyticsHead />
      </head>
      <body className={`${dmSans.variable} ${sourceSerif.variable} font-sans`} suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <GoogleAnalytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
