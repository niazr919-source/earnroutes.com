import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DynamicIcon } from "@/components/DynamicIcon";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import { getAllArticleSummaries } from "@/lib/articles";
import { categories, categoryIconClasses } from "@/lib/categories";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Answers: Every Question, Answered From Primary Sources",
  description:
    "Direct answers to the questions people ask about earning online — AdSense fees and policy, platform revenue shares, freelancing, and self-publishing. Every answer traces to the platform's own documentation.",
  path: "/answers",
});

/** Flattens each article's FAQ block, keeping a link back to its source guide. */
function collectAnswers() {
  return getAllArticleSummaries().flatMap((article) =>
    (article.faq ?? []).map((item) => ({
      ...item,
      slug: article.slug,
      articleTitle: article.title,
      category: article.category,
    })),
  );
}

export default function AnswersPage() {
  const answers = collectAnswers();

  return (
    <>
      {/* The visible Q&A below is what answer engines extract; this markup is
          emitted for engines that still consume it. Google retired FAQ rich
          results in May 2026, so it earns nothing there. */}
      <JsonLd data={faqJsonLd(answers.map(({ question, answer }) => ({ question, answer })))} />

      <Breadcrumbs items={[{ name: "Answers", path: "/answers" }]} />

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Answers</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
          {answers.length} direct answers to the questions people actually ask about earning online.
          Each one is drawn from the platform&apos;s own published documentation, and links to the
          full guide it came from.
        </p>

        <nav aria-label="Jump to category" className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const count = answers.filter((a) => a.category === c.slug).length;
            if (count === 0) return null;
            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                {c.shortName}
                <span className="ml-1.5 text-slate-400">{count}</span>
              </a>
            );
          })}
        </nav>

        <div className="mt-4">
          <AdSlot id="ad-header-banner" variant="banner" />
        </div>

        {categories.map((category) => {
          const inCategory = answers.filter((a) => a.category === category.slug);
          if (inCategory.length === 0) return null;

          return (
            <section key={category.slug} id={category.slug} className="mt-12 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${categoryIconClasses(category.color)}`}
                >
                  <DynamicIcon name={category.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {category.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {inCategory.length} answer{inCategory.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-6">
                {inCategory.map((item) => (
                  <article
                    key={`${item.slug}-${item.question}`}
                    className="border-l-2 border-slate-200 pl-5 dark:border-slate-800"
                  >
                    <h3 className="font-semibold leading-snug text-slate-900 dark:text-white">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.answer}
                    </p>
                    <Link
                      href={`/guides/${item.slug}`}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
                    >
                      {item.articleTitle} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <div className="mt-12">
          <AdSlot id="ad-footer" variant="footer" />
        </div>
      </section>
    </>
  );
}
