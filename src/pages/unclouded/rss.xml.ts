import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection('unclouded-blog');

  const items = posts
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/unclouded/blog/${post.slug}/`,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Unclouded Blog',
    description: 'Honest comparisons of privacy-focused apps and services. De-Google your life.',
    site: context.site!,
    items,
  });
}
