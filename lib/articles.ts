import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { processMarkdown, type TocItem } from "./markdown";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Source {
  title: string;
  publisher: string;
  url: string;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: string;
  subNiche: string[];
  skillLevel: SkillLevel;
  setupTime: string;
  earningsPotential: string;
  timeToFirstDollar: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  authorTitle: string;
  authorBio: string;
  featured: boolean;
  prerequisites: string[];
  sources?: Source[];
}

export interface ArticleSummary extends ArticleFrontmatter {
  readingTime: string;
}

export interface Article extends ArticleSummary {
  html: string;
  toc: TocItem[];
}

function getArticleFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllArticleSummaries(): ArticleSummary[] {
  const files = getArticleFiles();
  const articles = files.map((filename) => {
    const filePath = path.join(ARTICLES_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);
    return {
      ...(data as ArticleFrontmatter),
      readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
    };
  });

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const { html, toc } = await processMarkdown(content);

  return {
    ...(data as ArticleFrontmatter),
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
    html,
    toc,
  };
}

export function getAllArticleSlugs(): string[] {
  return getArticleFiles().map((f) => f.replace(/\.md$/, ""));
}

export function getArticlesByCategory(categorySlug: string): ArticleSummary[] {
  return getAllArticleSummaries().filter((a) => a.category === categorySlug);
}

export function getFeaturedArticles(limit = 3): ArticleSummary[] {
  const all = getAllArticleSummaries();
  const featured = all.filter((a) => a.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export function getRelatedArticles(current: ArticleFrontmatter, limit = 3): ArticleSummary[] {
  return getAllArticleSummaries()
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, limit);
}
