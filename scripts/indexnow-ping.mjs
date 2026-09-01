/**
 * Notifies IndexNow (Bing, Yandex, Seznam) that specific URLs have changed.
 *
 * Usage: node scripts/indexnow-ping.mjs <url> [<url> ...]
 *
 * Timing matters here. The deploy pipeline is: GitHub Actions builds and pushes
 * to the `deploy` branch, then Hostinger pulls that branch a minute or so later.
 * Pinging the moment the build finishes would invite a crawl of the *previous*
 * build, so this waits until each URL actually serves the new content before
 * reporting it. URLs that never go live are skipped rather than submitted.
 *
 * A cache-busting query string is used for the liveness check only, so the
 * check reads the origin rather than a stale CDN copy. The URL submitted to
 * IndexNow is always the clean one.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = "www.earnroutes.com";
const MAX_WAIT_MS = 5 * 60 * 1000;
const POLL_INTERVAL_MS = 15 * 1000;

const urls = process.argv.slice(2).filter(Boolean);
if (urls.length === 0) {
  console.info("[indexnow] No URLs passed — nothing to submit.");
  process.exit(0);
}

const keyPath = join(process.cwd(), "scripts", "indexnow.key");
if (!existsSync(keyPath)) {
  console.error("[indexnow] scripts/indexnow.key not found.");
  process.exit(1);
}
const key = readFileSync(keyPath, "utf8").trim();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function isLive(url) {
  try {
    const bust = `${url}${url.includes("?") ? "&" : "?"}cb=${Date.now()}`;
    const res = await fetch(bust, { redirect: "follow" });
    return res.ok;
  } catch {
    return false;
  }
}

/** Waits until every URL serves the new build, returning those that made it. */
async function waitForLive(candidates) {
  const pending = new Set(candidates);
  const live = [];
  const deadline = Date.now() + MAX_WAIT_MS;

  while (pending.size > 0 && Date.now() < deadline) {
    for (const url of [...pending]) {
      if (await isLive(url)) {
        pending.delete(url);
        live.push(url);
        console.info(`[indexnow] live: ${url}`);
      }
    }
    if (pending.size > 0) await sleep(POLL_INTERVAL_MS);
  }

  for (const url of pending) {
    console.warn(`[indexnow] never went live within the timeout, skipping: ${url}`);
  }
  return live;
}

const live = await waitForLive(urls);

if (live.length === 0) {
  console.warn("[indexnow] No URLs became live — nothing submitted.");
  process.exit(0);
}

const body = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${key}.txt`,
  urlList: live,
};

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

// IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
if (res.status === 200 || res.status === 202) {
  console.info(`[indexnow] Submitted ${live.length} URL(s) — HTTP ${res.status}`);
} else {
  // Don't fail the deploy over a notification problem; the sitemap still works.
  console.warn(`[indexnow] Submission returned HTTP ${res.status}: ${await res.text()}`);
}
