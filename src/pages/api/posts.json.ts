import { getCollection } from 'astro:content'

export const prerender = true

export async function GET() {
  const harknotePosts = await getCollection('harknotes-blog')
  const farscryPosts = await getCollection('farscry-blog')
  const uncloudedPosts = await getCollection('unclouded-blog')
  const comparisons = await getCollection('harknotes-vs')

  const posts = [
    ...harknotePosts.map((post) => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      date: post.data.pubDate,
      keywords: post.data.keywords,
      readTime: post.data.readTime ?? null,
      url: `https://loosewire.dev/harknotes/blog/${post.slug}`,
      product: 'harknotes' as const,
    })),
    ...farscryPosts.map((post) => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      date: post.data.pubDate,
      keywords: post.data.keywords,
      readTime: post.data.readTime ?? null,
      url: `https://loosewire.dev/farscry/blog/${post.slug}`,
      product: 'farscry' as const,
    })),
    ...uncloudedPosts.map((post) => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      date: post.data.pubDate,
      keywords: post.data.keywords,
      readTime: post.data.readTime ?? null,
      url: `https://loosewire.dev/unclouded/blog/${post.slug}`,
      product: 'unclouded' as const,
    })),
    ...comparisons.map((comp) => ({
      slug: comp.data.competitorSlug,
      title: `HarkNotes vs ${comp.data.competitor}`,
      description: comp.data.description,
      date: comp.data.pubDate,
      keywords: comp.data.keywords,
      readTime: null,
      url: `https://loosewire.dev/harknotes/vs/${comp.data.competitorSlug}`,
      product: 'harknotes-vs' as const,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
