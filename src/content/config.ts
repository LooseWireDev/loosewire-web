import { defineCollection, z } from 'astro:content';

const harknotsBlog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    tldr: z.string().optional(),
    readTime: z.string().optional(),
  }),
});

const harknotesVs = defineCollection({
  type: 'content',
  schema: z.object({
    competitor: z.string(),
    competitorSlug: z.string(),
    description: z.string(),
    pubDate: z.string(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'harknotes-blog': harknotsBlog,
  'harknotes-vs': harknotesVs,
};
