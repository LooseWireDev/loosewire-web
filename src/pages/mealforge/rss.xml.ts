import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection('mealforge-blog');

  const items = posts
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/mealforge/blog/${post.slug}/`,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Mealforge Blog',
    description: 'Self-hosted, AI-planned weekly meals. Guides on meal planning over MCP and owning your kitchen data.',
    site: context.site!,
    items,
  });
}
