import { NextResponse } from "next/server";
import { sitemapXml } from "@/generated/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
