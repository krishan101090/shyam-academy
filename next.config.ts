import type { NextConfig } from "next";
import { localeLessToEnRedirects } from "./src/lib/locale-redirects";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      ...localeLessToEnRedirects(),
      {
        source: "/:path((?!en|hi|api|_next|images|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest)(?:.*))",
        destination: "/en/:path",
        permanent: true,
      },
      {
        source: "/:locale(en|hi)/accounts-classes",
        destination: "/:locale/subjects/accounts",
        permanent: true,
      },
      {
        source: "/:locale(en|hi)/subjects/accounts-tuition",
        destination: "/:locale/subjects/accounts",
        permanent: true,
      },
      {
        source: "/:locale(en|hi)/subjects/economics-tuition",
        destination: "/:locale/subjects/economics",
        permanent: true,
      },
      {
        source: "/:locale(en|hi)/subjects/cbse-icse-home-tuition",
        destination: "/:locale/home-tuition/west-delhi",
        permanent: true,
      },
      {
        source: "/:locale(en|hi)/home-tuition/north-delhi",
        destination: "/:locale/home-tuition/west-delhi",
        permanent: true,
      },
      {
        source: "/:locale(en|hi)/home-tuition/north-delhi/:area",
        destination: "/:locale/home-tuition/west-delhi",
        permanent: true,
      },
      {
        source: "/:locale(en|hi)/updates/:legacySlug(nios-bhopal.*)",
        destination: "/:locale/updates",
        permanent: true,
      },
      {
        source: "/:locale(en|hi)/updates/:legacySlug(nios-hyderabad.*)",
        destination: "/:locale/updates",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
