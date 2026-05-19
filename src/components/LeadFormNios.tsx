"use client";

import { trackLead } from "@/lib/analytics";
import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function LeadFormNios() {
  const [state, setState] = useState<FormState>("idle");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accessKey) {
      setState("error");
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("nios_name") ?? "").trim();
    const email = String(formData.get("nios_email") ?? "").trim();
    const phone = String(formData.get("nios_phone") ?? "").trim();
    const level = String(formData.get("nios_level") ?? "").trim();
    const message = String(formData.get("nios_message") ?? "").trim();

    setState("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "NIOS admission Delhi — lead (shrishyamacademy.com)",
          from_name: name,
          email,
          phone,
          nios_level: level,
          message: [level && `NIOS level: ${level}`, message].filter(Boolean).join("\n\n"),
          replyto: email,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) {
        setState("error");
        return;
      }
      form.reset();
      trackLead({ form: "nios_admission_delhi", level });
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="nios-lead-form">
      {!accessKey && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          Add <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code> in{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">.env.local</code> so this form can email you. See{" "}
          <a className="font-semibold underline" href="https://web3forms.com" target="_blank" rel="noreferrer">
            web3forms.com
          </a>
          .
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nios_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full name
          </label>
          <input
            id="nios_name"
            name="nios_name"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="nios_email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            id="nios_email"
            name="nios_email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nios_phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone
          </label>
          <input
            id="nios_phone"
            name="nios_phone"
            type="tel"
            required
            autoComplete="tel"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="nios_level" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            NIOS level
          </label>
          <select
            id="nios_level"
            name="nios_level"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Secondary (10th)">Secondary (10th)</option>
            <option value="Senior Secondary (12th)">Senior Secondary (12th)</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="nios_message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          What do you need help with?
        </label>
        <textarea
          id="nios_message"
          name="nios_message"
          required
          rows={4}
          placeholder="Example: subjects you want, timeline, previous school background…"
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Request a callback"}
      </button>
      {state === "success" && (
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Thank you — we will call or email you shortly.</p>
      )}
      {state === "error" && (
        <p className="text-sm font-medium text-red-700 dark:text-red-400">
          Something went wrong. Please try again or call +91 84485 37313.
        </p>
      )}
    </form>
  );
}
