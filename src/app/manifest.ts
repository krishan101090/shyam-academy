import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shri Shyam Academy",
    short_name: "Shyam Academy",
    description:
      "Coaching for classes 1–12, KVS, CUET, CTET, and NIOS admissions guidance in West Sagarpur, New Delhi.",
    start_url: "/",
    display: "browser",
    background_color: "#f8fafc",
    theme_color: "#0284c7",
    icons: [
      {
        src: "/images/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
