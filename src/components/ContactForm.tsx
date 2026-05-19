"use client";

import { trackLead } from "@/lib/analytics";
import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
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
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setState("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "Shri Shyam Academy — NIOS enquiry",
          from_name: name,
          email,
          phone,
          message,
          replyto: email,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) {
        setState("error");
        return;
      }
      form.reset();
      trackLead({ form: "contact" });
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!accessKey && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          Add your Web3Forms access key in <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">.env.local</code> as{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code> and set the Web3Forms destination to
          krishan101090@gmail.com (forms are not sent to the public contact address).
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-brand-500/0 transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="e.g. NIOS 12th admission, subjects, or tuition for class 10th…"
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {state === "loading" ? "Sending…" : "Send message"}
      </button>
      {state === "success" && (
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Thank you — we will get back to you shortly.</p>
      )}
      {state === "error" && (
        <p className="text-sm font-medium text-red-700 dark:text-red-400">
          Something went wrong. Please check your details and try again, or call +91 84485 37313.
        </p>
      )}
    </form>
  );
}
