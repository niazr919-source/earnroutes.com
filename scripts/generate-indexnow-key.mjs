/**
 * Publishes the IndexNow verification file into public/ before the export runs.
 *
 * IndexNow proves domain ownership by having you host a file named <key>.txt at
 * the site root whose contents are the key itself. The key is deliberately
 * public — that is how the protocol works — so it is committed in
 * scripts/indexnow.key and the served copy is generated from it, keeping a
 * single source of truth.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const keyPath = join(process.cwd(), "scripts", "indexnow.key");
const publicDir = join(process.cwd(), "public");

if (!existsSync(keyPath)) {
  console.info("[indexnow] scripts/indexnow.key not found — skipping.");
  process.exit(0);
}

const key = readFileSync(keyPath, "utf8").trim();

// IndexNow requires 8–128 hexadecimal characters.
if (!/^[a-f0-9]{8,128}$/i.test(key)) {
  console.error(`[indexnow] Invalid key "${key}". Expected 8-128 hex characters.`);
  process.exit(1);
}

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

// Drop any previously generated key file so a rotated key doesn't leave the old
// one served alongside it.
for (const file of readdirSync(publicDir)) {
  if (/^[a-f0-9]{8,128}\.txt$/i.test(file) && file !== `${key}.txt`) {
    rmSync(join(publicDir, file));
    console.info(`[indexnow] Removed stale key file ${file}`);
  }
}

writeFileSync(join(publicDir, `${key}.txt`), key, "utf8");
console.info(`[indexnow] Wrote public/${key}.txt`);
