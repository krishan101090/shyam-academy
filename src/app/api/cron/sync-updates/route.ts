import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 10;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/en/updates");
  revalidatePath("/hi/updates");

  return NextResponse.json({
    ok: true,
    revalidatedAt: new Date().toISOString(),
    note: "NIOS data is refreshed via build and GitHub Actions (scripts/fetch-updates.mjs).",
  });
}
