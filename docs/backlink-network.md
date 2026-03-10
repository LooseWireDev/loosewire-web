# Cross-Site Backlinking Network

A backlinking system across all of Gavyn Caldwell's web properties to maximize SEO traction. Every site links to every other site. Every blog post is surfaced everywhere.

## Sites in the Network

| Site | Domain | Repo | Status |
|------|--------|------|--------|
| Portfolio | gavyncaldwell.com | gavyncaldwell/terminal-portfolio | Live |
| Loosewire | loosewire.dev | LooseWireDev/loosewire-web | Live |
| Unclouded | TBD | TBD | Planned |

## The Standard: `/api/posts.json`

Every site that publishes blog content must serve a **static JSON feed** at `/api/posts.json`. This is generated at build time and consumed by all other sites in the network.

### Schema

```json
[
  {
    "slug": "how-to-transcribe-meetings-without-cloud",
    "title": "How to Transcribe Meetings Without Uploading to the Cloud",
    "description": "You don't have to send your meeting audio to third-party servers.",
    "date": "2026-03-06",
    "keywords": ["local meeting transcription", "offline meeting transcription"],
    "readTime": "5 min read",
    "url": "https://loosewire.dev/harknotes/blog/how-to-transcribe-meetings-without-cloud",
    "product": "harknotes"
  }
]
```

### Field reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `slug` | string | yes | URL-safe identifier |
| `title` | string | yes | Full post title |
| `description` | string | yes | Short summary for cards |
| `date` | string | yes | ISO date (YYYY-MM-DD) |
| `keywords` | string[] | yes | Tags/keywords (can be empty array) |
| `readTime` | string \| null | yes | e.g. "5 min read", or null |
| `url` | string | yes | **Full absolute URL** to the post |
| `product` | string | yes | Identifier for the product/section (e.g. "harknotes", "farscry", "unclouded") |

### Rules

- The `url` field must be a full absolute URL (e.g. `https://loosewire.dev/...`), not a relative path
- Array must be sorted by date descending (newest first)
- Endpoint must return `Access-Control-Allow-Origin: *` header for cross-origin fetch
- Endpoint should be prerendered/static (not SSR) for reliability and caching
- `Cache-Control: public, max-age=3600` recommended

## How Each Site Implements It

### Astro sites (Loosewire, Unclouded)

Create `src/pages/api/posts.json.ts`:

```typescript
import { getCollection } from 'astro:content'

export const prerender = true

export async function GET() {
  const posts = await getCollection('your-blog-collection')

  const data = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    date: post.data.pubDate,
    keywords: post.data.keywords,
    readTime: post.data.readTime ?? null,
    url: `https://yourdomain.dev/blog/${post.slug}`,
    product: 'your-product',
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
```

If a site has multiple content collections (like Loosewire with harknotes-blog, farscry-blog, harknotes-vs), fetch all collections and merge them into one array.

## How the Portfolio Consumes Feeds

The portfolio (gavyncaldwell.com) is the central hub that aggregates all feeds.

### Feed registry: `src/data/feeds.ts`

```typescript
export const feedSources: FeedSource[] = [
  {
    id: 'loosewire',
    name: 'Loosewire',
    url: 'https://loosewire.dev/api/posts.json',
    siteUrl: 'https://loosewire.dev',
  },
  // Add new sites here
]
```

### Adding a new site to the portfolio

1. Add an entry to `src/data/feeds.ts`
2. Add product labels to `productLabels` in `src/utils/blogFeed.ts`
3. That's it — the `/blog` page auto-discovers posts from all registered feeds

### How it works

- `src/utils/blogFeed.ts` fetches all registered feeds + local MDX posts at runtime
- Merges everything into a unified chronological list
- Local posts link internally (`/writing/:slug`), external posts link out with ↗ indicator
- Filterable by product

## Inline Backlinks (Non-Blog)

Beyond the blog feed, each site should include contextual links to other sites in the network. These are manually placed where they make natural sense:

### Portfolio (gavyncaldwell.com) links to:
- **Footer** (every page): loosewire.dev
- **Home**: loosewire.dev, loosewire.dev/harknotes, loosewire.dev/farscry
- **About**: loosewire.dev, loosewire.dev/harknotes, loosewire.dev/farscry
- **Work**: Loosewire, HarkNotes, Farscry as projects with links
- **Contact**: Projects section with links to all products + blogs
- **PersonSchema (JSON-LD)**: loosewire.dev in sameAs
- **SEO descriptions**: Mention loosewire.dev where relevant

### Loosewire (loosewire.dev) should link to:
- gavyncaldwell.com (author/creator page)
- unclouded (when launched)

### When adding a new site to the network:
1. Add the `/api/posts.json` endpoint to the new site
2. Add the feed to the portfolio's `src/data/feeds.ts`
3. Add inline backlinks from the new site to all existing sites
4. Add inline backlinks from existing sites to the new site
5. Update this document

## Automated Rebuild Pipeline

When content changes on one site, the portfolio should rebuild to pick up new posts.

### Loosewire → Portfolio

**Loosewire** (`.github/workflows/notify-portfolio.yml`):
- Triggers on push to main when `src/content/**` changes
- Sends `repository_dispatch` event to `gavyncaldwell/terminal-portfolio`
- Requires `PORTFOLIO_DEPLOY_TOKEN` secret (GitHub PAT with repo scope)

**Portfolio** (`.github/workflows/rebuild-on-content.yml`):
- Listens for `repository_dispatch` type `loosewire-content-update`
- Installs, builds, deploys to Cloudflare
- Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets

### Adding a new site's trigger

Create a workflow in the new site's repo:

```yaml
name: Notify Portfolio of New Content
on:
  push:
    branches: [main]
    paths:
      - 'src/content/**'
jobs:
  trigger-portfolio-rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger portfolio rebuild
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PORTFOLIO_DEPLOY_TOKEN }}
          repository: gavyncaldwell/terminal-portfolio
          event-type: <site-name>-content-update
```

Then add the new event type to the portfolio's `rebuild-on-content.yml`:

```yaml
on:
  repository_dispatch:
    types: [loosewire-content-update, unclouded-content-update]
```

## Sitemap

Each site manages its own sitemap. The portfolio's `public/sitemap.xml` includes `/blog` at high priority (0.9) so Google crawls the aggregated feed page, which contains links to every post on every site.

Loosewire uses `@astrojs/sitemap` which auto-generates the sitemap from all routes.
