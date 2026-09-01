# EarnRoutes

Static content site for **earnroutes.com** — guides to online income, built with
Next.js 14 (App Router) and Tailwind, exported to plain HTML for Hostinger shared
hosting.

## Local development

```bash
npm install
npm run dev
```

## How deployment works

`main` holds the source. Pushing to `main` triggers
[.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the
site and force-pushes the contents of `out/` to the **`deploy`** branch.

Hostinger's Git integration clones a branch directly into `public_html` and does
**not** run a build step, so it must pull `deploy` — never `main`.

```
main  ──push──>  GitHub Actions  ──build──>  deploy branch  ──pull──>  Hostinger public_html
```

### One-time Hostinger setup

1. hPanel → **Websites** → your site → **Advanced** → **Git**.
2. Repository: `https://github.com/niazr919-source/earnroutes.com.git`
   Branch: `deploy`
   Directory: leave empty (deploys to `public_html`).
3. Copy the webhook URL Hostinger shows you, then add it in GitHub under
   **Settings → Webhooks** so each build deploys automatically. Without it, press
   **Deploy** in hPanel after each build.
4. Point the domain at Hostinger and enable the free SSL certificate. The
   included `.htaccess` redirects to `https://www.earnroutes.com`, so make sure
   the certificate covers the `www` subdomain.

## Configuration

Both variables are compiled into client-side JavaScript, so they are **not**
secrets. Set them in GitHub under *Settings → Secrets and variables → Actions →
Variables*, and in `.env.local` for local work (see `.env.local.example`).

| Variable | Effect when unset |
| --- | --- |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | No ad script, no ad slots, no `ads.txt`. This is the correct state to submit for AdSense review. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | The contact form asks visitors to email instead of submitting. |

### Turning ads on after AdSense approval

1. Add `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (format `ca-pub-` + 16 digits) as a
   repository variable.
2. In [components/AdSlot.tsx](components/AdSlot.tsx), each placement needs the
   ad unit's `slot` ID from your AdSense dashboard passed as a prop. Slots
   render nothing until both the client ID and a `slot` are present.
3. Push to `main`. The build writes `public/ads.txt` via
   [scripts/generate-ads-txt.mjs](scripts/generate-ads-txt.mjs) and loads the
   AdSense tag.

### Contact form

The site is static and has no backend. Point `NEXT_PUBLIC_CONTACT_ENDPOINT` at a
hosted form handler (Formspree, Web3Forms, Getform) that accepts a JSON POST of
`{ name, email, subject, message }`. The form reports a real error and offers the
mailto fallback if the endpoint is missing or returns a non-2xx response.

## Notes

- `trailingSlash: true` makes the export emit `about/index.html`, which Apache
  serves at `/about/` without rewrite rules. Canonical URLs in
  [lib/seo.ts](lib/seo.ts) match that shape.
- `public/.htaccess` handles the HTTPS + `www` redirect, the custom 404, caching
  and security headers. It ships with the export.
