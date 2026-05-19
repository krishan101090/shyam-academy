import type { Metadata } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Providers } from "@/components/Providers";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

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
    default: "Shri Shyam Academy | Coaching & NIOS Admissions Delhi",
    template: "%s | Shri Shyam Academy",
  },
  description:
    "Shri Shyam Academy in West Sagarpur, New Delhi offers coaching for classes 1–12, KVS, CUET, CTET, Computer Science with Python, and guidance for NIOS Secondary and Senior Secondary admissions.",
  keywords: [
    "Shri Shyam Academy",
    "coaching Delhi",
    "NIOS Delhi",
    "NIOS admission Delhi",
    "NIOS 10th Delhi",
    "NIOS 12th Delhi",
    "NIOS SDMIS",
    "NIOS coaching Sagarpur",
    "NIOS open school Delhi",
    "Sagarpur tuition",
    "CUET coaching",
    "CTET preparation",
    "KVS preparation",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Shri Shyam Academy",
    title: "Shri Shyam Academy — Learning today, leading tomorrow",
    description:
      "Quality coaching from class 1 to 12, competitive exam prep, and NIOS admissions support in New Delhi.",
    images: [
      {
        url: "/images/hero-coaching.webp",
        width: 1792,
        height: 1024,
        alt: "Students at Shri Shyam Academy coaching centre, Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Shyam Academy",
    description: "Coaching and NIOS admissions support in New Delhi.",
    images: ["/images/hero-coaching.webp"],
  },
  alternates: { canonical: "/" },
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
  email: "krishan101090@gmail.com",
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
    "Educational coaching for school grades 1–12, competitive exams, and NIOS admissions guidance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${sourceSerif.variable} font-sans`} suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? ""} />
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
