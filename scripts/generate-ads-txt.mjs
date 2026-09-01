/**
 * Writes public/ads.txt before the static export runs.
 *
 * A Route Handler cannot do this job in `output: "export"` — it would always
 * emit a file, so an unconfigured site would serve a 200 response whose body is
 * the text "Not Found". Google would read that as a malformed ads.txt.
 *
 * Instead the file is created only when a publisher ID exists, and removed
 * otherwise, so an unconfigured site returns a genuine 404.
 */
import { writeFileSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const clientId = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "").trim();
const publicDir = join(process.cwd(), "public");
const target = join(publicDir, "ads.txt");

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

if (!clientId) {
  if (existsSync(target)) rmSync(target);
  console.info("[ads.txt] NEXT_PUBLIC_ADSENSE_CLIENT_ID not set — no ads.txt written.");
} else if (!/^ca-pub-\d{16}$/.test(clientId)) {
  // Fail loudly: a typo here silently breaks ad serving after approval.
  console.error(`[ads.txt] Invalid publisher ID "${clientId}". Expected ca-pub- followed by 16 digits.`);
  process.exit(1);
} else {
  // Google's required format: <domain>, <publisher id>, DIRECT, <certification id>
  const line = `google.com, ${clientId.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`;
  writeFileSync(target, line, "utf8");
  console.info(`[ads.txt] Wrote public/ads.txt for ${clientId}`);
}
