import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { DynamicIcon } from "@/components/DynamicIcon";
import { categories, getCategoryBySlug, categoryIconClasses } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} Guides`,
    description: category.description,
    path: `/category/${category.slug}`,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Categories", path: "/#categories" },
          { name: category.name, path: `/category/${category.slug}` },
        ])}
      />
      <Breadcrumbs items={[{ name: category.name, path: `/category/${category.slug}` }]} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${categoryIconClasses(
              category.color
            )}`}
          >
            <DynamicIcon name={category.icon} className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{category.name}</h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
              {category.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {category.subNiches.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <AdSlot id="ad-header-banner" variant="banner" />

        {articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400 dark:border-slate-700">
            New guides for this category are in the editorial pipeline — check back soon.
          </p>
        )}

        <AdSlot id="ad-footer" variant="footer" />
      </section>
    </>
  );
}
