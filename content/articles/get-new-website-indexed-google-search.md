---
title: "How to Get a Brand-New Website Indexed by Google Search"
slug: "get-new-website-indexed-google-search"
description: "The three technical requirements Google actually states for indexing, how to submit a sitemap correctly, and why 'not indexed' is usually a crawl problem rather than a quality one."
category: "ad-networks-content"
subNiche: ["SEO", "Google Search Console"]
skillLevel: "Beginner"
setupTime: "1–2 hours, then weeks of waiting"
earningsPotential: "Prerequisite for all ad income"
timeToFirstDollar: "Indexing in days to weeks; traffic in months"
publishedAt: "2026-09-01"
updatedAt: "2026-09-01"
author: "EarnRoutes Editorial"
authorTitle: "Researched and fact-checked against primary sources"
authorBio: "Compiled from Google Search Central's published documentation on technical requirements, sitemaps, and spam policies. Every requirement quoted here is stated by Google in its own developer documentation, linked in the source list below."
featured: false
prerequisites:
  - "A live site on your own domain with real content published"
  - "Access to your DNS records or the ability to upload a file to your site root"
sources:
  - title: "Google Search Technical Requirements"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/essentials/technical"
  - title: "Google Search Essentials"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/essentials"
  - title: "Build and submit a sitemap"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap"
  - title: "Spam policies for Google web search"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/essentials/spam-policies"
  - title: "SEO Starter Guide"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
---

Before a site can earn anything from advertising, Google has to know it exists. New publishers routinely spend weeks tweaking content and layout while the real problem is much more basic: Googlebot either can't reach the pages, or has no reason to think they're worth crawling yet.

This guide covers what Google actually requires, in its own words, and what you can reasonably do to speed things along.

:::info
Indexing and ranking are different problems. Indexing means Google has your page in its database. Ranking means Google shows it to someone. This guide is about the first one — you cannot rank a page that was never indexed.
:::

## The Three Technical Requirements

Google's documentation is unusually blunt here. There are exactly three minimum requirements for a page to be *eligible* for indexing:

1. **Googlebot isn't blocked.** Google must be able to find and access the page. Pages disallowed in `robots.txt`, or hidden behind a login, won't be indexed.
2. **The page works** — meaning Google receives an **HTTP 200 (success)** status code. Client and server error pages aren't indexed.
3. **The page has indexable content**, in a file type Google Search supports, that doesn't violate the spam policies.

That's the whole list. Google is also explicit about what meeting it does *not* buy you: "just because a page meets these requirements doesn't mean that a page will be indexed; indexing isn't guaranteed."

:::warning
The most common self-inflicted wound is shipping a site that was blocked during development. A `robots.txt` containing `Disallow: /` or a stray `noindex` meta tag left over from a staging environment will keep you invisible indefinitely, no matter how good the content is. Check both before you do anything else.
:::

## Check You're Not Blocking Yourself

Two files decide whether Googlebot gets in.

**`robots.txt`**, at the root of your domain. Visit `https://yourdomain.com/robots.txt` directly. You're looking for a `Disallow:` line that covers pages you want crawled. A healthy minimal file looks like:

```
User-Agent: *
Allow: /

Sitemap: https://www.yourdomain.com/sitemap.xml
```

**The robots meta tag**, in each page's HTML `<head>`. View source on a live page and search for `noindex`. If you find `<meta name="robots" content="noindex">` on a page you want indexed, that single tag overrides everything else you do.

## Build a Sitemap Correctly

A sitemap is a machine-readable list of the URLs you want Google to know about. Most content management systems and site frameworks generate one automatically — check whether yours already serves `/sitemap.xml` before building anything by hand.

Google's stated limits for a single sitemap file are **50MB uncompressed or 50,000 URLs**. Beyond that you split into multiple sitemaps and reference them from a sitemap index. Almost no new site comes close to either limit.

The requirements that actually catch people out:

- **Use fully-qualified, absolute URLs** — `https://www.example.com/mypage.html`, not `/mypage.html`.
- **Files must be UTF-8 encoded.**
- **Include only canonical URLs** — the version of each page you actually want in search results. If your site is reachable at both `example.com/about` and `www.example.com/about/`, pick one, redirect the other, and list only the winner.
- **`lastmod` should reflect genuine content updates.** Stamping every URL with today's date on every build teaches Google to ignore the field.

