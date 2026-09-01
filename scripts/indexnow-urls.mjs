/**
 * Works out which URLs to submit to IndexNow, and prints them one per line.
 *
 * Usage: node scripts/indexnow-urls.mjs [changed-file ...]
 *   INDEXNOW_SUBMIT_ALL=true  submit every URL in the sitemap regardless
 *
 * Deliberately a script rather than shell in the workflow: mapping filenames to
 * URLs needs a regex with a capture group, and that does not survive being
 * embedded in YAML inside a shell command.
 *
 * Prints nothing at all when there is nothing to submit, so the workflow can
 * test the output for emptiness and skip the ping entirely.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BASE = "https://www.earnroutes.com";
const SITEMAP = join(process.cwd(), "out", "sitemap.xml");
const NEWLINE = "\n";

function emit(list) {
  if (list.length > 0) process.stdout.write(list.join(NEWLINE) + NEWLINE);
}

function sitemapUrls() {
  if (!existsSync(SITEMAP)) return [];
  const xml = readFileSync(SITEMAP, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const changed = process.argv.slice(2).filter(Boolean);

if (process.env.INDEXNOW_SUBMIT_ALL === "true") {
  emit(sitemapUrls());
  process.exit(0);
}

// A change to the templates, components or shared library rebuilds every page,
// so submit the whole sitemap rather than guessing which pages actually moved.
if (changed.some((f) => /^(app|components|lib)\//.test(f))) {
  console.error("[indexnow] Site-wide change detected — submitting all URLs.");
  emit(sitemapUrls());
  process.exit(0);
}

const urls = new Set();
for (const file of changed) {
  const article = file.match(/^content\/articles\/(.+)\.md$/);
  if (article) urls.add(`${BASE}/guides/${article[1]}/`);
}

// A new or edited guide also changes the homepage listings.
if (urls.size > 0) urls.add(`${BASE}/`);

emit([...urls]);
