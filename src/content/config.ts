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

const farscryBlog = defineCollection({
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

const uncloudedBlog = defineCollection({
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

const loosewireJournal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    // YouTube video this entry accompanies, if any
    video: z.string().url().optional(),
    readTime: z.string().optional(),
  }),
});

const mealforgeBlog = defineCollection({
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

export const collections = {
  'loosewire-journal': loosewireJournal,
  'mealforge-blog': mealforgeBlog,
  'harknotes-blog': harknotsBlog,
  'harknotes-vs': harknotesVs,
  'farscry-blog': farscryBlog,
  'unclouded-blog': uncloudedBlog,
};
