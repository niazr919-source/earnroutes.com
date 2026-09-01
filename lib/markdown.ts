import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ProcessedMarkdown {
  html: string;
  toc: TocItem[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const CALLOUT_ICON: Record<string, string> = {
  info: "ℹ️",
  warning: "⚠️",
  tip: "💡",
  action: "✅",
};

const CALLOUT_LABEL: Record<string, string> = {
  info: "Good to Know",
  warning: "Warning",
  tip: "Pro Tip",
  action: "Action Step",
};

async function renderInline(md: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(md);
  return String(file).trim();
}

/**
 * Transforms custom callout blocks:
 * :::tip Optional Title
 * body text (markdown supported)
 * :::
 */
async function transformCallouts(markdown: string): Promise<string> {
  const calloutRegex = /:::(info|warning|tip|action)[ \t]*(.*)\n([\s\S]*?):::/g;
  const matches = [...markdown.matchAll(calloutRegex)];
  if (matches.length === 0) return markdown;

  let result = "";
  let lastIndex = 0;
  for (const match of matches) {
    const [full, type, titleRaw, body] = match;
    const start = match.index ?? 0;
    result += markdown.slice(lastIndex, start);
    const title = titleRaw.trim() || CALLOUT_LABEL[type];
    const bodyHtml = await renderInline(body.trim());
    const icon = CALLOUT_ICON[type];
    result += `\n<div class="not-prose callout callout-${type}">\n<p class="callout-label">${icon} ${title}</p>\n<div class="callout-body">\n${bodyHtml}\n</div>\n</div>\n\n`;
    lastIndex = start + full.length;
  }
  result += markdown.slice(lastIndex);
  return result;
}

/**
 * Transforms platform connection card blocks:
 * :::platform Upwork|https://www.upwork.com|Freelance marketplace for remote contracts
 * :::
 */
function transformPlatformCards(markdown: string): string {
  const cardRegex = /:::platform[ \t]+(.*?)\|(.*?)\|(.*?)\n:::/g;
  return markdown.replace(cardRegex, (_m, name: string, url: string, desc: string) => {
    const n = name.trim();
    const u = url.trim();
    const d = desc.trim();
    return `\n<a href="${u}" target="_blank" rel="nofollow sponsored noopener" class="not-prose platform-cta-card">
<span class="platform-cta-top"><span class="platform-cta-name">${n}</span><span class="platform-cta-external">Visit site &#8599;</span></span>
<span class="platform-cta-desc">${d}</span>
</a>\n\n`;
  });
}

function injectHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();
  const headingRegex = /<(h2|h3)>([\s\S]*?)<\/\1>/g;

  const newHtml = html.replace(headingRegex, (_m, level: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const base = slugify(text) || "section";
    let uniqueId = base;
    let i = 2;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${base}-${i++}`;
    }
    usedIds.add(uniqueId);
    toc.push({ id: uniqueId, text, level: level === "h2" ? 2 : 3 });
    return `<${level} id="${uniqueId}">${inner}</${level}>`;
  });

  return { html: newHtml, toc };
}

export async function processMarkdown(markdown: string): Promise<ProcessedMarkdown> {
  const withCallouts = await transformCallouts(markdown);
  const withCards = transformPlatformCards(withCallouts);
  const rawHtml = await renderInline(withCards);
  return injectHeadingIds(rawHtml);
}
