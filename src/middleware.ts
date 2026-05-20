import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sitemapXml } from "./generated/sitemap-xml";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/sitemap.xml") {
    return new NextResponse(sitemapXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }
}

export const config = {
  matcher: "/sitemap.xml",
};
