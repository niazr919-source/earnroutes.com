---
title: "AdSense Ads Not Showing? How to Tell a Broken Setup From an Unfilled Ad Unit"
slug: "adsense-ads-not-showing-blank-spaces"
description: "Blank spaces where ads should be usually mean one of two very different things. Here's how to check which, the code faults Google actually lists, and the CSS that collapses unfilled units."
category: "ad-networks-content"
subNiche: ["Google AdSense", "Troubleshooting"]
skillLevel: "Beginner"
setupTime: "15 minutes to diagnose"
earningsPotential: "Recovers lost impressions"
timeToFirstDollar: "Immediate once fixed"
publishedAt: "2026-09-02"
updatedAt: "2026-09-02"
author: "EarnRoutes Editorial"
authorTitle: "Researched and fact-checked against primary sources"
authorBio: "Compiled from Google's published documentation on ad code implementation issues, unfilled ad units and the data-ad-status parameter. Every fault and fix described here is stated by Google in its own Help Centre, linked in the source list below."
featured: false
prerequisites:
  - "An approved AdSense account with ad code on your site"
  - "The ability to view your page source and edit CSS"
faq:
  - question: "Why are my AdSense ads showing blank spaces?"
    answer: "Most often the ad unit is unfilled, meaning no ad was returned for that slot. Google says it will either collapse the unit or show a blank space, and for most unfilled units it keeps the size and shows blank space to avoid shifting your layout. This is normal behaviour, not a fault."
  - question: "How long does it take for AdSense ads to appear on a new site?"
    answer: "Usually a few minutes, though it can occasionally take up to an hour. If nothing shows after an hour, check that your site has a status of \"Ready\" on the Sites page in your AdSense account before assuming the code is broken."
  - question: "How do I hide blank AdSense ad units?"
    answer: "Google supports targeting the data-ad-status attribute in CSS. Applying `ins.adsbygoogle[data-ad-status=\"unfilled\"] { display: none !important; }` hides units where no ad was returned."
  - question: "Why did my ad code stop working after I pasted it?"
    answer: "Google lists incomplete code with a missing script or ins tag, code collapsed onto a single line, and extra HTML tags inserted into the snippet as common causes. The fix is to replace it with fresh code copied from the Ads page in your AdSense account."
sources:
  - title: "Common issues with ad code implementation"
    publisher: "Google AdSense Help"
    url: "https://support.google.com/adsense/answer/9189018"
  - title: "Use the data-ad-status parameter to hide unfilled ad units"
    publisher: "Google AdSense Help"
    url: "https://support.google.com/adsense/answer/10762946"
  - title: "AdSense ads not showing troubleshooter"
    publisher: "Google AdSense Help"
    url: "https://support.google.com/adsense/workflow/14248619"
  - title: "About ad units"
    publisher: "Google AdSense Help"
    url: "https://support.google.com/adsense/answer/10522"
  - title: "Ad serving limits"
    publisher: "Google AdSense Help"
    url: "https://support.google.com/adsense/answer/9437976"
---

A blank rectangle where an ad should be means one of two completely different things, and almost every guide on this topic conflates them:

1. **Your ad code is broken** — the request never happens.
2. **The ad code works perfectly** — the request happened and no ad came back.

The second is called an **unfilled** ad unit, it is entirely normal, and no amount of reinstalling your ad code will change it. Telling them apart takes about thirty seconds.

## The Thirty-Second Test

Load the page, right-click the blank space, and choose Inspect. Find the `<ins class="adsbygoogle">` element and look for a `data-ad-status` attribute.

Google adds that attribute to the `<ins>` element after an ad request completes. It has three possible values:

- **`filled`** — an ad was returned and is displaying
- **`unfilled`** — no ads were returned
- **`unfill-optimized`** — no ads were returned, and AdSense optimised the unit

:::info
If `data-ad-status` is present at all, your ad code is working. The request completed and Google answered it. An `unfilled` value is an inventory outcome, not a bug — nothing about your installation is broken.
:::

If there is **no `data-ad-status` attribute**, the request never completed, and you have a genuine implementation problem. Read on to the code section.

## If It Says "Unfilled"

No ad was available for that slot at that moment. Google explains the behaviour: when a unit is unfilled, AdSense tries either to collapse the unit or show a blank space, depending on whether collapsing would cause page reflow. For most unfilled units it keeps the size and shows blank space, so your layout doesn't jump around.

Common reasons a unit goes unfilled:

- **Low advertiser demand for your audience.** Advertiser competition varies enormously by country and topic. Some geographies simply have thin demand.
- **Very new sites.** Little traffic history means less to target against.
- **Narrow ad settings.** Aggressive category or advertiser blocking removes the very ads that would have filled the slot.
- **An ad serving limit on the account.** If earnings collapsed suddenly and most units are unfilled, check the Policy Center — a limit is a different problem entirely.

:::tip
Before blaming your setup, check whether the same page fills for someone else. Fill rates vary by visitor, not just by page — an ad that is unfilled for you in one country may fill for a reader in another.
:::

### Collapsing blank units with CSS

If the empty gaps look broken, Google supports hiding them by targeting the status attribute:

```css
ins.adsbygoogle[data-ad-status="unfilled"] {
    display: none !important;
}
```

That hides units where no ad was returned, while leaving filled ones untouched.

:::warning
Hiding unfilled units removes the gap but also removes the reserved space, so the page can shift as ads resolve. That layout shift hurts Core Web Vitals. If your unfilled rate is high, reducing the *number* of units is usually better than hiding the failures.
:::

## If There's No data-ad-status at All

Now you have a real implementation fault. Google lists the specific problems it sees most:

- **Incomplete code** — "Your ad code does not appear in its entirety, for example, there's a missing `<script>` or `<ins>` tag."
- **Code collapsed onto one line** — some editors and CMS fields do this automatically.
- **Extra HTML tags inserted within the snippet** — visual editors are the usual culprit.

Google's stated remedy is not to hand-repair it: replace the broken code with fresh ad code copied from the **Ads** page in your AdSense account. Then view your page source and confirm the code appears exactly as it does in your account.

:::warning
Paste ad code in a raw HTML or code block, never a rich-text editor. WordPress's visual editor, page builders, and many CMS description fields will silently reformat the snippet, wrap it, or strip attributes — producing exactly the faults above.
:::

## The Checks Worth Running First

Before touching any code:

**Is the site status "Ready"?** Check the Sites page in AdSense. A site still being reviewed will not serve ads regardless of how correct the code is.

**Have you waited long enough?** Ads usually appear within a few minutes, but it can occasionally take up to an hour. Judging a fresh installation after two minutes is the most common false alarm.

**Is an ad blocker running?** Test in a private window with extensions disabled. This catches a surprising share of "my ads disappeared" reports.

**Are you looking at a cached page?** If your host or CDN caches HTML, you may be viewing a copy from before the code was added. Hard-refresh, or add a query string to bypass the cache.

**Is there an ad serving limit?** Check the Policy Center. A limit produces exactly the symptom of widespread unfilled units.

:::action
Work in this order: confirm site status is Ready, wait an hour, test in a private window, then inspect for `data-ad-status`. Only if that attribute is missing should you touch the ad code — reinstalling it will not fix an unfilled unit, and repeatedly changing your setup during an account assessment adds noise to it.
:::

## Where to Verify Any of This

Every behaviour described above is documented by Google in the pages linked below, including the `data-ad-status` values and the CSS approach. Google also publishes an interactive troubleshooter that checks your specific account for serving issues — worth running before making changes.
