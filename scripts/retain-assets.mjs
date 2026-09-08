/**
 * Retains fingerprinted build assets across several deploys.
 *
 * Why this exists: Next.js content-hashes CSS and JS filenames, and Hostinger's
 * CDN caches HTML with s-maxage=31536000. A visitor holding cached HTML asks for
 * the hashes that build referenced. If a later deploy deleted them, the page
 * fails to hydrate and Next renders "Application error: a client-side exception
 * has occurred" over a blank screen.
 *
 * Keeping only the immediately previous build was not enough — HTML can sit in
 * a cache for far longer than one deploy. This keeps every asset seen in the
 * last RETAIN_BUILDS deploys, which covers a realistic staleness window while
 * still bounding growth.
 *
 * Run after `next build` and before publishing out/ to the deploy branch.
 * Usage: node scripts/retain-assets.mjs <previous-deploy-checkout-dir>
 */
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  copyFileSync,
  rmSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";

const RETAIN_BUILDS = 12;
const MANIFEST = ".asset-manifest.json";

const prevRoot = process.argv[2];
const staticDir = join(process.cwd(), "out", "_next", "static");

if (!existsSync(staticDir)) {
  console.error("[retain] out/_next/static missing — did the build run?");
  process.exit(1);
}

/** Every file under dir, as paths relative to it. */
function listFiles(dir, base = dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listFiles(full, base));
    else out.push(relative(base, full).split("\\").join("/"));
  }
  return out;
}

const prevStatic = prevRoot ? join(prevRoot, "_next", "static") : null;

// Previous manifest tells us which build each retained file was last part of.
let manifest = { build: 0, files: {} };
if (prevStatic && existsSync(join(prevStatic, MANIFEST))) {
  try {
    manifest = JSON.parse(readFileSync(join(prevStatic, MANIFEST), "utf8"));
  } catch {
    console.warn("[retain] previous manifest unreadable — starting a new one.");
  }
}

const build = (manifest.build || 0) + 1;
const thisBuild = new Set(listFiles(staticDir));

// Carry forward anything from the previous deploy that this build didn't emit.
let carried = 0;
if (prevStatic && existsSync(prevStatic)) {
  for (const rel of listFiles(prevStatic)) {
    if (rel === MANIFEST || thisBuild.has(rel)) continue;
    const lastSeen = manifest.files?.[rel] ?? manifest.build ?? 0;
    // Drop anything that has already aged out of the retention window.
    if (build - lastSeen >= RETAIN_BUILDS) continue;
    const dest = join(staticDir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(join(prevStatic, rel), dest);
    carried++;
  }
}

// Record the build each file belongs to: current build for anything this build
// produced, and the original build for anything carried over.
const files = {};
for (const rel of listFiles(staticDir)) {
  if (rel === MANIFEST) continue;
  files[rel] = thisBuild.has(rel) ? build : manifest.files?.[rel] ?? build;
}

// Prune empty directories left behind by files that aged out.
function pruneEmpty(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    pruneEmpty(full);
    if (readdirSync(full).length === 0) rmSync(full, { recursive: true });
  }
}
pruneEmpty(staticDir);

writeFileSync(join(staticDir, MANIFEST), JSON.stringify({ build, files }, null, 0), "utf8");

const total = Object.keys(files).length;
console.info(
  `[retain] build #${build}: ${thisBuild.size} new asset(s), ${carried} carried, ${total} retained (window ${RETAIN_BUILDS} builds).`,
);
