export interface Category {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // lucide-react icon name
  color: string; // tailwind color token used for accents
  subNiches: string[];
}

export const categories: Category[] = [
  {
    slug: "ai-automation",
    name: "AI & Automation",
    shortName: "AI & Automation",
    description:
      "Build tools, agents, and automated workflows powered by AI — then turn them into income with SaaS micro-tools, content pipelines, and productized services.",
    icon: "Bot",
    color: "violet",
    subNiches: ["AI Agents", "No-Code Automation", "Prompt Engineering", "Micro-SaaS"],
  },
  {
    slug: "ad-networks-content",
    name: "Ad Networks & Content",
    shortName: "Ad Networks",
    description:
      "Monetize websites, blogs, and web apps with display advertising — from AdSense approval to Ezoic and Mediavine graduation strategies.",
    icon: "Newspaper",
    color: "blue",
    subNiches: ["Google AdSense", "Ezoic", "Mediavine", "Blogging"],
  },
  {
    slug: "freelance-job-platforms",
    name: "Freelance & Job Platforms",
    shortName: "Freelance",
    description:
      "Land remote clients and contracts on vetted marketplaces — proposal strategy, portfolio building, and rate negotiation for new and experienced freelancers.",
    icon: "Briefcase",
    color: "emerald",
    subNiches: ["Upwork", "Fiverr", "Remote Jobs", "Consulting"],
  },
  {
    slug: "digital-assets-ecommerce",
    name: "Digital Assets & E-Commerce",
    shortName: "E-Commerce",
    description:
      "Create and sell digital products, print-on-demand goods, and online storefronts — from Etsy shops to self-hosted digital downloads.",
    icon: "ShoppingBag",
    color: "amber",
    subNiches: ["Etsy", "Print-on-Demand", "Digital Downloads", "Dropshipping"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

// Tailwind's scanner needs full, static class strings — this map keeps
// per-category accent colors purge-safe instead of interpolating classes.
const COLOR_CLASSES: Record<string, string> = {
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

export function categoryIconClasses(color: string): string {
  return COLOR_CLASSES[color] ?? COLOR_CLASSES.blue;
}
