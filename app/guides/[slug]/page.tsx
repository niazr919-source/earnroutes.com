import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ListChecks } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { AuthorBox } from "@/components/AuthorBox";
import { SourcesList } from "@/components/SourcesList";
import { FaqSection } from "@/components/FaqSection";
import { TableOfContents } from "@/components/TableOfContents";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { StatBadge, skillLevelTone } from "@/components/StatBadge";
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/guides/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const category = getCategoryBySlug(article.category);
  const related = getRelatedArticles(article, 3);
  const path = `/guides/${article.slug}`;

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(article, path),
          breadcrumbJsonLd([
            ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
            { name: article.title, path },
          ]),
          ...(article.faq && article.faq.length > 0 ? [faqJsonLd(article.faq)] : []),
        ]}
      />

      <Breadcrumbs
        items={[
          ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
          { name: article.title, path },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AdSlot id="ad-header-banner" variant="banner" />

        <header className="mx-auto max-w-3xl">
          {category && (
            <span className="mb-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
              {category.name}
            </span>
          )}
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl dark:text-white">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            {article.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <StatBadge
              icon="GraduationCap"
              label="Skill level"
              value={article.skillLevel}
              tone={skillLevelTone(article.skillLevel)}
            />
            <StatBadge icon="Timer" label="Setup time" value={article.setupTime} tone="slate" />
            <StatBadge icon="Zap" label="Time to first dollar" value={article.timeToFirstDollar} tone="blue" />
            <StatBadge icon="DollarSign" label="Earnings potential" value={article.earningsPotential} tone="emerald" />
          </div>
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
          <article className="min-w-0">
            <div className="not-prose mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-3 flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                <ListChecks className="h-4 w-4 text-brand-600" /> Prerequisites
              </p>
              <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                {article.prerequisites.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-brand-600"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />

            <AdSlot id="ad-in-article-1" variant="in-article" />

            {article.faq && article.faq.length > 0 && <FaqSection items={article.faq} />}

            {article.sources && article.sources.length > 0 && (
              <SourcesList sources={article.sources} />
            )}

            <div className="mt-10">
              <AuthorBox
                author={article.author}
                authorTitle={article.authorTitle}
                authorBio={article.authorBio}
                updatedAt={article.updatedAt}
              />
            </div>
          </article>

          <aside className="space-y-6">
            <TableOfContents items={article.toc} />
            <div className="sticky top-[26rem]">
              <AdSlot id="ad-sidebar-sticky" variant="sidebar" />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-16 max-w-6xl">
            <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Related Guides</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto mt-12 max-w-6xl">
          <AdSlot id="ad-footer" variant="footer" />
        </div>
      </div>
    </>
  );
}
