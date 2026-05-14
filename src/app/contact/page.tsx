import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Shri Shyam Academy in West Sagarpur, New Delhi. Call +91 84485 37313 or send an enquiry.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">Contact us</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Join us for admissions, batch details, or a free trial class.</p>
          <div className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex gap-3">
              <Image src="/images/wp/location_icon.png" width={20} height={20} className="mt-0.5 h-5 w-5 shrink-0" alt="" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Address</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  RZ 41 A, Shanker Park, Near Allahabad Dairy, West Sagar Pur Gandhi Market, New Delhi 110046
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Image src="/images/wp/phone_icon.png" width={16} height={16} className="mt-1 h-4 w-4 shrink-0" alt="" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Phone</p>
                <a className="mt-1 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300" href="tel:+918448537313">
                  +91 84485 37313
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Image src="/images/wp/envelop_icon.png" width={16} height={16} className="mt-1 h-4 w-4 shrink-0" alt="" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
                <a className="mt-1 inline-block text-sm text-slate-600 hover:text-brand-600 dark:text-slate-300" href="mailto:krishan101090@gmail.com">
                  krishan101090@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Send a message</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">We read every enquiry and respond as soon as possible.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
