"use client";

import { trackEvent, trackLead } from "@/lib/analytics";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useEffect, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type ContactFormProps = {
  compact?: boolean;
  labels: Dictionary["form"];
  initialInterest?: string;
  source?: string;
};

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export function ContactForm({ compact = false, labels, initialInterest, source }: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [interestValue, setInterestValue] = useState(
    initialInterest && labels.interests.some((opt) => opt === initialInterest) ? initialInterest : ""
  );
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  useEffect(() => {
    if (initialInterest && labels.interests.some((opt) => opt === initialInterest)) {
      setInterestValue(initialInterest);
    }
  }, [initialInterest, labels.interests]);

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
    const interest = String(formData.get("interest") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setState("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "Lead — contact page (shrishyamacademy.com)",
          from_name: name,
          email,
          phone,
          interest,
          message: [interest && `Interest: ${interest}`, message].filter(Boolean).join("\n\n"),
          replyto: email,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) {
        setState("error");
        return;
      }
      form.reset();
      setInterestValue("");
      trackLead({ form: "contact", interest });
      trackEvent("form_submit", { form_name: "lead_form", lead_interest: interest || "unspecified", lead_source: source || "contact_page" });
      trackEvent("callback_request", { lead_interest: interest || "unspecified", lead_source: source || "contact_page" });
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"} id="lead-form">
      {!accessKey && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          Add <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code> in{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">.env.local</code> (Web3Forms → krishan101090@gmail.com).
        </p>
      )}
      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {labels.interest}
        </label>
        <select
          id="interest"
          name="interest"
          required
          className={fieldClass}
          value={interestValue}
          onChange={(e) => setInterestValue(e.target.value)}
        >
          <option value="" disabled>
            —
          </option>
          {labels.interests.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {labels.name}
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {labels.phone}
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 …" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {labels.email}
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {labels.message}
        </label>
        {compact ? (
          <input id="message" name="message" type="text" className={fieldClass} />
        ) : (
          <textarea id="message" name="message" rows={3} className={fieldClass} />
        )}
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? labels.sending : labels.submit}
      </button>
      {state === "success" && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
          {labels.success}
        </p>
      )}
      {state === "error" && (
        <p className="text-sm font-medium text-red-700 dark:text-red-400">
          {labels.error}
        </p>
      )}
    </form>
  );
}
