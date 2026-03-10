import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection('farscry-blog');

  const items = posts
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/farscry/blog/${post.slug}/`,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Farscry Blog',
    description: 'Self-hosted video calling without compromises. Guides and updates from the Farscry team.',
    site: context.site!,
    items,
  });
}
