import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    published: z.string(),
    updated: z.string().optional(),
    keyword: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    relatedResource: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const resources = defineCollection({
  loader: glob({ base: "./src/content/resources", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    published: z.string(),
    type: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    relatedArticle: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  articles,
  resources,
};