:::tip
That third point is the one that quietly wastes crawl budget. Decide early whether your canonical URLs use `www` or not, and whether they end in a trailing slash — then make your sitemap, your canonical tags, and your redirects all agree. Mismatches here are invisible to visitors but very visible to Googlebot.
:::

## Submit It — Four Ways, One That Matters

Google accepts sitemap submissions through:

1. **Search Console**, via the Sitemaps report — this is the one to use, because it's the only method that reports back whether Google could read the file and what errors it found.
2. **The Search Console API**, for programmatic submission.
3. **`robots.txt`**, by adding a `Sitemap:` line as shown above. Free, and worth doing regardless.
4. **WebSub**, for Atom/RSS feeds.

Do both 1 and 3. The `robots.txt` line means any crawler that finds your site discovers the sitemap; Search Console gives you the diagnostics.

:::warning
Submitting a sitemap is a hint, not an instruction. Google's documentation says plainly that it "doesn't guarantee that Google will download the sitemap or use the sitemap for crawling." A sitemap helps Google find pages; it does not persuade Google that they deserve indexing.
:::

## Set Up Search Console First, Not Later

Search Console is free and is the only place Google tells you what it thinks of your site. Verify ownership by DNS record if you can — it covers the whole domain including subdomains, and survives redesigns.

Once verified, the two reports worth learning:

- **Pages** (the indexing report) tells you which URLs are indexed and, for those that aren't, the specific reason — "Discovered – currently not indexed", "Crawled – currently not indexed", "Excluded by 'noindex' tag", and so on. These labels are diagnostic gold; each one points at a different fix.
- **URL Inspection** lets you check a single URL's status and request indexing for it.

Use "Request indexing" on your genuinely important pages when they're first published. Don't submit every page repeatedly — it doesn't accelerate anything and the quota is small.

## Why "Discovered – Currently Not Indexed" Is Normal for New Sites

This status confuses almost everyone. It means Google knows the URL exists but has chosen not to crawl it yet.

For a brand-new domain with no external links and no history, that's the expected state. Google allocates crawling effort based on signals it doesn't have for you yet. This is not a penalty and there's no button that fixes it.

What actually resolves it, in rough order of impact:

- **Time.** New domains routinely take weeks to move from discovered to indexed.
- **Genuine external links.** A single link from a site Google already crawls frequently does more than any amount of resubmitting. This means real mentions — a relevant forum answer, a directory your business actually belongs in, a supplier or partner page — not purchased links, which are a spam policy violation.
- **Internal linking.** Pages linked from your homepage and from other articles get crawled sooner than orphans reachable only via the sitemap.
- **Publishing consistently.** A site that adds content regularly earns more frequent crawling than one that goes quiet after launch.

:::info
"Crawled – currently not indexed" is a different and more serious message. It means Google fetched the page, looked at it, and decided not to index it. That's a content quality signal, and the fix is the page itself — not the technical setup.
:::

## What Not to Do

Google's spam policies describe the tactics that get pages ranked lower or removed entirely. The ones new publishers are most often tempted by:

- **Buying links**, or joining link-exchange schemes, to manufacture the external links described above.
- **Scaled content abuse** — mass-producing pages, with or without AI assistance, primarily to rank rather than to help anyone.
- **Site reputation abuse** — hosting unrelated third-party content on your domain to borrow its ranking.
- **Cloaking** — showing Googlebot something different from what visitors see.
- **Hidden text and keyword stuffing.**

These are also the behaviours most likely to cost you AdSense approval later, since Google evaluates content quality for both.

## A Realistic Timeline

For a new domain publishing genuinely useful content:

| Milestone | Typical timing |
| --- | --- |
| Search Console verified, sitemap submitted | Day 1 |
| Homepage indexed | Days to ~2 weeks |
| Most published pages indexed | 2–8 weeks |
| First meaningful search traffic | 3–6 months |

Those ranges are wide because they genuinely vary. Anyone quoting you a precise number is guessing.

:::action
Do these four things today, in order: verify Search Console by DNS, confirm `robots.txt` isn't blocking you, check no page carries a stray `noindex`, and submit your sitemap. Then publish consistently and leave it alone for a few weeks — refreshing the indexing report daily changes nothing.
:::

## Where to Verify Any of This

Every requirement above is quoted from Google Search Central's own documentation, linked below. Google updates these pages, and they are always more authoritative than a summary — including this one.
