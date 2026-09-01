import { Mail, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { buildMetadata, CONTACT_EMAIL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with the EarnRoutes editorial team — questions, corrections, or partnership inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Contact Us</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          Have a correction, a question about a guide, or a partnership inquiry? Send us a
          message below.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Clock className="h-4 w-4" /> Responses within 1-2 business days
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 p-6 sm:p-8 dark:border-slate-800">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
