---
title: "How to Get Your Site Into Google Discover (And Why Most Publishers Never Do)"
slug: "google-discover-traffic-for-publishers"
description: "Discover can send more traffic than Search, but you can't rank for it — there's no query. Here's what Google says decides eligibility, and the one meta tag most sites are missing."
category: "ad-networks-content"
subNiche: ["SEO", "Google Discover"]
skillLevel: "Intermediate"
setupTime: "An hour to fix eligibility"
earningsPotential: "Can exceed Search traffic"
timeToFirstDollar: "Unpredictable — Discover is not guaranteed"
publishedAt: "2026-09-02"
updatedAt: "2026-09-02"
author: "EarnRoutes Editorial"
authorTitle: "Researched and fact-checked against primary sources"
authorBio: "Compiled from Google Search Central's published documentation on Google Discover and the robots meta tag specification. Every requirement quoted here is stated by Google in its own developer documentation, linked in the source list below."
featured: false
prerequisites:
  - "A site already indexed by Google"
  - "The ability to edit your page templates and meta tags"
faq:
  - question: "How do you get into Google Discover?"
    answer: "Google states content is automatically eligible if it is indexed by Google and meets Discover's content policies. There is no submission process and no opt-in. Google is also explicit that eligibility is not a guarantee of appearing."
  - question: "What image size does Google Discover need?"
    answer: "Google recommends images at least 1200px wide, with a high resolution of more than 300,000 total pixels, ideally in a 16x9 aspect ratio. Crucially the page must also permit large previews via the max-image-preview:large robots setting, or use AMP."
  - question: "Why is my site not appearing in Google Discover?"
    answer: "The most common technical cause is missing the max-image-preview:large setting, which means Google cannot show a large image and your content is far less likely to be surfaced. Beyond that, Discover is not guaranteed for any page — Google selects content it judges timely and helpful."
  - question: "Can you rank in Google Discover?"
    answer: "No, because there is no query to rank for. Discover is a feed built from a user's interests, so Google decides what to surface using many of the same signals as Search. You influence eligibility and appeal, not position."
sources:
  - title: "Google Discover and your website"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/appearance/google-discover"
  - title: "Robots meta tag, data-nosnippet, and X-Robots-Tag specifications"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag"
  - title: "Creating helpful, reliable, people-first content"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
  - title: "Google Search Essentials"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/essentials"
  - title: "Spam policies for Google web search"
    publisher: "Google Search Central"
    url: "https://developers.google.com/search/docs/essentials/spam-policies"
---

Google Discover is the feed of articles on the Google app and Android home screen. For publishers who appear in it, it can send more traffic than Search does — and unlike Search, the reader never typed anything.

That last part is the whole difficulty. There is no keyword to target, no position to climb, and no way to make it happen on demand.

## You Cannot Opt In

Google's wording is unusually clear: content is **"automatically eligible to appear in Discover if it is indexed by Google and meets Discover's content policies."**

There's no submission form and no setting to switch on. But Google immediately adds the caveat that matters most: **"being eligible to appear in Discover is not a guarantee of appearing."**

:::warning
Treat Discover as upside, never as a plan. Traffic can arrive in enormous spikes and vanish just as abruptly, because it depends on what Google decides to surface to individual users rather than on anything you control. Publishers who build a business around Discover traffic get badly hurt when it stops.
:::

## The Tag Most Sites Are Missing

This is the one genuinely actionable technical requirement.

For an image to appear at full size in Discover, Google says it must be **"enabled by the `max-image-preview:large` setting, or by using AMP."**

Without it, Google can't show a large image — and in a visual feed, a page without a large image is dramatically less likely to be surfaced. Many otherwise well-optimised sites never set it, because the default robots meta tag most CMSs emit says only `index, follow`.

Add it in the document head:

```html
<meta name="robots" content="index, follow, max-image-preview:large">
```

If your site is built with Next.js, it belongs in your root metadata rather than in each page.

:::tip
Check your own site right now: view source on any article and look at the robots meta tag. If it reads only "index, follow", you are not eligible for a large image preview — and you have been leaving Discover on the table without knowing.
:::

## Image Requirements

Google's stated recommendations for images:

- **At least 1200px wide**
- **More than 300,000 total pixels** in resolution
- **16x9 aspect ratio**
- Large previews permitted via `max-image-preview:large`, or AMP

The 1200px minimum rules out most stock thumbnails and any image you scaled down for page speed. Discover is a visual surface first; a small or low-resolution image is effectively a decision not to compete.

## What Google Says It Looks For

Discover **"makes use of many of the same signals and systems used by Search to determine what is helpful, people-first content."**

So the ranking work you already do is the foundation, not a separate discipline. On top of that, Google says content that performs well is:

- **Timely for current interests**
- **Tells a story well**
- **Provides unique insights**

And it explicitly warns against **clickbait and sensationalism**.

That combination is why Discover rewards genuinely useful evergreen content that happens to be relevant right now, and punishes headline manipulation — the exact tactic publishers reach for when chasing a feed.

:::info
Google also notes Discover might not recommend job applications, petitions, forms, code repositories, or satirical content without context. If your best pages are tools or templates rather than articles, Discover may simply not be a channel available to you.
:::

## Where to Check Your Performance

Search Console has a separate **Discover** report, which appears only once your site has actually received Discover impressions. If you don't see it, you haven't been surfaced yet.

That report is worth watching because Discover traffic behaves nothing like Search traffic: enormous spikes on individual URLs, then silence. Reading it as if it were Search will mislead you.

Manual actions for content policy violations also show in Search Console, so check there before assuming a technical fault.

## A Realistic Checklist

1. **Add `max-image-preview:large`.** The single highest-value change, and most sites are missing it.
2. **Use images at least 1200px wide**, 16x9, on every article.
3. **Make sure pages are indexed** — Discover requires it as a precondition.
4. **Keep headlines accurate.** Clickbait is named as something to avoid.
5. **Write things worth surfacing** — Google is explicit that Discover uses the same helpfulness signals as Search.
6. **Then forget about it.** There is no lever to pull.

:::action
Do step one today, then leave it. Adding the meta tag takes five minutes and makes you eligible for something you currently aren't. Everything after that is ordinary content quality work you should be doing for Search anyway.
:::

## Where to Verify Any of This

Every requirement above is quoted from Google Search Central's published documentation, linked below. Discover's behaviour changes over time and Google's own pages are always more current than any summary — including this one.
