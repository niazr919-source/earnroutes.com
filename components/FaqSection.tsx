import { MessagesSquare } from "lucide-react";
import type { FaqItem } from "@/lib/articles";

/**
 * Visible question-and-answer block.
 *
 * Rendered as plain headings and paragraphs rather than a collapsed accordion:
 * answer engines extract from the rendered text, and short self-contained
 * answers under a literal question heading are the most extractable shape.
 */
export function FaqSection({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="not-prose mt-12">
      <h2
        id="faq-heading"
        className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"
      >
        <MessagesSquare className="h-5 w-5 text-brand-600" /> Frequently Asked Questions
      </h2>
      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">{item.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
