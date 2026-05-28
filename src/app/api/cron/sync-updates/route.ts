import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let crawled = 0;
  try {
    const { stdout } = await exec("node", ["scripts/fetch-updates.mjs"], {
      cwd: process.cwd(),
      timeout: 55000,
    });
    const match = stdout.match(/wrote (\d+) items/);
    if (match) crawled = Number(match[1]);
  } catch (err) {
    const message = err instanceof Error ? err.message : "crawl failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  revalidatePath("/en/updates");
  revalidatePath("/hi/updates");
  revalidatePath("/en/updates", "page");
  revalidatePath("/hi/updates", "page");

  return NextResponse.json({
    ok: true,
    crawled,
    revalidatedAt: new Date().toISOString(),
  });
}
