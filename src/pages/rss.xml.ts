import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const harknotePosts = await getCollection('harknotes-blog');
  const farscryPosts = await getCollection('farscry-blog');
  const uncloudedPosts = await getCollection('unclouded-blog');

  const items = [
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
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Loose Wire Blog',
    description: 'Privacy-first software tools from an independent dev. Posts about Harknotes, Farscry, Unclouded, and more.',
    site: context.site!,
    items,
  });
}
