import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection('harknotes-blog');

  const items = posts
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/harknotes/blog/${post.slug}/`,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Harknotes Blog',
    description: 'Private meeting transcription with local AI. Tips, guides, and updates from the Harknotes team.',
    site: context.site!,
    items,
  });
}
