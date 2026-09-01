import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Crawlers that feed AI answer engines.
 *
 * A blanket `User-agent: *` already permits these, but they are listed
 * explicitly so the decision is deliberate and visible rather than incidental.
 *
 * The retrieval bots are the ones that decide whether this site can be cited in
 * an AI answer — OpenAI states that sites opted out of OAI-SearchBot "will not
 * be shown" in ChatGPT search. The training bots (GPTBot, ClaudeBot) are a
 * separate choice: they do not affect whether the site is cited today.
 */
const AI_CRAWLERS = [
  "OAI-SearchBot", // Surfaces pages in ChatGPT search results
  "ChatGPT-User", // Fetches a page when a ChatGPT user follows a link
  "GPTBot", // OpenAI foundation-model training
  "Claude-SearchBot", // Improves search result quality for Claude
  "Claude-User", // Fetches a page when a Claude user asks about it
  "ClaudeBot", // Anthropic model training
  "PerplexityBot", // Indexes pages for Perplexity answers
  "Perplexity-User", // Fetches a page on behalf of a Perplexity user
  "Google-Extended", // Gemini grounding and training
  "Applebot-Extended", // Apple Intelligence
  "meta-externalagent", // Meta AI
  "Amazonbot", // Alexa / Amazon AI
  "Bingbot", // Bing, which also backs ChatGPT search results
  "CCBot", // Common Crawl, an input to many models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
