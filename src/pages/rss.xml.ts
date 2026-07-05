import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const journalEntries = await getCollection('loosewire-journal');
  const harknotePosts = await getCollection('harknotes-blog');
  const farscryPosts = await getCollection('farscry-blog');
  const uncloudedPosts = await getCollection('unclouded-blog');
  const mealforgePosts = await getCollection('mealforge-blog');

  const items = [
    ...journalEntries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: new Date(entry.data.pubDate),
      link: `/blog/${entry.slug}/`,
      author: 'Gav',
    })),
    ...harknotePosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/harknotes/blog/${post.slug}/`,
    })),
    ...farscryPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/farscry/blog/${post.slug}/`,
    })),
    ...uncloudedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/unclouded/blog/${post.slug}/`,
    })),
    ...mealforgePosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/mealforge/blog/${post.slug}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Loose Wire Journal & Blog',
    description: "Gav's degoogle and self-hosting journal, plus posts from the Loose Wire products: Harknotes, Farscry, Unclouded, and Mealforge.",
    site: context.site!,
    items,
  });
}
