"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/seo";

/**
 * Endpoint for a hosted form handler (Formspree, Web3Forms, Getform, …).
 * The site is a static export with no server of its own, so submissions must go
 * somewhere external. When this is unset the form tells the visitor to email us
 * instead of pretending the message was delivered.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(values: FormState): Partial<FormState> {
    const next: Partial<FormState> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!EMAIL_RE.test(values.email)) next.email = "Enter a valid email address.";
    if (values.subject.trim().length < 3) next.subject = "Give us a short subject line.";
    if (values.message.trim().length < 20) next.message = "Message should be at least 20 characters.";
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    if (!FORM_ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
    } catch {
      // Never report success we cannot verify — the visitor needs to know the
      // message did not go through so they can email instead.
      setStatus("error");
      return;
    }
    setStatus("success");
    setForm(EMPTY);
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900 dark:bg-amber-950">
        <TriangleAlert className="h-10 w-10 text-amber-600" />
        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">
          Message could not be sent
        </h3>
        <p className="max-w-sm text-sm text-amber-800 dark:text-amber-200">
          Something went wrong submitting the form. Please email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
            {CONTACT_EMAIL}
          </a>{" "}
          and we will get back to you.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-amber-700 underline dark:text-amber-300"
        >
          Back to the form
        </button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950">
        <CircleCheck className="h-10 w-10 text-emerald-600" />
        <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">Message received</h3>
        <p className="max-w-sm text-sm text-emerald-800 dark:text-emerald-200">
          Thanks for reaching out. Our editorial team responds to every message within 1-2
          business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-emerald-700 underline dark:text-emerald-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Full name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            placeholder="Jane Doe"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            placeholder="jane@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Subject
        </label>
        <input
          id="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          placeholder="Question about the Upwork guide"
        />
        {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          placeholder="Tell us what you're looking for help with…"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </button>
      <p className="text-xs text-slate-400">
        We typically respond within 1-2 business days. We never share your information — see our{" "}
        <a href="/privacy-policy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
